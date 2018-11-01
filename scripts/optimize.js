/* eslint-disable no-console */

const SVGO = require('svgo');
const glob = require('glob');
const {paramCase} = require('change-case');
const {resolve: resolvePath, basename, dirname} = require('path');
const {readFileSync, writeFileSync, removeSync} = require('fs-extra');

const {svgOptions} = require('@shopify/images/optimize');

const svgo = new SVGO(svgOptions());

glob(resolvePath(__dirname, '../**/*.svg'), (error, files) => {
  if (error) {
    console.error(error);
    process.exit(1);
    return;
  }

  files.forEach((file) => optimizeFile(file));
});

function optimizeFile(file) {
  return new Promise((resolve) => {
    const data = readFileSync(file, 'utf8');
    svgo.optimize(data, (result) => {
      removeSync(file);

      const newFile = resolvePath(
        dirname(file),
        `${paramCase(basename(file, '.svg'))}.svg`,
      );
      writeFileSync(newFile, `${result.data}\n`);
      resolve();
    });
  });
}
