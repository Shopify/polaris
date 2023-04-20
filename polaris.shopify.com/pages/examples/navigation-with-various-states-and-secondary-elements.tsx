import {Frame, Navigation} from '@shopify/polaris';
import {
  HomeMinor,
  OrdersMinor,
  CirclePlusOutlineMinor,
  ProductsMinor,
  CustomersMinor,
  MarketingMinor,
  OnlineStoreMinor,
  ViewMinor,
} from '@shopify/polaris-icons';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function NavigationExample() {
  const location = typeof window !== 'undefined' ? window.location.href : '';
  return (
    <Frame>
      <Navigation location="/">
        <Navigation.Section
          items={[
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Inactive item',
              icon: HomeMinor,
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Item with indicator',
              icon: HomeMinor,
              subNavigationItems: [
                {
                  url: '#',
                  excludePaths: ['#'],
                  disabled: false,
                  new: true,
                  label: 'New item',
                },
              ],
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'New item',
              new: true,
              icon: HomeMinor,
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Badged item',
              badge: 'Old',
              icon: HomeMinor,
            },
            {
              url: '#',
              label: 'Active with secondary action',
              icon: OrdersMinor,
              selected: true,
              secondaryAction: {
                url: '#',
                accessibilityLabel: 'Add an order',
                icon: CirclePlusOutlineMinor,
                tooltip: {
                  content: 'Add an order',
                },
              },
            },
            {
              url: location,
              label: 'Active item with sub navigation',
              icon: ProductsMinor,
              selected: true,
              subNavigationItems: [
                {
                  url: location,
                  disabled: false,
                  label: 'Selected sub item',
                },
                {
                  url: '#',
                  excludePaths: ['#'],
                  disabled: false,
                  label: 'Default sub item',
                },
                {
                  url: '#',
                  excludePaths: ['#'],
                  disabled: true,
                  label: 'Disabled sub item',
                },
              ],
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Disabled item',
              icon: CustomersMinor,
              disabled: true,
            },
            {
              url: '#',
              label: 'Overflow item',
              icon: MarketingMinor,
            },
          ]}
          rollup={{
            after: 7,
            view: 'view',
            hide: 'hide',
            activePath: '/',
          }}
        />
        <Navigation.Section
          title="These icons should have the same color"
          items={[
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Icon as svg',
              icon: OnlineStoreMinor,
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Icon as img',
              icon: '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M1.791 2.253l-.597 3.583A1 1 0 0 0 2.18 7h.893a1.5 1.5 0 0 0 1.342-.83L5 5l.585 1.17A1.5 1.5 0 0 0 6.927 7h1.146a1.5 1.5 0 0 0 1.342-.83L10 5l.585 1.17a1.5 1.5 0 0 0 1.342.83h1.146a1.5 1.5 0 0 0 1.342-.83L15 5l.585 1.17a1.5 1.5 0 0 0 1.342.83h.893a1 1 0 0 0 .986-1.164l-.597-3.583A1.5 1.5 0 0 0 16.729 1H3.271a1.5 1.5 0 0 0-1.48 1.253zM4 18.5A1.5 1.5 0 0 1 5.5 17H8v-3h4v3h2.5a1.5 1.5 0 0 1 1.5 1.5v.5H4v-.5z"></path><path d="M2 9h2v4h12V9h2v4.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 13.5V9z"></path></svg>',
            },
            {
              url: '#',
              label: 'Icon as img – Active',
              icon: '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M1.791 2.253l-.597 3.583A1 1 0 0 0 2.18 7h.893a1.5 1.5 0 0 0 1.342-.83L5 5l.585 1.17A1.5 1.5 0 0 0 6.927 7h1.146a1.5 1.5 0 0 0 1.342-.83L10 5l.585 1.17a1.5 1.5 0 0 0 1.342.83h1.146a1.5 1.5 0 0 0 1.342-.83L15 5l.585 1.17a1.5 1.5 0 0 0 1.342.83h.893a1 1 0 0 0 .986-1.164l-.597-3.583A1.5 1.5 0 0 0 16.729 1H3.271a1.5 1.5 0 0 0-1.48 1.253zM4 18.5A1.5 1.5 0 0 1 5.5 17H8v-3h4v3h2.5a1.5 1.5 0 0 1 1.5 1.5v.5H4v-.5z"></path><path d="M2 9h2v4h12V9h2v4.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 13.5V9z"></path></svg>',
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Other secondary action',
              icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M2.771 14.055A8 8 0 1 1 16 8c0 2.385-1.086 4.629-2.704 5.983A7.956 7.956 0 0 1 7.991 16c-.613 0-2.022-.003-5-.01h-.928l.708-1.935zm5.973-6.757c-.554-.302-.837-.565-.837-.92 0-.446.4-.735 1.017-.735a3.62 3.62 0 0 1 1.365.302l.502-1.577S10.328 4 8.963 4C7.057 4 5.73 5.117 5.73 6.68c0 .894.618 1.565 1.442 2.05.67.382.901.658.901 1.065 0 .42-.334.762-.952.762-.915 0-1.79-.486-1.79-.486l-.54 1.577s.797.552 2.15.552c1.956 0 3.373-.986 3.373-2.76-.013-.959-.721-1.642-1.571-2.142z"/></svg>',
              secondaryAction: {
                url: '#',
                accessibilityLabel: 'View your online store',
                icon: ViewMinor,
                tooltip: {
                  content: 'View your online store',
                },
              },
            },
          ]}
          action={{
            accessibilityLabel: 'Add sales channel',
            icon: CirclePlusOutlineMinor,
            onClick: () => {},
          }}
          separator
        />
      </Navigation>
    </Frame>
  );
}

export default withPolarisExample(NavigationExample);
