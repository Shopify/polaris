# Releasing

Polaris uses [Changsets](https://github.com/changesets/changesets) to handle releasing the npm packages in repository.

We have a [GitHub action](https://github.com/changesets/action) that

- creates a `version` PR called **"Version Packages"**, then keeps it up to date, recreating it when merged. This PR always has an up-to-date run of `changeset version`
- performs a releases when changes are merged to the `main` branch.

To perform a release, merge in the **"Version Packages"** PR.

## Prereleases

Prereleases are created the same way as releases, but are merged into the `next` branch. To create a prerelease:

1. If [`next`](https://github.com/Shopify/polaris/tree/next) **does not** already exist, create one from `main`:

   ```sh
   git checkout -b next origin/main
   git push --set-upstream origin next
   ```

2. If [`next`](https://github.com/Shopify/polaris/tree/next) already exists, rebase it with `main`

   ```sh
   git checkout next
   git pull
   git rebase origin/main
   git push --force
   ```

3. After pushing `next` to GitHub, the [prerelease workflow](https://github.com/Shopify/polaris/blob/main/.github/workflows/prerelease.yml) will generate a PR 🎉
4. Merge in the newly created **"Version Packages (next)"** PR to release the prerelease versions

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
