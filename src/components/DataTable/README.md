---
name: DataTable
category: Lists
keywords:
  - DataTable
  - data
  - table
  - tabular
  - index
---

# DataTable

Use to organize and display tabular data for comparison and analysis.

---

## Purpose

Put the merchant first by identifying the problem they face and the component that helps them solve it.

### Problem

Merchants need to view and analyze their sales and inventory numbers on a regular basis in order to inform their decisions. From marketing strategy to purchasing levels, understanding the stories told by data is key to successful business planning. 

Once the data is presented, they need to be able to compare and sort the data in various ways to find information, such as the lowest and highest grossing months, so that seasonality and other patterns are easy to uncover.

### Solution

Data tables present data in a clear, scannable way so comparison and analysis is easy. Merchants can select a column heading to sort the table by that column’s data and quickly find information alphabetically or numerically.

---

| Prop | Type | Description |
| ---- | ---- | ----------- |
|columnContentTypes| string[] | Array of strings specifying the data type of each column’s readable content for alignment purposes. Strings can be any of: "text", "numeric", "currency", or "date". Columns containing numeric or currency data are right-aligned for readability. |
| headings* | string[] | Array of strings, which maps to table heading cells for each of the table’s columns. |
| summary | TableData[] | Optional array of strings and or numbers, which maps to summary cells in the table header for each of the table’s columns. Use empty strings as placeholders for columns with no total. |
| rows* | TableData[][]|  Array of arrays, which maps to table body rows containing the string and or number content of each table cell. |
| footer | TableData[][] | Array of arrays, which maps to table footer rows containing the string and or number content of each table cell. |
| sortable | boolean[] | Array of booleans that maps to whether sorting the table by each column is enabled or not. Defaults to false for all columns. |
| defaultSortDirection | string | The direction to sort the table rows on first click or keypress of a sortable column heading. Defaults to "ascending." | 
| initialSortColumnIndex | number | The index of the heading that the table rows are initially sorted by. Defaults to the first column. |
| onSort | function(headingIndex: number, direction: string) | Callback fired on click or keypress of sortable column heading. The direction parameter is either "ascending" or "descending." |

## Examples

### Default data table

Use to present data for merchants to view statically.

```jsx
<DataTable
  columnContentTypes={['text', 'currency', 'numeric', 'numeric', 'currency', 'date']}
  headings={['Product', 'Price', 'Order Number', 'Quantity', 'Subtotal', 'Date']}
  rows={[
    ['Emerald Silk Gown', '$875.00', 124689, 140, '$122,500.00', 'Jan 12 2018'],
    ['Mauve Cashmere Scarf', '$230.00', 124533, 83, '$19,090.00', 'Jan 6 2018'],
    ['Navy Merino Wool Blazer with khaki chinos and yellow belt', '$445.00', 124518, 32, '$14,240.00', 'Jan 1 2018'],
  ]}
  summary={['', '', '', 255, '$155,830.00', '']}
  footer={[[`Showing ${rows.length} of ${rows.length} results`]]}
/>
```

### Sortable data table

Use to present data for merchants to compare and analyze dynamically.

```jsx
<DataTable
  columnContentTypes={['text', 'currency', 'numeric', 'numeric', 'currency', 'date']}
  headings={['Product', 'Price', 'Order Number', 'Quantity', 'Subtotal', 'Date']}
  rows={[
    ['Emerald Silk Gown', '$875.00', 124689, 140, '$122,500.00', 'Jan 12 2018'],
    ['Mauve Cashmere Scarf', '$230.00', 124533, 83, '$19,090.00', 'Jan 6 2018'],
    ['Navy Merino Wool Blazer with khaki chinos and yellow belt', '$445.00', 124518, 32, '$14,240.00', 'Jan 1 2018'],
  ]}
  summary={['', '', '', 255, '$155,830.00', '']}
  footer={[[`Showing ${rows.length} of ${rows.length} results`]]}
  sortable={[false, true, false, false, true, false]}
  defaultSortDirection="descending"
  initialSortColumnIndex={4}
  onSort={() => {})}
/>
```
---

## Related components

- To create an actionable list of related items that link to full detail management pages, such as a list of customers, use a resource list instead.

