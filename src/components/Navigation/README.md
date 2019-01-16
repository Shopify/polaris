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

The navigation component is used to display the primary navigation in the sidebar of the [frame](/components/structure/frame) of any non-embedded application. Navigation includes a list of links that merchants use to move between sections of the application.

---

## Components dependencies

The navigation component must be passed to the [frame](/components/structure/frame) component. The mobile version of the navigation component appears in the [topbar](/components/structure/top-bar) component.

---

## Best practices

The navigation component must be used within the [frame](/components/structure/frame) component.

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
| iconBody           | string              | An `SVG` element passed as a string from a server and displayed next to the navigation item                                                |
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

<a name="subcomponent-usermenu"></a>

## Navigation user menu

The user menu component displays the current user’s avatar and name, and actions that are related to the current logged in user. The menu is displayed at the top of the navigation sidebar at small screen sizes. The user menu can display any messages that the current user has available to read.

### User menu properties

| Prop           | Type                    | Description                                                                                             |
| -------------- | ----------------------- | ------------------------------------------------------------------------------------------------------- |
| name           | string                  | A string detailing the merchant’s full name to be displayed in the user menu                            |
| detail         | string                  | A string allowing further details on the merchant’s name displayed in the user menu                     |
| actions        | UserActionSection[]     | An array of action objects that are rendered inside of a dropdown triggered by this menu                |
| message        | MessageProps            | Accepts a message that facilitates direct, urgent communication with the merchant through the user menu |
| avatarInitials | AvatarProps['initials'] | The merchant’s initials, rendered in place of an avatar image when not provided                         |
| avatarSource   | AvatarProps['source']   | An avatar image representing the merchant                                                               |

---

## Examples

### Basic navigation

Use to present a navigation menu in the [frame](/components/structure/frame).

```jsx
<Navigation location="/">
  <Navigation.Section
    items={[
      {
        url: '/path/to/place',
        label: 'Home',
        icon: 'home',
      },
      {
        url: '/path/to/place',
        label: 'Orders',
        icon: 'orders',
        badge: '15',
      },
      {
        url: '/path/to/place',
        label: 'Products',
        icon: 'products',
      },
    ]}
  />
</Navigation>
```

### Navigation with user menu

Use to present a navigation menu and a user menu in the [frame](/components/structure/frame).

```jsx
<Navigation
  location="/"
  userMenu={
    <Navigation.UserMenu
      name="Ellen Ochoa"
      detail="Ochoa Crafts"
      actions={[
        {
          id: '123',
          items: [{content: 'Perform action'}],
        },
      ]}
      message={{
        title: 'Message title',
        description: 'Message description',
        action: {content: 'Perform action'},
        link: {to: 'path/to/place', content: 'Link content'},
      }}
      avatarInitials="EO"
    />
  }
>
  <Navigation.Section
    items={[
      {
        url: '/path/to/place',
        label: 'Home',
        icon: 'home',
      },
      {
        url: '/path/to/place',
        label: 'Orders',
        icon: 'orders',
      },
      {
        url: '/path/to/place',
        label: 'Products',
        icon: 'products',
      },
    ]}
  />
</Navigation>
```

### Navigation with sections and a separator

Use to divide groups of items with a horizontal divider.

```jsx
<Navigation location="/">
  <Navigation.Section
    items={[
      {
        url: '/path/to/place',
        label: 'Home',
        icon: 'home',
      },
      {
        url: '/path/to/place',
        label: 'Orders',
        icon: 'orders',
      },
      {
        url: '/path/to/place',
        label: 'Products',
        icon: 'products',
      },
    ]}
  />
  <Navigation.Section
    items={[
      {
        url: '/path/to/place',
        label: 'Online Store',
        icon: 'onlineStore',
      },
    ]}
    separator
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
        icon: 'home',
      },
      {
        url: '/path/to/place',
        label: 'Orders',
        icon: 'orders',
      },
      {
        url: '/path/to/place',
        label: 'Products',
        icon: 'products',
      },
    ]}
  />
  <Navigation.Section
    title="Sales channels"
    items={[
      {
        url: '/path/to/place',
        label: 'Online Store',
        icon: 'onlineStore',
      },
    ]}
    action={{
      accessibilityLabel: 'Add sales channel',
      icon: 'circlePlusOutline',
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
        icon: 'home',
      },
      {
        url: '/path/to/place',
        label: 'Orders',
        icon: 'orders',
        secondaryAction: {
          url: '/admin/orders/add',
          accessibilityLabel: 'Add an order',
          icon: 'circlePlusOutline',
        },
      },
      {
        url: '/path/to/place',
        label: 'Products',
        icon: 'products',
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
        icon: 'home',
      },
      {
        url: '/path/to/place',
        label: 'Orders',
        icon: 'orders',
      },
      {
        url: '/path/to/place',
        label: 'Products',
        icon: 'products',
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

Use to add a horizontal line between sections.

```jsx
<Navigation location="/">
  <Navigation.Section
    items={[
      {
        url: '/path/to/place',
        label: 'Home',
        icon: 'home',
      },
      {
        url: '/path/to/place',
        label: 'Orders',
        icon: 'orders',
      },
      {
        url: '/path/to/place',
        label: 'Products',
        icon: 'products',
      },
    ]}
  />
  <Navigation.Section
    items={[
      {
        url: '/path/to/place',
        label: 'Online Store',
        icon: 'onlineStore',
      },
    ]}
    separator
  />
</Navigation>
```

---

## Related components

- To provide the structure for the navigation component, including the left sidebar and the top bar use the [frame](/components/structure/frame) component.
- To display the navigation component on small screens, to provide search and a user menu, or to theme the [frame](/components/structure/frame) component to reflect an application’s brand, use the [top bar](/components/structure/top-bar) component.
- To tell merchants their options once they have made changes to a form on the page use the [contextual save bar](/components/forms/contextual-save-bar) component.
- To provide quick, at-a-glance feedback on the outcome of an action, use the [toast](/components/feedback-indicators/toast) component.
- To indicate to merchants that a page is loading or an upload is processing use the [loading](/components/feedback-indicators/loading) component.
- To alternate among related views within the same context, use the [tabs](/components/navigation/tabs) component.
- To embed a single action or link within a larger span of text, use the [link](/components/navigation/link) component.
