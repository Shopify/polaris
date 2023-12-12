import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Frame, Navigation, Text} from '@shopify/polaris';
import {
  CircleMinusOutlineMinor,
  CirclePlusOutlineMinor,
  CustomersMajor,
  CustomersMinor,
  HomeMajor,
  HomeMinor,
  LogOutMinor,
  MarketingMinor,
  OnlineStoreMinor,
  OrdersMajor,
  OrdersMinor,
  PlusMinor,
  ProductsMajor,
  ProductsMinor,
  ViewMinor,
  StarFilledMinor,
  StarOutlineMinor,
  OrdersFilledMinor,
  HomeFilledMinor,
  ProductsFilledMinor,
  MarketingFilledMinor,
} from '@shopify/polaris-icons';

export default {
  component: Navigation,
  parameters: {layout: 'fullscreen'},
} as ComponentMeta<typeof Navigation>;

export function Default() {
  const [selected, setSelected] = React.useState('home');

  return (
    <Frame>
      <Navigation location="/">
        <Navigation.Section
          items={[
            {
              url: '#',
              label: 'Home',
              icon: HomeMinor,
              matches: selected === 'home',
              onClick: () => setSelected('home'),
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Orders',
              icon: OrdersMinor,
              badge: '15',
              matches: selected === 'orders',
              onClick: () => setSelected('orders'),
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Products',
              icon: ProductsMinor,
              matches: selected === 'products',
              onClick: () => setSelected('products'),
            },
          ]}
        />
      </Navigation>
    </Frame>
  );
}

export function DisabledItemsWithoutUrls() {
  return (
    <Frame>
      <Navigation location="/">
        <Navigation.Section
          items={[
            {icon: HomeMinor, label: 'Home', disabled: true},
            {icon: OrdersMinor, label: 'Orders', disabled: true},
            {icon: ProductsMinor, label: 'Products', disabled: true},
            {icon: CustomersMinor, label: 'Customers', disabled: true},
            {icon: MarketingMinor, label: 'Marketing', disabled: true},
          ]}
        />
      </Navigation>
    </Frame>
  );
}

export function WithMultipleSecondaryNavigations() {
  const [selected, setSelected] = React.useState('home');

  return (
    <Frame>
      <Navigation location="/">
        <Navigation.Section
          items={[
            {
              url: '#',
              label: 'Home',
              icon: HomeFilledMinor,
              matchedItemIcon: HomeMinor,
              onClick: () => setSelected('home'),
              matches: selected === 'home',
            },
            {
              url: '#',
              label: 'Orders',
              icon: OrdersFilledMinor,
              matchedItemIcon: OrdersMinor,
              badge: '15',
              onClick: () => setSelected('orders'),
              matches: selected === 'orders',
              subNavigationItems: [
                {
                  url: '#',
                  disabled: false,
                  label: 'Drafts',
                  onClick: () => setSelected('drafts'),
                  matches: selected === 'drafts',
                },
                {
                  url: '#',
                  disabled: false,
                  label: 'Shipping Labels',
                  onClick: () => setSelected('shippinglabels'),
                  matches: selected === 'shippinglabels',
                },
              ],
            },
            {
              url: '#',
              label: 'Products',
              icon: ProductsFilledMinor,
              matchedItemIcon: ProductsMinor,
              onClick: () => setSelected('products'),
              matches: selected === 'products',
              subNavigationItems: [
                {
                  url: '#',
                  excludePaths: ['#'],
                  disabled: false,
                  label: 'Inventory',
                  onClick: () => setSelected('inventory'),
                  matches: selected === 'inventory',
                },
                {
                  url: '#',
                  excludePaths: ['#'],
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
                  excludePaths: ['#'],
                  disabled: false,
                  label: 'Gift cards',
                  onClick: () => setSelected('giftcards'),
                  matches: selected === 'giftcards',
                },
                {
                  url: '#',
                  excludePaths: ['#'],
                  disabled: false,
                  label: 'Price lists',
                  onClick: () => setSelected('pricelists'),
                  matches: selected === 'pricelists',
                },
              ],
            },
            {
              url: '#',
              label: 'Marketing',
              icon: MarketingFilledMinor,
              matchedItemIcon: MarketingMinor,
              onClick: () => setSelected('marketing'),
              matches: selected === 'marketing',
              subNavigationItems: [
                {
                  url: '#',
                  disabled: false,
                  label: 'Reports',
                  onClick: () => setSelected('reports'),
                  matches: selected === 'reports',
                },
                {
                  url: '#',
                  disabled: false,
                  label: 'Live view',
                  onClick: () => setSelected('liveView'),
                  matches: selected === 'liveView',
                },
              ],
            },
          ]}
        />
      </Navigation>
    </Frame>
  );
}

