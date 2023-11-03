import {Frame, Navigation} from '@shopify/polaris';
import {
  Home,
  CirclePlusOutline,
  Products,
  CircleMinusOutline,
  Orders,
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
              icon: Home,
              selected: false,
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Orders',
              icon: Orders,
              badge: '2',
              secondaryActions: [
                {
                  url: '#',
                  accessibilityLabel: 'Add a product',
                  icon: CirclePlusOutline,
                  tooltip: {
                    content: 'Create new order',
                  },
                },
              ],
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Products',
              icon: Products,
              secondaryActions: [
                {
                  url: '#',
                  accessibilityLabel: 'Add a product',
                  icon: CirclePlusOutline,
                  tooltip: {
                    content: 'Add a product',
                  },
                },
                {
                  accessibilityLabel: 'Remove a product',
                  icon: CircleMinusOutline,
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
