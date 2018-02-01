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

Resource lists can also:

- Support customized list items
- Include bulk actions so merchants can act on multiple objects at once
- Support sorting, filtering, and pagination of long lists

---

## Examples

### Simple resource list

Example of a resource list with simple items and no bulk actions, sorting, or filtering.

```jsx
<ResourceList
  resourceName={{singular: 'customer', plural: 'customers'}}
  items={[{
    id: 1,
    url: 'customers/123',
    avatarSource: null,
    name: 'Adam West',
    location: 'Gotham City, USA',
  }]}
  renderItem={(item, index) => {
    const {id, url, avatarSource, name, location} = item;

    return (
      <ResourceList.Item
        id={id}
        url={url}
        media={
          <Avatar customer size="medium" name={name} source={avatarSource} />
        }
      >
        <h3>
          <TextStyle variation="strong">{name}</TextStyle>
        </h3>
        <p>{location}</p>
      </ResourceList.Item>
    );
  }}
/>
```

### Resource list with custom list item

Because each resource is different, it’s often best to create your own list item component that builds on the basic resource list item.

```jsx
<p>Coming soon</p>
```

### Resource list with bulk actions

Allows the merchant to select items and perform actions on the selection.

```jsx
<p>Coming soon</p>
}
```

### Resource list with sorting

Allows the merchant to change the way the list is sorted by selecting one of several options from a dropdown menu.

```jsx
<p>Coming soon</p>
```

### Resource list with filtering

Allows the merchant to narrow the resource list to a subset of the original items.

```jsx
<p>Coming soon</p>
```

### Resource list with pagination

Resource list doesn’t include pagination, but the [pagination](#link) component can be used to achieve this.

```jsx
<p>Coming soon</p>
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

---

## Purpose

_Coming soon_

---

## Best practices

Resource lists can live in many places in Shopify. You could include a short resource list in a card summarizing recent marketing activities, or dedicate an entire page to a resource list, such as Shopify’s existing products or orders index pages.

Resource lists should:

- Have items that perform an action when clicked. The action should navigate to the resource’s show page or otherwise provide more detail about the item.
- Support sorting if the list can contain many items, and especially if different merchant tasks benefit from different sort orders.
- Support filtering if the list can contain many items, especially if the list supports pagination.
- Paginate when the list contains more than 50 items.

Resource lists can optionally:

- Provide bulk actions for tasks that are often applied to many resources at once. For example, a merchant may want to bulk add tags to a selection of products.

Resource list should not:

- Be used to present a list of resources where the primary task is not managing that resource (or an entry point into managing that resource). A good example of a case where a resource list isn’t appropriate is a list of products that is being added to a draft order. Even though the list is a list of resources, linking to the products’ show pages isn’t in line with the merchant’s task and conflicts with the main actions they would want to take (namely removing the product from the draft).

---

## Content guidelines

Resource lists should:

- Introduce the type of resource by name for a list of all products.

    <!-- usagelist -->
    #### Do

    - Products
    - Showing 50 products

    #### Don’t

    - _No title_
    <!-- end -->

- Indicate how the list is filtered if it’s a subset of all resource items. For a card summarizing and linking to recently purchased products.

    <!-- usagelist -->
    #### Do

    - Popular products this week

    #### Don’t

    - Products
    <!-- end -->

- Follow the verb + noun formula for bulk actions.

- Follow the content formulas for sort options.

---

## Related components

* To present structured data for comparison and analysis, like when helping a merchant to gain insights or review analytics, use the data table component (coming soon)
* To display a simple list of related content, [use the list component](/components/lists/list)
