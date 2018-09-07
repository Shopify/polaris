# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

---

### Enhancements

- Updated date filter labels in resource list ([2185](https://github.com/Shopify/polaris-react/pull/2185))
- Changed `placeholder` prop in `Select` to be the default selection ([#2115](https://github.com/Shopify/polaris-react/pull/2115))
- Added a `loading` prop to `ResourceList` that places a spinner overtop items and disables bulk actions ([#1922](https://github.com/Shopify/polaris-react/pull/1922))

### Documentation

- Clarified when and how to use icons in the banner component ([#2106](https://github.com/Shopify/polaris-react/pull/2106))
- Updated footer help component guidelines to include content instructions for app developers ([#2023](https://github.com/Shopify/polaris-react/pull/2023#pullrequestreview-150272766))

### Bug fixes

- Resource list component correctly handles inclusive filter keys ([#2189](https://github.com/Shopify/polaris-react/pull/2189))
- Date field in DateSelector now does not render an error when date is added by the date picker and field is blurred ([#2180](https://github.com/Shopify/polaris-react/pull/2180))
- Fixed pagination from firing keypress events while focus is inside inputs or contenteditables ([#1900](https://github.com/Shopify/polaris-react/pull/1900))
- Fixed `EmptyState` horizontally scrolling when fully condensed ([#2062](https://github.com/Shopify/polaris-react/pull/2062))
- Fixed the bottom margin of elements inside `Page` being ignored in some browsers ([#2142](https://github.com/Shopify/polaris-react/pull/2142))
- Added required `url` prop to `breadcrumbs` in `Page` component examples ([#2182](https://github.com/Shopify/polaris-react/pull/2182))
- Fixed `ActionList` wrapping text within a `Popover` ([#2057](https://github.com/Shopify/polaris-react/pull/2057))
