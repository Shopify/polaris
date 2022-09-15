import type {Exact} from 'type-fest';

import type {AlphabetLowercase, AlphabetUppercase} from './types';
import type {MigrateOptions} from './migrate';

interface Arg {
  name: string;
  description: string;
}

interface Flag {
  type: 'boolean' | 'string' | 'number';
  alias?: AlphabetLowercase | AlphabetUppercase;
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
  },
});

export type CLIConfig = typeof cliConfig;

export const POLARIS_MIGRATOR_COMMENT =
  "polaris-migrator: This is a complex expression that we can't automatically convert. Please check this manually.";
