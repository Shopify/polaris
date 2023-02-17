import {Frame, Navigation} from '@shopify/polaris';
import {
  HomeMinor,
  OrdersMinor,
  ProductsMinor,
  OnlineStoreMinor,
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
              excludePaths: ['#'],
              label: 'Home',
              icon: HomeMinor,
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Orders',
              icon: OrdersMinor,
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Products',
              icon: ProductsMinor,
            },
          ]}
        />
        <Navigation.Section
          items={[
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Online Store',
              icon: OnlineStoreMinor,
            },
          ]}
          separator
        />
      </Navigation>
    </Frame>
  );
}

export default withPolarisExample(NavigationExample);