export function WithAnActiveRootItemWithSecondaryNavigationItems() {
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
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Orders',
              icon: OrdersMinor,
              badge: '15',
              onClick: () => setSelected('orders'),
              matches: selected === 'orders',
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
                  excludePaths: ['#'],
                  disabled: false,
                  label: 'Inventory',
                  onClick: () => setSelected('inventory'),
                  matches: selected === 'inventory',
                },
                {
                  url: '#',
                  excludePaths: ['#'],
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
                  excludePaths: ['#'],
                  disabled: false,
                  label: 'Gift cards',
                  onClick: () => setSelected('giftcards'),
                  matches: selected === 'giftcards',
                },
                {
                  url: '#',
                  excludePaths: ['#'],
                  disabled: false,
                  label: 'Price lists',
                  onClick: () => setSelected('pricelists'),
                  matches: selected === 'pricelists',
                },
              ],
            },
          ]}
        />
      </Navigation>
    </Frame>
  );
}

export function WithASecondaryActionForASectionAndASectionTitle() {
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
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Orders',
              icon: OrdersMinor,
              onClick: () => setSelected('orders'),
              matches: selected === 'orders',
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Products',
              icon: ProductsMinor,
              onClick: () => setSelected('products'),
              matches: selected === 'products',
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
              icon: OnlineStoreMinor,
            },
          ]}
          action={{
            accessibilityLabel: 'Add sales channel',
            icon: CirclePlusOutlineMinor,
            onClick: () => {},
          }}
        />
      </Navigation>
    </Frame>
  );
}

export function WithASecondaryActionForAnItem() {
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
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Orders',
              icon: OrdersMinor,
              onClick: () => setSelected('orders'),
              matches: selected === 'orders',
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
              url: '#',
              excludePaths: ['#'],
              label: 'Products',
              icon: ProductsMinor,
              onClick: () => setSelected('products'),
              matches: selected === 'products',
            },
          ]}
        />
      </Navigation>
    </Frame>
  );
}

