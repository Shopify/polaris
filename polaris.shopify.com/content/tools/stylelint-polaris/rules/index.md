---
title: Rules
description: There are over 40 rules configured in Stylelint Polaris to help you avoid errors and follow stylistic and non-stylistic conventions while building for the Shopify admin.
hideChildren: true
keywords:
  - rules
  - stylelint rules
  - css rules
---

## Colors

- [colors/color-named](/tools/stylelint-polaris/rules/colors-color-named): Disallows named colors
- [colors/color-no-hex](/tools/stylelint-polaris/rules/colors-color-no-hex): Disallows hex colors
- [colors/declaration-property-value-disallowed-list](/tools/stylelint-polaris/rules/colors-declaration-property-value-disallowed-list): Disallows custom decimal opacity values
- [colors/function-disallowed-list](/tools/stylelint-polaris/rules/colors-function-disallowed-list): Disallows allows use of built in and legacy color functions
- [colors/at-rule-disallowed-list](/tools/stylelint-polaris/rules/colors-at-rule-disallowed-list): Disallows use of legacy color mixins
- [colors/global-disallowed-list](/tools/stylelint-polaris/rules/colors-global-disallowed-list): Disallows use of legacy color custom properties and mixin map data

## Motion

- [motion/function-disallowed-list](/tools/stylelint-polaris/rules/motion-function-disallowed-list): Disallows use of legacy Sass motion functions
- [motion/declaration-property-unit-disallowed-list](/tools/stylelint-polaris/rules/motion-declaration-property-unit-disallowed-list): Disallows use of hard-coded millisecond `ms` and second `s` values on transition and animation properties
- [motion/at-rule-disallowed-list](/tools/stylelint-polaris/rules/motion-at-rule-disallowed-list): Disallows use of CSS @keyframes
- [motion/global-disallowed-list](/tools/stylelint-polaris/rules/motion-global-disallowed-list): Disallows use of legacy Polaris motion tokens

## Typography

- [typography/declaration-property-value-disallowed-list](/tools/stylelint-polaris/rules/typography-declaration-property-value-disallowed-list): Disallows hard-coded alphanumeric font-weight values
- [typography/declaration-property-unit-disallowed-list](/tools/stylelint-polaris/rules/typography-declaration-property-unit-disallowed-list): Disallows hard-coded `px`, `em`, and `rem` values for font-size and line-height properties
- [typography/function-disallowed-list](/tools/stylelint-polaris/rules/typography-function-disallowed-list): Disallows use of legacy Sass typography functions
- [typography/at-rule-disallowed-list](/tools/stylelint-polaris/rules/typography-at-rule-disallowed-list): Disallows use of legacy Sass typography mixins
- [typography/global-disallowed-list](/tools/stylelint-polaris/rules/typography-global-disallowed-list): Disallows use of legacy Polaris typography tokens and mixin map data

## Shape

- [shape/declaration-property-unit-disallowed-list](/tools/stylelint-polaris/rules/shape-declaration-property-unit-disallowed-list): Disallows hard-coded `px`, `em`, and `rem` units in border property values
- [shape/function-disallowed-list](/tools/stylelint-polaris/rules/shape-function-disallowed-list): Disallows use of legacy Sass border functions
- [shape/at-rule-disallowed-list](/tools/stylelint-polaris/rules/shape-at-rule-disallowed-list): Disallows use of legacy Sass border mixins
- [shape/global-disallowed-list](/tools/stylelint-polaris/rules/shape-global-disallowed-list): Disallows use of legacy Polaris shape tokens and mixin map data

## Spacing

- [spacing/declaration-property-unit-disallowed-list](/tools/stylelint-polaris/rules/spacing-declaration-property-unit-disallowed-list): Disallows use of hard-coded px, em, and rem values on gap, margin, and padding properties
- [spacing/function-disallowed-list](/tools/stylelint-polaris/rules/spacing-function-disallowed-list): Disallows use of legacy Sass spacing functions
- [spacing/global-disallowed-list](/tools/stylelint-polaris/rules/spacing-global-disallowed-list): Disallows use of legacy spacing custom properties and Sass mixin data

## Depth

- [depth/declaration-property-unit-disallowed-list](/tools/stylelint-polaris/rules/depth-declaration-property-unit-disallowed-list): Disallows box-shadow declarations with hard coded px, rem, or em units
- [depth/function-disallowed-list](/tools/stylelint-polaris/rules/depth-function-disallowed-list): Disallows use of built-in and legacy shadow functions
- [depth/global-disallowed-list](/tools/stylelint-polaris/rules/depth-global-disallowed-list): Disallows use of legacy shadow custom properties and Sass mixin data
- [depth/property-disallowed-list](/tools/stylelint-polaris/rules/depth-property-disallowed-list): Disallows text shadow property

## Media-queries

- [media-queries/function-disallowed-list](/tools/stylelint-polaris/rules/media-queries-function-disallowed-list): Disallows use of legacy breakpoint sass functions
- [media-queries/media-queries-allowed-list](/tools/stylelint-polaris/rules/media-queries-media-queries-allowed-list): Allows declaration of `print` and `screen` `@media` queries, allows `@media` queries for `forced-colors` and `ms-high-contrast` features, allows `@media` queries using Polaris breakpoints
- [media-queries/at-rule-disallowed-list](/tools/stylelint-polaris/rules/media-queries-at-rule-disallowed-list): Disallows use of legacy breakpoint Sass mixins

## Z-index

- [z-index/declaration-property-value-allowed-list](/tools/stylelint-polaris/rules/z-index-declaration-property-value-allowed-list): Disallows declaration of `z-index` values that are not Polaris z-index tokens
- [z-index/function-disallowed-list](/tools/stylelint-polaris/rules/z-index-function-disallowed-list): Disallows use of the legacy z-index Sass function
- [z-index/global-disallowed-list](/tools/stylelint-polaris/rules/z-index-global-disallowed-list): Disallows the use of legacy z-index custom properties and Sass mixin data

## Layout

- [layout/declaration-property-value-disallowed-list](/tools/stylelint-polaris/rules/layout-declaration-property-value-disallowed-list): Disallows declaration of positioning and dimension property values with Polaris tokens
- [layout/function-disallowed-list](/tools/stylelint-polaris/rules/layout-function-disallowed-list): Disallows use of internal Sass layout functions
- [layout/at-rule-disallowed-list](/tools/stylelint-polaris/rules/layout-at-rule-disallowed-list): Disallows use of legacy Sass mixins
- [layout/property-disallowed-list](/tools/stylelint-polaris/rules/layout-property-disallowed-list): Disallows declarations of layout properties
- [layout/global-disallowed-list](/tools/stylelint-polaris/rules/layout-global-disallowed-list): Disallows use of legacy custom properties and Sass mixin map data

## Conventions

- [conventions/custom-property-allowed-list](/tools/stylelint-polaris/rules/conventions-custom-property-allowed-list): Allows definition of custom properties not using Polaris prefixes, flags declaration property values that are not valid Polaris tokens, flags declaration property values using private tokens

## Legacy

- [legacy/at-rule-disallowed-list](/tools/stylelint-polaris/rules/legacy-at-rule-disallowed-list): Disallows use pf legacy Sass mixins
- [legacy/function-disallowed-list](/tools/stylelint-polaris/rules/legacy-function-disallowed-list): Disallows use off legacy Sass functions
- [legacy/global-disallowed-list](/tools/stylelint-polaris/rules/legacy-global-disallowed-list): Disallows use of legacy custom properties and Sass mixin map data
