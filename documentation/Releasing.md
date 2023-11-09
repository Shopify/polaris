# Releasing

## 📸 Snapshot releases

[Snapshot releases](https://github.com/changesets/changesets/blob/main/docs/snapshot-releases.md) are a way to test your changes in a consuming project without publishing a new version. You can create a snapshot from your pull request if:

- CI is passing on your feature branch
- Your feature branch has **at least one** pending [changeset](https://github.com/Shopify/polaris/blob/main/.github/CONTRIBUTING.md#adding-a-changeset)

### 📦 Polaris npm packages

1. Add a comment with the `/snapit` slash command in your feature branch PR
2. The github-actions bot will react to your comment with 👀 once the `snapit.yml` workflow is running, then react with a 🚀 and post a comment listing install commands for the snapshots of each npm package that will be included in the next version release

### 👩‍💻 [polaris-for-vscode](/polaris-for-vscode)

The `polaris-for-vscode` extension is published to the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=Shopify.polaris-for-vscode). The extension is automatically released using the [`publish-polaris-for-vscode.yml`](/github/workflows/publish-polaris-for-vscode.yml) workflow.

## Version releases

Polaris uses [Changesets](https://github.com/changesets/changesets) to handle releasing new versions of the packages in the `Shopify/polaris` repository.

We have a [GitHub action](https://github.com/changesets/action) that:

- Creates a `changeset-release/main` branch and opens a PR titled **"[Version Packages](https://github.com/Shopify/polaris/pulls?q=is%3Apr+version+packages+is%3Aopen)"** that always has an up-to-date run of `changeset version`
- Keeps the `changeset-release/main` branch up to date whenever a pull request is merged to `main`
- Performs a release when the `changeset-release/main` branch merged into the `main` branch
- Recreates the `changeset-release/main` branch after the release is complete and opens a new **"[Version Packages](https://github.com/Shopify/polaris/pulls?q=is%3Apr+version+packages+is%3Aopen)"** PR

### Prerelease (beta)

Similar to the normal Changeset release workflow described above, a prerelease PR is created when merging work with changesets into the `next` branch. The **"[Version Packages (beta)](https://github.com/Shopify/polaris/pulls?q=is%3Apr+version+packages+beta+is%3Aopen)"** PR will contain all changes that will be included in the next major release.

When merging this PR into `next`, a new prerelease is created with the `beta` dist tag. You can learn more about [prerelease support using Changesets here](https://github.com/changesets/changesets/blob/main/docs/prereleases.md).

Steps for creating a new prerelease branch if `next` doesn't currently exist.

1. Create a new `next` branch for prerelease development
2. Run `yarn changeset pre enter beta`
3. Adjust the release workflow file (`.github/workflows/release.yml`) to run on the `next` branch:
   ```yml
   on:
     push:
       branches:
         - main
         - next
   ```
4. Branch future work from the `next` branch
5. Create changesets, merge to the prerelease branch (`next`)
6. Releasing PRs should now be generated for the prerelease branch 🎉

### Who can perform a version release?

Anyone at Shopify can perfom a version release. Ping the `@Shopify/polaris-team` on GitHub or the `@polaris-developers` team in the #polaris Slack channel for support.

### Steps to perform a version release:

#### 1. 🧪 Test the "Version Packages" PR

- Create a [snapshot release](https://github.com/Shopify/polaris/edit/main/documentation/Releasing.md#-snapshot-releases) of the **"[Version Packages](https://github.com/Shopify/polaris/pulls?q=is%3Apr+version+packages+is%3Aopen)"** PR
- Create a new branch in a `Shopify/web` Spinstance that upgrades `@shopify/polaris` to its snapshot release

#### 2. 🚢 Publish the release

- Once CI passes in the `Shopify/web` upgrade branch, approve and merge the **"[Version Packages](https://github.com/Shopify/polaris/pulls?q=is%3Apr+version+packages+is%3Aopen)"** PR
- Merging the **"[Version Packages](https://github.com/Shopify/polaris/pulls?q=is%3Apr+version+packages+is%3Aopen)"** PR triggers the `release.yml` workflow that publishes the packages

#### 3. 🕸️ Upgrade `@shopify/polaris` in `Shopify/web`

- Draft a PR for the `Shopify/web` upgrade branch with:
  - Version Packages PR link
  - Tl;dr of the key things to tophat
  - Spinstance URL
  - "Key dependencies" and "Polaris" labels
  - Contributors listed in the Version Packages PR description tagged as reviewers
- Once the release is available on [npm](https://www.npmjs.com/package/@shopify/polaris), install the new version of `@shopify/polaris` in the `Shopify/web` upgrade PR
- Send a link to the `Shopify/web` upgrade PR in a group Slack DM to the contributors requesting they tophat their changes in the Spinstance and flag regressions or approve the PR

#### 4. 🚀 Upgrade `@shopify/polaris` in [`Shopify/shopify-frontend-template-react`](https://github.com/Shopify/shopify-frontend-template-react)

#### 5. 🦄 Unicorn the release contributors

#### 6. 📣 Announce the new `@shopify/polaris` version and share the 🦄 Unicorn in the #polaris Slack channel and in the Polaris Updates and Engineering groups in Workplace 🎉

## 🔗 Style guide deploys

The style guide is automatically deployed to [polaris.shopify.com](/polaris.shopify.com) when new changes in the `/polaris.shopify.com` directory are merged into the `main` branch.