export function WithMultipleSecondaryActionsForAnItem() {
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
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Orders',
              icon: OrdersMinor,
              badge: '123',
              onClick: () => setSelected('orders'),
              matches: selected === 'orders',
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Products',
              icon: ProductsMinor,
              badge: '2',
              onClick: () => setSelected('products'),
              matches: selected === 'products',
              secondaryActions: [
                {
                  url: '#',
                  accessibilityLabel: 'Add a product',
                  icon: CirclePlusOutlineMinor,
                  tooltip: {
                    content: 'Add a product',
                  },
                },
              ],
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Long multi-line label',
              icon: PlusMinor,
              badge: '125',
              onClick: () => setSelected('longMultiLineLabel'),
              matches: selected === 'longMultiLineLabel',
              secondaryActions: [
                {
                  url: '#',
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
              url: '#',
              excludePaths: ['#'],
              label: 'Long truncated single-line text label',
              icon: PlusMinor,
              truncateText: true,
              onClick: () => setSelected('longTruncatedSingleLineTextLabel'),
              matches: selected === 'longTruncatedSingleLineTextLabel',
              secondaryActions: [
                {
                  url: '#',
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
                    console.log('plus clicked');
                  },
                  tooltip: {
                    content: 'Remove a product',
                  },
                },
              ],
              subNavigationItems: [
                {
                  url: '#',
                  excludePaths: ['#'],
                  disabled: false,
                  label: 'New item',
                  onClick: () => setSelected('newItem'),
                  matches: selected === 'newItem',
                },
              ],
            },
            {
              url: '#',
              label: 'Floating actions on multi-line text label',
              icon: PlusMinor,
              badge: '15',
              displayActionsOnHover: true,
              onClick: () => setSelected('floatingActionsOnMultiLineTextLabel'),
              matches: selected === 'floatingActionsOnMultiLineTextLabel',
              secondaryActions: [
                {
                  url: '#',
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
                    console.log('minor clicked');
                  },
                  tooltip: {
                    content: 'Remove a product',
                  },
                },
              ],
              subNavigationItems: [
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
                  excludePaths: ['#'],
                  disabled: false,
                  label: 'Inventory',
                  onClick: () => setSelected('inventory'),
                  matches: selected === 'inventory',
                },
              ],
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Floating actions on truncated single-line text label',
              icon: PlusMinor,
              badge: '15',
              truncateText: true,
              displayActionsOnHover: true,
              onClick: () =>
                setSelected('floatingActionsOnTruncatedSingleLineTextLabel'),
              matches:
                selected === 'floatingActionsOnTruncatedSingleLineTextLabel',
              secondaryActions: [
                {
                  url: '#',
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
              url: '#',
              excludePaths: ['#'],
              label: 'One floating action on multi-line text label',
              icon: PlusMinor,
              displayActionsOnHover: true,
              onClick: () =>
                setSelected('oneFloatingActionOnMultiLineTextLabel'),
              matches: selected === 'oneFloatingActionOnMultiLineTextLabel',
              secondaryActions: [
                {
                  url: '#',
                  accessibilityLabel: 'Add a product',
                  icon: CirclePlusOutlineMinor,
                  tooltip: {
                    content: 'Add a product',
                  },
                },
              ],
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'One floating action on truncated single-line text label',
              icon: PlusMinor,
              badge: '15',
              truncateText: true,
              displayActionsOnHover: true,
              onClick: () =>
                setSelected('oneFloatingActionOnTruncatedSingleLineTextLabel'),
              matches:
                selected === 'oneFloatingActionOnTruncatedSingleLineTextLabel',
              secondaryActions: [
                {
                  url: '#',
                  accessibilityLabel: 'Add a product',
                  icon: CirclePlusOutlineMinor,
                  tooltip: {
                    content: 'Add a product',
                  },
                },
              ],
            },
            {
              url: '#',
              label: 'Marketing',
              icon: MarketingMinor,
              badge: '15',
              selected: true,
              onClick: () => setSelected('marketing'),
              matches: selected === 'marketing',
              secondaryActions: [
                {
                  url: '#',
                  accessibilityLabel: 'View campaign',
                  icon: ViewMinor,
                  tooltip: {
                    content: 'View campaign',
                  },
                },
              ],
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Logout',
              icon: LogOutMinor,
              onClick: () => setSelected('logout'),
              matches: selected === 'logout',
            },
          ]}
        />
      </Navigation>
    </Frame>
  );
}

