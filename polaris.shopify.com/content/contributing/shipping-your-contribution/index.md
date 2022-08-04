---
title: Shipping your contribution
description: Contributions to this documentation site and code-related resources in the Polaris design system are made in the [Shopify/polaris GitHub repository](https://github.com/Shopify/polaris). We manage work in progress in our [team backlog](https://github.com/orgs/Shopify/projects/2250), and use GitHub discussions, issues, and pull requests to work in the open.
keywords:
  - contributing to polaris
  - github
  - pull request
  - fork
  - clone
---

## Project details

### How it's structured

The Shopify/polaris GitHub repository is structured as a monorepo, which means it’s a single repository with multiple projects. The monorepo includes:

<!-- prettier-ignore -->
| `polaris` |     |
| ---------- | --- |
|`/polaris-for-figma` |Figma plugin for Polaris components|
|`/polaris-for-vscode` |VS Code extension for Polaris Design Token autocompletion|
|`/polaris-icons` |npm SVG icon library `@shopify/polaris-icons`|
|`/polaris-react` |npm React component library `@shopify/polaris`|
|`/polaris-tokens` |npm Design Token library `@shopify/polaris-tokens`|
|`/polaris.shopify.com` |The style guide to the Polaris Design System|
|`/stylelint-polaris` |Linting rules for using Polaris Design Tokens through CSS custom properties|

### Technologies we use

To manage our monorepo, we use:

- Yarn for package management
- Turborepo and Yarn workspaces for monorepo workflows
- Changesets for managing release notes and change logs

Every Polaris project is a little different, but in general we build with JavaScript, TypeScript, and Sass. This documentation site is built using React and Next.js.

## Get set up

To contribute to Polaris components, icons, or documentation, you’ll need to use your preferred `git` interface to commit and push up your changes. Whether that's the command line in your favorite terminal, or in GitHub Desktop is entirely up to you. For this guide, we'll illustrate the steps with terminal commands.

### 1. Download the repo

#### Shopifolk

Clone the polaris repo

```bash
git clone <https://github.com/Shopify/polaris.git>
```

#### Open Source Contributors

[Fork](https://github.com/Shopify/polaris/fork) the polaris repo

### 2. Install and build

```bash
yarn && yarn build
```

### 3. Create a new branch

```bash
git checkout -b new-branch-name
```

## Open your first PR

### 1. Test your changes

As you work, commit and test your changes:

If your changes affect Polaris React components, you'll need to test the examples and documentation of affected components. For more thorough testing edit the sandbox files found in the `/polaris-react/playground` directory.

```bash
yarn turbo run dev --filter=@shopify/polaris

# Open https://localhost:3000 to test documentation
# Open https://localhost:6006 to test Storybook examples and Playground sandboxes
```

If you are adding or editing documentation, ensure your content displays as expected on the style guide website:

```bash
yarn turbo run dev --filter=polaris.shopify.com
```

### 2. Commit your changes

Save the changes you've made to your branch.

```bash
git commit -m “descriptive message”
```

Push up your branch to GitHub

```bash
git push origin new-branch-name
```

### 3. Create a pull request

Use the "New pull request" button from the [your branch](https://github.com/Shopify/polaris/branches/yours) list to create a pull request for your changes.

In your PR’s description, be specific with what you’ve tested as well as what reviewers should focus on when testing your changes, for example:

- Keyboard and screen reader accessibility
- Interaction state changes
- UI changes
- Small screen vs large screen UX
- Other considerations or feedback you’re seeking regarding how you’ve implemented your changes

Add a [changeset](/.changeset/README.md#changesets) if your PR includes any changes that will require a package version bump and release. Otherwise, add the `🤖 Skip Changelog` label to your PR.
