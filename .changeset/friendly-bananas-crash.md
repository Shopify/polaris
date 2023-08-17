---
'@shopify/polaris-migrator': minor
---

Removed the `@shopify/polaris-cli` and `@shopify/polaris-codemods` package in favor of using only the `@shopify/polaris-migrator`.

Removing these packages will provide the following benefits:

- Improve CI time by removing extra packages from our build, test, and lint workflows
- Reduce confusion on where to add new migrations or update previous migrations
- Clean up ESLint configs, reduce changelog entries, and remove package dependencies
