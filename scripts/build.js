import {execSync} from 'child_process';
import {writeFileSync} from 'fs-extra';
import {resolve as resolvePath} from 'path';
import {rollup} from 'rollup';
import {cp} from 'shelljs';
import copyfiles from 'copyfiles';

import createConfig from '../config/rollup';
import generateSassBuild from './sass-build';

const root = resolvePath(__dirname, '..');
const build = resolvePath(root, './build');
const intermediateBuild = resolvePath(root, './build-intermediate');
const mainEntry = resolvePath(intermediateBuild, './index.js');
const embeddedEntry = resolvePath(intermediateBuild, './embedded/index.js');

execSync(`./node_modules/.bin/tsc --outDir ${intermediateBuild}`, {
  stdio: 'inherit',
});

writeFileSync(resolvePath(root, 'embedded.d.ts'), "export * from './types/embedded';\n");

writeFileSync(resolvePath(intermediateBuild, '.babelrc'), `
  {
    "presets": [
      "shopify/react",
      ["shopify/web", {"modules": false}]
    ],
    "plugins": [
      "../config/babel/plugins/sass-namespace-to-default-import.js"
    ]
  }
`);

copy(['./src/**/*.{scss,svg,png,jpg,jpeg}', intermediateBuild], {up: 1})
  .then(() => runRollup({entry: mainEntry, output: 'polaris.js', format: 'cjs', css: true}))
  .then(() => runRollup({entry: mainEntry, output: 'polaris.es.js', format: 'es', css: false}))
  .then(() => runRollup({entry: embeddedEntry, output: 'embedded.js', format: 'cjs', css: false}))
  .then(() => Promise.all([
    cp('./build/polaris.js', './index.js'),
    cp('./build/embedded.js', './embedded.js'),
    cp('./build/polaris.es.js', './index.es.js'),
    cp('./build/polaris.css', './styles.css'),
  ]))
  .then(() => generateSassBuild())
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  });

function runRollup({entry, output, format, css}) {
  const config = createConfig({
    entry,
    outputCSS: css && resolvePath(build, 'polaris.css'),
  });

  return rollup(config)
    .then((bundle) => bundle.write({
      format,
      dest: resolvePath(build, output),
    }));
}

function copy(paths, config) {
  return new Promise((resolve, reject) => {
    copyfiles(paths, config, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
