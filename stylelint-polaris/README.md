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

## Development

### Add new rules

### Build custom rules

### Test custom rules

### Add custom messages

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
