---
name: Figma UI Kit
keywords:
  - ui kit
  - figma
  - how to contribute to polaris ui kit
  - how to fix a figma component
quickGuides:
  - title: Fixing a bug (visual design or auto layout)
    queryParam: fixing-a-bug
    rows:
      - openSource:
        question: Are open source contributions accepted?
        answer: No, but if you've found a bug in a component in Figma please submit a <a href="https://github.com/Shopify/polaris/issues/new?assignees=&labels=%F0%9F%90%9BBug&template=ISSUE.md">bug report</a>.
      - who:
        question: Who should I involve?
        answer: A designer on the Polaris team.
      - when:
        question: When should I contribute?
        answer: As needed
      - where:
        question: Where do I contribute?
        answer: Polaris UI Kit contributions are made in <a href="https://www.figma.com/file/4dAAt5iFPSaxUKiYVKrkYj/?node-id=744%3A4456">Figma</a>.
      - relatedIssues:
        question: Where should I search for related issues or topics?
        answer: Along with searching for related issues, pull requests, and discussions in the <a href="https://github.com/Shopify/polaris">Shopify/polaris</a> GitHub repo, search for related branches of the Polaris Components Figma library.
      - what:
        question: What resources will my contribution impact?
        answer: Bug fixes impact the Polaris Components Figma library.
      - how:
        question: How can I get started?
        answer: Submit an issue in the <a href="https://github.com/Shopify/polaris/issues/new">Shopify/polaris</a> GitHub repo, or create a branch in the Polaris Components Figma library.
  - title: Adding a variant to an existing component
    queryParam: adding-a-new-variant
    rows:
      - openSource:
        question: Are open source contributions accepted?
        answer: No
      - who:
        question: Who should I involve?
        answer: A designer on the Polaris team.
      - when:
        question: When should I contribute?
        answer: When design is mostly complete so there is time to create Figma variants while devs build.
      - where:
        question: Where do I contribute?
        answer: Polaris UI Kit contributions are made in <a href="https://www.figma.com/file/4dAAt5iFPSaxUKiYVKrkYj/?node-id=744%3A4456">Figma</a>.
      - relatedIssues:
        question: Where should I search for related issues or topics?
        answer: Along with searching for related issues, pull requests, and discussions in the <a href="https://github.com/Shopify/polaris">Shopify/polaris</a> GitHub repo, search for related branches of the Polaris Components Figma library.
      - what:
        question: What resources will my contribution impact?
        answer: Along with impacting the Polaris Components Figma library, adding new component variants impact the <code>@shopify/polaris</code> npm package and this documentation site.
      - how:
        question: How can I get started?
        answer: Create a branch in Figma and ask for a review, or submit <a href="https://github.com/Shopify/polaris/issues/new?assignees=&labels=%F0%9F%90%9BBug&template=ISSUE.md">feature proposal</a> in the Shopify/polaris GitHub repo.
  - title: Adding a new component
    queryParam: adding-a-new-component
    rows:
      - openSource:
        question: Are open source contributions accepted?
        answer: No
      - who:
        question: Who should I involve?
        answer: A designer on the Polaris team.
      - when:
        question: When should I contribute?
        answer: When your design process is between 50%-75% done.
      - where:
        question: Where do I contribute?
        answer: Polaris UI Kit contributions are made in <a href="https://www.figma.com/file/4dAAt5iFPSaxUKiYVKrkYj/?node-id=744%3A4456">Polaris Components Figma library</a>.
      - relatedIssues:
        question: Where should I search for related issues or topics?
        answer: Along with searching for related issues, pull requests, and discussions in the <a href="https://github.com/Shopify/polaris">Shopify/polaris</a> GitHub repo, search for related branches of the Polaris Components Figma library.
      - what:
        question: What resources will my contribution impact?
        answer: Along with impacting the Polaris Components Figma library, adding new components impact the <code>@shopify/polaris</code> npm package and this documentation site.
      - how:
        question: How can I get started?
        answer: Reach out in the <span>#polaris</span> Slack channel, or submit a <a href="https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md">feature proposal</a> or <a href="https://github.com/Shopify/polaris/issues/new?assignees=&labels=&template=NEW_COMPONENT.md">new component proposal</a> early in your project.
---

# Contributing to the Figma UI Kit

Any designer that works at Shopify can contribute to the Figma UI Kit. If you find a bug to fix or your team is contributing new patterns or variants to Polaris React components, we want you to feel empowered to contribute.

Components, features, or patterns shouldn't be added to the Figma UI Kit if they are not part of Polaris React, as our goal is to keep Figma in sync with the code base. Only contributing changes to the Figma UI Kit when there's a counterpart in Polaris React prevents confusion and keeps tooling in sync across resources.

## Quick start guides

<!-- prettier-ignore -->
| Contribution type | When to contribute and/or collaborate | Where to search for related issues/topics | Who to involve  | Resources potentially impacted  | How to get started (The first step) |
|---|---|---|---|---|---|
| Bug fix (visual design or auto layout) | As needed | Polaris UI Kit | Polaris designer | Polaris Components Figma library | Create an issue in `Shopify/polaris` repo |
| New component variant | When design is mostly complete so there is time to create Figma variants while devs build.  | Polaris UI Kit | Polaris designer | Polaris Components Figma library | Create a branch in Figma and ask for a review |
| New component | When your design process is between 50%-75% done. | Polaris UI Kit | Polaris designer  | Polaris Components Figma library | Reach out in the #polaris Slack channel, then create a branch in Figma and ask for a review |

## Detailed steps

1. Submit an issue in the [Shopify/polaris](https://github.com/Shopify/polaris/issues/new) GitHub repo, or assign yourself to [an existing issue](https://github.com/Shopify/polaris/labels/Figma%20UI%20Kit). Make sure to:
   1. Assign yourself to the issue so it’s clear who is doing the work
   2. Add the "Figma UI Kit" label so we can easily find the issue
   3. Use a descriptive title
   4. Describe the change you're making in the issue itself
2. Create a branch in the Polaris Components Figma library.
   <br /> - Give your branch a descriptive name, ideally using the GitHub issue number so it's easy to track.
   <br /> - For example, "[4963] Navigation design changes"
3. Make the necessary changes in the new branch.
4. Document all changes in the “Release Notes” page within the UI kit.
5. Add a design reviewer from the Polaris team to review the changes on your branch. If you aren't sure who to add, share the link to your Figma branch and ask for review in the #polaris Slack channel.
6. Once reviewed and approved, the Polaris designer will merge your changes into the main branch and publish the updates.
