import meow from 'meow';

import type {AlphabetLowercase, AlphabetUppercase} from './types';

interface Flag {
  alias: AlphabetLowercase | AlphabetUppercase;
  description: string;
  type: string;
}

interface Flags {
  [key: string]: Flag;
}

interface Arg {
  name: string;
  description: string;
}

type Args = Arg[];

interface CliInfo {
  description: string;
  args: Args;
  flags: Flags;
}

export const cliInfo: CliInfo = {
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
  },
};

const help = `
Usage
  $ npx @shopify/polaris-migrator ${cliInfo.args
    .map((arg) => `<${arg.name}>`)
    .join(' ')}
    ${cliInfo.args
      .map((arg) => `${arg.name}\t${arg.description}`)
      .join('\n    ')}
Options
  ${Object.entries(cliInfo.flags)
    .map(([name, {description}]) => `--${name}\t${description}`)
    .join('\n  ')}
`;

// @ts-expect-error Ignore the additional description property on the flags
export const cli = meow({
  description: cliInfo.description,
  flags: cliInfo.flags,
  help,
});
