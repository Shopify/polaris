---
'@shopify/polaris': patch
---

Changed onClick focus for stepper from `setFocus(true)` to `input.focus()` to allow `onBlur` to be called.
