---
name: Figma UI Kit
keywords:
  - ui kit
  - figma
  - how to contribute to polaris ui kit
  - how to fix a figma component
---

# Contributing to the Figma UI Kit

Any designer within Shopify can contribute to the [Polaris UI Kit for Figma](https://www.figma.com/file/4dAAt5iFPSaxUKiYVKrkYj/?node-id=744%3A4456). If you find a bug to fix or have new work your team is contributing to Polaris, you should feel empowered to contribute that to the UI kit. No need to ask for permission---go for it. If you have initial questions or need help, reach out in the [#polaris](https://shopify.slack.com/archives/C4Y8N30KD) Slack channel. If you want to start a more in-depth conversation with the system community, start a [GitHub discussion](https://github.com/Shopify/polaris/discussions/new).

Non-Polaris components, features, or patterns shouldn't be added to the UI Kit. Our goal is to keep the UI kit in sync with the Polaris codebase, and adding things just to Figma that don't have counterparts in Polaris React causes confusion and makes our tooling out of sync with one another.

## Quick start guide

<!-- prettier-ignore -->
| Contribution type | When to contribute and/or collaborate | Where to search for related issues/topics | Who to involve  | Resources potentially impacted  | How to get started (The first step) |
|---|---|---|---|---|---|
| Bug fix (visual design or auto layout) | As needed | Polaris UI Kit | Polaris designer | Polaris Components Figma library | Create an issue in `Shopify/polaris` repo |
| New component variant | When design is mostly complete so there is time to create Figma variants while devs build.  | Polaris UI Kit | Polaris designer | Polaris Components Figma library | Create a branch in Figma and ask for a review |
| New component | When your design process is between 50%-75% done. | Polaris UI Kit | Polaris designer  | Polaris Components Figma library | Reach out in the #polaris Slack channel, then create a branch in Figma and ask for a review |

## Detailed steps

1. Create an issue in the `Shopify/polaris` repo, or assign yourself to an existing one. Make sure to:
   1. Assign yourself to the issue so it’s clear who is doing the work
   2. Add the Figma UI Kit label so we can easily find the issue
   3. Use a descriptive title
   4. Describe the change you're making in the issue itself
2. Create a branch in the Polaris Components Figma library. Give your branch a descriptive name, ideally using the GitHub issue number so it's easy to track. Example: [4963] Navigation design changes
3. Make the necessary changes in the new branch.
4. Document all changes in the “Release Notes” page within the UI kit.
   5 Add a design reviewer from the Polaris team to review the changes on your branch. If you aren't sure who to add, you can also share the link to your Figma branch in the #polaris channel and ask for a review.
5. Once reviewed and approved, the designer on the Polaris team will merge the changes into the main branch and publish the updates.
