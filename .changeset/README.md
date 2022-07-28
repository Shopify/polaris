# Changesets

Hello and welcome! To manage our change log and releases, we use [Changesets](https://github.com/changesets/changesets) to [version](https://semver.org/) and publish code. 

To add an entry to the change log for your pull request, from your feature branch run `yarn changeset` in your terminal. Use the arrow, spacebar, and return keys to answer the following Changesets CLI questions:
 
`🦋  Which packages would you like to include?`
- Press the `Space` key to select `changed packages`, then press `Enter` to move to the next question.

`🦋  Which packages should have a major bump?`
- Press the `Enter` key to select none and move to the next question, _*or*_ navigate packages using the arrow keys and press the `Space` key to select the packages with changes that should target a major version.

`🦋  Which packages should have a minor bump?`
- Press the `Enter` key to select none so that your changes automatically target a patch bump, _*or*_ select packages using the up and down arrow keys and space if your changes should target a minor version.

```
🦋  The following packages will be patch bumped:
🦋  {PACKAGE NAME}
🦋  {PACKAGE NAME}
🦋  Please enter a summary for this change (this will be in the changelogs).
🦋    (submit empty line to open external editor)
🦋  Summary › {CHANGELOG ENTRY}
```
- Follow our [change log content guidelines](https://github.com/Shopify/polaris/blob/main/.github/CONTRIBUTING.md#writing-a-changelog-message) to write your entry
- Commit and push up
