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
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Products',
              icon: Products,
            },
          ]}
          rollup={{
            after: 2,
            view: 'view',
            hide: 'hide',
            activePath: '#',
          }}
        />
      </Navigation>
    </Frame>
  );
}

export default withPolarisExample(NavigationExample);
