---
name: Navigation
category: Navigation
keywords:
  - navigation
  - nav
  - links
  - primary navigation
  - main navigation
  - frame
  - sidebar
  - side bar
---

# Navigation

The navigation component is used to display the primary navigation in the sidebar of the [frame](https://polaris.shopify.com/components/structure/frame) of an application. Navigation includes a list of links that merchants use to move between sections of the application.

---

## Required components

The navigation component must be passed to the [frame](https://polaris.shopify.com/components/structure/frame) component. The mobile version of the navigation component appears in the [top bar](https://polaris.shopify.com/components/structure/top-bar) component.

---

## Best practices

The navigation component should:

- Contain primary navigation items that perform an action when clicked. Each action should navigate to a URL or trigger another action like a modal overlay.
- Only use secondary actions for supplementary actions to the primary actions.
- Provide a non-primary link or action as a secondary action to a section or an item.
- Group navigation items into sections based on related categories.
- Use a section title to clarify the category of a section.
- Use a major icon for item actions.
- Use a minor icon for secondary actions.
- Use the provided navigation section component to group navigation items.

---

## Content guidelines

Navigation should:

- Use sentence case for primary and secondary navigation items

  <!-- usagelist -->

  #### Do

  - Online store

  #### Don’t

  - Online Store

  <!-- end -->

- Use as few words as possible to describe each item label

  <!-- usagelist -->

  #### Do

  - Products

  #### Don’t

  - Products in your store

  <!-- end -->

- Use all caps for section labels

  <!-- usagelist -->

  #### Do

  - SALES CHANNELS

  #### Don’t

  - Sales channels

  <!-- end -->

---

<a name="subcomponent-section"></a>

## Navigation section

A navigation section groups together related navigation items. Navigation sections can be clarified by a heading. Merchants can use a section to easily find navigation items within a specific category.

### Section properties

| Prop      | Type                     | Description                                                                                   |
| --------- | ------------------------ | --------------------------------------------------------------------------------------------- |
| items     | [Item[]](#type-item)     | A collection of navigation items to be rendered inside the section                            |
| icon      | IconProps['source']      | An icon to be displayed next to the section title                                             |
| title     | string                   | A string property providing a title for the navigation section                                |
| fill      | boolean                  | A boolean property indicating whether the section should take up all vertical space available |
| rollup    | [Rollup[]](#type-rollup) | An object determining the collapsing behavior of the navigation section                       |
| action    | [Action[]](#type-action) | Renders an icon-only action as a supplementary action next to the section title               |
| separator | boolean                  | A boolean property indicating whether the section should have a visual separator              |

<a name="type-item"></a>

### Navigation section item

The content of the navigation component consists of navigation items. Each item is a link or action a merchant can take.

#### Item properties

| Prop               | Type                | Description                                                                                                                                |
| ------------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| url                | string              | A location for the navigation item to navigate to when clicked                                                                             |
| matches            | boolean             | A boolean property indicating whether the navigation item should respond to a closely matching location property                           |
| exactMatch         | boolean             | A boolean property indicating whether the navigation item should respond to an exactly matching location property                          |
| matchPaths         | string[]            | A string property providing a collection of additional paths for the navigation item to respond to                                         |
| excludePaths       | string[]            | A string property providing an explicit collection of paths the navigation item should not respond to                                      |
| icon               | IconProps['source'] | An icon to be displayed next to the navigation item                                                                                        |
| badge              | string \| null      | A string property allowing content to be displayed in a badge next to the navigation item                                                  |
| label              | string              | A string property allowing content to be displayed as link text in the navigation item                                                     |
| disabled           | boolean             | A boolean property indicating whether the navigation item is disabled                                                                      |
| new                | boolean             | Indicate whether the navigation item is new by adding an indicator dot to the parent and badge to the item (overwritten by the badge prop) |
| accessibilityLabel | string              | A visually hidden label for screen readers to understand the content of a navigation item                                                  |
| selected           | boolean             | A boolean property indicating whether the navigation item is the currently-selected item                                                   |
| subNavigationItems | SubNavigationItem[] | A collection of navigation items rendered as nested secondary navigation items                                                             |
| secondaryAction    | SecondaryAction     | Renders an icon-only action as a supplementary action next to a navigation item                                                            |
| onClick()          | function            | A callback function to handle clicking on a navigation item                                                                                |

<a name="type-rollup"></a>

### Navigation section rollup

Rollup allows items in a navigation section to roll up and be revealed when they are of use to the merchant.

#### Rollup properties

| Prop       | Type   | Description                                                              |
| ---------- | ------ | ------------------------------------------------------------------------ |
| after      | number | A number of items after which the navigation section should be collapsed |
| view       | string | A string property providing content for the section view action          |
| hide       | string | A string property providing content for the section hide action          |
| activePath | string | A string property representing the current URL of your application       |

<a name="type-action"></a>

### Navigation section action

Action allows a complementary icon-only action to render next to the section title.

#### Action properties

| Prop               | Type                | Description                                                                        |
| ------------------ | ------------------- | ---------------------------------------------------------------------------------- |
| icon               | IconProps['source'] | An icon to be displayed as the content of the action                               |
| accessibilityLabel | string              | A visually hidden label for screen readers to understand the content of the action |
| onClick()          | function            | A callback function to handle clicking on the action                               |

---

## Examples

### Basic navigation

Use to present a navigation menu in the [frame](https://polaris.shopify.com/components/structure/frame).

```jsx
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
    ]}
  />
</Navigation>
```

### Navigation with an active secondary navigation item

Use to present a secondary action, related to a section and to title the section.

```jsx
<Navigation location="/">
  <Navigation.Section
    items={[
      {
        url: '/',
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
        url: '/admin/products',
        label: 'Products',
        icon: ProductsMajor,
        selected: true,
        subNavigationItems: [
          {
            url: '/admin/products',
            disabled: false,
            selected: true,
            label: 'All products',
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
```

### Navigation with a secondary action for a section and a section title

Use to present a secondary action, related to a section and to title the section.

```jsx
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
      },
      {
        url: '/path/to/place',
        label: 'Products',
        icon: ProductsMajor,
      },
    ]}
  />
  <Navigation.Section
    title="Sales channels"
    items={[
      {
        url: '/path/to/place',
        label: 'Online Store',
        icon: OnlineStoreMajor,
      },
    ]}
    action={{
      accessibilityLabel: 'Add sales channel',
      icon: CirclePlusOutlineMinor,
      onClick: () => {},
    }}
  />
</Navigation>
```

### Navigation with a secondary action for an item

Use to add a different action for an item than the main action, like to view or add something.

```jsx
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
        secondaryAction: {
          url: '/admin/orders/add',
          accessibilityLabel: 'Add an order',
          icon: CirclePlusOutlineMinor,
        },
      },
      {
        url: '/path/to/place',
        label: 'Products',
        icon: ProductsMajor,
      },
    ]}
  />
</Navigation>
```

### Navigation with section rollup

Use to show a limited number of items in a section with an option to expand the remaining items.

```jsx
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
      },
      {
        url: '/path/to/place',
        label: 'Products',
        icon: ProductsMajor,
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
```

### Navigation with section separator

Use to add a horizontal line below the section.

```jsx
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
      },
      {
        url: '/path/to/place',
        label: 'Products',
        icon: ProductsMajor,
      },
    ]}
  />
  <Navigation.Section
    items={[
      {
        url: '/path/to/place',
        label: 'Online Store',
        icon: OnlineStoreMajor,
      },
    ]}
    separator
  />
</Navigation>
```

### Navigation with various states and secondary elements

This example showcases the many elements that can compose a navigation, especially useful for testing purposes.

```jsx
<Navigation location="/">
  <Navigation.Section
    items={[
      {
        url: '/path/to/place',
        label: 'Inactive item',
        icon: HomeMajor,
      },
      {
        url: '/path/to/place',
        label: 'Item with indicator',
        icon: HomeMajor,
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
        icon: HomeMajor,
      },
      {
        url: '/path/to/place',
        label: 'Badged item',
        badge: 'Old',
        icon: HomeMajor,
      },
      {
        url: '/path/to/place',
        label: 'Active with secondary action',
        icon: OrdersMajor,
        selected: true,
        secondaryAction: {
          url: '/admin/orders/add',
          accessibilityLabel: 'Add an order',
          icon: CirclePlusOutlineMinor,
        },
      },
      {
        url: '/admin/products',
        label: 'Active item with sub navigation',
        icon: ProductsMajor,
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
        icon: CustomersMajor,
        disabled: true,
      },
      {
        url: '/path/to/place',
        label: 'Overflow item',
        icon: MarketingMajor,
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
        icon: OnlineStoreMajor,
      },
      {
        url: '/path/to/place',
        label: 'Icon as img',
        icon:
          '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M1.791 2.253l-.597 3.583A1 1 0 0 0 2.18 7h.893a1.5 1.5 0 0 0 1.342-.83L5 5l.585 1.17A1.5 1.5 0 0 0 6.927 7h1.146a1.5 1.5 0 0 0 1.342-.83L10 5l.585 1.17a1.5 1.5 0 0 0 1.342.83h1.146a1.5 1.5 0 0 0 1.342-.83L15 5l.585 1.17a1.5 1.5 0 0 0 1.342.83h.893a1 1 0 0 0 .986-1.164l-.597-3.583A1.5 1.5 0 0 0 16.729 1H3.271a1.5 1.5 0 0 0-1.48 1.253zM4 18.5A1.5 1.5 0 0 1 5.5 17H8v-3h4v3h2.5a1.5 1.5 0 0 1 1.5 1.5v.5H4v-.5z"></path><path d="M2 9h2v4h12V9h2v4.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 13.5V9z"></path></svg>',
      },
      {
        url: '/path/to/place',
        label: 'Other secondary action',
        icon:
          '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M2.771 14.055A8 8 0 1 1 16 8c0 2.385-1.086 4.629-2.704 5.983A7.956 7.956 0 0 1 7.991 16c-.613 0-2.022-.003-5-.01h-.928l.708-1.935zm5.973-6.757c-.554-.302-.837-.565-.837-.92 0-.446.4-.735 1.017-.735a3.62 3.62 0 0 1 1.365.302l.502-1.577S10.328 4 8.963 4C7.057 4 5.73 5.117 5.73 6.68c0 .894.618 1.565 1.442 2.05.67.382.901.658.901 1.065 0 .42-.334.762-.952.762-.915 0-1.79-.486-1.79-.486l-.54 1.577s.797.552 2.15.552c1.956 0 3.373-.986 3.373-2.76-.013-.959-.721-1.642-1.571-2.142z"/></svg>',
        secondaryAction: {
          url: '/path/to/place/view',
          accessibilityLabel: 'View your online store',
          icon: ViewMinor,
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
```

---

## Related components

- To provide the structure for the navigation component, including the left sidebar and the top bar use the [frame](https://polaris.shopify.com/components/structure/frame) component.
- To display the navigation component on small screens, to provide search and a user menu, or to theme the [frame](https://polaris.shopify.com/components/structure/frame) component to reflect an application’s brand, use the [top bar](https://polaris.shopify.com/components/structure/top-bar) component.
- To tell merchants their options once they have made changes to a form on the page use the [contextual save bar](https://polaris.shopify.com/components/forms/contextual-save-bar) component.
- To provide quick, at-a-glance feedback on the outcome of an action, use the [toast](https://polaris.shopify.com/components/feedback-indicators/toast) component.
- To indicate to merchants that a page is loading or an upload is processing use the [loading](https://polaris.shopify.com/components/feedback-indicators/loading) component.
- To alternate among related views within the same context, use the [tabs](https://polaris.shopify.com/components/navigation/tabs) component.
- To embed a single action or link within a larger span of text, use the [link](https://polaris.shopify.com/components/navigation/link) component.
