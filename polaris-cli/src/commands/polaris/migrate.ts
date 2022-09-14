import {Command, Flags} from '@oclif/core';
import type {FlagInput, FlagProps} from '@oclif/core/lib/interfaces/parser';
import {run as runMigrator, cliInfo} from '@shopify/polaris-migrator';

type FlagType = Extract<keyof typeof Flags, 'string' | 'boolean'>;
type FlagsType = NonNullable<Parameters<typeof runMigrator>[2]>;

export default class Migrate extends Command {
  static description = cliInfo.description;
  static args = cliInfo.args;
  static flags = Object.fromEntries(
    Object.entries(cliInfo.flags).map(([name, flag]) => [
      name,
      Flags[flag.type as FlagType]({
        char: flag.alias,
        description: flag.description,
        env: `SHOPIFY_FLAG_${name.toUpperCase()}`,
      } as FlagProps),
    ]),
  ) as FlagInput<FlagsType>;

  async run() {
    const {args, flags} = await this.parse(Migrate);
    const {migration, path} = args;
    await runMigrator(migration, path, flags);
  }
}
