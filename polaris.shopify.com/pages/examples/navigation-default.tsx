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
              excludePaths: ['#'],
              label: 'Products',
              icon: Products,
            },
          ]}
        />
      </Navigation>
    </Frame>
  );
}

export default withPolarisExample(NavigationExample);
