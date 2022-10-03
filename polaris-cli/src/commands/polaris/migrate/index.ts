import {Command, Flags} from '@oclif/core';
import {migrate, cliConfig} from '@shopify/polaris-migrator';

export default class Migrate extends Command {
  static description = cliConfig.description;
  static args = cliConfig.args;
  static flags = Object.fromEntries(
    Object.entries(cliConfig.flags).map(([name, flag]) => [
      name,
      Flags[flag.type]({
        char: flag.alias,
        description: flag.description,
        env: `SHOPIFY_FLAG_${name.toUpperCase()}`,
      }),
    ]),
  );

  async run() {
    const {args, flags} = await this.parse(Migrate);
    const {migration, path} = args;
    await migrate(migration, path, {
      dry: flags.dry,
      print: flags.print,
      force: flags.force,
    });
  }
}
