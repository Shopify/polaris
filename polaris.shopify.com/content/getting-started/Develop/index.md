---
title: Develop
keywords:
  - development resources
---

## Resources

### Polaris for VSCode
Automatic autocompletion for Polaris tokens, right inside your favorite code editor.
- [Download extension](https://marketplace.visualstudio.com/items?itemName=Shopify.polaris-for-vscode)

### Components
Components are reusable building blocks made of interface elements and styles, packaged through code. Piece them together, improve them, and create new ones to solve merchant problems.
- [Browse components](https://polaris.shopify.com/components)
- [Component GitHub Package Repo](https://github.com/Shopify/polaris/tree/main/polaris-react)

### Tokens
Design tokens are coded names that represent design decisions for elements like color, spacing, and typography. Applying them to our designs unifies merchant experiences.
- [Browse tokens](https://polaris.shopify.com/tokens/colors)
- [Token GitHub Package Repo](https://github.com/Shopify/polaris/tree/main/polaris-tokens)

### Icons
The Polaris icon library has 400+ carefully designed icons focused on commerce and entrepreneurship. Use them as visual aids to help merchants complete tasks.
 - [Browse icons](https://polaris.shopify.com/icons)

### Releases

Polaris uses [Changsets](https://github.com/changesets/changesets) to handle releasing the npm packages in repository. Our [GitHub action](https://github.com/changesets/action) creates a `version` PR called **"Version Packages"**, then keeps it up to date, recreating it when merged. This PR always has an up-to-date run of `changeset version` and performs a releases when changes are merged to the `main` branch.

- [Perform a release](https://github.com/Shopify/polaris/blob/main/documentation/Releasing.md)