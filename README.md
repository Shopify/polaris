# Polaris

Polaris is our design system that helps us work together to build a great experience for all of Shopify’s merchants. Visit the [Polaris style guide](https://polaris.shopify.com) to learn more.

## Folder

```sh
polaris/
├── documentation               # Documentation for working in the monorepo
├── polaris-for-vscode          # VSCode plugin for Polaris
├── polaris-react               # Components for @shopify/polaris package
├── polaris-shopify-com         # Documentation website
├── polaris-tokens              # Design tokens for Polaris
└── stylelint-polaris           # Rules for custom property usage and mainline coverage
```

## Getting Started (One time)

1. Initialize the repository by installing external dependencies and symlinking internal packages.

```sh
yarn install
```

2. Build every package in the monorepo.

```sh
yarn build
```

## Local development

Develop `polaris.shopify.com` in watch mode:

```sh
yarn dev
```

Develop `polaris-react` in watch mode:

```sh
yarn dev:react
```

## Contributing

Pull requests are welcome. See the [contribution guidelines](https://github.com/Shopify/polaris-react/blob/main/.github/CONTRIBUTING.md) for more information.

## Licenses

- Source code is under a [custom license](https://github.com/Shopify/polaris-react/blob/main/LICENSE.md) based on MIT. The license restricts Polaris usage to applications that integrate or interoperate with Shopify software or services, with additional restrictions for external, stand-alone applications.
- All icons and images are licensed under the [Polaris Design Guidelines License Agreement](https://polaris.shopify.com/legal/license)
