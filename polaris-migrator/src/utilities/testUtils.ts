import {API, FileInfo, Options} from 'jscodeshift';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const applyTransform = require('jscodeshift/dist/testUtils').applyTransform;

interface TestArgs {
  it: string;
  original: string;
  expected: string;
  migration: (file: FileInfo, jscodeshift: API, options: Options) => void;
  mode?: 'only' | 'skip' | 'standard';
  before?: () => void;
  after?: () => void;
}

export function check({
  it: name,
  original,
  expected,
  migration,
  before = () => {},
  after = () => {},
  mode = 'standard',
}: TestArgs) {
  // eslint-disable-next-line no-nested-ternary
  const run = mode === 'only' ? it.only : mode === 'skip' ? it.skip : it;

  run(name, () => {
    before();
    try {
      const output = applyTransform(
        {default: migration, parser: 'tsx'},
        {},
        {source: original},
      );
      expect(output).toBe(expected.trim());
    } catch (error: any) {
      // a failed assertion will throw
      after();
      throw error;
    }
    // will only be hit if we don't throw
    after();
  });
}
