import {Frame, Navigation, Text} from '@shopify/polaris';
import {HomeMinor, OrdersMinor, ProductsMinor} from '@shopify/polaris-icons';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function NavigationExample() {
  return (
    <Frame>
      <Navigation location="/" ariaLabelledBy="label-id">
<<<<<<< HEAD
        <Text as="span" visuallyHidden>
=======
        <Text visuallyHidden>
>>>>>>> 8ece95d3e (Remove unnecessary props)
          <p id="label-id">Hidden label</p>
        </Text>
        <Navigation.Section
          items={[
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Home',
              icon: HomeMinor,
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Orders',
              icon: OrdersMinor,
              badge: '15',
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Products',
              icon: ProductsMinor,
            },
          ]}
        />
      </Navigation>
    </Frame>
  );
}

export default withPolarisExample(NavigationExample);
