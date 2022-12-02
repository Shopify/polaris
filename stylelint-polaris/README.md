# Stylelint Polaris

Collection of Stylelint configs and rules that promote Polaris Design System adoption and coverage.

## Installation

```sh
yarn -D @shopify/stylelint-polaris stylelint
```

> Note: `stylelint-polaris` requires a peer dependency of `stylelint@>=14.15.0`

## Usage

Extend `@shopify/stylelint-polaris` in your [Stylelint config](https://stylelint.io/user-guide/configure/). Example in `package.json`

```json
{
  "stylelint": {
    "extends": ["@shopify/stylelint-polaris"]
  }
}
```

> IMPORTANT: To ensure maximum compliance please add `@shopify/stylelint-polaris` to the end of the `extends` array

### Run the linter

```sh
npx stylelint '**/*.{css,scss}'
```

### Run the linter and autofix errors

```sh
npx stylelint --fix '**/*.{css,scss}'
```

## Development

### Add new rules

1. Navigate to the root [`stylelint-polaris` config](index.js)
1. Locate the `stylelint-polaris/coverage` options
1. Identify the appropriate category for the new rule
1. Insert the rule using standard Stylelint rule configurations

```js
module.exports = {
  rules: {
    'stylelint-polaris/coverage': {
      colors: {...}, // Standard Stylelint rules config
      layout: {...}, // Standard Stylelint rules config
      motion: {
        'new-rule': 'new-rule-options',
      },
    },
  },
};
```

### Build custom rules

1. Refer to the [Writing plugins](https://stylelint.io/developer-guide/plugins) guide of the Stylelint documentation
1. Create your rule in the [plugins](plugins) directory
1. Validate your plugin with tests
1. Refer to the [Add new rules](#add-new-rules) section to add your custom rule to the `stylelint-polaris` config

### Add custom messages

Custom messages are surfaced in the command line, CI, and in supported editors along side the default `stylelint` rule messages. They are added to the root level config and aim to provide more meaning insight on rule violations and how to resolve them.

In a majority of cases, the default rule messages are clear and concise. However, they don't always guide developers to a desired outcome. Thus, there are two mechanisms we suggest for improving and providing custom rule messages:

1. Add a generic `message` to the `stylelint-polaris/coverage` category config. This message is appended to the default rule message and we expect will cover most cases.
2. Add a custom `message` property in the [rule config's secondary options](https://stylelint.io/user-guide/configure/#message). This message is used in place of the default rule message.

### Tophat `stylelint-polaris` updates in `polaris-react`

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
