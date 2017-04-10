/* eslint-disable no-console */
import {writeFileSync, readFileSync, readJSONSync} from 'fs-extra';
import glob from 'glob';
import {basename, resolve} from 'path';
import {cp, mkdir} from 'shelljs';

const STRIP_IMPORTS_REGEX = new RegExp(/@import\s*(['"])([^"';]+)\1;?\n/, 'g');

const root = resolve(__dirname, '..');
const build = resolve(root, './build');
const styles = resolve(build, './src/styles');
const buildSass = resolve(build, './sass');
const foundation = resolve(buildSass, './foundation');
const components = resolve(buildSass, './components');

export default function generateSassBuild() {
  const classnameTokens = readJSONSync(`${build}/quilt.tokens.json`);

  mkdir('-p', components, foundation);
  cp(`${styles}/foundation/*.scss`, foundation);
  cp(`${styles}/all.scss`, `${buildSass}/all.scss`);
  cp(`${styles}/global.scss`, `${buildSass}/global.scss`);
  cp(`${styles}/foundation.scss`, `${buildSass}/foundation.scss`);

  glob.sync(`${build}/src/components/**/*.scss`).forEach((filePath) => {
    const componentSass = resolve(components, basename(filePath));
    let file = readFileSync(filePath, 'utf8');
    file = removeSassImports(file);
    file = namespaceSassClasses(filePath, file, classnameTokens);
    writeFileSync(componentSass, file);
  });
  createSassIndex(components);
}

function createSassIndex(dir) {
  const sassImports = glob.sync(`${dir}/*.scss`)
    .map((filePath) => basename(filePath).replace('.scss', ''))
    .map((component) => `@import '${component}';`)
    .join('\n');

  writeFileSync(`${dir}.scss`, sassImports);
}

function removeSassImports(file) {
  return file.replace(STRIP_IMPORTS_REGEX, '');
}

function namespaceSassClasses(filePath, file, tokens) {
  const sassPath = resolve(filePath);
  const namespaces = tokens[sassPath];

  if (!namespaces) {
    console.log(`File path not in tokens: ${filePath}`);
    return file;
  }

  return Object.keys(namespaces)
    .filter(Boolean)
    .reduce((sass, className) =>
      sass.replace(new RegExp(`\\.${className}`, 'g'), `.${namespaces[className]}`), file
    );
}
