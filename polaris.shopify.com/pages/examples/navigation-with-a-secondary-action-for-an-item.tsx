import {Frame, Navigation} from '@shopify/polaris';
import {
  Home,
  Orders,
  CirclePlusOutline,
  Products,
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
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Orders',
              icon: Orders,
              secondaryAction: {
                url: '#',
                accessibilityLabel: 'Add an order',
                icon: CirclePlusOutline,
                tooltip: {
                  content: 'Add an order',
                },
              },
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
