---
'@shopify/polaris': major
---

No longer transpile optional chaining, nullish coalescing or numeric separators, as our target browser environments all have native support for these syntaxes. This removes support for apps using webpack4, which unable to parse these syntaxes.
