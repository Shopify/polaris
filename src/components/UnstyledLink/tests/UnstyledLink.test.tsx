import * as React from 'react';
import {mountWithAppProvider} from 'tests/utilities';
// eslint-disable-next-line shopify/strict-component-boundaries
import {Link} from 'src/components/AppProvider';
import UnstyledLink from '../UnstyledLink';

describe('<UnstyledLink />', () => {
  describe('custom link component', () => {
    it('uses a custom link component instead of an anchor', () => {
      const CustomLinkComponent = () => <div />;
      const link = new Link(CustomLinkComponent);
      const mockContext = {context: {polaris: {link}}};
      const anchorElement = mountWithAppProvider(
        <UnstyledLink external url="https://shopify.com" />,
        mockContext,
      ).find(CustomLinkComponent);

      expect(anchorElement.length).toBe(1);
    });

    it('doesn’t have polaris prop', () => {
      const CustomLinkComponent = () => <div />;
      const link = new Link(CustomLinkComponent);
      const mockContext = {context: {polaris: {link}}};
      const anchorElement = mountWithAppProvider(
        <UnstyledLink external url="https://shopify.com" />,
        mockContext,
      ).find(CustomLinkComponent);

      expect(anchorElement.prop('polaris')).not.toBeDefined();
    });
  });

  describe('external', () => {
    it('adds the correct attributes', () => {
      const anchorElement = mountWithAppProvider(
        <UnstyledLink external url="https://shopify.com" />,
      ).find('a');
      expect(anchorElement.prop('target')).toBe('_blank');
      expect(anchorElement.prop('rel')).toBe('noopener noreferrer');
    });
  });
});
