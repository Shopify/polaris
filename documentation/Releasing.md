# Releasing

Polaris uses Changsets to handle releasing the following npm packages:

- [polaris-icons](/polaris-icons)
- [polaris-react](/polaris-react)
- [polaris-tokens](/polaris-tokens)
- [stylelint-polaris](/stylelint-polaris)

We have a [GitHub](https://github.com/changesets/action) action that

- creates a `version` PR, then keeps it up to date, recreating it when merged. This PR always has an up-to-date run of `changeset version`
- optionally allows you to do releases when changes are merged to the `main` branch.

If you don't want to use this action, the manual workflow we recommend for running the `version` and `publish` commands is:

1. A release coordinator (RC) calls to stop any merging to the `main` branch
2. The RC pull down the `main` branch, runs `yarn version-packages`, then make a new PR with the versioning changes
3. The versioning changes are merged back into the `main` branch
4. The RC pulls the `main` branch again and runs `yarn release`
5. The RC runs `git push --follow-tags` to push the release tags back
6. The RC unblocks merging to the `main` branch

This is a lot of steps, and is quite finnicky (we have to pull from the `main` branch twice). It is recommended to use the GitHub action when possible.

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

### [polaris.shopify.com](/polaris.shopify.com)

- Go to the [polaris-site-container-builder](https://github.com/Shopify/polaris-site-container-builder) repo
- Follow the steps in the `README.md`
