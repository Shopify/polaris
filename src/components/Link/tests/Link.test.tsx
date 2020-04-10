import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';
import {Banner, UnstyledLink, Icon} from 'components';

import en from '../../../../locales/en.json';
import {Link} from '../Link';

describe('<Link />', () => {
  it('calls onClick when clicking', () => {
    const spy = jest.fn();
    const link = mountWithAppProvider(<Link url="MyThing" onClick={spy} />);
    link.find('a').simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('renders a button if no url is provided', () => {
    const link = mountWithAppProvider(<Link />);
    const button = link.find('button').first();
    expect(button.exists()).toBe(true);
  });

  it('renders an anchor if a url is provided', () => {
    const link = mountWithAppProvider(<Link url="MyThing" />);
    const anchor = link.find(UnstyledLink).first();
    expect(anchor.exists()).toBe(true);
  });

  describe('id', () => {
    it('is passed down to an underlying button', () => {
      const id = 'MyID';
      const link = mountWithAppProvider(<Link id={id} />);
      expect(link.find('button').prop('id')).toBe(id);
    });

    it('is passed down to an underlying UnstyledLink', () => {
      const id = 'MyID';
      const link = mountWithAppProvider(
        <Link url="https://shopify.com" id={id} />,
      );
      expect(link.find(UnstyledLink).prop('id')).toBe(id);
    });
  });

  describe('external link', () => {
    it('has a trailing icon', () => {
      const link = mountWithAppProvider(
        <Link url="https://help.shopify.com/" external>
          Shopify Help Center
        </Link>,
      );
      expect(link.children().last().find(Icon).exists()).toBe(true);
    });

    it('informs screen readers that it opens in a new window', () => {
      const link = mountWithAppProvider(
        <Link url="https://help.shopify.com/" external>
          Shopify Help Center
        </Link>,
      );
      const hintText = en.Polaris.Common.newWindowAccessibilityHint;
      expect(link.children().last().find(Icon).prop('accessibilityLabel')).toBe(
        hintText,
      );
    });

    it('doesn’t have a trailing icon for non-string children', () => {
      const link = mountWithAppProvider(
        <Link url="https://help.shopify.com/" external>
          <span>Shopify Help Center</span>
        </Link>,
      );
      expect(link.find(Icon).exists()).toBe(false);
    });
  });

  describe('monochrome link', () => {
    it('outputs a monochrome unstyled link if rendered within a banner', () => {
      const link = mountWithAppProvider(
        <Banner>
          <Link url="https://examp.le">Some content</Link>
        </Banner>,
      ).find(UnstyledLink);

      expect(link.hasClass('monochrome')).toBe(true);
    });

    it('does not output a monochrome unstyled link if it is not rendered within a banner', () => {
      const link = mountWithAppProvider(
        <Link url="https://examp.le">Some content</Link>,
      ).find(UnstyledLink);

      expect(link.hasClass('monochrome')).toBe(false);
    });

    it('outputs a monochrome button if rendered within a banner', () => {
      const button = mountWithAppProvider(
        <Banner>
          <Link>Some content</Link>
        </Banner>,
      ).find('button');

      expect(button.hasClass('monochrome')).toBe(true);
    });

    it('does not output a monochrome button if it is not rendered within a banner', () => {
      const button = mountWithAppProvider(<Link>Some content</Link>).find(
        'button',
      );

      expect(button.hasClass('monochrome')).toBe(false);
    });
  });

  describe('newDesignLanguage', () => {
    it('adds a newDesignLanguage class when newDesignLanguage is enabled, and sets a default color', () => {
      const link = mountWithApp(<Link url="MyThing" />, {
        features: {newDesignLanguage: true},
      });
      expect(link).toContainReactComponent('a', {
        className: 'Link newDesignLanguage',
      });
    });
  });
});
