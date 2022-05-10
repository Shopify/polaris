# Releasing in the Monorepo

The process for releasing the monorepo's contents is in active development. This document captures the current process for each piece.

### [polaris-for-figma](/polaris-for-figma)

You will need to have admin privileges in Figma to release the plugin.

- Run the build step
- In Figma navigate to the plugins menu
- Click "Publish new release"

### [polaris-for-vscode](/polaris-for-vscode)

- [Draft a new release](https://github.com/Shopify/polaris/releases)
- Target the commit that you want to release
- Create a new tag with the prefix `vscode`
- This will trigger the [publish-polaris-for-vscode.yml](https://github.com/Shopify/polaris/blob/main/.github/workflows/publish-polaris-for-vscode.yml) workflow

### [polaris-icons](/polaris-icons)

- Steps tk

### [polaris-react](/polaris-react)

- Merge `main` into `polaris-release`
- Wait for CI/CD to pass
- Go to ship-it (our internal tool)
- Release the package to NPM

### [polaris-tokens](/polaris-tokens)

- Merge `main` into `polaris-tokens-release`
- Wait for CI/CD to pass
- Go to ship-it (our internal tool)
- Release the package to NPM

### [polaris.shopify.com](/polaris.shopify.com)

- Go to the polaris-site-container-builder repo
- Follow the steps in the README.md

### [stylelint-polaris](/stylelint-polaris)

- Go to ship-it (our internal tool)
- Release the package to NPM
