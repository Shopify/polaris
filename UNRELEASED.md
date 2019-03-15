# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

**Use the `Skip Changelog` label to ignore a failing changelog check** in your pull request if you feel the code changes do not warrant a changelog entry.

---

### Breaking changes

### New components

### Enhancements

- Updated `Navigation` badge prop to accept a react node ([#1142](https://github.com/Shopify/polaris-react/pull/1142))
- Changed max width on `Search` to 694px so that it is perfectly centered in the top bar ([#1107](https://github.com/Shopify/polaris-react/issues/1107))
- Added `action` prop to `Toast` ([#919](https://github.com/Shopify/polaris-react/pull/919))

### Bug fixes

- Fixed unnecessary height on `TextField` due to unhandled carriage returns ([#901](https://github.com/Shopify/polaris-react/pull/901))
- Reverted a change that adjusted padding in the `Card` component introduced in ([#1205](https://github.com/Shopify/polaris-react/pull/1205))

### Documentation

- Added accessibility documentation for `Checkbox`, `RadioButton`, and `ChoiceList` ([#1145](https://github.com/Shopify/polaris-react/pull/1145))

### Development workflow

### Dependency upgrades

- Updated browserify example dependencies and dev dependencies ([#1191](https://github.com/Shopify/polaris-react/issues/1191))

### Code quality

- Replaced all occurrences of `_.pick` with a custom pick function ([#1020](https://github.com/Shopify/polaris-react/pull/1020))
- Deleted the icons index file that would re-export icons, and replaced it with direct imports ([#1195](https://github.com/Shopify/polaris-react/pull/1195))

### Deprecations
