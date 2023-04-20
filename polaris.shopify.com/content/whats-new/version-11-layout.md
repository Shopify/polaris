---
title: Version 11 Layout
description: Start using the new Polaris layout components.
imageUrl: /images/design/layout/layout-banner.png
keywords:
  - layout
  - bleed
  - box
  - card
  - divider
  - grid
  - horizontal grid
  - horizontal stack
  - vertical stack
---

![Layout banner](/images/design/layout/layout-banner.png)

---

This is an alpha release of the new layout components, with some components in beta. That means we’re making the new layout components and Figma components available, but there could still be significant developments. Our goal is to share the work so that you can **understand what’s changing**, **start using the layout updates**, and **provide feedback to help us improve.**

**_🚧 Please note: Since significant changes could still be made, please work with your team and the Polaris team to determine what's best for your situation. Feel free to create an [issue](https://github.com/Shopify/polaris/issues/new?assignees=&labels=%F0%9F%90%9BBug%2C+untriaged&template=ISSUE.md) for any feedback related to the layout components._**

Let’s dive in!

## Why are we making changes?

Users building new layouts are restricted by Polaris and often create custom solutions. Polaris currently only provides two layout components which aren’t always the best solution for a specific problem. Even inside the Polaris components, our own layout components are only used 20% of the time.

Creating new layout components and applying them to the existing Polaris components will allow us to create a flexible system. These layout components will enable users to create more intentional layouts with minimal tweaks and more flexibility.

## What's changing

With this major release, some components are stable and ready for wider or full adoption. Learn more about our [component lifecycles](https://polaris.shopify.com/getting-started/components-lifecycle).

### Removed components

The original Stack and Card components have been removed and replaced with [LegacyStack](https://polaris.shopify.com/components/layout-and-structure/legacy-stack) and [LegacyCard](https://polaris.shopify.com/components/layout-and-structure/legacy-card). We plan to replace LegacyStack and LegacyCard with the new [Card](https://polaris.shopify.com/components/layout-and-structure/card) and [VerticalStack](https://polaris.shopify.com/components/layout-and-structure/vertical-stack) components in the next major release.

### Renamed components

AlphaCard has been renamed to [Card](https://polaris.shopify.com/components/layout-and-structure/card) to mitigate confusion with component names being tied to component lifecycle stages.

### Beta components

The [Bleed](https://polaris.shopify.com/components/layout-and-structure/bleed) and [Divider](https://polaris.shopify.com/components/layout-and-structure/divider) components are ready for wider adoption and have been moved to the beta phase.

### Stable components

The [Text](https://polaris.shopify.com/components/typography/text) component has been moved from beta to stable phase. Its API is stable and ready for full adoption. Text can support most, if not all, environments.

## What’s next?

We are working on aligning layout component APIs across the platform for consistency. Once those are finalized and implemented, we will mark the remaining layout components as beta. Additionally, we will be creating codemod transformations for users to migrate from LegacyCard to Card, LegacyStack to VerticalStack, and TextContainer to VerticalStack.

## Resources

- [Layout design](https://polaris.shopify.com/design/layout)
- [Layout components](https://polaris.shopify.com/components/layout-and-structure)
