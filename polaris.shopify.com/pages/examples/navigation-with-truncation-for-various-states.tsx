import {Frame, Navigation} from '@shopify/polaris';
import {
  Orders,
  CirclePlusOutline,
  Products,
  Marketing,
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
              icon: Marketing,
              selected: false,
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Products',
              icon: Products,
            },
            {
              url: '#',
              label: 'Lengthy non-truncated label with secondary action',
              icon: Orders,
              selected: false,
              secondaryAction: {
                url: '#',
                accessibilityLabel: 'Add an order',
                icon: CirclePlusOutline,
                tooltip: {
                  content: 'Add a garlic ramen to your order',
                },
              },
            },
            {
              url: '#',
              label: 'Truncated secondary navigation item on truncated label',
              icon: Products,
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
