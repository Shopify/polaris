import type {AlphabetLowercase, AlphabetUppercase, Exact} from './types';
import type {RunOptions} from './run';

interface BaseArg {
  name: string;
  description: string;
}

interface BaseFlag {
  type: 'boolean' | 'string' | 'number';
  alias?: AlphabetLowercase | AlphabetUppercase;
  description: string;
}

type BaseFlags = {[O in keyof RunOptions]: BaseFlag};

interface BaseConfig {
  description: string;
  args: BaseArg[];
  flags: BaseFlags;
}

const createConfig = <T extends Exact<BaseConfig, T>>(config: T): T => config;

export const cliConfig = createConfig({
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
