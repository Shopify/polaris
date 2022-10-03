import meow, {AnyFlag} from 'meow';
import chalk from 'chalk';

import {migrate, migrations} from './migrate';
import {cliConfig} from './constants';

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
  const command = input[0];

  if (command === 'list' || command === 'ls') {
    /* eslint-disable no-console */
    console.log('All available migrations\n');
    console.log(chalk.bold('MIGRATIONS'));
    console.log(migrations.map((migration) => `  ${migration}`).join('\n'));
    /* eslint-enable no-console */
    return;
  }

  await migrate(input[0], input[1], flags);
}
