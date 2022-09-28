---
'@shopify/polaris': patch
'@shopify/polaris-tokens': patch
---

Increase `$p-breakpoint-*-{down,only}` breakpoint max-width values by 0.01px so that they are representable in fewer digits of precision when expressed as `em`s. This ensures they are representable without rounding when using `node-sass`'s default precision. E.g. `$p-breakpoints-md-down`changes from `max-width: 47.996875em` to `max-width: 47.9975em`.
