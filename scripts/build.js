/* eslint-disable no-console */

const {execSync} = require('child_process');
const {join, resolve: resolvePath} = require('path');

const {ensureDirSync, writeFileSync, readFileSync} = require('fs-extra');
const {rollup} = require('rollup');
const {cp, mv} = require('shelljs');
const copyfiles = require('copyfiles');

const createRollupConfig = require('../config/rollup');
const packageJSON = require('../package.json');

const root = resolvePath(__dirname, '..');
const build = resolvePath(root, 'build');
const finalEsnext = resolvePath(root, 'esnext');

const docs = resolvePath(root, './docs');
const intermediateBuild = resolvePath(root, './build-intermediate');
const mainEntry = resolvePath(intermediateBuild, './index.js');

const scripts = resolvePath(root, 'scripts');
const tsBuild = resolvePath(scripts, 'tsconfig.json');

const execOptions = {stdio: 'inherit', cwd: root};

execSync(
  `yarn run tsc --outDir ${intermediateBuild} --project ${tsBuild}`,
  execOptions,
);

// Downlevel type declarations to support consuming apps that use older versions
// of typescript
execSync(`yarn run downlevel-dts types/latest types/3.4`, execOptions);

mv(resolvePath(intermediateBuild, 'src/*'), intermediateBuild);

copy(['./src/**/*.md', docs], {up: 1}).catch((error) => {
  console.error(error);
  process.exit(1);
});

copy(['./src/**/*.{scss,svg,png,jpg,jpeg,json}', intermediateBuild], {up: 1})
  .then(() => {
    [
      resolvePath(intermediateBuild, './styles/global.scss'),
      resolvePath(intermediateBuild, './configure.js'),
    ].forEach((file) => {
      const fileContents = readFileSync(file, 'utf8');
      writeFileSync(
        file,
        fileContents.replace(/\{\{POLARIS_VERSION\}\}/g, packageJSON.version),
      );
    });
  })
  // Custom build consumed by Sewing Kit: it preserves all ESNext features
  // including imports/ exports for better tree shaking.
  .then(() => ensureDirSync(finalEsnext))
  .then(() => cp('-R', `${intermediateBuild}/*`, finalEsnext))
  .then(() => {
    const indexPath = join(finalEsnext, 'index.js');
    const esnextIndex = readFileSync(indexPath, 'utf8');
    writeFileSync(
      indexPath,
      esnextIndex.replace(/import '.\/styles\/global\.scss';/g, ''),
    );
  })
  // Main CJS and ES modules bundles: supports all our supported browsers and
  // uses the full class names for any Sass imports
  .then(() => runRollup())
  .then(() =>
    Promise.all([
      cp('build/polaris.js', './index.js'),
      cp('build/polaris.es.js', './index.es.js'),
      cp('build/polaris.css', './styles.css'),
      cp('build/polaris.min.css', './styles.min.css'),
      cp('build/styles.scss', './styles.scss'),
      cp('-r', 'build/styles', './styles'),
    ]),
  )
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

function runRollup() {
  const config = createRollupConfig({
    entry: mainEntry,
    cssPath: resolvePath(build, 'polaris.css'),
  });

  return rollup(config).then((bundle) =>
    Promise.all([
      bundle.write({
        format: 'cjs',
        file: resolvePath(build, 'polaris.js'),
      }),
      bundle.write({
        format: 'esm',
        file: resolvePath(build, 'polaris.es.js'),
      }),
    ]),
  );
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
