# Polaris for Stylelint (WIP)

## Experimental package structure

```
stylelint-polaris/
  plugins/
    custom-properties-allowed-list.js
    color-no-rgba.js
    index.js /* Public facing plugin (optional/included in root index.js by default) - consumes custom-properties-allowed-list.js */
  configs/
    coverage.js   /* consumes color-no-rgba.js */
    shared.js     /* inherits coverage.js */
    internal.js   /* inherits shared.js / consumes custom-properties-allowed-list.js */

  // Public facing config:
  index.js        /* inherits configs/shared.js and plugins/recommended.js  */
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
    'stylelint-polaris': {
      // Basically extending `custom-properties-allowed-list` to allow consumers to add their own custom property naming conventions
      allowedCustomPropertyNames: [],
      allowedCustomPropertyValues: [],
      // etc.
    },
  },
};
```
