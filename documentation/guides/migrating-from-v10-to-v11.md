# Migrating from v10 to v11

Polaris v11.0.0 ([full release notes](https://github.com/Shopify/polaris/releases/tag/v11.0.0)) features...

## Table of Contents

- [Components](#components)
  - [Removed deprecated Collapsible argument](#removed-deprecated-collapsible-argument)
  - [Removed KonamiCode component](#removed-konamicode-component)
- [Tokens](#tokens)
  - [Removed zero tokens](#removed-zero-tokens)

## Components

### Removed deprecated Collapsible argument

We've removed the following deprecated prop from the Collapsible component:

`- preventMeasuringOnChildrenUpdate?: boolean;`

### Removed KonamiCode component

??

## Tokens

### Removed zero tokens

We've removed zero values from our token scales to provide the better experience for our developers.

| Deprecated Token | Replacement Value |
| ---------------- | ----------------- |
| `--p-space-0`    | `0`               |
