import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Text} from '../Text';

describe('<Text />', () => {
  const text = "It's Friday then";

  it('renders its children', () => {
    const headingText = mountWithApp(
      <Text as="h1" variant="heading4xl">
        {text}
      </Text>,
    );

    expect(headingText).toContainReactText(text);
  });

  it('renders the specified html element', () => {
    const bodyText = mountWithApp(
      <Text as="p" variant="bodySm">
        {text}
      </Text>,
    );

    expect(bodyText.find('p')).not.toBeNull();
  });

  it('renders default custom properties of the variant', () => {
    const headingText = mountWithApp(
      <Text as="h1" variant="headingLg">
        {text}
      </Text>,
    );

    expect(headingText).toContainReactComponent('h1', {
      style: {
        '--pc-text-font-line-height': 'var(--p-font-line-height-3)',
        '--pc-text-font-size': 'var(--p-font-size-300)',
        '--pc-text-font-weight': 'var(--p-font-weight-semibold)',
      } as React.CSSProperties,
    });

    const bodyText = mountWithApp(
      <Text as="p" variant="bodySm">
        {text}
      </Text>,
    );

    expect(bodyText).toContainReactComponent('p', {
      style: {
        '--pc-text-font-line-height': 'var(--p-font-line-height-1)',
        '--pc-text-font-size': 'var(--p-font-size-75)',
        '--pc-text-font-weight': 'var(--p-font-weight-regular)',
      } as React.CSSProperties,
    });
  });

  it('renders its children with variant text style', () => {
    const headingText = mountWithApp(
      <Text as="h2" variant="heading3xl">
        {text}
      </Text>,
    );

    expect(headingText).toContainReactComponent('h2', {
      className: expect.stringContaining('heading3xl'),
    });
  });

  describe('alignment', () => {
    it('renders children with the alignment custom property set', () => {
      const bodyText = mountWithApp(
        <Text as="p" variant="bodySm" alignment="center">
          {text}
        </Text>,
      );

      expect(bodyText).toContainReactComponent('p', {
        style: {
          '--pc-text-alignment': 'center',
          '--pc-text-display': 'block',
          '--pc-text-font-line-height': 'var(--p-font-line-height-1)',
          '--pc-text-font-size': 'var(--p-font-size-75)',
          '--pc-text-font-weight': 'var(--p-font-weight-regular)',
        } as React.CSSProperties,
      });
    });
  });

  describe('color', () => {
    it('renders children with the color custom property set', () => {
      const bodyText = mountWithApp(
        <Text as="p" variant="bodySm" color="success">
          {text}
        </Text>,
      );

      expect(bodyText).toContainReactComponent('p', {
        style: {
          '--pc-text-color': 'var(--p-text-success)',
          '--pc-text-font-line-height': 'var(--p-font-line-height-1)',
          '--pc-text-font-size': 'var(--p-font-size-75)',
          '--pc-text-font-weight': 'var(--p-font-weight-regular)',
        } as React.CSSProperties,
      });
    });
  });

  describe('fontWeight', () => {
    it('overrides the default font weight custom property of the variant', () => {
      const bodyText = mountWithApp(
        <Text as="p" variant="bodySm" fontWeight="bold">
          {text}
        </Text>,
      );

      expect(bodyText).toContainReactComponent('p', {
        style: {
          '--pc-text-font-line-height': 'var(--p-font-line-height-1)',
          '--pc-text-font-size': 'var(--p-font-size-75)',
          '--pc-text-font-weight': 'var(--p-font-weight-bold)',
        } as React.CSSProperties,
      });
    });
  });

  describe('truncate', () => {
    it('truncates texts', () => {
      const text =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt vel lorem nec pretium. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi sollicitudin ex nec imperdiet pellentesque. Etiam dapibus ipsum non ligula molestie rhoncus. Vivamus eget iaculis lectus. Sed porttitor leo at nulla mollis malesuada. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum vestibulum porttitor mollis. Nam dictum ante sed lobortis commodo. Ut luctus ut metus vel bibendum.';
      const bodyText = mountWithApp(
        <Text as="p" variant="bodyMd" truncate>
          {text}
        </Text>,
      );

      expect(bodyText).toContainReactComponent('p', {
        className: expect.stringContaining('truncate'),
      });
    });
  });

  describe('visuallyHidden', () => {
    it('renders with the text hidden', () => {
      const bodyText = mountWithApp(
        <Text as="p" variant="bodyMd" visuallyHidden>
          {text}
        </Text>,
      );

      expect(bodyText).toContainReactComponent('p', {
        className: expect.stringContaining('visuallyHidden'),
      });
    });
  });
});
