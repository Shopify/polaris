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
    it('overrides default alignment', () => {
      const bodyText = mountWithApp(
        <Text as="p" alignment="center">
          {text}
        </Text>,
      );
      expect(bodyText).toContainReactComponent('p', {
        className: expect.stringContaining('center'),
      });
    });
  });

  describe('color', () => {
    it('renders children with color', () => {
      const headingText = mountWithApp(
        <Text as="h2" variant="heading3xl" color="success">
          {text}
        </Text>,
      );
      expect(headingText).toContainReactComponent('h2', {
        className: expect.stringContaining('success'),
      });
    });
  });

  describe('fontWeight', () => {
    it('overrides the default variant font weight', () => {
      const headingText = mountWithApp(
        <Text as="h4" variant="headingXl" fontWeight="bold">
          {text}
        </Text>,
      );
      expect(headingText).toContainReactComponent('h4', {
        className: expect.stringContaining('bold'),
      });
    });

    it('no font weight when using body variant', () => {
      const headingText = mountWithApp(
        <Text as="h4" variant="bodySm">
          {text}
        </Text>,
      );
      expect(headingText).toContainReactComponent('h4', {
        className: expect.not.stringContaining('bold'),
      });
    });
  });

  describe('truncate', () => {
    it('truncates texts', () => {
      const text =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt vel lorem nec pretium. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi sollicitudin ex nec imperdiet pellentesque. Etiam dapibus ipsum non ligula molestie rhoncus. Vivamus eget iaculis lectus. Sed porttitor leo at nulla mollis malesuada. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum vestibulum porttitor mollis. Nam dictum ante sed lobortis commodo. Ut luctus ut metus vel bibendum.';
      const bodyText = mountWithApp(
        <Text as="p" truncate>
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
        <Text as="p" visuallyHidden>
          {text}
        </Text>,
      );
      expect(bodyText).toContainReactComponent('p', {
        className: expect.stringContaining('visuallyHidden'),
      });
    });
  });
});
