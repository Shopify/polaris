# [Polaris Tokens](https://polaris.shopify.com/tokens/getting-started-with-tokens)

[![npm version](https://img.shields.io/npm/v/@shopify/polaris-tokens.svg?style=flat)](https://www.npmjs.com/package/@shopify/polaris-tokens)

[Design tokens](https://medium.com/eightshapes-llc/tokens-in-design-systems-25dd82d58421) for [Polaris](https://polaris.shopify.com), Shopify’s design system.

Design tokens originated at Salesforce, and the best way to describe them is to simply quote their documentation:

> Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes. We use them in place of hard-coded values (such as hex values for color or pixel values for spacing) in order to maintain a scalable and consistent visual system for UI development – [Salesforce UX](https://www.lightningdesignsystem.com/design-tokens/)

## Installation

```bash
npm install @shopify/polaris-tokens
```

## Usage

#### Javascript

Accessing all of the available token groups

```js
import {tokens} from '@shopify/polaris-tokens';

console.log(tokens.motion);
```

#### CSS

Importing all of the css variables. CSS variables are prefixed with `--p` to signal that these variables are Polaris variables.

```js
import '@shopify/polaris-tokens/css/styles.css';

div {
  background: var(--p-background);
}
```

#### JSON

Accessing a specific token group file via the dist folder

```js
import spacing from '@shopify/polaris-tokens/json/spacing.json';
```

## Contributing

Pull requests are welcome. See the [contribution guidelines](https://github.com/Shopify/polaris/blob/main/.github/CONTRIBUTING.md) for more information.

## Licenses

- Source code is under a [custom license](https://github.com/Shopify/polaris/blob/main/LICENSE.md) based on MIT. The license restricts Polaris usage to applications that integrate or interoperate with Shopify software or services, with additional restrictions for external, stand-alone applications.
