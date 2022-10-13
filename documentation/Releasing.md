# Releasing

Polaris uses [Changsets](https://github.com/changesets/changesets) to handle releasing the npm packages in repository.

We have a [GitHub action](https://github.com/changesets/action) that

- creates a `version` PR called **"Version Packages"**, then keeps it up to date, recreating it when merged. This PR always has an up-to-date run of `changeset version`
- performs a releases when changes are merged to the `main` branch.

To perform a release:

- Comment `/snapit` in the **"Version Packages"** PR to cut a snapshot release
- Create a pull request in `Shopify/web` for the upgrade using the snapshot
- Once CI passes in the `Shopify/web` PR, and you've received an approval from [@Shopify/polaris-team](https://github.com/orgs/Shopify/teams/polaris-team), merge the **"Version Packages"** PR in `Shopify/polaris`
- Once the release is available in npm, update the `Shopify/web` PR to the new version and request review from the folks whose changes are part of the release as listed in the release notes
- Optional: You can create a group message tagging all contributors to nudge them for reviews, as well as to verify the changes within `Shopify/web` work as expected

## Snapshot Release

[Snapshot releases](https://github.com/changesets/changesets/blob/main/docs/snapshot-releases.md) are a way to release your changes for testing without updating the versions. To create a snapshot release:

1. Add a comment in your feature branch PR with the slash command "/snapit"
2. This will trigger the `snapit.yml` workflow to create a new snapshot release

> Note: Your feature branch PR should have **at least one** changeset. The snapshot release will only release packages with a pending changeset. More info on [adding a changeset](https://github.com/Shopify/polaris/blob/main/.github/CONTRIBUTING.md#adding-a-changeset).

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
