import fs from 'fs';
import path from 'path';

import globby from 'globby';

interface TestArgs {
  it: string;
  migration: (fileContent: string) => string;
  fixture: string;
  mode?: 'only' | 'skip' | 'standard';
  before?: () => void;
  after?: () => void;
}

export function createCheckFn(testDir: string) {
  return check(testDir);
}

function check(testDir: string) {
  return ({
    it: name,
    migration,
    fixture,
    before = () => {},
    after = () => {},
    mode = 'standard',
  }: TestArgs) => {
    // eslint-disable-next-line no-nested-ternary
    const run = mode === 'only' ? it.only : mode === 'skip' ? it.skip : it;

    const originalPath = globby.sync(
      path.join(testDir, `${fixture}.input.*`),
    )[0];
    const expectedPath = globby.sync(
      path.join(testDir, `${fixture}.output.*`),
    )[0];

    const original = fs.readFileSync(originalPath, 'utf8');
    const expected = fs.readFileSync(expectedPath, 'utf8');

    run(name, () => {
      before();
      try {
        const output = migration(original);
        expect(output).toBe(expected);
      } catch (error: any) {
        after();
        throw error;
      }
      after();
    });
  };
}
