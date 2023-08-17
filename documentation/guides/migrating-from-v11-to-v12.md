# Migrating from v11 to v12

Polaris v12.0.0 ([full release notes](https://github.com/Shopify/polaris/releases/tag/v12.0.0)) prop replacement, removal of components, renamed components, and token changes.

## Table of Contents

- [Quick migration guide](#quick-migration-guide)

## Quick migration guide

**Layout.Section**

One third:

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Layout.Section" --from="oneThird" --to="variant" --newValue="oneThird"`

One half:

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Layout.Section" --from="oneHalf" --to="variant" --newValue="oneHalf"`

Full width:

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Layout.Section" --from="fullWidth" --to="variant" --newValue="fullWidth"`

Secondary, becomes oneThird:

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="Layout.Section" --from="secondary" --to="variant" --newValue="oneThird"`

**TextField**

`npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="TextField" --from="borderless" --to="variant" --newValue="borderless"`
