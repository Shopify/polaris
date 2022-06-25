---
name: Documentation
keywords:
  - how to contribute to polaris documentation
  - how to contribute to the style guide
  - documenting in polaris
  - documentation guidelines
quickGuides:
  - title: Making copy edits (grammatical errors, typos, etc.)
    queryParam: making-copy-edits
    rows:
      - openSource:
        question: Are open source contributions accepted?
        answer: Yes
      - who:
        question: Who should I involve?
        answer: Subject matter experts, impacted teams, and or those with the most context on the Polaris team.
      - when:
        question: When should I contribute?
        answer: As needed
      - where:
        question: Where do I contribute?
        answer: Copy edits can be contributed in the <a href="https://github.com/Shopify/polaris">Shopify/polaris</a> GitHub repo. Copy edits should also be contributed in Figma if relevant.
      - relatedIssues:
        question: Where should I search for related issues or topics?
        answer: Search for related issues and pull requests in the <a href="https://github.com/Shopify/polaris">Shopify/polaris</a> GitHub repo.
      - what:
        question: What resources will my contribution impact?
        answer: Along with related content sections on this documentation site, your contribution may impact the Figma UI Kit and component examples.
      - how:
        question: How can I get started?
        answer: <a href="/contributing/shipping-your-contribution">Open a pull request</a> in the <a href="https://github.com/Shopify/polaris">Shopify/polaris</a> GitHub repo
  - title: Updating documentation
    queryParam: updating-documentation
    rows:
      - openSource:
        question: Are open source contributions accepted?
        answer: No
      - who:
        question: Who should I involve?
        answer: Subject matter experts, impacted teams, and or those with the most context on the Polaris team.
      - when:
        question: When should I contribute?
        answer: After collecting feedback from subject matter experts on the changes you're proposing.
      - where:
        question: Where do I contribute?
        answer: Documentation updates can be contributed in the <a href="https://github.com/Shopify/polaris">Shopify/polaris</a> GitHub repo. Updates should also be contributed in Figma if relevant.
      - relatedIssues:
        question: Where should I search for related issues or topics?
        answer: Along with searching for related issues and discussions in the <a href="https://github.com/Shopify/polaris">Shopify/polaris</a> GitHub repo, you should search in Shopify's internal wiki and Google Drive.
      - what:
        question: What resources will my contribution impact?
        answer: Any resource that references or links to the documentation being updated.
      - how:
        question: How can I get started?
        answer: Start a draft in Google Docs, then share with the <span>#polaris</span> team in Slack.
  - title: Adding new documentation
    queryParam: adding-new-documentation
    rows:
      - openSource:
        question: Are open source contributions accepted?
        answer: No
      - who:
        question: Who should I involve?
        answer: Subject matter experts, impacted teams, and or those with the most context on the Polaris team.
      - when:
        question: When should I contribute?
        answer: As needed, as soon as you have rationale for new guidance.
      - where:
        question: Where do I contribute?
        answer: Documentation additions can be contributed in the <a href="https://github.com/Shopify/polaris">Shopify/polaris</a> GitHub repo. Additions should also be contributed in Figma if relevant.
      - relatedIssues:
        question: Where should I search for related issues or topics?
        answer: Along with searching for related issues in and discussions in the <a href="https://github.com/Shopify/polaris">Shopify/polaris</a> GitHub repo, you should search in Shopify's internal wiki and Google Drive.
      - what:
        question: What resources will my contribution impact?
        answer: Along with this related content sections on this documentation site, your contribution may impact Shopify's internal wiki and related content in the Figma UI Kit.
      - how:
        question: How can I get started?
        answer: Start a draft in Google Docs, then share with the <span>#polaris</span> team in Slack.
  - title: Removing documentation
    queryParam: removing-documentation
    rows:
      - openSource:
        question: Are open source contributions accepted?
        answer: No
      - who:
        question: Who should I involve?
        answer: Subject matter experts, impacted teams, and or those with the most context on the Polaris team.
      - when:
        question: When should I contribute?
        answer: As needed
      - where:
        question: Where do I contribute?
        answer: Documentation removals can be contributed in the <a href="https://github.com/Shopify/polaris">Shopify/polaris</a> GitHub repo. Removals should also be contributed in Figma if relevant.
      - what:
        question: What resources will my contribution impact?
        answer: Any resource that references or links to the documentation being removed.
      - how:
        question: How can I get started?
        answer: <a href="/contributing/shipping-your-contribution">Open a pull request</a> in the <a href="https://github.com/Shopify/polaris">Shopify/polaris</a> GitHub repo
