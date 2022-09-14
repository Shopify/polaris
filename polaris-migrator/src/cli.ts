import meow, {AnyFlag} from 'meow';

import {run} from './run';
import {cliConfig} from './constants';

const help = `
Usage
  $ npx @shopify/polaris-migrator ${cliConfig.args.map(
    (arg) => `<${arg.name}>`,
  )}
    ${cliConfig.args.map((arg) => `${arg.name}\t${arg.description}\n`)}
Options
  ${Object.entries(cliConfig.flags).map(
    ([name, {description}]) => `--${name}\t${description}\n`,
  )}
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

export async function cli() {
  await run(input[0], input[1], flags);
}