export function WithTruncationForVariousStates() {
  const [selected, setSelected] = React.useState('longlabel');

  return (
    <Frame>
      <Navigation location="/">
        <Navigation.Section
          items={[
            {
              url: '#',
              label: 'A very long label to ellipsize',
              truncateText: true,
              icon: OrdersMinor,
              selected: false,
              onClick: () => setSelected('longlabel'),
              matches: selected === 'longlabel',
            },
            {
              url: '#',
              label: 'Not truncated',
              icon: OrdersMinor,
              selected: false,
              onClick: () => setSelected('nottruncated'),
              matches: selected === 'nottruncated',
            },
            {
              url: '#',
              label: 'Lengthy label with secondary action',
              icon: OrdersMinor,
              selected: false,
              truncateText: true,
              onClick: () => setSelected('lengthylabelwithsecondaryaction'),
              matches: selected === 'lengthylabelwithsecondaryaction',
              secondaryAction: {
                url: '#',
                accessibilityLabel: 'Add an order',
                icon: CirclePlusOutlineMinor,
                tooltip: {
                  content: 'Add a lengthy order',
                },
              },
            },
            {
              url: '#',
              label: 'Lengthy non-truncated label with secondary action',
              icon: OrdersMinor,
              selected: false,
              onClick: () =>
                setSelected('lengthynontruncatedlabelwithsecondaryaction'),
              matches:
                selected === 'lengthynontruncatedlabelwithsecondaryaction',
              secondaryAction: {
                url: '#',
                accessibilityLabel: 'Add an order',
                icon: CirclePlusOutlineMinor,
                tooltip: {
                  content: 'Add a lengthy order',
                },
              },
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Lengthy label with badge',
              truncateText: true,
              badge: 'Old',
              icon: HomeMinor,
              onClick: () => setSelected('lengthylabelwithbadge'),
              matches: selected === 'lengthylabelwithbadge',
            },
            {
              url: '#',
              label: 'Lengthy label with secondary action',
              icon: OrdersMinor,
              selected: false,
              truncateText: true,
              badge: 'Old',
              onClick: () => setSelected('lengthylabelwithsecondaryaction'),
              matches: selected === 'lengthylabelwithsecondaryaction',
              secondaryAction: {
                url: '#',
                accessibilityLabel: 'Add an order',
                icon: CirclePlusOutlineMinor,
                tooltip: {
                  content: 'Add a lengthy order',
                },
              },
            },
            {
              url: '#',
              label: 'Truncated secondary navigation items',
              icon: ProductsMinor,
              selected: true,
              truncateText: true,
              onClick: () => setSelected('truncatedsecondarynavigationitems'),
              matches: selected === 'truncatedsecondarynavigationitems',
              subNavigationItems: [
                {
                  url: '#',
                  excludePaths: ['#'],
                  disabled: false,
                  label: 'Something longer than collections',
                  onClick: () => setSelected('somethinglonger'),
                  matches: selected === 'somethinglonger',
                },
                {
                  url: '#',
                  excludePaths: ['#'],
                  disabled: false,
                  label: 'Inventory',
                  onClick: () => setSelected('inventory'),
                  matches: selected === 'inventory',
                },
              ],
            },
          ]}
        />
      </Navigation>
    </Frame>
  );
}

export function WithSectionRollup() {
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
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Orders',
              icon: OrdersMinor,
              onClick: () => setSelected('orders'),
              matches: selected === 'orders',
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Products',
              icon: ProductsMinor,
              onClick: () => setSelected('products'),
              matches: selected === 'products',
            },
          ]}
          rollup={{
            after: 2,
            view: 'view',
            hide: 'hide',
            activePath: '/',
          }}
        />
      </Navigation>
    </Frame>
  );
}

export function WithSectionSeparator() {
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
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Orders',
              icon: OrdersMinor,
              onClick: () => setSelected('orders'),
              matches: selected === 'orders',
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Products',
              icon: ProductsMinor,
              onClick: () => setSelected('products'),
              matches: selected === 'products',
            },
          ]}
        />
        <Navigation.Section
          items={[
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Online Store',
              icon: OnlineStoreMinor,
              onClick: () => setSelected('onlinestore'),
              matches: selected === 'onlinestore',
            },
          ]}
          separator
        />
      </Navigation>
    </Frame>
  );
}

