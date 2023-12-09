---
'@shopify/polaris': minor
---

- Fixed the hierarchy of `FormLayout` child spacing
- Added a `variant` prop to `FormLayout.Group` to support vertical layout of its children
- Added a `presentational` prop to `FormLayout.Group` to support layout only grouping of children
- Added support for nesting field groups by preventing `FormLayout.Group` from wrapping child instances of `FormLayout.Group` with `FormLayout.Item`
