import * as React from 'react';
import UnstyledLink from '../UnstyledLink';
import {
  shallowWithProvider,
  mountWithProvider,
} from '../../../../tests/utilities';

import Link from '../../Provider/Link';

describe('<UnstyledLink />', () => {
  describe('custom link component', () => {
    it('uses a custom link component instead of an anchor', () => {
      const CustomLinkComponent = () => <div />;
      const link = new Link(CustomLinkComponent);
      const mockContext = {context: {polaris: {link}}};
      const anchorElement = mountWithProvider(
        <UnstyledLink external url="https://shopify.com" />,
        mockContext,
      ).find(CustomLinkComponent);

      expect(anchorElement.length).toBe(1);
    });
  });

  describe('external', () => {
    it('adds the correct attributes', () => {
      const anchorElement = shallowWithProvider(
        <UnstyledLink external url="https://shopify.com" />,
      ).find('a');
      expect(anchorElement.prop('target')).toBe('_blank');
      expect(anchorElement.prop('rel')).toBe('noopener noreferrer');
    });
  });
});
