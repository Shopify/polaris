---
title: About Polaris
description: Learn what the Polaris design system is and how it’s used by designers and developers to build world-class Shopify admin experiences.
keywords:
  - about
  - polaris
  - design system
  - system
  - getting started
---

Polaris is the design system for the Shopify admin. It’s used both internally at Shopify and externally by third-party developers and designers. From accessibility to performance to design expertise, Polaris gives you the tools to build a world-class admin experience.

## Shopify admin

Merchants set up their store, configure settings, and manage their business using the Shopify admin. It includes core aspects of the merchant’s Shopify business, including orders, products, and customers.

The Shopify admin is available across web and native platforms. The Polaris design system is available on every platform the Shopify admin is built for.

### Web

The web version of the Shopify admin is available for desktop and mobile web. Polaris web components and relevant packages are built with responsiveness in mind and can be used at any screen size.

### Native

The Shopify admin is also available as iOS and Android apps. Polaris components are available as native user interface (UI) elements built with React Native. The Polaris React Native components are currently only available to Shopify employees building the admin iOS and Android apps.

Because the iOS and Android apps also make use of embedded web views for parts of the admin, Polaris web components are used in these cases.

### Shopify apps

The Shopify admin includes installable apps built by Shopify employees and third-party developers. Third-party developers can use App Bridge and Polaris to build their Shopify admin apps. Shopify admin apps are web-based and are embedded into the admin web, iOS, and Android platforms. To learn more about building Shopify apps check out [shopify.dev](https://shopify.dev/apps/getting-started).

## Polaris elements

The design system is made up of design guidance, code libraries, development opinions, and API documentation on how to build merchant experiences for the Shopify admin. Read on to learn more about the foundational pieces that make up the Polaris design system.

### Primitives

Primitives are the building blocks of the Polaris design system. They’re the smallest units of the system that represent codified design decisions and reusable visual elements. The Polaris design system contains primitive tokens and primitive components that can be combined together to create admin UIs.

### Tokens

Design tokens represent reusable design decisions such as color, spacing, and typography. These tokens are used throughout the Polaris design system and Shopify admin to unify the merchant experience across the entire platform.

Polaris design tokens are packaged up as the open source [@Shopify/polaris-tokens](https://github.com/Shopify/polaris/tree/main/polaris-tokens) library

### Components

Polaris components are the smallest reusable UI elements for supporting a variety of admin merchant experiences. Polaris components are one of our design system primitives, and are often referred to as primitive components.

These primitive components are highly composable and can be assembled together to create a variety of patterns and user experiences within the admin.

Polaris web components are packaged as the open source [@Shopify/polaris](https://github.com/Shopify/polaris/tree/main/polaris-react) React UI library. The Polaris React library is used in the Shopify admin web app as well as within embedded web views in the Shopify admin iOS and Android apps.

Polaris React Native components are also used in the Shopify admin iOS and Android apps. The Polaris React Native library is only available to Shopify employees building with React Native.

### Compositions

Polaris tokens and components can be assembled together to solve any number of merchant needs in the admin. Compositions are the result of design tokens and/or primitives being put together to create a specific user experience. 

Many of our primitive components are built with Polaris design tokens, and many of our design patterns can be composed using primitive components. 

Some compositions can be packaged and distributed via component libraries. 

### Design patterns

Design patterns are best practice design guidance. They address situations that merchants commonly face, including:

* Tasks, like searching and filtering
* Situations, like errors and loading
* UI characteristics, like feedback
* Architecture, like navigation and page layout

These patterns center on the merchant and how we build experiences to meet their needs.

Design patterns often use one or more primitive components and adapt them to the context. Some patterns can link to compositions and will contain code examples where possible.

For a deeper understanding of design patterns, read our guide to [admin design patterns](/foundations/patterns/design-patterns).
