---
'@shopify/polaris': patch
---

Updates the focus helper functions to no longer treat buttons with `aria-disabled="disabled"` and `tabindex="-1" (but no`disabled` attribute) as focusable.
