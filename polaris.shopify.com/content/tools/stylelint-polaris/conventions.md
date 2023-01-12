---
title: Convention rules
description: Coming soon...
keywords:
  - stylelint
  - dev tools
  - developer tools
  - tools
  - tooling
  - development
  - plugin
  - rules
  - conventions
  - linter
  - linting
  - css
---

## custom-property-allowed-list

Allows definition of custom properties not prefixed with `--p-`, `--pc-`, or `--polaris-version-`.

```diff
root: {
// Don't
- --p-animation-name-drag-handle-pulse: osui_drag-handle-pulse;
// Do
+ --osui_animation-name-drag-handle-pulse: osui_drag-handle-pulse;
};
```

Flags declaration property values using `--p-*` that are not valid Polaris tokens.

```diff
// Don't
- font-size: var(--p-fontsize-200);
// Do
+ font-size: var(--p-font-size-200);
```

Flags declaration property values using private `--pc-*` tokens.

The following token value is considered a problem:

```diff
// Don't
- background: var(--pc-button-color-depressed);
// Do
+ background: var(--p-action-secondary-depressed);
```
