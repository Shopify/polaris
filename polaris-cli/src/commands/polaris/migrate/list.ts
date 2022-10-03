import {Command} from '@oclif/core';
import {migrations} from '@shopify/polaris-migrator';
import chalk from 'chalk';

export default class Migrate extends Command {
  static description = 'List all available migrations';

  async run() {
    /* eslint-disable no-console */
    console.log('All available migrations\n');
    console.log(chalk.bold('MIGRATIONS'));
    console.log(migrations.map((migration) => `  ${migration}`).join('\n'));
    console.log('');
    /* eslint-enable no-console */
  }
}
