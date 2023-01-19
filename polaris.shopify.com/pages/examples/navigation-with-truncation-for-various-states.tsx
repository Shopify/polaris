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
              url: '/path/to/place',
              label: 'Label long enough to ellipsize most likely',
              truncateText: true,
              icon: OrdersMinor,
              selected: false,
            },
            {
              url: '/path/to/place',
              label: 'Not truncated',
              icon: OrdersMinor,
              selected: false,
            },
            {
              url: '/path/to/place',
              label: 'Lengthy label with secondary action',
              icon: MarketingMinor,
              selected: false,
              truncateText: true,
              secondaryAction: {
                url: '/admin/orders/add',
                accessibilityLabel: 'Add a ramen to your order',
                icon: CirclePlusOutlineMinor,
                tooltip: {
                  content: 'Add a ramen to your order',
                },
              },
            },
            {
              url: '/path/to/place',
              label: 'Lengthy non-truncated label with secondary action',
              icon: OrdersMinor,
              selected: false,
              secondaryAction: {
                url: '/admin/orders/add',
                accessibilityLabel: 'Add an order',
                icon: CirclePlusOutlineMinor,
                tooltip: {
                  content: 'Add a lengthy order',
                },
              },
            },
            {
              url: '/path/to/place',
              label: 'Old lengthy label that is badged',
              truncateText: true,
              badge: 'Old',
              icon: HomeMinor,
            },
            {
              url: '/path/to/place',
              label: 'Badged with an action while being lengthy',
              icon: OrdersMinor,
              selected: false,
              truncateText: true,
              badge: 'Old',
              secondaryAction: {
                url: '/admin/orders/add',
                accessibilityLabel: 'Add a hug if possible',
                icon: CirclePlusOutlineMinor,
                tooltip: {
                  content: 'Add a hug if possible',
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
                  label: 'Something longer than inventory so it can be truncated',
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
