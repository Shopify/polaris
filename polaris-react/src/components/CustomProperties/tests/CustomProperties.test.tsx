import type {ColorScheme} from '@shopify/polaris-tokens';
import React from 'react';
import {mountWithApp} from 'tests/utilities';

// eslint-disable-next-line import/no-deprecated
import {CustomProperties, DEFAULT_COLOR_SCHEME} from '../CustomProperties';

interface ColorSchemeAttribute {
  'p-color-scheme': ColorScheme;
}

describe('<CustomProperties />', () => {
  it('renders its children', () => {
    const customProperties = mountWithApp(
      <CustomProperties>Hello world</CustomProperties>,
    );

    expect(customProperties.find('div')!.text()).toBe('Hello world');
  });

  it('forwards className prop', () => {
    const customProperties = mountWithApp(
      <CustomProperties className="forwarded" />,
    );

    expect(customProperties).toContainReactComponent('div', {
      className: 'forwarded',
    });
  });

  describe('as', () => {
    it('renders div tag by default', () => {
      const customProperties = mountWithApp(<CustomProperties />);

      expect(customProperties).toContainReactComponent('div');
    });

    it('renders section tag if provided', () => {
      const customProperties = mountWithApp(<CustomProperties as="section" />);

      expect(customProperties).toContainReactComponent('section');
    });
  });

  describe('color-scheme', () => {
    it('renders default color-scheme', () => {
      const customProperties = mountWithApp(<CustomProperties />);

      expect(
        (customProperties.find('div')!.props as ColorSchemeAttribute)[
          'p-color-scheme'
        ],
      ).toBe(DEFAULT_COLOR_SCHEME);
    });

    it('renders light color-scheme', () => {
      const customProperties = mountWithApp(
        <CustomProperties colorScheme="light" />,
      );

      expect(
        (customProperties.find('div')!.props as ColorSchemeAttribute)[
          'p-color-scheme'
        ],
      ).toBe('light');
    });

    it('renders dark color-scheme', () => {
      const customProperties = mountWithApp(
        <CustomProperties colorScheme="dark" />,
      );

      expect(
        (customProperties.find('div')!.props as ColorSchemeAttribute)[
          'p-color-scheme'
        ],
      ).toBe('dark');
    });
  });
});
