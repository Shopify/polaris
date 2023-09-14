---
title: Beta access to Shopify's new design language
description: |
  Polaris is developing version 12 for release in September.
  To help apps match Shopify's new design language, this version is available in an early beta.
  This beta will automatically update out-of-the-box/mainline Polaris components, with some additional work to update your custom components to seamlessly match Shopify's design.
  The steps below will assist you in making these updates using our tools and tokens.
hideFromNav: true
noIndex: true
showTOC: true
keywords:
  - new design language
  - uplift
  - beta
  - beta version
  - beta release
  - new design
  - black button
  - How to get the new design language
order: 0
---

# {frontmatter.title}

<Lede>{frontmatter.description}</Lede>

You can access the beta now or simply wait for the stable release in September<br/>_(be sure to read '[what might break](#what-might-break-before-during-beta)' below)_.

## Timeline

The Polaris beta releases will continue until the stable public version 12, scheduled for the end of September.
We may publish updates to the beta at key development milestones for your development and testing environments.
Refer to the table below for the timeline of each milestone:

| Milestone                                                         | Version                                     | Date             |
| ----------------------------------------------------------------- | ------------------------------------------- | ---------------- |
| Initial beta release, update to early adopters who want to opt in | `12.0.0-beta.0`                             | July 26          |
| Incremental beta releases                                         | `12.0.0-beta.1`<br/>`12.0.0-beta.2`<br/>etc | July – September |
| Polaris release with stable API, robust documentation and tooling | `12.0.0`                                    | End of September |

## What might break during beta

We are **actively developing** this release and will continue to make breaking changes to the beta release until September.
Our main areas of focus, listed below, will undergo **significant changes**.
To ensure the best possible version 12, Polaris may also make breaking changes to other areas not yet listed.

Areas we are actively working on:

- Overall tokens system sense-check
- Shadow and bevel tokens
- Border color mappings
- Component props, deduplication, alignment, sense check
- The new web font integration
- Typography hierarchy mappings
- Documentation
- Migration tooling

## Still want to dive in early?

We're excited about the new design language and understand if you want to quickly see how your app will look (particularly if you're applying to be a Built for Shopify app).
Be aware that this is a beta and introduces changes that may break your app implementations, particularly custom styling.
You will need to review your app's UI and manually patch fixes.

To prepare for Polaris version 12 make sure you're on the latest version 11.
It's quick to update from v10 to v11 with our [migrator tool](https://polaris.shopify.com/tools/polaris-migrator) and [migration guide](https://github.com/Shopify/polaris/blob/main/documentation/guides/migrating-from-v10-to-v11.md).

To install the v12 beta version run the following command:

```sh
npm install @shopify/polaris@beta
```

Or, if you prefer yarn, use the following command instead:

```sh
yarn add @shopify/polaris@beta
```

To assist you, we have prepared a collection of tips, documentation, and our own experience to help you on this early journey.

## Design philosophy

- Hierarchy primarily through typography reduces cognitive load and makes the important content easier to find
- Using black and white reduces noise and ensures color is used for signifiers and affordances instead of as decoration instead of decoration
- Increased density enables a fuller picture of the task at hand
- Visual dimension clearly distinguishes layers of importance and interactive elements
- Delightful, tactile interactivity makes taking action feel powerful and gratifying

