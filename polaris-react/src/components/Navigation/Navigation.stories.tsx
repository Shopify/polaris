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
} from '@shopify/polaris-icons';

export default {
  component: Navigation,
  parameters: {layout: 'fullscreen'},
} as ComponentMeta<typeof Navigation>;

export function Default() {
  return (
    <Frame>
      <Navigation location="/">
        <Navigation.Section
          items={[
            {
              url: '/',
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
  return (
    <Frame>
      <Navigation location="/">
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
              subNavigationItems: [
                {
                  url: '/admin/orders/collections',
                  disabled: false,
                  selected: false,
                  label: 'Collections',
                },
                {
                  url: '/admin/orders/inventory',
                  disabled: false,
                  label: 'Inventory',
                },
              ],
            },
            {
              url: '/path/to/place',
              label: 'Marketing',
              icon: MarketingMinor,
              badge: '15',
              subNavigationItems: [
                {
                  url: '/admin/analytics/collections',
                  disabled: false,
                  selected: false,
                  label: 'Reports',
                },
                {
                  url: '/admin/analytics/inventory',
                  disabled: false,
                  label: 'Live view',
                },
              ],
            },
            {
              url: '/admin/products',
              label: 'Products',
              icon: ProductsMinor,
              selected: true,
              subNavigationItems: [
                {
                  url: '/?path=/story/all-components-navigation--navigation-with-multiple-secondary-navigations',
                  disabled: false,
                  selected: false,
                  label: 'Collections',
                },
                {
                  url: '/admin/products/inventory',
                  disabled: false,
                  selected: true,
                  label: 'Inventory',
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
  return (
    <Frame>
      <Navigation location="/">
        <Navigation.Section
          duplicateRootItem
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
              url: '/admin/products',
              label: 'Products',
              icon: ProductsMinor,
              selected: true,
              subNavigationItems: [
                {
                  url: '/admin/products/collections',
                  disabled: false,
                  selected: false,
                  label: 'Collections',
                },
                {
                  url: '/admin/products/inventory',
                  disabled: false,
                  label: 'Inventory',
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
  return (
    <Frame>
      <Navigation location="/">
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
            },
            {
              url: '/path/to/place',
              label: 'Products',
              icon: ProductsMinor,
            },
          ]}
        />
        <Navigation.Section
          title="Sales channels"
          items={[
            {
              url: '/path/to/place',
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
  return (
    <Frame>
      <Navigation location="/">
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
              secondaryAction: {
                url: '/admin/orders/add',
                accessibilityLabel: 'Add an order',
                icon: CirclePlusOutlineMinor,
                tooltip: {
                  content: 'Add an order',
                },
              },
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

export function WithMultipleSecondaryActionsForAnItem() {
  return (
    <Frame>
      <Navigation location="/">
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
              badge: '123',
            },
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
              badge: '125',
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
                    console.log('plus clicked');
                  },
                  tooltip: {
                    content: 'Remove a product',
                  },
                },
              ],
              subNavigationItems: [
                {
                  url: '/path/to/place/index',
                  disabled: false,
                  label: 'New item',
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
                  url: '/admin/products/collections',
                  disabled: false,
                  selected: false,
                  label: 'Collections',
                },
                {
                  url: '/admin/products/inventory',
                  disabled: false,
                  label: 'Inventory',
                },
              ],
            },
            {
              url: '/path/to/place',
              label: 'Floating actions on truncated single-line text label',
              icon: PlusMinor,
              badge: '15',
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
              icon: PlusMinor,
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
              label: 'One floating action on truncated single-line text label',
              icon: PlusMinor,
              badge: '15',
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
              ],
            },
            {
              url: '/path/to/place',
              label: 'Marketing',
              icon: MarketingMinor,
              badge: '15',
              selected: true,
              secondaryActions: [
                {
                  url: '/path/to/place/view',
                  accessibilityLabel: 'View campaign',
                  icon: ViewMinor,
                  tooltip: {
                    content: 'View campaign',
                  },
                },
              ],
            },
            {
              url: '/path/to/place',
              label: 'Logout',
              icon: LogOutMinor,
            },
          ]}
        />
      </Navigation>
    </Frame>
  );
}

export function WithTruncationForVariousStates() {
  return (
    <Frame>
      <Navigation location="/">
        <Navigation.Section
          items={[
            {
              url: '/path/to/place',
              label: 'A very long label to ellipsize',
              truncateText: true,
              icon: OrdersMinor,
              selected: false,
            },
            {
              url: '/path/to/place',
              label: 'Not truncated',
              icon: OrdersMinor,
              selected: false,
            },
            {
              url: '/path/to/place',
              label: 'Lengthy label with secondary action',
              icon: OrdersMinor,
              selected: false,
              truncateText: true,
              secondaryAction: {
                url: '/admin/orders/add',
                accessibilityLabel: 'Add an order',
                icon: CirclePlusOutlineMinor,
                tooltip: {
                  content: 'Add a lengthy order',
                },
              },
            },
            {
              url: '/path/to/place',
              label: 'Lengthy non-truncated label with secondary action',
              icon: OrdersMinor,
              selected: false,
              secondaryAction: {
                url: '/admin/orders/add',
                accessibilityLabel: 'Add an order',
                icon: CirclePlusOutlineMinor,
                tooltip: {
                  content: 'Add a lengthy order',
                },
              },
            },
            {
              url: '/path/to/place',
              label: 'Lengthy label with badge',
              truncateText: true,
              badge: 'Old',
              icon: HomeMinor,
            },
            {
              url: '/path/to/place',
              label: 'Lengthy label with secondary action',
              icon: OrdersMinor,
              selected: false,
              truncateText: true,
              badge: 'Old',
              secondaryAction: {
                url: '/admin/orders/add',
                accessibilityLabel: 'Add an order',
                icon: CirclePlusOutlineMinor,
                tooltip: {
                  content: 'Add a lengthy order',
                },
              },
            },
            {
              url: '/admin/products',
              label: 'Truncated secondary navigation items',
              icon: ProductsMinor,
              selected: true,
              truncateText: true,
              subNavigationItems: [
                {
                  url: '/admin/products/collections',
                  disabled: false,
                  label: 'Something longer than collections',
                },
                {
                  url: '/admin/products/inventory',
                  disabled: false,
                  label: 'Inventoy',
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
  return (
    <Frame>
      <Navigation location="/">
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
            },
            {
              url: '/path/to/place',
              label: 'Products',
              icon: ProductsMinor,
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
  return (
    <Frame>
      <Navigation location="/">
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
            },
            {
              url: '/path/to/place',
              label: 'Products',
              icon: ProductsMinor,
            },
          ]}
        />
        <Navigation.Section
          items={[
            {
              url: '/path/to/place',
              label: 'Online Store',
              icon: OnlineStoreMinor,
            },
          ]}
          separator
        />
      </Navigation>
    </Frame>
  );
}

export function WithVariousStatesAndSecondaryElements() {
  return (
    <Frame>
      <Navigation location="/">
        <Navigation.Section
          items={[
            {
              url: '/path/to/place',
              label: 'Inactive item',
              icon: HomeMinor,
            },
            {
              url: '/path/to/place',
              label: 'Item with indicator',
              icon: HomeMinor,
              subNavigationItems: [
                {
                  url: '/path/to/place/index',
                  disabled: false,
                  new: true,
                  label: 'New item',
                },
              ],
            },
            {
              url: '/path/to/place',
              label: 'New item',
              new: true,
              icon: HomeMinor,
            },
            {
              url: '/path/to/place',
              label: 'Badged item',
              badge: 'Old',
              icon: HomeMinor,
            },
            {
              url: '/path/to/place',
              label: 'Active with secondary action',
              icon: OrdersMinor,
              selected: true,
              secondaryAction: {
                url: '/admin/orders/add',
                accessibilityLabel: 'Add an order',
                icon: CirclePlusOutlineMinor,
                tooltip: {
                  content: 'Add an order',
                },
              },
            },
            {
              url: '/admin/products',
              label: 'Active item with sub navigation',
              icon: ProductsMinor,
              selected: true,
              subNavigationItems: [
                {
                  url: '/admin/products',
                  disabled: false,
                  selected: true,
                  label: 'Selected sub item',
                },
                {
                  url: '/admin/products/transfers',
                  disabled: false,
                  label: 'Default sub item',
                },
                {
                  url: '/admin/products/inventory',
                  disabled: true,
                  label: 'Disabled sub item',
                },
              ],
            },
            {
              url: '/path/to/place',
              label: 'Disabled item',
              icon: CustomersMinor,
              disabled: true,
            },
            {
              url: '/path/to/place',
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
              url: '/path/to/place',
              label: 'Icon as svg',
              icon: OnlineStoreMinor,
            },
            {
              url: '/path/to/place',
              label: 'Icon as img',
              icon: '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M1.791 2.253l-.597 3.583A1 1 0 0 0 2.18 7h.893a1.5 1.5 0 0 0 1.342-.83L5 5l.585 1.17A1.5 1.5 0 0 0 6.927 7h1.146a1.5 1.5 0 0 0 1.342-.83L10 5l.585 1.17a1.5 1.5 0 0 0 1.342.83h1.146a1.5 1.5 0 0 0 1.342-.83L15 5l.585 1.17a1.5 1.5 0 0 0 1.342.83h.893a1 1 0 0 0 .986-1.164l-.597-3.583A1.5 1.5 0 0 0 16.729 1H3.271a1.5 1.5 0 0 0-1.48 1.253zM4 18.5A1.5 1.5 0 0 1 5.5 17H8v-3h4v3h2.5a1.5 1.5 0 0 1 1.5 1.5v.5H4v-.5z"></path><path d="M2 9h2v4h12V9h2v4.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 13.5V9z"></path></svg>',
            },
            {
              url: '/',
              label: 'Icon as img – Active',
              icon: '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M1.791 2.253l-.597 3.583A1 1 0 0 0 2.18 7h.893a1.5 1.5 0 0 0 1.342-.83L5 5l.585 1.17A1.5 1.5 0 0 0 6.927 7h1.146a1.5 1.5 0 0 0 1.342-.83L10 5l.585 1.17a1.5 1.5 0 0 0 1.342.83h1.146a1.5 1.5 0 0 0 1.342-.83L15 5l.585 1.17a1.5 1.5 0 0 0 1.342.83h.893a1 1 0 0 0 .986-1.164l-.597-3.583A1.5 1.5 0 0 0 16.729 1H3.271a1.5 1.5 0 0 0-1.48 1.253zM4 18.5A1.5 1.5 0 0 1 5.5 17H8v-3h4v3h2.5a1.5 1.5 0 0 1 1.5 1.5v.5H4v-.5z"></path><path d="M2 9h2v4h12V9h2v4.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 13.5V9z"></path></svg>',
            },
            {
              url: '/path/to/place',
              label: 'Other secondary action',
              icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M2.771 14.055A8 8 0 1 1 16 8c0 2.385-1.086 4.629-2.704 5.983A7.956 7.956 0 0 1 7.991 16c-.613 0-2.022-.003-5-.01h-.928l.708-1.935zm5.973-6.757c-.554-.302-.837-.565-.837-.92 0-.446.4-.735 1.017-.735a3.62 3.62 0 0 1 1.365.302l.502-1.577S10.328 4 8.963 4C7.057 4 5.73 5.117 5.73 6.68c0 .894.618 1.565 1.442 2.05.67.382.901.658.901 1.065 0 .42-.334.762-.952.762-.915 0-1.79-.486-1.79-.486l-.54 1.577s.797.552 2.15.552c1.956 0 3.373-.986 3.373-2.76-.013-.959-.721-1.642-1.571-2.142z"/></svg>',
              secondaryAction: {
                url: '/path/to/place/view',
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
  return (
    <Frame>
      <Navigation location="/" ariaLabelledBy="label-id">
        <Text variant="bodySm" as="span" visuallyHidden>
          <p id="label-id">Hidden label</p>
        </Text>
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

export function UsingMajorIcons() {
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

export function WithBadgeAndSecondaryAction() {
  return (
    <Frame>
      <Navigation location="/">
        <Navigation.Section
          items={[
            {
              url: '/path/to/place',
              label: 'Home',
              icon: HomeMinor,
              secondaryAction: {
                url: '/path/to/place/view',
                accessibilityLabel: 'View your online store',
                icon: ViewMinor,
                tooltip: {
                  content: 'View your online store',
                },
              },
            },
            {
              url: '/path/to/place',
              label: 'Orders',
              icon: OrdersMinor,
              badge: '15',
              subNavigationItems: [
                {
                  url: '/admin/orders/collections',
                  disabled: false,
                  selected: false,
                  label: 'Collections',
                },
                {
                  url: '/admin/orders/inventory',
                  disabled: false,
                  label: 'Inventory',
                },
              ],
            },
            {
              url: '/path/to/place',
              label: 'Marketing',
              icon: MarketingMinor,
              badge: '15',
              secondaryAction: {
                url: '/path/to/place/view',
                accessibilityLabel: 'View your online store',
                icon: ViewMinor,
                tooltip: {
                  content: 'View your online store',
                },
              },
              subNavigationItems: [
                {
                  url: '/admin/analytics/collections',
                  disabled: false,
                  selected: false,
                  label: 'Reports',
                },
                {
                  url: '/admin/analytics/inventory',
                  disabled: false,
                  label: 'Live view',
                },
              ],
            },
            {
              url: '/admin/products',
              label: 'Products',
              icon: ProductsMinor,
              selected: true,
              subNavigationItems: [
                {
                  url: '/?path=/story/all-components-navigation--navigation-with-multiple-secondary-navigations',
                  disabled: false,
                  selected: false,
                  label: 'Collections',
                },
                {
                  url: '/admin/products/inventory',
                  disabled: false,
                  selected: true,
                  label: 'Inventory',
                },
              ],
            },
          ]}
        />
      </Navigation>
    </Frame>
  );
}
