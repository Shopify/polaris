---
title: Getting started
navTitle: Getting started
description: Learn what the Polaris design system is and how it’s used by UXers and developers to build world-class Shopify admin experiences.
keywords:
  - about
  - polaris
  - design system
  - system
  - getting started
  - get started
  - downloads
  - begin
  - figma
  - ui kits
  - plugins
order: 1
hideChildren: true
icon:  HintMajor
---

## Quick start

Polaris is the design system for the Shopify admin. There are many layers to being successful with Polaris but if you want to dive in, the first step you might want to do is download the resources.

### Downloads and links

For full descriptions of our resources, see the [develop](/getting-started/##develop) and [design](/getting-started/##design) resources sections.

| Develop                                                               | Design                                                                       | Start exploring                                                                         |     |     |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | --- | --- |
| <ul><li>[Polaris repo and commands](https://github.com/Shopify/polaris/tree/main/polaris-react)</li><ul><li>[Polaris for VS Code extension](https://marketplace.visualstudio.com/items?itemName=Shopify.polaris-for-vscode)</li><ul><li>[Component GitHub package repo](https://github.com/Shopify/polaris/tree/main/polaris-react)</li><ul><li>[Token GitHub Package Repo](https://github.com/Shopify/polaris/tree/main/polaris-tokens)</li><ul><li>[Performing a release](https://github.com/Shopify/polaris/blob/main/documentation/Releasing.md) | <ul><li>[ Design ](polaris.shopify.com/design)</li><ul><li>[Component Figma library](https://www.figma.com/community/file/1111360433678236702)</li><ul><li>[Token Figma library](https://www.figma.com/community/file/1111359207966840858)</li><ul><li>[Icon Figma library](https://www.figma.com/file/mMHFt3kEDNjLMZWowi6gnt/Polaris-Icons?node-id=753%3A2)</li><ul><li>[Product content](https://polaris.shopify.com/foundations/content/product-content)| <ul><li>[Experience values](https://polaris.shopify.com/foundations/foundations/experience-values)</li><ul><li>[Accessibility](https://polaris.shopify.com/foundations/foundations/accessibility)</li><ul><li>[React component library](https://polaris.shopify.com/components)</li><ul><li>[Token library](https://polaris.shopify.com/tokens/colors)</li><ul><li>[Icon library](https://polaris.shopify.com/icons)</li><ul><li>[Actionable language](https://polaris.shopify.com/foundations/content/actionable-language)</li><ul><li>[Error messages](https://polaris.shopify.com/foundations/patterns/error-messages)


## Polaris 101 

### What is Polaris?

Polaris is the design system for the Shopify admin. It’s the shared language that guides how we build high-quality merchant experiences, and is grounded in deep merchant understanding. The Polaris components are available for web, iOS, and Android. The design system is made up of design guidance, code libraries, development opinions, and API documentation on how to build merchant experiences for the Shopify admin. Learn more about the [foundational pieces](/what-are-patterns-components-tokens) that make up the Polaris design system.

#### Who is Polaris for? 

Polaris is used both internally at Shopify and externally by third-party developers and designers. The Shopify admin includes installable apps built by Shopify employees and third-party developers. Third-party developers can use App Bridge and Polaris to build their Shopify admin apps. Shopify admin apps are web-based and are embedded into the admin web, iOS, and Android platforms. To learn more about building Shopify apps check out [shopify.dev](https://shopify.dev/).


#### What’s the Shopify admin?

Merchants set up their store, configure settings, and manage their business using the Shopify admin. It includes core aspects of the merchant’s business, including orders, products, and customers.

The Shopify admin is available across web and native platforms. The Polaris design system is available on every platform the Shopify admin is built for.

### Patterns, components, and tokens

#### Patterns

Design patterns are best practice design guidance. They address situations that merchants commonly face, including:

- Tasks, like searching and filtering
- Situations, like errors and loading
- UI characteristics, like feedback
- Architecture, like navigation and page layout

These patterns center on the merchant and how we build experiences to meet their needs.

Design patterns often use one or more primitive components and adapt them to the context. Some patterns can link to compositions and will contain code examples where possible.

For a deeper understanding of design patterns, read our guide to [admin design patterns](/foundations/patterns/design-patterns).

#### Primitives

Primitives are the building blocks of the Polaris design system. They’re the smallest units of the system that represent codified design decisions and reusable visual elements. The Polaris design system contains primitive tokens and primitive components that can be combined together to create admin UIs.

#### Components

Polaris components are the smallest reusable UI elements for supporting a variety of admin merchant experiences. Polaris components are one of our design system primitives, and are often referred to as primitive components.

These primitive components are highly composable and can be assembled together to create a variety of patterns and user experiences within the admin.

Polaris web components are packaged as the open source [@Shopify/polaris](https://github.com/Shopify/polaris/tree/main/polaris-react) React UI library. The Polaris React library is used in the Shopify admin web app as well as within embedded web views in the Shopify admin iOS and Android apps.

Polaris React Native components are also used in the Shopify admin iOS and Android apps. The Polaris React Native library is only available to Shopify employees building with React Native.

#### Tokens

Design tokens represent reusable design decisions such as color, spacing, and typography. These tokens are used throughout the Polaris design system and Shopify admin to unify the merchant experience across the entire platform.

Polaris design tokens are packaged up as the open source [@Shopify/polaris-tokens](https://github.com/Shopify/polaris/tree/main/polaris-tokens) library

### Shared resources

There are pieces of foundational knowledge that are useful for all disciplines to know. 

#### Foundations
Our design foundations offer fundamental design elements and guidance for creating good merchant experiences. Here are some highlights to get started:
- [Experience values](https://polaris.shopify.com/foundations/foundations/experience-values)
- [Accessibility](https://polaris.shopify.com/foundations/foundations/accessibility)


#### Content guidelines
Content guidelines are weaved into most of our component pages, but there are also product content and patterns guidelines that help us speak to merchants in a consistent way. Here are some key guidelines to check out first:
- [Error messages](https://polaris.shopify.com/foundations/patterns/error-messages)
- [Product content](https://polaris.shopify.com/foundations/content/product-content)
- [Actionable language](https://polaris.shopify.com/foundations/content/actionable-language)

## Design

### Resources

#### Components
Components are reusable building blocks made of interface elements and styles, packaged through code. Piece them together, improve them, and create new ones to solve merchant problems.
- [Browse components](https://polaris.shopify.com/components)
- [Component Figma library](https://www.figma.com/community/file/1111360433678236702)

#### Tokens
Design tokens are coded names that represent design decisions for elements like color, spacing, and typography. Applying them to our designs unifies merchant experiences.
- [Browse tokens](https://polaris.shopify.com/tokens/colors)
- [Token Figma library](https://www.figma.com/community/file/1111359207966840858)


## Develop

### Resources

#### Polaris for VSCode
Automatic autocompletion for Polaris tokens, right inside your favorite code editor.
- [Download extension](https://marketplace.visualstudio.com/items?itemName=Shopify.polaris-for-vscode)

#### Components
Components are reusable building blocks made of interface elements and styles, packaged through code. Piece them together, improve them, and create new ones to solve merchant problems.
- [Browse components](https://polaris.shopify.com/components)
- [Component GitHub Package Repo](https://github.com/Shopify/polaris/tree/main/polaris-react)

#### Tokens
Design tokens are coded names that represent design decisions for elements like color, spacing, and typography. Applying them to our designs unifies merchant experiences.
- [Browse tokens](https://polaris.shopify.com/tokens/colors)
- [Token GitHub Package Repo](https://github.com/Shopify/polaris/tree/main/polaris-tokens)

#### Icons
The Polaris icon library has 400+ carefully designed icons focused on commerce and entrepreneurship. Use them as visual aids to help merchants complete tasks.
 - [Browse icons](https://polaris.shopify.com/icons)

#### Releases

Polaris uses [Changsets](https://github.com/changesets/changesets) to handle releasing the npm packages in repository. Our [GitHub action](https://github.com/changesets/action) creates a `version` PR called **"Version Packages"**, then keeps it up to date, recreating it when merged. This PR always has an up-to-date run of `changeset version` and performs a releases when changes are merged to the `main` branch.

- [Perform a release](https://github.com/Shopify/polaris/blob/main/documentation/Releasing.md)