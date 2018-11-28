import * as React from 'react';
import {
  shallowWithAppProvider,
  mountWithAppProvider,
  trigger,
  findByTestID,
} from 'test-utilities';
import Switcher from '../../../../ShopSwitcher';
import Image from '../../../../Image';
import Popover from '../../../../Popover';
import ShopSwitcher from '../ShopSwitcher';

describe('<ShopSwitcher />', () => {
  const mockProps = {
    shops: [
      {
        name: '',
        url: '',
      },
    ],
    activeIndex: 0,
    searchPlaceholder: '',
    noResultsMessage: '',
  };

  describe('shops', () => {
    it('gets passed into the switcher', () => {
      const shops = [
        {
          name: '',
          url: '',
        },
      ];
      const shopSwitcher = shallowWithAppProvider(
        <ShopSwitcher {...mockProps} shops={shops} />,
      );
      expect(shopSwitcher.find(Switcher).prop('shops')).toEqual(shops);
    });

    it('displays the name of the active shop', () => {
      const activeShopName = 'Little Victories CA';
      const shops = [
        {
          name: activeShopName,
          url: '',
        },
      ];
      const shopSwitcher = mountWithAppProvider(
        <ShopSwitcher {...mockProps} shops={shops} activeIndex={0} />,
      );
      expect(shopSwitcher.contains(activeShopName)).toBeTruthy();
    });
  });

  describe('searchPlaceholder', () => {
    it('gets passed into the switcher', () => {
      const searchPlaceholder = 'Search for a shop.';
      const shopSwitcher = shallowWithAppProvider(
        <ShopSwitcher {...mockProps} searchPlaceholder={searchPlaceholder} />,
      );
      expect(shopSwitcher.find(Switcher).prop('searchPlaceholder')).toBe(
        searchPlaceholder,
      );
    });
  });

  describe('activeIndex', () => {
    it('gets passed into the switcher', () => {
      const activeIndex = 0;
      const shopSwitcher = shallowWithAppProvider(
        <ShopSwitcher {...mockProps} activeIndex={activeIndex} />,
      );
      expect(shopSwitcher.find(Switcher).prop('activeIndex')).toBe(activeIndex);
    });
  });

  describe('noResultsMessage', () => {
    it('gets passed into the switcher', () => {
      const noResultsMessage = 'No shops found.';
      const shopSwitcher = shallowWithAppProvider(
        <ShopSwitcher {...mockProps} noResultsMessage={noResultsMessage} />,
      );
      expect(shopSwitcher.find(Switcher).prop('noResultsMessage')).toBe(
        noResultsMessage,
      );
    });
  });

  describe('<Image />', () => {
    it('renders the logo if there is one', () => {
      const logoSource = './company-logo.png';
      const logoAccessibilityLabel = 'Company Logo';
      const shopSwitcher = mountWithAppProvider(
        <ShopSwitcher {...mockProps} />,
        {
          context: {
            polarisTheme: {
              logo: {
                topBarSource: logoSource,
                accessibilityLabel: logoAccessibilityLabel,
              },
            },
          },
        },
      );
      expect(shopSwitcher.find(Image).props()).toEqual(
        expect.objectContaining({
          source: logoSource,
          alt: logoAccessibilityLabel,
        }),
      );
    });
  });

  describe('button', () => {
    it('toggles the popover when clicked', () => {
      const shopSwitcher = mountWithAppProvider(
        <ShopSwitcher {...mockProps} />,
      );
      trigger(findByTestID(shopSwitcher, 'Switcher-Activator'), 'onClick');
      expect(shopSwitcher.find(Popover).prop('active')).toBeTruthy();
      trigger(findByTestID(shopSwitcher, 'Switcher-Activator'), 'onClick');
      expect(shopSwitcher.find(Popover).prop('active')).toBeFalsy();
    });
  });

  describe('<Popover />', () => {
    it('is closed by default', () => {
      const shopSwitcher = mountWithAppProvider(
        <ShopSwitcher {...mockProps} />,
      );
      expect(shopSwitcher.find(Popover).prop('active')).toBeFalsy();
    });

    it('closes when the popover closes', () => {
      const shopSwitcher = mountWithAppProvider(
        <ShopSwitcher {...mockProps} />,
      );
      trigger(findByTestID(shopSwitcher, 'Switcher-Activator'), 'onClick');
      trigger(shopSwitcher.find(Popover), 'onClose');
      expect(shopSwitcher.find(Popover).prop('active')).toBeFalsy();
    });
  });
});
