import React from 'react';
import {CSSTransition} from 'react-transition-group';
import {mountWithApp} from 'tests/utilities';

import {ProgressBar} from '../ProgressBar';
import styles from '../ProgressBar.scss';

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

  it('sets the aria-labelledby attribute for progress', () => {
    const progressBarLabelId = 'label-id';

    const progress = mountWithApp(
      <ProgressBar ariaLabelledBy={progressBarLabelId} />,
    );

    expect(progress).toContainReactComponent('progress', {
      'aria-labelledby': progressBarLabelId,
    });
  });

  describe('animated prop', () => {
    it('sets the progress bar CSSTransition to have a non-zero timeout value by default', () => {
      const progress = mountWithApp(<ProgressBar progress={20} />);
      const cssTransition = progress.find(CSSTransition);
      const indicator = progress.find('div', {
        className: styles.Indicator,
      });

      const indicatorDuration =
        indicator?.props.style![
          '--pc-progress-bar-duration' as keyof React.CSSProperties
        ];

      expect(indicatorDuration).not.toBe('0ms');
      expect(cssTransition!.props.timeout).toBeGreaterThan(0);
    });

    it('sets the progress bar CSSTransition to have timeout of zero when animated is false', () => {
      const progress = mountWithApp(
        <ProgressBar animated={false} progress={20} />,
      );

      const cssTransition = progress.find(CSSTransition);
      const indicator = progress.find('div', {
        className: styles.Indicator,
      });

      const indicatorDuration =
        indicator?.props.style![
          '--pc-progress-bar-duration' as keyof React.CSSProperties
        ];

      expect(indicatorDuration).toBe('0ms');
      expect(cssTransition!.props.timeout).toBe(0);
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
