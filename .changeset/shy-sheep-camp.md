---
'@shopify/polaris': major
---

Fixed `Badge` and `Pip` having different background colors for `new` and `info` status ([#5798](https://github.com/Shopify/polaris/pull/5840))

Removed default `status` prop in `Pip`. That caused a color mismatch between `Badge` background and progress indicator in situations where `Badge` has `progress` but no informed `status`. For `Badge.Pip`, if users don't inform the `status` prop in, its color is gray ([#5798](https://github.com/Shopify/polaris/pull/5840))
