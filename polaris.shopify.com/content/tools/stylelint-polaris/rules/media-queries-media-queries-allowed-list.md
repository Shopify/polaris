---
title: media-queries/media-queries-allowed-list
description: Allows declaration of `print` and `screen` `@media` queries, allows `@media` queries for `forced-colors` and `ms-high-contrast` features, allows `@media` queries using Polaris breakpoints.
keywords:
  - stylelint
  - media queries
  - media queries rules
---

```diff
// Do
+ @include @media #{$p-breakpoints-sm-up} {}
// Don't
- @include @media #{$my-var} {}
```
