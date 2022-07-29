import {mountWithApp} from 'tests/utilities';

import {UnstyledLink} from '../UnstyledLink';

describe('<UnstyledLink />', () => {
  describe('custom link component', () => {
    it('uses a custom link component instead of an anchor', () => {
      const CustomLinkComponent = () => <div />;
      const anchorElement = mountWithApp(
        <UnstyledLink external url="https://shopify.com" />,
        {link: CustomLinkComponent},
      );
      expect(anchorElement).toContainReactComponentTimes(
        CustomLinkComponent,
        1,
      );
    });

    it('doesn’t have polaris prop', () => {
      const CustomLinkComponent = () => <div />;
      const anchorElement = mountWithApp(
        <UnstyledLink external url="https://shopify.com" />,
        {link: CustomLinkComponent},
      );

      expect(anchorElement).toContainReactComponent(CustomLinkComponent, {
        polaris: undefined,
      });
    });
  });

  describe('external', () => {
    it('adds rel and target attributes', () => {
      const anchorElement = mountWithApp(
        <UnstyledLink external url="https://shopify.com" />,
      );

      expect(anchorElement).toContainReactComponent('a', {
        target: '_blank',
        rel: 'noopener noreferrer',
      });
    });
  });

  describe('download', () => {
    it('adds true as a boolean attribute', () => {
      const anchorElement = mountWithApp(
        <UnstyledLink download url="https://shopify.com" />,
      );

      expect(anchorElement).toContainReactComponent('a', {
        download: true,
      });
    });

    it('adds the provided string', () => {
      const anchorElement = mountWithApp(
        <UnstyledLink download="file.txt" url="https://shopify.com" />,
      );

      expect(anchorElement).toContainReactComponent('a', {
        download: 'file.txt',
      });
    });

    it('does not add the attribute when not set', () => {
      const anchorElement = mountWithApp(
        <UnstyledLink url="https://shopify.com" />,
      );

      expect(anchorElement).toContainReactComponent('a', {
        download: undefined,
      });
    });
  });
});
