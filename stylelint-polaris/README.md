# Stylelint Polaris

Collection of Stylelint configs and rules that promote Polaris Design System adoption and coverage

<<<<<<< HEAD
[Stylelint Polaris documentation](https://polaris.shopify.com/tools/stylelint-polaris)
=======
```
stylelint-polaris/
├─ plugins/
│  ├─ custom-properties-allowed-list.js
|  | # (Optional) Public facing plugins for advanced configurations
|  | # (See advanced config example below)
|  ├─ index.js
|  |
├─ configs/
|  | # Common rules for `polaris-react` and Polaris consumers
|  ├─ shared.js
|  |
|  | # Applied in `polaris-react` containing:
|  | # - shared.js
|  | # - specific `custom-properties-allowed-list` rules
│  ├─ internal.js
|
| # Public facing config containing:
| # - shared.js
| # - specific `custom-properties-allowed-list` rules for Polaris consumers
├─ index.js
```

### Polaris react usage

```json5
// polaris-react/package.json
{
  "stylelint": {
    "extends": [
      "@shopify/stylelint-polaris/configs/internal"
    ]
  },
};
```

### Consumer usage

#### Basic

```json5
// consumer/package.json
{
  "stylelint": {
    "extends": [
      "@shopify/stylelint-polaris"
    ]
  },
};
```

#### Advanced

```js
// consumer/stylelintrc.js
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
pnpm install
```

2. Run `stylelint` on `polaris-react`

```sh
pnpm lint:stylelint
```
>>>>>>> origin/5679-use-pnpm