---

# Documenting in Polaris

From fixing typos to drafting new pattern guidance, everyone that works at Shopify is encouraged to contribute to Polaris documentation.

Shopify teams create documentation for polaris.shopify.com, but open source contributors are welcome to make copy edits as well as update or add examples to [component documentation](/contributing/components).

## Quick start guides

<!--

This is a placeholder table, quick start guides render here. You can find and edit quick guide content in the metadata (front matter) at the top of this file. The placeholder table is here so the Markdown component that parses these files places the QuickStartGuide component here (see components/Markdown.tsx).

-->

|     |     |
| --- | --- |
|     |     |

## Detailed steps

To write effectively, use a cross-discipline lens. Make sure your content meets both UX and development needs. Before starting, check out our [style guide to the style guide](https://docs.google.com/document/d/1zVDsHIWhoir2svRjdtSdRbD_ruTz3K1nAJcQLGPVQwM/edit#heading=h.ni67tdntu9cr).

Most documentation about the design system is meant for polaris.shopify.com. However, there may be a reason for the content to live elsewhere. If you're not sure if something should live on this site, the Polaris team can help you figure that out.

### Making copy edits

Edits related to spelling, grammar, punctuation, or other typos should happen quickly and often. Both Shopify employees and open source contributors are welcome to submit copy edits.

To fix any copy issues on polaris.shopify.com, [open a pull request](/contributing/shipping-your-contribution#open-your-first-pr) in the [Shopify/polaris repo](https://github.com/Shopify/polaris) GitHub repo.

Note: If you find copy issues in other Polaris resources, follow the steps for that resource's contribution guidelines.

### Updating documentation

To expand or edit existing documentation:

1. Draft your proposed changes in Google Docs for easy collaboration. We recommend writing in [Markdown](https://www.markdownguide.org/cheat-sheet/), or converting your file to Markdown when finished.
2. Get feedback from subject matter experts or someone with high context around your changes, like a team member or your lead.
3. Reach out to the Polaris team to review your changes for style guide alignment.
4. [Open a pull request](/contributing/shipping-your-contribution#open-your-first-pr) in the [Shopify/polaris repo](https://github.com/Shopify/polaris) GitHub repo.

### Adding new documentation

New documentation in Polaris can range from component documentation, to content guidelines, to pattern guidance.

To create new documentation:

1. Book office hours with Polaris to share your rationale for why you think this addition would improve the design system.
2. Once the Polaris team provides feedback, draft the content in Google docs for easy collaboration. We recommend writing in [Markdown](https://www.markdownguide.org/cheat-sheet/), or converting your file to Markdown when finished.
3. Get feedback from subject matter experts, or someone with high context around your changes (team member, manager, etc.).
4. Reach out to the Polaris team again to review your changes for style guide alignment.
   <br /> If on review of the initial proposal the Polaris team suggests that the content should live somewhere besides the Polaris site, you don't need to have the content reviewed for style guide alignment.
5. [Open a pull request](/contributing/shipping-your-contribution#open-your-first-pr) in the [Shopify/polaris repo](https://github.com/Shopify/polaris) GitHub repo.

### Removing documentation

It's important that inaccurate or outdated information be removed as soon as possible. This helps maintain high trust in Polaris as a source of truth for design system guidance.

To remove documentation:

1. Reach out to subject matter experts, or someone with high context around the existing content, to confirm its relevance and accuracy.
2. [Open a pull request](/contributing/shipping-your-contribution#open-your-first-pr) in the [Shopify/polaris repo](https://github.com/Shopify/polaris) GitHub repo.
