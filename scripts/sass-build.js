/* eslint-disable no-console */

import glob from 'glob';
import {
  writeFileSync,
  readFileSync,
  outputFileSync,
  readJSONSync,
  createWriteStream,
  lstatSync,
  existsSync,
} from 'fs-extra';
import {basename, resolve, join, relative} from 'path';
import {cp, mkdir} from 'shelljs';
import archiver from 'archiver';

const root = resolve(__dirname, '..');
const intermediateBuild = resolve(root, './build-intermediate');
const srcStyles = resolve(intermediateBuild, './styles');
const srcComponents = resolve(intermediateBuild, './components');

export default function generateSassBuild(destinationDir) {
  const classnameTokens = readJSONSync(`${destinationDir}/polaris.tokens.json`);

  const buildSass = resolve(destinationDir, 'sass');
  const buildStyles = join(buildSass, 'styles');
  const global = join(buildStyles, 'global');
  const foundation = join(buildStyles, 'foundation');
  const shared = join(buildStyles, 'shared');
  const components = join(buildStyles, 'components');
  const tokens = join(buildStyles, 'polaris-tokens');

  mkdir('-p', components, foundation, global, shared, tokens);
  cp(join(srcStyles, 'global', '*.scss'), global);
  cp(join(srcStyles, 'foundation', '*.scss'), foundation);
  cp(join(srcStyles, 'shared', '*.scss'), shared);
  cp(join(srcStyles, 'polaris-tokens', '*.scss'), tokens);
  cp(join(srcStyles, 'global.scss'), join(buildStyles, 'global.scss'));
  cp(join(srcStyles, 'foundation.scss'), join(buildStyles, 'foundation.scss'));
  cp(join(srcStyles, 'shared.scss'), join(buildStyles, 'shared.scss'));
  cp(resolve(srcStyles, '../styles.scss'), join(buildSass, 'styles.scss'));

  glob.sync(join(srcComponents, '*')).forEach((componentPath) => {
    if (!lstatSync(componentPath).isDirectory()) {
      return;
    }

    const componentName = basename(componentPath);
    const componentSass = resolve(componentPath, `${componentName}.scss`);

    if (!existsSync(componentSass)) {
      return;
    }

    const componentBuildDirectory = resolve(components, componentName);
    mkdir(componentBuildDirectory);

    // Loop through component sass files and copy to build
    glob.sync(join(componentPath, '/**/*.scss')).forEach((sassPath) => {
      const sassFile = sassPath.replace(`${componentPath}/`, '');
      const sassBuild = resolve(componentBuildDirectory, sassFile);

      let file = readFileSync(sassPath, 'utf8');
      file = namespaceSassClasses(sassPath, file, classnameTokens);
      outputFileSync(sassBuild, file);
    });

    // Create component index with imports
    const sassImports = glob
      .sync(join(componentBuildDirectory, '**/*.scss'))
      .map((absPath) =>
        relative(componentBuildDirectory, absPath).replace('.scss', ''),
      )
      .map((relativePath) => `@import '${componentName}/${relativePath}';`)
      .join('\n');

    writeFileSync(`${components}/${componentName}.scss`, sassImports);
  });

  createSassIndex(components);

  return generateSassZip(buildSass, destinationDir);
}

// see https://archiverjs.com/docs/
function generateSassZip(sourceDir, destinationDir) {
  // eslint-disable-next-line promise/param-names
  return new Promise((resolveSass, reject) => {
    const output = createWriteStream(join(destinationDir, 'Sass.zip'));
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
  const directory = basename(dir);

  const sassImports = glob
    .sync(join(dir, '**/*.scss'))
    .map((absPath) => relative(dir, absPath).replace('.scss', ''))
    .map((relativePath) => `@import '${directory}/${relativePath}';`)
    .join('\n');

  writeFileSync(`${dir}.scss`, sassImports);
}

function namespaceSassClasses(filePath, file, tokens) {
  if (basename(filePath, '.scss') === 'variables') {
    return file;
  }

  const sassPath = resolve(filePath);
  const namespaces = tokens[sassPath];

  if (!namespaces) {
    console.log(`File path not in tokens: ${filePath}`);
    return file;
  }

  return Object.keys(namespaces)
    .filter(Boolean)
    .reduce(
      (sass, className) =>
        sass.replace(
          new RegExp(`\\.${className}(?!-)\\b`, 'g'),
          `.${namespaces[className]}`,
        ),
      file,
    );
}
