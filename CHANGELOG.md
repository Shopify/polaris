# Changelog

All notable changes to this project will be documented in this file.

The format is based on [these versioning and changelog guidelines](https://git.io/polaris-changelog-guidelines).

<!-- Unreleased changes should go to UNRELEASED.md -->

---

## 4.27.0 - 2020-07-14

### Enhancements

- Removed padding from the details container in `EmptyState` to account for new illustration size ([#3069](https://github.com/Shopify/polaris-react/pull/3069))
- Added `blueDark` to the list of possible `color` values for an `Icon` with a backdrop ([#3076](https://github.com/Shopify/polaris-react/pull/3076))
- Improved responsive layout for secondary actions in `Banner` ([#3093](https://github.com/Shopify/polaris-react/pull/3093))

### Bug fixes

- Added `flex: 1 1 auto` to `Banner` `.ContentWrapper` CSS selector ([#3062](https://github.com/Shopify/polaris-react/pull/3062))
- Fixed mis-alignment on `Page` action rollup ([#3064](https://github.com/Shopify/polaris-react/pull/3064))
- Ensured Sass mixins can compile in Dart Sass ([#3064](https://github.com/Shopify/polaris-react/pull/3063))
- Added a border to `TextField` when focus is lost after autofill is implemented([#3075](https://github.com/Shopify/polaris-react/pull/3075))
- Fixed alignment of `ResourceItem` when there is no media ([#3080](https://github.com/Shopify/polaris-react/pull/3080))
- Fixed stacking order of `CloseButton` on `Modal` without a title ([#3077](https://github.com/Shopify/polaris-react/pull/3077))

### Documentation

- Updated AppProvider test component information (thanks to [@jprosevear](https://github.com/jprosevear) for the [pull request](https://github.com/Shopify/polaris-react/pull/3104))

### Development workflow

- Updated sewing-kit to v0.132.2 and storybook to v5.3.19 ([#3072](https://github.com/shopify/polaris-react/pull/3072))

### Code quality

- Migrated tests using document.activeElement to use react-testing ([#3070](https://github.com/Shopify/polaris-react/pull/3070))
- Reduced file size of the empty search SVG by 50% (from 12k to 6k gzipped) ([#3105](https://github.com/Shopify/polaris-react/pull/3105))

## 4.26.1 - 2020-06-16

### Code quality

- Default to `any` for ItemType in resource list ([#3059](https://github.com/Shopify/polaris-react/pull/3059))

## 4.26.0 - 2020-06-16

### Enhancements

- Added spacing to `EmptyState` when within content to account for new illustration styles ([#3047](https://github.com/Shopify/polaris-react/pull/3047))
- Changed Resource List to a generic functional component (thanks to [@athornburg](https://github.com/Shopify/polaris-react/pull/2843))
- Made the `renderItem` function infer the type of the items prop (thanks to [@athornburg](https://github.com/Shopify/polaris-react/pull/2843))
- Added a `fullWidth` prop to `EmptyState` to support full width layout within a content context ([#2992](https://github.com/Shopify/polaris-react/pull/2992))
- Added an `emptyState` prop to `ResourceList` to support in context empty states in list views ([#2569](https://github.com/Shopify/polaris-react/pull/2569))
- Set `active` prop of `Popover` to true on keyDown in `ComboBox` to fix `Autocomplete` suggestions not showing when searching and selecting via keyboard ([#3028](https://github.com/Shopify/polaris-react/pull/3028))
  Set `active` prop of `Popover` to true on keyDown in `ComboBox` to fix `Autocomplete` suggestions not showing when searching and selecting via keyboard ([#3028](https://github.com/Shopify/polaris-react/pull/3028))
- Increased the max-width of the `EmptyState` content to 400px ([#3040](https://github.com/Shopify/polaris-react/pull/3040))

## 4.25.2 - 2020-06-16

### Enhancements

⚠️ This release was released as a patch version in error. Please use v4.26.0.

- Added spacing to `EmptyState` when within content to account for new illustration styles ([#3047](https://github.com/Shopify/polaris-react/pull/3047))
- Changed Resource List to a generic functional component (thanks to [@athornburg](https://github.com/Shopify/polaris-react/pull/2843))
- Made the `renderItem` function infer the type of the items prop (thanks to [@athornburg](https://github.com/Shopify/polaris-react/pull/2843))
- Added a `fullWidth` prop to `EmptyState` to support full width layout within a content context ([#2992](https://github.com/Shopify/polaris-react/pull/2992))
- Added an `emptyState` prop to `ResourceList` to support in context empty states in list views ([#2569](https://github.com/Shopify/polaris-react/pull/2569))
- Set `active` prop of `Popover` to true on keyDown in `ComboBox` to fix `Autocomplete` suggestions not showing when searching and selecting via keyboard ([#3028](https://github.com/Shopify/polaris-react/pull/3028))
  Set `active` prop of `Popover` to true on keyDown in `ComboBox` to fix `Autocomplete` suggestions not showing when searching and selecting via keyboard ([#3028](https://github.com/Shopify/polaris-react/pull/3028))
- Increased the max-width of the `EmptyState` content to 400px ([#3040](https://github.com/Shopify/polaris-react/pull/3040))

### Development workflow

- Updated how global animations are referenced, in order to publish a single entrypoint for the public Sass API (`styles/_public-api.scss`), instead of two (`styles/_public-api.scss` for “vanilla” SCSS and `styles/esnext/_public-api.scss` for CSS Modules) ([#3032](https://github.com/Shopify/polaris-react/pull/3032))

### Code quality

- Deleted an unused prop and its types in `Navigation` ([#3043](https://github.com/Shopify/polaris-react/pull/3043))

## 4.25.1 - 2020-06-10

### Bug fixes

- Fix latest release on NPM

## 4.25.0 - 2020-06-04

### Enhancements

- Added `ReactNode` as an accepted prop type to `primaryAction` on the `Page` component ([#3002](https://github.com/Shopify/polaris-react/pull/3002))

## 4.24.0 - 2020-05-28

### Enhancements

- Added a `fullWidth` prop to `ContextualSaveBar` to support full width layout within a content context ([#3014](https://github.com/Shopify/polaris-react/pull/3014))
- Added an optional `size` prop to `MediaCard` to support varying media sizes in the card ([#3013](https://github.com/Shopify/polaris-react/pull/3013))

## 4.23.0 - 2020-05-28

### Enhancements

- Added a `fullWidth` prop to `EmptyState` to support full width layout within a content context ([#2992](https://github.com/Shopify/polaris-react/pull/2992))
- Added an `emptyState` prop to `ResourceList` to support in context empty states in list views ([#2569](https://github.com/Shopify/polaris-react/pull/2569))
- Improved top bar transitions when theme changes ([#3007](https://github.com/Shopify/polaris-react/pull/3007))

### Bug fixes

- Fixed incorrect `icon` color of `Button` when `destructive` and `plain` ([#2958](https://github.com/Shopify/polaris-react/issues/2958))

### Development workflow

- Improved speed of type-check and build by enabling TypeScript's `skipLibCheck` option ([#2981](https://github.com/Shopify/polaris-react/pull/2981))

### Dependency upgrades

- Updated TypeScript to 3.9.2 ([#2981](https://github.com/Shopify/polaris-react/pull/2981))

## 4.22.0 - 2020-05-11

### Enhancements

- Truncated long sort options in `ResourceList` ([#2957](https://github.com/Shopify/polaris-react/pull/2957)
- Updated type restrictions for `Pagination` to allow its `label` prop to accept `React.ReactNode` instead of `string` ([#2972](https://github.com/Shopify/polaris-react/pull/2972))
- Added an `emptySearchState` prop to `ResourceList` to enable the customization of the empty search state ([#2971](https://github.com/Shopify/polaris-react/pull/2971))

### Bug fixes

- Added an outline on `Banner` for Windows high contrast mode ([#2878](https://github.com/Shopify/polaris-react/pull/2878))
- Fixed Autocomplete / ComboBox focus ([#1089](https://github.com/Shopify/polaris-react/issues/1089))
- Fixed missing rounded corners on `Banner` ([#2975](https://github.com/Shopify/polaris-react/pull/2975))
- Fixed typing for `EmptyState` action ([#2977](https://github.com/Shopify/polaris-react/pull/2977))

### Code quality

- Converted `ComboBox` to a functional component ([#2918](https://github.com/Shopify/polaris-react/pull/2918))

### Deprecations

- Deprecated `styles/foundation.scss` and `styles/shared.scss` as entry points to the Polaris Sass public API. They have been replaced with a single file `styles/_public-api.scss`. By having a single entry point we make it a little easier for consuming applications to use our public API - you only need to import one file instead of two. Any references to these two files should be replaced with a reference to `_public-api.scss` which lives in the same folder. Consuming applications using sewing-kit should replace references to `esnext/styles/foundation.scss` and `esnext/styles/shared.scss` with a single reference to `esnext/styles/_public-api.scss`. Note the API itself has not changed - only the mechanism by which you access it. ([#2974](https://github.com/Shopify/polaris-react/pull/2974))

## 4.21.0 - 2020-04-28

### Enhancements

- Added `additionalNavigation` prop to `Page` ([#2942](https://github.com/Shopify/polaris-react/pull/2942))

## 4.20.1 - 2020-04-23

### Bug fixes

- Fixed performance of `ResourceItem` due to inclusion of `children` in deep prop comparison within `shouldComponentUpdate` ([#2936](https://github.com/Shopify/polaris-react/pull/2936))

## 4.20.0 - 2020-04-22

### Enhancements

- Removed `max-height` property from `Tooltip` (thanks to [@thayannevls](https://github.com/thayannevls) for the [pull request](https://github.com/Shopify/polaris-react/pull/2908))
- Update `TopBar.Menu` to be properly themed in active, hover and focused state ([#2928](https://github.com/Shopify/polaris-react/pull/2928))
- Added a centeredLayout prop to `EmptyState` ([#2939](https://github.com/Shopify/polaris-react/pull/2939))

### Bug fixes

- Fixed `Tag` submitting forms when `onClick` is set ([#2895](https://github.com/Shopify/polaris-react/pull/2895))
- Fixed `DescriptionList` content overflowing when `term` or `description` have long unbroken words ([#2880](https://github.com/Shopify/polaris-react/pull/2880))
- Fixed focusing bug on Filters where a newly opened filter would not initially focus the first input, and a newly opened filter would incorrectly focus after an input selection ([#2871](https://github.com/Shopify/polaris-react/pull/2871))

### Development workflow

- Fixed automatic pull request generation for `web` and `styleguide` when updating Polaris ([#2892](https://github.com/Shopify/polaris-react/pull/2892))
- Added an example to `Layout` that showcases how to space a banner ([#2929](https://github.com/Shopify/polaris-react/pull/2929))

## 4.19.0 - 2020-04-15

### Enhancements

- Updated `Filters` to only show the "More filters" button if necessary ([#2856](https://github.com/Shopify/polaris-react/pull/2856)).
- Updated `TopBar` component to show `secondaryMenu` on small screens ([#2913](https://github.com/Shopify/polaris-react/pull/2913))
- `Badge` adds `critical` status prop styling ([#2902](https://github.com/Shopify/polaris-react/pull/2902))

### Bug fixes

- Added `border-radius` to the `MediaCard` container ([#2919](https://github.com/Shopify/polaris-react/pull/2919))

### Code quality

- Set `importsNotUsedAsValues` to `error` in TypeScript configuration to force us to be explicit when importing types ([#2901](https://github.com/Shopify/polaris-react/pull/2901))

## 4.18.0 - 2020-04-09

### New components

- Added [`MediaCard`](https://polaris.shopify.com/components/structure/video-card) and [`VideoThumbnail`](https://polaris.shopify.com/components/images-and-icons/video-thumbnail) ([#2725](https://github.com/Shopify/polaris-react/pull/2725))
- Added [`VideoThumbnail`](https://polaris.shopify.com/components/images-and-icons/video-thumbnail) ([#2725](https://github.com/Shopify/polaris-react/pull/2725))

### Enhancements

- Added utilities for parsing video duration (https://polaris.shopify.com/components/images-and-icons/video-thumbnail) ([#2725](https://github.com/Shopify/polaris-react/pull/2725))

### Dependency upgrades

- Updated polaris-tokens to use new font stack ([#2906](https://github.com/Shopify/polaris-react/pull/2906))

## 4.17.1 - 2020-04-06

### Bug fixes

- `TopBar` navigation icon to use the `var(--top-bar-color)` ([#2898](https://github.com/Shopify/polaris-react/pull/2898)).

### Documentation

- Fixed two typos in the `Form` documentation ([#2879](https://github.com/Shopify/polaris-react/pull/2879))

### Code quality

- Don't use `export *` when exporting from type-only files as importing empty files causes webpack to produce unwanted boilerplate ([#2897](https://github.com/Shopify/polaris-react/pull/2897))

## 4.17.0 - 2020-04-03

### Enhancements

- Added `showFocusBorder` prop to the `TopBar.SearchField` to allow users to add show a border on focus ([#2886](https://github.com/Shopify/polaris-react/pull/2886)).
- Added a theme prop for `frameOffset` ([#2887](https://github.com/Shopify/polaris-react/pull/2887))
- Updated the font stack to put `Segoe UI` before `Roboto` ([#2891](https://github.com/Shopify/polaris-react/pull/2891))

### Bug fixes

- Fixed right padding styling issue with the `Tag` component and remove right padding on a removable `Tag` ([#2860](https://github.com/Shopify/polaris-react/pull/2860)).
- Fixed secondary navigation spacing when no icon is present ([#2874](https://github.com/Shopify/polaris-react/pull/2874)).

### Dependency upgrades

- Updated sewing-kit to v0.120.0, and typescript to 3.8.3 ([#2873](https://github.com/Shopify/polaris-react/pull/2873))

### Code quality

- Use `downlevel-dts` to produce compatible type definitions for consuming apps using older TypeScript versions ([#2875](https://github.com/Shopify/polaris-react/pull/2875))

## 4.16.1 - 2020-03-19

- Made no noteworthy changes

## 4.16.0 - 2020-03-13

### Enhancements

- Added optional `onClick` prop to `Tag` ([#2774](https://github.com/Shopify/polaris-react/pull/2774))
- Added transition properties to `Collapsible` ([#2835](https://github.com/Shopify/polaris-react/pull/2835))

### Bug fixes

- Fixed issue with passed to `ComboBox` component options prop was mutated ([#2818](https://github.com/Shopify/polaris-react/pull/2818))
- Fixed an issue which caused `Popover` to close when clicking on a descendant SVG ([#2827](https://github.com/Shopify/polaris-react/pull/2827))

### Code quality

- Removed redundant null check in `TextField` ([#2783](https://github.com/Shopify/polaris-react/pull/2783))

## 4.15.2 - 2020-03-09

### Code quality

- Updated shrink-ray to v2 ([#2800](https://github.com/Shopify/polaris-react/pull/2800))

## 4.15.1 - 2020-03-07

### Bug fixes

- Reverted const context type to support older versions of typescript in consuming apps ([e7c5e16](https://github.com/Shopify/polaris-react/commit/e7c5e16e8e7b2e70993c5e33c6e34bea428b35b8))
- Fixed broken link in `ThemeProvider` docs ([0ff672d](https://github.com/Shopify/polaris-react/commit/0ff672d2802cb6f4832176de889fe2ab39b101f0))

## 4.15.0 - 2020-03-06

### Enhancements

- Added high contrast outline to `Popover`, `Card` and `Indicator` ([#2792](https://github.com/Shopify/polaris-react/pull/2792))
- Removed `overflow: hidden` from `Card` ([#2806](https://github.com/Shopify/polaris-react/pull/2806))
- Truncated long sort options in `ResourceList` ([#2809](https://github.com/Shopify/polaris-react/pull/2809)

### Bug fixes

- Fixed incorrect used while importing from `polaris-tokens` ([#2778](https://github.com/Shopify/polaris-react/pull/2778))
- Fixed `DropZone` not supporting new file selection when `allowMultiple` is `false` ([#2737](https://github.com/Shopify/polaris-react/pull/2737))
- Fixed `Pagination` sizing on small screens with tooltips ([2747](https://github.com/Shopify/polaris-react/pull/2747))
- Fixed `Popover` setting a `tabindex` and other accessibility attributes on the activator wrapper when the `activator` is disabled ([#2473](https://github.com/Shopify/polaris-react/pull/2473))
- Added a `verticalAlignment` prop to `ResourceItem` to support control of content alignment ([#2743](https://github.com/Shopify/polaris-react/pull/2743)

### Development workflow

- Added `check:custom-property` job in travis ([#2778](https://github.com/Shopify/polaris-react/pull/2778))
- Exported missing OptionListProps ([#2777](https://github.com/Shopify/polaris-react/pull/2777))
- Omitted the Storybook `AppProvider` decorator for component examples which already contain an `AppProvider` ([#2807](https://github.com/Shopify/polaris-react/pull/2807))
- Added an `omitAppProvider` front matter concept to prevent automatic wrapping of component examples with an `AppProvider` ([#2815](https://github.com/Shopify/polaris-react/pull/2815))

### Code quality

- Removed various type assertions and bumped test coverage ([#2638](https://github.com/Shopify/polaris-react/pull/2638))

## 4.14.0 - 2020-02-26

### Enhancements

- Added high contrast outline to `ActionList` ([#2713](https://github.com/Shopify/polaris-react/pull/2713))
- Added high contrast border to `Button` ([#2712](https://github.com/Shopify/polaris-react/pull/2712))
- Added styled placeholder image to `Avatar` when initials are blank ([#2693](https://github.com/Shopify/polaris-react/pull/2693))
- Added a `preferInputActivator` prop to `Popover` to allow better positioning of the overlay ([#2754](https://github.com/Shopify/polaris-react/pull/2754))

### Bug fixes

- Updated Polaris Tokens, which now builds modern tokens using TypeScript, fixing issues where Edge threw errors related to modern JavaScript features ([#2763](https://github.com/Shopify/polaris-react/pull/2763))
- Fixed `TrapFocus` stealing focus from other `TrapFocus`'s ([#2681](https://github.com/Shopify/polaris-react/pull/2681))
- Fixed focus state color on monochrome `Buttons` ([#2684](https://github.com/Shopify/polaris-react/pull/2684))
- Fixed container's width on `Modal` ([#2692](https://github.com/Shopify/polaris-react/pull/2692))
- Fixed the position property for the backdrop on `Select` from being overwritten by the focus ring ([#2748](https://github.com/Shopify/polaris-react/pull/2748))
- Fixed `ResourceItem` `Actions` visibility on mouse out ([#2742](https://github.com/Shopify/polaris-react/pull/2742))
- Fixed initial server / client render mismatch in `Avatar` ([#2751](https://github.com/Shopify/polaris-react/pull/2751))

### Development workflow

- Added first implementation of custom property validation ([#2616](https://github.com/Shopify/polaris-react/pull/2616))
- Refactored consumer build test (renamed to system integration test) ([#2735](https://github.com/Shopify/polaris-react/pull/2735))
- Added Storybook Knobs for customizing theme ([#2674](https://github.com/Shopify/polaris-react/pull/2674))

### Code quality

- Updated dependencies in example apps ([#2722](https://github.com/Shopify/polaris-react/pull/2722))
- Fixed `Tabs` tests that were preventing `React` updates ([#2702](https://github.com/Shopify/polaris-react/pull/2702))
- Moved to Travis for CI ([#2652](https://github.com/Shopify/polaris-react/pull/2652))

---

## 4.13.1 - 2020-02-02

### Bug fixes

- Fixed a Sass build error ([#2453](https://github.com/Shopify/polaris-react/pull/2703))

---

## 4.13.0 - 2020-02-02

### Enhancements

- Replaced customer avatar images ([#2453](https://github.com/Shopify/polaris-react/pull/2453))
- Added an optional `totalsName` prop to `DataTable` to support custom headings in the totals row ([#2660](https://github.com/Shopify/polaris-react/pull/2660))
- Added `cursor: pointer` to `Choice` ([#2491](https://github.com/Shopify/polaris-react/pull/2491))

### Bug fixes

- Fixed `Uncaught TypeError: Cannot read property 'rightEdge' of undefined` in `DataTable` ([#2672](https://github.com/Shopify/polaris-react/pull/2672))
- Fixed excessive rendering in `DatePicker` ([#2671](https://github.com/Shopify/polaris-react/pull/2671))
- Fixed plurality of `DataTable` totals row heading ([#2660](https://github.com/Shopify/polaris-react/pull/2660))

### Documentation

- Changed placeholder product names in `Card` code examples ([#2677](https://github.com/Shopify/polaris-react/pull/2677))

---

## 4.12.0 - 2020-01-27

### Enhancements

- Added a split variant to `Button` ([#2329](https://github.com/Shopify/polaris-react/pull/2329))
- Allow DataTable headers to be React Elements ([#2635](https://github.com/Shopify/polaris-react/pull/2635))
- Added support for explicit order of items in `ActionMenu` ([2057](https://github.com/Shopify/polaris-react/pull/2057))
- Made the `DataTable` horizontal `Navigation` optional ([#2647](https://github.com/Shopify/polaris-react/pull/2647))

### Bug fixes

- Fixed `ReferenceError: React is not defined` in `Button` for the `esnext` build ([#2657](https://github.com/Shopify/polaris-react/pull/2657))
- Fixed scrolling with scrollbar not working in Popover when content changes on scroll ([#2627](https://github.com/Shopify/polaris-react/pull/2627))
- Fixed side-effects from being create during `Modal`s render ([#2644](https://github.com/Shopify/polaris-react/pull/2644))
- Work around a build crash when using create-react-app due to a bug in css parsing in `postcss-custom-properties` ([#2643](https://github.com/Shopify/polaris-react/pull/2643))
- Removed the `visited` CSS styling for tabs using the `url` prop ([#2639](https://github.com/Shopify/polaris-react/pull/2639))

### Development workflow

- Reworked the yarn splash Github comment and added average splash zone information ([#2649](https://github.com/Shopify/polaris-react/pull/2649))
- Re-enabled the web unit tests in the consumer build test ([#2663](https://github.com/Shopify/polaris-react/pull/2663))

### Code quality

- Converted `/tests/build.test.js` to TypeScript ([#2617](https://github.com/Shopify/polaris-react/pull/2617))
- Use `export *` to rexport component content in component indexs and subcomponent listings ([#2625](https://github.com/Shopify/polaris-react/pull/2625))
- Use `export *` to rexport utility content ([#2636](https://github.com/Shopify/polaris-react/pull/2636))

## 4.11.0 - 2020-01-17

### Breaking changes

- Remove unstable telemetry API for icons ([#2561](https://github.com/Shopify/polaris-react/pull/2561))

### Enhancements

- Added `hideTags` prop to `Filters` ([#2573](https://github.com/Shopify/polaris-react/pull/2573))
- Added `searchResultsOverlayVisible` prop to `TopBar` which adds a translucent background to the search dismissal overlay when results are displayed ([#2440](https://github.com/Shopify/polaris-react/pull/2440))

### Bug fixes

- Fixed a bug where `Navigation` calls `onNavigationDismiss` on large screens when focused and the escape key is pressed ([#2607](https://github.com/Shopify/polaris-react/pull/2607))
- Fixed issue with `Filters` component displaying an undesired margin top and bottom on the button element on Safari ([#2292](https://github.com/Shopify/polaris-react/pull/2292))
- Fixed `RangeSlider` focus state style issues ([#1926](https://github.com/Shopify/polaris-react/pull/1926))
- Ensure passing `{key: undefined}` into i18n will throw a runtime error in the same way as not passing in the key at all (this was ensured through type-checking at the TypeScript level but people could force through with casting to `any`) ([#2598](https://github.com/Shopify/polaris-react/pull/2598))
- Ensure the normalizedValue within `TextField` is a string (this was already ensured through type-checking at the TypeScript level, but people could force through with casting to `any`, which caused problems) ([#2598](https://github.com/Shopify/polaris-react/pull/2598))

- Fixed an issue with the `Filters` component where the `aria-expanded` attribute was `undefined` on mount ([#2589](https://github.com/Shopify/polaris-react/pull/2589))
- Fixed `TrapFocus` from tabbing out of the container ([#2555](https://github.com/Shopify/polaris-react/pull/2555))
- Fixed `PositionedOverlay` not correctly getting its position when aligned to the right of the activator ([#2587](https://github.com/Shopify/polaris-react/pull/2587))
- Search dismissal overlay now covers the entire screen ([#2440](https://github.com/Shopify/polaris-react/pull/2440))
- Search results component will no longer unmount when hidden ([#2440](https://github.com/Shopify/polaris-react/pull/2440))
- Search results will now match the width of the search field ([#2440](https://github.com/Shopify/polaris-react/pull/2440))

### Documentation

- Updated `Card` with custom footer actions example to be right-aligned ([#2603](https://github.com/Shopify/polaris-react/pull/2603))
- Updated styleguide links in the docs ([#2521](https://github.com/Shopify/polaris-react/pull/2521))
- Updated `Subheading` documentation to be more consistent and accurate ([#2591](https://github.com/Shopify/polaris-react/pull/2591/))

### Development workflow

- Updated Storybook to v5.3.2 ([#2618](https://github.com/Shopify/polaris-react/pull/2618))

### Dependency upgrades

- Updated `@shopify/polaris-icons` to v3.9.0 ([#2610](https://github.com/Shopify/polaris-react/pull/2610))

### Code quality

- Converted `MenuGroup` into a functional component ([#2536](https://github.com/Shopify/polaris-react/pull/2536))
- Converted `Layout` into a functional component ([#2538](https://github.com/Shopify/polaris-react/pull/2538))
- Converted `FormLayout` into a functional component ([#2539](https://github.com/Shopify/polaris-react/pull/2539))
- Converted `Stack` into a functional component ([#2534](https://github.com/Shopify/polaris-react/pull/2534))
- Converted `BulkActionButton` into a functional component ([#2542](https://github.com/Shopify/polaris-react/pull/2542))
- Converted `Focus` into a functional component ([#2540](https://github.com/Shopify/polaris-react/pull/2540))
- Converted `Tabmeasurer` into a functional component ([#2535](https://github.com/Shopify/polaris-react/pull/2535))
- Converted `Section` into a functional component ([#2537](https://github.com/Shopify/polaris-react/pull/2537))
- Converted `Tooltip` into a functional component ([#2543](https://github.com/Shopify/polaris-react/pull/2543))
- Converted `Option` into a functional component ([#2541](https://github.com/Shopify/polaris-react/pull/2541))
- Avoided unneeded work in `TextField` if character count is not rendered ([#2598](https://github.com/Shopify/polaris-react/pull/2598))

---

## 4.10.2 - 2019-12-20

### Bug fixes

- Fixed errors when consuming apps manage to pass `undefined` as a value into an translation replacements object ([#2579](https://github.com/Shopify/polaris-react/pull/2579))

## 4.10.1 - 2019-12-20

### Bug fixes

- Fixed type-error in `TrapFocus` that caused `querySelector` to run on null ([#2574](https://github.com/Shopify/polaris-react/pull/2574))

### Development workflow

- Refactored I18n class ([#2562](https://github.com/Shopify/polaris-react/pull/2562))

## 4.10.0 - 2019-12-18

### Bug fixes

- Fixed `TextField` to no longer render `aria-invalid="false"`. Thank you to [@alexcleduc](https://github.com/AlexCLeduc) for the contribution ([#2339](https://github.com/Shopify/polaris-react/pull/2339)).
- Fixed `TextField` to only render `min` ,`max` and `step` attributes when explicitly passed. Thank you to [@alexcleduc](https://github.com/AlexCLeduc) for the contribution ([#2339](https://github.com/Shopify/polaris-react/pull/2339)).
- Removed reference to `document` in `DropZone` ([#2560](https://github.com/Shopify/polaris-react/pull/2560))
- Fixed Firefox issue in in `DropZone` ([#2568](https://github.com/Shopify/polaris-react/pull/2568))
- Fixed layout issue `DropZone` ([#2568](https://github.com/Shopify/polaris-react/pull/2568))

### Dependency upgrades

- Updated to TypeScript 3.7 ([#2549](https://github.com/Shopify/polaris-react/pull/2549))
- Updated stylelint-config-shopify to 7.4.0 ([#2558](https://github.com/Shopify/polaris-react/pull/2558))

## 4.9.1 - 2019-12-11

### Bug fixes

- Removed reference to `window` in `DropZone` ([#2532](https://github.com/Shopify/polaris-react/pull/2532))
- Fixed a regression in `TrapFocus` that prevented focus outside of an `iframe` ([#2530](https://github.com/Shopify/polaris-react/pull/2530))

### Documentation

- Changed a link to the Polaris icons documentation so it would point to npm (a public resource) rather than the `Shopify/polaris-icons` repository (which is now private) ([#2452](https://github.com/Shopify/polaris-react/pull/2452))

## 4.9.0 - 2019-12-06

### Enhancements

- Added `external` prop to `ResourceList` ([#2408](https://github.com/Shopify/polaris-react/pull/2408))
- Added `onMouseEnter` and `onTouchStart` props to `Button` ([#2409](https://github.com/Shopify/polaris-react/pull/2409))
- Added `ariaHaspopup` prop to `Popover` ([#2248](https://github.com/Shopify/polaris-react/pull/2248))
- Moved `Button` styles from the `Buttongroup` CSS file to the `Button` CSS file ([#2441](https://github.com/Shopify/polaris-react/pull/2441))
- Added `footerActionAlignment` prop to control `<Card>` footer action alignment, defaults to `'right'` ([#2407](https://github.com/Shopify/polaris-react/pull/2407))
- Improved contrast of `MessageIndicator` with a border ([#2428](https://github.com/Shopify/polaris-react/pull/2428))
- Removed the need for z-indexes in `Icon` ([#2207](https://github.com/Shopify/polaris-react/pull/2207))
- Added `features` prop to `AppProvider` ([#2204](https://github.com/Shopify/polaris-react/pull/2204))
- Added support for using `EmptyState` in a content context ([#1570](https://github.com/Shopify/polaris-react/pull/1570))
- `Page` no longer renders navigation or actions in print mode ([#2469](https://github.com/Shopify/polaris-react/pull/2469))
- Migrated `Dropzone` to a functional component and reduced its complexity ([#2360](https://github.com/Shopify/polaris-react/pull/2360))
- Added `fluidContent` prop to `Popover` ([#2494](https://github.com/Shopify/polaris-react/pull/2494))

### Bug fixes

- Prevented scrolling to `Popover` content in development ([#2403](https://github.com/Shopify/polaris-react/pull/2403))
- Fixed an issue which caused HSL colors to not display in Edge ([#2418](https://github.com/Shopify/polaris-react/pull/2418))
- Fixed an issue where the `DropZone` component jumped from an extra-large layout to a layout based on the width of its container ([#2412](https://github.com/Shopify/polaris-react/pull/2412))
- Fixed an issue which caused HSL colors to not display in Edge ([#2418](https://github.com/Shopify/polaris-react/pull/2418))
- Changed `Button`’s `disclosure` prop to be `boolean | "up" | "down"`, allowing greater control over the direction the disclosure caret faces ([#2431](https://github.com/Shopify/polaris-react/pull/2431))
- Added the top bar height to the `Topbar` in `Frame` to ensure the `Sticky` components get the correct top position ([#2415](https://github.com/Shopify/polaris-react/pull/2415))
- Stopped the `merge` utility function from mutating the objects passed as arguments ([#2317](https://github.com/Shopify/polaris-react/pull/2317))
- Updated `Card` footer actions to be right aligned by default again ([#2407](https://github.com/Shopify/polaris-react/pull/2407))
- Fixed the `EmptyState` styles conditional on the `imageContained` prop not being applied ([#2477](https://github.com/Shopify/polaris-react/pull/2477))
- Fixed `TrapFocus` to keep focus within the container when tabbing past the last element ([#2397](https://github.com/Shopify/polaris-react/pull/2397))
- Fixed an accessibility issue where the `Form` implicit submit was still accessible via keyboard ([#2447](https://github.com/Shopify/polaris-react/pull/2447))

### Documentation

- Added a details page and kitchen sink example to Storybook ([#2402](https://github.com/Shopify/polaris-react/pull/2402))
- Combined the interface used by `Page` so the types can be parsed ([#2358](https://github.com/Shopify/polaris-react/pull/2358))
- Updated the `PageActions` example ([#2471](https://github.com/Shopify/polaris-react/pull/2471))
- Fixed spacing of the `Filters` data table example ([#2477](https://github.com/Shopify/polaris-react/pull/2477))
- Fixed duplicate and unclear prop descriptions of `EmptyState` ([#2477](https://github.com/Shopify/polaris-react/pull/2477))
- Added an example for a light `Tooltip` ([#2434](https://github.com/Shopify/polaris-react/pull/2434))

### Development workflow

- Updated splash Github Action to the latest Docker beta version ([#2474](https://github.com/Shopify/polaris-react/pull/2474))
- Updated local splash script to use npm package @shopify/splash ([#2474](https://github.com/Shopify/polaris-react/pull/2474))
- Added `dev test:coverage` as an alias for `yarn test:coverage` ([#2496](https://github.com/Shopify/polaris-react/pull/2496))
- Added `dev open coverage` and `yarn open:coverage` commands to open the coverage report ([#2496](https://github.com/Shopify/polaris-react/pull/2496))
- Fixed `yarn test:coverage` so it generates a coverage report ([#2496](https://github.com/Shopify/polaris-react/pull/2496))
- Updated `yarn test:coverage` so it automatically opens the coverage report when complete ([#2496](https://github.com/Shopify/polaris-react/pull/2496))

### Dependency upgrades

- Upgraded to `@shopify/react-testing v1.8.0` ([#2465](https://github.com/Shopify/polaris-react/pull/2465))
- Upgraded to Prettier to `v1.19.1` ([#2443](https://github.com/Shopify/polaris-react/pull/2443))

### Code quality

- Changed `TextField` to use a custom hook ([#2464](https://github.com/Shopify/polaris-react/pull/2464))
- Changed `aria-labelledby` to always exist on `TextField` ([#2401](https://github.com/Shopify/polaris-react/pull/2401))
- Converted `ButtonGroup > Item` into a functional component ([#2441](https://github.com/Shopify/polaris-react/pull/2441))
- Refactored `BulkActions` to make use of `ButtonGroup` ([#2441](https://github.com/Shopify/polaris-react/pull/2441))

## 4.8.0 - 2019-11-12

### Enhancements

- Updated `Popover` to focus the correct element when closed ([#2255](https://github.com/Shopify/polaris-react/pull/2255))
- Updated the type of the `title` prop in `ChoiceList` from `string` to `ReactNode` ([#2355](https://github.com/Shopify/polaris-react/pull/2355))
- Added `disabled` prop to `Filters` component ([#2389](https://github.com/Shopify/polaris-react/pull/2389))
- Added `helpText` prop to `Filters` component ([#2389](https://github.com/Shopify/polaris-react/pull/2389))

### Bug fixes

- Fixed an issue where types were not generated for a JSON config file ([#2361](https://github.com/Shopify/polaris-react/pull/2361))

### Development workflow

- Enabled maintainers running `yarn dev` to hide [`yarn splash`](https://github.com/Shopify/polaris-react/tree/master/scripts/splash) reports from the console by running `DISABLE_SPLASH=1 yarn dev` ([#2372](https://github.com/Shopify/polaris-react/pull/2372))
- Updated to sewing-kit 0.112.0 and eslint 6 and updated vscode config to use the eslint plugin to format js/ts files ([#2369](https://github.com/Shopify/polaris-react/pull/2369))

### Code quality

- Migrated `Popover` to use hooks ([#2386](https://github.com/Shopify/polaris-react/pull/2386))

## 4.7.3 - 2019-10-31

### Enhancements

- Added unstable telemetry API to gather analytics about icon usage ([#2368](https://github.com/Shopify/polaris-react/pull/2368))

### Bug fixes

- Fixed an accessibility issue with `TextField` `multiline` where `aria-multiline` would be set to an invalid type `number` ([#2351](https://github.com/Shopify/polaris-react/pull/2351))
- Revert [#2231](https://github.com/Shopify/polaris-react/pull/2351) as it breaks middle aligned popovers ([#2237](https://github.com/Shopify/polaris-react/pull/2237))
- Fixed alignement of disclosure icons on `ResourceItem` ([#2370](https://github.com/Shopify/polaris-react/pull/2370))

## 4.7.2 - 2019-10-30

### Bug fixes

- Fixed a bug with `TextField` which caused infinite layout and high CPU load in Safari, related to [WebKit Bug 194332](https://bugs.webkit.org/show_bug.cgi?id=194332) ([#2379](https://github.com/Shopify/polaris-react/pull/2379))
- Fixed an accessibility issue with `TextField` `multiline` where `aria-multiline` would be set to an invalid type `number` ([#2351](https://github.com/Shopify/polaris-react/pull/2351))
- Fixed alignment of disclosure icons on `ResourceItem` ([#2370](https://github.com/Shopify/polaris-react/pull/2370))

### Documentation

- Updated the `AppProvider` section in the Polaris [v3 to v4 migration guide](https://github.com/Shopify/polaris-react/blob/master/documentation/guides/migrating-from-v3-to-v4.md) ([#2312](https://github.com/Shopify/polaris-react/pull/2312))
- Updated the `Using translations` section in the [AppProvider README](https://github.com/Shopify/polaris-react/blob/master/src/components/AppProvider/README.md#using-translations) ([#2312](https://github.com/Shopify/polaris-react/pull/2312))

### Development workflow

- Removed the need to upload assets with each release ([#2346](https://github.com/Shopify/polaris-react/pull/2346))

### Code quality

- Migrated `FilterValueSelector` to use hooks instead of withAppProvider ([#2156](https://github.com/Shopify/polaris-react/pull/2156))
- Added `useIsMountedRef` hook to use while building components ([#2167](https://github.com/Shopify/polaris-react/pull/2167))

## 4.7.1 - 2019-10-23

### Bug fixes

- Fixed a bug with `Button` which caused infinite layout and high CPU load in Safari, related to [WebKit Bug 194332](https://bugs.webkit.org/show_bug.cgi?id=194332) ([#2350](https://github.com/Shopify/polaris-react/pull/2350))

## 4.7.0 - 2019-10-22

### Enhancements

- Updated `OptionList` section title to match `ActionList` section title ([#2300](https://github.com/Shopify/polaris-react/pull/2300))
- Added `pressed` state to `Button` ([#2148](https://github.com/Shopify/polaris-react/pull/2148))
- Updated the type of the `label` prop in `ChoiceList` (nested prop of `choices`) from `string` to `ReactNode` ([#2325](https://github.com/Shopify/polaris-react/pull/2325)).

### Bug fixes

- Fixed `actionGroups` to only render `MenuActions` when actions are provided in the `Page` ([#2266](https://github.com/Shopify/polaris-react/pull/2266))
- Fixed `PositionedOverlay` incorrectly calculating `Topbar.UserMenu` `Popover` width ([#2231](https://github.com/Shopify/polaris-react/pull/2231))
- Fixed `recolor-icon` Sass mixin to properly scope `$secondary-color` to the child `svg` ([#2298](https://github.com/Shopify/polaris-react/pull/2298))
- Fixed an issue with the `ResourceList` component where the plural resource name was not used for `totalItemsCount` ([#2301](https://github.com/Shopify/polaris-react/issues/2301))
- Fixed Stack Item proportion when shrinking ([#2319](https://github.com/Shopify/polaris-react/pull/2319))
- Fixed animation of `Collapsible` with children having margins ([#1980](https://github.com/Shopify/polaris-react/pull/1980))
- Added vertical adjustment to `OptionList` control items ([#2313](https://github.com/Shopify/polaris-react/pull/2313))

### Dependency upgrades

- Updated sewing-kit to v0.111.0 and storybook to v5.2.4 ([#2326](https://github.com/Shopify/polaris-react/pull/2326))

## 4.6.1 - 2019-10-17

### Enhancements

- Added CSS custom properties to `Portal` container ([#2306](https://github.com/Shopify/polaris-react/pull/2306))

### Bug fixes

- Fixed a regression with the positioning of the `Popover` component ([#2305](https://github.com/Shopify/polaris-react/pull/2305))

## 4.6.0 - 2019-10-16

### Enhancements

- Added a `totalItemsCount` prop to the `ResourceList` component ([#2233](https://github.com/Shopify/polaris-react/pull/2233))
- Prevented the `Header` primary action label on the `Page` component from wrapping when the title is too long ([#2262](https://github.com/Shopify/polaris-react/pull/2262))

### Bug fixes

- Fixed an issue with the `Stack` component where a `Stack.Item` was not getting a minimum width ([#2273](https://github.com/Shopify/polaris-react/pull/2273))
- Fixed an issue with `Filters` applying inconsistent border styles to sibling filters when
  there is only one filter in the filter list ([#2284](https://github.com/Shopify/polaris-react/pull/2284))
- Added `aria-disabled` to the `Select` component’s content when it is disabled ([#2281](https://github.com/Shopify/polaris-react/pull/2281))

### Documentation

- Added accessibility documentation for the `DropZone` component ([#2243](https://github.com/Shopify/polaris-react/pull/2243))
- Improved accessibility documentation for the `Spinner` component ([#2258](https://github.com/Shopify/polaris-react/pull/2258))

### Development workflow

- Added support for context customization in Storybook using addon-contexts ([#2281](https://github.com/Shopify/polaris-react/pull/2281))

### Code quality

- Migrated `DateSelector` to use hooks instead of withAppProvider ([#2193](https://github.com/Shopify/polaris-react/pull/2193))
- Migrated `Toast` to use hooks ([#2222](https://github.com/Shopify/polaris-react/pull/2222))
- Removed `link`, `theme` and `scrollLockManager` from the object returned by `withAppProvider` as nothing consumes them any more ([#2277](https://github.com/Shopify/polaris-react/pull/2277))

## 4.5.0 - 2019-10-08

### Enhancements

- Added `showTotalsInFooter` prop to `DataTable` for control over placement of “Totals” row ([#2200](https://github.com/Shopify/polaris-react/pull/2200))
- Removed the need for z-indexes in `Icon` ([#2207](https://github.com/Shopify/polaris-react/pull/2207))
- Added `hasFocusableParent` to `Spinner` ([#2176](https://github.com/Shopify/polaris-react/pull/2176))

### Bug fixes

- Fixed tabs that don’t wrap correctly on small screens in pre-iOS 13 Safari ([#2232](https://github.com/Shopify/polaris-react/pull/2232))
- Fixed `BulkActions` checkbox losing selection on focus ([#2138](https://github.com/Shopify/polaris-react/pull/2138))
- Moved rendering of the portal component’s node within the node created by the theme provider component to enable theming through CSS Custom Properties ([#2224](https://github.com/Shopify/polaris-react/pull/2224))
- Fixed a bug which caused the `Popover` overlay to remain in the DOM if it was updated during exiting ([#2246](https://github.com/Shopify/polaris-react/pull/2246))
- Fixed `Breadcrumbs` to use `accessibilityLabel` prop when passed in ([#2254](https://github.com/Shopify/polaris-react/pull/2254))

### Documentation

- Added accessibility documentation for the date picker component ([#2242](https://github.com/Shopify/polaris-react/pull/2242))
- Added accessibility documentation for the empty state component ([#2244](https://github.com/Shopify/polaris-react/pull/2244))

### Code quality

- Improved code quality for the theme provider component ([#2225](https://github.com/Shopify/polaris-react/pull/2225)):

  - updated type for `theme` prop to `ThemeConfig` to distinguish from the type `Theme` which is shared over context. A `Theme` contains only the logo properties, while `ThemeConfig` can contain a `colors` property.
  - converted `ThemeProvider` to use hooks
  - created symmetry in context between app provider and test provider
  - added better tests for default topBar colors
  - fixed an issue where `colorToHsla` returned HSLA strings instead of HSLA objects when given HSL or HSLA strings
  - fixed an issue with `colorToHsla` where RGB colors with no saturation could result in a divide by zero error
  - fixed an issue where `colorToHsla` inconsistently returned an alpha value
  - fixed an issue where `lightenColor` and `darkenColor` would lighten or darken absolute lightness values (0, 100)

## 4.4.0 - 2019-10-03

### Enhancements

- Removed the need for z-indexes in `Icon` ([#2207](https://github.com/Shopify/polaris-react/pull/2207))
- Added `features` prop to `AppProvider` ([#2204](https://github.com/Shopify/polaris-react/pull/2204))

### Bug fixes

- Fixed loss of focus on `TextField` when changing connectedRight/connectedLeft content while user is typing ([#2170](https://github.com/Shopify/polaris-react/pull/2170))
- Fixed `type` for clearButton ([#2060](https://github.com/Shopify/polaris-react/pull/2060))
- Prevented the `onSelect` prop of `Tabs` from changing scroll position ([#2196](https://github.com/Shopify/polaris-react/pull/2196))
- Fixed 200ms visual delay when activating `Popover` ([#2209](https://github.com/Shopify/polaris-react/pull/2209))
- Removed the `ResourceList` `Item` hover state when `Item` is deselected ([#1952](https://github.com/Shopify/polaris-react/pull/1952))
- Fixed `Subheading`’s `font-weight` ([#2218](https://github.com/Shopify/polaris-react/pull/2218))
- Fixed `fullWidth` `CardSection`s when contained in a page with a `Nav` ([#2227](https://github.com/Shopify/polaris-react/pull/2227))

### Documentation

- Converted `SettingToggle`, `Sheet`, and `Tabs` examples to functional components ([#2134](https://github.com/Shopify/polaris-react/pull/2134))
- Converted `Form`, `Frame`, and `Loading` examples to functional components ([#2130](https://github.com/Shopify/polaris-react/pull/2130))
- Replaced Latin abbreviations with English words in Text field content guidelines ([#2192](https://github.com/Shopify/polaris-react/pull/2192))
- Converted `SettingToggle`, `Sheet`, and `Tabs` examples to functional components ([#2134](https://github.com/Shopify/polaris-react/pull/2134))
- Converted `DatePicker`, `DropZone`, and `Filters` examples to functional components ([#2129](https://github.com/Shopify/polaris-react/pull/2129))

### Code quality

- Added `MediaQueryProvider` to ease the use of media queries and reduce duplication ([#2117](https://github.com/Shopify/polaris-react/pull/2117))
- Migrated `Tab` to use hooks instead of `withAppProvider` ([#2123](https://github.com/Shopify/polaris-react/pull/2123))

### Development workflow

- Added a GitHub action, [discoverability-action](https://github.com/Shopify/discoverability-action), that runs `yarn splash` on PR diffs and leaves a comment with the output ([#2208](https://github.com/Shopify/polaris-react/pull/2208))

## 4.3.0 - 2019-09-23

### Enhancements

- Added new label prop to `Pagination` which is used to insert contextual info between navigation buttons ([#2098](https://github.com/Shopify/polaris-react/pull/2098))
- Updated `trigger` to use `act` ([#2141](https://github.com/Shopify/polaris-react/pull/2141))
- Changed border color of `Drop zone` to have better contrast from the background and to be lighter when disabled ([#2119](https://github.com/Shopify/polaris-react/pull/2119))
- Adjusted search results overlay to take up 100% height of the screen on small screens and to match the width of the search bar on large screens. ([#2103](https://github.com/Shopify/polaris-react/pull/2103))
- Added skipToContentTarget prop to Frame component ([#2080](https://github.com/Shopify/polaris-react/pull/2080))

### Bug fixes

- Updated `Card` footer actions to be left aligned instead of right by default ([#2075](https://github.com/Shopify/polaris-react/issues/2075))
- Fixed vertical alignment of Tabs disclosure activator ([#2087](https://github.com/Shopify/polaris-react/pull/2087))
- Fixed `Modal` setting an invalid `id` on `aria-labelledby` when no `title` is set ([#2115](https://github.com/Shopify/polaris-react/pull/2115))
- Fixed error warnings in `Card` and `RollupActions` tests ([#2125](https://github.com/Shopify/polaris-react/pull/2125))
- Fixed modal border not being visible in Windows high contrast mode ([#2114](https://github.com/Shopify/polaris-react/pull/2114))
- Added default accessibility label from `ResourceItem` ([#2097](https://github.com/Shopify/polaris-react/pull/2097))
- Reverted `Page.primaryAction` forcing `primary` to be `true` ([#2137](https://github.com/Shopify/polaris-react/pull/2137))
- Removed `React.Children.only` from `AppProvider`and `ThemeProvider` ([#2121](https://github.com/Shopify/polaris-react/pull/2121))
- Fixed visual bug where button width changed in Filters component. Thank you to [@alexieyizhe](https://github.com/alexieyizhe) for the contribution ([#2003](https://github.com/Shopify/polaris-react/pull/2003)).
- Changed `text-rendering` to `auto` in `Select` to prevent Safari 13 from crashing ([#2179](https://github.com/Shopify/polaris-react/pull/2179))

### Documentation

- Converted `Autocomplete`, `Banner`, and `ChoiceList` examples to functional components ([#2127](https://github.com/Shopify/polaris-react/pull/2127))
- Converted `Collapsible`, `ColorPicker`, and `DataTable` examples to functional components ([#2128](https://github.com/Shopify/polaris-react/pull/2128))
- Converted `Modal`, `OptionList`, and `Popover` examples to functional components ([#2131](https://github.com/Shopify/polaris-react/pull/2131))
- Converted `RadioButton`, `RangeSlider`, and `ResourceItem` examples to functional components ([#2132](https://github.com/Shopify/polaris-react/pull/2132))
- Converted `ResourceList`, `ResourcePicker`, and `Select` examples to functional components ([#2133](https://github.com/Shopify/polaris-react/pull/2133))
- Converted `TextField`, `Toast`, and `TopBar` examples to functional components ([#2135](https://github.com/Shopify/polaris-react/pull/2135))
- Updated the `withContext` section in the [v3 to v4 migration guide](https://github.com/Shopify/polaris-react/blob/master/documentation/guides/migrating-from-v3-to-v4.md) ([#2124](https://github.com/Shopify/polaris-react/pull/2124))
- Clarified when to use the `external` prop on the `Link` component ([#2153](https://github.com/Shopify/polaris-react/pull/2153))
- Updated documentation examples to include disclosure on `Popover` activators ([#2171](https://github.com/Shopify/polaris-react/pull/2171))

### Development workflow

- Added [`yarn splash` (beta)](/scripts/splash/), a command-line interface to observe the splash zone of a change across the component library ([#2113](https://github.com/Shopify/polaris-react/pull/2113))
- Updated Storybook – [v5.2 release notes](https://medium.com/storybookjs/storybook-5-2-794958b9b111) ([#2157](https://github.com/Shopify/polaris-react/pull/2157))

### Code quality

- Added `useLazyRef` hook to use while building components ([#2166](https://github.com/Shopify/polaris-react/pull/2166))
- Migrated `FilterCreator` to use hooks instead of withAppProvider ([#2156](https://github.com/Shopify/polaris-react/pull/2156))
- Created a custom error for lack of context providers ([#2136](https://github.com/Shopify/polaris-react/pull/2136))
- Migrated `ContextualSaveBar` to use hooks instead of `withAppProvider`. Thank you to [@sijad](https://github.com/sijad) for the contribution ([#2091](https://github.com/Shopify/polaris-react/pull/2091)).
- Migrated `RangeSlider`, `ScrollLock` and `TopBar.SearchField` to use hooks instead of withAppProvider ([#2083](https://github.com/Shopify/polaris-react/pull/2083))
- Updated `ResourceItem` to no longer rely on withAppProvider ([#2094](https://github.com/Shopify/polaris-react/pull/2094))
- Migrated `TextField` and `Resizer` to use hooks ([#1997](https://github.com/Shopify/polaris-react/pull/1997))
- Migrated `Avatar` to use hooks instead of withAppProvider ([#2067](https://github.com/Shopify/polaris-react/pull/2067))
- Updated `Day` and `DatePicker` to use hooks ([#2089](https://github.com/Shopify/polaris-react/pull/2089))

## 4.2.1 - 2019-09-10

### Bug fixes

- Fixed TypeScript not generating correct types for functional components that have subcomponents ([#2111](https://github.com/Shopify/polaris-react/pull/2111))

## 4.2.0 - 2019-09-09

### Enhancements

- Added support for min/max dates in `TextField` by setting a string on `min` and `max` props ([#1991](https://github.com/Shopify/polaris-react/pull/1991))
- Made the `title` prop on `Page` optional, supporting continued use of `Page` for structure in apps using the App Bridge React [`TitleBar`](https://github.com/Shopify/app-bridge/tree/master/packages/app-bridge-react/src/components/TitleBar) ([#2082](https://github.com/Shopify/polaris-react/pull/2082))

### Bug fixes

- Fixed inconsistent padding of sections in `Modal` ([#2072](https://github.com/Shopify/polaris-react/pull/2072))
- Fixed animation for Modal when being rendered asynchronously ([#2076](https://github.com/Shopify/polaris-react/pull/2076))
- Fixed item content from overflowing past the container in `Stack` ([#2071](https://github.com/Shopify/polaris-react/pull/2071))
- Fixed `Dropzone` hover, disabled, and focus states ([#1994](https://github.com/Shopify/polaris-react/pull/1994))
- Added `name` prop to `ResourceItem` to fix accessibility labels ([#2077](https://github.com/Shopify/polaris-react/pull/2077))
- Fixed misalignment of `ResourceItem` actions ([#2051](https://github.com/Shopify/polaris-react/pull/2051))

### Documentation

- Added Android/iOS images for Plain destructive button ([#2081](https://github.com/Shopify/polaris-react/pull/2081))
- Removed mobile mention from right-aligned text component guidelines ([#2081](https://github.com/Shopify/polaris-react/pull/2081))
- Added mobile example images error state of Single Choice List ([#2007](https://github.com/Shopify/polaris-react/pull/2007))

### Dependency upgrades

- Updated Prettier to v1.18.2 ([#2070](https://github.com/Shopify/polaris-react/pull/2070))

### Development workflow

- Added a displayName to the function generated by the `withAppProvider` HoC for a better devtools experience ([#2093](https://github.com/Shopify/polaris-react/pull/2093))

### Code quality

- Migrated `ActionMenu.RollupAction`, `Autocomplete`, `Card`, `EmptySearchResult`, `Form`, `SkeletonPage` and `TopBar` to use hooks instead of withAppProvider ([#2065](https://github.com/Shopify/polaris-react/pull/2065))
- Added `useUniqueId` hook that can be used to get a unique id that remains consistent between rerenders and updated components to use it where appropriate ([#2079](https://github.com/Shopify/polaris-react/pull/2079))

## 4.1.0 - 2019-09-03

### Enhancements

- Moved `ResourceItem` to its own component ([#1774](https://github.com/Shopify/polaris-react/pull/1774))
- Updated `ResourceList` sort to show an inline label ([#1774](https://github.com/Shopify/polaris-react/pull/1774))
- Removed the `tap-highlight-color` for `Buttons` ([#1545](https://github.com/Shopify/polaris-react/pull/1545))

### Bug fixes

- Removed `Tooltip` on disabled `Pagination` buttons ([#1963](https://github.com/Shopify/polaris-react/pull/1963))
- Fixed accessibility labels on `ResourceList.Item` persistent action disclosure icon ([#1973](https://github.com/Shopify/polaris-react/pull/1973))
- Fixed accessibility issue with `Autocomplete` where keyboard navigation of options was laggy and skipped options ([#1887](https://github.com/Shopify/polaris-react/pull/1887))
- Fixed bug where `Autocomplete` was bubbling up the `Enter` key event unexpectedly ([#1887](https://github.com/Shopify/polaris-react/pull/1887))
- Fixed `ContextualSaveBar` actions overflowing on small screens ([#1967](https://github.com/Shopify/polaris-react/pull/1967))
- Fixed `Tabs` rollup automatically opening from keyboard navigation of tab list ([#1933](https://github.com/Shopify/polaris-react/pull/1933))

### Documentation

- Updated example section to include new examples and remove old ones ([#1979](https://github.com/Shopify/polaris-react/pull/1979))
- Updated example for the `ResourceList.Item` persistent actions accessibility labels ([#1973](https://github.com/Shopify/polaris-react/pull/1973))
- Removed `FilterControl` documentation and case studies from `ResourceList` documentation ([#1774](https://github.com/Shopify/polaris-react/pull/1774))
- Updated `ResourceList` examples to use `Filters` ([#1774](https://github.com/Shopify/polaris-react/pull/1774))
- Added an example to `Filters` showing the use of `children` ([#1774](https://github.com/Shopify/polaris-react/pull/1774))
- Added guidance for making animated gifs in PRs and issues more accessibility-friendly ([#1998](https://github.com/Shopify/polaris-react/pull/1998))
- Added `RadioButton` guidance to make one option selected by default ([#2005](https://github.com/Shopify/polaris-react/pull/2005))

### Development workflow

- Update subcomponents to use named exports for components and better names props exports ([#2058](https://github.com/Shopify/polaris-react/pull/2058))

### Code quality

- Removed mocks in various tests suites that are now redundant ([#1978](https://github.com/Shopify/polaris-react/pull/1978))

### Deprecations

- Deprecated `FilterControl`. Use `Filters` instead ([#1774](https://github.com/Shopify/polaris-react/pull/1774))

## 4.0.0 - 2019-08-28

For instructions on updating from v3 to v4, see our [migration guide](https://github.com/Shopify/polaris-react/blob/master/documentation/guides/migrating-from-v3-to-v4.md).

### Breaking changes

- Removed `groups` prop on `Select`. Pass groups to the `options` prop instead. ([#1831](https://github.com/Shopify/polaris-react/pull/1831))
- Removed `Autocomplete.ComboBox.TextField` and `Autocomplete.ComboBox.OptionList`. You should use the `Autocomplete.TextField` and `OptionList` components instead. ([#1830](https://github.com/Shopify/polaris-react/pull/1830))
- Removed `secondaryFooterAction` prop on `Card`. Pass an array of secondary actions to the `secondaryFooterActions` prop instead. ([#1831](https://github.com/Shopify/polaris-react/pull/1831))
- Removed `iconBody` prop on `Navigation.Item`. Pass a string to the `icon` prop instead. ([#1831](https://github.com/Shopify/polaris-react/pull/1831))
- Removed the `WithContext` component, as it was an undocumented part of the public API meant for internal use only ([#1641](https://github.com/Shopify/polaris-react/pull/1641))
- Removed the `WithRef` component, as it was an undocumented part of the public API meant for internal use only ([#1610](https://github.com/Shopify/polaris-react/pull/1610))
- Removed support for passing a string into `<Icon source>` to load a bundled icon. You must load the required icon directly from `@shopify/polaris-icons` instead. ([#1604](https://github.com/Shopify/polaris-react/pull/1604))
- Removed support for passing an `SvgSource` shaped object into `<Icon source>` to load an icon imported using Shopify’s legacy icon loader. You must update sewing-kit to at least v0.82.0 which replaced the legacy loader with using SVGR. ([#1604](https://github.com/Shopify/polaris-react/pull/1604))
- Removed support for passing a React Element into `<Icon source>`. You must pass in a React Component that returns an SVG element instead. ([#1604](https://github.com/Shopify/polaris-react/pull/1604))
- Removed support for `<Icon untrusted>`. Passing a string into `source` will now always load an untrusted icon, you don’t need that additional property. ([#1604](https://github.com/Shopify/polaris-react/pull/1604)).
- Removed `Navigation.UserMenu`. Use `TopBar.UserMenu` instead. ([#1599](https://github.com/Shopify/polaris-react/pull/1599))
- Made `title` a required prop on `ChoiceList` to improve accessibility. It can be hidden with `titleHidden`. ([#1575](https://github.com/Shopify/polaris-react/pull/1575))
- Made `i18n` a required prop on `AppProvider`. [Usage instructions](https://polaris.shopify.com/components/structure/app-provider#using-translations) are included in the `AppProvider` docs. ([#1530](https://github.com/Shopify/polaris-react/pull/1530))
- Upgraded `react` and `react-dom` peer-dependencies to 16.8.6 to enable the use of hooks ([#1525](https://github.com/Shopify/polaris-react/pull/1525))
- Changed the import method for React to use default imports. Applications consuming Polaris using TypeScript must enable [`esModuleInterop`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html#support-for-import-d-from-cjs-from-commonjs-modules-with---esmoduleinterop) in `tsconfig.json`. ([#1523](https://github.com/Shopify/polaris-react/pull/1523))
- Removed `LinkLikeComponent` type export. Use `AppProviderProps['linkComponent']` instead. ([#1864](https://github.com/Shopify/polaris-react/pull/1864))
- Removed the `Modal.Dialog` and `Tabs.Panel` subcomponents as they were undocumented parts of our public API meant for internal use only ([#1899](https://github.com/Shopify/polaris-react/pull/1899)).

### Enhancements

- Added a new `create-react-app` example in TypeScript demonstrating use of Polaris with `react-testing` ([#1937](https://github.com/Shopify/polaris-react/pull/1937))
- Exported `AppliedFilterInterface` and `FilterInterface` from `Filters` ([#1924](https://github.com/Shopify/polaris-react/pull/1924))
- Improved color contrast of links inside `Banner` ([#1651](https://github.com/Shopify/polaris-react/pull/1651))
- Add underline to Links and Plain button on hover, so it doesn’t rely on color alone for accessibility ([#1885](https://github.com/Shopify/polaris-react/pull/1885))
- Add `onQueryFocus` callback prop to the `Filters` component ([#1948](https://github.com/Shopify/polaris-react/pull/1948))

### Bug fixes

- Fixed types merge of `ActionMenu` `MenuAction` and `MenuGroup.actions` ([#1895](https://github.com/Shopify/polaris-react/pull/1895))
- Fixed the activator buttons of `Page` `actionGroups` not toggling the `Popover` `active` state on click [#1905](https://github.com/Shopify/polaris-react/pull/1905)
- Fixed Windows high contrast support of `Badge` `progress` ([#1928](https://github.com/Shopify/polaris-react/pull/1928))
- Fixed `BulkActionButton` from throwing an error in `componentDidMount` ([#1913](https://github.com/Shopify/polaris-react/pull/1913))
- Fixed `ToastManager` from not working correctly in `React.StrictMode` ([#1741](https://github.com/Shopify/polaris-react/pull/1741))
- Updated translation.yml with the new locales path ([#1649](https://github.com/Shopify/polaris-react/pull/1649))
- Fixed accessibility issue with `Tabs` list item presentation role ([#1958](https://github.com/Shopify/polaris-react/pull/1958))
- Fixed cross-origin error being thrown in `Modal` when loading an external app ([#1992](https://github.com/Shopify/polaris-react/pull/1992))
- Fixed regression in `PopoverOverlay` causing `onClose` to be fired when Popover is opening and trigger was not the activator ([#2000](https://github.com/Shopify/polaris-react/pull/2000))
- Fixed issue with `ContextualSaveBar` blocking search when hidden ([#2044](https://github.com/Shopify/polaris-react/pull/2044))

### Documentation

- Updated `AppProvider` app bridge example to use our `AppBridgeContext` ([#1877](https://github.com/Shopify/polaris-react/pull/1877))

### Development workflow

- Added support for React hooks in Storybook ([#1665](https://github.com/Shopify/polaris-react/pull/1665))
- Created `toBeDisabled`, `mountWithContext` and added custom testing matchers ([#1596](https://github.com/Shopify/polaris-react/pull/1596))
- Added `PolarisTestProvider` helper to ease configuration of required Polaris contexts in tests, see [polaris examples](https://github.com/Shopify/polaris-react/tree/master/examples) for usage ([#1810](https://github.com/Shopify/polaris-react/pull/1810))
- Enabled strict mode in TypeScript ([#1883](https://github.com/Shopify/polaris-react/pull/1883))
- Moved to `unpkg.com` for our CDN CSS assets, instead of using `sdks.shopifycdn.com`. Existing URLs will continue to work but new versions will only be available at `unpkg.com`. ([#1960](https://github.com/Shopify/polaris-react/pull/1960))
- Added [ChromaUI](https://www.chromaui.com/) integration for previewing Storybook builds, to potentially replace our self-hosted Heroku instance ([#1975](https://github.com/Shopify/polaris-react/pull/1975))

### Dependency upgrades

- Updated `@shopify/polaris` in all examples to 4.0.0-rc.2 ([#1937](https://github.com/Shopify/polaris-react/pull/1937))
- Added `@material-ui/react-transition-group` and removed `react-transition-group` to support `React.StrictMode` ([#1759](https://github.com/Shopify/polaris-react/pull/1759))
- Added `@shopify/react-testing` ([#1596](https://github.com/Shopify/polaris-react/pull/1596))
- Removed`@shopify/css-utilities` ([#1586](https://github.com/Shopify/polaris-react/pull/1586))
- Removed `@types/prop-types` and `prop-types` ([#1505](https://github.com/Shopify/polaris-react/pull/1505))
- Updated`react` to 16.8.6 and `enzyme` to 3.9.1 ([#1392](https://github.com/Shopify/polaris-react/pull/1392))

### Code quality

- Bumped test coverage in `Collapsible` ([#1929](https://github.com/Shopify/polaris-react/pull/1929))
- Bumped test coverage in `DropZone`, `Frame`, `Icon`, and `Loading` ([#1927](https://github.com/Shopify/polaris-react/pull/1927))
- Removed unused type definitions ([#1862](https://github.com/Shopify/polaris-react/pull/1862))
- Ignored deprecation warnings related to Shopify App Bridge in tests ([#1852](https://github.com/Shopify/polaris-react/pull/1852))
- Updated `withAppProvider` to use a functional component rather than a class component ([#1813](https://github.com/Shopify/polaris-react/pull/1813))
- Updated `Link` to use `useI18n` rather than `withAppProvider` ([#1806](https://github.com/Shopify/polaris-react/pull/1806))
- Updated several components to use hooks instead of `withAppProvider` ([#1797](https://github.com/Shopify/polaris-react/pull/1797))
- Removed `CSSTransition` from `PopoverOverlay` ([#1756](https://github.com/Shopify/polaris-react/pull/1756))
- Updated exports in `src/utilities` and `src/test-utilities` to named exports ([#1717](https://github.com/Shopify/polaris-react/pull/1717))
- Removed test errors and non-deprecation warnings ([#1715](https://github.com/Shopify/polaris-react/pull/1715))
- Enabled `React.StrictMode` in test components and Storybook ([#1709](https://github.com/Shopify/polaris-react/pull/1709))
- Removed all uses of `ReactDOM.findDOMNode` ([#1696](https://github.com/Shopify/polaris-react/pull/1696))
- Enabled `react/no-unsafe` ESLint rule with `checkAliases` ([#1695](https://github.com/Shopify/polaris-react/pull/1695))
- Alphabetized component export order and kebab-case files ([#1674](https://github.com/Shopify/polaris-react/pull/1674))
- Updated `Collapsible` to no longer use `componentWillReceiveProps`([#1670](https://github.com/Shopify/polaris-react/pull/1670))
- Restructured context structure to be more modular ([#1664](https://github.com/Shopify/polaris-react/pull/1664))
- Updated `PositionedOverlay` to no longer use `componentWillReceiveProps`([#1621](https://github.com/Shopify/polaris-react/pull/1621))
- Simplified `WithinContentContainer` context type ([#1602](https://github.com/Shopify/polaris-react/pull/1602))
- Updated `OptionList` to no longer use `componentWillReceiveProps` ([#1557](https://github.com/Shopify/polaris-react/pull/1557))
- Refactored `RangeSlider` `DualThumb` tests ([#1548](https://github.com/Shopify/polaris-react/pull/1548))
- Converted `Sheet` to a functional component ([#1548](https://github.com/Shopify/polaris-react/pull/1548))
- Removed `withContext` from `ResourceList.Item` ([#1503](https://github.com/Shopify/polaris-react/pull/1503))
- Removed `withContext` from `Navigation.Item` ([#1502](https://github.com/Shopify/polaris-react/pull/1502))
- Removed `withRef` from `UnstyledLink` ([#1501](https://github.com/Shopify/polaris-react/pull/1501))
- Removed `withContext` from `ResourceList.FilterControl` ([#1500](https://github.com/Shopify/polaris-react/pull/1500))
- Removed `withContext` from `Scrollable.ScrollTo` and added a test to boost coverage ([#1499](https://github.com/Shopify/polaris-react/pull/1499))
- Removed `withContext` from `Loading` ([#1497](https://github.com/Shopify/polaris-react/pull/1497))
- Removed `withContext` and `withAppProvider` from `ContextualSaveBar` ([#1498](https://github.com/Shopify/polaris-react/pull/1498))
- Removed `withContext` from `Toast` ([#1494](https://github.com/Shopify/polaris-react/pull/1494))
- Removed `withRef` and `withContext` from `DropZone.FileUpload` ([#1491](https://github.com/Shopify/polaris-react/pull/1491))
- Created `useAppBridge` hook ([#1482](https://github.com/Shopify/polaris-react/pull/1482))
- Removed testID warning in tests ([#1447](https://github.com/Shopify/polaris-react/pull/1447))
- Updated `AppProvider` to use the new context API and refactored other instances to follow a new pattern and refactor test utilities ([#1424](https://github.com/Shopify/polaris-react/pull/1424))
- Updated all context files to export react context rather than a provider and consumer ([#1424](https://github.com/Shopify/polaris-react/pull/1424))
- Deleted `withSticky` ([#1424](https://github.com/Shopify/polaris-react/pull/1424))
- Upgraded the `Autocomplete` component from legacy context API to use createContext ([#1403](https://github.com/Shopify/polaris-react/pull/1403))
- Upgraded the `Navigation` component from legacy context API to use createContext ([#1402](https://github.com/Shopify/polaris-react/pull/1402))
- Updated `ThemeProvider` to use the new context API ([#1396](https://github.com/Shopify/polaris-react/pull/1396))
- Updated `AppProvider` to no longer use `componentWillReceiveProps`([#1255](https://github.com/Shopify/polaris-react/pull/1255))
- Removed unused context from `Scrollable` ([#1253](https://github.com/Shopify/polaris-react/pull/1253))
- Updated `ThemeProvider` to no longer use `componentWillReceiveProps` ([#1254](https://github.com/Shopify/polaris-react/pull/1254))
- Removed context from `Collapsible` ([#1114](https://github.com/Shopify/polaris-react/pull/1114))
- Refactored `Frame` and its subcomponents to use the `createContext` API instead of legacy context ([#803](https://github.com/Shopify/polaris-react/pull/803))
- Upgraded the `Banner`, `Card`, and `Modal` components from legacy context API to use `createContext` ([#786](https://github.com/Shopify/polaris-react/pull/786))

### Deprecations

- Renamed `singleColumn`on`Page`to`narrowWidth` ([#1606](https://github.com/Shopify/polaris-react/pull/1606))

## 3.21.1 - 2019-08-12

### Enhancements

- Added `onQueryFocus` callback prop to the `Filters` component ([#1948](https://github.com/Shopify/polaris-react/pull/1948))

## 3.21.0 - 2019-07-31

### Enhancements

- Added a `subtitle` and `thumbnail` prop to `Page` ([#1880](https://github.com/Shopify/polaris-react/pull/1880))

### Bug fixes

- Fixed accessibility issue with ChoiceList errors not being correctly connected to the inputs ([#1824](https://github.com/Shopify/polaris-react/pull/1824))
- Fixed `Tab` `aria-controls` pointing to a non-existent `Panel` `id` ([#1869](https://github.com/Shopify/polaris-react/pull/1869))
- Fixed `Toast` accessibility issue by moving `aria-live` prop to `ToastManager` ([#1873](https://github.com/Shopify/polaris-react/pull/1873))

### Code quality

- Use `@shopify/typescript-configs` as the base of `tsconfig.json` for the project ([#1829](https://github.com/Shopify/polaris-react/pull/1829))

## 3.20.0 - 2019-07-16

### Enhancements

- Added a `verticalAlign` prop to `DataTable` ([#1790](https://github.com/Shopify/polaris-react/pull/1790))
- Improved focus and hover states for `Navigation` ([#1822](https://github.com/Shopify/polaris-react/pull/1822))

### Bug fixes

- Fixed the `SearchInput` clear button which was overflowing the search bar in Firefox 65+ ([#1795](https://github.com/Shopify/polaris-react/pull/1795))
- Fixed a bug preventing the display of `Tooltip` when cursor enters from a disabled element ([#1783](https://github.com/Shopify/polaris-react/pull/1783))
- Fixed React imports in the `Filters` component to use `import * as React` for projects that don’t use `esModuleInterop` ([#1820](https://github.com/Shopify/polaris-react/pull/1820))
- Fixed `tabIndex` on `main` element causing event delegation issues ([#1821](https://github.com/Shopify/polaris-react/pull/1821))
- Fixed icon color for destructive ActionList items ([#1836](https://github.com/Shopify/polaris-react/pull/1836))
- Fixed not being able to explictly set `autoComplete` prop on`Autocomplete.TextField` ([#1839](https://github.com/Shopify/polaris-react/pull/1839))

### Documentation

- Added links to App Bridge React component documentation in deprecation notices for embedded components ([#1765](https://github.com/Shopify/polaris-react/pull/1765))
- Improved link text for App Bridge deprecation notices [#1802](https://github.com/Shopify/polaris-react/pull/1802)

### Development workflow

- Use explicit imports for our base Sass mixins instead of having them implictly defined at build-time. This simplifes our build config and other tooling that wants to build us from source [[#1680](https://github.com/Shopify/polaris-react/pull/1680)]

## 3.19.0 - 2019-07-09

### New components

- `Filters`: Use to filter the items of a list or table ([#1718](https://github.com/Shopify/polaris-react/pull/1718))

### Enhancements

- Added the rollover and Windows high contrast mode to `Disclosure` button on `Tabs` ([#1755](https://github.com/Shopify/polaris-react/pull/1755))
- Added support for disabling all choices in `ChoiceList` ([#1758](https://github.com/Shopify/polaris-react/pull/1758))
- Components in our Sass build (the `styles` folder) are now precompiled to avoid the chance of accidentally overwriting any of our global variables, mixins and functions ([#1764](https://github.com/Shopify/polaris-react/pull/1764))
- Changed `Skip to content` to render an anchor instead of a button to meet accessiblity level A guidelines ([#1785](https://github.com/Shopify/polaris-react/pull/1785))

### Bug fixes

- Fixed a regression introduced in [#1247](https://github.com/Shopify/polaris-react/pull/1247), where icons inside of `Link` would always be recolored to match the text color ([#1729](https://github.com/Shopify/polaris-react/pull/1729))
- Fixed the `DiscardConfirmationModal` not closing when the discard button is clicked ([#1784](https://github.com/Shopify/polaris-react/pull/1784))
- Fixed `Navigation.Item` `secondaryAction` wrapping when content wraps ([#1678](https://github.com/Shopify/polaris-react/pull/1678))

### Documentation

- Added links to App Bridge React component documentation in deprecation notices for embedded components ([#1765](https://github.com/Shopify/polaris-react/pull/1765))

### Development workflow

- Renamed `yarn run ts` to `yarn run type-check` to match most other Shopify projects ([#1745](https://github.com/Shopify/polaris-react/pull/1745))
- Fixed deprecation notice in build ([#1754](https://github.com/Shopify/polaris-react/pull/1754))
- Simplified our rollup plugin for Sass compilation while retaining identical behaviour ([#1753](https://github.com/Shopify/polaris-react/pull/1753))

## 3.18.0 - 2019-06-26

### New components

- `ActionMenu`: Use for display of actions and action groups within the context of a header ([#1653](https://github.com/Shopify/polaris-react/pull/1653))

### Enhancements

- Added the `stopAnnouncements` prop to `Banner`, which disables screen reader announcements when content changes ([#1719](https://github.com/Shopify/polaris-react/pull/1719))
- Add `selectable` prop to `ResourceList` component (thanks to [@vict-shevchenko](https://github.com/vict-shevchenko) for the [pull request](https://github.com/Shopify/polaris-react/pull/1614))
- Allow `Link` and `Button` interactions when rendered as `prefix/suffix` within `<TextField />` ([#1394](https://github.com/Shopify/polaris-react/pull/1394))
- Improve `TextField` so that character count is only announced on focus. ([#1720](https://github.com/Shopify/polaris-react/pull/1720))
- `ActionList` can now pass a unique `accessibilityLabel` to each `Item` ([#1653](https://github.com/Shopify/polaris-react/pull/1653))
- Greatly reduced complexity of `Page > Header` ([#1653](https://github.com/Shopify/polaris-react/pull/1653))
- Long `Page > Header` breadcrumb labels will now truncate instead of breaking layout ([#1653](https://github.com/Shopify/polaris-react/pull/1653))
- Improves performance of `TabMeasure` component ([#1544](https://github.com/Shopify/polaris-react/pull/1544))
- Added `secondaryFooterActions` prop to `Card` which adds an action list of secondary actions to the footer [#1625](https://github.com/Shopify/polaris-react/pull/1625)

### Bug fixes

- Fixes `monochrome` variant of `Link` and `Button` components to support multi-line link text ([#1686](https://github.com/Shopify/polaris-react/pull/1686))
- Fixed the first column of `DataTable` not rendering in iOS Safari ([#1605](https://github.com/Shopify/polaris-react/pull/1605))
- Fixed paint loss on scroll of `TextField` `Spinner` ([#1740](https://github.com/Shopify/polaris-react/pull/1740))

### Documentation

- Mentioned that the Contextual Save Bar is now available for embedded apps through App Bridge directly [#1721](https://github.com/Shopify/polaris-react/pull/1721)
- Mentioned [Polaris icons](https://polaris-icons.shopify.com) in the Icon component documentation ([#1693](https://github.com/Shopify/polaris-react/pull/1693))
- Added an example to `Card` for custom action layout with a secondary action and a plain button (thanks to [@sharoonthomas](https://github.com/sharoonthomas) for the [pull request](https://github.com/Shopify/polaris-react/pull/1705))

### Development workflow

- Updated Storybook to `v5.1.9` ([#1728](https://github.com/Shopify/polaris-react/pull/1728))

### Code quality

- Updated `PositionedOverlay` to no longer use `componentWillReceiveProps`([#1621](https://github.com/Shopify/polaris-react/pull/1621))

### Deprecations

- `Card` `secondaryFooterAction` is now deprecated. Set an array of secondary actions on the `secondaryFooterActions` prop instead [#1625](https://github.com/Shopify/polaris-react/pull/1625)

## 3.17.0 - 2019-06-11

### Deprecations

- Deprecated passing a string representing a "bundled icon" into `<Icon source>` Pass in an svg component imported from `@shopify/polaris-icons` instead ([#1534](https://github.com/Shopify/polaris-react/pull/1534)).
- Deprecated all usage of the Shopify App Bridge in Polaris React ([#1573](https://github.com/Shopify/polaris-react/pull/1573))

### Enhancements

- Made the `action` prop optional on `EmptyState` ([#1583](https://github.com/Shopify/polaris-react/pull/1583))
- Prevented Firefox from showing an extra dotted border on focused buttons ([#1409](https://github.com/Shopify/polaris-react/pull/1409))
- Added `resolveItemId` prop to `ResourceList` which is used in the new multiselect feature ([#1261](https://github.com/Shopify/polaris-react/pull/1261))
- Added `actions` prop to `<Card.Section>` to allow you to easily define header actions in a card section ([#1598](https://github.com/Shopify/polaris-react/pull/1598))
- Added `<Card.Subsection>` to allow you to further subdivide `<Card.Section>` in a consistent manner ([#1611](https://github.com/Shopify/polaris-react/pull/1611))
- Removed transition on tag button hover state [#1337](https://github.com/Shopify/polaris-react/pull/1337)
- Added `textAlign` prop to Button ([#1576](https://github.com/Shopify/polaris-react/pull/1576))
- Made `Button` red when given both the `plain` and `destructive` props ([#1603](https://github.com/Shopify/polaris-react/pull/1603))
- Added support for disabled, destructive, and loading actions in `Card` and `Card.Section` ([#1622](https://github.com/Shopify/polaris-react/1622))

### Bug fixes

- Removed unnecessary border-radius from `Modal` body ([#1584](https://github.com/Shopify/polaris-react/pull/1584))
- Fixed accessibility issues in `DropZone`, `Form`, `Modal`, `Section`, `Page`, `Tabs`, `TextField` and `TopBar` ([#1565](https://github.com/Shopify/polaris-react/pull/1565),[#1582](https://github.com/Shopify/polaris-react/pull/1582)).
- Fixed inconsistent width depending on your browser/version in `Sheet` ([#1569](https://github.com/Shopify/polaris-react/pull/1569))
- Fixed text and other elements from being selected in Safari when dragging the color picker ([#1562](https://github.com/Shopify/polaris-react/pull/1562))
- Fixed `Banner` `title` overflowing when set to a single long word ([#1553](https://github.com/Shopify/polaris-react/pull/1553))
- Remove export of `CombinedProps` and unneccessary export for Class based components ([#1592](https://github.com/Shopify/polaris-react/pull/1592))
- Fixed improper spacing and coloring on a `TextField` prefix ([#1132](https://github.com/Shopify/polaris-react/issues/1132))
- Fixed `ResourcePicker` not updating function references for `onSelection` and `onCancel` callbacks [#1451](https://github.com/Shopify/polaris-react/pull/1451)
- Fixed `TextField` `label` being set as the value of the `label` node, as well as the `aria-label` `aria-labelledby` attributes, when only one method will suffice ([#1615](https://github.com/Shopify/polaris-react/pull/1615))
- Fixed accessibility issues for Windows High Contrast mode on `Tabs` and `Popover` ([#1629](https://github.com/Shopify/polaris-react/pull/1629))

### Documentation

- Updated icon documentation to use imports from polaris-icons ([#1561](https://github.com/Shopify/polaris-react/pull/1561))
- Fixed an accessibility issue in the `Collapsible` component example ([#1591](https://github.com/Shopify/polaris-react/pull/1591))
- Added accessibility documentation for the `RangeSlider` component ([#1630](https://github.com/Shopify/polaris-react/pull/1630))
- Added accessibility documentation for the `Collapsible` component ([#1631](https://github.com/Shopify/polaris-react/pull/1631))
- Added accessibility documentation for the `DescriptionList` component ([#1634](https://github.com/Shopify/polaris-react/pull/1634))
- Added accessibility documentation for the `Form` component ([#1636](https://github.com/Shopify/polaris-react/pull/1636))
- Added accessibility documentation for the `ExceptionList` component ([#1635](https://github.com/Shopify/polaris-react/pull/1635))
- Added accessibility documentation for the `KeyboardKey` component ([#1640](https://github.com/Shopify/polaris-react/pull/1640))
- Added accessibility documentation for the `Tag` component ([#1647](https://github.com/Shopify/polaris-react/pull/1647))
- Added accessibility documentation for the `Modal` component ([#1648](https://github.com/Shopify/polaris-react/pull/1648))

### Development workflow

- Made the a11y test that runs in CI fail if it finds any issues ([#1564](https://github.com/Shopify/polaris-react/pull/1564))
- Updated Storybook to `v5.1.0-rc.4` ([#1616](https://github.com/Shopify/polaris-react/pull/1616))
- Fixed a visual regression testing issue with the Card component ([#1618](https://github.com/Shopify/polaris-react/pull/1618))
- Updated to sewing-kit v0.85.5 ([#1633](https://github.com/Shopify/polaris-react/pull/1633))

### Dependency upgrades

- Upgraded TypeScript dependency to `3.5.1` ([#1650](https://github.com/Shopify/polaris-react/pull/1650))

### Code quality

- Enabled the color contrast test in pa11y ([#1645](https://github.com/Shopify/polaris-react/pull/1645))
- Combined jsdocs in `Icon` for the `untrusted` prop ([#1607](https://github.com/Shopify/polaris-react/pull/1607))

## 3.16.0 - 2019-05-22

### Enhancements

- Added support for dual values to `RangeSlider` component ([#1436](https://github.com/Shopify/polaris-react/pull/1436))
- Updated type restrictions for `AnnotatedSection` to allow its `title` prop to accept `React.ReactNode` instead of `string` ([#1431](https://github.com/Shopify/polaris-react/pull/1431))

### Bug fixes

- Fixed an issue where the JavaScript breakpoints incorrectly set the navigation bar collapsed breakpoint ([#1475](https://github.com/Shopify/polaris-react/pull/1475))
- Added a border to `Toast` messages to make them more visible in Windows high contrast mode ([#1469](https://github.com/Shopify/polaris-react/pull/1469))
- Added `box-shadow` to the `Banner` to make it more visible in Windows high contrast mode ([#1481](https://github.com/Shopify/polaris-react/pull/1481))
- Added `box-shadow` to the `Card` to make it more visible in Windows high contrast mode ([#1524](https://github.com/Shopify/polaris-react/pull/1524))
- Fixed UI regressions in `Navigation` component hover and active states ([#1551](https://github.com/Shopify/polaris-react/pull/1551))

### Development workflow

- Updated Storybook to `v5.1.0-alpha.39`, improving component searchability in the sidebar ([#1488](https://github.com/Shopify/polaris-react/pull/1488))

### Dependency upgrades

- Removed runtime dependency on `@shopify/images` as we never needed it at runtime ([#1474](https://github.com/Shopify/polaris-react/pull/1474))
- Removed `@shopify/react-utilities` and replaced some of the functionality with `@shopify/css-utilities` or by moving the utilities into Polaris itself ([#1473](https://github.com/Shopify/polaris-react/pull/1473))

## 3.15.0 - 2019-05-14

This release fixes an issue introduced in `v3.14.0` that caused the `esnext` build not to succeed resulting in build errors for consumers ([#1466](https://github.com/Shopify/polaris-react/pull/1466))

### Enhancements

- Enhanced `NavigationItem`’s color accessibility for `active`, `focus`, `hover` and `Selected` states ([1304](https://github.com/Shopify/polaris-react/pull/1304))
- Added `align` prop to `TextField` ([#1428](https://github.com/Shopify/polaris-react/pull/1428))
- Added `clearButton` prop to `TextField` ([#1226](https://github.com/Shopify/polaris-react/pull/1226))

### Bug fixes

- Fixed `Checkbox` from improperly toggling when disabled ([#1467](https://github.com/Shopify/polaris-react/pull/1467))
- Fixed `Popover` fade-in flutter on iOS by switching Transition component for CSSTransition ([#1400](https://github.com/Shopify/polaris-react/pull/1400))
- Improved the visibility of focus styles for the `Link` component. ([#1425](https://github.com/Shopify/polaris-react/pull/1425))

### Documentation

- Updated accessibility testing documentation ([#1449](https://github.com/Shopify/polaris-react/pull/1449))
- Added guidelines for tertiary actions in modals to `Modal` component documentation ([#1336](https://github.com/Shopify/polaris-react/pull/1336))

### Development workflow

- Updated the a11y shitlist and re-enabled the pa11y job in CI. The job always passes for now, as a way for us to judge whether it is stable and can be made a required check. ([#1456](https://github.com/Shopify/polaris-react/pull/1456))

### Code quality

- Simplified logic in Checkbox component ([#1453](https://github.com/Shopify/polaris-react/pull/1453))

## 3.14.0 - 2019-05-08

### New components

- Added the `Sheet`component ([#1250](https://github.com/Shopify/polaris-react/pull/1250))

### Enhancements

- Added translations for all supported locales ([#1358](https://github.com/Shopify/polaris-react/pull/1358))
- Improved the performance of `ResourceList` ([#1313](https://github.com/Shopify/polaris-react/pull/1313))
- Added `withinContentContainer` context to `Navigation` ([#1393](https://github.com/Shopify/polaris-react/pull/1393))
- Added support for`Tooltip` content to wrap nonbreaking strings [#1395](https://github.com/Shopify/polaris-react/pull/1395)

### Bug fixes

- Removed `window` call on `server` executed code [#1427](https://github.com/Shopify/polaris-react/pull/1427)
- Fixed `onClick` from firing three times when using the enter key on a `ResourceList` item ([#1188](https://github.com/Shopify/polaris-react/pull/1188))
- Resolved console `[Intervention]` errors for touch interactions on `ColorPicker` ([#1414](https://github.com/Shopify/polaris-react/pull/1414))
- Fixed page scrolling while interacting with the color slider ([#1414](https://github.com/Shopify/polaris-react/pull/1414))
- Applied `font-family` to `button` elements which were being overridden by User Agent Stylesheet ([#1397](https://github.com/Shopify/polaris-react/pull/1397))
- Fixed `Checkbox` being toggled when disabled ([#1369](https://github.com/Shopify/polaris-react/pull/1369))
- Fixed `DropZone.FileUpload` from incorrectly displaying action hint and title when the default is used and removed ([#1233](https://github.com/Shopify/polaris-react/pull/1233))
- Fixed `ResourceList.Item` interaction states from being incorrectly applied ([#1312](https://github.com/Shopify/polaris-react/pull/1312)
- Fixed selected state for date picker in Windows high contrast mode ([#1342](https://github.com/Shopify/polaris-react/pull/1342))
- Fixed accessibility of skeleton components for Windows high contrast mode ([#1341](https://github.com/Shopify/polaris-react/pull/1341))
- Fixed `Loading` visibility in Windows high contrast mode ([#1389](https://github.com/Shopify/polaris-react/pull/1389))
- Fixed the position calculation of the `PositionedOverlay` component after scroll ([#1382](https://github.com/Shopify/polaris-react/pull/1382))
- Fixed styling issue for `Pagination` when used with `Tooltip` ([#1277](https://github.com/Shopify/polaris-react/pull/1277))
- Fixed certain children of a `TextContainer` having no top margin ([#1357](https://github.com/Shopify/polaris-react/pull/1357))
- Added border to `Tooltip` in Windows high contrast mode ([#1405](https://github.com/Shopify/polaris-react/pull/1405))
- Fixed `Navigation.Section` rollup collapsing when `Navigation.Item` `subNavigationItems` expand ([#1417](https://github.com/Shopify/polaris-react/pull/1417))

### Documentation

- Updated `Link` accessibility documentation for the `external` prop to reflect new behavior ([#1347](https://github.com/Shopify/polaris-react/pull/1347))
- Added accessibility documentation for `VisuallyHidden` ([#1348](https://github.com/Shopify/polaris-react/pull/1348))
- Added accessibility documentation for `TextStyle` ([#1350](https://github.com/Shopify/polaris-react/pull/1350))
- Added accessibility guidance for `Heading` and `Subheading` ([#1351](https://github.com/Shopify/polaris-react/pull/1351))
- Added accessibility documentation for `List` and `Stack` ([#1353](https://github.com/Shopify/polaris-react/pull/1353))
- Added accessibility guidance for `DisplayText` ([#1354](https://github.com/Shopify/polaris-react/pull/1354))
- Added guidance for updating component documentation and tophatting style guide changes ([#1362](https://github.com/Shopify/polaris-react/pull/1362))
- Added accessibility documentation and guidance for `ActionList` and `OptionList` ([#1365](https://github.com/Shopify/polaris-react/pull/1365))
- Added accessibility documentation for `Card` and `CalloutCard` ([#1366](https://github.com/Shopify/polaris-react/pull/1366))
- Added accessibility documentation for `Badge` ([#1364](https://github.com/Shopify/polaris-react/pull/1364))
- Added accessibility documentation for `Icon` ([#1404](https://github.com/Shopify/polaris-react/pull/1404))
- Added accessibility documentation for `Popover` ([#1408](https://github.com/Shopify/polaris-react/pull/1408))
- Fixed content example for `ContextualSaveBar` guidelines ([#1423](https://github.com/Shopify/polaris-react/pull/1423))

### Dependency upgrades

- Updated most `devDependencies` ([#1327](https://github.com/Shopify/polaris-react/pull/1327))
- Bumped `@shopify/react-utilites` to remove a transitive dependency on `core-js` ([#1343](https://github.com/Shopify/polaris-react/pull/1343))
- Updated App Bridge to version 1.3.0 ([#1349](https://github.com/Shopify/polaris-react/pull/1349))
- Updated `typescript` to 3.2.4 ([#1388](https://github.com/Shopify/polaris-react/pull/1388))
- Updated `sewing-kit` to 0.83.1 and babel-preset-shopify to ^18.1.0 ([#1344](https://github.com/Shopify/polaris-react/pull/1344))

### Code quality

- Updated `Dropzone.FileUpload` to no longer use `componentWillReceiveProps` and `componentWillMount` ([#1233](https://github.com/Shopify/polaris-react/pull/1233))
- Removed a `window.open` implementation error in `ResourceList.Item` ([#1294](<(https://github.com/Shopify/polaris-react/pull/1294)>))

## 3.13.0 - 2019-04-22

### Deprecations

- Deprecated Navigation `Item`’s `iconBody` prop. Pass a string into the `icon` prop instead. ([#1299](https://github.com/Shopify/polaris-react/pull/1299))

### Enhancements

- Added an `onChange` handler to `CheckableButton` ([#1326](https://github.com/Shopify/polaris-react/pull/1326))
- `Labelled` now wraps its content, no longer causing a `label + action` to get unreasonably squished ([#1309](https://github.com/Shopify/polaris-react/pull/1309))
- Updated `polaris-tokens` from `2.3.0` to `2.5.0` and converted all use of `duration` values ([#1268](https://github.com/Shopify/polaris-react/pull/1268))
- More consistent use of `text-breakword` mixin ([#1306](https://github.com/Shopify/polaris-react/pull/1306))
- Added an icon and screen reader hint when `Link` opens a new tab ([#1247](https://github.com/Shopify/polaris-react/pull/1247))
- Updated the pull request creation to create multiple pull requests and update `polaris-react` across multiple repos ([#1069](https://github.com/Shopify/polaris-react/pull/1069))
- Updated the pull request creation to retry when it fails ([#1069](https://github.com/Shopify/polaris-react/pull/1069))
- Exported overlay and layer data attributes for use in consumer components ([#1266](https://github.com/Shopify/polaris-react/pull/1266))
- Added new `frame-with-nav-max-width` variable and matching `frame-with-nav-when-not-max-width` mixin ([#1311](https://github.com/Shopify/polaris-react/pull/1311))
- Updated `Resizer` to schedule `handleHeightCheck` to run in next animation frame ([#1301](https://github.com/Shopify/polaris-react/pull/1301))

### Bug fixes

- Fixed `ResourceList` actions from show at incorrect breakpoints or while in select mode ([#1333](https://github.com/Shopify/polaris-react/pull/1333))
- Fixed Search overlay stretching below the viewport ([#1260](https://github.com/Shopify/polaris-react/pull/1260))
- Added `onChange` and `value` to select `AppProvider` examples to remove console errors ([#1320](https://github.com/Shopify/polaris-react/pull/1320))
- Fixed promoted bulk actions in `ResourceList` not properly disabling ([#1317](https://github.com/Shopify/polaris-react/pull/1317)) (thanks [@jineshshah36](https://github.com/jineshshah36) for the [issue report](https://github.com/Shopify/polaris-react/issues/1316))
- Fixed `ResourceList` header from displaying when `EmptySearchResult` exists ([#1286](https://github.com/Shopify/polaris-react/pull/1286))
- Stopped passing the `polaris` context into the div rendered by `Scrollable` ([#1271](https://github.com/Shopify/polaris-react/pull/1271))
- Fixed clickable area on sortable column headers on `DataTable` ([#1273](https://github.com/Shopify/polaris-react/pull/1273))

### Development workflow

Upgraded Storybook to v5 ([#1140](https://github.com/Shopify/polaris-react/pull/1140))

### Dependency upgrades

- Remove core-js ([#1328](https://github.com/Shopify/polaris-react/pull/1328))
- Upgraded Polaris icons to include the full icon set ([#1284](https://github.com/Shopify/polaris-react/pull/1284))

### Code quality

- Migrated the refs in `DropZone` to use the new createRef API ([#1063](https://github.com/Shopify/polaris-react/pull/1063))
- Updated `ResourceList` to no longer use `componentWillReceiveProps`([#1235](https://github.com/Shopify/polaris-react/pull/1235))
- Updated `Tabs` to no longer use `componentWillReceiveProps`([#1221](https://github.com/Shopify/polaris-react/pull/1221))
- Removed an unneeded media query from Modal’s `Header` component ([#1272](https://github.com/Shopify/polaris-react/pull/1272))
- Replaced all instances where we pass a string representing a bundled icon into `Button`. Prefer passing in the React Component from `@shopify/polaris-icons` ([#1297](https://github.com/Shopify/polaris-react/pull/1297))

## 3.12.0 - 2019-03-29

### Enhancements

- Added a public `focus` method on `Banner` ([#1219](https://github.com/Shopify/polaris-react/pull/1219))
- Added an `onScrollToBottom` prop to `Popover.Pane` ([#1248](https://github.com/Shopify/polaris-react/pull/1248))
- Added a `placeholder` prop to `FilterControl` ([#1257](https://github.com/Shopify/polaris-react/pull/1257))
- Added support for setting string values on the `TextField` `autoComplete` prop ([#1259](https://github.com/Shopify/polaris-react/pull/1259))

### Bug fixes

- Fixed disabled states while loading for `ResourceList` ([#1237](https://github.com/Shopify/polaris-react/pull/1237))
- Fixed `Checkbox` from losing focus and not receiving some modified events([#1112](https://github.com/Shopify/polaris-react/pull/1112))
- Added translation for the cancel button on the `ResourceList` `BulkActions` ([#1243](https://github.com/Shopify/polaris-react/pull/1243))
- Fixed the `Autocomplete` `onLoadMoreResults` prop not being called on scrolling to the end of the option list ([#1249](https://github.com/Shopify/polaris-react/pull/1249))

### Documentation

- Removed `button group joined to the bottom of a component` example ([#1267](https://github.com/Shopify/polaris-react/pull/1267))

## 3.11.0 - 2019-03-21

### Enhancements

- Updated `Navigation` badge prop to accept a react node ([#1142](https://github.com/Shopify/polaris-react/pull/1142))
- Changed max width on `Search` to 694px so that it is perfectly centered in the top bar ([#1107](https://github.com/Shopify/polaris-react/issues/1107))
- Added `action` prop to `Toast` ([#919](https://github.com/Shopify/polaris-react/pull/919))
- Remove all usage of `@shopify/javascript-utilities/decorators`, namely `autobind`, `debounce`, and `memoize` ([#1148](https://github.com/Shopify/polaris-react/issues/1148))
- Added `Empty State` footerContent prop ([#1200](https://github.com/Shopify/polaris-react/pull/1200))
- Added viewport condition to `TopBar` to enlarge the `contextControl` wrapper on wider screens ([#1231](https://github.com/Shopify/polaris-react/pull/1231))

### Bug fixes

- Fixed selectMode on `ResourceList` not toggling when items are selected programmatically ([#1224](https://github.com/Shopify/polaris-react/pull/1224))
- Fixed unnecessary height on `TextField` due to unhandled carriage returns ([#901](https://github.com/Shopify/polaris-react/pull/901))
- Ensured server side rendering matches client side rendering for [embedded app components](https://github.com/Shopify/polaris-react/blob/master/documentation/Embedded%20apps.md#components-which-wrap-shopify-app-bridge) ([#976](https://github.com/Shopify/polaris-react/pull/976))
- Fixed rendering of the spinner on `TextField` when setting to readOnly ([#1118](https://github.com/Shopify/polaris-react/pull/1199))
- Fixed webpack example that does not compile ([#1189](https://github.com/Shopify/polaris-react/issues/1189))

### Documentation

- Added accessibility documentation for `Checkbox`, `RadioButton`, and `ChoiceList` ([#1145](https://github.com/Shopify/polaris-react/pull/1145))

### Dependency upgrades

- Regenerated the yarn.lock file in the browserify example to resolve security vulnerabilities ([#1202](https://github.com/Shopify/polaris-react/issues/1202))
- Updated browserify example dependencies and dev dependencies ([#1191](https://github.com/Shopify/polaris-react/issues/1191))
- Updated webpack example dependencies and dev dependencies ([#1189](https://github.com/Shopify/polaris-react/issues/1189))

### Code quality

- Replaced all occurrences of `_.merge` with a custom `merge` function ([#1018](https://github.com/Shopify/polaris-react/pull/1018))
- Replaced all occurrences of `_.pick` with a custom pick function ([#1020](https://github.com/Shopify/polaris-react/pull/1020))
- Deleted the icons index file that would re-export icons, and replaced it with direct imports ([#1195](https://github.com/Shopify/polaris-react/pull/1195))
- Replaces all instances where we pass a string representing a bundled icon into `Icon`. Prefer passing in the React Component from `@shopify/polaris-icons` ([#1196](https://github.com/Shopify/polaris-react/pull/1196))

## 3.10.0 - 2019-03-07

### Enhancements

- Added Polaris version information tracking in App Bridge actions ([#1087](https://github.com/Shopify/polaris-react/pull/1087))
- Re-added the navigation’s border-right ([#1096](https://github.com/Shopify/polaris-react/pull/1096))
- Added `onScrolledToBottom` prop to `Modal` ([#1117](https://github.com/Shopify/polaris-react/pull/1117))
- Updated `Navigation.Item` to use `Icon` when `iconBody` prop is passed in. Renders these icons in an `img` tag now. ([#1094](https://github.com/Shopify/polaris-react/pull/1094))
- Added focus state outlines to be visible when using Windows High Contrast Mode for `Button` ([#1101](https://github.com/Shopify/polaris-react/pull/1101))

### Bug fixes

- Reverted a change that constrained `DropZone` height based on inherited wrapper height [#1129](https://github.com/Shopify/polaris-react/pull/1129)
- Fixed missing rounded corners on `Tag` button states ([#1078](https://github.com/Shopify/polaris-react/pull/1078))
- Removed reference to `window.Polaris`, which in some cases could be undefined ([#1104](https://github.com/Shopify/polaris-react/issues/1104))
- Added padding and margin to `subdued` sections for proper spacing between the header and footer ([#1082](https://github.com/Shopify/polaris-react/pull/1082))
- Removed left margin from vertical `Stack` to prevent overflow ([#1024](https://github.com/Shopify/polaris-react/pull/1024))
- Fixed the size differences between `SkeletonThumbnail` and `Thumbnail` ([#1141](https://github.com/Shopify/polaris-react/pull/1141)) (thanks [@mbaumbach](https://github.com/mbaumbach) for the [issue report](https://github.com/Shopify/polaris-react/issues/1135))
- Refactored `ComboBox` tests that were not running ([#1137](https://github.com/Shopify/polaris-react/pull/1137))

### Documentation

- Updated related component documentation for `Page`, `PageActions`, and `Pagination` ([#1103](https://github.com/Shopify/polaris-react/pull/1103))
- Improved `Modal` documentation for properties only available in a stand-alone app context ([#1065](https://github.com/Shopify/polaris-react/pull/1065))
- Added accessibility documentation about `Banner` ([#1071](https://github.com/Shopify/polaris-react/pull/1071))
- Added accessibility documentation for `InlineError` ([#1073](https://github.com/Shopify/polaris-react/pull/1073))
- Added accessibility documentation for `Loading` ([#1075](https://github.com/Shopify/polaris-react/pull/1075))
- Fixed documentation about the `ariaPressed` prop for `Button` ([#1097](https://github.com/Shopify/polaris-react/pull/1097))
- Fixed examples using the `selected` prop for `Autocomplete` ([#1053](https://github.com/Shopify/polaris-react/pull/1053))

### Development workflow

- Added viewport meta tag to Storybook frame ([#1026](https://github.com/Shopify/polaris-react/pull/1026))

### Code quality

- Removed lodash decorators and replace all occurrences of `_.throttle` with `debounce` ([#1009](https://github.com/Shopify/polaris-react/pull/1009))
- Removed all occurrences of `_.replace` ([#1012](https://github.com/Shopify/polaris-react/pull/1012))
- Added lodash to `create-react-app` example ([#1010](https://github.com/Shopify/polaris-react/pull/1010))
- Updated `create-react-app` example dependencies ([#1010](https://github.com/Shopify/polaris-react/pull/1010))
- Replaced all occurrences of `_.capitalize` with a custom `capitalize` function ([#1015](https://github.com/Shopify/polaris-react/pull/1015))
- Replaced all occurrences of `_.isObject` with a custom `isObject` function ([#1011](https://github.com/Shopify/polaris-react/pull/1011))
- Replaced all occurrences of `_.get` with a custom `get` function ([#1013](https://github.com/Shopify/polaris-react/pull/1013))
- Moved icons specific to `Banner`, `DropZone`, and `ResourceList` to [@shopify/polaris-icons](https://www.npmjs.com/package/@shopify/polaris-icons) ([#1042](https://github.com/Shopify/polaris-react/pull/1042))
- Updated spinner component to use the `Image` component instead of an SVG tag to render ([#1042](https://github.com/Shopify/polaris-react/pull/1042))

### Deprecations

- Deprecated passing a React Element into the `Icon` component in favor of passing a React Component ([#1042](https://github.com/Shopify/polaris-react/pull/1042))
- Deprecated the untrusted prop in the `Icon` component ([#1042](https://github.com/Shopify/polaris-react/pull/1042))

## 3.9.0 - 2019-02-21

### Enhancements

- Used `base-tight` `spacing` value instead of `rem(12px)` ([#1044](https://github.com/Shopify/polaris-react/pull/1044))

### Bug fixes

- Fixed the `focused` prop on `TextField` so it sets the focus state ([#990](https://github.com/Shopify/polaris-react/pull/990))
- Resolved an unsupported `React.Fragment` syntax ([#1080](https://github.com/Shopify/polaris-react/pull/1080))
- Constrained `DropZone` height based on inherited wrapper height [#908](https://github.com/Shopify/polaris-react/pull/908)
- Reverted a change that adjusted padding in the `Card` component introduced in ([#962](https://github.com/Shopify/polaris-react/pull/962))

## 3.8.0 - 2019-02-20

### New components

- `SkeletonThumbnail` for representing thumbnails in loading state

### Enhancements

- Updates `TopBar.UserMenu` interaction states styling ([#1006](https://github.com/Shopify/polaris-react/pull/1006))
- Added `download` prop to `Button` and `UnstyledLink` components that enables setting the download attribute ([#1027](https://github.com/Shopify/polaris-react/pull/1027))
- Added support for internationalization of month and week names to `DatePicker` ([#1005](https://github.com/Shopify/polaris-react/pull/1005))
- Added `untrusted` prop to `Icon` to render SVG strings in an img tag ([#926](https://github.com/Shopify/polaris-react/pull/926))
- Added a `data-href` to `ResourceList.Item`s that have a `url` prop ([#1054](https://github.com/Shopify/polaris-react/pull/1054))

### Bug fixes

- Fixed `type="number"` `TextField` to prevent conditions where press-and-hold could increment or decrement infinitely ([#1029](https://github.com/Shopify/polaris-react/pull/1029))
- Fixed the top border of `DataTable` overlapping its container’s border ([#975](https://github.com/Shopify/polaris-react/pull/975))
- Fixed the `DataTable` sort direction not reversing on second sort of the initially sorted column ([#918](https://github.com/Shopify/polaris-react/pull/918)) (thanks [@tabrez96](https://github.com/tabrez96) for the [issue report](https://github.com/Shopify/polaris-react/issues/873))
- Changed the offset from 5px to 4px in `Tooltip` between activator and message to be consistent with `Popover` ([#1019](https://github.com/Shopify/polaris-react/pull/1019))
- Fixed `Card` header not showing when `title` empty or not set ([#1031](https://github.com/Shopify/polaris-react/pull/1032))
- Fixed an issue on Chrome when you use a `TextField` inside `Collapsible` which is inside a scrollable element, the text disappeared if you focused a fully hidden `TextField` ([#1047](https://github.com/Shopify/polaris-react/pull/1047))

### Documentation

- Added accessibility documentation for the button and link components ([#924](https://github.com/Shopify/polaris-react/pull/924))
- Added accessibility recommendations for the text field and autocomplete components ([#968](https://github.com/Shopify/polaris-react/pull/968))

### Development workflow

- Added a test that builds Polaris for web and polaris-styleguide. This test takes ~20 minutes to run so it’s only configured to run for master ([931](https://github.com/Shopify/polaris-react/pull/931))
- Enabled `no-vague-titles eslint` rule ([#1051](https://github.com/Shopify/polaris-react/pull/1051))

## 3.7.1 - 2019-02-12

### Bug fixes

- Moved character counter to bottom of multiline text input ([#992](https://github.com/Shopify/polaris-react/pull/992))
- Aligned `TopBar` search input and results with page content ([#1008](https://github.com/Shopify/polaris-react/issues/1008))

### Documentation

- Added all props example of `ResourceList` in the [style guide](https://polaris.shopify.com) ([#978](https://github.com/Shopify/polaris-react/pull/978))

## 3.7.0 - 2019-02-11

### Enhancements

- Removed `TopBar` logo background ([#957](https://github.com/Shopify/polaris-react/pull/957))
- Updated `TopBar` search results width to adapt to search input and added a minimum width ([#969](https://github.com/Shopify/polaris-react/pull/969))
- Updated `Card.Section` to accept `React.ReactNode` as `title` ([#781](https://github.com/Shopify/polaris-react/pull/781))
- Added `contextControl` prop to `TopBar` and `Navigation` ([#966](https://github.com/Shopify/polaris-react/pull/966))

### Bug fixes

- Fixed `Collapsible` to use `overflow: visible;` once fully open ([#951](https://github.com/Shopify/polaris-react/pull/951))
- Fixed the `DataTable` sort direction not reversing on second sort of the initially sorted column ([#918](https://github.com/Shopify/polaris-react/pull/918)) (thanks [@tabrez96](https://github.com/tabrez96) for the [issue report](https://github.com/Shopify/polaris-react/issues/873))
- Fixed `TextField` when passing `null` to `value` ([#964](https://github.com/Shopify/polaris-react/pull/964)) (thanks [@mbaumbach](https://github.com/mbaumbach) for the [original issue](https://github.com/Shopify/polaris-react/issues/959))
- Changed the default value for `showHidden` prop on `ResourcePicker` for backward compatibility with legacy EASDK ([#981](https://github.com/Shopify/polaris-react/pull/981))
- Adjusted top and bottom padding to the header, footer and sections in `Card` to add space between action buttons in the header and footer and the card sections. ([#962](https://github.com/Shopify/polaris-react/pull/962))

### Documentation

- Added accessibility documentation for the account connection and setting toggle components ([#970](https://github.com/Shopify/polaris-react/pull/970))
- Added accessibility documentation for the avatar component ([#973](https://github.com/Shopify/polaris-react/pull/973))
- Updated docs about App Bridge usage in AppProvider ([#945](https://github.com/Shopify/polaris-react/pull/945))
- Added all props example to `DataTable` in the [style guide](https://polaris.shopify.com) ([#1003](https://github.com/Shopify/polaris-react/pull/939))

### Development workflow

- Fixed links to Polaris component pages in story descriptions ([#933](https://github.com/Shopify/polaris-react/pull/933))

### Dependency upgrades

- Upgraded to `@shopify/polaris-icons` v2.0.0 ([#982](https://github.com/Shopify/polaris-react/pull/982))

### Code quality

- Updated `import styles from './foo.scss';` from non-standard `import * as styles from './foo.scss';` when importing scss files ([#929](https://github.com/Shopify/polaris-react/pull/929))
- Removed internal ellipsis icon as it is deprecated, and horizontalDots should be used instead ([#974](https://github.com/Shopify/polaris-react/pull/974))

## 3.6.0 - 2019-01-30

### Enhancements

- Updated `TextField` to accept a `showCharacterCount` prop enabling the display of character count ([#709](https://github.com/Shopify/polaris-react/pull/709))

### Bug fixes

- Fixed vertical misalignment in `Banner.Header`([#870](https://github.com/Shopify/polaris-react/pull/870))
- Removed a duplicate `activatorWrapper` in `Popover` when destructuring props ([#916](https://github.com/Shopify/polaris-react/pull/916))
- Fixed `Banner` secondaryAction content wrapping in Firefox ([#719](https://github.com/Shopify/polaris-react/pull/719))
- Added `onKeyPress`, `onKeyDown`, and `onKeyUp` to `Button` ([#860](https://github.com/Shopify/polaris-react/pull/860))
- Added `monochrome` prop to `Button` and `Link` component ([#821](https://github.com/Shopify/polaris-react/pull/821))
- Updated `Frame` layout and made `TopBar.UserMenu` visible on mobile ([#852](https://github.com/Shopify/polaris-react/pull/852))
- Added a `forceRender` prop to `Page` to not delegate to the app bridge TitleBar action ([#695](https://github.com/Shopify/polaris-react/pull/695))
- Changed `Tabs` example to contain children so the `Panel` renders for accessibility ([#893](https://github.com/Shopify/polaris-react/pull/893))
- Fixed timezone not being accounted for in `ResourceList` date filter control ([#710](https://github.com/Shopify/polaris-react/pull/710))
- Removed unnecessary tooltip text in the `TopBar` component ([#859](https://github.com/Shopify/polaris-react/pull/859))

### Documentation

- Added `Stack.Item` properties and description to [style guide](https://polaris.shopify.com)’s ([#772](https://github.com/Shopify/polaris-react/pull/772))
- Added accessibility documentation to the resource list and data table components ([#927](https://github.com/Shopify/polaris-react/pull/927))
- Added accessibility recommendations for the caption component ([#928](https://github.com/Shopify/polaris-react/pull/928/))

### Development workflow

- Improved build speed by adjusting our rollup workflow ([#912](https://github.com/Shopify/polaris-react/pull/912)) and not optimizing svgs in the node_modules folder ([#920](https://github.com/Shopify/polaris-react/pull/920))
- Fixed an issue where deployments would use an old version of Yarn, and open a pull request to polaris-styleguide with thousands of deleted integrity hashes in `yarn.lock` ([#856](https://github.com/Shopify/polaris-react/pull/856))

### Dependency upgrades

- Updated App Bridge to version 1.0.3 ([#844](https://github.com/Shopify/polaris-react/pull/844))

### Deprecations

- Deprecated `Navigation.UserMenu` in favor of `TopBar.UserMenu` ([#849](https://github.com/Shopify/polaris-react/pull/849))
- Deprecated `Navigation`’s `userMenu` prop ([#930](https://github.com/Shopify/polaris-react/pull/930))

## 3.5.0 - 2019-01-16

### Enhancements

- Update build toolchain to use Babel v7, PostCSS v7 and Rollup v1. Updated our build targets match our [supported browsers](https://help.shopify.com/en/manual/intro-to-shopify/shopify-admin/supported-browsers), leading to a reduction in bundle size ([#837](https://github.com/Shopify/polaris-react/pull/837))

### Bug fixes

- Ensured disabled `Button` components with a `url` prop output valid HTML ([#773](https://github.com/Shopify/polaris-react/pull/773))
- Fixed `DropZone` which was unable to add a duplicate file back to back or add a file again once removed [#782](https://github.com/Shopify/polaris-react/pull/782). Thank you [@jzsplk](https://github.com/jzsplk) for the contribution [#425](https://github.com/Shopify/polaris-react/issues/425) and [@vladucu](https://github.com/vladucu) for the clear example.
- Added a fallback to the `safeAreaFor` Sass mixin to handle browsers that don’t support `env` and `constant` ([#881](https://github.com/Shopify/polaris-react/pull/881))

### Documentation

- Added deprecation guidelines ([#853](https://github.com/Shopify/polaris-react/pull/853))

### Development workflow

- Replaced our home-grown playground with Storybook (still accessed through `yarn dev`) ([#768](https://github.com/Shopify/polaris-react/pull/768))
- Removed our usage of babel-node for build scripts - use plain node instead ([#836](https://github.com/Shopify/polaris-react/pull/836))
- Ensured CSS builds are reproducible ([#869](https://github.com/Shopify/polaris-react/pull/869))

## 3.4.0 - 2019-01-08

### Enhancements

- Moved icons to a separate npm package ([#686](https://github.com/Shopify/polaris-react/pull/686))
- Added `oneHalf` and `oneThird` props to `Layout` component ([#724](https://github.com/Shopify/polaris-react/pull/724))
- Added `helpText` prop to `ActionList` items ([#777](https://github.com/Shopify/polaris-react/pull/777))
- Updated `Page` header layout so actions take up less room on small screens ([#707](https://github.com/Shopify/polaris-react/pull/707))
- Added `alternateTool` prop to `ResourceList` component ([#812](https://github.com/Shopify/polaris-react/pull/812))
- Updated color of warning status `ExceptionList` items from dark orange to dark yellow for better differentiation from critical status items ([#813](https://github.com/Shopify/polaris-react/pull/813))

### Bug fixes

- Fixed `TextField` not showing the correct color while it has focus and an error ([#806](https://github.com/Shopify/polaris-react/pull/806))
- Fixed `ResourceList` not rendering `BulkActions` on initial load when items were selected ([#746](https://github.com/Shopify/polaris-react/pull/746))
- Fixed the new variant of the `Badge` component so that it is simpler and easier to read ([#751](https://github.com/Shopify/polaris-react/pull/751))
- Reverted a change that set the `autocomplete` property on `TextField` to `nope` when it was `false` ([#761](https://github.com/Shopify/polaris-react/pull/761))
- Added dismiss button for `CalloutCard` ([#353](https://github.com/Shopify/polaris-react/issues/353))
- Removed an extra tab stop from `ResourceList.Item` and make it unactionable while loading ([#745](https://github.com/Shopify/polaris-react/pull/745))
- Fixed `Checkbox` from losing focus when quickly toggled ([#717](https://github.com/Shopify/polaris-react/pull/717))
- Fixed the console error in the `PositionedOverlay` test environment ([#758](https://github.com/Shopify/polaris-react/pull/758))
- Fixed `ResourceList` not rendering a header after initial load (thanks to [@andrewpye](https://github.com/andrewpye) for the [original issue](https://github.com/Shopify/polaris-react/issues/735))
- Fixed `TextField` not passing `step` to the input ([#829](https://github.com/Shopify/polaris-react/pull/829))
- Renamed `Option` and `Group` types in `Select` to work around typedoc oddness ([#830](https://github.com/Shopify/polaris-react/pull/830))

### Documentation

- Modified image paths to fit the [style guide](https://polaris.shopify.com)’s new Markdown parsing rules ([#753](https://github.com/Shopify/polaris-react/pull/753))

### Development workflow

- Added a slight delay to the Percy screenshot script to give time for components to render fully ([#704](https://github.com/Shopify/polaris-react/pull/704))
- Refactored to remove cyclical type imports ([#759](https://github.com/Shopify/polaris-react/pull/759), [#754](https://github.com/Shopify/polaris-react/pull/754), and [#767](https://github.com/Shopify/polaris-react/pull/767))

### Dependency upgrades

- Upgraded `@shopify/polaris-tokens` to v2.1.1 ([#813](https://github.com/Shopify/polaris-react/pull/813))

## 3.3.0 - 2018-12-12

### Enhancements

- Added support for `ResourceList.Item` opening a URL in new tab if <kbd>command</kbd> or <kbd>control</kbd> keys are pressed during click ([#690](https://github.com/Shopify/polaris-react/pull/690))
- Added `primaryAction` prop to `SkeletonPage` ([#488](https://github.com/Shopify/polaris-react/pull/488))
- Added support for press-and-hold to increment and decrement value in a `type="number"` `TextField` ([#573](https://github.com/Shopify/polaris-react/pull/573)) (thanks to [@andrewpye](https://github.com/andrewpye) for the [original issue](https://github.com/Shopify/polaris-react/issues/420))
- Forced `Avatar` to fall back to `initials` when the image fails to load ([#712](https://github.com/Shopify/polaris-react/pull/712))

### Bug fixes

- Fixed `Popover` not opening in a small `Scrollable` container ([#658](https://github.com/Shopify/polaris-react/pull/658))
- Fixed `Page` header component to only render actions wrapper when actions are present ([#732](https://github.com/Shopify/polaris-react/pull/732))
- Fixed `ContextualSaveBarProps` type not being exported ([#734](https://github.com/Shopify/polaris-react/pull/734))
- Fixed `Avatar` proportions when image is not square ([#740](https://github.com/Shopify/polaris-react/pull/740))

### Development workflow

- Upgraded to TypeScript 3.1.6 ([#700](https://github.com/Shopify/polaris-react/pull/700))
- Moved some inconsistent prop types around for compatibility with the style guide’s Props Explorer ([#727](https://github.com/Shopify/polaris-react/pull/727))

## 3.2.1 - 2018-12-04

### Bug fixes

- Fixed `ToastProps` type not being exported ([#722](https://github.com/Shopify/polaris-react/pull/722))
- Fixed Shopify App Bridge import issues in `AppProvider` and `enzyme` test utilities ([#720](https://github.com/Shopify/polaris-react/pull/720))

## 3.2.0 - 2018-12-04

### Enhancements

- Updated `TextField` to no longer use `componentWillReceiveProps`([#628](https://github.com/Shopify/polaris-react/pull/628))
- Updated `EventListener` to no longer use `componentWillUpdate` ([#628](https://github.com/Shopify/polaris-react/pull/628))
- Allowed `Icon` to accept a React Node as a source ([#635](https://github.com/Shopify/polaris-react/pull/635)) (thanks to [@mbriggs](https://github.com/mbriggs) for the [original issue](https://github.com/Shopify/polaris-react/issues/449))
- Added `alignContentFlush` prop to ContextualSaveBar ([#654](https://github.com/Shopify/polaris-react/pull/654))

### Bug fixes

- Fixed `Pagination` from calling `onNext` and `onPrevious` while `hasNext` and `hasPrevious` are false for key press events ([#643](https://github.com/Shopify/polaris-react/pull/643))
- Removed min-width from `FormLayout` `Items` and applying it only to `Items` used inside a `FormLayout.Group` ([#650](https://github.com/Shopify/polaris-react/pull/650))
- Removed added space in `ChoiceList` when choice has children on selection but is not selected ([#665](https://github.com/Shopify/polaris-react/issues/665))
- Fixed `errorOverlayText` on `Dropzone` ([#671](https://github.com/Shopify/polaris-react/pull/671))
- Updated the `InlineError` text color, the error border-color on form fields and the error `Icon` color to be the same red. ([#676](https://github.com/Shopify/polaris-react/pull/676))
- Fixed `AppProvider` server side rendering support ([#696](https://github.com/Shopify/polaris-react/pull/696)) (thanks [@sbstnmsch](https://github.com/sbstnmsch) for the [original issue](https://github.com/Shopify/polaris-react/issues/372))
- Fixed `TextField` autocomplete disabling by setting autocomplete="nope" when `autoComplete` prop is `false` ([#708](https://github.com/Shopify/polaris-react/pull/708))

### Documentation

- Updated documentation links to match the new style guide link structure ([#478](https://github.com/Shopify/polaris-react/pull/478))

### Development workflow

- `yarn run tophat` has been removed and its functionality has been moved into the `yarn run dev` server. Example editing now supports hot-reloading so you don’t need restart the server anymore.

### Dependency upgrades

- Bumped `@shopify/polaris-tokens` to v2.0.0. This is a **breaking change** for consumers of color design tokens in languages such as JavaScript and Sass ([full release notes](https://github.com/Shopify/polaris-tokens/blob/master/CHANGELOG.md#200---2018-10-23))

## 3.1.1 - 2018-11-19

### Bug fixes

- Fixed selector import in `DataTable` and `Cell` ([#638](https://github.com/Shopify/polaris-react/pull/638))

## 3.1.0 - 2018-11-16

### Enhancements

- Improved `Avatar` so it falls back to `initials` when the image fails to load ([#557](https://github.com/Shopify/polaris-react/pull/557))
- Added `onScrolledToBottom` prop to `Scrollable` ([#568](https://github.com/Shopify/polaris-react/pull/568))

### Bug fixes

- Fixed `Action`’s selector in `Page`’s `Header` component ([#523](https://github.com/Shopify/polaris-react/pull/523))
- Fixed `Card` spacing in small devices ([#608](https://github.com/shopify/polaris-react/pull/608))
- Fixed `ResourceList` `BulkActions` that were remaining in fixed position outside the `boundingElement` ([#627](https://github.com/Shopify/polaris-react/pull/627))
- Improved readability of `Badge` with `size` small and `status` new for navigation ([#633](https://github.com/shopify/polaris-react/pull/633))

## 3.0.1 - 2018-11-14

### Bug fixes

- Fixed `Datepicker` ranges when `start` and `end` dates are similar but have different references ([#601](https://github.com/Shopify/polaris-react/pull/601))
- Fixed `DataTable` column visibility calculation in production environments by using a `data-polaris-header-cell` attribute instead of class-based targeting ([#615](https://github.com/Shopify/polaris-react/pull/615))
- Fixed `Navigation.Item` not calling `onClick` on small screens when `onNavigationDismiss` is undefined ([#603](https://github.com/Shopify/polaris-react/pull/603))
- Fixed `Autocomplete` empty state example Markdown not parsing correctly ([#592](https://github.com/Shopify/polaris-react/pull/592))
- Fixed `TopBar`’s `UserMenu` alignment to be right-aligned when `TopBar` isn’t passed a `searchField` prop ([#597](https://github.com/Shopify/polaris-react/pull/597))
- Removed erroneous SCSS file import that rendered Polaris unable to be used in typescript projects without scss support ([#609](https://github.com/Shopify/polaris-react/pull/609))
- Fixed `Popover` inconsistent border-radius values ([#605](https://github.com/Shopify/polaris-react/pull/605))
- `TextStyle` strong variant now uses a span tag instead of b ([#606](https://github.com/Shopify/polaris-react/pull/606))
- Fixed non-blocking context errors when using `Toast` or `Loading` in an embedded app ([#613](https://github.com/Shopify/polaris-react/pull/613))

## 3.0.0 - 2018-11-09

### Breaking changes

- Added padding top and bottom on `Card.Section` when set to full width
- Fixed `Portal` rendering by using `componentDidMount` lifecycle hook as opposed to `componentWillMount`
- Fixed an issue where clicking a `Link` without a `url` in a form would implicitly submit the form. `Link` can no longer submit forms. Use `<Button submit>` instead.
- Renamed the `Keys` enum to align with Shopify naming standards. It is now singular and the properties are in PascalCase. Replace `import {Keys} from '@shopify/polaris'` with `import {Key} from '@shopify/polaris'` and change the casing of the properties, e.g. replace `Keys.DOWN_ARROW` with `Key.DownArrow`.
- Added !important to `display: none` in `@print-hidden` mixin

#### Embedded apps

- Use the Shopify App Bridge in favor of the EASDK. The EASDK has been removed.
- Added Shopify App Bridge support to new components `Toast` and `Loading`
- Added `target` prop to all actions which get passed to the Shopify App Bridge
- Added new `size` and `message` props to `Modal` which aligns with the Shopify App Bridge API
- Added new `resourceType`, `initialQuery`, and `showVariants` props to `ResourcePicker` which aligns with the Shopify App Bridge API
- Moved embedded `ResourcePicker`, `Modal`, and `Page` to the main bundle and removed the embedded bundle. Imports from `'@shopify/polaris/embedded'` will no longer work, use `'@shopify/polaris'` instead.
- Made the `shopOrigin` prop on `AppProvider` optional. It’s now provided by default. If you do provide a `shopOrigin` it now needs to be given without the `'https://'` per the Shopify App Bridge API.
- Updated `onSelection` prop on `ResourcePicker`. The shape of the `selectPayload` data has changed and the product `id` is now a `gid`. For example, `/9019381572` is now `gid://shopify/Product/9019381572`. We offer [@shopify/admin-graphql-api-utilities](https://www.npmjs.com/package/@shopify/admin-graphql-api-utilities) to help compose and parse `gid` from Shopify admin.
- Updated default values for `ResourcePicker` props to align with the Shopify App Bridge. Set the props `showHidden`, `allowMultiple={false}`, and `showVariants={false}` to get the previous default behavior.
- Updated `target` prop type related to embedded apps, use `'APP'`, `'ADMIN_PATH'`, or `'REMOTE'`
- Removed `icon` prop from `Page`. Upload your app’s icon in the Shopify Partners dashboard “App setup” section instead.
- Removed `title` prop from `ResourcePicker` as setting a title is no longer supported by the Shopify App Bridge
- Removed `products` prop from `ResourcePicker`, use `resourceType="Product"` instead
- Removed `collections` prop from `ResourcePicker`, use `resourceType="Collection"` instead
- Removed `width` and `height` props from `Modal`, use `size` instead
- Removed `debug` prop from `AppProvider`, use [Redux DevTools](https://github.com/reduxjs/redux-devtools) instead. Redux DevTools also has [browser extensions](https://github.com/zalmoxisus/redux-devtools-extension).
- Removed the `Alert` component, use `Modal` with `message` prop instead
- Replaced `easdk` on React context with `appBridge`. Access it via `this.context.polaris.appBridge`.
- Removed `this.context.easdk.startLoading()` and `this.context.easdk.stopLoading()`, use the `Loading` component instead
- Removed `this.context.easdk.showFlashNotice()`, use the `Toast` component instead
- Removed `this.context.easdk.pushState()`, use the [Shopify App Bridge `History` action](https://help.shopify.com/en/api/embedded-apps/app-bridge/actions/navigation/history) instead. The `History` action requires passing the `appBridge` instance which is accessible via `this.context.polaris.appBridge`.
- Removed `this.context.easdk.redirect()`, use the [Shopify App Bridge `Redirect` action](https://help.shopify.com/en/api/embedded-apps/app-bridge/actions/navigation/redirect) instead. The `Redirect` action requires passing the `appBridge` instance which is accessible via `this.context.polaris.appBridge`.

#### License

- Updated the license from MIT to a custom license based on MIT. The new license restricts Polaris usage to applications that integrate or interoperate with Shopify software or services, with additional restrictions for external, stand-alone applications.

### New components

We’ve released a suite of new components that, when combined, form the application frame of a stand-alone (or non-embedded) Polaris app.

#### [Frame](https://polaris.shopify.com/components/structure/frame)

The frame component, while not visible in the user interface itself, provides the structure for any non-embedded application. It wraps the main elements and houses the following components:

- primary [navigation](https://polaris.shopify.com/components/navigation/navigation)
- [top bar](https://polaris.shopify.com/components/structure/top-bar)
- [toast](https://polaris.shopify.com/components/feedback-indicators/toast)
- [loading](https://polaris.shopify.com/components/feedback-indicators/loading)
- [contextual save bar](https://polaris.shopify.com/components/forms/contextual-save-bar)

#### [Navigation](https://polaris.shopify.com/components/navigation/navigation)

The navigation component is used to display the primary navigation in the sidebar of the [frame](https://polaris.shopify.com/components/structure/frame) of any non-embedded application. Navigation includes a list of links that merchants use to move between sections of the application.

#### [TopBar](https://polaris.shopify.com/components/structure/top-bar)

The top bar component is always visible at the top of a non-embedded application. Its logo and color can be customized using the [app provider](https://polaris.shopify.com/components/structure/app-provider) component to reflect an application’s brand. Merchants can use it to search an application, access menus, and navigate by clicking on the logo.

#### [Toast](https://polaris.shopify.com/components/feedback-indicators/toast)

The toast component is a non-disruptive message that appears at the bottom of the interface to provide quick, at-a-glance feedback on the outcome of an action.

#### [Loading](https://polaris.shopify.com/components/feedback-indicators/loading)

The loading component is used to indicate to merchants that a page is loading or an upload is processing.

#### [ContextualSaveBar](https://polaris.shopify.com/components/forms/contextual-save-bar)

The contextual save bar tells merchants their options once they have made changes to a form on the page. This component is also shown while creating a new object like a product or customer. Merchants can use this component to save or discard their work.

#### [Autocomplete](https://polaris.shopify.com/components/forms/autocomplete)

The autocomplete component is an input field that provides selectable suggestions as a merchant types into it. It allows merchants to quickly search through and select from large collections of options.

### Enhancements

- Changed `Form` to default the `method` to `post` in order to prevent accidental leaking of form details
- Added support for boolean type on Choice error prop
- Changed the esnext folder to contain individual, minimally transpiled JavaScript component files, as well as raw style and image assets
- Added `onPortalCreated` prop to `Portal`
- Improved consistency of `Badge` styling
- Explicitly specifying `list-style` on `List`

### Bug fixes

- Fixed console error and used new ref syntax in `DataTable` (thanks to [@duythien0912](https://github.com/duythien0912) for the [original issue](https://github.com/Shopify/polaris-react/issues/403))
- Fixed the ability to upload multiple files even when `allowedMultiple` prop is false
- Fixed `Datatable` so it resizes with new content (thanks [@andrewpye](https://github.com/andrewpye) for the [original issue](https://github.com/Shopify/polaris-react/issues/387))
- Fixed `RangeSlider` linear-gradient so it doesn’t break the css build (thanks [@Ankitjasoliya](https://github.com/Ankitjasoliya) and [@nerfologist](https://github.com/nerfologist) for the [original issue](https://github.com/Shopify/polaris-react/issues/441))
- Fixed issue in `Page`, where styling wasn’t being applied correctly to Page Actions
- Removed unnecessary bindings on the `Modal`’s `onClose` prop
- Rearranged `primaryFooterAction` and `secondaryFooterAction` in `Card` (thanks [@sivakumar-kailasam](https://github.com/sivakumar-kailasam) for the [original issue](https://github.com/Shopify/polaris-react/issues/551))

### Documentation

- Updated banner guidelines to make it clearer when success banners should be used vs success toasts.
- Added examples for iOS and Android section header
- Added examples for iOS and Android thumbnail
- Added examples for iOS and Android empty state
- Added examples for iOS and Android text field
- Added examples for iOS and Android select
- Added examples for iOS and Android keyboard accessories
- Added examples for iOS and Android collapsible
- Added examples for iOS and Android list
- Clarified placement and usage of `Banner`
- Added an explanation to `Modal` about why it can’t be closed by clicking outside the modal and should only be closed by clicking `X` or `Cancel`

### Development workflow

- Moved sub-sub-components within `ResourceList` into components folders
- Removed empty state from `ResourceList` if there are no items and `loading` is true
- Move to use sewing-kit for test running, updating to Jest 23 in the process. This gives us working sourcemaps for code coverage
- Improved accessibility testing checklist
- Updated development node environment to 10.13.0
- Added shopify/jest plugin to eslint config

#### Open development

- Added [contribution guidelines](https://github.com/Shopify/polaris-react/blob/master/.github/CONTRIBUTING.md)
- Added [tophatting documentation](https://github.com/Shopify/polaris-react/blob/master/documentation/Tophatting.md)
- Updated the project README
- Moved active development to the public repository

## 2.12.1 - 2018-10-11

### Bug fixes

- Fixes type imports in the build

## 2.12.0 - 2018-10-11

### Enhancements

- Removed tip from `Popover`
- Increased speed of `Popover` transition from 500ms to 100ms
- Improved text contrast in `Badge`.
- Added named `medium` size to Button that renders the same as omiting the size attribute

### Bug fixes

- Fixed typo in `Collapsible` example
- Fixed padding and margins on `SkeletonPage` to match `Page`
- Fixed spacing between `Page` title and metadata

### Documentation

- Made `ActionList`, `OptionList` and `Popover` examples active by default so previews are visible without interacting
- Improved the manual accessibility checklist

### Development workflow

- Batched Percy snapshots per component

## 2.11.0 - 2018-10-03

### Enhancements

- `Tab.Item` with a `url` prop now renders an `UnstyledLink` instead of a `Button` when displayed in `Popover` and you can now keyboard navigate the disclosure in `Tabs`
- Refs can be placed on `DropZone.FileUpload`
- Use the new context API in `ResourceList`
- Use the new context API in `DropZone`
- Update example description in `ExceptionList` documentation
- Move Modal CloseButton into its own subcomponent, instead of being part of the Header subcomponent. This is an internal implementation detail if you are using the React component. If you are using (s)css and are defining class names manually you will need to update references to `Polaris-Modal-Header__CloseButton` and `Polaris-Modal-Header--withoutTitle` to `Polaris-Modal-CloseButton` and `Polaris-Modal-CloseButton--withoutTitle` respectively.

### Development workflow

- Added `d.ts` files to test coverage ignore
- `Page` is no longer self-closing in the playground

### Bug fixes

- Fixed `Button` alignment issue caused by unnecessary icon markup rendering ([#2339](Fixing button alignment #2339)) (thanks to ([@mbaumbach](https://github.com/mbaumbach)) for the ([original issue](https://github.com/Shopify/polaris-react/issues/429)))
- Fixed console error and used new ref syntax in `DataTable` (thanks to [@duythien0912](https://github.com/duythien0912) for the [original issue](https://github.com/Shopify/polaris-react/issues/403))
- Fixed margin of `InlineError` text to align with the `ChoiceList` labels
- Replaced hardcoded `rem` values with globally scalable ones on `DataTable`’s collapsed shadow, and `TextStyle` code blocks
- Fixed spacing of numbered `List` for double digits ([#121](https://github.com/Shopify/polaris-ux/issues/121))
- Fixed `ProgressBar` not showing up in Windows high contrast mode ([#1708](https://github.com/Shopify/polaris-react/issues/1708))
- Top aligned all cells in `DataTable`
- Fixed stacking order of loading overlay in `ResourceList`
- Fixed form inputs in `Popover` that were disappearing instead of top aligning thanks to [@mbaumbach](https://github.com/mbaumbach) for the [original issue](https://github.com/Shopify/polaris-react/issues/435)
- Removed a redundant class on `OptionList` list items

### Documentation

- Made `Modal` examples show the modal dialog by default
- Changed fitted `Tabs` to have equal width when enough space is present ([#2314](https://github.com/Shopify/polaris-react/issues/2314))

### New components

#### withContext

Use `withContext` to pass consumer context to a component.

#### withRef

Use `withRef` with `compose` to forwardRefs to a component.

## 2.10.0 - 2018-09-18

### Enhancements

- Updated `Button` to accept a `React.ReactNode` for its `icon` prop

### Documentation

- Refined accessibility checklist

### Bug Fixes

- Added truncation to `Tag`

## 2.9.0 - 2018-09-10

### Enhancements

- Updated date filter labels in resource list
- Changed `placeholder` prop in `Select` to be the default selection
- Added a `loading` prop to `ResourceList` that places a spinner overtop items and disables bulk actions

### Documentation

- Clarified when and how to use icons in the banner component
- Updated footer help component guidelines to include content instructions for app developers

### Bug fixes

- Fixed resource list component to correctly handle inclusive filter keys
- Fixed date field in DateSelector to not render an error when date is added by the date picker and field is blurred
- Fixed pagination from firing keypress events while focus is inside inputs or contenteditables
- Fixed `EmptyState` horizontally scrolling when fully condensed
- Fixed the bottom margin of elements inside `Page` being ignored in some browsers
- Added required `url` prop to `breadcrumbs` in `Page` component examples
- Fixed `ActionList` wrapping text within a `Popover`
- Fixed `Banner` spacing when inside of a section
- Fixed `Stack` so it doesn’t add extra spacing between items in Safari

## 2.8.0 - 2018-08-30

### Bug fixes

- Reverted a change that caused the built embedded.js bundle to be way larger than it should be due to broad imports

### Enhancements

- Added support for boolean type on Choice error prop

### Documentation

- Updated banner guidelines to make it clearer when success banners should be used vs success toasts.
- Updated display text documentation to have a separate example for medium and large display

## 2.7.2 - 2018-08-27

### Bug fixes

- Reverted a change that caused items in a `Popover` component not to be clickable

## 2.7.1 - 2018-08-27

### Documentation

- Fixed paths to images in the “Attention badge” example

### Bug fixes

- Fixed the `Page` component’s `primaryAction` to support `LoadableAction`s and `DisableableAction`s

## 2.7.0 - 2018-08-27

### Enhancements

- Adjusted spacing for `ChoiceChildren` in `ChoiceList` for readability
- Made `Card.Header` a separate publicly accessible component
- Added support for complex operators in `ResourceList` component
- Updated the `Page` component’s `primaryAction` to support `Button` props.
- Added validation for non-numeric input in a type="number" `TextField`
- Added circle information icon

### Documentation

- Updated `Banner` guidelines to make it clearer when success banners should be used vs success toasts

## 2.6.1 - 2018-08-21

### Development workflow

- Moved `pa11y` and `object-hash` from dependencies to devDependencies

### Bug fixes

- Fixed inconsistent `DropZone` error styling

## 2.6.0 - 2018-08-21

### Development workflow

- Added a `test:coverage` script to gather and display test coverage results
- Added Codecov test coverage checks to pull requests
- Added automated a11y testing to CI

### Enhancements

- Added support for `titleMetadata` in `Page` component
- Added support for `FilterType.DateSelector` in `ResourceList` component
- Added `code` as an accepted `variation` of the `TextStyle` component to provide support for accessible markup and styling of inline code snippets and code-like text
- Added new `border-width` SCSS function
- Added support for `fullWidth` and `connectedTop` props on `ButtonGroup`
- Added `label` prop to `DropZone` for better accessibility
- Added support for `RadioButton` to accept a block as a `label`
- Added a `singleColumn` prop to the `SkeletonPage` component
- Updated the transition on large `Modal` to match the default transition
- Added `nextKeys`, `previousKeys`, `nextTooltip`, and `previousTooltip` props to the `Pagination` component to support keypress handling and `Tooltip` in pagination buttons.
- Added examples to the `Layout` component documentation for two and three column grid layouts
- Added an export for the `Progress` type to support downstream typechecking of the `Badge` component `progress` prop
- Added an `iFrameName` prop to the `Modal` component to support named iframe children
- Added a `ScrollTo` subcomponent to the `Scrollable` component to support scrolling to a child node programmatically
- Added support for the `Button` component to accept an array of strings as children
- Changed the primary focus target of an activated `Popover` from the first focusable child to the `Popover` itself
- Added an improved error message when the child of an embedded `Alert` component is not a string (thanks [@superwhykz](https://github.com/superwhykz) for the [original issue](https://github.com/Shopify/polaris-react/issues/378))
- Added a minimum width to tab items to improve touch target sizing and account for smaller tab titles
- Added support for additional accessibility attributes to the `TextField` and `OptionList` components
- Added support for `OptionList` with `Avatar`, `Icon`, and `Thumbnail` when `options` descriptors have a `media` property
- Added support for destructive `ActionList` items
- Added support for `OptionList` `options` descriptors to accept a block for the `label` property
- Added `$page-max-width` variable to capture page calculated `max-width` value and `page-when-not-max-width` mixin to trigger when page is resized horizontally
- Added support for select error messages to be optional
- Updated the `Breadcrumbs` component to support the `CallbackAction` type as a prop (thanks [@dylan](https://github.com/dylan) for the [current issue](https://github.com/Shopify/polaris-react/issues/278) and everyone who identified this.)
- Added support for `TextField` error messages to be optional
- Added a `disabled` prop to the `Choice` component. `Checkbox` and `RadioButton` labels are now styled to reflect their disabled state
- Added support for Windows High Contrast mode in the `Select`, `Checkbox` and `RadioButton` components

### Bug fixes

- Fixed `TextField` resizer rendering when `multiline` was false
- Fixed `Modal` header condensing
- Fixed `Tooltip` so active prop activates on initial render
- Fixed `Popover` border radius and left and right alignment
- Fixed visibility of the hidden implicit submit button in `Form` (thanks [@cgenevier](https://github.com/cgenevier) for the [original issue](https://github.com/Shopify/polaris-react/issues/386))
- Fixed alignment of wrapped empty state actions
- Swapped the import and export icons
- Fixed incorrect `DataTable` column count and content skipping in assistive technologies
- Fixed unintended form submittal by action list items enclosed in a `form` (thanks [@andrewpye](https://github.com/andrewpye) for the [original issue](https://github.com/Shopify/polaris-react/issues/391))
- Fixed text alignment of multiline `OptionList` option text
- Fixed an issue where the `Stack` component would render incorrectly nested items
- Fixed spacing above annotated sections on smaller screens
- Fixed an issue that caused problems for some build tools
- Fixed the word-break of long text in `Label` and `Banner` on small screens

### Documentation

- Added examples for iOS and Android `RadioButton`
- Added examples for iOS and Android `Banner`
- Added `Toast` component
- Added examples for iOS and Android `Button`
- Added examples for iOS and Android `ButtonGroup`
- Added examples for iOS and Android `Badge`
- Added examples for iOS and Android `Avatar`
- Added `Stepper` component

### New components

#### [InlineError](https://polaris.shopify.com/components/forms/inline-error)

Use inline errors to describe custom form inputs or form groups when invalid.

## 2.5.0 - 2018-07-20

### Enhancements

- Updated sub component structure
- Added `weekStartsOn` prop to `DatePicker`

### Bug fixes

- Remove `stickyManager` from `AppProviderProps` interface
- Fixed a bug where `Layout.AnnotatedSection` would output a wrapper div for a `description` even when its contents were empty
- Remove extra padding from annotated section

### Documentation

- Added iOS and Android examples to the `Card` component
- Added iOS and Android examples to the `ChoiceList` component

### Development workflow

- Renamed `yarn start:vrt` to `yarn tophat` and updated the folder name to match
- Improved `yarn tophat`’s design, and added a `/all-components` route

### Enhancements

- Added `weekStartsOn` prop to `DatePicker`

## 2.4.0 - 2018-07-12

### Enhancements

- Changed `Form` to submit a form by default when the <kbd>enter</kbd> key is pressed, and added the prop `implicitSubmit` to disable this default

### Bug fixes

- Fixed `TextField` padding when a `prefix` or `suffix` is included

## 2.3.1 - 2018-07-05

### Enhancements

- Removed the min-width of 320px from `ResourceList`

### Bug fixes

- Resolve issue with `RangeSlider` component not accepting `0` as a `max` value
- Slightly reduced spacing for `prefix` and `suffix` on the `RangeSlider` component
- Fixed spacing for `prefix` and `suffix` on the `TextField` component
- Fixed height of cells in `DataTable` that are rendered after initial page load (for example: in a `Tab` or a `Popover`) (thanks [@flewid](https://github.com/flewid) for the [original issue](https://github.com/Shopify/polaris-react/issues/344))
- Fixed `DatePicker` month styling for previous years

## 2.3.0 - 2018-07-03

### New components

#### [Option list](https://polaris.shopify.com/components/lists-and-tables/option-list)

Use `OptionList` to present a group of selectable items outside of the context of a `Form`.

### Documentation

- Fixed `Form` examples

### Enhancements

- Added `prefix` and `suffix` props to `RangeSlider` for better layout control
- Added testing documentation and examples in `AppProvider`
- Performance: optimized avatar SVG files
- Updated `yarn run optimize` to add new line at the end of SVG files
- Added a more compact variant of `Select`, with the form label appearing inside the control)

### Bug fixes

- Adjusted padding on `TextField` to work with Chrome’s autofill
- Fixed a regression where the version of Polaris wasn’t globally available anymore
- Updated the interaction state visuals for `ActionList`
- Fixed z-index on `ResourceList` header with sorting options (thanks [@janklimo](https://github.com/janklimo) for the [original issue](https://github.com/Shopify/polaris-react/issues/355))
- Fixed an issue where `RadioButton` was not focusable in Safari
- Fixed spacing for annotated section descriptions
- Fixed a bug in EASDK action transforms that prevented external urls in embedded apps from opening (thanks [@dansundy](https://github.com/dansundy) for the [original issue](https://github.com/Shopify/polaris-react/issues/203))

### Dependency updates

- Updated [`@shopify/polaris-tokens`](https://npmjs.com/package/@shopify/polaris-tokens), the single source of truth for colors

## 2.2.0 - 2018-06-12

### New components

#### [Range slider](https://polaris.shopify.com/components/forms/range-slider)

Use `RangeSlider` to select a number value between a min and max range.

### Enhancements

- Added a fixed prop to `Popover` allowing for a fixed position
- Added badge prop to the `ItemDescriptor` type and action group
- Added `text-breakword` mixin for easier word breaking when dealing with long unspaced strings

### Bug fixes

- Fixed unexpected form submission when switching tabs in a `Tabs` component wrapped in a `Form`
- Added missing `'Shopify.API.setWindowLocation'` message handler to the EASDK

## 2.1.2 - 2018-06-06

### Enhancements

- Added support for `Card` to accept a block for a title
- Added an intermediate prop typing for `Link` to allow redefinition of prop definitions

### Bug fixes

- Fixed an issue where `ResourceList` filters lost padding (thanks [@BarryCarlyon](https://github.com/BarryCarlyon) for the [original issue](https://github.com/Shopify/polaris-react/issues/330))
- Fixed unexpected focus jumps when `DatePicker` props are updated
- Fixed the spacing and text wrapping of `ExceptionList` title and description

## 2.1.1 - 2018-05-30

### Bug fixes

- Fixed `DropZone` to prevent it from kicking into small size too soon

### Documentation

- Various content and markdown fixes

## 2.1.0 - 2018-05-03

### New components

#### [Exception list](https://polaris.shopify.com/components/lists-and-tables/exception-list)

Use Exception lists to draw the merchant’s attention to important information that adds extra context to a task.

### Enhancements

- Added an `ellipsis` prop to `ActionList.Item` allowing for an ellipsis suffix after the content
- Added a `preferredAlignment` prop to `Popover` allowing it to be aligned to the left, center, or right of its activator
- Updated styling for `Banner` that appear in a `Card` or a `Modal`
- Added new size to `DropZone` component
- Exposed Group interface from the `Select` component
- Renamed `plain-list` mixin to `unstyled-list`
- Removed padding from `DropZone` and applied it to `FileUpload` instead

### Bug fixes

- Fixed unexpected window scroll on rendering `DataTable` (thanks [@mfurniss](https://github.com/mfurniss) for the [original issue](https://github.com/Shopify/polaris-react/issues/317))
- Fixed focused inner interaction state on `ResourceList.Item` for reverse tabbing
- Fixed border radius on `Card` to match the padding on `Page`
- Added `target` to the `breadcrumb` prop on `Page` (thanks [@sdn90](https://github.com/sdn90) for the [original issue](https://github.com/Shopify/polaris-react/issues/306))
- Fixed visual representation of disabled bulk action buttons in `ResourceList`
- Fixed margins of a `fullWidth` `Popover` that appears above its activator
- Fixed rendering of `Popover` when activator rerenders (thanks [@nerfologist](https://github.com/nerfologist) for the [original issue](https://github.com/Shopify/polaris-react/issues/324))
- Fixed `z-index` calculation for `PositionOverlay` and `Dialog`
- Fixed an issue where selecting a date in `DatePicker` would submit its enclosing form
- Fixed `ResourceList` reverse tabbing focus interaction on action buttons
- Fixed padding in the case where a `ResourceList` had no filters

## 2.0.0 - 2018-05-07

Summary: this is the first major version of Polaris React since launch. Included in this release are:

- Several new components, including `DataTable`, `DropZone`, `AppProvider`, and `Modal`
- Improvements to existing components, such as `ResourceList`, `ChoiceList`, and `Card`
- A few breaking API changes

### Breaking changes

#### React 16+

We’re removing support for React 15 in order to make full use of some of the new features in React 16, such as fragments, error boundaries, and improved server-side rendering.

##### Upgrade instructions

Upgrade your app to the latest version of React.

#### [App provider](https://polaris.shopify.com/components/structure/app-provider)

The `AppProvider` component is now required in your app for Polaris components to function properly.

##### Upgrade instructions

Wrap your app in the `AppProvider` component.

#### [Collapsible](https://polaris.shopify.com/components/behavior/collapsible) component requires an `id` prop

For accessibility reasons, the `id` prop is now required on the `Collapsible` component.

##### Upgrade instructions

Pass a unique value as an `id` to all `Collapsible` components. For example, `<Collapsible id="my-unique-id">`.

#### EmbeddedApp component has been removed

The `EmbeddedApp` component has been removed. The `AppProvider` component now accepts the configuration needed to initialize an embedded app.

##### Upgrade instructions

Use the `AppProvider` component with the `apiKey` and `shopOrigin` props.

#### [Resource list](https://polaris.shopify.com/components/lists-and-tables/resource-list#navigation)

Shopify is organized around objects that represent a merchant’s business, such as customers, products, and orders. Each individual order, for example, is given a dedicated page that can be linked to. In Shopify, we call these types of objects resources.

The resource list component functions as:

- A content format, presenting a set of individual resources in a compact form
- A system for taking action on one or more individual resources
- A way to navigate to the details page of an individual resource

Our current resource list component gave you some nice defaults out of the box, but didn’t take you much further than that. We recognized that each of these lists is unique and contains different information that is important to the merchant.

Our new resource list allow you to build custom items in the list, with their own layout, content, and styling. This gives you a powerful way to build these sorts of lists going forward.

We’ve also included in depth documentation and a tutorial on how to build your own custom resource list items.

#### Tabs no longer accept `title` prop

To be more consistent with our other component APIs, the `Tabs` component now uses `content` instead of `title`.

##### Upgrade instructions

Change all instances of `title` to be `content` instead.

#### TextField onChange is required

Because we require you to manage state for your inputs, we decided to make `onChange` required for `TextField` to avoid confusion.

##### Upgrade instructions

Add an `onChange` callback to each use of `TextField` that is not disabled or readonly.

#### Removed default white color from Icon CSS

The CSS for `Icon` will no longer apply a color to icons by default. You must use the `color` prop on the `Icon` component to specify the color.

##### Upgrade instructions

Use `color` prop on all instances of `Icon` component.

#### Anchor tags are no longer styled by Polaris components

To avoid conflicts with other styling or frameworks, we’re removing the styling we globally applied to all `a` elements.

##### Upgrade instructions

Use the `Link` component instead.

#### Changed Alert onCancel prop to onClose

This change only impacts users of the Sass version of Polaris, more specifically the `color()` function. The `color($hue, $value: base, $for-background: null)` function in Sass now accepts strings for `$hue` and `$value` as advertised in [the color function documentation](https://polaris.shopify.com/sassdoc/#undefined-function-color).

##### Upgrade instructions

If you’re using VS Code, here are the exact search / replace instructions to follow (toggle “Use Regular Expression”):

- replace `\bcolor\(([a-z-]+)\)` with `color('$1')`
- replace `\bcolor\(([a-z-]+), ([a-z-]+)\)` with `color('$1', '$2')`
- replace `\bcolor\(([a-z-]+), ([a-z-]+), (.*)\)` with `color('$1', '$2', $3)`

### New components

#### [Data table](https://polaris.shopify.com/components/lists-and-tables/data-table)

Since launching Polaris components, we’ve had many people ask why we didn’t include tables. While we have been moving away from using tables for comparisons that aren’t tabular data (resource lists, for example), we recognize that there are still cases to use them.

The data table component is our answer to those cases. While data visualizations represents part of a data set, data tables are used to organize and display all the information from a data set, allowing merchants view details from the entire set. This helps merchants compare and analyze all the data in a unified way.

#### [Drop zone](https://polaris.shopify.com/components/actions/drop-zone#navigation)

Currently we have several different interfaces for uploading files across Shopify, which leads to a lack of consistency and some missing features and capabilities. To solve this problem, we’re releasing a new drop zone component.

This new component allows merchants to upload files by dragging and dropping them into an area on a page. The component handles file type validation, dropping onto the window, and more, meaning more ease of use for merchants.

#### [Modal](https://polaris.shopify.com/components/overlays/modal#navigation)

In the original Polaris React, the modal component was only available to embedded apps. No longer. Our new modal component is universal in that it can be used in either stand-alone or embedded apps, and will handle the correct behavior for you.

#### [App provider](https://polaris.shopify.com/components/structure/app-provider#navigation)

The app provider is a required component that enables sharing global app config with the components in Polaris. This is used for the internationalization of strings in Polaris components, as well as set other configuration such as a custom link component that all the Polaris components will use. This unlocks new ways for us to share configuration at an app level and have the components react to that configuration.

### Enhancements

- Added `error` prop to `ChoiceList`
- `TextField`, `Select`, and `Checkbox` now accept the types `string` or `ReactElement` for the `error` prop
- Added optional `id` props to more components, and restructured the prop definitions to allow projects to make `id` props mandatory
- Added `fullWidth` prop to `Card.Section`
- Added `fullHeight` prop to `Popover` to override max-height
- Added `allowRange` as a property for `DatePicker`
- Added the `external` option to the `secondaryAction.action` prop on the `Banner` component. Thank you to ([Andrew Cargill](https://github.com/cargix1)) for the issue ([#236](https://github.com/Shopify/polaris-react/issues/236))

### Bug fixes

- Enforced subdued description `TextStyle` in `AnnotatedSection`
- Fixed overflow of `TextField` that caused the border to be cut off
- Allowed specific props in the `TextField` component to pass through properties to the input child
- Fixed `ActionList` component to provide section dividers when a `title` was not provided
- Fixed an issue in the `Select` component where placeholder didn’t properly appear on Firefox and appeared disabled on all browsers

## 1.14.2 - 2018-05-02

_This will be the last v1.x release outside of critical security fixes._

### Bug fixes

- Add margin-left spacing to disclosure icon within `Button` component
- Remove margins on segmented `ButtonGroup`
- Fixed text alignment of `Link` so that it inherits from its parent node

## 1.14.1 - 2018-04-10

### Bug fixes

- Fixing an error with the release process

## 1.14.0 - 2018-04-10

### Enhancements

- Changed `term` in `DescriptionList` component to accept `React.ReactNode` to allow for more than just `string` type

## 1.13.1 - 2018-03-29

- Added missing `publishConfig.access` setting in `package.json`, in accordance with the new Shipit requirements for public npm packages

## 1.13.0 - 2018-03-29

### Enhancements

- Added an `id` prop to Collapsible to be referenced by the `aria-controls` attribute of the component triggering the collapse

### Bug fixes

- Fixed external prop not working within `ActionList` component
- Fixed a syntax error in one of the `Card` component examples (thanks [@meecrobe](https://github.com/meecrobe) for the [original issue](https://github.com/Shopify/polaris-react/issues/281))

## 1.12.4 - 2018-03-19

- Enhanced `Avatar` to work better when provided non-square images
- Move documentation file so it’s picked up by the style guide

## 1.12.3 - 2018-03-16

### Bug fixes

- Fixed disclosure centering on the `Tabs` component
- Fixed an issue where a style void would appear between breakpoints at high text zoom levels

### Documentation

- Removed purpose section from component READMEs
- Added `EmbeddedPage` under the Embedded section
- Added “Using embedded components” section
- Added screenshots to the embedded components
- Clarified usage of `Card` header and `FooterActions`

## 1.12.2 - 2018-03-08

### Documentation

- Moving property descriptions out of READMEs and into source files

## 1.12.1 - 2018-03-06

### Bug fixes

- Fixed server-side environments

### Documentation

- Updated component examples that use state to use an es6 class

## 1.12.0 - 2018-02-28

### Bug fixes

- Fixed `TextField` overflow issues when inside `Scrollable`
- Fixed `Select` focus state bug occuring in Firefox
- Fixed vertical alignment of text within full width variant of the button component

### Enhancements

- Changed `Checkbox` label to allow string or React.ReactNode
- Update `TextField` type with currency
- Added `ariaControls`, `ariaExpanded` prop to `Button`
- Updated the base red color to improve contrast
- Added a notification icon to the bundled icons available to use in the icon component’s source prop
- Exposed Status from the `Banner` component
- Added `titleHidden` prop to `Page`

### Documentation

- Clarified intended usage for `EmptyState`

### Chores

- Added version number to source

## 1.11.0 - 2018-02-13

- Changed Action to Disableable Action in Card

### Enhancements

- Added `renderChildren` prop to `ChoiceList` component

### Bug fixes

- Fixed an issue with `FooterHelp` links not expanding to full-width on mobile devices ([#759](https://github.com/Shopify/polaris-react/issues/759))
- Added breadcrumbs to `SkeletonPage`
- Added max-width and auto margin to `EmptyState`
- Fixed outline `Button` disabled state styles
- Fixed `Tag` so the `onRemove` function is not improperly called (thanks [@chaddjohnson](https://github.com/chaddjohnson) for the [original issue](https://github.com/Shopify/polaris-react/issues/235))
- Fixed border on inputs disabled state
- Fixed an issue in `TextInput`, when you increment or decrement with a float value, and the digits after the decimal point where wrong (thanks [@cgidzinski](https://github.com/cgidzinski) for the [original issue](https://github.com/Shopify/polaris-react/issues/761))
- Added top alignment to FormLayout.Group

### Documentation

- Fixed capitalization of prop names in `Pagination` component’s documentation (thanks [@donnguyen](https://github.com/donnguyen) for the [original issue](https://github.com/Shopify/polaris-react/issues/141))
- Exposed Option from the `Select` component

## 1.10.2 - 2018-01-22

### Bug fixes

- Fixed the public repository’s build (which was missing the new CircleCI configuration files)

## 1.10.1 - 2018-01-19

### Bug fixes

- Fixed CSS-only `Checkbox` (thanks [@daddy88](https://github.com/daddy88) for the [original issue](https://github.com/Shopify/polaris-react/issues/252))

## 1.10.0 - 2018-01-17

- Restored the correct `latest` version to the CDN
- Fixed rgbToHsb function when red is the largest number and added tests (thanks [@emcmanus](https://github.com/emcmanus) for the [original issue](https://github.com/Shopify/polaris-react/issues/251))
- Fixed an issue where a hard-coded path would cause the build to fail on Windows (thanks [@Invader444](https://github.com/Invader444) for the [original issue](https://github.com/Shopify/polaris-react/issues/245) and [pull request](https://github.com/Shopify/polaris-react/pull/246))
- Added `onClick` to `UnstyledLink`
- Added tests to `Link`

- Added tests for `ColorPicker` color utilities

## 1.9.1 - 2017-12-21

### Documentation

- Ammending changelog

## 1.9.0 - 2017-12-21

### Enhancements

- Added `onActionAnyItem` prop to action list and used to close `Page` `actionGroups` on click or keypress of any item
- Added `content` prop to `Tabs` and deprecated use of `title`
- Added `TextContainer` component
- Added `idForItem` prop to resource list
- Added `fullWidth` prop to layout section
- Added `indeterminate` as option for checkbox `checked` prop value
- Added `singleColumn` prop to page
- Added `focused` prop to `TextField`

### Bug fixes

- Fixed positioned overlay not responding to `Scrollable` container events
- Fixed first focusable item focus in `Popover`
- Fixed typos in the select component documentation (thanks [@mattchidley](https://github.com/mattchidley) for the [original issue](https://github.com/Shopify/polaris-react/issues/224))

## 1.8.3 - 2017-10-26

### Bug fixes

- Moved react-transition-group from a dev dependency to a dependency

## 1.8.2 - 2017-10-24

### Bug fixes

- Fixed `Stack` not returning children

## 1.8.1 - 2017-10-24

### Bug fixes

- Added missing yarn config file which was causing the build to fail

## 1.8.0 - 2017-10-23

### Documentation

- Updated README to consistently use contractions (thanks [@stefanmiodrag](https://github.com/stefanmiodrag) for the [original pull request](https://github.com/Shopify/polaris-react/pull/191))
- Improved example description for `Layout` component
- Updated `Spinner` documentation
- Improved component purpose documentation across components
- Improved documentation for `TextStyle` component

### Enhancements

- Added support for React 16
- Added an option to show or hide unpublished products from the `ResourcePicker`
- Changed `Popover` component to use `react-transition-group` instead of our deprecated custom version in `@shopify/react-utilities`
- Added new `ProgressBar` component
- Changed today’s date to be tabbable and clearly indicated in `DatePicker`
- Added support for disabled choices in `ChoiceList` component
- Added support for disabled secondary `Page` actions
- Changed `TextField` and `Select` to now focus on clicking only within the area from the input to the end of its label text

### Bug fixes

- Fixed `Layout` component example description
- Fixed `SkeletonPage` header appearing in embedded apps (thanks [@rkbhochalya](https://github.com/rkbhochalya) for the [original issue](https://github.com/Shopify/polaris-react/issues/202)))
- Fixed border-radius on `ActionList` component in Chrome

## 1.7.0 - 2017-10-06

### Enhancements

- Added `SkeletonPage`, `SkeletonBodyText` and `SkeletonDisplayText` components
- Added `Spinner` component
- Added hint prop to `Scrollable` and use in `Popover`
- Updated `Button` component to use new `Spinner` component
- Added external link support for `Page` `secondaryActions`
- Enabled the `primaryAction` of `PageActions` to be loading
- `Stack` now supports non-wrapping layouts on small screens
- Updated `TextField` min and max documentation
- Breadcrumbs now accept a callback through onAction (thanks [@arypbatista](https://github.com/arypbatista) for the [original issue](https://github.com/Shopify/polaris-react/issues/188))

### Bug fixes

- Fixed issue with embedded app breadcrumb linking to Shopify settings page (thanks [@cargix1](https://github.com/cargix1) for the [original issue](https://github.com/Shopify/polaris-react/issues/116))
- Fixed `Avatar` to display image and initials simultaneously
- Fixed various links to embedded components
- Fixed left and right ends of `TextField` not responding to clicks
- `RadioButton` & `Checkbox` now focus on clicking only within the area from the input to the end of its label text
- Fixed plain and `fullWidth` `Button` alignment
- Add a minor delay to `Tooltip` display

## 1.6.0 - 2017-09-25

### Enhancements

- Documented disabled prop for `Checkbox` and `RadioButton` (thanks [@LeoAref](https://github.com/LeoAref) for the [original issue](https://github.com/Shopify/polaris-react/issues/114))
- Documented progress prop for `Badge` (thanks [@sp4cecat](https://github.com/sp4cecat) for the [original issue](https://github.com/Shopify/polaris-react/issues/172))
- Added loading prop to `Button` (thanks [@bakura10](https://github.com/bakura10) for the [original issue](https://github.com/Shopify/polaris-react/issues/30))
- Documented complex `Select` option (thanks [@sp4cecat](https://github.com/sp4cecat) for the [original issue](https://github.com/Shopify/polaris-react/issues/174))
- Documented `TextStyle` component
- Improved `Avatar` typography spacing
- Added subtract icon
- Improved acessibility for `Pagination`

### Bug fixes

- Fixed failed dependency installation for unauthenticated GitHub users (thanks [@mikeyhew](https://github.com/mikeyhew) for the [original issue](https://github.com/Shopify/polaris-react/issues/184))
- Fixed `Page` header spacing
- Fixed `TextField` focus ring transition
- Fixed `Popover` not resizing on content updates

## 1.5.2 - 2017-09-18

### Bug fixes

- Fixes alignment of `PageAction` links

## 1.5.1 - 2017-08-30

### Bug fixes

- Fixed disabled `Button` when using local class names
- Fixed `Scrollable` resize listener not autobinding

## 1.5.0 - 2017-08-30

### Enhancements

- Updated `Scrollable` component to remember scroll position on re-render
- Added checkmark icon to the `Icon` component
- Added an example for a disabled `TextField`

### Bug fixes

- Fixed typo in `Icon` code example

## 1.4.1 - 2017-08-24

Various documentation fixes.

## 1.4.0 - 2017-08-22

### Enhancements

- Updated import, export, and view icons
- Improved documentation of various components
- Improved how `ActionList` handles images and groups
- Exposed PopoverCloseSource from `Popover` component

### Bug fixes

- Fixed `PageActions` spacing in IE11
- Fixed ID inconsistency on `TextField`
- Fixed spacing on `Page` component with no header (thanks [@bakura10](https://github.com/bakura10) for the [original issue](https://github.com/Shopify/polaris-react/issues/160))
- Fixed disabled state on primary and destructive `Button`

### Chores

- Upgraded javascript-utilities to the latest version

## 1.3.1 - 2017-08-10

### Bug fixes

- Fixed classnames in built \*.scss files
- Fixed broken link in description list README

## 1.3.0 - 2017-08-09

### Enhancements

- Added an `esnext` build (allows production builds to perform class/method tree shaking)
- Changed KeyboardKey component to use `kbd` tag
- Added publishing `docs` folder to npm package
- Added `fullWidth` option to `Popover` component

### Bug fixes

- Updated Static HTML page examples to correct markup (thanks [@bartcoppens](https://github.com/bartcoppens) for the [original issue](https://github.com/Shopify/polaris-react/issues/159))
- Hide increment and decrement buttons on number input when disabled (thanks [@kguller](https://github.com/kguller) for the [original issue](https://github.com/Shopify/polaris-react/issues/163))
- Fixed link to product content documentation
- Fixed documented type for error prop on `Checkbox` component
- Fixed `Popover` reopening when clicking around during transition
- Fixed `Popover` resizing on content updates
- Fixed vertical alignment of `Button` content

### Sketch UIKit

- Added Sketch color palette file

## 1.2.1 (July 27, 2017)

### Chores

- Fixed a repo issue that caused the public repo release not to happen

## 1.2.0 (July 27, 2017)

### Enhancements

- Added helpText to `ChoiceList` choices (thanks [@cgenevier](https://github.com/cgenevier) for the [original issue](https://github.com/Shopify/polaris-react/issues/103))
- Added save icon
- Added `accessibilityLabel` to `Tabs`
- Updated icons for `Banner`
- Improved `Page` component by fixing up spacing, addin a prop to show a separator below the page title, and changing the secondary actions to roll up into a dropdown menu on small screens
- Improved default stacking behavior for Tooltip and `Popover` (thanks [@Taphood](https://github.com/Taphood) for the [original issue](https://github.com/Shopify/polaris-react/issues/129))
- Added extraTight spacing option to Stack
- Use default subheading type styles for `ActionList`
- Improved large `Button` styles
- Updated font-weight for text emphasis (thanks [@bakura10](https://github.com/bakura10) for the [original issue](https://github.com/Shopify/polaris-react/issues/156))

### Bug fixes

- Removed the focus state for `Banner` on click
- Fixed disabled `Pagination` button looking active
- Fixed alignment on `Button`
- Fixed min-width on `TextField` (thanks [@asacarter](https://github.com/asacarter) for the [original issue](https://github.com/Shopify/polaris-react/issues/96))
- Removed the border-top on `EmptyState`) (thanks [@alexdover](https://github.com/alexdover) for the [original issue](https://github.com/Shopify/polaris-react/issues/102)
- Fixed `Select` placeholder value warnings (thanks [@cgenevier](https://github.com/cgenevier) for the [original issue](https://github.com/Shopify/polaris-react/issues/98))
- Fixed disabled text on iOS
- Fixed type for `onChange` event (thanks [@bakura10](https://github.com/bakura10) for the [original issue](https://github.com/Shopify/polaris-react/issues/135))

### Sketch UIKit

- Added color palette page to “Getting started”
- `Button` typography updated. More changes to come soon.
- Changed typeface from `San Francisco UI` to `San Francisco Pro`. You will need to download the updated typeface here. https://developer.apple.com/fonts/
- Updated to Sketch version 45.2
- Updated layer styles and fonts styles to take advantage of Sketch’s new organizational features.

### Documentation

- Fixed disabled `Button` documentation (thanks [@michaelsunglee](https://github.com/michaelsunglee) for the [original issue](https://github.com/Shopify/polaris-react/issues/113))
- Fixed project URL in CircleCI badge
- Fixed Stack documentation (thanks [@nerfologist](https://github.com/nerfologist) for the [original issue](https://github.com/Shopify/polaris-react/issues/120))
- Added embedded Alert documentation and updated other embedded documentation

### Dependency updates

- Updated React TypeScript definitions

### Chores

- Updated EASDK metadata structure for generic interfaces
- Removed postinstall hook

## 1.1.1 - 2017-06-19

### Chores

- Fixed a repo issue that caused the public repo release not to happen

## 1.1.0 - 2017-06-19

### Enhancements

- Added automatic inference of the `target` property of EASDK buttons in `Page` `primaryAction` and `secondaryAction` based on their URL (thanks [@jimmyn](https://github.com/jimmyn) for the [original issue](https://github.com/Shopify/polaris-react/issues/46))
- Added automatic inference of the `target` property of EASDK breadcrumbs in `Page` `breadcrumbs` prop based on the URL
- `Select` option descriptors now accept a `disabled` attribute to disable the generated `option` (thanks [@sogko](https://github.com/sogko) for the [original issue](https://github.com/Shopify/polaris-react/issues/68))
- `easdk.showFlashNotice` now accepts an optional options object as its second parameter. Passing `{error: true}` will cause the flash to appear as an error, matching the behaviour of [`ShopifyApp.flashError`](https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/methods#shopifyapp-flasherror-message)
- `Checkbox`, `RadioButton`, `ChoiceList`, `Select`, and `TextField` now pass the ID of the changed input as the second argument to their `onChange` callback (thanks [@milep](https://github.com/milep) for the [original issue](https://github.com/Shopify/polaris-react/issues/83))
- `Popover` now respects the `z-index` of the activator if it exists
- When putting content as children of `Tabs`, the default panel that is generated now respects the `panelID` of the selected tab, and uses a sensible default based on the tab’s `id` if no `panelID` exists
- When selecting a tab in `Tabs`, the matching panel is now focused by default
- `easdk` methods are bound to the object so they can be freely passed as callbacks

### Changes

- `Avatar` now renders as a `span` instead of a `div`

### Bug fixes

- Fixed contents in `Layout.AnnotatedSection` breaking out of their container (thanks [@cargix1](https://github.com/cargix1) for the [original issue](https://github.com/Shopify/polaris-react/issues/75))
- Fixed spacing above a `primaryAction` in `CalloutCard` when there is no `secondaryAction`
- Aria attributes are now on the actionable elements of `Tabs` instead of in the list items
- Exposed `Panel` as `Tabs.Panel` instead of `Tabs.panel`
- Fixed the alignment of `prefix` and `suffix` content of `TextField` (thanks [@bdillon3](https://github.com/bdillon3) for the [original issue](https://github.com/Shopify/polaris-react/issues/60))
- Fixed the disabled text color in `TextField`
- `Checkbox` and `RadioButton` no longer generate invalid HTML in their labels (thanks [@ernestogutierrez](https://github.com/ernestogutierrez) for the [original issue](https://github.com/Shopify/polaris-react/issues/88))
- `Tabs` no longer steal focus from contained elements (thanks [@alexdover](https://github.com/alexdover) for the [original issue](https://github.com/Shopify/polaris-react/issues/74))

### Design updates

- Reduced horizontal padding on `Breadcrumbs`
- Updated icon and internal padding of `FooterHelp`
- Updated the `EmptyState` layout and typographic styles

### Documentation

- Fixed the code examples on the `EmbeddedApp` documentation
- Added a simple `EmbeddedApp` example
- Renamed the “Tables and lists” category to “Lists”
- A variety of other documentation updates (thanks [@sebnun](https://github.com/sebnun), [@asacarter](https://github.com/asacarter), and [@resistorsoftware](https://github.com/resistorsoftware) for raising issues)

### Dependency updates

- Updated all dependencies

### Chores

- Added a script to automatically match the published version number to the one referenced in the README
- Added the correct viewport tag to the Playground
- Hid deprecation errors during tests

## 1.0.3 - 2017-05-11

### Big fixes

- Fixed an issue where the embedded components would not reload the page within the Shopify admin (thanks [@buggy](https://github.com/buggy) for the [original issue](https://github.com/Shopify/polaris-react/issues/28))
- Fixed the `spacing="none"` variation on `Stack` not working correctly, and added the missing `extraLarge` enum value for `spacing`
- Fixed `Banner`’s `onDismiss` callback not being called when the dismiss button was clicked ([76ce13f](https://github.com/Shopify/polaris-react/commit/76ce13f328c2446c316f3d7f1f2a3f007658b6f7)) (thanks [@tlwirtz](https://github.com/tlwirtz) for the [original issue](https://github.com/Shopify/polaris-react/issues/52))

### Design updates

- Updated `Badge` text colors
- Updated line height for the small `DisplayText` variation
- Updated the default icon for error `Banner` (thanks [@heyneff](https://github.com/heyneff) for the [original issue](https://github.com/Shopify/polaris-react/issues/42))

### Sketch UIKit

- Added app examples (thanks [@lukepxu](https://github.com/lukepxu) for the [original issue](https://github.com/Shopify/polaris-react/issues/17))
- Removed references to the Graphik typeface (thanks [@adamnel](https://github.com/adamnel) for the [original issue](https://github.com/Shopify/polaris-react/issues/22))
- Left-aligned button text for better resizing
- Added Messenger link to navigation to better communicate that the channel nav collapses after 3 items
- Fixed alignment of table headers
- Minor updates to Dataviz and Reports examples
- Added indicators to Home notifications

### Documentation

- Synchronized component documentation with the style guide ([1e89559](https://github.com/Shopify/polaris-react/commit/1e895594afedb63787e6c05a167f5146901e88e6))

### Chores

- Fixed an issue that prevented the public CHANGELOG from being generated correctly
- Added a hot-reloading Playground to easily try out different components
- Removed the references to Babel presets from `package.json` (thanks [@macs91](https://github.com/macs91) for digging into this with us)
- Removed the `@import` statements at the top of source Sass files
- Updated TSLint and related linting dependencies

## 1.0.2 - 2017-04-25

### Bug fixes

- Fixed an issue where subcomponents with variations would use a single `-` instead of `--` (thanks [@johnsonab](https://github.com/johnsonab) for the [original issue](https://github.com/Shopify/polaris-react/issues/9))
- Fixed a missing typing dependency and a missing `embedded` types entry point that were causing issues using this package with TypeScript (thanks [@buggy](https://github.com/buggy) for the [original](https://github.com/Shopify/polaris-react/issues/19) [issues](https://github.com/Shopify/polaris-react/issues/20))
- Fixed an issue where the anchor tag for `ResourceList.Item` would not span the full width of the item ([0c11498](https://github.com/Shopify/polaris-react/commit/0c11498406d90850f569824d0979c9a8f84d45c9)) (thanks [@sdn90](https://github.com/sdn90) for the [original issue](https://github.com/Shopify/polaris-react/issues/14))

### Dependency updates

- Started using the [`prop-types` package](https://github.com/reactjs/prop-types) instead of getting `PropTypes` from `react`, as the latter is deprecated as of React 15.5.0

### Documentation

- Corrected the name of `documentation/Embeddded apps.md` to `documentation/Embedded apps.md` (thanks [@chrispappas](https://github.com/chrispappas) for the [original issue](https://github.com/Shopify/polaris-react/issues/10))
- Fixed the `ColorPicker` documentation to show valid values for `saturation`, `brightness`, and `alpha` (thanks [@allanarmstrong](https://github.com/allanarmstrong) for the [original issue](https://github.com/Shopify/polaris-react/issues/13))

### Chores

- Added a description to `package.json`
- Added license to `package.json` and to the root of the repo (thanks [@d2s](https://github.com/d2s) for the [original issue](https://github.com/Shopify/polaris-react/issues/15))
- Fixed an issue where the Webpack example would complain about a missing dependency (thanks [@rafaedez](https://github.com/rafaedez) for the [original issue](https://github.com/Shopify/polaris-react/issues/21))

## 1.0.1 - 2017-04-20

### Chores

- Switch repo to public access

## 1.0.0 - 2017-04-20

- Initial release
