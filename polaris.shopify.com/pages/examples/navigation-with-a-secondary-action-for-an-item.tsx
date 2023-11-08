import {Frame, Navigation} from '@shopify/polaris';
import {
  HomeIcon,
  OrdersIcon,
  CirclePlusOutlineIcon,
  ProductsIcon,
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
              icon: HomeIcon,
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Orders',
              icon: OrdersIcon,
              secondaryAction: {
                url: '#',
                accessibilityLabel: 'Add an order',
                icon: CirclePlusOutlineIcon,
                tooltip: {
                  content: 'Add an order',
                },
              },
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Products',
              icon: ProductsIcon,
            },
          ]}
        />
      </Navigation>
    </Frame>
  );
}

export default withPolarisExample(NavigationExample);
