import glob from 'glob';

import {analyzeCustomProperties} from '../analyze-custom-properties';

jest.mock('glob', () => ({
  __esModule: true,
  default: jest.fn((_a, _b, cb) =>
    // eslint-disable-next-line node/no-callback-literal
    cb(false, ['scripts/analyze-custom-properties/tests/fixtures.scss']),
  ),
}));

const globSpy = (glob as unknown) as jest.Mock;

describe('analyzeCustomProperties', () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log');
    consoleLogSpy.mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    globSpy.mockReset();
  });

  it('sets logLevel to verbose', () => {
    analyzeCustomProperties({});
    expect(consoleLogSpy).toHaveBeenCalledTimes(3);
  });

  it(`globs all css files by default`, () => {
    analyzeCustomProperties({});
    expect(globSpy).toHaveBeenCalledWith(
      '**/*.css',
      expect.any(Object),
      expect.any(Function),
    );
  });

  it(`catches errors rather than throwing`, async () => {
    // eslint-disable-next-line node/no-callback-literal
    globSpy.mockImplementationOnce((_a, _b, cb) => cb(true, []));
    let error = false;
    await analyzeCustomProperties({}).catch((err) => {
      error = err;
    });
    expect(error).toBe(true);
  });
});
