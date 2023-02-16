# Migrating from v10 to v11

Polaris v11.0.0 ([full release notes](https://github.com/Shopify/polaris/releases/tag/v11.0.0)) features...

## Table of Contents

- [Node support](#node-support)
- [Components](#components)
  - [Removed deprecated Collapsible argument](#removed-deprecated-collapsible-argument)
  - [Removed KonamiCode component](#removed-konamicode-component)
- [Tokens](#tokens)

## Node support

NodeJS version 14 is no longer supported. NodeJS 18 is recommended and 16 is the minimum supported version.

## TypeScript

Built types in `@shopify/polaris` have moved from `build/ts/latest` to `build/ts`.

**Legacy TypeScript Support**

Polaris no longer supports multiple versions of TypeScript with downlevel-dts. Polaris only builds one set of types based on the current version of TypeScript in the project.

## Components

### Removed deprecated Collapsible argument

We've removed the following deprecated prop from the Collapsible component:

`- preventMeasuringOnChildrenUpdate?: boolean;`

### Removed KonamiCode component

We are removing low usage components from Polaris. We love fun but we also want to ensure we are shipping exactly what our users need. If you want to use this in your project feel free to copy the [component sourcecode](https://github.com/Shopify/polaris/blob/%40shopify/polaris%4010.24.0/polaris-react/src/components/KonamiCode/KonamiCode.tsx).

## Tokens

The following tokens have either been renamed or removed. You will need to replace any instances of them with their new name or value equivalents.

| Deprecated Token          | Replacement Value        |
| ------------------------- | ------------------------ |
| `--p-border-radius-base`  | `--p-border-radius-1`    |
| `--p-border-radius-large` | `--p-border-radius-2`    |
| `--p-border-radius-half`  | `--p-border-radius-full` |
| `--p-shadow-transparent`  | `0 0 0 0 transparent`    |
| `--p-duration-0`          | `0ms`                    |
| `--p-space-0`             | `0`                      |
| `--p-z-1`                 | `--p-z-index-1`          |
| `--p-z-2`                 | `--p-z-index-2`          |
| `--p-z-3`                 | `--p-z-index-3`          |
| `--p-z-4`                 | `--p-z-index-4`          |
| `--p-z-5`                 | `--p-z-index-5`          |
| `--p-z-6`                 | `--p-z-index-6`          |
| `--p-z-7`                 | `--p-z-index-7`          |
| `--p-z-8`                 | `--p-z-index-8`          |
| `--p-z-9`                 | `--p-z-index-9`          |
| `--p-z-10`                | `--p-z-index-10`         |
| `--p-z-11`                | `--p-z-index-11`         |
| `--p-z-12`                | `--p-z-index-12`         |
