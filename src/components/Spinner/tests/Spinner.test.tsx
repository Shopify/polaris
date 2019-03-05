import * as React from 'react';
import {shallowWithAppProvider, mountWithAppProvider} from 'test-utilities';
import Spinner from '../Spinner';
import * as icons from '../icons';

jest.mock('../icons');

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
      expect(spinner.find('svg').hasClass('sizeLarge')).toBeTruthy();
    });

    it('renders a large spinner when size is large', () => {
      const spinner = shallowWithAppProvider(<Spinner size="large" />);
      expect(spinner.find('svg').hasClass('sizeLarge')).toBeTruthy();
    });

    it('renders a small spinner when size is small', () => {
      const spinner = shallowWithAppProvider(<Spinner size="small" />);
      expect(spinner.find('svg').hasClass('sizeSmall')).toBeTruthy();
    });

    it('renders a small spinner when color is white even if size is large', () => {
      const spinner = shallowWithAppProvider(
        <Spinner size="large" color="white" />,
      );
      expect(spinner.find('svg').hasClass('sizeSmall')).toBeTruthy();
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
      const spinner = shallowWithAppProvider(<Spinner />);
      expect(spinner.find('svg').prop('role')).toBe('status');
    });
  });

  describe('input', () => {
    it('renders an SVG when given a React Component as input', () => {
      setIconDataReact();
      const spinner = shallowWithAppProvider(<Spinner />);
      expect(spinner.find(MockReactSpinner)).toHaveLength(1);
    });

    it('renders an SVG when given an object as input', () => {
      setIconDataObject();
      const spinner = shallowWithAppProvider(<Spinner />);
      const svgHtml = spinner.find('svg').prop('dangerouslySetInnerHTML');
      expect(svgHtml && svgHtml.__html).toBe('Dance The Night Away');
    });
  });
});

function MockReactSpinner() {
  return <div>DALLA DALLA</div>;
}

const mockObjectSpinner = {
  body: 'Dance The Night Away',
  viewBox: '0 0 20 20',
};

function setIconDataReact() {
  Object.keys(icons).forEach((key) => {
    (icons as any)[key] = MockReactSpinner;
  });
}

function setIconDataObject() {
  Object.keys(icons).forEach((key) => {
    (icons as any)[key] = mockObjectSpinner;
  });
}
