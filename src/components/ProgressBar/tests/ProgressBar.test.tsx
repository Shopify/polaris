import React from 'react';
import {mountWithApp} from 'test-utilities';

import {ProgressBar} from '../ProgressBar';

describe('<ProgressBar />', () => {
  it('sets the progress element to 80 when the progress is 80', () => {
    const progress = mountWithApp(<ProgressBar progress={80} />);
    expect(progress).toContainReactComponent('progress', {value: 80});
  });

  it('sets the progress element to 0 when the progress is negative', () => {
    const progress = mountWithApp(<ProgressBar progress={-40} />);
    expect(progress).toContainReactComponent('progress', {value: 0});
  });

  it('sets the progress element to 100 when the progress is greater than 100', () => {
    const progress = mountWithApp(<ProgressBar progress={120} />);
    expect(progress).toContainReactComponent('progress', {value: 100});
  });

  it('sets the progress element to 0 when progress is not provided', () => {
    const progress = mountWithApp(<ProgressBar />);
    expect(progress).toContainReactComponent('progress', {value: 0});
  });

  describe('animated prop', () => {
    it('sets the progress bar to include the Animated class by default', () => {
      const progress = mountWithApp(<ProgressBar progress={20} />);
      expect(progress).toContainReactComponent('div', {
        className: 'Indicator Animated',
      });
    });
    it('sets the progress bar to exclude the Animated class when animated is false', () => {
      const progress = mountWithApp(
        <ProgressBar animated={false} progress={20} />,
      );
      expect(progress).toContainReactComponent('div', {
        className: 'Indicator',
      });
    });
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

      mountWithApp(<ProgressBar progress={-1} />);

      expect(warnSpy).toHaveBeenCalledWith(
        'Values passed to the progress prop shouldn’t be negative. Resetting -1 to 0.',
      );
    });

    it('warns when a number larger than 100 is passed to progress in development', () => {
      process.env.NODE_ENV = 'development';

      mountWithApp(<ProgressBar progress={101} />);

      expect(warnSpy).toHaveBeenCalledWith(
        'Values passed to the progress prop shouldn’t exceed 100. Setting 101 to 100.',
      );
    });
  });
});
