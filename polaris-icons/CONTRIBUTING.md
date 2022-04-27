# Polaris icons contribution guidelines

This repository is the place to contribute changes to icons and <https://polaris-icons.shopify.com>.

- [Questions and troubleshooting](#questions-and-troubleshooting)
- [Code of conduct](#code-of-conduct)
- [Icon sets and design guidelines](#icon-sets-and-design-guidelines)
- [Proposing new icons](#proposing-new-icons)
- [Proposing updates to existing icons](#proposing-updates-to-existing-icons)
- [Exporting icons as SVG files](#exporting-icons-as-svg-files)
- [Repository structure](#repository-structure)
- [Development quick start](#development-quick-start)
- [Running tests](#running-tests)
- [Adding an icon to the repository](#adding-an-icon-to-the-repository)
- [Deprecation guidelines](#deprecation-guidelines)
  - [Deleting an icon](#deleting-an-icon)
  - [Renaming an icon](#renaming-an-icon)
- [Publishing the library](#publishing-the-library)
- [Deploying the Polaris icon explorer website](#deploying-the-polaris-icon-explorer-website)

## Questions and troubleshooting

If you need help or have questions, ask us in the [#polaris](https://app.slack.com/client/T024G4BGQ/C4Y8N30KD) Slack channel.

## Code of conduct

We expect all participants to read our [code of conduct](./.github/CODE_OF_CONDUCT.md) to understand which actions are and aren’t tolerated.

## Icon sets and design guidelines

To learn about best practices for designing and using Polaris icons in your designs, read the [Icon design guidelines](https://polaris.shopify.com/design/icons) in Polaris.

## Proposing new icons

If you can’t find the icons you need, you can [propose new icons](https://github.com/Shopify/polaris-icons/issues/new?assignees=%40shopify%2Ficon-guild&labels=New%2CProposal&template=propose-new-icons.md&title=%5BProposal%5D+Add+%3Cicon+name%28s%29%3E) to be included in the collection.

## Proposing updates to existing icons

If you notice existing icons that are out-of-date or need improvements, you can [propose an update](https://github.com/Shopify/polaris-icons/issues/new?assignees=%40shopify%2Ficon-guild&labels=Update%2CProposal&template=propose-updates-to-existing-icons.md&title=%5BProposal%5D+Update+%3Cicon+names%3E) to these icons.

## Exporting icons as SVG files

Refer to the Vault page: [Exporting icons (SVG)](https://vault.shopify.io/pages/1756-Exporting-icons-SVG).

---

## Repository structure

This project is structured as a [monorepo](https://en.wikipedia.org/wiki/Monorepo), storing [multiple packages](./README.md#packages) under a single repository, and uses [Lerna](https://github.com/lerna/lerna) to manage these packages.

## Development quick start

Clone this repository:

```
dev clone polaris-icons
```

Then run:

```
dev up
yarn run bootstrap
```

## Running tests

```
yarn run test
```

## Adding an icon to the repository

Once an [icon proposal](#proposing-new-icons) is approved, open a pull request to add the [exported icon SVG files](https://vault.shopify.io/pages/1756-Exporting-icons-SVG) to this repository:

1. Clone the repository and install dependencies:

   ```
   dev clone polaris-icons
   dev up
   ```

2. Create a new branch:

   ```
   git checkout -B <name-of-your-icons>
   ```

3. For each icon, make a copy of the `IconNameSet.yml` and `IconNameSet.svg` templates files found in [`/icons/ICON_TEMPLATES`](/icons/ICON_TEMPLATES) into `/icons`
4. Rename the copied files. For a **minor** icon named `small flower`, `IconNameSet.svg` becomes `SmallFlowerMinor.svg`)
5. Paste the contents of the optimized SVG into the `.svg` file
6. Fill the metadata fields in the `.yml` file
7. Update the changelog in [`./packages/polaris-icons/CHANGELOG.md`](https://github.com/Shopify/polaris-icons/blob/main/packages/polaris-icons/CHANGELOG.md):

   ```diff
   ## Unreleased

   ### New icons
   +
   + - `NameOfTheIconSet` (CamelCase, for example: `SmallFlowerMinor`)
   ```

8. Save, commit, and push:

   ```
   git commit -am "Add NameOfTheIconSet"
   git push -u origin HEAD
   ```

9. Open a pull request on <https://github.com/Shopify/polaris-icons>
10. Get a review from people who were involved in the icon proposal process
11. Merge the pull request

Once the pull request is merged, you can [publish a new version](#publishing-the-library) of the library on npm.

_Troubleshooting:_ if any of the above fails, ask for help in [#polaris](https://shopify.slack.com/messages/polaris).

## Deprecation guidelines

Sometimes icons need to be renamed or removed. Both of these actions are breaking changes from a developer’s perspective. In order to not erode trust with our consumers and ensure painless update paths we will reduce the impact of these breaking changes by batching them up.

### Deleting an icon

When you deprecate an icon with no replacement (that is, the icon should be deleted in the future), add `deprecated: true` to the icon’s metadata:

```yml
deprecated: true
```

### Renaming an icon

When you deprecate an icon with a replacement (that is, you rename an icon), rename the icon’s SVGs and metadata file, then add a `deprecated_aliases` key to the metadata with an array containing each of the icon’s previous names. For instance, if you were to rename `OldMajor.yml` to `NewMajor.yml`, add these lines to `NewMajor.yml`:

```yml
# NewMajor.yml
---
deprecated_aliases:
  - OldMajor
```

This will maintain an export with the original name but mark it as deprecated and instruct consumers to use the new name.

Every 6 months or so, we’ll consider releasing a new major version that removes any deprecated icons and aliases.

## Publishing the library

**Note** Version numbers in `package.json` files should never be altered manually. This will be done via scripts as part of the release process.

Follow these steps to release the npm packages:

1. Ensure you have the latest `main` branch including all tags:

   ```
   git checkout main && git pull
   ```

2. Create a new branch for this new release:

   ```
   git checkout -B new-version
   ```

3. Update the changelog in [`./packages/polaris-icons/CHANGELOG.md`](https://github.com/Shopify/polaris-icons/blob/main/packages/polaris-icons/CHANGELOG.md):

   ```diff
   - ## Unreleased
   + <!-- ## Unreleased -->
   +
   + ## 1.2.3 - YYYY-MM-DD
   ```

4. Commit changes made to the changelog:

   ```
   git commit -am "Update CHANGELOG"
   ```

5. Push the branch:

   ```
   git push origin new-version
   ```

6. Begin the release process:

   ```
   yarn run version-bump
   ```

7. Follow the prompts to choose a version for each package.

   **Note** The packages adhere to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

8. Open a pull request (title: `Bump package versions`), and get it approved
9. Merge the pull request
10. The npm packages will automatically be published:

    - npm packages: [`polaris-icons/libraries-js` Shipit stack](https://shipit.shopify.io/shopify/polaris-icons/libraries-js)

_Troubleshooting:_ if any of the above fails, ask for help in [#polaris](https://app.slack.com/client/T024G4BGQ/C4Y8N30KD).

## Deploying the [Polaris icon explorer website](https://polaris-icons.shopify.com)

The Polaris icon explorer is automatically deployed to <https://polaris-icons.shopify.com> via the [`polaris-icons/production` Shipit stack](https://shipit.shopify.io/shopify/polaris-icons/production).
