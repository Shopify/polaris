import {Frame, Navigation} from '@shopify/polaris';
import {
  HomeMajor,
  OrdersMajor,
  ProductsMajor,
  CustomersMajor,
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
              label: 'Home',
              icon: HomeMajor,
            },
            {
              url: '#',
              label: 'Orders',
              icon: OrdersMajor,
              badge: '15',
            },
            {
              url: '#',
              label: 'Products',
              icon: ProductsMajor,
            },
            {
              url: '#',
              label: 'Customers',
              icon: CustomersMajor,
            },
          ]}
        />
      </Navigation>
    </Frame>
  );
}

export default withPolarisExample(NavigationExample);
