---
'@shopify/polaris': minor
---

Added support for an `EditColumns` button rendered in the `IndexFilters` deprecating the `Tabs`'s `edit-columns` action.

- `IndexFilters`
  - Added support for rendering an Edit Columns button using the `showEditColumnsButton` flag.
  - Added the edition `mode` to the `onEditStart(mode)` callback.
- `Tabs`
  - Removed the `edit-columns` action type.