export function WithVariousStatesAndSecondaryElements() {
  const [selected, setSelected] = React.useState('home');

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
              onClick: () => setSelected('home'),
              matches: selected === 'home',
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Item with indicator',
              icon: HomeMinor,
              onClick: () => setSelected('itemwithindicator'),
              matches: selected === 'itemwithindicator',
              subNavigationItems: [
                {
                  url: '#',
                  excludePaths: ['#'],
                  disabled: false,
                  new: true,
                  label: 'New item',
                  onClick: () => setSelected('newitem'),
                  matches: selected === 'newitem',
                },
              ],
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'New item',
              new: true,
              icon: HomeMinor,
              onClick: () => setSelected('newitem2'),
              matches: selected === 'newitem2',
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Badged item',
              badge: 'Old',
              icon: HomeMinor,
              onClick: () => setSelected('badgeditem'),
              matches: selected === 'badgeditem',
            },
            {
              url: '#',
              label: 'Active with secondary action',
              icon: OrdersMinor,
              selected: true,
              onClick: () => setSelected('activewithsecondaryaction'),
              matches: selected === 'activewithsecondaryaction',
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
              url: window.location.href,
              label: 'Active item with sub navigation',
              icon: ProductsMinor,
              selected: true,
              onClick: () => setSelected('activeitemwithsubnavigation'),
              matches: selected === 'activeitemwithsubnavigation',
              subNavigationItems: [
                {
                  url: window.location.href,
                  selected: true,
                  disabled: false,
                  label: 'Selected sub item',
                  onClick: () => setSelected('selectedsubitem'),
                  matches: selected === 'selectedsubitem',
                },
                {
                  url: '#',
                  excludePaths: ['#'],
                  disabled: false,
                  label: 'Default sub item',
                  onClick: () => setSelected('defaultsubitem'),
                  matches: selected === 'defaultsubitem',
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
              onClick: () => setSelected('overflowitem'),
              matches: selected === 'overflowitem',
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
              label: 'Polaris Icon',
              icon: OnlineStoreMinor,
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Custom SVG',
              icon: () => (
                <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.791 2.253l-.597 3.583A1 1 0 0 0 2.18 7h.893a1.5 1.5 0 0 0 1.342-.83L5 5l.585 1.17A1.5 1.5 0 0 0 6.927 7h1.146a1.5 1.5 0 0 0 1.342-.83L10 5l.585 1.17a1.5 1.5 0 0 0 1.342.83h1.146a1.5 1.5 0 0 0 1.342-.83L15 5l.585 1.17a1.5 1.5 0 0 0 1.342.83h.893a1 1 0 0 0 .986-1.164l-.597-3.583A1.5 1.5 0 0 0 16.729 1H3.271a1.5 1.5 0 0 0-1.48 1.253zM4 18.5A1.5 1.5 0 0 1 5.5 17H8v-3h4v3h2.5a1.5 1.5 0 0 1 1.5 1.5v.5H4v-.5z" />
                  <path d="M2 9h2v4h12V9h2v4.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 13.5V9z" />
                </svg>
              ),
            },
            {
              url: '#',
              label: 'Custom SVG – Active',
              icon: () => (
                <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.791 2.253l-.597 3.583A1 1 0 0 0 2.18 7h.893a1.5 1.5 0 0 0 1.342-.83L5 5l.585 1.17A1.5 1.5 0 0 0 6.927 7h1.146a1.5 1.5 0 0 0 1.342-.83L10 5l.585 1.17a1.5 1.5 0 0 0 1.342.83h1.146a1.5 1.5 0 0 0 1.342-.83L15 5l.585 1.17a1.5 1.5 0 0 0 1.342.83h.893a1 1 0 0 0 .986-1.164l-.597-3.583A1.5 1.5 0 0 0 16.729 1H3.271a1.5 1.5 0 0 0-1.48 1.253zM4 18.5A1.5 1.5 0 0 1 5.5 17H8v-3h4v3h2.5a1.5 1.5 0 0 1 1.5 1.5v.5H4v-.5z" />
                  <path d="M2 9h2v4h12V9h2v4.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 13.5V9z" />
                </svg>
              ),
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Other secondary action',
              icon: () => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.771 14.055A8 8 0 1 1 16 8c0 2.385-1.086 4.629-2.704 5.983A7.956 7.956 0 0 1 7.991 16c-.613 0-2.022-.003-5-.01h-.928l.708-1.935zm5.973-6.757c-.554-.302-.837-.565-.837-.92 0-.446.4-.735 1.017-.735a3.62 3.62 0 0 1 1.365.302l.502-1.577S10.328 4 8.963 4C7.057 4 5.73 5.117 5.73 6.68c0 .894.618 1.565 1.442 2.05.67.382.901.658.901 1.065 0 .42-.334.762-.952.762-.915 0-1.79-.486-1.79-.486l-.54 1.577s.797.552 2.15.552c1.956 0 3.373-.986 3.373-2.76-.013-.959-.721-1.642-1.571-2.142z" />
                </svg>
              ),
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
              label: 'Square app-like icon',
              icon: () => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                >
                  <path d="M0.8 0C0.358172 0 0 0.358172 0 0.8V15.2C0 15.6418 0.358172 16 0.8 16H15.2C15.6418 16 16 15.6418 16 15.2V0.8C16 0.358172 15.6418 0 15.2 0H0.8ZM2.4 4.4C2.4 3.95817 2.75817 3.6 3.2 3.6H12.8C13.2418 3.6 13.6 3.95817 13.6 4.4V5.0786L8 8.2786L2.4 5.0786V4.4ZM8.79382 9.66779L13.6 6.9214V11.6C13.6 12.0418 13.2418 12.4 12.8 12.4H3.2C2.75817 12.4 2.4 12.0418 2.4 11.6V6.9214L7.20618 9.66779C7.69807 9.94887 8.30193 9.94887 8.79382 9.66779Z" />
                </svg>
              ),
              shouldResizeIcon: true,
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

export function WithAriaLabelledby() {
  const [selected, setSelected] = React.useState('home');

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
              icon: HomeMinor,
              onClick: () => setSelected('home'),
              matches: selected === 'home',
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Orders',
              icon: OrdersMinor,
              badge: '15',
              onClick: () => setSelected('orders'),
              matches: selected === 'orders',
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Products',
              icon: ProductsMinor,
              onClick: () => setSelected('products'),
              matches: selected === 'products',
            },
          ]}
        />
      </Navigation>
    </Frame>
  );
}

