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

??

## Tokens
