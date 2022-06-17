---
name: Icons
keywords:
  - icons
  - add a new icon
  - deprecate an icon
  - update an icon
  - how to contribute to polaris icons
---

# Contributing to Polaris Icons

Icons are important visual aids that carry a lot of impact despite their simplicity. All designers and developers that work at Shopify are encouraged to contribute to the [Polaris icon library](https://www.figma.com/file/mMHFt3kEDNjLMZWowi6gnt/?node-id=753%3A2). Contributions can be in the form of creating a new icon, modifying an existing icon, or deprecating an icon.

## Quick start guide

table goes here

## Detailed steps

Before proposing a new icon, search the [icon explorer](https://polaris-icons.shopify.com/). If the icon you're looking for isn't included, create a proposal for the new icon and work with your team to add it. Any additions or changes should also be reflected in the [Figma UI Kit](/contributing/figma-ui-kit).

### How to contribute

To learn about best practices for designing and using Polaris icons, read the [icon design guidelines](https://polaris.shopify.com/design/icons). If you have initial questions or need help, reach out in the [#polaris](https://shopify.slack.com/archives/C4Y8N30KD) Slack channel. If you want to start a more in-depth conversation with the system community before opening an issue, start a [GitHub discussion](https://github.com/Shopify/polaris/discussions/new).

#### Designing a new icon

1. [Create an issue](https://github.com/Shopify/polaris/issues/new/choose) for your proposal to create or modify an icon.
2. Review design specs in the Polaris Icons library in Figma
3. If you are designing a new icon

- Design your new icon following the styles and guidance from Polaris. (Feel free to use the [#polaris](https://shopify.slack.com/archives/C4Y8N30KD) channel to get feedback along the way).
  b. Request review/feedback from Polaris designer. This is to ensure design language adherence so all new contributions fit within the entire icon set.
  c. Follow process for adding to the [Polaris repo]{link to this section} and [UI kit]{link to this section}.

4. If you need assistance designing the new icon
   1. Reach out in the #polaris Slack channel requesting a new icon.
   2. A designer will reach out to get context and information around what you need, deadlines and other relevant information.
   3. A designer will work with you to design an icon that meets your team’s needs with your feedback along the way.
   4. Once design is complete, follow the process for adding to the Polaris repo and UI kit

#### Add, edit, or deprecate an icon

1. Create an issue in the `Shopify/polaris` repo with your proposal
   1. Add assignees who’ll be working on the contribution
   2. Ping collaborators so they can follow along
2. Clone the [Shopify/polaris repo](https://github.com/Shopify/polaris) to your development environment
3. Create a new feature branch
4. Run `yarn build && yarn dev` in your terminal
5. If you are adding an icon:
   1. Copy and rename the icon template files
   2. Add the exported icon SVG to the `.svg` file
   3. Add the icon metadata to the `.yml` file
6. If you are editing an existing icon:
   1. Replace the existing icon SVG in the `.svg` file
   2. Update the relevant metadata in the `.yml` file
7. If you are deprecating an icon without replacement:
   1. Add `deprecated: true` to the icon’s `.yml` file
8. If you are deprecating an icon with replacement:
   1. Rename the icon’s `.svg` and `.yml` files
   2. Add `deprecated_aliases` to the `.yml` file
      1. List each of the icon’s previous names
      2. For example, if you were to rename `OldMajor` to `NewMajor`, you would add these lines to `NewMajor.yml`:
   ```yml
   deprecated_aliases:
     - OldMajor
   ```
9. Run `yarn changeset` to add an entry to the change log and release notes
10. Commit your changes and push up your branch
11. Create a pull request and request review from your collaborators
    1. Add `@Shopify/polaris-team` as GitHub reviewers for breaking changes
    2. Link to the feature proposal issue you submitted
12. Once the pull request is reviewed, approved, and merged, update the Figma UI Kit:
    1. Create a branch in the Polaris Icons library in Figma
    2. Add your SVG and create a new component following the current naming convention
    3. Request a review from a Polaris designer
       1. Once approved they will merge and release the new icon
