---
title: Patterns, components, and tokens
keywords:
  - patterns
  - primitives
  - components
  - tokens
order: 1
---

Polaris is made up of design guidance, code libraries, development opinions, and API documentation on how to build merchant experiences for the Shopify admin. Here are the foundational building blocks that are part of the system.

![Different colored building blocks pieced together with labels for primitives, tokens, components, and patterns pointing to different pieces](/images/getting-started/patterns-components-tokens/combined@2x.png)

## Patterns

Design patterns are best practice design guidance. They address situations that merchants commonly face, including:

- Tasks, like searching and filtering
- Situations, like errors and loading
- UI characteristics, like feedback
- Architecture, like navigation and page layout

These patterns center on the merchant and how we build experiences to meet their needs.

Design patterns often use one or more primitive components and adapt them to the context. Some patterns can link to compositions and will contain code examples where possible.

For a deeper understanding of design patterns, read our guide to [admin design patterns](/patterns/design-patterns).

![Different colored building blocks with one piece labeled as patterns](/images/getting-started/patterns-components-tokens/patterns@2x.png)

## Primitives

Primitives are the building blocks of the Polaris design system. They’re the smallest units of the system that represent codified design decisions and reusable visual elements. The Polaris design system contains primitive tokens and primitive components that can be combined together to create admin UIs.

![Different colored building blocks with one piece labeled as primitives](/images/getting-started/patterns-components-tokens/primitives@2x.png)

## Components

Polaris components are the smallest reusable UI elements for supporting a variety of admin merchant experiences. Polaris components are one of our design system primitives, and are often referred to as primitive components.

These primitive components are highly composable and can be assembled together to create a variety of patterns and user experiences within the admin.

Polaris web components are packaged as the open source [@Shopify/polaris](https://github.com/Shopify/polaris/tree/main/polaris-react) React UI library. The Polaris React library is used in the Shopify admin web app as well as within embedded web views in the Shopify admin iOS and Android apps.

Polaris React Native components are also used in the Shopify admin iOS and Android apps. The Polaris React Native library is only available to Shopify employees building with React Native.

![Different colored building blocks with one piece labeled as components](/images/getting-started/patterns-components-tokens/components@2x.png)

## Tokens

Design tokens represent reusable design decisions such as color, spacing, and typography. These tokens are used throughout the Polaris design system and Shopify admin to unify the merchant experience across the entire platform.

Polaris design tokens are packaged up as the open source [@Shopify/polaris-tokens](https://github.com/Shopify/polaris/tree/main/polaris-tokens) library.

![Different colored building blocks with one piece labeled as tokens](/images/getting-started/patterns-components-tokens/tokens@2x.png)
