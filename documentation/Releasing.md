# Releasing

Polaris uses Changsets to handle releasing the npm packages in repository.

We have a [GitHub](https://github.com/changesets/action) action that

- creates a `version` PR, then keeps it up to date, recreating it when merged. This PR always has an up-to-date run of `changeset version`
- optionally allows you to do releases when changes are merged to the `main` branch.

## Prereleases

To create a new prerelease:

1. Branch of the `next` branch
1. Create changesets with your changes
1. Set your target merge branch to `next`
1. The GitHub release workflow will generated a PR for your prerelease branch 🎉

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
