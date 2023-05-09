---
title: Contributing to Polaris Icons
navTitle: Icons
keywords:
  - icons
  - add a new icon
  - deprecate an icon
  - update an icon
  - how to contribute to polaris icons
order: 3
---

Polaris Icons are important visual aids that help merchants understand actions and concepts across the Shopify Admin. Whether your team needs to add, modify, or deprectate an icon, all designers and developers that work at Shopify are welcome to contribute.

Before proposing a new icon, search the [icon explorer](https://polaris.shopify.com/icons). If the icon you’re looking for isn’t included, create a proposal for the new icon and work with your team to add it. Any additions or changes should also be reflected in the [Figma UI Kit](/contributing/figma-ui-kit).

To learn about best practices for designing and using Polaris icons, read the [icon design guidelines](https://polaris.shopify.com/design/icons). If you have initial questions or need help, reach out in the [#polaris](https://shopify.slack.com/archives/C4Y8N30KD) Slack channel. If you want to start a more in-depth conversation with the system community before opening an issue, start a [GitHub discussion](https://github.com/Shopify/polaris/discussions/new).

## Design a new icon

1. Submit an [icon proposal](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md).
2. Review design specs in the Polaris Icons library in Figma.
3. If you are designing a new icon:
   <br /> - Draft the new icon following the design language guidance in the Polaris Icon Library in Figma.
   <br /> - Request feedback from a Polaris designer.
4. If you need assistance designing the new icon:
   <br /> - Reach out in the #polaris Slack channel requesting a new icon.
   <br /> - A designer will reach out to get context and information around what you need, deadlines and other relevant information.
   <br /> - A designer will work with you to design an icon that meets your team’s needs with your feedback along the way.
5. Once alignment on the design is reached, follow the instructions below for adding the icon.

## Add or edit an icon

1. Submit an [icon proposal](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md)
2. [Set up your development environment](/contributing/shipping-your-contribution#get-set-up)
3. If you are adding an icon:
   <br /> - Copy and rename the icon template files
   <br /> - Add the exported icon SVG to the `.svg` file
   <br /> - Add the icon metadata to the `.yml` file
4. If you are editing an existing icon:
   <br /> - Replace the existing icon SVG in the `.svg` file
   <br /> - Update the relevant metadata in the `.yml` file
5. Run `yarn changeset` to add an entry to the change log and release notes
6. Commit your changes and [open a pull request](/contributing/shipping-your-contribution#open-your-first-pr) in the Shopify/polaris GitHub repo
7. Update the Polaris Icon Library in Figma

## Deprecate an icon

1. Submit an [icon proposal](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md).
2. [Set up your development environment](/contributing/shipping-your-contribution#get-set-up).
3. If you are deprecating an icon without replacement:
   <br /> - Add `deprecated: true` to the icon’s `.yml` file.
4. If you are deprecating an icon with replacement:
   <br /> - Rename the icon’s `.svg` and `.yml` files.
   <br /> - Add `deprecated_aliases` to the `.yml` file.
   <br /> - List each of the icon’s previous names. For example, if you were to rename `OldMajor` to `NewMajor`, you would add these lines to `NewMajor.yml`:
   <br />

   ```yml
   deprecated_aliases:
     - OldMajor
   ```

5. Run `yarn changeset` to add an entry to the change log and release notes.
6. Commit your changes and [open a pull request](/contributing/shipping-your-contribution#open-your-first-pr) in the Shopify/polaris GitHub repo.
7. Update the Polaris Icon Library in Figma.
