---
'@shopify/polaris': minor
---

Added support for subheaders and selection of a range of `IndexTable.Rows` -- See the [With subheaders](https://polaris.shopify.com/components/tables/index-table) example on polaris.shopify.com for how to properly configure
- `IndexTable.Row`
  - Added support for setting the `indeterminate` value on the `selected` prop
  - Added the `selectionRange` prop to specify a range of other consecutive, related rows selected when the row is selected
  - Added the `rowType` prop to indicate the relationship or role of the row's contents (defaults to `data`, `subheader` renders the row to look and behave like the table header row)
Added support for setting accessibility attributes on `IndexTable.Cell`
- `IndexTable.Cell`
  - Added the `as` prop to support rendering the cell as a `th` element if it is serving as a subheading cell
  - Added support for the `headers` attribute to manually associate all headers when the cell is described by more than its column heading
  - Added support for the `colSpan` attribute to specify the number of the columns that the cell element should extend to
  - Added support for the `scope` attribute to indicate whether the `th` is a header for a column, row, or group of columns or rows
