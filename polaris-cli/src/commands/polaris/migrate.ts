import {Command, Flags} from '@oclif/core';
import {run as runMigrator} from '@shopify/polaris-migrator';

export default class Migrate extends Command {
  static description = 'Runs a Polaris migration on the current project';

  static args = [
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
  ];

  static flags = {
    dry: Flags.boolean({
      char: 'd',
      description: 'Dry run (no changes are made to files)',
      env: 'SHOPIFY_FLAG_DRY',
    }),
    print: Flags.boolean({
      char: 'p',
      description: 'Print transformed files to your terminal',
      env: 'SHOPIFY_FLAG_PRINT',
    }),
    force: Flags.boolean({
      char: 'f',
      description: 'Bypass Git safety checks and forcibly run migrations',
      env: 'SHOPIFY_FLAG_FORCE',
    }),
  };

  async run() {
    const {args, flags} = await this.parse(Migrate);
    const {migration, path} = args;
    await runMigrator(migration, path, flags);
  }
}
