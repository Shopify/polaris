import React from 'react';
import {
  HomeMinor,
  MarketingMinor,
  OrdersMinor,
  ProductsMinor,
  ViewMinor,
} from '@shopify/polaris-icons';

import {Frame, Navigation} from '../src';

export function Playground() {
  const [selected, setSelected] = React.useState('home');

  return (
    <Frame>
      <Navigation location="/">
        <Navigation.Section
          items={[
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Home',
              icon: HomeMinor,
              onClick: () => setSelected('home'),
              matches: selected === 'home',
              secondaryAction: {
                url: '#',
                accessibilityLabel: 'View your online store',
                icon: ViewMinor,
                tooltip: {
                  content: 'View your online store',
                },
              },
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Orders',
              icon: OrdersMinor,
              badge: '15',
              onClick: () => setSelected('orders'),
              matches: selected === 'orders',
              subNavigationItems: [
                {
                  url: '#',
                  excludePaths: ['#'],
                  disabled: false,
                  label: 'Drafts',
                  onClick: () => setSelected('drafts'),
                  matches: selected === 'drafts',
                },
                {
                  url: '#',
                  excludePaths: ['#'],
                  disabled: false,
                  label: 'Shipping labels',
                  onClick: () => setSelected('shippinglabels'),
                  matches: selected === 'shippinglabels',
                },
              ],
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Marketing',
              icon: MarketingMinor,
              badge: '15',
              onClick: () => setSelected('marketing'),
              matches: selected === 'marketing',
              secondaryAction: {
                url: '#',
                accessibilityLabel: 'View your online store',
                icon: ViewMinor,
                tooltip: {
                  content: 'View your online store',
                },
              },
              subNavigationItems: [
                {
                  url: '#',
                  excludePaths: ['#'],
                  disabled: false,
                  label: 'Reports',
                  onClick: () => setSelected('reports'),
                  matches: selected === 'reports',
                },
                {
                  url: '#',
                  excludePaths: ['#'],
                  disabled: false,
                  label: 'Live view',
                  onClick: () => setSelected('liveView'),
                  matches: selected === 'liveView',
                },
              ],
            },
            {
              url: '#',
              label: 'Products',
              icon: ProductsMinor,
              selected: true,
              onClick: () => setSelected('products'),
              matches: selected === 'products',
              subNavigationItems: [
                {
                  url: '#',
                  disabled: false,
                  label: 'Inventory',
                  onClick: () => setSelected('inventory'),
                  matches: selected === 'inventory',
                },
                {
                  url: '#',
                  disabled: false,
                  label: 'Transfers',
                  onClick: () => setSelected('transfers'),
                  matches: selected === 'transfers',
                },
                {
                  url: '#',
                  excludePaths: ['#'],
                  disabled: false,
                  label: 'Collections',
                  onClick: () => setSelected('collections'),
                  matches: selected === 'collections',
                },
                {
                  url: '#',
                  disabled: false,
                  label: 'Gift cards',
                  onClick: () => setSelected('gift_cards'),
                  matches: selected === 'gift_cards',
                },
                {
                  url: '#',
                  disabled: false,
                  label: 'Price lists',
                  onClick: () => setSelected('price_lists'),
                  matches: selected === 'price_lists',
                },
              ],
            },
          ]}
        />
      </Navigation>
    </Frame>
  );
}
