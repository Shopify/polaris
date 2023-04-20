---
'@shopify/polaris': patch
---

Updated the focus helper functions, order of selectors for `button:not(:disabled):not([aria-disabled="true"]):not([tabindex="-1"])` was returning an error, moved `:not(:disabled)` to the end.
