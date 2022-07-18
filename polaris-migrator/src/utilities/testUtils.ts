/* eslint-disable jest/no-export, jest/valid-title, @typescript-eslint/no-var-requires */
import fs from 'node:fs';
import path from 'node:path';

import prettier from 'prettier';

const applyTransform = require('jscodeshift/dist/testUtils').applyTransform;

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
}

export function check(
  dirName: string,
  {fixture, migration, extension = 'tsx'}: TestArgs,
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
      const output = applyTransform({...module, parser: 'tsx'}, {}, {source});

      // Format output and expected with prettier for white spaces and line breaks consistency
      expect(prettier.format(output, {parser})).toBe(
        prettier.format(expected, {parser}),
      );
    });
  });
}
