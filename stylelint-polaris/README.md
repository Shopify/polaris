# @shopify/stylelint-polaris

Disallow CSS declarations that break conventions or lower Polaris coverage of colors, font, shape, spacing, depth, motion, z-index, breakpoints, and layout in your project.

> Code is considered "covered" when it is using Polaris tokens and/or components without overriding or providing custom styles

## Package structure

```
stylelint-polaris/
|-- plugins/
|  |   # Plugin for categorizing and reporting built-in and custom rules
|  |-- coverage/
|  |   # Custom rules
|  |-- at-rule-disallowed-list/
|  |-- custom-properties-allowed-list/
|  |-- global-disallowed-list/
|  |-- media-queries-allowed-list/
|-- utils/
|   # Config
|__ index.js
```

## Usage

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

3. Run `stylelint` in `polaris-react`

All files

```sh
yarn turbo run lint:styles --filter=@shopify/polaris
```

Specific file

```sh
yarn run stylelint path/to/component.scss

// yarn run stylelint polaris-react/src/components/TopBar/TopBar.scss
```

## Rules

### Conventions

#### unit-disallowed-list

```diff
- font-size: 12px;
- line-height: 1.5rem
- transition-duration: 200ms;
```

```diff
+ font-size: var(--p-font-size-75);
+ line-height: var(--p-font-line-height-3);
+ transition-duration: var(--p-duration-200);
```

### Colors

#### color-named

```diff
- color: black;
- fill: dimgray;
```

```diff
+ color: var(--p-text);
+ fill: var(--p-icon)
```

#### color-no-hex

```diff
- color: #202223;
- fill: #5c5f62;
```

```diff
+ color: var(--p-text);
+ fill: var(--p-icon)
```

#### declaration-property-value-disallowed-list

```diff

```

#### declaration-property-unit-disallowed-list

```diff

```

#### function-disallowed-list

```diff

```

#### at-rule-disallowed-list

```diff

```

#### property-disallowed-list

```diff

```

### Font

#### declaration-property-value-disallowed-list

```diff

```

#### declaration-property-unit-disallowed-list

```diff

```

#### function-disallowed-list

```diff

```

#### at-rule-disallowed-list

```diff

```

#### property-disallowed-list

```diff

```

### Shape

#### declaration-property-value-disallowed-list

```diff

```

#### declaration-property-unit-disallowed-list

```diff

```

#### function-disallowed-list

```diff

```

#### at-rule-disallowed-list

```diff

```

#### property-disallowed-list

```diff

```

### Spacing

#### declaration-property-value-disallowed-list

```diff

```

#### declaration-property-unit-disallowed-list

```diff

```

#### function-disallowed-list

```diff

```

#### at-rule-disallowed-list

```diff

```

#### property-disallowed-list

```diff

```

### Depth

#### declaration-property-value-disallowed-list

```diff

```

#### declaration-property-unit-disallowed-list

```diff

```

#### function-disallowed-list

```diff

```

#### at-rule-disallowed-list

```diff

```

#### property-disallowed-list

```diff

```

### Motion

#### declaration-property-value-disallowed-list

```diff

```

#### declaration-property-unit-disallowed-list

```diff

```

#### function-disallowed-list

```diff

```

#### at-rule-disallowed-list

```diff

```

#### property-disallowed-list

```diff

```

### Breakpoints

#### function-disallowed-list

```diff

```

#### stylelint-polaris/media-queries-allowed-list

```diff

```

#### stylelint-polaris/at-rule-disallowed-list

```diff

```

### Z-Index

#### declaration-property-value-allowed-list

```diff

```

#### function-disallowed-list

```diff

```

#### stylelint-polaris/global-disallowed-list

```diff

```

### Layout

#### declaration-property-value-disallowed-list

```diff

```

#### declaration-property-unit-disallowed-list

```diff

```

#### function-disallowed-list

```diff

```

#### at-rule-disallowed-list

```diff

```

#### property-disallowed-list

```diff

```

### Legacy

#### stylelint-polaris/at-rule-disallowed-list

```diff

```

#### function-disallowed-list

```diff

```

#### stylelint-polaris/global-disallowed-list

```diff

```
