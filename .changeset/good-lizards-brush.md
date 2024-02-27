---
'@shopify/polaris': minor
---

- adds dirty and unselected states to `use-index-resource-state`
- adds stronger types to `use-index-resource-state`
- Keeps the same array interface of the API but uses `Set` under the hood for performance optimization.
  - Set was used since it offers O(1) direct access to its values. In some cases we removed O(N) traversal times since we cared about access lookup.
