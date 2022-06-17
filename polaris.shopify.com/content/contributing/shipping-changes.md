---
name: Shipping your contribution
keywords:
  - contributing to polaris
  - github
  - pull request
  - fork
  - clone
---

# Shipping your contribution

While Figma is used to host and maintain the Polaris UI Kit, all other resources in the Polaris design system live on GitHub. We manage work in progress in our [team backlog](https://github.com/orgs/Shopify/projects), and use GitHub Discussions, Issues, and Pull Requests to work in the open.

## How the project is structured

Polaris is structured as a monorepo, which means it’s a single repository with multiple projects. The Polaris monorepo includes:

```
polaris/
├── polaris-for-figma           # Figma plugin for Polaris components
├── polaris-for-vscode          # VS Code extension for Polaris Design Token autocomplete suggestions
├── polaris-icons               # npm SVG icon library `@shopify/polaris-icons`
├── polaris-react               # npm React component library `@shopify/polaris`
├── polaris-tokens              # npm Design Token library `@shopify/polaris-tokens`
├── polaris.shopify.com         # The style guide to the Polaris Design System
└── stylelint-polaris           # Linting rules for using Polaris Design Tokens through CSS custom properties
```

## What technologies we use

To manage our monorepo structure we use:

- Yarn for package management
- Turborepo and Yarn workspaces for monorepo workflows
- Changesets for managing release notes and change logs

Every Polaris project is a little different, but in general we build with JavaScript, TypeScript, and Sass. This documentation site is built using React and Next.js.

## Setting up your local development environment

To contribute to Polaris components, icons, or documentation, you’ll need to use your preferred git interface, like iTerm or Visual Studio Code, to save and log your changes with git.

### Download the Polaris project

#### Shopifolk

Using `dev`

1. Clone the polaris repo: run `dev clone polaris`
2. Install dependencies and build workspaces: run `yarn && yarn build`
3. Create a new branch to make your changes from: `git checkout -b new-branch-name`

In your Spin instance

1. Clone the polaris repo: `git clone <https://github.com/Shopify/polaris.git>`
2. Install dependencies and build workspaces: run `yarn && yarn build`
3. Create a new branch to make your changes from: `git checkout -b new-branch-name`

#### Open Source Contributors

1. [Fork](https://github.com/Shopify/polaris/fork) the polaris repo
2. Install dependencies and build workspaces: run `yarn && yarn build`
3. Create a new branch to make your changes from: `git checkout -b new-branch-name`

### Test your changes as you work

### Open source contributors

2.1. Run Storybook locally: run `yarn run dev`
2.2. Test the examples of relevant components if you are contributing component changes

4. Commit your changes: `git commit -m “descriptive message”`
5. Push up your branch to GitHub: `git push origin new-branch-name`

### Test your changes

1. Run Storybook locally: `yarn run dev`Thoroughly test your changes using . In your PR’s description, be specific with what you’ve tested as well as what reviewers should focus on when testing your changes, for example:

- Keyboard and screen reader accessibility
- Interaction state changes
- UI changes
- Small screen vs large screen UX
- Other considerations or feedback you’re seeking regarding how you’ve implemented your changes
