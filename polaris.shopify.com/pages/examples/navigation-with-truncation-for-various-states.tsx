import {Frame, Navigation} from '@shopify/polaris';
import {
  OrdersIcon,
  CirclePlusOutlineIcon,
  ProductsIcon,
  MarketingIcon,
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
              label: 'One Stop Ramen Order Application Premium',
              truncateText: true,
              icon: MarketingIcon,
              selected: false,
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Products',
              icon: ProductsIcon,
            },
            {
              url: '#',
              label: 'Lengthy non-truncated label with secondary action',
              icon: OrdersIcon,
              selected: false,
              secondaryAction: {
                url: '#',
                accessibilityLabel: 'Add an order',
                icon: CirclePlusOutlineIcon,
                tooltip: {
                  content: 'Add a garlic ramen to your order',
                },
              },
            },
            {
              url: '#',
              label: 'Truncated secondary navigation item on truncated label',
              icon: ProductsIcon,
              selected: true,
              truncateText: true,
              subNavigationItems: [
                {
                  url: '#',
                  excludePaths: ['#'],
                  disabled: false,
                  label:
                    'Something longer than inventory so it can be truncated',
                },
                {
                  url: '#',
                  excludePaths: ['#'],
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
