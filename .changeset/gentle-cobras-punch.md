---
'@shopify/polaris': patch
---

Updated the focus helper functions to no longer treat buttons with `aria-disabled="true"` and `tabindex="-1" (but no`disabled` attribute) as focusable.
