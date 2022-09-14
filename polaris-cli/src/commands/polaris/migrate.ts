import {Command, Flags} from '@oclif/core';
import {FlagInput} from '@oclif/core/lib/interfaces';
import {
  run as runMigrator,
  cliInfo,
  Flags as MigratorFlags,
} from '@shopify/polaris-migrator';

type FlagType = 'string' | 'boolean';

const isFlagType = (type: FlagType | string): type is FlagType => {
  return ['string', 'boolean'].includes(type);
};

export default class Migrate extends Command {
  static description = cliInfo.description;
  static args = cliInfo.args;
  static flags = Object.fromEntries(
    Object.entries(cliInfo.flags).map(([name, flag]) => {
      const flagType = isFlagType(flag.type) ? flag.type : 'string';
      return [
        name,
        Flags[flagType]({
          char: flag.alias,
          description: flag.description,
          env: `SHOPIFY_FLAG_${name.toUpperCase()}`,
        }),
      ];
    }),
  ) as FlagInput<MigratorFlags>;

  async run() {
    const {args, flags} = await this.parse(Migrate);
    const {migration, path} = args;
    await runMigrator(migration, path, flags);
  }
}
