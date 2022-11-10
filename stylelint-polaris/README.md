# Stylelint Polaris

## Package structure

```
stylelint-polaris/
|-- plugins/
|  |   # Custom plugin for categorizing built-in and custom rules
|  |-- coverage.js
|  |   # Additional custom rules
|  |-- custom-properties-allowed-list.js
|  |   # Plugins entry point
|  |   # (See advanced config example below)
|  |__ index.js
|   # Main stylelint-polaris config
|__ index.js
```

### Usage

### Basic

```json5
// package.json
{
  "stylelint": {
    "extends": ["@shopify/stylelint-polaris"]
  },
};
```

### Advanced

```js
// .stylelintrc.js
module.exports = {
  extends: ['@shopify/stylelint-polaris'],
  plugins: ['@shopify/stylelint-polaris/plugins'],
  rules: {
    'stylelint-polaris/custom-properties-allowed-list': {
      // Extending the allowed Polaris custom properties
      allowedProperties: [/--my-app-.+/],
    },
  },
};
```

## Local development - Polaris react

> Open your terminal to the root of the `polaris` monorepo:

1. Install and symlink dependencies

```sh
yarn install
```

2. Build `@shopify/polaris` dependencies, but not `@shopify/polaris` itself

```sh
yarn build -- --filter=@shopify/polaris^...
```

> Note: Remove the `^` character if you do want to build `@shopify/polaris`

3. Run `stylelint` on `polaris-react`

```sh
cd polaris-react && yarn lint:styles
```
