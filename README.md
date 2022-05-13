<div align="center">
<a href="https://polaris.shopify.com"><img width="705" src="https://github.com/Shopify/polaris/blob/b44d9f7075203748b7784bd61e88cba1e2d7acde/documentation/readme.jpg?raw=true" alt="Abstract illustration of a lady sitting with a hot drink in hand using a laptop" /></a>
</div>

# Polaris

> Shopify’s design system to help us work together to build a great experience for all of our merchants.

[![storybook](https://shields.io/badge/storybook-white?logo=storybook&style=flat)](https://storybook.polaris.shopify.com) [![npm version](https://img.shields.io/npm/v/@shopify/polaris.svg?label=@shopify/polaris)](https://www.npmjs.com/package/@shopify/polaris) [![CI](https://github.com/shopify/polaris/workflows/CI/badge.svg)](https://github.com/Shopify/polaris/actions?query=branch%3Amain) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Shopify/polaris/blob/main/.github/CONTRIBUTING.md#your-first-pull-request)

| Status | Owner            | Help                                                       |
| ------ | ---------------- | ---------------------------------------------------------- |
| Active | @shopify/polaris | [New issue](https://github.com/Shopify/polaris/issues/new) |

## About this repo

The shopify/polaris repository is an [intergalactic](https://www.youtube.com/watch?v=qORYO0atB6g) monorepo made up of NPM packages, VSCode extensions, Figma plugins and websites.

```sh
polaris/
├── documentation               # Documentation for working in the monorepo
├── polaris-for-figma           # Figma plugin for Polaris
├── polaris-for-vscode          # VS Code extension for Polaris
├── polaris-icons               # Icons for Polaris
├── polaris-react               # Components for @shopify/polaris package
├── polaris-tokens              # Design tokens for Polaris
├── polaris.shopify.com         # Documentation website
└── stylelint-polaris           # Rules for custom property usage and mainline coverage
```

## Commands

**1. Install dependencies**

```sh
yarn
```

**2. Build the packages**

```sh
yarn build
```

**3. Start a local development environment**

Start a **storybook** server for the polaris-react components

```sh
yarn turbo run dev --filter=@shopify/polaris...
```

Start a **Next.js** server for polaris.shopify.com

```sh
yarn turbo run dev --filter=polaris.shopify.com...
```

## Contribute to this repo

Pull requests are welcome. See the [contribution guidelines](https://github.com/Shopify/polaris/blob/main/.github/CONTRIBUTING.md) for more information.

## Licenses

Source code is under a [custom license](https://github.com/Shopify/polaris/blob/main/LICENSE.md) based on MIT. The license restricts Polaris usage to applications that integrate or interoperate with Shopify software or services, with additional restrictions for external, stand-alone applications.

All icons and images are licensed under the [Polaris Design Guidelines License Agreement](https://polaris.shopify.com/legal/license)
