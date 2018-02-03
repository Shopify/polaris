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

## Related components

* To present structured data for comparison and analysis, like when helping a merchant to gain insights or review analytics, use the data table component (coming soon)
* To display a simple list of related content, [use the list component](/components/lists/list)
