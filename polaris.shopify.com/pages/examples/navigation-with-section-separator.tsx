import {Frame, Navigation} from '@shopify/polaris';
import {Home, Orders, Products, OnlineStore} from '@shopify/polaris-icons';
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
              icon: Home,
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Orders',
              icon: Orders,
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Products',
              icon: Products,
            },
          ]}
        />
        <Navigation.Section
          items={[
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Online Store',
              icon: OnlineStore,
            },
          ]}
          separator
        />
      </Navigation>
    </Frame>
  );
}

export default withPolarisExample(NavigationExample);