Read more about the design philosophy in the blog post [Uplifting Shopify Polaris](https://ux.shopify.com/uplifting-shopify-polaris-7c54fc6564d9).

To see the new design language component by component, check out our [Storybook](https://storybook.polaris.shopify.com/). To turn the new design language on in Storybook go to:
Addon panel (bottom) > `Feature flags` tab and Toggle `polarisSummerEditions2023`

## Common UI updates and fixes to consider after upgrading to the Polaris beta

### A new web font

The new design language comes with a web font called [Inter via Google Fonts](https://fonts.google.com/specimen/Inter).
The beta references this font but doesn't load it. This will come later.

{/* prettier-ignore */}
```html
<link rel="preconnect" href="https://fonts.googleapis.com/" />
<link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin="anonymous" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" />
```

### Heading size

The [`LegacyCard`](https://polaris.shopify.com/components/layout-and-structure/legacy-card) now also enforces that `h1` and `h2` content is `headingSm` (`--p-font-size-80-experimental`).
If you want to use custom heading sizes, please refactor [`LegacyCard`](https://polaris.shopify.com/components/layout-and-structure/legacy-card) to [`Card`](https://polaris.shopify.com/components/layout-and-structure/card).

### Icons

Major and minor icon sizes are now identical.
You may need to update custom icons in your app as they may look much larger than Polaris icons now.
All icons still maintain the 20x20 viewbox.

### Dividers

We removed dividers across Polaris components, most noticeably in [`Page`](https://polaris.shopify.com/components/layout-and-structure/page) and [`LegacyCard`](https://polaris.shopify.com/components/layout-and-structure/legacy-card).
We now recommend using spacing to create a visual hierarchy.
If you must use a divider, use the [`Divider`](https://polaris.shopify.com/components/layout-and-structure/divider) component to add them back in where needed.

### Buttons

Primary buttons went from green to black in the new design language.

```jsx
<Button primarySuccess>It's not easy being green</Button>
```

### Buttons beside inputs

Default buttons have decreased in height and no longer match the height of some inputs, namely [`TextField`](https://polaris.shopify.com/components/selection-and-input/text-field) and [`Select`](https://polaris.shopify.com/components/selection-and-input/select).
To get a buttons matching the height of input fields, use the large size by using the `large` size variant of [`Button`](https://polaris.shopify.com/components/actions/button).

```diff
- <TextField connectedRight={<Button icon={DeleteMajor} />} />
+ <TextField connectedRight={<Button icon={DeleteMajor} size="large" />} />
```

### LegacyCard

#### Spacing and visual hierarchy

The [`LegacyCard`](https://polaris.shopify.com/components/layout-and-structure/legacy-card) now has much tighter spacing and does not have dividers between sections and subsections.
This may result in some visual hierarchy/padding issues depending on how your cards are composed.
You can resolve this in a number of ways:

- _recommended_ – Use [`Card`](https://polaris.shopify.com/components/layout-and-structure/card) and [`VerticalStack`](https://polaris.shopify.com/components/layout-and-structure/vertical-stack) to compose a new card layout
- Remove any custom content spacing wrappers and use `<LegacyCard.Section />`, `<LegacyCard.Header />`, or `<LegacyCard.Section flush />` instead.
  Issues involving a lack of top or bottom padding on the card is likely caused by this.
- Update all custom content padding using `--p-space-5` to use `--p-space-4`.
  This includes content wrapped in a [`LegacyStack`](https://polaris.shopify.com/components/layout-and-structure/legacy-stack)
  ```diff
  - spacing='loose'
  + spacing={undefined}
  ```
  or for [`InlineStack`](https://polaris.shopify.com/components/layout-and-structure/inline-stack)
  ```diff
  - gap='5'
  + gap='4'
  ```
- Add back dividers using [`Divider`](https://polaris.shopify.com/components/layout-and-structure/divider) where needed
- As a last resort, you can add space with [`Box`](https://polaris.shopify.com/components/layout-and-structure/box) or remove space with [`Bleed`](https://polaris.shopify.com/components/layout-and-structure/bleed).

### Z-Index

The new design language introduces a shadow bevel in numerous components.
The following component's children cannot be above the bevel's `z-index` elevation:

| Component      | Bevel z-index<br/>_(children cannot be above this)_ |
| -------------- | --------------------------------------------------- |
| Card           | 32                                                  |
| LegacyCard     | 101                                                 |
| Popover        | 2                                                   |
| TooltipOverlay | 1                                                   |

### Net new component variants

```jsx
<Avatar size="xl-experimental" />
<Avatar size="2xl-experimental" />

<Badge tone='info-strong-experimental' />
<Badge tone='success-strong-experimental' />
<Badge tone='warning-strong-experimental' />
<Badge tone='critical-strong-experimental' />
<Badge tone='attention-strong-experimental' />
<Badge tone='read-only-experimental' />
<Badge tone='enabled-experimental' />
<Button primarySuccess />
// not new variant but the styling is new
// Lots of card icons were updated to this variant from the non-primary variant
<Button icon={SomeIcon} primary plain />
```

### Custom elements

Custom elements that were styled to look like the previous Polaris design language will need to be updated.
Take the opportunity to put custom styles and components on mainline Polaris using our [components](https://polaris.shopify.com/components) and [tokens](https://polaris.shopify.com/tokens/color).
See a list of new tokens and the mapping our current tokens to our new once below.

### CSS Specificity

Some overrides of Polaris styles may not have a high enough specificity anymore while our library uses a beta flag.
For example, this has been seen in css overrides of icon color in [`Button`](https://polaris.shopify.com/components/actions/button).
To resolve the issue, you can [bump the specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity#increasing_specificity_by_duplicating_selector) of an override class.

### Token and API changes

#### Common token swaps

We've swapped out several different tokens across the board to create the new design language.
If you're using these tokens in stylesheets or as component props, they may need to be updated to conform to the new language.

| Old token                                | New token                              | Example usage                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------------------------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--p-spacing-5` (20px)                   | `--p-spacing-4` (16px)                 | Padding in [`Card`](https://polaris.shopify.com/components/layout-and-structure/card), gap between [`Card`](https://polaris.shopify.com/components/layout-and-structure/card)                                                                                                                                                                                                                                                                                                                                                                                     |
| `<LegacyStack vertical spacing="loose">` | `<LegacyStack vertical>`               | Gap between [`Card`](https://polaris.shopify.com/components/layout-and-structure/card)                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `<Text variant="headingMd">`             | `<Text variant="headingSm">`           | Any headings in [`Card`](https://polaris.shopify.com/components/layout-and-structure/card)                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `--p-font-size-100` (14px)               | `--p-font-size-80-experimental` (13px) | Body font size                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `--p-color-icon-interactive`             | `--p-color-icon`                       | [`ActionList`](https://polaris.shopify.com/components/lists/action-list) icon                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `--p-border-radius-1`                    | `--p-border-radius-2`                  | [`Button`](https://polaris.shopify.com/components/actions/button)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `--p-border-radius-2`                    | `--p-border-radius-3`                  | [`Card`](https://polaris.shopify.com/components/layout-and-structure/card)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `--p-border-width-1`                     | `--p-border-width-1-experimental`      | Input border widths                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `--p-border-width-1`                     | `--p-border-width-2-experimental`      | Input border width active states                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `--p-shadow-md`                          | `--p-shadow-xs`                        | [`Card`](https://polaris.shopify.com/components/layout-and-structure/card), [`TopBar`](https://polaris.shopify.com/components/navigation/top-bar), [`IndexTable`](https://polaris.shopify.com/components/tables/index-table), [`ResourceList`](https://polaris.shopify.com/components/lists/resource-list), [`DataTable`](https://polaris.shopify.com/components/tables/data-table), [`EmptyState`](https://polaris.shopify.com/components/layout-and-structure/empty-state), [`FullscreenBar`](https://polaris.shopify.com/components/navigation/fullscreen-bar) |
| `--p-shadow-lg`                          | `--p-shadow-lg`                        | [`Toast`](https://polaris.shopify.com/components/feedback-indicators/toast)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `--p-shadow-xl`                          | `--p-shadow-md`                        | [`Popover`](https://polaris.shopify.com/components/overlays/popover), [`DatePicker`](https://polaris.shopify.com/components/selection-and-input/date-picker), [`Tooltip`](https://polaris.shopify.com/components/overlays/tooltip), [`ContextualSaveBar`](https://polaris.shopify.com/components/selection-and-input/contextual-save-bar), [`OptionList`](https://polaris.shopify.com/components/lists/option-list)                                                                                                                                               |
| `--p-shadow-2xl`                         | `--p-shadow-2xl`                       | [`Modal`](https://polaris.shopify.com/components/overlays/modal), Search bar                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `--p-shadow-inset-md`                    | `--p-shadow-inset-md`                  | Active/Selected basic [`Button`](https://polaris.shopify.com/components/actions/button), Secondary action                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `--p-shadow-none`                        | `--p-shadow-none`                      | To remove shadow                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

#### Net new tokens

##### Color

| Token name                                                 | Example usage                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--p-color-bg-backdrop-experimental`                       | [`VideoThumbnail`](https://polaris.shopify.com/components/images-and-icons/video-thumbnail) timestamp background                                                                                                                                                                                                                                                                                                                                                                                                                |
| `--p-color-bg-secondary-experimental`                      | Filter [`Button`](https://polaris.shopify.com/components/actions/button) background                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `--p-color-bg-input-hover-experimental`                    | [`TextFields`](https://polaris.shopify.com/components/selection-and-input/text-field), [`Select`](https://polaris.shopify.com/components/selection-and-input/select), [`Checkbox`](https://polaris.shopify.com/components/selection-and-input/checkbox), and [`DropZone`](https://polaris.shopify.com/components/selection-and-input/drop-zone) hover state                                                                                                                                                                     |
| `--p-color-bg-input-active-experimental`                   | [`TextFields`](https://polaris.shopify.com/components/selection-and-input/text-field), [`Select`](https://polaris.shopify.com/components/selection-and-input/select), and [`DropZone`](https://polaris.shopify.com/components/selection-and-input/drop-zone) active state                                                                                                                                                                                                                                                       |
| `--p-color-bg-transparent-experimental`                    | Plain primary [`Button`](https://polaris.shopify.com/components/actions/button) disabled state, and [`Tabs`](https://polaris.shopify.com/components/navigation/tabs) default state                                                                                                                                                                                                                                                                                                                                              |
| `--p-color-bg-transparent-subdued-experimental`            | Neutral [`Badge`](https://polaris.shopify.com/components/feedback-indicators/badge)                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `--p-color-bg-transparent-hover-experimental`              | [`Tabs`](https://polaris.shopify.com/components/navigation/tabs) hover state                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `--p-color-bg-transparent-active-experimental`             | [`Tabs`](https://polaris.shopify.com/components/navigation/tabs) active state                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `--p-color-bg-transparent-disabled-experimental`           | [`TextFields`](https://polaris.shopify.com/components/selection-and-input/text-field), [`Select`](https://polaris.shopify.com/components/selection-and-input/select), [`DropZone`](https://polaris.shopify.com/components/selection-and-input/drop-zone), [`Button`](https://polaris.shopify.com/components/actions/button) (default), [`Page`](https://polaris.shopify.com/components/layout-and-structure/page) secondary action, [`Pagination`](https://polaris.shopify.com/components/navigation/pagination) disabled state |
| `--p-color-bg-transparent-secondary-disabled-experimental` | [`Checkbox`](https://polaris.shopify.com/components/selection-and-input/checkbox) + [`RadioButton`](https://polaris.shopify.com/components/selection-and-input/radio-button) in a disabled state                                                                                                                                                                                                                                                                                                                                |
| `--p-color-bg-transparent-primary-disabled-experimental`   | [`Button`](https://polaris.shopify.com/components/actions/button) primary disabled (all primary button variants)                                                                                                                                                                                                                                                                                                                                                                                                                |
| `--p-color-bg-transparent-primary-experimental'`           | [`Checkbox`](https://polaris.shopify.com/components/selection-and-input/checkbox) + [`RadioButton`](https://polaris.shopify.com/components/selection-and-input/radio-button) in a active, read only state                                                                                                                                                                                                                                                                                                                       |
| `--p-color-bg-success-strong-hover-experimental`           | [`Button`](https://polaris.shopify.com/components/actions/button) primary success hover state                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `--p-color-bg-success-strong-active-experimental`          | [`Button`](https://polaris.shopify.com/components/actions/button) primary success active state                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `--p-color-bg-warning-subdued-experimental`                | [`Banner`](https://polaris.shopify.com/components/feedback-indicators/banner) in [`Card`](https://polaris.shopify.com/components/layout-and-structure/card) with warning status, [`Badge`](https://polaris.shopify.com/components/feedback-indicators/badge) with warning status                                                                                                                                                                                                                                                |
| `--p-color-bg-warning-strong-experimental`                 | [`Banner`](https://polaris.shopify.com/components/feedback-indicators/banner) title with warning status, [`Badge`](https://polaris.shopify.com/components/feedback-indicators/badge) strong with warning status                                                                                                                                                                                                                                                                                                                 |
| `--p-color-border-input-active-experimental`               | Active [`TextFields`](https://polaris.shopify.com/components/selection-and-input/text-field), [`Select`](https://polaris.shopify.com/components/selection-and-input/select), [`RadioButton`](https://polaris.shopify.com/components/selection-and-input/radio-button), [`Checkbox`](https://polaris.shopify.com/components/selection-and-input/checkbox), [`DropZone`](https://polaris.shopify.com/components/selection-and-input/drop-zone)                                                                                    |
| `--p-color-border-critical-strong-experimental`            | Error state for [`TextFields`](https://polaris.shopify.com/components/selection-and-input/text-field), [`Select`](https://polaris.shopify.com/components/selection-and-input/select), [`Checkbox`](https://polaris.shopify.com/components/selection-and-input/checkbox), [`DropZone`](https://polaris.shopify.com/components/selection-and-input/drop-zone)                                                                                                                                                                     |
| `--p-color-text-warning-experimental`                      | [`Badge`](https://polaris.shopify.com/components/feedback-indicators/badge) and [`Banner`](https://polaris.shopify.com/components/feedback-indicators/banner) with warning status                                                                                                                                                                                                                                                                                                                                               |
| `--p-color-text-critical-hover-experimental`               | [`Button`](https://polaris.shopify.com/components/actions/button) plain destructive                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `--p-color-icon-info-strong-experimental`                  | [`Banner`](https://polaris.shopify.com/components/feedback-indicators/banner) with info status                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `--p-color-icon-warning-strong-experimental`               | [`Banner`](https://polaris.shopify.com/components/feedback-indicators/banner) with warning status                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `--p-color-icon-success-strong-experimental`               | [`Banner`](https://polaris.shopify.com/components/feedback-indicators/banner) with success status                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `--p-color-icon-critical-strong-experimental`              | [`Banner`](https://polaris.shopify.com/components/feedback-indicators/banner) with critical status, [`Page`](https://polaris.shopify.com/components/layout-and-structure/page) secondary destructive actions, [`Button`](https://polaris.shopify.com/components/actions/button) destructive (default, plain, & plain icon only)                                                                                                                                                                                                 |
| `--p-color-icon-critical-strong-hover-experimental`        | [`Button`](https://polaris.shopify.com/components/actions/button) destructive plain + plain icon only                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `--p-color-icon-critical-strong-active-experimental`       | [`Button`](https://polaris.shopify.com/components/actions/button) destructive plain + plain icon only                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `--p-color-avatar-background-experimental`                 | [`Avatar`](https://polaris.shopify.com/components/images-and-icons/avatar) default background color                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `--p-color-avatar-color-experimental`                      | [`Avatar`](https://polaris.shopify.com/components/images-and-icons/avatar) default icon color                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `--p-color-avatar-style-one-background-experimental`       | [`Avatar`](https://polaris.shopify.com/components/images-and-icons/avatar) style one background color                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `--p-color-avatar-style-one-color-experimental`            | [`Avatar`](https://polaris.shopify.com/components/images-and-icons/avatar) style one icon/text color                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `--p-color-avatar-style-two-background-experimental`       | [`Avatar`](https://polaris.shopify.com/components/images-and-icons/avatar) style two background color                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `--p-color-avatar-style-two-color-experimental`            | [`Avatar`](https://polaris.shopify.com/components/images-and-icons/avatar) style two icon/text color                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `--p-color-avatar-style-three-background-experimental`     | [`Avatar`](https://polaris.shopify.com/components/images-and-icons/avatar) style three background color                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `--p-color-avatar-style-three-color-experimental`          | [`Avatar`](https://polaris.shopify.com/components/images-and-icons/avatar) style three icon/text color                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `--p-color-avatar-style-four-background-experimental`      | [`Avatar`](https://polaris.shopify.com/components/images-and-icons/avatar) style four background color                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `--p-color-avatar-style-four-color-experimental`           | [`Avatar`](https://polaris.shopify.com/components/images-and-icons/avatar) style four icon/text color                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `--p-color-avatar-style-five-background-experimental`      | [`Avatar`](https://polaris.shopify.com/components/images-and-icons/avatar) style five background color                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `--p-color-avatar-style-five-color-experimental`           | [`Avatar`](https://polaris.shopify.com/components/images-and-icons/avatar) style five icon/text color                                                                                                                                                                                                                                                                                                                                                                                                                           |

##### Shadow

| Token name                                            | Example usage                                                                                                    |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `--p-shadow-bevel-experimental`                       | An add-on shadow effect commonly paired with `shadow-xs` through to `shadow-2xl`                                 |
| `--p-shadow-button-experimental`                      | Basic (default) [`Button`](https://polaris.shopify.com/components/actions/button) default state                  |
| `--p-shadow-button-disabled-experimental`             | Basic (default) [`Button`](https://polaris.shopify.com/components/actions/button) disabled state                 |
| `--p-shadow-button-primary-inset-experimental`        | TODO                                                                                                             |
| `--p-shadow-button-primary-strong-inset-experimental` | Primary [`Button`](https://polaris.shopify.com/components/actions/button) active/inset state                     |
| `--p-shadow-button-primary-strong-hover-experimental` | Primary [`Button`](https://polaris.shopify.com/components/actions/button) hover state                            |
| `--p-shadow-button-primary-strong-experimental`       | Primary [`Button`](https://polaris.shopify.com/components/actions/button) default state                          |
| `--p-shadow-button-primary-experimental`              | Success/Destructive primary [`Button`](https://polaris.shopify.com/components/actions/button) default state      |
| `--p-shadow-button-primary-hover-experimental`        | Success/Destructive primary [`Button`](https://polaris.shopify.com/components/actions/button) hover state        |
| `--p-shadow-button-inset-experimental`                | Success/Destructive primary [`Button`](https://polaris.shopify.com/components/actions/button) active/inset state |
| `--p-shadow-border-inset-experimental`                | [`Thumbnail`](https://polaris.shopify.com/components/images-and-icons/thumbnail) inset shadow                    |
| `--p-shadow-button-hover-experimental`                | Basic (default) [`Button`](https://polaris.shopify.com/components/actions/button) hover state                    |

##### Font

| Token name                                          | Example usage                                                                           |
| --------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `--p-font-size-70-experimental` (11px)              | [`TopBar`](https://polaris.shopify.com/components/navigation/top-bar) user menu message |
| `--p-font-size-80-experimental` (13px)              | Body font size                                                                          |
| `--p-font-line-height-075-experimental` (12px)      | Paired with `--p-font-size-70-experimental`                                             |
| `--p-font-letter-spacing-tightest-experimental`     | Text variant `heading3xl`                                                               |
| `--p-font-letter-spacing-tighter-experimental`      | Text variant `heading2xl`                                                               |
| `--p-font-letter-spacing-tight-experimental`        | Text variant `headingXl` and `headingLg`                                                |
| `--p-font-letter-spacing-normal-experimental`       | Sets letter spacing to `0`                                                              |
| `--p-font-weight-extra-semibold-experimental` (650) | Text variant `headingLg`                                                                |
| `--p-font-family-sans-experimental`                 | Sets the font family to [Inter](https://fonts.google.com/specimen/Inter)                |

##### Border

| Token name                                 | Example usage                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--p-border-radius-0-experimental`         | TODO                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `--p-border-radius-1_5-experimental` (6px) | [`Avatar`](https://polaris.shopify.com/components/images-and-icons/avatar) (medium + small), [`Thumbnail`](https://polaris.shopify.com/components/images-and-icons/thumbnail) (extra small)                                                                                                                                                                                                                                                                              |
| `--p-border-radius-0-experimental`         | TODO                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `--p-border-width-1-experimental` (.66px)  | [`TextField`](https://polaris.shopify.com/components/selection-and-input/text-field), [`Select`](https://polaris.shopify.com/components/selection-and-input/select), [`RadioButton`](https://polaris.shopify.com/components/selection-and-input/radio-button), [`Checkbox`](https://polaris.shopify.com/components/selection-and-input/checkbox), [`DropZone`](https://polaris.shopify.com/components/selection-and-input/drop-zone), search field                       |
| `--p-border-width-2-experimental` (1px)    | Table rows and active [`TextField`](https://polaris.shopify.com/components/selection-and-input/text-field), [`Select`](https://polaris.shopify.com/components/selection-and-input/select), [`RadioButton`](https://polaris.shopify.com/components/selection-and-input/radio-button), [`Checkbox`](https://polaris.shopify.com/components/selection-and-input/checkbox), [`DropZone`](https://polaris.shopify.com/components/selection-and-input/drop-zone), search field |

##### Space

| Token name                         | Example usage                     |
| ---------------------------------- | --------------------------------- |
| `--p-space-1_5-experimental` (6px) | Action list item vertical padding |
