/* eslint-disable no-console */

const {execSync} = require('child_process');
const {join, resolve: resolvePath} = require('path');
const {ensureDirSync, writeFileSync, readFileSync} = require('fs-extra');
const {rollup} = require('rollup');
const {cp, mv, rm} = require('shelljs');
const copyfiles = require('copyfiles');

const createRollupConfig = require('../config/rollup');
const packageJSON = require('../package.json');
const generateSassBuild = require('./sass-build');

const root = resolvePath(__dirname, '..');
const build = resolvePath(root, 'build');
const finalEsnext = resolvePath(root, 'esnext');

const docs = resolvePath(root, './docs');
const intermediateBuild = resolvePath(root, './build-intermediate');
const mainEntry = resolvePath(intermediateBuild, './index.js');

const scripts = resolvePath(root, 'scripts');
const types = resolvePath(root, 'types');
const tsBuild = resolvePath(scripts, 'tsconfig.json');

execSync(
  `${resolvePath(
    root,
    './node_modules/.bin/tsc',
  )} --outDir ${intermediateBuild} --project ${tsBuild}`,
  {
    stdio: 'inherit',
  },
);

mv(resolvePath(root, 'types/src/*'), types);
rm('-rf', resolvePath(root, 'types/src'));

mv(resolvePath(intermediateBuild, 'src/*'), intermediateBuild);

copy(['./src/**/*.md', docs], {up: 1}).catch((error) => {
  console.error(error);
  process.exit(1);
});

copy(['./src/**/*.{scss,svg,png,jpg,jpeg,json}', intermediateBuild], {up: 1})
  .then(() => {
    [
      resolvePath(intermediateBuild, './styles/global/elements.scss'),
      resolvePath(intermediateBuild, './configure.js'),
    ].forEach((file) => {
      writeFileSync(
        file,
        readFileSync(file, 'utf8')
          .replace(/\{\{POLARIS_VERSION\}\}/g, packageJSON.version)
          .replace(/<%= POLARIS_VERSION %>/g, packageJSON.version),
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
  .then(() => {
    writeFileSync(
      resolvePath(intermediateBuild, '.babelrc'),
      `
      {
        "presets": [
          ["babel-preset-shopify/web", {"modules": false}],
          ["babel-preset-shopify/react"]
        ],
        "plugins": [
          "../config/babel/plugins/sass-namespace-to-default-import.js"
        ]
      }
    `,
    );
  })
  // Main bundle: supports all our supported browsers, CommonJS, and
  // uses the full class names for any Sass imports
  .then(() =>
    runRollup({
      entry: mainEntry,
      output: 'polaris.js',
      format: 'cjs',
      css: true,
    }),
  )
  // ES bundle: supports all our supported browsers, but uses ES imports
  // (for tree shaking), uses the full class names for any Sass imports
  .then(() =>
    runRollup({
      entry: mainEntry,
      output: 'polaris.es.js',
      format: 'es',
      css: false,
      useExistingClassTokens: true,
    }),
  )
  .then(() =>
    Promise.all([
      cp('build/polaris.js', './index.js'),
      cp('build/polaris.es.js', './index.es.js'),
      cp('build/polaris.css', './styles.css'),
    ]),
  )
  // Main Sass build that includes the full CSS class names
  .then(() => generateSassBuild(build))
  .then(() => {
    cp('-r', resolvePath(build, 'sass', '*'), root);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

function runRollup({
  entry,
  output,
  format,
  css,
  outputDir = build,
  minifyClassnames = false,
  useExistingClassTokens = false,
}) {
  const config = createRollupConfig({
    entry,
    minifyClassnames,
    useExistingClassTokens,
    writeCSS: css,
    cssPath: resolvePath(outputDir, 'polaris.css'),
  });

  return rollup(config).then((bundle) =>
    bundle.write({
      format,
      file: resolvePath(outputDir, output),
    }),
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
