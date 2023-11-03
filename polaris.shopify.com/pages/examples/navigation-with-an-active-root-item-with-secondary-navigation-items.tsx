import {Frame, Navigation} from '@shopify/polaris';
import {Home, Orders, Products} from '@shopify/polaris-icons';
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
              badge: '15',
            },
            {
              url: '#',
              label: 'Products',
              icon: Products,
              selected: true,
              subNavigationItems: [
                {
                  url: '#',
                  excludePaths: ['#'],
                  disabled: false,
                  label: 'Collections',
                },
                {
                  url: '#',
                  excludePaths: ['#'],
                  disabled: false,
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
