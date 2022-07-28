<div align="center">
<a href="https://polaris.shopify.com"><img src="https://github.com/Shopify/polaris/blob/main/documentation/readme.png?raw=true" alt="Abstract illustration of a lady sitting with a hot drink in hand using a laptop" /></a>
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

### Install dependencies and build workspaces

```sh
yarn && yarn build
```

### Run a command

**One workspace**

Run commands from a selected workspace using [`turbo run <command> --filter=<workspace>...`](https://turborepo.org/docs/core-concepts/filtering) flag.

| Command                                           | Runs                                 |
| ------------------------------------------------- | ------------------------------------ |
| `yarn turbo run dev --filter=@shopify/polaris`    | Open the react component storybook   |
| `yarn turbo run dev --filter=polaris.shopify.com` | Open polaris.shopify.com NextJS site |

**All workspaces**

Run commands across all workspaces. This uses [`turbo run <command>`](https://turborepo.org/docs/reference/command-line-reference#turbo-run-task).

| Command           | Runs                                                                                                                  |
| ----------------- | --------------------------------------------------------------------------------------------------------------------- |
| `yarn changeset`  | Adds a new [changelog entry](https://github.com/Shopify/polaris/blob/main/.github/CONTRIBUTING.md#adding-a-changeset) |
| `yarn lint`       | Lints all workspaces                                                                                                  |
| `yarn test`       | Tests all workspaces                                                                                                  |
| `yarn type-check` | Build types and check for type errors                                                                                 |
| `yarn clean`      | Remove generated files                                                                                                |
| `yarn format`     | Format files with prettier                                                                                            |

## Contribute to this repo

Pull requests are welcome. See the [contribution guidelines](https://github.com/Shopify/polaris/blob/main/.github/CONTRIBUTING.md) for more information.

## Licenses

Source code is under a [custom license](https://github.com/Shopify/polaris/blob/main/LICENSE.md) based on MIT. The license restricts Polaris usage to applications that integrate or interoperate with Shopify software or services, with additional restrictions for external, stand-alone applications.

All icons and images are licensed under the [Polaris Design Guidelines License Agreement](https://polaris.shopify.com/legal/license)
