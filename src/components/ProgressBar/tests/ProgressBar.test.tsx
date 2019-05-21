import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import ProgressBar from '../ProgressBar';

describe('<ProgressBar />', () => {
  it('sets the progress element to 80 when the progress is 80', () => {
    const progress = mountWithAppProvider(
      <ProgressBar progress={80}>test</ProgressBar>,
    );
    expect(progress.find('progress').prop('value')).toBe(80);
  });

  it('sets the progress element to 0 when the progress is negative', () => {
    const progress = mountWithAppProvider(
      <ProgressBar progress={-40}>test</ProgressBar>,
    );
    expect(progress.find('progress').prop('value')).toBe(0);
  });

  it('sets the progress element to 100 when the progress is greater than 100', () => {
    const progress = mountWithAppProvider(
      <ProgressBar progress={120}>test</ProgressBar>,
    );
    expect(progress.find('progress').prop('value')).toBe(100);
  });

  it('sets the progress element to 0 when progress is not provided', () => {
    const progress = mountWithAppProvider(<ProgressBar>test</ProgressBar>);
    expect(progress.find('progress').prop('value')).toBe(0);
  });

  describe('console.warn', () => {
    const oldEnv = process.env;

    beforeEach(() => {
      jest.resetModules();
      process.env = {...oldEnv};
      delete process.env.NODE_ENV;
    });

    afterEach(() => {
      process.env = oldEnv;
    });

    it('warns when a negative number is passed to progress in development', () => {
      const warnSpy = jest.spyOn(console, 'warn');
      process.env.NODE_ENV = 'development';

      mountWithAppProvider(<ProgressBar progress={-1}>test</ProgressBar>);

      expect(warnSpy).toHaveBeenCalledWith(
        'Values passed to the progress prop shouldn’t be negative. Resetting -1 to 0.',
      );
    });

    it('warns when a number larger than 100 is passed to progress in development', () => {
      const warnSpy = jest.spyOn(console, 'warn');
      process.env.NODE_ENV = 'development';

      mountWithAppProvider(<ProgressBar progress={101}>test</ProgressBar>);

      expect(warnSpy).toHaveBeenCalledWith(
        'Values passed to the progress prop shouldn’t exceed 100. Setting 101 to 100.',
      );
    });
  });
});
