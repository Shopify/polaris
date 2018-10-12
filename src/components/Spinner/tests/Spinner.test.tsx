import * as React from 'react';
import {shallowWithAppProvider, mountWithAppProvider} from 'tests/utilities';
import Spinner from '../Spinner';

describe('<Spinner />', () => {
  describe('accessibilityLabel', () => {
    it('uses the label as the aria-label for the spinner', () => {
      const spinner = shallowWithAppProvider(
        <Spinner accessibilityLabel="Content is loading" />,
      );
      expect(spinner.prop('aria-label')).toBe('Content is loading');
    });
  });

  describe('size', () => {
    it('renders a large spinner by default', () => {
      const spinner = shallowWithAppProvider(<Spinner />);
      expect(spinner.find('svg').prop('viewBox')).toBe('0 0 44 44');
    });

    it('renders a large spinner when size is large', () => {
      const spinner = mountWithAppProvider(<Spinner size="large" />);
      expect(spinner.find('svg').prop('viewBox')).toBe('0 0 44 44');
    });

    it('renders a small spinner when size is small', () => {
      const spinner = shallowWithAppProvider(<Spinner size="small" />);
      expect(spinner.find('svg').prop('viewBox')).toBe('0 0 20 20');
    });
  });

  describe('color', () => {
    it('renders a white spinner when color is white', () => {
      const spinner = mountWithAppProvider(<Spinner color="white" />);
      expect(spinner.prop('color')).toBe('white');
    });
  });

  describe('role', () => {
    it('sets the role to status to denote advisory information to screen readers', () => {
      const spinner = shallowWithAppProvider(<Spinner />);
      expect(spinner.find('svg').prop('role')).toBe('status');
    });
  });
});
