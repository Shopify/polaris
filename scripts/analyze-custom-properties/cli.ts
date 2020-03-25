import {readFileSync, writeFileSync} from 'fs';

import program from 'commander';

import {analyzeCustomProperties} from './analyze-custom-properties';

type LogLevel = 'verbose' | 'info' | 'error' | 'never';

interface Options {
  output?: string;
  outputErrors?: boolean;
  outputStats?: boolean;
  outputCustomProperties?: boolean;
  input?: string;
  customPropertyPattern?: string;
  pattern?: string;
  logLevel?: LogLevel;
}

program
  .option('-o, --output <string>', 'Output location.')
  .option('-e, --output-errors <boolean>', 'Include errors in output.', true)
  .option(
    '-C, --output-custom-properties <boolean>',
    'Include custom properties in output.',
    true,
  )
  .option('-s, --output-stats <boolean>', 'Include stats in output.', true)
  .option(
    '-i, --input <string>',
    'Input directory for known custom properties. Expects an array of string.',
  )
  .option(
    '-c, --custom-property-pattern <string>',
    'Regex to include custom properties.',
  )
  .option('-p, --pattern <string>', 'Glob pattern to find files', '**/*.css.')
  .option(
    '-l, --log-level <verbose|info|error|never>',
    'Determines the errors displayed. `verbose` will display everything. `info` will display everything except errors. `error` will only display errors. And `never` will not display any logs',
    'verbose',
  )
  .version('0.0.1', '-v, --version', 'Output the current version');

program.parse(process.argv);

const {
  output,
  outputErrors,
  outputStats,
  outputCustomProperties,
  input,
  customPropertyPattern,
  pattern,
  logLevel,
} = program;

main({
  output,
  outputErrors,
  outputStats,
  outputCustomProperties,
  input,
  customPropertyPattern,
  pattern,
  logLevel,
});

function main({
  output,
  outputErrors = true,
  outputStats = true,
  outputCustomProperties = true,
  input,
  customPropertyPattern,
  pattern,
  logLevel = 'verbose',
}: Options) {
  return new Promise((resolve, reject) => {
    let knownCustomProperties: string[] = [];

    if (input) {
      try {
        knownCustomProperties = JSON.parse(
          readFileSync(input, {encoding: 'utf8'}),
        );
      } catch (err) {
        reject(err);
      }
    }

    analyzeCustomProperties({
      pattern,
      knownCustomProperties,
      customPropertyPattern,
      logLevel,
    })
      .then(([properties, errors, stats]) => {
        if (output) {
          writeFileSync(
            output,
            JSON.stringify(
              {
                ...(outputCustomProperties && {properties}),
                ...(outputErrors && {errors}),
                ...(outputStats && {stats}),
              },
              null,
              2,
            ),
          );
        }

        if (Object.keys(errors).length > 0) {
          process.exit(1);
        }

        resolve(true);
      })
      .catch((err) => reject(err));
  }).catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  });
}
