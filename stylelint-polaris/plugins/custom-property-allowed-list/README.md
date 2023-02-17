## Custom property allowed list plugin

The purpose of this plugin is to ensure that we're following our established conventions for Polaris custom properties, and only using custom properties that are generated Polaris tokens.

### Enforced Rules

- If a `--p-*` custom property is used it must match an existing Polaris [token](/src/tokens/tokens.ts).
- Local component custom properties must have a `--pc-` prefix.

## How to use

### Options:

```ts
interface PrimaryOptions {
  /**
   * A list of regular expressions or string literals that match custom properties
   * that are allowed to be used.
   */
  allowedProperties?: (string | RegExp)[];
  /**
   * A map of properties and their allowed custom properties represented as a list
   * of regular expressions or string literals.
   */
  allowedValues?: {[property: string]: (string | RegExp)[]};
}
```

### How to configure

```js
const stylelintConfig = {
  rules: {
    'polaris/custom-property-allowed-list': {
      allowedProperties: ['/--pc-.+/'],
      allowedValues: {
        width: ['--p-space-0', '--p-space-1' /* etc... */],
        '/.+/': ['/--pc-.+/', '--p-space-0', '--p-space-1' /* etc... */],
      },
    },
  },
};
```

> Note: Property keys for `allowedValues` are evaluated in order. Please ensure that you
> order your property keys from most specific to least specific.

### Run all linters

```
yarn lint
```

OR

```
yarn stylelint <file-glob>
```

e.x.

### Lint all files

```
yarn stylelint **/*.scss
```

### Lint the TextContainer.scss file

```
yarn stylelint src/components/typography/textContainer/TextContainer.scss
```

e.x. output

```
src/components/typography/textContainer/TextContainer.scss
  4:3  ✖  Unexpected custom property [--p-text-container-spacing].        polaris/custom-property-allowed-list
  6:5  ✖  Invalid custom properties [--p-text-container-spacing].         polaris/custom-property-allowed-list
 15:3  ✖  Unexpected custom property [--p-text-container-spacing].        polaris/custom-property-allowed-list
 19:3  ✖  Unexpected custom property [--p-text-container-spacing].        polaris/custom-property-allowed-list
```

> Note: `--p-text-container-spacing` is not a valid Polaris custom property from [`tokens.ts`](../../../../src/tokens/tokens.ts). This custom property should use the local component prefix `--pc-` instead.

## FUTURE

- Think about how to keep polaris tokens in sync in both plugin and `polaris-react`
  (e.g. If `@shopify/custom-property-allowed-list` plugin is separated from `polaris-react`)
  - Share token generator functions? (e.g. `getPolarisCustomProperty`)
- Validate color-scheme tokens have the same key value pairs: https://github.com/Shopify/polaris-react/issues/4803
