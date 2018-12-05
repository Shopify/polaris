import {resolve, relative, dirname} from 'path';
import {readdirSync} from 'fs';
import Project from 'ts-simple-ast';

const [, , srcPath] = process.argv;

if (!srcPath) {
  throw new Error('Usage: ts-paths-transform <path_to_src_folder>');
}

const SOURCE_PATH = resolve(__dirname, srcPath);
const MODULE_PATHS_REGEX = new RegExp(`^${getModulePathsRegex()}(/[^']+)?`);
const project = new Project();

project.addExistingSourceFiles(`${SOURCE_PATH}/**/*.ts`);
project.addExistingSourceFiles(`${SOURCE_PATH}/**/*.tsx`);

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
  return MODULE_PATHS_REGEX.test(path);
}

function absoluteToRelativePath(filePath, modulePath) {
  return relative(dirname(filePath), `${SOURCE_PATH}/${modulePath}`);
}

function getModulePathsRegex() {
  const moduleOptions = readdirSync(SOURCE_PATH);
  const moduleRegexOptions = moduleOptions
    .map((moduleName) =>
      moduleName.replace(/\.tsx?/, '').replace(/([.-])/g, '\\$1'),
    )
    .join('|');
  return `(${moduleRegexOptions})`;
}
