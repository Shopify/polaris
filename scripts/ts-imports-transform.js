import {resolve, relative, dirname} from 'path';
import {readFileSync, readdirSync, writeFileSync} from 'fs';
import {sync as globSync} from 'glob';
import {compilerOptions} from '../tsconfig.json';

const ROOT_PATH = resolve(__dirname, '..');
const BASE_PATH = resolve(ROOT_PATH, compilerOptions.baseUrl);
const TYPES_PATH = resolve(ROOT_PATH, compilerOptions.declarationDir);

const typeFiles = globSync(`${TYPES_PATH}/**/*.d.ts`);
const moduleImportOptionsRegex = getModuleImportOptionsRegex();
const moduleImportRegex = new RegExp(
  `(import|export) .+ from '(${moduleImportOptionsRegex}(/[^']+)?)';`,
  'g',
);

for (const typeFile of typeFiles) {
  const contents = readFileSync(typeFile, 'utf-8');
  const newContents = replaceAbsoluteImports(typeFile, contents);
  writeFileSync(typeFile, newContents);
}

function replaceAbsoluteImports(path, contents) {
  return contents.replace(moduleImportRegex, (match, _, importPath) =>
    match.replace(importPath, absoluteToRelativeImportPath(path, importPath)),
  );
}

function absoluteToRelativeImportPath(filePath, importPath) {
  return relative(dirname(filePath), `${TYPES_PATH}/${importPath}`);
}

function getModuleImportOptionsRegex() {
  const moduleImportOptions = readdirSync(BASE_PATH);
  const moduleRegexOptions = moduleImportOptions
    .map((moduleName) =>
      moduleName.replace(/\.tsx?/, '').replace(/([.-])/g, '\\$1'),
    )
    .join('|');
  return `(${moduleRegexOptions})`;
}
