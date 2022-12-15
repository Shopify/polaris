'use client';

import {Frame, Navigation} from '@shopify/polaris';
import {
  HomeMajor,
  OrdersMajor,
  ProductsMajor,
  CustomersMajor,
} from '@shopify/polaris-icons';
import React from 'react';
import {withPolarisExample} from '../../../src/components/PolarisExampleWrapper';

function NavigationExample() {
  return (
    <Frame>
      <Navigation location="/">
        <Navigation.Section
          items={[
            {
              url: '/path/to/place',
              label: 'Home',
              icon: HomeMajor,
            },
            {
              url: '/path/to/place',
              label: 'Orders',
              icon: OrdersMajor,
              badge: '15',
            },
            {
              url: '/path/to/place',
              label: 'Products',
              icon: ProductsMajor,
            },
            {
              url: '/path/to/place',
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
