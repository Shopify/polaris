import {Frame, Navigation} from '@shopify/polaris';
import {
  HomeMinor,
  CirclePlusOutlineMinor,
  ProductsMinor,
  CircleMinusOutlineMinor,
  OrdersMinor,
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
              url: '/path/to/place',
              label: 'Home',
              icon: HomeMinor,
              selected: false,
            },
            {
              url: '/path/to/place',
              label: 'Orders',
              icon: OrdersMinor,
              badge: '2',
              secondaryActions: [
                {
                  url: '/admin/products/add',
                  accessibilityLabel: 'Add a product',
                  icon: CirclePlusOutlineMinor,
                  tooltip: {
                    content: 'Create new order',
                  },
                },
              ],
            },
            {
              url: '/path/to/place',
              label: 'Products',
              icon: ProductsMinor,
              secondaryActions: [
                {
                  url: '/admin/products/add',
                  accessibilityLabel: 'Add a product',
                  icon: CirclePlusOutlineMinor,
                  tooltip: {
                    content: 'Add a product',
                  },
                },
                {
                  accessibilityLabel: 'Remove a product',
                  icon: CircleMinusOutlineMinor,
                  onClick: () => {},
                  tooltip: {
                    content: 'Remove a product',
                  },
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
