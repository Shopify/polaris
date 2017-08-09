/* eslint-disable no-console */

import glob from 'glob';
import {writeFileSync, readFileSync, readJSONSync, createWriteStream} from 'fs-extra';
import {basename, resolve, join} from 'path';
import {cp, mkdir} from 'shelljs';
import archiver from 'archiver';

const root = resolve(__dirname, '..');
const intermediateBuild = resolve(root, './build-intermediate');
const srcStyles = resolve(intermediateBuild, './styles');

export default function generateSassBuild(destinationDir) {
  const classnameTokens = readJSONSync(`${destinationDir}/polaris.tokens.json`);

  const buildSass = resolve(destinationDir, 'sass');
  const buildStyles = join(buildSass, 'styles');
  const foundation = join(buildStyles, 'foundation');
  const shared = join(buildStyles, 'shared');
  const components = join(buildStyles, 'components');

  mkdir('-p', components, foundation, shared);
  cp(join(srcStyles, 'foundation', '*.scss'), foundation);
  cp(join(srcStyles, 'shared', '*.scss'), shared);
  cp(join(srcStyles, 'global.scss'), join(buildStyles, 'global.scss'));
  cp(join(srcStyles, 'foundation.scss'), join(buildStyles, 'foundation.scss'));
  cp(join(srcStyles, 'shared.scss'), join(buildStyles, 'shared.scss'));
  cp(resolve(srcStyles, '../styles.scss'), join(buildSass, 'styles.scss'));

  glob.sync(resolve(intermediateBuild, './components/**/*.scss')).forEach((filePath) => {
    const componentSass = resolve(components, basename(filePath));
    let file = readFileSync(filePath, 'utf8');
    file = namespaceSassClasses(filePath, file, classnameTokens);
    writeFileSync(componentSass, file);
  });

  createSassIndex(components);
  createSassEntry(buildSass);
  return generateSassZip(buildSass, destinationDir);
}

function createSassEntry(buildSass) {
  mkdir(buildSass);
  cp('-r', resolve(buildSass, '*'), root);
}

// see https://archiverjs.com/docs/
function generateSassZip(sourceDir, destinationDir) {
  // eslint-disable-next-line promise/param-names
  return new Promise((resolveSass, reject) => {
    const output = createWriteStream(join(destinationDir, 'sass.zip'));
    const archive = archiver('zip', {store: true});

    output.on('close', () => {
      console.log(`Sass zip complete: ${archive.pointer()} total bytes`);
      resolveSass();
    });

    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);
    archive.directory(sourceDir, './');
    archive.finalize();
  });
}

function createSassIndex(dir) {
  const dirname = basename(dir);

  const sassImports = glob.sync(join(dir, '*.scss'))
    .map((filePath) => basename(filePath).replace('.scss', ''))
    .map((component) => `@import '${dirname}/${component}';`)
    .join('\n');

  writeFileSync(`${dir}.scss`, sassImports);
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
    .reduce((sass, className) => (
      sass.replace(new RegExp(`\\.${className}(?!-)`, 'g'), `.${namespaces[className]}`)
    ), file);
}
