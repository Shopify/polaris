---
title: Develop
keywords:
  - development resources
order: 3
---

## Web
The web version of the Shopify admin is available for desktop and mobile web. Polaris web components and relevant packages are built with responsiveness in mind and can be used at any screen size.

## Native
The Shopify admin is also available as iOS and Android apps. Polaris components are available as native user interface (UI) elements built with React Native. The Polaris React Native components are currently only available to Shopify employees building the admin iOS and Android apps.

Because the iOS and Android apps also make use of embedded web views for parts of the admin, Polaris web components are used in these cases.

## Shopify apps
The Shopify admin includes installable apps built by Shopify employees and third-party developers. Third-party developers can use App Bridge and Polaris to build their Shopify admin apps. Shopify admin apps are web-based and are embedded into the admin web, iOS, and Android platforms. To learn more about building Shopify apps check out shopify.dev.


## Resources

| Repos| Libraries | Tooling | Releases | 
| ---- | ------- | -------- | --------- |
| </li><ul><li>[Component GitHub Package Repo](https://github.com/Shopify/polaris/tree/main/polaris-react)</li><ul><li>[Token GitHub Package Repo](https://github.com/Shopify/polaris/tree/main/polaris-tokens)| </li><ul><li>[Components](https://polaris.shopify.com/components)</li><ul><li>[Tokens](https://polaris.shopify.com/tokens/colors)</li><ul><li>[Icons](https://polaris.shopify.com/icons)| Polaris for VSCode offers automatic autocompletion for Polaris tokens, right inside your favorite code editor.</li><ul><li>[Download the VSCode extension](https://marketplace.visualstudio.com/items?itemName=Shopify.polaris-for-vscode) | Polaris uses [Changsets](https://github.com/changesets/changesets) to handle releasing the npm packages in repository. Our [GitHub action](https://github.com/changesets/action) creates a `version` PR called **"Version Packages"**, then keeps it up to date, recreating it when merged. This PR always has an up-to-date run of `changeset version` and performs a releases when changes are merged to the `main` branch.</li><ul><li>[Perform a release](https://github.com/Shopify/polaris/blob/main/documentation/Releasing.md)

Learn more about Polaris [components and tokens](https://polaris.shopify.com/getting-started/patterns-components-and-tokens) and browse the [shared resouces](https://polaris.shopify.com/getting-started/shared-resources).