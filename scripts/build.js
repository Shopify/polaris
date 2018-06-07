import {execSync} from 'child_process';
import {ensureDirSync, writeFileSync, readFileSync} from 'fs-extra';
import {join, resolve as resolvePath} from 'path';
import {rollup} from 'rollup';
import {cp, mv, rm} from 'shelljs';
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

const scripts = resolvePath(root, 'scripts');
const types = resolvePath(root, 'types');
const tsBuild = resolvePath(scripts, 'tsconfig.json');

execSync(`${resolvePath(root, './node_modules/.bin/tsc')} --outDir ${intermediateBuild} --project ${tsBuild}`, {
  stdio: 'inherit',
});

mv(resolvePath(root, 'types/src/*'), types);
rm(resolvePath(root, 'types/src'));

writeFileSync(resolvePath(root, 'embedded.d.ts'), "export * from './types/embedded';\n");

mv(resolvePath(intermediateBuild, 'src/*'), intermediateBuild);

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

copy(['./src/**/*.{scss,svg,png,jpg,jpeg,json}', intermediateBuild], {up: 1})
  .then(() => {
    [
      resolvePath(intermediateBuild, './styles/global.scss'),
      resolvePath(intermediateBuild, './configure.js'),
    ].forEach((file) => {
      writeFileSync(
        file,
        readFileSync(file, 'utf8').replace(/\{\{VERSION\}\}/g, packageJSON.version)
      );
    });
  })
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
  // Main bundle: supports all our supported browsers, CommonJS, and
  // uses the full class names for any Sass imports
  .then(() => runRollup({
    entry: mainEntry,
    output: 'polaris.js',
    format: 'cjs',
    css: true,
  }))
  // ES bundle: supports all our supported browsers, but uses ES imports
  // (for tree shaking), uses the full class names for any Sass imports
  .then(() => runRollup({
    entry: mainEntry,
    output: 'polaris.es.js',
    format: 'es',
    css: false,
    useExistingClassTokens: true,
  }))
  // Embedded bundle, supports all our supported browsers, CommonJS, no
  // styles because no embedded-only components have styles
  .then(() => runRollup({
    entry: embeddedEntry,
    output: 'embedded.js',
    format: 'cjs',
    css: false,
  }))
  .then(() => Promise.all([
    cp('build/polaris.js', './index.js'),
    cp('build/embedded.js', './embedded.js'),
    cp('build/polaris.es.js', './index.es.js'),
    cp('build/polaris.css', './styles.css'),
  ]))
  // Main Sass build that includes the full CSS class names
  .then(() => generateSassBuild(build))
  .then(() => {
    cp('-r', resolvePath(build, 'sass', '*'), root);
  })
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
  // Custom build consumed by Sewing Kit: it preserves all ESNext features
  // including imports/ exports for better tree shaking, and includes
  // only the minified CSS class names
  .then(() => runRollup({
    entry: mainEntry,
    output: 'polaris.js',
    outputDir: buildEsnext,
    format: 'es',
    css: true,
    minifyClassnames: true,
  }))
  .then(() => {
    writeFileSync(resolvePath(intermediateBuild, '.babelrc'), `
      {
        "presets": [
          "shopify/react",
          ["shopify/node", {"version": 6, "modules": false}]
        ],
        "plugins": [
          "../config/babel/plugins/sass-namespace-to-default-import.js"
        ]
      }
    `);
  })
  // Custom build consumed by Sewing Kit for the server: matches ES features
  // available in Node 6+ but does not preserve imports/ exports since this
  // package is resolved natively by Node. Uses the same minified class names.
  .then(() => runRollup({
    entry: mainEntry,
    output: 'polaris-server.js',
    outputDir: buildEsnext,
    format: 'cjs',
    css: false,
    useExistingClassTokens: true,
  }))
  // Sass build with the minified class names
  .then(() => generateSassBuild(buildEsnext))
  .then(() => Promise.all([
    cp(join(buildEsnext, 'polaris.js'), join(finalEsnext, 'index.js')),
    cp(join(buildEsnext, 'polaris-server.js'), join(finalEsnext, 'server.js')),
    cp('-R', join(buildEsnext, 'sass', 'styles'), finalEsnext),
  ]))
  .catch((error) => {
    // eslint-disable-next-line no-console
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

  return rollup(config)
    .then((bundle) => bundle.write({
      format,
      file: resolvePath(outputDir, output),
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
