# Migrating @shopify/polaris-icons from v3 to v4

Polaris Icons v4.0.0 ([full release notes](https://github.com/Shopify/polaris-icons/releases/tag/v4.0.0)) updates icon styles across the board. It replaces monotone, twotone and filled major icon variants with a single style and icons that previously lived in the `@shopify/polaris-icons-internal` package are now part of the public `@shopify/polaris-icons` package. This document describes all code updates required to stay up to date.

## Replace Filled, Twotone and Monotone major icons

In Polaris Icons v3 Major icons came in three styles `Monotone`, `Twotone` and `Filled` as denoted by a suffix on their import name. In v4 we have removed this distinction and thus the suffix on the import name. You should update icon imports to omit these suffixes. For instance `HomeMajorMonotone` and `HomeMajorTwotone` would both become `HomeMajor`.

### React migration

Update imports from `@shopify/polaris-icons` to remove the `Monotone`, `Twotone` and `Filled` suffixes:

```diff
import {
  DuplicateMinor,
  ViewMinor,
-  HomeMajorMonotone,
-  CircleInformationMajorFilled,
-  CircleInformationMajorTwotone,
+  HomeMajor,
+  CircleInformationMajor,
} from '@shopify/polaris-icons';
```

Update the component code that references the imports.

```diff
- <Icon source={MobileCancelMajorMonotone} />
+ <Icon source={MobileCancelMajor} />
```

### Rails migration

Icon names have been renamed to match the import names that you would use in the npm package. Remove any hyphens and underscores and convert the name to be PascalCase. Remove the `Monotone`, `Twotone` and `Filled` suffixes.

```diff
- <%= ui_icon('external:card-reader-tap_major_monotone') %>
+ <%= ui_icon('external:CardReaderTapMajor') %>
```

### Rename deprecated icons

The following deprecated icon names have been removed. The same icons are now available under new names. Replace removed icon names with their updated versions.

- `ColorMajor` has been replaced with `ColorsMajor`
- `FavouriteMajor` has been replaced with `FavoriteMajor`
- `NotesMinor` has been replaced with `NoteMinor`
- `SelectMinor` has been replaced with `ArrowUpDownMinor`
- `SidebarMajor` has been replaced with `SidebarLeftMajor`

## polaris-icons-internal

Fraud-related icons were previously part of a separate internal package and are now part of the public package.

1. Remove `@shopify/polaris-icons-internal` from the project’s dependencies in `package.json`
2. Replace imports of `@shopify/polaris-icons-internal` with `@shopify/polaris-icons`:

```diff
import {
-  FraudProtectMajorMonotone
-} from '@shopify/polaris-icons-internal';
+  FraudProtectMajor
+} from '@shopify/polaris-icons';
```
