import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';
import {Spinner} from '../Spinner';
import {Image} from '../../Image';
import {VisuallyHidden} from '../../VisuallyHidden';

describe('<Spinner />', () => {
  describe('accessibilityLabel', () => {
    it('does not render by default', () => {
      const spinner = mountWithApp(<Spinner />);
      expect(spinner).not.toContainReactComponent(VisuallyHidden);
    });

    it('renders when provided', () => {
      const spinner = mountWithApp(
        <Spinner accessibilityLabel="Content is loading" />,
      );
      expect(spinner).toContainReactComponent(VisuallyHidden, {
        children: 'Content is loading',
      });
    });
  });

  describe('size', () => {
    it('renders a large spinner by default', () => {
      const spinner = mountWithAppProvider(<Spinner />);
      expect(spinner.find(Image).hasClass('sizeLarge')).toBeTruthy();
    });

    it('renders a large spinner when size is large', () => {
      const spinner = mountWithAppProvider(<Spinner size="large" />);
      expect(spinner.find(Image).hasClass('sizeLarge')).toBeTruthy();
    });

    it('renders a small spinner when size is small', () => {
      const spinner = mountWithAppProvider(<Spinner size="small" />);
      expect(spinner.find(Image).hasClass('sizeSmall')).toBeTruthy();
    });

    it('renders a small spinner when color is white even if size is large', () => {
      const spinner = mountWithAppProvider(
        <Spinner size="large" color="white" />,
      );
      expect(spinner.find(Image).hasClass('sizeSmall')).toBeTruthy();
    });
  });

  describe('role', () => {
    const mockAccessibilityLabel = 'mock a11y label';
    it('sets the role to status to denote advisory information to screen readers when a live region is not active', () => {
      const spinner = mountWithApp(
        <Spinner
          accessibilityLabel={mockAccessibilityLabel}
          hasFocusableParent={false}
        />,
      );
      expect(spinner).toContainReactComponentTimes('span', 1, {role: 'status'});
    });

    it('does not set role to status when a live region is active', () => {
      const spinner = mountWithApp(
        <Spinner
          accessibilityLabel={mockAccessibilityLabel}
          hasFocusableParent
        />,
      );
      expect(spinner).not.toContainReactComponent('span', {role: 'status'});
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

    it('a large spinner with an unavailable color warns in development', () => {
      process.env.NODE_ENV = 'development';

      mountWithAppProvider(<Spinner size="large" color="white" />);

      expect(warnSpy).toHaveBeenCalledWith(
        'The color white is not meant to be used on large spinners. The colors available on large spinners are: teal, inkLightest',
      );
    });
  });
});
