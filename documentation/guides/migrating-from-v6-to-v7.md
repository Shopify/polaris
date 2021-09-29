# Migrating from v5 to v6

Polaris v7.0.0 ([full release notes](https://github.com/Shopify/polaris-react/releases/tag/v7.0.0)) features a rebuild of the `Autocomplete` component, build changes, . This file describes all code updates required to stay up to date.

## Build changes

The build process has been update to use `sewing-kit-next`. As a result, a number of build file paths have changed.

Types

```diff
- '@shopify/polaris/dist/types/*';
+ '@shopify/polaris/build/ts/*';
```

Styles

```diff
- @import '@shopify/polaris/dist/styles.css';
+ @import '@shopify/polaris/build/esm/styles.css';
```

```diff
- @import '@shopify/polaris/dist/styles/SOME_STYLE';
+ @import '@shopify/polaris/build/styles/SOME_STYLE';
```

Index

```diff
- '@shopify/polaris/dist/index.js';
+ '@shopify/polaris/build/cjs/index.js';
```

## Dependencies

The peer dependencies on `react` and `react-dom` have been increased to 16.8.6 to allow us to use hooks internally. Use `yarn` or `npm` to install a recent version of React.

```bash
# yarn
yarn add react react-dom

# npm
npm install react react-dom
```

## Component API changes

### Autocomplete

The `Autocomplete` component has been rebuilt using the new `Combobox` and `Listbox` components. `Autocomplete.TextField` integrates with the `Combobox` context and must be used instead.

```diff
- textField={<TextField {...props} />}
+ textField={<Autocomplete.TextField {...props} />}
```

Alternatively, reference or extend `Autocomplete.TextField` to create custom `Autocomplete` text fields.

The internal `ComboBox` which was previously exported as `Autocomplete.ComboBox` has been removed. Since it was an internal component there is no direct replacement as exported. Refer to the [`Combobox documentation`](https://github.com/Shopify/polaris-react/blob/main/src/components/Combobox/README.md) for more information on how to use the new component.

### TextField

The `autoComplete` prop on `TextField` is now requiredto help enforce accessibility. Refer to the [`TextField autocomplete documentation`](https://github.com/Shopify/polaris-react/blob/main/src/components/TextField/README.md#autocomplete) for more information and recommendations on which values to use under different circumstances.

## Sewing Kit

If you use Polaris in an app built with sewing-kit, it must use at least sewing-kit 0.152.0 to leverage esnext builds.
