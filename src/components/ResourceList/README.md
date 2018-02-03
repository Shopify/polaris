---
name: Resource list
category: Lists
keywords:
  - ResourceList
  - collections
  - items
  - objects
  - list of products
  - list of orders
  - product lists
  - order lists
  - collections lists
  - collection lists
  - list of collections
  - product listings list
  - channel lists
  - resource list attributes
  - list attributes
  - exceptions list
  - list secondary actions
  - secondary actions in a list
  - list of resources
---

# Resource List

A resource list displays a collection of objects of the same type, like products or customers. The main job of a resource list is to help merchants find an object and navigate to a full-page representation of it.

<!-- ![Resource list anatomy, showing filters, header, and items]() -->

Resource lists can also:

- Support [customized list items](#study-custom-item)
- Include [bulk actions](#study-bulk-actions) so merchants can act on multiple objects at once
- Support [sorting](#study-sorting) and filtering [filtering](#study-filtering) of long lists
- Be paired with [pagination](#study-pagination) to make long lists digestible

---

## Examples

### Simple resource list

A resource list with simple items and no bulk actions, sorting, or filtering. See the [case study below](#study) for implementation details.

```jsx
<ResourceList
  resourceName={{singular: 'customer', plural: 'customers'}}
  items={[
    {
      id: 341,
      url: 'customers/341',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
    },
    {
      id: 256,
      url: 'customers/256',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
    },
  ]}
  renderItem={(item) => {
    const {id, url, name, location} = item;
    const media = <Avatar customer size="medium" name={name} />;

    return (
      <ResourceList.Item id={id} url={url} media={media}>
        <h3><TextStyle variation="strong">{name}</TextStyle></h3>
        <div>{location}</div>
      </ResourceList.Item>
    );
  }}
/>
```

### Resource list with bulk actions

Allows the merchant to select items and perform an action on the selection. See [the bulk actions section of the case study](#study-bulk-actions) for implementation details.

```jsx
<ResourceList
  resourceName={{singular: 'customer', plural: 'customers'}}
  items={[
    {
      id: 341,
      url: 'customers/341',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
    },
    {
      id: 256,
      url: 'customers/256',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
    },
  ]}
  renderItem={(item) => {
    const {id, url, name, location} = item;
    const media = <Avatar customer size="medium" name={name} />;

    return (
      <ResourceList.Item id={id} url={url} media={media}>
        <h3><TextStyle variation="strong">{name}</TextStyle></h3>
        <div>{location}</div>
      </ResourceList.Item>
    );
  }}
  selectedItems={[]}
  onSelectionChange={(selectedItems) => {
    console.log(
      `Selected items changed to ${selectedItems}.`,
      'Todo: use setState to apply this change.'
    );
  }}
  promotedBulkActions={[
    {
      content: 'Edit customers',
      onAction: () => console.log('Todo: implement bulk edit'),
    },
    // Add a second promoted action if needed
  ]}
  bulkActions={[
    {
      content: 'Add tags',
      onAction: () => console.log('Todo: implement bulk add tags'),
    },
    {
      content: 'Remove tags',
      onAction: () => console.log('Todo: implement bulk remove tags'),
    },
    {
      content: 'Delete customers',
      onAction: () => console.log('Todo: implement bulk delete'),
    }
  ]}
/>
```

### Resource list with sorting

Allows the merchant to change the way the list is sorted by selecting one of several options from a [Select](/components/forms/select) control. See the [the sorting section of the case study](#study-sorting) for implementation details.

```jsx
<ResourceList
  resourceName={{singular: 'customer', plural: 'customers'}}
  items={[
    {
      id: 341,
      url: 'customers/341',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
    },
    {
      id: 256,
      url: 'customers/256',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
    },
  ]}
  renderItem={(item) => {
    const {id, url, name, location} = item;
    const media = <Avatar customer size="medium" name={name} />;

    return (
      <ResourceList.Item id={id} url={url} media={media}>
        <h3><TextStyle variation="strong">{name}</TextStyle></h3>
        <div>{location}</div>
      </ResourceList.Item>
    );
  }}
  sortValue="DATE_MODIFIED_DESC"
  sortOptions={[
    { label: 'Newest update', value: 'DATE_MODIFIED_DESC' },
    { label: 'Oldest update', value: 'DATE_MODIFIED_ASC' },
  ]}
  onSortChange={(selected) => {
    console.log(
      `Sort option changed to ${selected}.`,
      'Todo: use setState to apply this change.'
    );
  }}
/>
```

### Resource list with filtering

Allows the merchant to narrow the resource list to a subset of the original items. See the [filter control subcomponent](#subcomponent-filter-control) and the [filtering section of the case study](#study-filtering) for implementation details.

```jsx
<ResourceList
  resourceName={{ singular: 'customer', plural: 'customers' }}
  items={[
    {
      id: 341,
      url: 'customers/341',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
    },
    {
      id: 256,
      url: 'customers/256',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
    },
  ]}
  renderItem={(item) => {
    const {id, url, name, location} = item;
    const media = <Avatar customer size="medium" name={name} />;

    return (
      <ResourceList.Item id={id} url={url} media={media}>
        <h3><TextStyle variation="strong">{name}</TextStyle></h3>
        <div>{location}</div>
      </ResourceList.Item>
    );
  }}
  filterControl={
    <ResourceList.FilterControl
      resourceName={{ singular: 'customer', plural: 'customers' }}
      filters={[
        {
          key: 'totalSpentFilter',
          label: 'Total spent',
          operatorText: 'is greater than',
          type: FilterType.TextField,
        },
        {
          key: 'accountStatusFilter',
          label: 'Account status',
          operatorText: 'is',
          type: FilterType.Select,
          options: [
            'Enabled',
            'Invited',
            'Not invited',
            'Declined',
          ]
        },
      ]}
      appliedFilters={[
        {
          key: 'accountStatusFilter',
          value: 'Account enabled',
        },
      ]}
      onFiltersChange={(appliedFilters) => {
        console.log(
          `Applied filters changed to ${appliedFilters}.`,
          'Todo: use setState to apply this change.'
        );
      }}
      searchValue=""
      onSearchChange={(searchValue) => {
        console.log(
          `Search value changed to ${searchValue}.`,
          'Todo: use setState to apply this change.'
        );
      }}
      additionalAction={{
        content: 'Save',
        onAction: () => console.log('Todo: handle save filters.'),
      }}
    />
  }
/>
```

---

## Properties

| Prop          | Type | Description |
| ---           | --- | --- |
| resourceName  | {singular: string, plural: string} | Name of the resource, such as customers or products |
| items\*       | any[] | Item data; each item is passed to `renderItem` |
| renderItem\*  | function(item: any, id: string): React.ReactNode | Function to render each list item |
| idForItem     | function(item: any, index: number): string | Function to customize the unique ID for each item |
| selectedItems | string[] | Collection of IDs for the currently selected items |
| onSelectionChange | (selectedItems: string[]): void | Callback when selection is changed |
| bulkActions   | (BulkAction &#124; BulkActionListSection)[] | Actions available on the currently selected items |
| promotedBulkActions | BulkAction[] | Up to 2 bulk actions that will be given more prominence |
| sortValue     | string | Current value of the sort control |
| sortOptions   | Option[] | Collection of sort options to choose from |
| onSortChange  | function(selected: string, id: string): void | Callback when sort option is changed |
| filterControl | React.ReactNode | Accepts an element to use as the filtering UI; Normally `ResourceList.FilterControl` is passed here |
| hasMoreItems | boolean | If true and all items are selected, shows an option to select all items across a paginated list |

---

## Build

Using a resource list in a project involves combining the following components and subcomponents:

- ResourceList
- [ResourceList.Item](#subcomponent-item) or a [a customized version](#study-custom-item) of this subcomponent
- [ResourceList.FilterControl](#subcomponent-filter-control) (optional)
- Pagination component (optional)

<!-- hint -->
The resource list component provides the UI elements for list sorting, filtering, and pagination, but doesn’t provide the logic for these operations. When a sort option is changed, filter added, or second page requested, you’ll need to handle that event (including any network requests) and then update the component with new props.
<!-- end -->

View the [case study](#study) for a walkthrough of how to use this component to build an index page for customers.

---

## Purpose

Shopify is organized around objects that represent a merchant’s business, like customers, products, and orders. Each individual order, for example, is given a dedicated page that can be linked to. In Shopify, we call these types of objects _resources_, and we call the object’s dedicated page its _show page_.

### Problem

Take orders as an example. Merchants may have a lot of them. They need a way to scan their orders, see what state they’re in and find out which ones need action first. In other words, they need a way find an individual order, call up more information about it, and take action on it.

### Solution

Resource lists function as:

- A content format, presenting a set of individual resources in a compact form
- A system for taking action on one or more individual resources
- A way to navigate to an individual resource’s show page

Because a show page displays all the content and actions for an individual resource, you can think of a resource list as a summary of these show pages. In this way resource lists bridge a middle level in Shopify’s navigation hierarchy.

<!--
![Schematic showing content from a show page being surfaces on a resource list]()
-->

<!-- hint -->
#### A resource list isn’t a data table

On wide screens, a resource list often looks like a table, especially if some content is aligned in columns. Despite this, resource lists and data tables have different purposes.

A data table is a form of data visualization. It works best to present highly structured data for comparison and analysis.

If your use case is more about visualizing or analyzing data, use the data table component. If your use case is more about finding and taking action on objects, use a resource list.
<!-- end -->

---

## Best practices

Resource lists can live in many places in Shopify. You could include a short resource list in a card summarizing recent marketing activities. You could also dedicate an entire page to a resource list like Shopify’s main products index.

Resource lists should:

- Have items that perform an action when clicked. The action should navigate to the resource’s show page or otherwise provide more detail about the item.
- [Customize the content and layout](#study-custom-item) of their list items to support merchants’ needs.
- Support [sorting](#study-sorting) if the list can be long, and especially if different merchant tasks benefit from different sort orders.
- Support [filtering](#study-filtering) if the list can be long.
- [Paginate](#study-pagination) when the current list contains more than 50 items.

Resource lists can optionally:

- Provide [bulk actions](#study-bulk-actions) for tasks that are often applied to many list items at once. For example, a merchant may want to add the same tag to a large number of products.

---

## Content guidelines

Resource lists should:

- Identify the type of resource, usually with a heading

    <!-- usagelist -->
    #### Do
    - Products
    - Showing 50 products

    #### Don’t
    - _No heading_
    <!-- end -->

- Indicate when not all members of a resource are being shown. For a card summarizing and linking to recently purchased products:

    <!-- usagelist -->
    #### Do
    - Popular products this week

    #### Don’t
    - Products
    <!-- end -->

- Follow the verb + noun formula for [bulk actions](#study-bulk-actions-content-guidelines)

- Follow the [content formula for sort options](#study-sorting-content-guidelines)

- Follow the [content guidelines for filter options and applied filters](#study-filtering-content-guidelines)

---

<a name="subcomponent-item"></a>

## Resource list item

The content of a resource list consists of resource list items. Each item summarizes an individual resource and should link to its show page.

Because the content of items depends on the type of resource and merchant tasks, resource list items are flexible.

See the case study section for [more about customizing and using resource list items](#study-custom-item).

<a name="subcomponent-item-examples"></a>

### Item examples

#### Simple resource list item

A basic resource list item with its details filled in at the point of use.

```jsx
<ResourceList
  resourceName={{singular: 'blog post', plural: 'blog posts'}}
  items={[
    {
      id: 6,
      url: 'posts/6',
      title: 'How To Get Value From Wireframes',
      author: 'Jonathan Mangrove',
    },
  ]}
  renderItem={(item) => {
    const {id, url, title, author} = item;
    const authorMarkup = author
      ? <div>by {author}</div>
      : null;

    return (
      <ResourceList.Item id={id} url={url}>
        <h3>
          <TextStyle variation="strong">{title}</TextStyle>
        </h3>
        {authorMarkup}
      </ResourceList.Item>
    );
  }}
/>
```

#### Item with media

The media element can hold an [avatar](/components/images-and-icons/avatar), [thumbnail](/components/images-and-icons/thumbnail) or other small-format graphic.

```jsx
<ResourceList
  resourceName={{singular: 'customer', plural: 'customers'}}
  items={[
    {
      id: 341,
      url: 'customers/341',
      avatarSource: 'https://avatars.io/twitter/maejemison',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
    },
  ]}
  renderItem={(item) => {
    const {id, url, avatarSource, name, location} = item;

    return (
      <ResourceList.Item
        id={id}
        url={url}
        media={
          <Avatar customer size="medium" name={name} source={avatarSource} />
        }
      >
        <h3><TextStyle variation="strong">{name}</TextStyle></h3>
        <div>{location}</div>
      </ResourceList.Item>
    );
  }}
/>
```

#### Item with shortcut actions

Shortcut actions present popular actions from the resource’s show page for easy access.

```jsx
<ResourceList
  resourceName={{singular: 'customer', plural: 'customers'}}
  items={[
    {
      id: 341,
      url: 'customers/341',
      avatarSource: 'https://avatars.io/twitter/maejemison',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      latestOrderUrl: 'orders/1456',
    },
  ]}
  renderItem={(item) => {
    const {id, url, avatarSource, name, location, latestOrderUrl} = item;
    const shortcutActions = latestOrderUrl
      ? [{ content: 'View latest order', url: latestOrderUrl }]
      : null;

    return (
      <ResourceList.Item
        id={id}
        url={url}
        media={
          <Avatar customer size="medium" name={name} source={avatarSource} />
        }
        shortcutActions={shortcutActions}
      >
        <h3><TextStyle variation="strong">{name}</TextStyle></h3>
        <div>{location}</div>
      </ResourceList.Item>
    );
  }}
/>
```

<a name="subcomponent-item-props"></a>

### Item properties

| Prop      | Type            | Description |
| ---       | ---             | --- |
| id\*      | string          | Unique identifier for the item within the list |
| url       | string          | URL for the resource’s show page (required unless `onClick` is provided) |
| onClick   | function(id: string): void | Callback when clicked (required if `url` is omitted) |
| media     | React.reactNode | Content for the media area at the left of the item, usually an Avatar or Thumbnail |
| children  | React.reactNode | Content for the details area |
| shortcutActions | DisableableAction[] | 1 or 2 shortcut actions; must be available on the page linked to by `url` |

<a name="subcomponent-item-best-practices"></a>

### Item best practices

Resource list items should:

- Perform an action when clicked. The action should navigate to the resource’s show page or otherwise provide more detail about the item.
- Be tailored to the specific type of resource being displayed.
- Lay out the content effectively across all screen sizes.

Resource list items can optionally:
- Use [conditional content](#study-custom-item-conditional-content) to help merchants deal with items in unusual states
- Provide [shortcut actions](#study-custom-item-shortcut-actions) for quick access to frequent actions from the resource’s show page

Read the [case study](#study-custom-item) to see how the best practices are applied.

<a name="subcomponent-item-content-guidelines"></a>

### Item content guidelines

Resource list items should:

- Present the content merchants need to find the items they’re looking for.
- Support merchants’ tasks for the particular type of resource.
- Present content elements concisely. For example, add a label or clarifying phrase only when necessary.
- Avoid truncating content where possible.
- Avoid colons.
- [Conditional actions](#study-custom-item-conditional-content) should follow the verb + noun content formula for buttons.
- If a content value is empty, don’t use an em dash (“—”) like in a table. Instead, use a phrase like “No orders.”
- [Shortcut actions](#study-custom-item-shortcut-actions) don’t need to follow the full verb + noun formula for buttons.

See the [case study](#study-custom-item) for content guidelines in action.

---

<a name="subcomponent-filter-control"></a>

## Resource List filter control

Provides a default interface for applying filters and reflecting filter status. Supports a search term via text input and any number of straightforward filters via a menu.

<a name="subcomponent-filter-control-examples"></a>

### Filter control examples

#### Resource list with filter control

Filter control showing a state with applied filters and an additional action (optional).

```jsx
<ResourceList
  resourceName={{ singular: 'customer', plural: 'customers' }}
  items={[
    {
      id: 341,
      url: 'customers/341',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
    },
    {
      id: 256,
      url: 'customers/256',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
    },
  ]}
  renderItem={(item) => {
    const {id, url, name, location} = item;
    const media = <Avatar customer size="medium" name={name} />;

    return (
      <ResourceList.Item id={id} url={url} media={media}>
        <h3><TextStyle variation="strong">{name}</TextStyle></h3>
        <div>{location}</div>
      </ResourceList.Item>
    );
  }}
  filterControl={
    <ResourceList.FilterControl
      resourceName={{ singular: 'customer', plural: 'customers' }}
      filters={[
        {
          key: 'totalSpentFilter',
          label: 'Total spent',
          operatorText: 'is greater than',
          type: FilterType.TextField,
        },
        {
          key: 'accountStatusFilter',
          label: 'Account status',
          operatorText: 'is',
          type: FilterType.Select,
          options: [
            'Enabled',
            'Invited',
            'Not invited',
            'Declined',
          ]
        },
      ]}
      appliedFilters={[
        {
          key: 'accountStatusFilter',
          value: 'Account enabled',
        },
      ]}
      onFiltersChange={(appliedFilters) => {
        console.log(
          `Applied filters changed to ${appliedFilters}.`,
          'Todo: use setState to apply this change.'
        );
      }}
      searchValue=""
      onSearchChange={(searchValue) => {
        console.log(
          `Search value changed to ${searchValue}.`,
          'Todo: use setState to apply this change.'
        );
      }}
      additionalAction={{
        content: 'Save',
        onAction: () => console.log('Todo: handle save filters.'),
      }}
    />
  }
/>
```

<a name="subcomponent-filter-control-props"></a>

### Filter control properties

| Prop            | Type                | Description |
| ---             | ---                 | --- |
| resourceName\*  | {singular: string, plural: string} | Name of the resource, such as customers or products |
| searchValue     | string | Currently entered text in the search term field |
| appliedFilters  | AppliedFilter[] | Collection of currently applied filters |
| focused         | boolean             | Whether the search term field is focused |
| filters         | Filter[]            | Available filters |
| onSearchBlur    | function(): void    | Callback when the search term field is blurred |
| onSearchChange  | function(searchvalue: string, id: string): void | Callback when the search term field is changed |
| onFiltersChange | function(appliedFilters: AppliedFilter[]): void | Callback when the applied filters are changed |

<a name="subcomponent-filter-best-practices"></a>

### Filter control best practices

A Resource list’s filter control should:

- Make filters available that make common merchant tasks easy. For example, provide the option for merchants to filter a customer’s list to email subscribers only. Don’t offer arbitrary filters.
- Show relevant results for a wide range of search inputs, including partial words. For example, if a merchant types “unful” in the search field for an orders list, it should return all unfulfilled orders as a the result (as well as orders with this string elsewhere in Shopify, such as in an order note).

<a name="subcomponent-filter-control-content-guidelines"></a>

### Filter control content guidelines

Content for this subcomponent appears in two places: the UI for adding filters, and the tags that represent applied filters.

#### Add filter content

<!-- ![Examples of the add filter UI showing the three content elements]() -->

The content for the add filter UI is made of three parts: the label, the operator text, and the filter input. For example:

> Show all customers where: | Account status | is | Enabled

Here’s that sentence broken down:

- “Account status” is called the _label_
- “is” is the _operator text_
- “Enabled” is one of several options for the filter input, which in this case is represented by a [select component](/components/forms/select)

Here’s another example of filter content:

> Show all customers where: Number of orders | is greater than | 10

In this case, a [text field](/components/forms/text-field) is used as the filter input, in which case there is no copy to consider.

- Filter label and filter input should follow the [select menu options guidelines](https://polaris.shopify.com/components/forms/select#section-content-guidelines)
- Operator text should start with a lowercase letter
- All three content elements should form a sentence when read out in the order they appears
- Operator text may be left out if the sentence reads more clearly without it

### Applied filter content
<!-- ![Example of applied filter tags]() -->

The content that represents applied filter tags should use short, clear, non-technical labels.

<!-- usagelist -->
#### Do
- Has orders
- 10 or more orders

#### Don’t
- Number of orders is greater than 0
- order_count >= 10
<!-- end -->

---

## Related components

* To present structured data for comparison and analysis, like when helping a merchant to gain insights or review analytics, use the data table component (coming soon)
* To display a simple list of related content, [use the list component](/components/lists/list)

---

<a name="study"></a>

## Case study

To cover the resource list component in depth, we’ll create a customer list as an example. We’ll start by customizing the built-in resource list item to make a reusable custom item. Then we’ll integrate that into a resource list and add features to enhance the experience.

1. [Development setup](#study-setup) (optional)
1. [Building a reusable custom list item](#study-custom-item)
1. [Integrating the custom list item](#study-integrating-item)
1. [Adding bulk actions](#study-bulk-actions)
1. [Adding sorting](#study-sorting)
1. [Adding filtering](#study-filtering)
1. [Adding pagination](#study-pagination)
1. [End result](#study-end-result)

<a name="study-setup"></a>

### Development setup (optional)

If you want to follow along with the code, our setup will be based on Create React App. [Learn how to get started with Create React App on GitHub](https://github.com/facebook/create-react-app)

Our project directory looks like this:

```
my-app/
  README.md
  node_modules/
  package.json
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
```

The first thing we’ll do is create a customized resource list item, which means creating our very own component.

<a name="study-custom-item"></a>

### Building a reusable custom list item

A list of orders is different than a list of products and is used by merchants differently. As a result, most resource lists benefit from careful choice of content and a customized layout. The best way to do this is to customize the [built-in resource list item subcomponent](#subcomponent-item).

In this section, we’ll build a custom resource list item for customers:

<!-- ![Preview of customer list item]() -->

<!-- [Download sample code for this customer list item](link) -->

<a name="subcomponent-custom-item-content"></a>

#### Defining the content

We’ll start by figuring out what information and actions merchants need when working with customers.

- What content is useful to describe the customer?
- What content do merchants need to find a specific customer?
- What content related to the customer will help merchants fulfill an order or make a sale?

The customer name is essential. Their physical location is helpful too, especially for merchants with retail stores or multiple locations. Since orders and customer loyalty are important, the customer’s total order count and total spent are also useful for customer loyalty purposes. Finally, the customer avatar is nice to have and adds some visual interest to the item. This gives us the following content, ranked roughly by importance:

1. Customer name
1. Location
1. Number of orders
1. Total spent
1. Avatar

##### Crafting the copy

Resource lists don’t have column headings, so care must be taken to avoid ambiguous copy.

1. Start by listing out typical values for each piece of content. If the value alone speaks for itself we can use it as-is.

    <!-- usagelist -->
    #### Do
    - Adam West
    - Ottawa, Canada

    #### Don’t
    - 3
    - $492.76
    <!-- end -->

2. If a value alone is ambiguous, like the number of orders and total spent, add text to make it clear. When possible, use a short phrase rather than a label with a colon.

    <!-- usagelist -->
    #### Do
    - 3 orders

    #### Don’t
    - 3
    - Total orders: 3
    <!-- end -->

3. If a content value is empty for a given item, use a phrase to describe the empty state. For a customer with no orders, use “No orders”. If the value is numeric, “0” may be used. Don’t indicated empty values with em dash (“—”).

    When a core content element is empty, show it grayed out using the subdued [text style](/components/titles-and-text/text-style) variation.

    <!-- usagelist -->
    #### Do
    - No orders
    - 0 orders

    #### Don’t
    - —
    <!-- end -->

##### Using badges as content

The [badge component](/components/images-and-icons/badge) calls strong attention to itself. Showing a badge on every item in a list will distract from the rest of the content.

Whenever possible, use badges conditionally, showing them only when there is an issue or something strongly notable about the state of a particular resource in the list.

<!-- ![Example of a badge highlighting open orders on an item]() -->

##### Building it

At this point we have enough information to start coding. We’ll create a components directory under `src` and add three files:

```
my-app/
  README.md
  node_modules/
  package.json
  src/
    components/
      CustomerListItem/
        CustomerListItem.js
        CustomerListItem.css
        index.js
    App.css
    App.js
    App.test.js
    index.css
    index.js
```

In `CustomerListItem.js`, we’ll add the following:

```jsx
// CustomerListItem.js
import * as React from 'react';
import {ResourceList} from '@shopify/polaris';

export default function CustomerListItem(props) {
  const {id, url, children} = props;

  return (
    <ResourceList.Item id={id} url={url}>
      {children}
    </ResourceList.Item>
  );
}
```

Notice that our component is just a regular JavaScript function. This type of component is called a [functional component](https://reactjs.org/docs/components-and-props.html#functional-and-class-components). It’s a simpler way to go when a component doesn’t need to manage any internal state.

What our functional component is doing here is an example of [composition in React](https://reactjs.org/docs/composition-vs-inheritance.html#specialization). Through composition, we can build a more specific API for our customer list item on top of the [built-in resource list item](#subcomponent-item).

We’ll also add a boilerplate index.js so we can use a more concise path when importing the component:

```jsx
// index.js
import CustomerListItem from './CustomerListItem';
export default CustomerListItem;
```

Right now we’re just passing through the props required by `ResourceList.Item` (`id` and `url`) plus arbitrary content (`children`). Let’s expand on this to add the content we defined above:

```jsx
// CustomerListItem.js
import * as React from 'react';
import {
  ResourceList,
  Avatar,
} from '@shopify/polaris';

export default function CustomerListItem(props) {
  const {
    id,
    url,
    avatarSource,
    name,
    location,
    orderCount = 0,
    totalSpent = '$0.00',
  } = props;

  const media = (
    <Avatar customer size="medium" name={name} source={avatarSource} />
  );

  return (
    <ResourceList.Item id={id} url={url} media={media}>
      <h3 className="CustomerListItem__Title">{name}</h3>
      <div className="CustomerListItem__Location">{location}</div>
      <div className="CustomerListItem__OrderCount">
        {orderCount} {orderCount === 1 ? 'order' : 'orders'}
      </div>
      <div className="CustomerListItem__TotalSpent">{totalSpent} spent</div>
    </ResourceList.Item>
  );
}
```

It’s worth noting that we’re not really doing anything with `id` and `url`. We’re just “forwarding” them on to `ResourceList.Item`. Optionally, we can use rest and spread operators to make this explicit, unpacking only the props we need. This also makes our component more resilient. By default, `CustomerListItem` now accepts any prop that `ResourceList.Item` does.

```jsx
…
export default function CustomerListItem(props) {
  const {
    avatarSource,
    name,
    location,
    orderCount = 0,
    totalSpent = '$0.00',
    ...rest,
  } = props;

  const media = (
    <Avatar customer size="medium" name={name} source={avatarSource} />
  );

  return (
    <ResourceList.Item {...rest} media={media}>
      …
    </ResourceList.Item>
  );
}
```

We now have our content in place, but it has no layout.

<a name="study-custom-item-layout"></a>

#### Laying out the content

When laying out details content:

- Place the most distinctive and relevant piece of content at the top left. Set it in bold using the strong [text style](/components/titles-and-text/text-style) variation.
- Arrange secondary content to the right, [optionally arranged in columns](#study-custom-item-columns), or below the title.

To make use of the available space on wide screens, some content can be arranged in columns. Implementing this requires some care since items aren’t aware of each others’ content like in a data table. Column alignment works best for content that’s short and predictable in length.

Use the following guidelines:

- Estimate the maximum expected length of the content and add a buffer.
- Set this as the minimum width of the content element. Using a minimum width ensures that if content occasionally exceeds the expected width, it won’t break the layout.
- Choose the alignment of text within the container. Numbers should be right-aligned.

<!-- ![Example of minimum widths of different content elements]() -->

To accommodate smaller screen sizes, follow these guidelines:

- As screen size is reduced, alter the layout by stacking some content elements. Layout changes should happen at the same point for all items.
- As the layout stacks, remove column alignment as needed and remove any minimum widths.
- On small screens, when multiple pieces of content fit on a single line, use a bullet character to separate them.

<!-- ![Example of stacking across breakpoints]() -->

When laying out media content:

- If the resource doesn’t have a visual representation, it can be left out.
- Alter size of the media content across screen sizes to improve content density and visual alignment.

<!-- ![Example of a small avatar used on a widescreen layout]() -->
<!-- ![Example of a medium avatar used on a narrower layout]() -->

##### Building it

To handle the layout, we’ll need a little bit of extra markup.

```jsx
  …
  const media = (
    <Avatar customer size="medium" name={name} source={avatarSource} />
  );

  return (
    <ResourceList.Item id={id} url={url} media={media}>
      <h3 className="CustomerListItem__Title">{name}</h3>
      <div className="CustomerListItem__Location">{location}</div>
      <div className="CustomerListItem__Orders">
        <div className="CustomerListItem__OrderCount">
          {orderCount} {orderCount === 1 ? 'order' : 'orders'}
        </div>
        <div className="CustomerListItem__TotalSpent">{totalSpent} spent</div>
      </div>
    </ResourceList.Item>
  );
  …
```

And we’ll need to write some CSS. We can import our (so far empty) CSS file from our component. This tells Create React App (using WebPack under the hood) to pull in the styles and include them in our stylesheet.

```jsx
// CustomerListItem.js
…
  Avatar,
} from '@shopify/polaris';

import './CustomerListItem.css';
…
```

In the CSS itself, we’re going to start mobile first. We’ll open up the CSS file we just imported and write some styles for our content elements:

```css
.CustomerListItem__Title {
  font-weight: 600;
}

.CustomerListItem__Orders {
  display: flex;
  align-items: center;
}

.CustomerListItem__Orders > *:not(:first-child)::before {
  content: '•';
  margin: 0 4px;
  color: #919eab; /* ink, lightest */
}

.CustomerListItem__OrderCount {
  white-space: nowrap;
}

.CustomerListItem__TotalSpent {
  display: flex;
  min-width: 0;
  justify-content: flex-end;
}
```

Note that we’ve annotated the colors here to show that they correspond to the [Polaris color palette](https://polaris.shopify.com/visuals/colors#section-color-palette).

Now that we have our small screen layout, we can layer on the layouts for medium and wide screens. This requires some additional wrappers. With this extra markup, it’s a good time to split out some of this out to clean up the code:

```jsx
  …
  const media = (
    <Avatar customer size="medium" name={name} source={avatarSource} />
  );

  const profile = (
    <div className="CustomerListItem__Profile">
      <h3 className="CustomerListItem__Title">{name}</h3>
      <div className="CustomerListItem__Location">{location}</div>
    </div>
  );

  const orders = (
    <div className="CustomerListItem__Orders">
      <div className="CustomerListItem__OrderCount">
        {orderCount} {orderCount === 1 ? 'order' : 'orders'}
      </div>
      <div className="CustomerListItem__TotalSpent">
        {totalSpent} spent
      </div>
    </div>
  );

  return (
    <ResourceList.Item id={id} url={url} media={media}>
      <div className="CustomerListItem__Main">
        {profile}
        {orders}
      </div>
    </ResourceList.Item>
  );
  …
```

Now we can write our styles:

```css
…
@media (min-width: 640px) {
  .CustomerListItem__Main {
    display: flex;
  }

  .CustomerListItem__Main > *:not(:last-child) {
    margin-right: 20px;
  }

  .CustomerListItem__Orders {
    flex: 1;
    justify-content: flex-end;
  }

  .CustomerListItem__Orders > *:not(:first-child)::before {
    display: none;
  }

  .CustomerListItem__OrderCount {
    min-width: 80px;
  }

  .CustomerListItem__TotalSpent {
    min-width: 168px;
  }
}

@media (min-width: 800px) {
  .CustomerListItem__Profile {
    display: flex;
    flex-wrap: wrap;
  }

  .CustomerListItem__Profile > *:not(:last-child) {
    margin-right: 12px;
  }
}
```

Note the `min-width` values used for creating column alignment as explained in the guidelines above.

<a name="study-custom-item-conditional-content"></a>

#### Adding conditional content

Usually each list item contains the same content elements. When a particular resource is in a noteworthy state, additional content can be shown even though it’s not displayed with other items. For example, merchants can add a customer note on the customer’s show page. This is information the merchant took time to write down, and it’s worth surfacing in the list.

Unlike a customer’s name, we want to show this customer note only if it’s present. A good way to display conditional content in a resource list item is to use the exception list component (coming soon).

<!-- ![Showing a customer note using an exception list]() -->

Actions can also be presented conditionally, based on the state of the item. For example, for customers that have an open order, we can highlight this and provide a link to those orders.

<!-- ![Example of a conditional action]() -->

##### Building it

To build this, we’ll accept a few more props and use them to render an exception list item and a button under the right conditions:

```jsx
  …
  Avatar,
  Button,
} from '@shopify/polaris';

import ExceptionList from '../ExceptionList';

import './CustomerListItem.css';

export default function CustomerListItem(props) {
  const {
    avatarSource,
    name,
    location,
    orderCount = 0,
    totalSpent = '$0.00',
    note,
    openOrderCount,
    openOrdersUrl,
    ...rest,
  } = props;

  …

  let exceptions = [];
  let conditionalAction = null;

  if (note) {
    exceptions.push({ icon: 'notes', summary: note });
  }

  if (openOrderCount !== undefined) {
    const label = openOrderCount === 1 ? 'order' : 'orders';
    const summary = `${openOrderCount} open ${label}`;
    exceptions.push({ status: 'warning', icon: 'alert', summary });
    conditionalAction = (
      <Button plain url={openOrdersUrl}>
        View open orders
      </Button>
    );
  }

  const exceptionList = exceptions.length
    ? (
      <div className="CustomerListItem__Exceptions">
        <ExceptionList items={exceptions} />
      </div>
    )
    : null;

  const conditionalActions = conditionalAction
    ? (
      <div className="CustomerListItem__ConditionalActions">
        {conditionalAction}
      </div>
    )
    : null;

  return (
    <ResourceList.Item {...rest} media={media}>
      <div className="CustomerListItem__Main">
        {profile}
        {orders}
      </div>
      {exceptionList}
      {conditionalActions}
    </ResourceList.Item>
  );
}
```

We can finish this off with a couple of simple styles that apply across all breakpoints.

```css
…
.CustomerListItem__TotalSpent {
  display: flex;
  min-width: 0;
  justify-content: flex-end;
}

.CustomerListItem__Exceptions {
  margin-top: 4px;
}

.CustomerListItem__ConditionalActions {
  margin-top: 4px;
}

@media (min-width: 640px) {
…
```

<a name="study-custom-item-shortcut-actions"></a>

#### Adding shortcut actions to resource list items

Occasionally a resource has an action that merchants use a lot. Fulfilling orders is a good example. This action is not only popular, it’s the most important action for open orders.

It makes sense to surface this key action from the show page on each list item, but adding this action to each item would be visually repetitive.

Shortcut actions resolve this. They provide a way to promote popular actions by showing them when the merchant hovers their mouse over a list item. As long as the shortcut action remains available on the resource’s show page, merchants using devices without a mouse can still access them.

Our customer list item can benefit from a shortcut action that lets merchants jump to a customer’s most recent order.

<!-- ![Example of shortcut actions on a customer list]() -->

##### Best practices

Shortcut actions on resource list items must:

- Be present on the resource’s show page so they’re accessible without a mouse.

Shortcut actions should:

- Only be provided for actions that are part of a critical, common merchant task.
- Be available on every item in the list. If the state of a particular resource doesn’t permit the action, it can be left out.

##### Content guidelines

Shortcut actions should:

- Not include the noun from their label if the noun refers to the resource itself. For example, for a list of orders:

    <!-- usagelist -->
    #### Do
    - Start fulfilling

    #### Don’t
    - Start fulfilling order
    <!-- end -->

- Use the full verb + noun formula for actions that refer to another object.

    <!-- usagelist -->
    #### Do
    - View latest order

    #### Don’t
    - Latest order
    <!-- end -->

##### Building it

Shortcut actions can be defined as part of our custom list item, or we can leave it up to the developer using our component to define them for each list, just as they would using `ResourceList.Item`.

If we were to build a shortcut action into the custom item, we could offer the merchant a link to the customer’s most recent order instead of conditional actions. We could add a prop to allow this:

```jsx
    …
    openOrderCount,
    openOrdersUrl,
    latestOrderUrl
    ...rest,
  } = props;

  …

  const conditionalActions = conditionalAction
    ? (
      <div className="CustomerListItem__ConditionalActions">
        {conditionalAction}
      </div>
    )
    : null;

  const shortcutActions = openOrdersUrl
    ? [{content: 'View latest order', url: openOrdersUrl}]
    : null;

  return (
    <ResourceList.Item
      {...rest}
      media={media}
      shortcutActions={shortcutActions}
    >
      <div className="CustomerListItem__Main">
        {profile}
        {orders}
      </div>
      {exceptionList}
      {conditionalActions}
    </ResourceList.Item>
  );
}
```

With that, our custom list item is done. Let’s see it in action.

<a name="study-integrating-item"></a>

## Integrating a custom list item

In the previous section we built a customer list item.

<!-- [Download sample code for the customer list item]() -->

We’ll integrate it into a resource list by opening our App component and starting with a basic scaffold.

```jsx
import * as React from 'react';

class App extends React.Component {
  render() {
    return (<p>Test</p>);
  }
}
```

Next we’ll import `ResourceList` from Polaris and use it in our `render` method. For now we’ll just pass in the name of our resource in singular and plural form. The resource list component will use these strings to build various pieces of content, such as “Showing 50 customers”.

```jsx
import * as React from 'react';
import {
  ResourceList,
} from '@shopify/polaris';

const resourceName = {
  singular: 'customer',
  plural: 'customers',
};

class App extends React.Component {
  render() {
    return (
      <ResourceList
        resourceName={resourceName}
      />
    );
  }
}
```

Now we’ll add some mock data. In a real app this would come from an API endpoint (or as part of the initial payload from the server).

We should also make sure that our items are sorted in a way that makes sense to merchants, even before we offer the option to change the sort order. We’re going to display the customers in the order they were most recently updated—either by the merchant, or by the customer themselves by placing a new order. For this case study we’ll assume the query we performed to get the data has sorted them this way.

We can pass this data to our list’s `items` prop.

```jsx
…
const resourceName = {
  singular: 'customer',
  plural: 'customers',
};

// This would normally come from an API request
const customers = [
  {
    id: 341,
    url: 'customers/341',
    avatarSource: 'https://avatars.io/twitter/maejemison',
    name: 'Mae Jemison',
    location: 'Decatur, USA',
    orderCount: 5,
    totalSpent: '$497.76',
    note: 'This customer is awesome! Make sure to treat them right',
  },
  {
    id: 256,
    url: 'customers/256',
    avatarSource: 'https://avatars.io/twitter/Astro_Ellen',
    name: 'Ellen Ochoa',
    location: 'Los Angeles, USA',
    orderCount: 1,
    totalSpent: '$48.28',
  },
  {
    id: 145,
    url: 'customers/145',
    avatarSource: 'https://avatars.io/twitter/Astro_Soyeon',
    name: 'Yi So-Yeon',
    location: 'Gwangju, South Korea',
    orderCount: 2,
    totalSpent: '$73.98',
  },
];

class App extends React.Component {
  render() {
    return (
      <ResourceList
        resourceName={resourceName}
        items={customers}
      />
    );
  }
}
```

Notice we’ve included an `id` in our data object. This should be a unique identifier from our database.

Finally, we’ll import the custom list item we created previously and use it in the `renderItem` callback.

```jsx
  …
  ResourceList,
} from '@shopify/polaris';

import CustomerListItem from 'components/CustomerListItem';

…

class App extends React.Component {
  render() {
    return (
      <ResourceList
        resourceName={resourceName}
        items={customers}
        renderItem={(customer) => <CustomerListItem {...customer} />}
      />
    );
  }
  …
```

<a name="study-bulk-actions"></a>

### Adding bulk actions to a resource list

Resource lists support optional bulk actions. These allow merchants to select items and perform an action on the selection.

<!-- ![Image showing bulk selection and actions]() -->

Taking action on many items at once can save merchants a lot of time. However, it can also be difficult to undo. Merchants need to have a high degree of confidence that they aren’t making mistakes in bulk.

- Be deliberate about content elements shown on each list item. Make sure merchants have the content and context they need to be confident about taking action on many resources at once.
- Provide [conditional content](#study-custom-item-conditional-content) to make merchants aware when a resource is in a notable or exceptional state.

Because resource lists prioritize acting on individual items, selection checkboxes are hidden by default on small screens to save space for content. A bulk actions mode can be toggled on or off using a button that is made visible at these screen sizes.

<!-- ![Sequence showing bulk actions on a small device]() -->

Up to two frequently-used bulk actions may be visually promoted outside of the actions menu to improve ease of access and discoverability. On narrower screens, promoted actions move back into the actions menu, but always appear at the top of the list.

<!-- ![The bulk actions user interface on a wide screen and a narrow screen]() -->

<a name="study-bulk-actions-best-practices"></a>

#### Best practices

Bulk actions are optional. If a resource list is always very short, or if there’s no action that makes sense for merchants to perform in bulk, don’t offer bulk actions.

When offering bulk actions, they should:

- Save merchants time (it makes sense to take the action on many resources at once)
- Warn merchants when a bulk action is irreversible using a confirmation modal
- Be shown as promoted bulk actions if they are frequently used
- Be shown in the in order they are most often used

<a name="study-bulk-actions-content-guidelines"></a>

#### Content guidelines

Be strategic about what type of buik actions you provide to merchants—ask yourself if they’ll save merchants time.

##### Button and menu item copy

 Bulk action buttons and menu items should use the full verb + noun pattern.

##### Confirmation modal copy

Confirmation modal titles should concisely ask if the merchant wants to continue with the action using a clear {verb}+{noun} question.

The body copy should clearly explain if the action is irreversible or difficult to undo, and use [plain language](https://polaris.shopify.com/content/product-content#write-for-a-grade-7-reading-level).

The modal’s primary action should use a verb alone, like “Delete”, instead of the verb + noun content formula. This is because the action word is in close proximity to the title and body copy that already explains what will happen if a merchant takes the action. The modal’s secondary action should say “Cancel”.

Title:

<!-- usagelist -->
#### Do
- Delete 5 collections?

#### Don’t
- Are you sure you want to delete?
<!-- end -->

Body:

<!-- usagelist -->
#### Do
- This can’t be undone.

#### Don’t
- Are you sure you want to delete 5 collections? This action cannot be reversed.
<!-- end -->

Primary action (confirms the action):

<!-- usagelist -->
#### Do
- Delete

#### Don’t
- Delete collections
<!-- end -->

Secondary action (cancels the action):

<!-- usagelist -->
#### Do
- Cancel

#### Don’t
- Discard
<!-- end -->

<a name="study-bulk-actions-applying"></a>

#### Applying the guidelines

For our customers list, we’ve decided to offer the following bulk actions:

| Bulk action copy | Notes |
| --- | --- |
| Edit customers | Opens the bulk editor to allow mass edits. This will be a primary bulk action. |
| Add tags | |
| Remove tags | |
| Delete customers | Should present a confirmation modal to ensure merchants really intend a bulk delete action. |

Our confirmation modal will contain the following copy:

| Content element | Copy |
| Modal title | Delete {number} customers |
| Modal body | This action can’t be undone |
| Primary action | Delete |
| Secondary action | Cancel |

<a name="study-bulk-actions-building"></a>

#### Building it

We’ll start where we left off previously, with our items being rendered.

Now we’ll add the bulk actions. We’ll need to do several things to get this wired up:

1. Define our bulk actions and pass them to the resource list
2. Add a handler to respond when the merchant begins making a bulk selection
3. Add a way to keep track of which items have been selected and make sure our component knows, so it can display the change

The way we keep track of the current selection is with state.

```jsx
…
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItems: [],
    }

    this.handleSelectionChange = handleSelectionChange.bind(this);
  }

  render() {
    return (
      <ResourceList
        resourceName={resourceName}
        items={customers}
        renderItem={(customer) => <CustomerListItem {...customer} />}
        selectedItems={this.state.selectedItems}
        onSelectionChange={this.handleSelectionChange}
        promotedBulkActions={[
          { content: 'Edit customers' },
        ]}
        bulkActions={[
          { content: 'Add tags' },
          { content: 'Remove tags' },
          { content: 'Delete customers' },
        ]}
      />
    );
  }

  handleSelectionChange(selectedItems) {
    this.setState({selectedItems: selectedItems});
  }
}
```

This allows merchants to make a selection and see the change. Next, we’ll wire up the bulk action buttons.

```jsx
…
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItems: [],
    }

    this.handleSelectionChange = handleSelectionChange.bind(this);
    this.handleBulkEdit = this.handleBulkEdit.bind(this);
    this.handleBulkAddTags = this.handleBulkAddTags.bind(this);
    this.handleBulkRemoveTags = this.handleBulkRemoveTags.bind(this);
    this.handleBulkDelete = this.handleBulkDelete.bind(this);
  }

  render() {
    return (
      <ResourceList
        resourceName={resourceName}
        items={customers}
        renderItem={(customer) => <CustomerListItem {...customer} />}
        selectedItems={this.state.selectedItems}
        onSelectionChange={this.handleSelectionChange}
        promotedBulkActions={[
          { content: 'Edit customers', onAction: this.handleBulkEdit },
        ]}
        bulkActions={[
          { content: 'Add tags', onAction: this.handleBulkAddTags },
          { content: 'Remove tags', onAction: this.handleBulkRemoveTags },
          { content: 'Delete customers', onAction: this.handleBulkDelete },
        ]}
      />
    );
  }

  handleSelectionChange(selectedItems) {
    this.setState({selectedItems: selectedItems});
  }

  handleBulkEdit() {
    console.log('Opening bulk editor…');
  }

  handleBulkAddTags() {
    console.log('Asynchronously adding tags to customers…');
    // A Flash message should be displayed to confirm that async process
    // has started.
  }

  handleBulkRemoveTags() {
    console.log('Removing tags from customers…');
  }

  handleBulkDelete() {
    console.log('Handling bulk customer deletion…');
    // Since this action destroys resources in bulk, show a
    // confirmation modal (“Are you sure you want to delete {n}
    // customers”) before completing the action.
  }
}
```

If you’re new to React or ES2015 you might be wondering about the lines in our constructor that re-assign our handlers. This is a pattern that ensures `this` in our callbacks is correctly bound to the instance. Doing so in the class constructor helps ensure good performance.

<a name="study-sorting"></a>

### Adding sorting to the list

When a merchant sorts a list of resources they’re changing the order of the entire set. This is different from filtering, which is when the list of resources is narrowed down to a subset of the original list.

Whether or not you provide sort options, resource lists should have a default sort order that makes sense to merchants and supports their most common tasks.

When you provide sort options to merchants, they’re presented using a [select component](/components/forms/select) placed in a standard position in the list header. Each option represents the content element to sort by and a sort direction (ascending or descending).

<!-- ![Detail of the resource list header showing the sort control]() -->

<a name="study-sorting-best-practices"></a>

#### Best practices

Sort options should:

- Be offered for long lists, especially paginated lists.
- Usually correspond to visible content elements in the list, but don’t have to.
- Avoid offering more than about 8 sort options. Use research to determine the most common ways merchants want to sort a particular list.

<a name="study-sorting-content-guidelines"></a>

#### Content guidelines

A sort order is always based on a content element, like the customer name or the number of orders. For now, let’s refer to this content element as the  “sort basis”.

1. The basic content formula for sort options is {sort direction} + {sort basis}.

    The sort direction should consist of words like “Most”/“Least”, “High”/“Low”, or “Newest”/“Oldest”.

    <!-- usageblock -->
    #### Do
    _Sort by_<br/>
    Most spent<br/>
    Least spent

    #### Don’t
    _Sort by_<br/>
    High spend<br/>
    Low spend
    <!-- end -->

    <!-- usageblock -->
    #### Do
    _Sort by_<br/>
    High conversion<br/>
    Low conversion

    #### Don’t
    _Sort by_<br/>
    Largest conversion<br/>
    Smallest conversion
    <!-- end -->

    The sort basis can consist of multiple words to avoid ambiguity.

    <!-- usageblock -->
    #### Do
    _Sort by_<br/>
    Most online store visits

    #### Don’t
    _Sort by_<br/>
    Most visits
    <!-- end -->

    Avoid using multiple words for the sort direction. Adding “-est” may help.

    <!-- usageblock -->
    #### Do
    _Sort by_<br/>
    Newest update<br/>
    Oldest update

    #### Don’t
    _Sort by_<br/>
    Most recent update<br/>
    Least recent update
    <!-- end -->

2. If sorting alphabetically, the formula is slightly different. Indicate the sort direction with “A–Z” or “Z–A” at the end of the text, without parentheses. Note the use of an en dash without spaces on either side.

    <!-- usageblock -->
    #### Do
    _Sort by_<br/>
    Product title A–Z<br/>
    Product title Z–A

    #### Don’t
    _Sort by_<br/>
    Product title (A - Z)<br/>
    Product title (Z - A)
    <!-- end -->

3. Sometimes it doesn’t make sense to offer both sort directions, such as when sorting by overall relevance. It’s not a requirement to offer both directions. When offering a single sort direction, the sort direction text can be omitted from the formula.

    <!-- usageblock -->
    #### Do
    _Sort by_<br/>
    Relevance

    #### Don’t
    _Sort by_<br/>
    Most relevant<br/>
    Least relevant
    <!-- end -->

<a name="study-sorting-applying"></a>

#### Applying the guidelines

Based on merchant research and following the best practices and content guidelines, we’ve decided to offer the following options for our customer list:

| Sort option | Copy |
| --- | --- |
| Date updated (newest first) _Default_ | Newest update |
| Date updated (oldest first) | Oldest update |
| Lifetime spent (highest first) | Most spent |
| Order count (highest first) | Most orders |
| Customer last name (A–Z) | Last name A–Z |
| Customer last name (Z–A) | Last name Z–A |

<a name="study-sorting-building"></a>

#### Building it

We’ll start where we left off, with bulk actions in place. Remember that even before adding sort options, our customer data has already been sorted by most recent update, since this is most helpful to merchants.

As with bulk actions, there are broadly three parts to the implementation:

1. Defining the sort options and passing them to our list
1. Tracking the currently selected option in state and making sure our list receives the value in `render`
1. Setting up a handler to respond to and update the state when the merchant changes the sort option

```jsx
…
const customers = [
  …
];

const sortOptions = [
  { label: 'Newest update', value: 'DATE_MODIFIED_DESC' },
  { label: 'Oldest update', value: 'DATE_MODIFIED_ASC' },
  { label: 'Most spent', value: 'TOTAL_SPENT_DESC' },
  { label: 'Most orders', value: 'ORDER_COUNT_DESC' },
  { label: 'Last name A–Z', value: 'ALPHABETICAL_ASC' },
  { label: 'Last name Z–A', value: 'ALPHABETICAL_DESC' },
];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItems: [],
      sortValue: 'DATE_MODIFIED_DESC',
    }
    …
  }

  render() {
    return (
      <ResourceList
        …
        sortOptions={sortOptions}
        sortValue={this.state.sortValue}
        onSortChange={this.handleSortChange}
      />
    );
  }

  handleSortChange(sortValue: string) {
    this.setState({sortValue: sortValue});
  }

  handleSelectionChange(selectedItems) {
    this.setState({selectedItems: selectedItems});
  }
  …
```

We still have one issue though: our items haven’t been re-sorted. To do this, we’ll need to move the items into state. When our sort change handler is called, we’ll build a new array of options and update the items in state.

The actual logic used to build the new items array is dependent on your app, and so the implementation here has been left as a stub. However, it will likely involve fetching new item data from the server.

```jsx
…
const sortOptions = [
  { label: 'Newest update', value: 'DATE_MODIFIED_DESC' },
  { label: 'Oldest update', value: 'DATE_MODIFIED_ASC' },
  { label: 'Most spent', value: 'TOTAL_SPENT_DESC' },
  { label: 'Most orders', value: 'ORDER_COUNT_DESC' },
  { label: 'Last name A–Z', value: 'ALPHABETICAL_ASC' },
  { label: 'Last name Z–A', value: 'ALPHABETICAL_DESC' },
];

// Not implemented
function fetchCustomers() {
  return customers;
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: customers,
      selectedItems: [],
      sortValue: 'DATE_MODIFIED_DESC',
    }

    …
  }

  render() {
    return (
      <ResourceList
        …
        items={this.state.items}
        …
        sortOptions={sortOptions}
        sortValue={this.state.sortValue}
        onSortChange={this.handleSortChange}
      />
    );
  }

  handleSortChange(sortValue: string) {
    const items = fetchCustomers();
    this.setState({
      items: items,
      sortValue: sortValue
    });
  }
  …
```

We can also use ES2015 shorthand for object literals to make our `setState` call a little more concise:

```jsx
    …
    this.setState({items, sortValue});
    …
```

<a name="study-filtering"></a>

### Adding filtering to the list

Filtering allows a resource list to be narrowed based on one or more criteria. The resource list component provides standard filter controls and a way to display applied filters. However, it doesn’t prescribe the UI for configuring and applying the filters themselves.

<!-- ![Detail of the bulk actions filter control with applied filters]() -->

<a name="study-filtering-best-practices"></a>
<a name="study-filtering-content-guidelines"></a>

#### Best practices and content guidelines

For filtering guidelines, see the corresponding section under the resource list filter control subcomponent:

- [Resource list filter control best practices](#subcomponent-filter-control-best-practices)
- [Resource list filter control content guidelines](#subcomponent-filter-control-best-practices)

<a name="study-filtering-applying"></a>

#### Applying the guidelines

Based on merchant research and following the best practices and content guidelines, we’ve decided to offer the following filtering options:

| Filter label | Operator text | Filter input
| --- | --- | --- |
| Money spent | is greater than | _TextField_ |
| Number of orders | is greater than | _TextField_ |
| Order date | is | In the last week<br/>In the last month<br/>In the last three months<br/>In the last year |
| Is an email subscriber | | Yes<br/>No |
| Tagged with | | _Textfield_ |
| Located in | country | _Textfield_ |

<!-- ![Showing the chosen filters in action]() -->

<a name="study-filtering-building"></a>

#### Building it

We’ll start with the bulk actions and sorting we added previously and create an object representing the available filters.

```jsx
  …
  { label: 'Last name A–Z', value: 'ALPHABETICAL_ASC' },
  { label: 'Last name Z–A', value: 'ALPHABETICAL_DESC' },
];

const availableFilters = [
  {
    key: 'spentFilter',
    label: 'Money spent',
    operatorText:'is greater than',
    type: FilterType.TextField,
  },
  {
    key: 'orderCountFilter',
    label: 'Number of orders',
    operatorText:'is greater than',
    type: FilterType.TextField,
  },
  {
    key: 'orderDateFilter',
    label: 'Order date',
    operatorText:'is',
    type: FilterType.Select,
    options: [
      'In the last week',
      'In the last month',
      'In the last three months',
      'In the last year',
    ],
  },
  {
    key: 'emailSubscriberFilter',
    label: 'Is an email subscriber',
    type: FilterType.Select,
    options: [
      'Yes',
      'No',
    ],
  },
  {
    key: 'tagsFilter',
    label: 'Tagged with',
    type: FilterType.TextField,
  },
  {
    key: 'locationFilter',
    label: 'Located in',
    operatorText: 'country',
    type: FilterType.Select,
  },
];

// Not implemented
function fetchCustomers() {
  return customers;
}
…
```

Resource list doesn’t accept these available filters directly. Instead, it delegates rendering of the filter control to a separate component. Here we’ll use the built-in [resource list filter control](#subcomponent-filter-control), and this subcomponent is where we’ll pass our available filters.

```jsx
  …
  render() {
    return (
      <ResourceList
        …
        onSortChange={this.handleSortChange}
        filterControl={
          <ResourceList.FilterControl
            resourceName={resourceName}
            filters={availableFilters}
          />
        }
      />
    );
  }
  …
```

Next, we need to deal with state. We’ll add 2 new properties to our state object. One will handle the text input in the filter control’s search field. The other property will handle the rest of the filters. As we did in our sorting implementation, we’ll add handler methods that call `setState` to update the UI when the merchant changes the filters.

```jsx
…
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: customers,
      selectedItems: [],
      sortValue: 'DATE_MODIFIED_DESC',
      appliedFilters: [],
    }
    …
  }

  render() {
    return (
      <ResourceList
        …
        sortOptions={sortOptions}
        sortValue={this.state.sortValue}
        onSortChange={this.handleSortChange}
        filterControl={
          <ResourceList.FilterControl
            resourceName={resourceName}
            filters={availableFilters}
            appliedFilters={this.state.appliedFilters}
            onFiltersChange={this.handleFiltersChange}
            searchValue={this.state.searchValue}
            onSearchChange={this.handleSearchChange}
          />
        }
      />
    );
  }

  handleFiltersChange(appliedFilters) {
    const items = fetchCustomers();
    this.setState({items, appliedFilters});
  }

  handleSearchChange(searchValue) {
    const items = fetchCustomers();
    this.setState({items, searchValue});
  }
  …
}
```

As with sorting, exactly how the new items array is generated depends on your application, and so the implementation here is left as a stub. However, it will likely involve fetching new item data from the server.

<a name="study-pagination"></a>

### Adding pagination to the list

Resource lists can be long. To make the list digestible, it should be split into pages at 50 items or fewer. Use the [pagination component](/components/navigation/pagination) to allow navigation between pages.

Place the pagination immediate below the resource list.

<!-- ![Showing a resource list with pagination]() -->

Pagination interacts with bulk actions. When a resource list is paginated, the Select all control selects only the visible items. You can offer the option to select everything in the entire list.

<!-- ![Showing the UI for selecting across pages in a paginated list]() -->

<a name="study-pagination-best-practices"></a>

#### Best practices for pagination

Resource lists should:

- Have a URL for each page.
- Be paginated when they have more than 50 items.
- Disable the pagination component’s previous (or next) button on the first (or last) page in the list.

Align the pagination controls to the left, or centered. The exact layout is flexible.

<a name="study-pagination-applyin"></a>

#### Applying the guidelines

Because our customer list is intended to take up a full page, we’ll give our pagination a fair amount of space. We’ll use the wide variant and center it under the list.

<!-- ![Pagination image]() -->

<a name="study-pagination-building"></a>

#### Building it

The first thing we’ll need to do is build a simple component to handle our pagination layout. Like our custom list item, we’ll add a component to our local components directory:

```
my-app/
  README.md
  node_modules/
  package.json
  src/
    components/
      CustomerListItem/
        CustomerListItem.jsx
        CustomerListItem.css
        index.js
      CustomerListFooter/
        CustomerListFooter.jsx
        CustomerListFooter.css
        index.js
    App.css
    App.js
    App.test.js
    index.css
    index.js
```

```css
/* CustomerListFooter.css */
.CustomerListFooter {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  border-top: 1px solid #dfe4e8; /* sky */
}
```

```jsx
// CustomerListFooter.js
import * as React from 'react';
import * as styles from './CustomerListFooter.css';

export default function CustomerListFooter(props) {
  return <div className="CustomerListFooter">{props.children}</div>;
}
```

```jsx
// index.js
import CustomerListFooter from 'CustomerListFooter';
export default CustomerListFooter;
```

Now we can use this component to add our pagination.

```jsx
…
import CustomerListItem from 'components/CustomerListItem';
import CustomerListFooter from 'components/CustomerListFooter';

…

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: customers,
      selectedItems: [],
      sortValue: 'DATE_MODIFIED_DESC',
      appliedFilters: [],
      searchValue: null,
      isFirstPage: true,
      isLastPage: false,
    }
    …
  }

  render() {
    const paginationMarkup = this.state.items.length > 0
      ? (
        <CustomerListFooter>
          <Pagination
            hasPrevious={!this.state.isFirstPage}
            hasNext={!this.state.isLastPage}
            onPrevious={this.handlePreviousPage}
            onNext={this.handleNextPage}
          />
        </CustomerListFooter>
      )
      : null;

    return (
      <ResourceList
        …
      />

      {paginationMarkup}
    );
  }

  handlePreviousPage() {
    const items = fetchCustomers();
    // Todo: figure out how to determine if items represent
    // first or last page.
    this.setState({items, isFirstPage: true, isLastPage: false});
  }

  handleNextPage() {
    const items = fetchCustomers();
    // Todo: figure out how to determine if items represent
    // first or last page.
    this.setState({items, isFirstPage: false, isLastPage: true});
  }
  …
```

If we want to allow selecting all items across all pages in our paginated resource list, we can enable this interaction with the `hasMoreItems` boolean prop.

```jsx
      …
      <ResourceList
        …
        sortOptions={sortOptions}
        sortValue={this.state.sortValue}
        onSortChange={this.handleSortChange}
        filterControl={
          <ResourceList.FilterControl
            resourceName={resourceName}
            filters={availableFilters}
            appliedFilters={this.state.appliedFilters}
            onFiltersChange={this.handleFiltersChange}
            searchValue={this.state.searchValue}
            onSearchChange={this.handleSearchChange}
          />
        }
        hasMoreItems
      />
```

<a name="study-end-result"></a>

### End result

And with that, our resource list UI is complete. Here is our finished code:

```jsx
import * as React from 'react';
import {
  Page,
  Card,
  ResourceList,
  Pagination,
} from '@shopify/polaris';

import CustomerListItem from 'components/CustomerListItem';
import CustomerListFooter from 'components/CustomerListFooter';

const resourceName = {
  singular: 'customer',
  plural: 'customers',
};

// This would normally come from an API request
const customers = [
  {
    id: 341,
    url: 'customers/341',
    avatarSource: 'https://avatars.io/twitter/maejemison',
    name: 'Mae Jemison',
    location: 'Decatur, USA',
    orderCount: 5,
    totalSpent: '$497.76',
    note: 'This customer is awesome! Make sure to treat them right',
  },
  {
    id: 256,
    url: 'customers/256',
    avatarSource: 'https://avatars.io/twitter/Astro_Ellen',
    name: 'Ellen Ochoa',
    location: 'Los Angeles, USA',
    orderCount: 1,
    totalSpent: '$48.28',
  },
  {
    id: 145,
    url: 'customers/145',
    avatarSource: 'https://avatars.io/twitter/Astro_Soyeon',
    name: 'Yi So-Yeon',
    location: 'Gwangju, South Korea',
    orderCount: 2,
    totalSpent: '$73.98',
  },
];

const sortOptions = [
  { label: 'Newest update', value: 'DATE_MODIFIED_DESC' },
  { label: 'Oldest update', value: 'DATE_MODIFIED_ASC' },
  { label: 'Most spent', value: 'TOTAL_SPENT_DESC' },
  { label: 'Most orders', value: 'ORDER_COUNT_DESC' },
  { label: 'Last name A–Z', value: 'ALPHABETICAL_ASC' },
  { label: 'Last name Z–A', value: 'ALPHABETICAL_DESC' },
];

const availableFilters = [
  {
    key: 'spentFilter',
    label: 'Money spent',
    operatorText:'is greater than',
    type: FilterType.TextField,
  },
  {
    key: 'orderCountFilter',
    label: 'Number of orders',
    operatorText:'is greater than',
    type: FilterType.TextField,
  },
  {
    key: 'orderDateFilter',
    label: 'Order date',
    operatorText:'is',
    type: FilterType.Select,
    options: [
      'In the last week',
      'In the last month',
      'In the last three months',
      'In the last year',
    ],
  },
  {
    key: 'emailSubscriberFilter',
    label: 'Is an email subscriber',
    type: FilterType.Select,
    options: [
      'Yes',
      'No',
    ],
  },
  {
    key: 'tagsFilter',
    label: 'Tagged with',
    type: FilterType.TextField,
  },
  {
    key: 'locationFilter',
    label: 'Located in',
    operatorText: 'country',
    type: FilterType.Select,
  },
];

// Not implemented
function fetchCustomers(options) {
  return customers;
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: customers,
      selectedItems: [],
      sortValue: 'DATE_MODIFIED_DESC',
      appliedFilters: [],
      searchValue: null,
      isFirstPage: true,
      isLastPage: false,
    }

    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.handleBulkEdit = this.handleBulkEdit.bind(this);
    this.handleBulkAddTags = this.handleBulkAddTags.bind(this);
    this.handleBulkRemoveTags = this.handleBulkRemoveTags.bind(this);
    this.handleBulkDelete = this.handleBulkDelete.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleFiltersChange = this.handleFiltersChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handlePreviousPage = this.handlePreviousPage.bind(this);
    this.handleSaveFilters = this.handleSaveFilters.bind(this);
  }

  render() {
    const paginationMarkup = this.state.items.length > 0
      ? (
        <CustomerListFooter>
          <Pagination
            hasPrevious={!this.state.isFirstPage}
            hasNext={!this.state.isLastPage}
            onPrevious={this.handlePreviousPage}
            onNext={this.handleNextPage}
          />
        </CustomerListFooter>
      )
      : null;

    return (
      <Page
        title="Customers"
        primaryAction={{content: 'Add customer', url="customers/new" }}
      >
        <Card>
          <ResourceList
            resourceName={resourceName}
            items={this.state.items}
            renderItem={(customer) => <CustomerListItem {...customer} />}
            selectedItems={this.state.selectedItems}
            onSelectionChange={this.handleSelectionChange}
            promotedBulkActions={[
              { content: 'Edit customers', onAction: this.handleBulkEdit },
            ]}
            bulkActions={[
              { content: 'Add tags', onAction: this.handleBulkAddTags },
              { content: 'Remove tags', onAction: this.handleBulkRemoveTags },
              { content: 'Delete customers', onAction: this.handleBulkDelete },
            ]}
            sortOptions={sortOptions}
            sortValue={this.state.sortValue}
            onSortChange={this.handleSortChange}
            filterControl={
              <ResourceList.FilterControl
                resourceName={resourceName}
                filters={availableFilters}
                appliedFilters={this.state.appliedFilters}
                onFiltersChange={this.handleFiltersChange}
                searchValue={this.state.searchValue}
                onSearchChange={this.handleSearchChange}
                additionalAction={{
                  content: 'Save',
                  onAction: this.handleSaveFilters,
                }}
              />
            }
            hasMoreItems
          />

          {paginationMarkup}
        </Card>
      </Page>
    );
  }

  handlePreviousPage() {
    const items = fetchCustomers();
    // Todo: figure out how to determine if items represent
    // first or last page.
    this.setState({items, isFirstPage: true, isLastPage: false});
  }

  handleNextPage() {
    const items = fetchCustomers();
    // Todo: figure out how to determine if items represent
    // first or last page.
    this.setState({items, isFirstPage: false, isLastPage: true});
  }


  handleFiltersChange(appliedFilters) {
    const items = fetchCustomers();
    this.setState({items, appliedFilters});
  }

  handleSearchChange(searchValue) {
    const items = fetchCustomers();
    this.setState({searchValue});
  }

  handleSortChange(sortValue: string) {
    const items = fetchCustomers();
    this.setState({
      items: items,
      sortValue: sortValue
    });
  }

  handleSelectionChange(selectedItems: string[]) {
    this.setState({selectedItems});
  }

  handleBulkEdit() {
    console.log('Opening bulk editor…');
  }

  handleBulkAddTags() {
    console.log('Asynchronously adding tags to customers…');
    // A Flash message should be displayed to confirm that async process
    // has started.
  }

  handleBulkRemoveTags() {
    console.log('Removing tags from customers…');
  }

  handleBulkDelete() {
    console.log('Handling bulk customer deletion…');
    // Since this action destroys resources in bulk, show a
    // confirmation modal (“Are you sure you want to delete {n}
    // customers”) before completing the action.
  }

  handleSaveFilters() {
    console.log('Saving current filters…');
  }
}
```
