---
name: Index table
category: Lists and tables
keywords:
  - ResourceList
  - index
  - table
  - list
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
  - filter
  - sort
examples:
  - fileName: index-table-simple.tsx
    title: Simple index table
    description: >-
      A index table with simple items and no bulk actions, sorting, or
      filtering.
  - fileName: index-table-simple-small-screen.tsx
    title: Simple small screen index table
    description: >-
      A small screen index table with simple items and no bulk actions, sorting,
      or filtering.
  - fileName: index-table-with-empty-state.tsx
    title: IndexTable with empty state
    description: >-
      Use to explain the purpose of a index table when no resources exist yet.
      This allows a smooth transition from a list in a loading state to a list
      where zero, one, or many resources exist.
  - fileName: index-table-with-bulk-actions.tsx
    title: IndexTable with bulk actions
    description: Allows merchants to select items and perform an action on the selection.
  - fileName: index-table-with-multiple-promoted-bulk-actions.tsx
    title: IndexTable with multiple promoted bulk actions
    description: >-
      Allows merchants to select items and perform different actions on the
      selection.
  - fileName: index-table-with-bulk-actions-and-selection-across-pages.tsx
    title: IndexTable with bulk actions and selection across pages
    description: >-
      Allows merchants to select items, perform an action on the selection and
      select resources across pages.
  - fileName: index-table-with-loading-state.tsx
    title: IndexTable with loading state
    description: Notifies merchants that index table items are being processed.
  - fileName: index-table-with-filtering.tsx
    title: IndexTable with filtering
    description: >-
      Allows merchants to narrow the index table to a subset of the original
      items.
  - fileName: index-table-with-row-status.tsx
    title: Index table with row status
    description: An index table with rows differentiated by status.
  - fileName: index-table-with-sticky-last-column.tsx
    title: Index table with sticky last column
    description: >-
      An index table with a sticky last column that stays visible on scroll. The
      last heading will also be sticky if not hidden.
  - fileName: index-table-without-checkboxes.tsx
    title: Index table without checkboxes
    description: An index table without checkboxes and bulk actions.
  - fileName: index-table-with-all-of-its-elements.tsx
    title: IndexTable with all of its elements
    description: >-
      Use as a broad example that includes most of the elements and props
      available to index table.
  - fileName: index-table-small-screen-with-all-of-its-elements.tsx
    title: Small screen IndexTable with all of its elements
    description: >-
      Use as a broad example that includes most of the elements and props
      available to index table.
---

# Index table

An index table displays a collection of objects of the same type, like orders or products. The main job of an index table is to help merchants get an at-a-glance of the objects to perform actions or navigate to a full-page representation of it.

Index tables can also:

- Support [customized index rows and columns](https://polaris.shopify.com/components/lists-and-tables/resource-item)
- Include bulk actions so merchants can act on multiple objects at once
- Support sorting and [filtering](https://polaris.shopify.com/components/lists-and-tables/filters) of long lists
- Be paired with pagination to make long lists digestible

---

## Build

Using an index table in a project involves combining the following components and subcomponents:

- IndexTable
- [IndexTableRow](#index-table-row)
- [IndexTableCell](#index-table-cell)
- [Filters](https://polaris.shopify.com/components/lists-and-tables/filters) (optional)
- Pagination component (optional)

<!-- hint -->

The index table component provides the UI elements for list sorting, filtering, and pagination, but doesn’t provide the logic for these operations. When a sort option is changed, filter added, or second page requested, you’ll need to handle that event (including any network requests) and then update the component with new props.

<!-- end -->

---

## Purpose

Shopify is organized around objects that represent merchants businesses, like customers, products, and orders. Each individual order, for example, is given a dedicated page that can be linked to. In Shopify, we call these types of objects _resources_, and we call the object’s dedicated page its _details page_.

### Problem

Take orders as an example. Merchants may have a lot of them. They need a way to scan their orders, view the different attributes on each order, and find out which ones need action first. In other words, they need a way find an individual order, call up more information about it, and take action on it.

### Solution

Index tables function as:

- A content format, presenting a set of individual resources with multiple columns of information for each
- A system for taking action on one or more individual resources
- A way to navigate to an individual resource’s details page

Because a details page displays all the content and actions for an individual resource, you can think of a resource list as a summary of these details pages. In this way resource lists bridge a middle level in Shopify’s navigation hierarchy.

---

## Best practices

Index tables should:

- Have items that perform an action when clicked. The action should navigate to the resource’s details page or otherwise provide more detail about the item.
- [Customize the content and layout](https://polaris.shopify.com/components/lists-and-tables/resource-item) of their items rows to surface information to support merchants’ needs.
- Support sorting if the list can be long, and especially if different merchant tasks benefit from different sort orders.
- Support [filtering](https://polaris.shopify.com/components/lists-and-tables/filters) if the list can be long.
- Paginate when the current list contains more than 50 items.
- Use the [skeleton page](https://polaris.shopify.com/components/feedback-indicators/skeleton-page) component on initial page load for the rest of the page if the loading prop is true and items are processing.

Index tables can optionally:

- Provide bulk actions for tasks that are often applied to many list items at once. For example, merchants may want to add the same tag to a large number of products.

---

## Content guidelines

Index tables should:

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

- Follow the verb + noun formula for bulk actions

- Follow the [content guidelines for filter options and applied filters](https://polaris.shopify.com/components/lists-and-tables/filters#section-content-guidelines)

---

<a name="index-table-row"></a>

## IndexTableRow

An `IndexTableRow` is used to render a row representing an item within an `IndexTable`

### IndexTableRow properties

| Prop     | Type      | Description                                                     |
| -------- | --------- | --------------------------------------------------------------- |
| id       | string    | A unique identifier for the row                                 |
| selected | boolean   | A boolean property indicating whether the row is selected       |
| position | number    | The index position of the row                                   |
| subdued  | boolean   | A boolean property indicating whether the row should be subdued |
| status   | RowStatus | A property indicating whether the row should have a status      |

<a name="index-table-cell"></a>

## IndexTableCell

An `IndexTableCell` is used to render a single cell within an `IndexTableRow`

### IndexTableCell properties

| Prop  | Type    | Description                                                                      |
| ----- | ------- | -------------------------------------------------------------------------------- |
| flush | boolean | A boolean property indicating whether the cell should remove the default padding |

---

## Related components

- To create an actionable list of related items that link to details pages, such as a list of customers, use the [resource list component](https://polaris.shopify.com/components/lists-and-tables/resource-list)
- To present structured data for comparison and analysis, like when helping merchants to gain insights or review analytics, use the [data table component](https://polaris.shopify.com/components/lists-and-tables/data-table)
- To display a simple list of related content, [use the list component](https://polaris.shopify.com/components/lists-and-tables/list)
