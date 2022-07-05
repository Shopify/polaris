---
name: Icons
keywords:
  - icons
  - add a new icon
  - deprecate an icon
  - update an icon
  - how to contribute to polaris icons
quickGuides:
  - title: Adding an icon
    queryParam: adding-an-icon
    rows:
      - openSource:
        question: Are open source contributions accepted?
        answer: No
      - who:
        question: Who should I involve?
        answer: A designer from the Polaris team.
      - when:
        question: When should I contribute?
        answer: As needed
      - where:
        question: Where do I contribute?
        answer: New icons are contributed in Figma as well as in the <a href="https://github.com/Shopify/polaris">Shopify/polaris</a> GitHub repo. Icon source code and metadata can be found in the <code>polaris-icons/icons</code> directory.
      - relatedIssues:
        question: Where should I search for related issues or topics?
        answer: Along with searching for related issues, pull requests, and discussions in the <a href="https://github.com/Shopify/polaris">Shopify/polaris</a> GitHub repo, search for related branches of the Polaris Icon Library in Figma.
      - what:
        question: What resources will my contribution impact?
        answer: Icon contributions impact the <code>@shopify/polaris-icons</code> npm package and the Polaris Icons Library in Figma.
      - how:
        question: How can I get started?
        answer: <a href="/contributing/shipping-your-contribution#open-your-first-pr">Open a pull request</a> or submit an <a href="https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md"> icon proposal</a> in the Shopify/polaris GitHub repo.
  - title: Modifying an icon
    queryParam: modifying-an-icon
    rows:
      - openSource:
        question: Are open source contributions accepted?
        answer: No, but if you've found an issue with an icon metadata please submit a <a href="https://github.com/Shopify/polaris/issues/new?assignees=&labels=%F0%9F%90%9BBug&template=ISSUE.md">bug report</a>.
      - who:
        question: Who should I involve?
        answer: A designer from the Polaris team.
      - when:
        question: When should I contribute?
        answer: As needed, early in your project process.
      - where:
        question: Where do I contribute?
        answer: Updated icons are contributed in Figma as well as in the <a href="https://github.com/Shopify/polaris">Shopify/polaris</a> GitHub repo. Icon source code and metadata can be found in the <code>polaris-icons/icons</code> directory.
      - relatedIssues:
        question: Where should I search for related issues or topics?
        answer: Along with searching for related issues, pull requests, and discussions in the <a href="https://github.com/Shopify/polaris">Shopify/polaris</a> GitHub repo, search for related branches of the Polaris Icon Library in Figma.
      - what:
        question: What resources will my contribution impact?
        answer: Icon contributions impact the <code>@shopify/polaris-icons</code> npm package and the Polaris Icons Library in Figma.
      - how:
        question: How can I get started?
        answer: <a href="/contributing/shipping-your-contribution#open-your-first-pr">Open a pull request</a> or submit an <a href="https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md"> icon proposal</a> in the Shopify/polaris GitHub repo.
  - title: Deprecating an icon
    queryParam: deprecating-an-icon
    rows:
      - openSource:
        question: Are open source contributions accepted?
        answer: No
      - who:
        question: Who should I involve?
        answer: A designer from the Polaris team.
      - when:
        question: When should I contribute?
        answer: As needed, as soon as you have deprecation rationale.
      - where: Icon deprecations are contributed in Figma as well as in the <a href="https://github.com/Shopify/polaris">Shopify/polaris</a> GitHub repo. Icon source code and metadata can be found in the <code>polaris-icons/icons</code> directory.
        question: Where do I contribute?
        answer: Icon deprecations are contributed in Figma as well as in the <a href="https://github.com/Shopify/polaris">Shopify/polaris</a> GitHub repo. Component code and documentation can be found in the <code>polaris-react/src</code> directory.
      - relatedIssues:
        question: Where should I search for related issues or topics?
        answer: Along with searching for related issues, pull requests, and discussions in the <a href="https://github.com/Shopify/polaris">Shopify/polaris</a> GitHub repo, search for related branches of the Polaris Icon Library in Figma.
      - what:
        question: What resources will my contribution impact?
        answer: Icon contributions impact the <code>@shopify/polaris-icons</code> npm package and the Polaris Icons Library in Figma.
      - how:
        question: How can I get started?
        answer: <a href="/contributing/shipping-your-contribution#open-your-first-pr">Open a pull request</a> or submit an <a href="https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md"> icon proposal</a> in the Shopify/polaris GitHub repo.
