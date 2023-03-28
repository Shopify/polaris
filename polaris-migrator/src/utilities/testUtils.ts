/* eslint-disable jest/no-export, jest/valid-title */
import fs from 'fs';
import path from 'path';

import jscodeshift from 'jscodeshift';
import type {FileInfo} from 'jscodeshift';
import prettier from 'prettier';

export default async function applyTransform(
  transform: any,
  input: FileInfo,
  options?: {[option: string]: any},
) {
  // Handle ES6 modules using default export for the transform
  const transformer = transform.default ? transform.default : transform;
  const output = await transformer(
    input,
    {
      jscodeshift: jscodeshift.withParser('tsx'),
      stats: () => {},
    },
    options || {},
  );

  return (output || '').trim();
}

interface ParserExtensionMap {
  [key: string]: prettier.BuiltInParserName;
}

const parserExtensionMap: ParserExtensionMap = {
  tsx: 'typescript',
  scss: 'scss',
};

interface TestArgs {
  fixture: string;
  migration: string;
  extension?: string;
  options?: {[option: string]: any};
}

export function check(
  dirName: string,
  {fixture, migration, extension = 'tsx', options = {}}: TestArgs,
) {
  describe(migration, () => {
    it(fixture, async () => {
      const fixtureDir = path.join(dirName);
      const inputPath = path.join(fixtureDir, `${fixture}.input.${extension}`);
      const parser = parserExtensionMap[extension];
      const source = fs.readFileSync(inputPath, 'utf8');
      const expected = fs.readFileSync(
        path.join(fixtureDir, `${fixture}.output.${extension}`),
        'utf8',
      );
      // Assumes transform is one level up from tests directory
      const module = await import(path.join(dirName, '..', migration));
      const output = await applyTransform(
        {...module},
        {source, path: inputPath},
        options,
      );

      // Format output and expected with prettier for white spaces and line breaks consistency
      expect(prettier.format(output, {parser})).toBe(
        prettier.format(expected, {parser}),
      );
    });
  });
}
