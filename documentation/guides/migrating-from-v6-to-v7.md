# Migrating from v6 to v7

Polaris v7.0.0 ([full release notes](https://github.com/Shopify/polaris/releases/tag/v7.0.0)) features a rebuild of the `Autocomplete` component, build changes, . This file describes all code updates required to stay up to date.

## Build output changes - general consumers

The build process has been update to use `loom`. As a result, a number of build file paths have changed.

The compiled styles file has moved. Imports must be updated:

```diff
- import '@shopify/polaris/dist/styles.css';
+ import '@shopify/polaris/build/esm/styles.css';
```

The public Sass API entrypoint has moved. Imports must be updated.

```diff
- @import 'path_to_node_modules/@shopify/polaris/dist/styles/public-api';
+ @import 'path_to_node_modules/@shopify/polaris/build/styles/public-api';
```

## Build output changes - @shopify/sewing-kit integrations only

If you use Polaris in an app built with sewing-kit, it must use at least sewing-kit 0.152.0 to leverage esnext builds.

Sewing-kit apps can use Polaris React’s Sass public API by configuring their Sass plugin's `autoInclude` option. The path to the Sass API file has now changed and should be updated accordingly:

```diff
plugins.sass({
  autoInclude: [
-    path.join(__dirname, 'node_modules/@shopify/polaris/dist/styles/_public-api.scss'),
+    path.join(__dirname, 'node_modules/@shopify/polaris/build/styles/_public-api.scss'),
  ],
 })
```

## React 16 and 17 dual support

Polaris has updated its peer dependencies on `react` and `react-dom` to `^16.14.0 || ^17.0.0` to allow for using the [automatic runtime](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html) in a future release. Ensure you are using versions of `react` and `react-dom` that satisfies this version range. Use the package manager of your choice to install a recent version of these packages.

## Component API changes

### Autocomplete

The `Autocomplete` component has been rebuilt using the new `Combobox` and `Listbox` components. `Autocomplete.TextField` integrates with the `Combobox` context and must be used instead.

```diff
- textField={<TextField {...props} />}
+ textField={<Autocomplete.TextField {...props} />}
```

Alternatively, reference or extend `Autocomplete.TextField` to create custom `Autocomplete` text fields.

The internal `ComboBox` which was previously exported as `Autocomplete.ComboBox` has been removed. Since it was an internal component there is no direct replacement as exported. Refer to the [`Combobox documentation`](https://github.com/Shopify/polaris/blob/main/polaris-react/src/components/Combobox/README.md) for more information on how to use the new component.

### TextField

The `autoComplete` prop on `TextField` is now required to help enforce accessibility. Refer to the [`TextField autocomplete documentation`](https://github.com/Shopify/polaris/blob/main/polaris-react/src/components/TextField/README.md#autocomplete) for more information and recommendations on which values to use under different circumstances.
