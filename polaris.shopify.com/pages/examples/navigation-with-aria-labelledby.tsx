import {Frame, Navigation, Text} from '@shopify/polaris';
import {HomeIcon, OrderIcon, ProductIcon} from '@shopify/polaris-icons';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function NavigationExample() {
  return (
    <Frame>
      <Navigation location="/" ariaLabelledBy="label-id">
        <Text as="span" visuallyHidden>
          <p id="label-id">Hidden label</p>
        </Text>
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
              icon: OrderIcon,
              badge: '15',
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Products',
              icon: ProductIcon,
            },
          ]}
        />
      </Navigation>
    </Frame>
  );
}

export default withPolarisExample(NavigationExample);
