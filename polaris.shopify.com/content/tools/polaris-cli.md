---
title: Polaris CLI
description: Commands for building Shopify Apps with Polaris.
icon: CodeMajor
order: 5
---

[<img src="https://img.shields.io/npm/v/@shopify/polaris-cli.svg?labelColor=f9f9f9&color=dcf5f0" alt="npm version" style="width: 95px" />](https://www.npmjs.com/package/@shopify/polaris-cli)

## Commands

This reference lists the [Shopify CLI][] commands for Polaris.

### migrate

Codemod transformations to help upgrade your Polaris codebase.

```
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

[shopify cli]: https://shopify.dev/apps/tools/cli/commands
[polaris]: https://polaris.shopify.com
