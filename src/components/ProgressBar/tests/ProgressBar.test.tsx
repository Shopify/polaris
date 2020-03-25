import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';

import {ProgressBar} from '../ProgressBar';

describe('<ProgressBar />', () => {
  it('sets the progress element to 80 when the progress is 80', () => {
    const progress = mountWithAppProvider(<ProgressBar progress={80} />);
    expect(progress.find('progress').prop('value')).toBe(80);
  });

  it('sets the progress element to 0 when the progress is negative', () => {
    const progress = mountWithAppProvider(<ProgressBar progress={-40} />);
    expect(progress.find('progress').prop('value')).toBe(0);
  });

  it('sets the progress element to 100 when the progress is greater than 100', () => {
    const progress = mountWithAppProvider(<ProgressBar progress={120} />);
    expect(progress.find('progress').prop('value')).toBe(100);
  });

  it('sets the progress element to 0 when progress is not provided', () => {
    const progress = mountWithAppProvider(<ProgressBar />);
    expect(progress.find('progress').prop('value')).toBe(0);
  });

  describe('console.warn', () => {
    const oldEnv = process.env;
    let warnSpy: jest.SpyInstance;

    beforeEach(() => {
      jest.resetModules();
      process.env = {...oldEnv};
      delete process.env.NODE_ENV;

      warnSpy = jest.spyOn(console, 'warn');
      warnSpy.mockImplementation(() => {});
    });

    afterEach(() => {
      process.env = oldEnv;
      warnSpy.mockRestore();
    });

    it('warns when a negative number is passed to progress in development', () => {
      process.env.NODE_ENV = 'development';

      mountWithAppProvider(<ProgressBar progress={-1} />);

      expect(warnSpy).toHaveBeenCalledWith(
        'Values passed to the progress prop shouldn’t be negative. Resetting -1 to 0.',
      );
    });

    it('warns when a number larger than 100 is passed to progress in development', () => {
      process.env.NODE_ENV = 'development';

      mountWithAppProvider(<ProgressBar progress={101} />);

      expect(warnSpy).toHaveBeenCalledWith(
        'Values passed to the progress prop shouldn’t exceed 100. Setting 101 to 100.',
      );
    });
  });
});
