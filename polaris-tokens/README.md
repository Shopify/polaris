# [Polaris Tokens](https://polaris.shopify.com/tokens/getting-started-with-tokens)

[![npm version](https://img.shields.io/npm/v/@shopify/polaris-tokens.svg?style=flat)](https://www.npmjs.com/package/@shopify/polaris-tokens)

[Design tokens](https://medium.com/eightshapes-llc/tokens-in-design-systems-25dd82d58421) for [Polaris](https://polaris.shopify.com), Shopify’s design system.

Design tokens originated at Salesforce, and the best way to describe them is to simply quote their documentation:

> Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes. We use them in place of hard-coded values (such as hex values for color or pixel values for spacing) in order to maintain a scalable and consistent visual system for UI development – [Salesforce UX](https://www.lightningdesignsystem.com/design-tokens/)

## Installation

Run the following command using [npm](https://www.npmjs.com/):

```bash
npm install @shopify/polaris-tokens
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command instead:

```bash
yarn add @shopify/polaris-tokens
```

## Usage

```js
import {tokens} from '@shopify/polaris-tokens';

// Access all of the available token groups
console.log(tokens);
```

## Migrating from v4 to v5

Polaris Tokens v5.0.0 ([full release notes](https://github.com/Shopify/polaris-react/releases/tag/tokens-v5.0.0)) features an overhaul of the package. The Sass variables, CSS Filters, and Rails have all been removed. The new version is based on json files and utility javascript functions. In order to find your replacements please navigate to [polaris.shopify.com/tokens/getting-started-with-tokens](https://polaris.shopify.com/tokens/getting-started-with-tokens).

## Contributing

Pull requests are welcome. See the [contribution guidelines](https://github.com/Shopify/polaris/blob/main/.github/CONTRIBUTING.md) for more information.

## Licenses

- Source code is under a [custom license](https://github.com/Shopify/polaris/blob/main/LICENSE.md) based on MIT. The license restricts Polaris usage to applications that integrate or interoperate with Shopify software or services, with additional restrictions for external, stand-alone applications.