---

# Contributing to Polaris Icons

Polaris Icons are important visual aids that help merchants understand actions and concepts across the Shopify Admin. Whether your team needs to add, modify, or deprectate an icon, all designers and developers that work at Shopify are welcome to contribute.

## Quick start guides

<!-- prettier-ignore -->
| Contribution type | When to contribute and/or collaborate | Where to search for related issues | Who to involve  | Resources impacted  | How to get started |
|---|---|---|---|---|---|
| Remove an icon | As needed | [Shopify/polaris repo](https://github.com/Shopify/polaris) | Polaris designer  | [Shopify/polaris repo](https://github.com/Shopify/polaris) Polaris Icons Figma library | Submit an [icon proposal](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md) |
| Edit an icon | As needed | [Shopify/polaris repo](https://github.com/Shopify/polaris) | Polaris designer  | [Shopify/polaris repo](https://github.com/Shopify/polaris) Polaris Icons Figma library | Submit an [icon proposal](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md)  |
| Add a new icon | As needed | [Shopify/polaris repo](https://github.com/Shopify/polaris) | Polaris designer  | [Shopify/polaris repo](https://github.com/Shopify/polaris) Polaris Icons Figma library | Submit an [icon proposal](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md)|

## Detailed steps

Before proposing a new icon, search the [icon explorer](https://polaris.shopify.com/icons). If the icon you're looking for isn't included, create a proposal for the new icon and work with your team to add it. Any additions or changes should also be reflected in the [Figma UI Kit](/contributing/figma-ui-kit).

To learn about best practices for designing and using Polaris icons, read the [icon design guidelines](https://polaris.shopify.com/design/icons). If you have initial questions or need help, reach out in the [#polaris](https://shopify.slack.com/archives/C4Y8N30KD) Slack channel. If you want to start a more in-depth conversation with the system community before opening an issue, start a [GitHub discussion](https://github.com/Shopify/polaris/discussions/new).

### Design a new icon

1. Submit an [icon proposal](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md).
2. Review design specs in the Polaris Icons library in Figma.
3. If you are designing a new icon:
   <br /> - Draft the new icon following the design language guidance in the Polaris Icon Library in Figma.
   <br /> - Request feedback from a Polaris designer.
4. If you need assistance designing the new icon
   <br /> - Reach out in the #polaris Slack channel requesting a new icon.
   <br /> - A designer will reach out to get context and information around what you need, deadlines and other relevant information.
   <br /> - A designer will work with you to design an icon that meets your team’s needs with your feedback along the way.
5. Once alignment on the design is reached, follow the instructions below for adding the icon.

### Add or edit an icon

1. Submit an [icon proposal](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md).
2. [Set up your development environment](/contributing/shipping-your-contribution#get-set-up).
3. If you are adding an icon:
   <br /> - Copy and rename the icon template files
   <br /> - Add the exported icon SVG to the `.svg` file
   <br /> - Add the icon metadata to the `.yml` file
4. If you are editing an existing icon:
   <br /> - Replace the existing icon SVG in the `.svg` file
   <br /> - Update the relevant metadata in the `.yml` file
5. Run `yarn changeset` to add an entry to the change log and release notes
6. Commit your changes and [open a pull request](/contributing/shipping-your-contribution#open-your-first-pr) in the Shopify/polaris GitHub repo.
7. Update the Polaris Icon Library in Figma.

### Deprecate an icon

1. Submit an [icon proposal](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md).
2. [Set up your development environment](/contributing/shipping-your-contribution#get-set-up).
3. If you are deprecating an icon without replacement:
   <br /> - Add `deprecated: true` to the icon’s `.yml` file
4. If you are deprecating an icon with replacement:
   <br /> - Rename the icon’s `.svg` and `.yml` files
   <br /> - Add `deprecated_aliases` to the `.yml` file
   <br /> - List each of the icon’s previous names. For example, if you were to rename `OldMajor` to `NewMajor`, you would add these lines to `NewMajor.yml`:
   <br />

   ```yml
   deprecated_aliases:
     - OldMajor
   ```

5. Run `yarn changeset` to add an entry to the change log and release notes
6. Commit your changes and [open a pull request](/contributing/shipping-your-contribution#open-your-first-pr) in the Shopify/polaris GitHub repo.
7. Update the Polaris Icon Library in Figma.
