import readline from 'node:readline';
import {execa} from 'execa';
import ora from 'ora';
import chalk from 'chalk';
import isCI from 'is-ci';
import terminate from 'terminate/promise.js';

const isTTY = process.stdout.isTTY && !isCI;

function enhancedProcessKill(prc) {
  prc.kill = async (signal = 'SIGKILL') => {
    prc.killed = true;
    // Kill the yarn command _and_ the child process running node
    await terminate(prc.pid, signal);
  };
  return prc;
}

// opts.pretty = true | { text: '', successText: '', failText: '' }
// When opts.pretty is set, will output command execution status. If running in
// a TTY, will do it with a spinner.
export function prettyExeca(cmd, args = [], opts = {}) {
  // act as a pass-through for execa when the pretty flag isn't set
  if (!opts.pretty) {
    return enhancedProcessKill(execa(cmd, args, opts));
  }

  if (isTTY) {
    // hijack output so we can pretty print it next to the spinner later
    opts = {
      ...opts,
      stdout: 'pipe',
      stderr: 'pipe',
    };
  }

  const defaultPrettyText = `${cmd} ${args.join(' ')}`;
  const spinner = ora();
  spinner.start(opts.pretty.text ?? defaultPrettyText);

  // Start the process
  const prc = enhancedProcessKill(execa(cmd, args, opts));

  prc
    .then(() => {
      spinner.succeed(opts.pretty.successText ?? defaultPrettyText);
    })
    .catch(() => {
      spinner.fail(opts.pretty.failText ?? defaultPrettyText);
    });

  if (isTTY) {
    // accumulate stderr in case we need to dump it out later
    const getStdErr = streamToStringGetter(prc.stderr);

    // intercept lines of output to stdout, and write it to the spinner
    // We need an extra 'done' semaphore because the process can apparently keep
    // outputing even after its finished :surprised-pikachu:
    let done = false;
    const lineReader = readline.createInterface({
      input: prc.stdout,
      crlfDelay: Infinity,
    });

    lineReader.on('line', (line) => {
      if (!done) {
        spinner.text = `${opts.pretty.text ?? defaultPrettyText} ${chalk.dim(
          // Avoid wrapping by truncating and removing newlines
          line.slice(0, 64).replace('\n', ' '),
        )}`;
      }
    });

    prc
      .then(() => {
        done = true;
        lineReader.close();
      })
      .catch(async () => {
        done = true;
        lineReader.close();
        const message = getStdErr();
        console.error(message);
      });
  }

  return prc;
}

// Accumulate a stream, converting it into a string on request
function streamToStringGetter(stream) {
  const chunks = [];
  stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
  return () => Buffer.concat(chunks).toString('utf8');
}

export function buildLocalServer() {
  return prettyExeca('yarn', ['next', 'build'], {
    stdout: 'inherit',
    stderr: 'inherit',
    pretty: {
      text: 'Building local server',
      successText: 'Built local server',
      failText: "Couldn't build local server",
    },
  });
}

export function genAssets() {
  return prettyExeca('yarn', ['gen-assets'], {
    stdout: 'inherit',
    stderr: 'inherit',
    pretty: {
      text: 'Generating site assets',
      successText: 'Generated site assets',
      failText: "Couldn't generate site assets",
    },
  });
}

export function startLocalServer(command = 'start') {
  return prettyExeca('yarn', ['next', command], {
    stdout: 'ignore',
    stderr: 'pipe',
    shell: true,
  });
}
