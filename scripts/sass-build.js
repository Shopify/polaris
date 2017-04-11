/* eslint-disable no-console */
import {writeFileSync, readFileSync, readJSONSync, createWriteStream} from 'fs-extra';
import glob from 'glob';
import {basename, resolve, join} from 'path';
import {cp, mkdir} from 'shelljs';
import archiver from 'archiver';

const STRIP_IMPORTS_REGEX = new RegExp(/@import\s*(['"])([^"';]+)\1;?\n/, 'g');

const root = resolve(__dirname, '..');
const build = resolve(root, './build');
const styles = resolve(root, './styles');
const srcStyles = resolve(build, './src/styles');
const buildSass = resolve(build, './sass');
const buildStyles = resolve(buildSass, './styles');
const foundation = resolve(buildStyles, './foundation');
const components = resolve(buildStyles, './components');

export default function generateSassBuild() {
  const classnameTokens = readJSONSync(`${build}/quilt.tokens.json`);

  mkdir('-p', components, foundation);
  cp(join(srcStyles, 'foundation', '*.scss'), foundation);
  cp(join(srcStyles, 'global.scss'), join(buildStyles, 'global.scss'));
  cp(join(srcStyles, 'foundation.scss'), join(buildStyles, 'foundation.scss'));
  cp(resolve(srcStyles, '../styles.scss'), join(buildSass, 'styles.scss'));

  glob.sync(`${build}/src/components/**/*.scss`).forEach((filePath) => {
    const componentSass = resolve(components, basename(filePath));
    let file = readFileSync(filePath, 'utf8');
    file = removeSassImports(file);
    file = namespaceSassClasses(filePath, file, classnameTokens);
    writeFileSync(componentSass, file);
  });
  createSassIndex(components);

  createSassEntry();
  generateSassZip();
}

function createSassEntry() {
  mkdir(styles);
  cp('-r', resolve(buildSass, '*'), root);
}

// see https://archiverjs.com/docs/
function generateSassZip() {
  // eslint-disable-next-line promise/param-names
  return new Promise((resolveSass, reject) => {
    const output = createWriteStream(join(build, 'sass.zip'));
    const archive = archiver('zip', {store: true});

    output.on('close', () => {
      console.log(`Sass zip complete: ${archive.pointer()} total bytes`);
      resolveSass();
    });

    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);
    archive.directory(buildSass, './');
    archive.finalize();
  });
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
