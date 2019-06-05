# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

**Use the `🤖Skip Changelog` label to ignore a failing changelog check** in your pull request if you feel the code changes do not warrant a changelog entry.

---

### Breaking changes

### Deprecations

- Deprecated passing a string representing a "bundled icon" into `<Icon source>` Pass in an svg component imported from `@shopify/polaris-icons` instead ([#1534](https://github.com/Shopify/polaris-react/pull/1534)).

### New components

### Enhancements

- Made the `action` prop optional on `EmptyState` ([#1583](https://github.com/Shopify/polaris-react/pull/1583))
- Prevented Firefox from showing an extra dotted border on focused buttons ([#1409](https://github.com/Shopify/polaris-react/pull/1409))
- Added `resolveItemId` prop to `ResourceList` which is used in the new multiselect feature ([#1261](https://github.com/Shopify/polaris-react/pull/1261))
- Added `actions` prop to `<Card.Section>` to allow you to easily define header actions in a card section ([#1598](https://github.com/Shopify/polaris-react/pull/1598))
- Added `<Card.Subsection>` to allow you to further subdivide `<Card.Section>` in a consistent manner ([#PR])(prlink)
- Removed transition on tag button hover state [#1337](https://github.com/Shopify/polaris-react/pull/1337)
- Added `textAlign` prop to Button ([#1576](https://github.com/Shopify/polaris-react/pull/1576))
- Made `Button` red when given both the `plain` and `destructive` props ([#1603](https://github.com/Shopify/polaris-react/pull/1603))

### Bug fixes

- Removed unnecessary border-radius from `Modal` body ([#1584](https://github.com/Shopify/polaris-react/pull/1584))
- Fixed accessibility issues in `DropZone`, `Form`, `Modal`, `Section`, `Page`, `Tabs`, `TextField` and `TopBar` ([#1565](https://github.com/Shopify/polaris-react/pull/1565),[#1582](https://github.com/Shopify/polaris-react/pull/1582)).
- Fixed inconsistent width depending on your browser/version in `Sheet` ([#1569](https://github.com/Shopify/polaris-react/pull/1569))
- Fixed text and other elements from being selected in Safari when dragging the color picker ([#1562](https://github.com/Shopify/polaris-react/pull/1562))
- Fixed `Banner` `title` overflowing when set to a single long word ([#1553](https://github.com/Shopify/polaris-react/pull/1553))
- Fixed improper spacing and coloring on a `TextField` prefix ([#1132](https://github.com/Shopify/polaris-react/issues/1132))
- Fixed `ResourcePicker` not updating function references for `onSelection` and `onCancel` callbacks [#1451](https://github.com/Shopify/polaris-react/pull/1451)
- Fixed `TextField` `label` being set as the value of the `label` node, as well as the `aria-label` `aria-labelledby` attributes, when only one method will suffice ([#1615](https://github.com/Shopify/polaris-react/pull/1615))

### Documentation

- Updated icon documentation to use imports from polaris-icons ([#1561](https://github.com/Shopify/polaris-react/pull/1561))
- Fixed an accessibility issue in the `Collapsible` component example ([#1591](https://github.com/Shopify/polaris-react/pull/1591))
- Added accessibility documentation for the `RangeSlider` component ([#1630](https://github.com/Shopify/polaris-react/pull/1630))
- Added accessibility documentation for the `Collapsible` component ([#1631](https://github.com/Shopify/polaris-react/pull/1631))
- Added accessibility documentation for the `Form` component ([#1636](https://github.com/Shopify/polaris-react/pull/1636))

### Development workflow

- Made the a11y test that runs in CI fail if it finds any issues ([#1564](https://github.com/Shopify/polaris-react/pull/1564))
- Updated Storybook to `v5.1.0-rc.4` ([#1616](https://github.com/Shopify/polaris-react/pull/1616))
- Fixed a visual regression testing issue with the Card component ([#1618](https://github.com/Shopify/polaris-react/pull/1618))
- Updated to sewing-kit v0.85.5 ([#1633](https://github.com/Shopify/polaris-react/pull/1633))

### Dependency upgrades

### Code quality

- Combined jsdocs in `Icon` for the `untrusted` prop ([#1607](https://github.com/Shopify/polaris-react/pull/1607))

### Deprecations

- Deprecated all usage of the Shopify App Bridge in Polaris React ([#1573](https://github.com/Shopify/polaris-react/pull/1573))
