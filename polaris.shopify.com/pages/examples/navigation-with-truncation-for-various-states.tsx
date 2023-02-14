import {Frame, Navigation} from '@shopify/polaris';
import {
  HomeMinor,
  OrdersMinor,
  CirclePlusOutlineMinor,
  ProductsMinor,
  MarketingMinor,
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
              label: 'One Stop Ramen Order Application Premium',
              truncateText: true,
              icon: MarketingMinor,
              selected: false,
            },
            {
              url: '#',
              label: 'Products',
              icon: ProductsMinor,
            },
            {
              url: '#',
              label: 'Lengthy non-truncated label with secondary action',
              icon: OrdersMinor,
              selected: false,
              secondaryAction: {
                url: '/admin/orders/add',
                accessibilityLabel: 'Add an order',
                icon: CirclePlusOutlineMinor,
                tooltip: {
                  content: 'Add a garlic ramen to your order',
                },
              },
            },
            {
              url: '/admin/products',
              label: 'Truncated secondary navigation item on truncated label',
              icon: ProductsMinor,
              selected: true,
              truncateText: true,
              subNavigationItems: [
                {
                  url: '/admin/products/collections',
                  disabled: false,
                  label:
                    'Something longer than inventory so it can be truncated',
                },
                {
                  url: '/admin/products/inventory',
                  disabled: false,
                  label: 'Inventoy',
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
