import {Frame, Navigation} from '@shopify/polaris';
import {
  HomeMinor,
  OrdersMinor,
  MarketingMinor,
  ProductsMinor,
} from '@shopify/polaris-icons';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function NavigationExample() {
  return (
    <Frame>
      <Navigation location="/">
        <Navigation.Section
          items={[
            {
              url: '#',
              label: 'Home',
              icon: HomeMinor,
            },
            {
              url: '#',
              label: 'Orders',
              icon: OrdersMinor,
              badge: '15',
              subNavigationItems: [
                {
                  url: '#',
                  disabled: false,
                  selected: false,
                  label: 'Collections',
                },
                {
                  url: '#',
                  disabled: false,
                  label: 'Inventory',
                },
              ],
            },
            {
              url: '#',
              label: 'Marketing',
              icon: MarketingMinor,
              badge: '15',
              subNavigationItems: [
                {
                  url: '#',
                  disabled: false,
                  selected: false,
                  label: 'Reports',
                },
                {
                  url: '#',
                  disabled: false,
                  label: 'Live view',
                },
              ],
            },
            {
              url: '#',
              label: 'Products',
              icon: ProductsMinor,
              selected: true,
              subNavigationItems: [
                {
                  url: '#',
                  disabled: false,
                  selected: false,
                  label: 'Collections',
                },
                {
                  url: '#',
                  disabled: false,
                  selected: true,
                  label: 'Inventory',
                },
              ],
            },
          ]}
        />
      </Navigation>
    </Frame>
  );
}

export default withPolarisExample(NavigationExample);
