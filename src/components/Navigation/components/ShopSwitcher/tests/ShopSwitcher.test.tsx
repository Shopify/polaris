import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import Switcher from '../../../../ShopSwitcher';
import Menu from '../../Menu';
import ShopSwitcher from '../ShopSwitcher';

describe('<ShopSwitcher />', () => {
  const mockProps = {
    shops: [
      {
        name: '',
        url: '',
      },
    ],
    searchPlaceholder: '',
    noResultsMessage: '',
    activeIndex: 0,
  };

  describe('shops', () => {
    it('gets passed into the switcher', () => {
      const shops = [
        {
          name: '',
          url: '',
        },
      ];
      const shopSwitcher = mountWithAppProvider(
        <ShopSwitcher {...mockProps} shops={shops} />,
      );
      expect(shopSwitcher.find(Switcher).prop('shops')).toEqual(shops);
    });
  });

  describe('searchPlaceholder', () => {
    it('gets passed into the switcher', () => {
      const searchPlaceholder = 'Search for a shop.';
      const shopSwitcher = mountWithAppProvider(
        <ShopSwitcher {...mockProps} searchPlaceholder={searchPlaceholder} />,
      );
      expect(shopSwitcher.find(Switcher).prop('searchPlaceholder')).toEqual(
        searchPlaceholder,
      );
    });
  });

  describe('activeIndex', () => {
    it('gets passed into the switcher', () => {
      const activeIndex = 0;
      const shopSwitcher = mountWithAppProvider(
        <ShopSwitcher {...mockProps} activeIndex={activeIndex} />,
      );
      expect(shopSwitcher.find(Switcher).prop('activeIndex')).toEqual(
        activeIndex,
      );
    });

    it('passes the name of the active shop into the menu', () => {
      const activeIndex = 0;
      const activeShopName = 'Little Victories CA';
      const shops = [
        {
          name: activeShopName,
          url: '',
        },
      ];
      const shopSwitcher = mountWithAppProvider(
        <ShopSwitcher {...mockProps} shops={shops} activeIndex={activeIndex} />,
      );
      expect(shopSwitcher.find(Menu).prop('title')).toEqual(activeShopName);
    });
  });

  describe('noResultsMessage', () => {
    it('gets passed into the switcher', () => {
      const noResultsMessage = 'No shops found.';
      const shopSwitcher = mountWithAppProvider(
        <ShopSwitcher {...mockProps} noResultsMessage={noResultsMessage} />,
      );
      expect(shopSwitcher.find(Switcher).prop('noResultsMessage')).toEqual(
        noResultsMessage,
      );
    });
  });

  describe('activatorAccessibilityLabel', () => {
    it('gets passed into the menu', () => {
      const activatorAccessibilityLabel = 'Show shop switcher.';
      const shopSwitcher = mountWithAppProvider(
        <ShopSwitcher
          {...mockProps}
          activatorAccessibilityLabel={activatorAccessibilityLabel}
        />,
      );
      expect(
        shopSwitcher.find(Menu).prop('activatorAccessibilityLabel'),
      ).toEqual(activatorAccessibilityLabel);
    });
  });

  describe('<Menu />', () => {
    it('receives a logo image when available', () => {
      const logoSource = './logo.png';
      const logoAccessibilityLabel = 'Company Logo';
      const shopSwitcher = mountWithAppProvider(
        <ShopSwitcher {...mockProps} />,
        {
          context: {
            polarisTheme: {
              logo: {
                shopSwitcherSource: logoSource,
                accessibilityLabel: logoAccessibilityLabel,
              },
            },
          },
        },
      );
      const {props: logoImageProps} = shopSwitcher
        .find(Menu)
        .prop('avatar') as any;
      expect(logoImageProps.source).toBe(logoSource);
      expect(logoImageProps.alt).toBe(logoAccessibilityLabel);
    });
  });
});
