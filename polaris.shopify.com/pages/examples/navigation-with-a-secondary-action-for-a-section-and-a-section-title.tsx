import {Frame, Navigation} from '@shopify/polaris';
import {
  HomeIcon,
  OrderIcon,
  ProductIcon,
  StoreOnlineIcon,
  PlusCircleIcon,
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
              icon: HomeIcon,
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Orders',
              icon: OrderIcon,
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Products',
              icon: ProductIcon,
            },
          ]}
        />
        <Navigation.Section
          title="Sales channels"
          items={[
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Online Store',
              icon: StoreOnlineIcon,
            },
          ]}
          action={{
            accessibilityLabel: 'Add sales channel',
            icon: PlusCircleIcon,
            onClick: () => {},
          }}
        />
      </Navigation>
    </Frame>
  );
}

export default withPolarisExample(NavigationExample);
