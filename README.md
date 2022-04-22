<img src="https://github.com/Shopify/polaris/blob/9659e7c89332c1d41f91d5bc1ff5c7d2c86e9b0e/documentation/readme.jpg?raw=true" alt="" align="center" />

[![storybook](https://shields.io/badge/storybook-white?logo=storybook&style=flat)](https://storybook.polaris.shopify.com) [![CI](https://github.com/shopify/polaris/workflows/CI/badge.svg)](https://github.com/Shopify/polaris/actions?query=branch%3Amain) [![npm version](https://img.shields.io/npm/v/@shopify/polaris.svg?label=@shopify/polaris)](https://www.npmjs.com/package/@shopify/polaris) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Shopify/polaris/blob/main/.github/CONTRIBUTING.md#your-first-pull-request)

# Polaris

> Polaris is our design system that helps us work together to build a great experience for all of Shopify’s merchants.

| Status | Owner            | Help                                                       |
| ------ | ---------------- | ---------------------------------------------------------- |
| Active | @shopify/polaris | [New issue](https://github.com/Shopify/polaris/issues/new) |

## About this repo

Polaris is an [intergalactic](https://www.youtube.com/watch?v=qORYO0atB6g) monorepo made up of NPM packages, VSCode extensions, Figma plugins and websites.

```sh
polaris/
├── documentation               # Documentation for working in the monorepo
├── polaris-for-vscode          # VS Code plugin for Polaris
├── polaris-react               # Components for @shopify/polaris package
├── polaris-shopify-com         # Documentation website
├── polaris-tokens              # Design tokens for Polaris
└── stylelint-polaris           # Rules for custom property usage and mainline coverage
```

## Commands

1. Initialize the monorepo by installing external dependencies and symlinking internal packages.

```sh
yarn
```

2. Build the packages for interconnected dependencies

```sh
yarn build
```

3. Start a local development environment

Start a **storybook** server for the polaris-react components

```sh
yarn workspace @shopify/polaris dev
```

Start a **NextJS** server for polaris.shopify.com

```sh
yarn workspace polaris-shopify-com dev
```

## Contribute to this repo

Pull requests are welcome. See the [contribution guidelines](https://github.com/Shopify/polaris/blob/main/.github/CONTRIBUTING.md) for more information.

## Licenses

- Source code is under a [custom license](https://github.com/Shopify/polaris/blob/main/LICENSE.md) based on MIT. The license restricts Polaris usage to applications that integrate or interoperate with Shopify software or services, with additional restrictions for external, stand-alone applications.
- All icons and images are licensed under the [Polaris Design Guidelines License Agreement](https://polaris.shopify.com/legal/license)
