---
title: Polaris CLI
navTitle: CLI
description: Commands for building Shopify Apps with Polaris.
icon: CodeMajor
order: 2
keywords:
  - cli
  - shopify cli
  - polaris cli
---

[<img src="https://img.shields.io/npm/v/@shopify/polaris-cli.svg?labelColor=f9f9f9&color=dcf5f0" alt="npm version" style="width: 95px" />](https://www.npmjs.com/package/@shopify/polaris-cli)

## Installation

You can install the Polaris plugin for the Shopify CLI by running the following command:

```sh
shopify plugins install @shopify/polaris-cli
```

See the [Shopify CLI command syntax](https://shopify.dev/apps/tools/cli/commands#command-syntax) section for how to execute commands using other package managers (ex: npm, Yarn, or pnpm).

## Commands

### migrate

Executes the [Polaris Migrator](/tools/polaris-migrator). This makes version upgrades faster and safer by performing codemod transformations to your codebase. You can apply any of the [available Polaris migrations](/tools/polaris-migrator#migrations) using the [Shopify CLI](https://shopify.dev/apps/tools/cli/commands) `migrate` command.

```
shopify polaris migrate <migration> <path>
```

- `migration` - name of migration
- `path` - files or directory to perform migration

The following is a complete CLI command example using `npm`:

```
npm run shopify polaris migrate v10-react-replace-text-components 'src/components/**/*.tsx'
```

See the [Shopify CLI command syntax](https://shopify.dev/apps/tools/cli/commands#command-syntax) section for how to execute commands using other package managers.

#### Flags

| Flag      | Description                                          |
| --------- | ---------------------------------------------------- |
| `--dry`   | Do a dry-run, no code will be edited                 |
| `--print` | Prints the changed output for comparison             |
| `--force` | Bypass Git safety checks and forcibly run migrations |
