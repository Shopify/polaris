# Polaris icons contribution guidelines

This repository is the place to contribute changes to icons and <https://polaris.shopify.com/icons>.

- [Code of conduct](#code-of-conduct)
- [Icon sets and design guidelines](#icon-sets-and-design-guidelines)
- [Proposing new icons](#proposing-new-icons)
- [Proposing updates to existing icons](#proposing-updates-to-existing-icons)
- [Deprecation guidelines](#deprecation-guidelines)
  - [Deleting an icon](#deleting-an-icon)
  - [Renaming an icon](#renaming-an-icon)

## Code of conduct

We expect all participants to read our [code of conduct](https://github.com/Shopify/polaris/blob/main/.github/CODE_OF_CONDUCT.md) to understand which actions are and aren’t tolerated.

## Icon sets and design guidelines

To learn about best practices for designing and using Polaris icons in your designs, read the [Icon design guidelines](https://polaris.shopify.com/design/icons) in Polaris.

## Proposing new icons

If you can’t find the icons you need, you can [propose new icons](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Icon&template=NEW_ICON.yml&title=%5BIcon%5D%3A+New+icon+%3Cicon-name%3E) to be included in the collection.

## Proposing updates to existing icons

If you notice existing icons that are out-of-date or need improvements, you can [propose an update](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Icon&template=UPDATE_ICON.yml&title=%5BIcon%5D%3A+Update+icon+%3Cicon-name%3E) to these icons.

## Deprecation guidelines

Sometimes icons need to be renamed or removed. Both of these actions are breaking changes from a developer’s perspective. In order to not erode trust with our consumers and ensure painless update paths we will reduce the impact of these breaking changes by batching them up.

### Deleting an icon

When you deprecate an icon with no replacement (that is, the icon should be deleted in the future), add `deprecated: true` to the icon’s metadata:

```yml
deprecated: true
```

### Renaming an icon

When you deprecate an icon with a replacement (that is, you rename an icon), rename the icon’s SVGs and metadata file, then add a `deprecated_aliases` key to the metadata with an array containing each of the icon’s previous names. For instance, if you were to rename `OldMajor.yml` to `NewMajor.yml`, add these lines to `NewMajor.yml`:

```yml
# NewMajor.yml
---
deprecated_aliases:
  - OldMajor
```

This will maintain an export with the original name but mark it as deprecated and instruct consumers to use the new name.

Every 6 months or so, we’ll consider releasing a new major version that removes any deprecated icons and aliases.
