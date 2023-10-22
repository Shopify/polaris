import type {Exact} from 'type-fest';
import meow from 'meow';
import type {AnyFlag} from 'meow';

import {migrate} from './migrate';
import type {Alias} from './utilities/types';
import type {MigrateOptions} from './migrate';

interface Arg {
  name: string;
  description: string;
}

interface Flag {
  type: 'boolean' | 'string' | 'number';
  alias?: Alias;
  description: string;
}

type Flags = {[O in keyof MigrateOptions]: Flag};

interface Config {
  description: string;
  args: Arg[];
  flags: Flags;
}

const createCLIConfig = <T extends Exact<Config, T>>(config: T): T => config;

export const cliConfig = createCLIConfig({
  description: 'Code migrations for updating Polaris apps.',
  args: [
    {
      name: 'migration',
      description:
        'One of the choices from https://polaris.shopify.com/docs/advanced-features/migrations',
    },
    {
      name: 'path',
      description:
        'Files or directory to transform. Can be a glob like src/**.scss',
    },
  ],
  flags: {
    dry: {
      alias: 'd',
      description: 'Dry run (no changes are made to files)',
      type: 'boolean',
    },
    print: {
      alias: 'p',
      description: 'Print transformed files to your terminal',
      type: 'boolean',
    },
    force: {
      alias: 'f',
      description: 'Bypass Git safety checks and forcibly run migrations',
      type: 'boolean',
    },
    stdin: {
      alias: 's',
      type: 'boolean',
      description: 'If true, each line of the standard input is used as a path',
    },
  },
});

export type CLIConfig = typeof cliConfig;

const help = `
Usage
  $ npx @shopify/polaris-migrator ${cliConfig.args
    .map((arg) => `<${arg.name}>`)
    .join(' ')}
  ${cliConfig.args.map((arg) => `${arg.name}\t${arg.description}`).join('\n  ')}
Options
  ${Object.entries(cliConfig.flags)
    .map(([name, {description}]) => `--${name}\t${description}`)
    .join('\n  ')}
`;

const {input, flags} = meow({
  description: cliConfig.description,
  flags: Object.fromEntries(
    Object.entries(cliConfig.flags).map(([name, flag]): [string, AnyFlag] => [
      name,
      {
        alias: flag.alias,
        type: flag.type,
      },
    ]),
  ),
  help,
});

export async function run() {
  let files: string | string[];

  if (flags.stdin) {
    let buffer = '';

    for await (const chunk of process.stdin) {
      buffer += chunk.toString();
    }

    files = buffer.split('\n').filter(Boolean);

    if (files.length === 0) {
      throw new Error('No files provided via stdin');
    }
  } else {
    files = input[1];
  }

  await migrate(input[0], files, flags);
}