export function UsingMajorIcons() {
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
              icon: HomeMajor,
              onClick: () => setSelected('home'),
              matches: selected === 'home',
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Orders',
              icon: OrdersMajor,
              badge: '15',
              onClick: () => setSelected('orders'),
              matches: selected === 'orders',
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Products',
              icon: ProductsMajor,
              onClick: () => setSelected('products'),
              matches: selected === 'products',
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Customers',
              icon: CustomersMajor,
              onClick: () => setSelected('customers'),
              matches: selected === 'customers',
            },
          ]}
        />
      </Navigation>
    </Frame>
  );
}

export function WithBadgeAndSecondaryAction() {
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
                  excludePaths: ['#'],
                  disabled: false,
                  label: 'Collections',
                  onClick: () => setSelected('collections'),
                  matches: selected === 'collections',
                },
                {
                  url: '#',
                  disabled: false,
                  label: 'Inventory',
                  onClick: () => setSelected('inventory'),
                  matches: selected === 'inventory',
                },
              ],
            },
          ]}
        />
      </Navigation>
    </Frame>
  );
}

export function ItemWithMatchedIcon() {
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
              icon: StarFilledMinor,
              matchedItemIcon: StarOutlineMinor,
              onClick: () => setSelected('home'),
              matches: selected === 'home',
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Orders',
              icon: StarFilledMinor,
              matchedItemIcon: StarOutlineMinor,
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
              icon: StarFilledMinor,
              matchedItemIcon: StarOutlineMinor,
              onClick: () => setSelected('marketing'),
              matches: selected === 'marketing',
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
              icon: StarFilledMinor,
              matchedItemIcon: StarOutlineMinor,
              onClick: () => setSelected('products'),
              matches: selected === 'products',
              subNavigationItems: [
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
                  label: 'Inventory',
                  onClick: () => setSelected('inventory'),
                  matches: selected === 'inventory',
                },
              ],
            },
          ]}
        />
      </Navigation>
    </Frame>
  );
}

export function ItemsWithoutUrl() {
  const [selected, setSelected] = React.useState('all');

  return (
    <Frame>
      <Navigation location="/">
        <Navigation.Section
          title="Templates"
          items={[
            {
              label: 'All',
              selected: selected === 'all',
              onClick: () => setSelected('all'),
            },
            {
              label: 'Announcements',
              selected: selected === 'announcements',
              onClick: () => setSelected('announcements'),
            },
            {
              label: 'Holidays and occasions',
              selected: selected === 'holidays',
              onClick: () => setSelected('holidays'),
            },
            {
              label: 'Newsletters',
              selected: selected === 'newsletters',
              onClick: () => setSelected('newsletters'),
            },
            {
              label: 'Product highlights',
              selected: selected === 'productHighlights',
              onClick: () => setSelected('productHighlights'),
            },
            {
              label: 'Promotions',
              selected: selected === 'promotions',
              onClick: () => setSelected('promotions'),
              disabled: true,
            },
          ]}
        />
        <Navigation.Section
          title="Custom"
          items={[
            {
              label: 'Your templates',
              selected: selected === 'yourTemplates',
              onClick: () => setSelected('yourTemplates'),
            },
            {
              label: 'Recent emails',
              selected: selected === 'recentEmails',
              onClick: () => setSelected('recentEmails'),
            },
          ]}
        />
      </Navigation>
    </Frame>
  );
}
