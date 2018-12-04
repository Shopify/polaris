import {resolve, relative, dirname} from 'path';
import {readdirSync} from 'fs';
import {cp, mkdir, mv, rm, test as fileTest} from 'shelljs';
import Project from 'ts-simple-ast';
import {compilerOptions} from '../tsconfig.json';

const ROOT_PATH = resolve(__dirname, '..');
const SRC_PATH = resolve(ROOT_PATH, compilerOptions.baseUrl);
const BUILD_PATH = resolve(ROOT_PATH, 'build-intermediate');
const TS_BUILD_PATH = resolve(BUILD_PATH, 'typescript');

if (fileTest('-d', TS_BUILD_PATH)) {
  rm('-rf', TS_BUILD_PATH);
}

mkdir('-p', BUILD_PATH);
cp('-R', SRC_PATH, BUILD_PATH);
mv(resolve(BUILD_PATH, compilerOptions.baseUrl), TS_BUILD_PATH);

const modulePathsRegex = new RegExp(`^${getModulePathsRegex()}(/[^']+)?`);
const project = new Project();

project.addExistingSourceFiles(`${TS_BUILD_PATH}/**/*.ts`);
project.addExistingSourceFiles(`${TS_BUILD_PATH}/**/*.tsx`);

const files = project.getSourceFiles();

for (const file of files) {
  transformModulePaths(file, file.getImportDeclarations());
  transformModulePaths(file, file.getExportDeclarations());
}

project.save();

function transformModulePaths(file, moduleDeclarations) {
  const filePath = file.getFilePath();

  for (const moduleDeclaration of moduleDeclarations) {
    const path = getPathFromModuleDeclaration(moduleDeclaration);
    if (!isModulePath(path)) {
      continue;
    }
    const relativePath = absoluteToRelativePath(filePath, path);
    moduleDeclaration.setModuleSpecifier(relativePath);
  }
}

function getPathFromModuleDeclaration(moduleDeclaration) {
  const path = moduleDeclaration.getModuleSpecifier();
  return path ? path.getLiteralValue() : null;
}

function isModulePath(path) {
  return modulePathsRegex.test(path);
}

function absoluteToRelativePath(filePath, modulePath) {
  return relative(dirname(filePath), `${TS_BUILD_PATH}/${modulePath}`);
}

function getModulePathsRegex() {
  const moduleOptions = readdirSync(TS_BUILD_PATH);
  const moduleRegexOptions = moduleOptions
    .map((moduleName) =>
      moduleName.replace(/\.tsx?/, '').replace(/([.-])/g, '\\$1'),
    )
    .join('|');
  return `(${moduleRegexOptions})`;
}
