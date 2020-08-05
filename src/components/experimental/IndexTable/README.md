---
name: Index table
category: Lists and tables
keywords:
  - ResourceList
  - index
  - table
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
---

# Index table

An index table displays a collection of objects of the same type, like orders or products. The main job of an index table is to help merchants get an at-a-glance of the objects to perform actions or navigate to a full-page representation of it.

Index tables can also:

- Support [customized index rows and columns](https://polaris.shopify.com/components/lists-and-tables/resource-item)
- Include bulk actions so merchants can act on multiple objects at once
- Support sorting and [filtering](https://polaris.shopify.com/components/lists-and-tables/filters) of long lists
- Be paired with pagination to make long lists digestible

---

## Examples

### Index table with all of its elements

Use as a broad example that includes most of the elements and props available to index table.

```jsx
function ResourceListExample() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [allCustomersSelected, setAllCustomersSelected] = useState(false);
  const [taggedWith, setTaggedWith] = useState<string | undefined>('VIP');
  const [queryValue, setQueryValue] = useState(null);

  const handleTaggedWithChange = useCallback(
    (value) => setTaggedWith(value),
    [],
  );
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
  const handleClearAll = useCallback(() => {
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [handleQueryValueRemove, handleTaggedWithRemove]);

  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };

  const customers = [
    {
      id: 341,
      url: 'customers/341',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: 256,
      url: 'customers/256',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
      orders: 30,
      amountSpent: '$140',
    },
  ];

  const rowMarkup = customers.map(
    ({id, name, location, orders, amountSpent}, index) => {
      const idString = `${id}`;
      const isSelected = selectedItems.includes(idString);
      return (
        <IndexTableRow
          id={idString}
          key={id}
          selected={isSelected}
          position={index}
        >
          <IndexTableCell first>
            <TextStyle variation="strong">{name}</TextStyle>
          </IndexTableCell>
          <IndexTableCell>{location}</IndexTableCell>
          <IndexTableCell>{orders}</IndexTableCell>
          <IndexTableCell>{amountSpent}</IndexTableCell>
        </IndexTableRow>
      );
    },
  );

  const selectedCount = allCustomersSelected ? 'All' : selectedItems.length;

  const handleSelectionChange = useCallback(
    (
      selectionType: SelectionType,
      isSelecting: boolean,
      selection: string | Range,
    ) => {
      if (selectionType === SelectionType.All) {
        setAllCustomersSelected(isSelecting);
      } else if (allCustomersSelected) {
        setAllCustomersSelected(false);
      }

      switch (selectionType) {
        case SelectionType.Single:
          setSelectedItems((selectedItems) =>
            isSelecting
              ? [...selectedItems, selection as string]
              : selectedItems.filter((id) => id !== selection),
          );
          break;
        case SelectionType.All:
        case SelectionType.Page:
          setSelectedItems(isSelecting ? customers.map(({id}) => `${id}`) : []);
          break;
        case SelectionType.Multi:
          setSelectedItems((selectedItems) => {
            const ids: string[] = [];
            for (let i = selection[0] as number; i <= selection[1]; i++) {
              const id = customers[i].node.id;

              if (
                (isSelecting && !selectedItems.includes(id)) ||
                (!isSelecting && selectedItems.includes(id))
              ) {
                ids.push(id);
              }
            }

            return isSelecting
              ? [...selectedItems, ...ids]
              : selectedItems.filter((id) => !ids.includes(id));
          });
          break;
      }
    },
    [customers, allCustomersSelected],
  );

  const promotedBulkActions = [
    {
      content: 'Edit customers',
      onAction: () => console.log('Todo: implement bulk edit'),
    },
  ];

  const bulkActions = [
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
    },
  ];

  const filters = [
    {
      key: 'taggedWith',
      label: 'Tagged with',
      filter: (
        <TextField
          label="Tagged with"
          value={taggedWith}
          onChange={handleTaggedWithChange}
          labelHidden
        />
      ),
      shortcut: true,
    },
  ];

  const appliedFilters = !isEmpty(taggedWith)
    ? [
        {
          key: 'taggedWith',
          label: disambiguateLabel('taggedWith', taggedWith),
          onRemove: handleTaggedWithRemove,
        },
      ]
    : [];

  return (
    <Page title="Playground">
      <Card>
        <IndexProvider
          resourceName={resourceName}
          itemCount={customers.length}
          selectedItemsCount={selectedCount}
          onSelectionChange={handleSelectionChange}
        >
          <div style={{padding: '16px'}}>
            <Filters
              queryValue={queryValue}
              filters={filters}
              appliedFilters={appliedFilters}
              onQueryChange={setQueryValue}
              onQueryClear={handleQueryValueRemove}
              onClearAll={handleClearAll}
            />
          </div>
          <IndexTable
            headings={[
              {title: 'Name'},
              {title: 'Location'},
              {title: 'Order count'},
              {title: 'Amount spent'},
            ]}
            promotedBulkActions={promotedBulkActions}
            bulkActions={bulkActions}
          >
            {rowMarkup}
          </IndexTable>
        </IndexProvider>
      </Card>
    </Page>
  );

  function disambiguateLabel(key, value) {
    switch (key) {
      case 'taggedWith':
        return `Tagged with ${value}`;
      default:
        return value;
    }
  }

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === '' || value == null;
    }
  }
}
```

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

| Prop     | Type    | Description                                                     |
| -------- | ------- | --------------------------------------------------------------- |
| id       | string  | A unique identifier for the row                                 |
| selected | boolean | A boolean property indicating whether the row is selected       |
| position | number  | The index position of the row                                   |
| subdued  | boolean | A boolean property indicating whether the row should be subdued |

<a name="index-table-cell"></a>

## IndexTableCell

An `IndexTableCell` is used to render a single cell within an `IndexTableRow`

### IndexTableRow properties

| Prop      | Type    | Description                                                                      |
| --------- | ------- | -------------------------------------------------------------------------------- |
| first     | boolean | A boolean property indicating whether it is the first cell in the row            |
| last      | boolean | A boolean property indicating whether it is the last cell in the row             |
| sub       | boolean | A boolean property indicating whether it is the first cell in a subrow           |
| noPadding | boolean | A boolean property indicating whether the cell should remove the default padding |

---

## Related components

- To create an actionable list of related items that link to details pages, such as a list of customers, use the [resource list component](https://polaris.shopify.com/components/lists-and-tables/resource-list)
- To present structured data for comparison and analysis, like when helping merchants to gain insights or review analytics, use the [data table component](https://polaris.shopify.com/components/lists-and-tables/data-table)
- To display a simple list of related content, [use the list component](https://polaris.shopify.com/components/lists-and-tables/list)
