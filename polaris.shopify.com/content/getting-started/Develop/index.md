---
title: Develop
navTitle: Develop
keywords:
  - development resources
order: 3
---

If you’re starting out developing for the Shopify admin, here are a few things you need to learn and download to get going.

## Web

The web version of the Shopify admin is available for desktop and mobile web. Polaris web components and relevant packages are built with responsiveness in mind and can be used at any screen size.

## Native

The Shopify admin is also available as iOS and Android apps. Polaris components are available as native user interface (UI) elements built with React Native. The Polaris React Native components are currently only available to Shopify employees building the admin iOS and Android apps.

Because the iOS and Android apps also make use of embedded web views for parts of the admin, Polaris web components are used in these cases.

## Shopify apps

The Shopify admin includes installable apps built by Shopify employees and third-party developers. Third-party developers can use App Bridge and Polaris to build their Shopify admin apps. Shopify admin apps are web-based and are embedded into the admin web, iOS, and Android platforms. To learn more about building Shopify apps check out [shopify.dev](https://shopify.dev).

## Resources

A little about the Polaris components, tokens, and icons that we refer to in these resources:

- Components are elements and styles, packaged through code, for building admin interfaces
- Design tokens are Coded names that represent design decisions for color, spacing, typography, and more
- The Polaris icon library has over 400 carefully designed icons focused on commerce and entrepreneurship

See the [shared resources](/getting-started/shared-resources).
  <br>

| Repos| Libraries | Tooling |  
| ---- | ------- | --------- |
| </li><ul><li>[Component GitHub package repo](https://github.com/Shopify/polaris/tree/main/polaris-react)</li><ul><li>[Token GitHub package repo](https://github.com/Shopify/polaris/tree/main/polaris-tokens)| </li><ul><li>[Components](https://polaris.shopify.com/components)</li><ul><li>[Tokens](https://polaris.shopify.com/tokens/colors)</li><ul><li>[Icons](https://polaris.shopify.com/icons)|</li><ul><li>[Polaris for VSCode extension](https://marketplace.visualstudio.com/items?itemName=Shopify.polaris-for-vscode)

### Performing a release

Polaris uses [Changsets](https://github.com/changesets/changesets) to handle releasing the npm packages in repository. Our [GitHub action](https://github.com/changesets/action) creates a `version` PR called ”Version Packages”, then keeps it up to date, recreating it when merged. This PR always has an up-to-date run of `changeset version` and performs a releases when changes are merged to the `main` branch.

- [Perform a release](https://github.com/Shopify/polaris/blob/main/documentation/Releasing.md)