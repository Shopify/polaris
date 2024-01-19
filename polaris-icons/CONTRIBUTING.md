# Polaris icons contribution guidelines

This repository is the place to contribute changes to icons and <https://polaris.shopify.com/icons>.

- [Code of conduct](#code-of-conduct)
- [Icon sets and design guidelines](#icon-sets-and-design-guidelines)
- [Proposing new icons](#proposing-new-icons)
- [Proposing updates to existing icons](#proposing-updates-to-existing-icons)
- [Adding new icons](#adding-new-icons)
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

## Adding new icons

1. Export your icon in SVG format from your design software (Figma, Sketch, Illustrator etc...).
1. Paste SVG source into new file: `polaris-icons/icons/{YourIconName}.svg`.
1. Add an accompanying YAML file: `polaris-icons/icons/{YourIconName}.yml`. YAML file requires the following fields: `name, description, keywords, authors, date_added, date_modified`. See sibling files for reference.
1. Optimize your icon by running `yarn optimize` from the `polaris-icons` directory .
