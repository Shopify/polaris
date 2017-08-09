import {execSync} from 'child_process';
import {ensureDirSync, writeFileSync, readFileSync} from 'fs-extra';
import {join, resolve as resolvePath} from 'path';
import {rollup} from 'rollup';
import {cp} from 'shelljs';
import copyfiles from 'copyfiles';

import createRollupConfig from '../config/rollup';
import generateSassBuild from './sass-build';
import packageJSON from '../package.json';

const root = resolvePath(__dirname, '..');
const build = resolvePath(root, 'build');
const buildEsnext = resolvePath(root, 'build-esnext');
const finalEsnext = resolvePath(root, 'esnext');

const docs = resolvePath(root, './docs');
const intermediateBuild = resolvePath(root, './build-intermediate');
const mainEntry = resolvePath(intermediateBuild, './index.js');
const embeddedEntry = resolvePath(intermediateBuild, './embedded/index.js');

execSync(`./node_modules/.bin/tsc --outDir ${intermediateBuild}`, {
  stdio: 'inherit',
});

writeFileSync(resolvePath(root, 'embedded.d.ts'), "export * from './types/embedded';\n");

const srcReadme = resolvePath(root, './src/components/README.md');
const destinationReadme = resolvePath(docs, './components/README.md');

copy(['./src/**/*.md', docs], { up: 1 })
  .then(() => {
    writeFileSync(
      destinationReadme,
      readFileSync(srcReadme, 'utf8').replace(/\{\{VERSION\}\}/g, packageJSON.version)
    );
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  });

copy(['./src/**/*.{scss,svg,png,jpg,jpeg}', intermediateBuild], {up: 1})
  .then(() => {
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
  })
  .then(() => runRollup({entry: mainEntry, output: 'polaris.js', format: 'cjs', css: true}))
  .then(() => runRollup({entry: mainEntry, output: 'polaris.es.js', format: 'es', css: false}))
  .then(() => runRollup({entry: embeddedEntry, output: 'embedded.js', format: 'cjs', css: false}))
  .then(() => Promise.all([
    cp('build/polaris.js', './index.js'),
    cp('build/embedded.js', './embedded.js'),
    cp('build/polaris.es.js', './index.es.js'),
    cp('build/polaris.css', './styles.css'),
  ]))
  .then(() => generateSassBuild(build))
  .then(() => {
    writeFileSync(resolvePath(intermediateBuild, '.babelrc'), `
      {
        "presets": [
          "shopify/react"
        ],
        "plugins": [
          "../config/babel/plugins/sass-namespace-to-default-import.js"
        ]
      }
    `);
  })
  .then(() => ensureDirSync(finalEsnext))
  .then(() => runRollup({entry: mainEntry, output: 'polaris.js', outputDir: buildEsnext, format: 'es', css: true, minifyClassnames: true}))
  .then(() => generateSassBuild(buildEsnext))
  .then(() => Promise.all([
    cp(join(buildEsnext, 'polaris.js'), join(finalEsnext, 'index.js')),
    cp('-R', join(buildEsnext, 'sass', 'styles'), finalEsnext),
  ]))
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  });

function runRollup({entry, output, format, css, outputDir = build, minifyClassnames = false}) {
  const config = createRollupConfig({
    entry,
    minifyClassnames,
    outputCSS: css && resolvePath(outputDir, 'polaris.css'),
  });

  return rollup(config)
    .then((bundle) => bundle.write({
      format,
      dest: resolvePath(outputDir, output),
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
