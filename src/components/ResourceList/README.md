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
