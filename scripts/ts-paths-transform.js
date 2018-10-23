import {resolve, relative, dirname} from 'path';
import {readdirSync} from 'fs';
import Project from 'ts-simple-ast';
import {compilerOptions} from '../tsconfig.json';

const ROOT_PATH = resolve(__dirname, '..');
const BASE_PATH = resolve(ROOT_PATH, compilerOptions.baseUrl);
const TYPES_PATH = resolve(ROOT_PATH, compilerOptions.declarationDir);
const MODULE_PATH_REGEX = new RegExp(`^${getModulePathsRegex()}(/[^']+)?`);

const project = new Project();
project.addExistingSourceFiles(`${TYPES_PATH}/**/*.d.ts`);

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
  return MODULE_PATH_REGEX.test(path);
}

function absoluteToRelativePath(filePath, modulePath) {
  return relative(dirname(filePath), `${TYPES_PATH}/${modulePath}`);
}

function getModulePathsRegex() {
  const moduleOptions = readdirSync(BASE_PATH);
  const moduleRegexOptions = moduleOptions
    .map((moduleName) =>
      moduleName.replace(/\.tsx?/, '').replace(/([.-])/g, '\\$1'),
    )
    .join('|');
  return `(${moduleRegexOptions})`;
}
