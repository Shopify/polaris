/* eslint-env node */
/* eslint flowtype/require-valid-file-annotation: off */

const {mkdirpSync, writeFileSync, existsSync, readFileSync} = require('fs-extra');
const {resolve} = require('path');
const yargs = require('yargs');

const argv = yargs
  .usage('Usage: $0 <component> [options]')
  .help('h')
  .alias('h', 'help')
  .argv;

const component = argv._[0];

if (!component) {
  throw new Error('You must pass a component name as the first argument.');
}

const targetDir = resolve(__dirname, `../components/${component}`);

mkdirpSync(targetDir);

writeFileSyncWithCorrectIndentation(resolve(targetDir, `${component}.js`), `
  // @flow

  import React from 'react';

  import styles from './${component}.scss';

  type Props = {
    children?: any,
  };

  export default function ${component}({children}: Props) {
    return (
      <div>{children}</div>
    );
  }
`);

writeFileSyncWithCorrectIndentation(resolve(targetDir, 'index.js'), `
  // @flow

  import ${component} from './${component}';

  export default ${component};
`);

writeFileSyncWithCorrectIndentation(resolve(targetDir, `${component}.scss`), `
  .${component} {

  }
`);

const indexFile = resolve(targetDir, '../index.js');

if (existsSync(indexFile)) {
  writeFileSyncWithCorrectIndentation(indexFile, `
    ${readFileSync(indexFile, 'utf8').replace(/\s+$/, '')}
    export {default as ${component}} from './${component}';
  `);
} else {
  writeFileSyncWithCorrectIndentation(indexFile, `
    // @flow

    export {default as ${component}} from './${component}';
  `);
}

function writeFileSyncWithCorrectIndentation(file, content) {
  const trimmedContent = content.replace(/^\n+/, '');
  const indentation = /^\s*/.exec(trimmedContent)[0].length;
  const finalContent = trimmedContent.replace(new RegExp(`^ {1,${indentation}}`, 'gm'), '');
  writeFileSync(file, `${finalContent.trimRight()}\n`);
}
