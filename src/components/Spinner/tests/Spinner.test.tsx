import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import Spinner from '../Spinner';
import Image from '../../Image';

describe('<Spinner />', () => {
  describe('accessibilityLabel', () => {
    it('uses the label as the aria-label for the spinner', () => {
      const spinner = mountWithAppProvider(
        <Spinner accessibilityLabel="Content is loading" />,
      );
      expect(spinner.find(Image).prop('aria-label')).toBe('Content is loading');
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

  describe('color', () => {
    it('renders an inkLightest spinner when color is inkLightest', () => {
      const spinner = mountWithAppProvider(<Spinner color="inkLightest" />);
      expect(spinner.prop('color')).toBe('inkLightest');
    });
  });

  describe('role', () => {
    it('sets the role to status to denote advisory information to screen readers', () => {
      const spinner = mountWithAppProvider(<Spinner />);
      expect(spinner.find(Image).prop('role')).toBe('status');
    });
  });
});
