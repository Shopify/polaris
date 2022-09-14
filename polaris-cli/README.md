# [Polaris CLI](https://polaris.shopify.com/polaris-cli)

[![npm version](https://img.shields.io/npm/v/@shopify/polaris-cli.svg?style=flat)](https://www.npmjs.com/package/@shopify/polaris-cli)

[Shopify CLI][] plugin for managing Shopify Apps using [Polaris][].

## Installation

You can install the Polaris plugin using the Shopify CLI by running the following command:

```sh
shopify plugins install polaris
```

> Note: run the `shopify` CLI using the [following syntax](https://shopify.dev/apps/tools/cli/commands#command-syntax) based on your package manager (ex: npm, Yarn, or pnpm).

## Commands

This reference lists the [Shopify CLI][] commands for Polaris.

### `migrate`

Codemod transformations to help upgrade your Polaris codebase.

```sh
shopify polaris migrate <migration> <path>
```

- `migration` - name of migration, see available migrations on the docs site below.
- `path` - files or directory to perform migration

#### Flags

| Flag      | Description                                          |
| --------- | ---------------------------------------------------- |
| `--dry`   | Do a dry-run, no code will be edited                 |
| `--print` | Prints the changed output for comparison             |
| `--force` | Bypass Git safety checks and forcibly run migrations |

[shopify cli]: https://shopify.dev/apps/tools/cli
[polaris]: https://polaris.shopify.com
