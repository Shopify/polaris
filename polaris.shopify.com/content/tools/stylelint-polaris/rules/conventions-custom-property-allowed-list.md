---
title: conventions/custom-property-allowed-list
description: Allows definition of custom properties not using Polaris prefixes, flags declaration property values that are not valid Polaris tokens, flags declaration property values using private tokens.
keywords:
  - stylelint
  - conventions
  - conventions rules
---

Allows definition of custom properties not prefixed with `--p-`, `--pc-`, or `--polaris-version-`.

```diff
root: {
// Do
+ --osui_animation-name-drag-handle-pulse: osui_drag-handle-pulse;
// Don't
- --p-animation-name-drag-handle-pulse: osui_drag-handle-pulse;
};
```

Flags declaration property values using `--p-*` that are not valid Polaris tokens.

```diff
// Do
+ font-size: var(--p-font-size-200);
// Don't
- font-size: var(--p-fontsize-200);
```

Flags declaration property values using private `--pc-*` tokens.

```diff
// Do
+ background: var(--p-action-secondary-depressed);
// Don't
- background: var(--pc-button-color-depressed);
```
