---
'@shopify/polaris': minor
'polaris.shopify.com': patch
---

IndexTable subheader support updates:
- `IndexTable.Row`
  - Added the `header` prop to apply subheader styles
  - Added `indeterminate` value to `selected` prop
  - Added `selectionRange` prop to specify which rows in the range are selected when the row is selected
  - Added `rowType` prop to indicate the relationship or role of the row's contents (`data` or `subheader`)
- `IndexTable.Cell`
  - Added the `header` prop to apply subheader styles
  - Added `as` prop to set as a `th` if it is serving as a subheading
  - Added `colSpan` prop to specify the number of the columns that the cell element should extend
  - Added `scope` prop to indicate which cells the `th` element relates
- See the [With subheaders](https://polaris.shopify.com/components/tables/index-table) example on polaris.shopify.com for how to properly configure.
