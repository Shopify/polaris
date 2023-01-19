import {Frame, Navigation} from '@shopify/polaris';
import {
  HomeMinor,
  CirclePlusOutlineMinor,
  ProductsMinor,
  MarketingMinor,
  CircleMinusOutlineMinor,
  PlusMinor,
  ViewMinor,
  LogOutMinor
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
              url: '/path/to/place',
              label: 'Products',
              icon: ProductsMinor,
              badge: '2',
              secondaryActions: [
                {
                  url: '/admin/products/add',
                  accessibilityLabel: 'Add a product',
                  icon: CirclePlusOutlineMinor,
                  tooltip: {
                    content: 'Add a product',
                  },
                },
              ],
            },
            {
              url: '/path/to/place',
              label: 'Long multi-line label',
              icon: PlusMinor,
              secondaryActions: [
                {
                  url: '/admin/products/add',
                  accessibilityLabel: 'Add a product',
                  icon: CirclePlusOutlineMinor,
                  tooltip: {
                    content: 'Add a product',
                  },
                },
                {
                  accessibilityLabel: 'Remove a product',
                  icon: CircleMinusOutlineMinor,
                  onClick: () => {},
                  tooltip: {
                    content: 'Remove a product',
                  },
                },
              ],
            },
            {
              url: '/path/to/place',
              label: 'Long truncated single-line text label',
              icon: PlusMinor,
              truncateText: true,
              secondaryActions: [
                {
                  url: '/admin/products/add',
                  accessibilityLabel: 'Add a product',
                  icon: CirclePlusOutlineMinor,
                  tooltip: {
                    content: 'Add a product',
                  },
                },
                {
                  accessibilityLabel: 'Remove a product',
                  icon: CircleMinusOutlineMinor,
                  onClick: () => {
                    console.log('woah you clicked it');
                  },
                  tooltip: {
                    content: 'Remove a product',
                  },
                },
              ],
            },
            {
              url: '/path/to/place',
              label: 'Floating actions on multi-line text label',
              icon: PlusMinor,
              badge: '15',
              selected: true,
              displayActionsOnHover: true,
              secondaryActions: [
                {
                  url: '/admin/products/add',
                  accessibilityLabel: 'Add a product',
                  icon: CirclePlusOutlineMinor,
                  tooltip: {
                    content: 'Add a product',
                  },
                },
              ],
            },
            {
              url: '/path/to/place',
              label: 'Floating actions on truncated single-line text label',
              icon: PlusMinor,
              truncateText: true,
              displayActionsOnHover: true,
              secondaryActions: [
                {
                  url: '/admin/products/add',
                  accessibilityLabel: 'Add a product',
                  icon: CirclePlusOutlineMinor,
                  tooltip: {
                    content: 'Add a product',
                  },
                },
                {
                  url: '',
                  accessibilityLabel: 'Remove a product',
                  icon: CircleMinusOutlineMinor,
                  onClick: () => {},
                  tooltip: {
                    content: 'Remove a product',
                  },
                },
              ],
            },
            {
              url: '/path/to/place',
              label: 'One floating action on multi-line text label',
              icon: MarketingMinor,
              displayActionsOnHover: true,
              secondaryActions: [
                {
                  url: '/admin/products/add',
                  accessibilityLabel: 'Add a product',
                  icon: CirclePlusOutlineMinor,
                  tooltip: {
                    content: 'Add a product',
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
