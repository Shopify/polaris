import {Frame, Navigation, VisuallyHidden} from '@shopify/polaris';
import {HomeMinor, OrdersMinor, ProductsMinor} from '@shopify/polaris-icons';
import React from 'react';
import {withPolarisExample} from '../../components/PolarisExampleWrapper';

function NavigationExample() {
  return (
    <Frame>
      <Navigation location="/" ariaLabelledBy="label-id">
        <VisuallyHidden>
          <p id="label-id">Hidden label</p>
        </VisuallyHidden>
        <Navigation.Section
          items={[
            {
              url: '/path/to/place',
              label: 'Home',
              icon: HomeMinor,
            },
            {
              url: '/path/to/place',
              label: 'Orders',
              icon: OrdersMinor,
              badge: '15',
            },
            {
              url: '/path/to/place',
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
