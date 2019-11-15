# Color system documentation

⚠️The color system is currently an unstable API, and is subject to change in non-major releases of Polaris react. Please use with caution.

- [Surface (default: `#FAFAFA`)](#surface-default-fafafa)
  - [Surface concepts](#surface-concepts)
  - [Surface Base: `--p-surface`](#surface-base---p-surface)
  - [Surface Background](#surface-background)
  - [Surface Foreground](#surface-foreground)
  - [Surface Foreground Subdued](#surface-foreground-subdued)
  - [Surface Hovered](#surface-hovered)
  - [Surface Pressed: `--p-surface-pressed`](#surface-pressed---p-surface-pressed)
- [On Surface (default: `#1F2225`)](#on-surface-default-1f2225)
  - [On Surface base: `--p-on-surface`](#on-surface-base---p-on-surface)
  - [Border](#border)
    - [Border Disabled](#border-disabled)
    - [Border Subdued](#border-subdued)
  - [Icon](#icon)
    - [Icon subdued](#icon-subdued)
    - [Icon disabled](#icon-disabled)
  - [Text](#text)
    - [Text Subdued](#text-subdued)
    - [Text Disabled](#text-disabled)
- [Interactive (default: `#0870D9`)](#interactive-default-0870d9)
  - [Interactive Base: `--p-interactive`](#interactive-base---p-interactive)
  - [Interactive Action](#interactive-action)
  - [Interactive Focus: `--p-interactive-focus`](#interactive-focus---p-interactive-focus)
  - [Interactive Selected](#interactive-selected)
- [Neutral (default: `#EAEAEB`)](#neutral-default-eaeaeb)
  - [Neutral Base : `--p-neutral`](#neutral-base----p-neutral)
  - [Neutral Action](#neutral-action)
- [Branded (default: `#008060`)](#branded-default-008060)
  - [Branded Base: `--p-branded`](#branded-base---p-branded)
  - [Branded Action](#branded-action)
  - [Icon On Branded](#icon-on-branded)
  - [Text On Branded](#text-on-branded)
  - [Branded Selected](#branded-selected)
- [Critical (default: `#D82C0D`)](#critical-default-d82c0d)
  - [Critical Base : `--p-critical`](#critical-base----p-critical)
  - [Critical Border](#critical-border)
  - [Critical Icon: `--p-critical-icon`](#critical-icon---p-critical-icon)
  - [Critical Surface: `--p-critical-surface`](#critical-surface---p-critical-surface)
  - [Critical Surface Subdued: `--p-critical-surface-subdued`](#critical-surface-subdued---p-critical-surface-subdued)
  - [Critical Surface Subdued Hovered: `--p-critical-surface-subdued-hovered`](#critical-surface-subdued-hovered---p-critical-surface-subdued-hovered)
  - [Critical Surface Subdued Pressed: `--p-critical-surface-subdued-pressed`](#critical-surface-subdued-pressed---p-critical-surface-subdued-pressed)
  - [Critical Text: `--p-critical-text`](#critical-text---p-critical-text)
  - [Critical Action](#critical-action)
  - [Critical Link](#critical-link)
- [Warning (default: `#FFC453`)](#warning-default-ffc453)
  - [Warning Base: `--p-warning`](#warning-base---p-warning)
  - [Warning Border: `--p-warning-border`](#warning-border---p-warning-border)
  - [Warning Icon: `--p-warning-icon`](#warning-icon---p-warning-icon)
  - [Warning Surface: `--p-warning-surface`](#warning-surface---p-warning-surface)
  - [Warning Surface Subdued: `--p-warning-surface-subdued`](#warning-surface-subdued---p-warning-surface-subdued)
  - [Warning Text: `--p-warning-text`](#warning-text---p-warning-text)
- [Highlight (default: `#59D0C2`)](#highlight-default-59d0c2)
  - [Highlight Base: `--p-highlight`](#highlight-base---p-highlight)
  - [Highlight Border: `--p-highlight-border`](#highlight-border---p-highlight-border)
  - [Highlight Icon: `--p-highlight-icon`](#highlight-icon---p-highlight-icon)
  - [Highlight Surface: `--p-highlight-surface`](#highlight-surface---p-highlight-surface)
  - [Highlight Surface Subdued: `--p-highlight-surface-subdued`](#highlight-surface-subdued---p-highlight-surface-subdued)
  - [Highlight Text: `--p-highlight-text`](#highlight-text---p-highlight-text)
- [Success (default: `#008060`)](#success-default-008060)
  - [Success Base: `--p-success`](#success-base---p-success)
  - [Success Border: `--p-success-border`](#success-border---p-success-border)
  - [Success Icon: `--p-success-icon`](#success-icon---p-success-icon)
  - [Success Surface: `--p-success-surface`](#success-surface---p-success-surface)
  - [Success Surface Subdued: `--p-success-surface-subdued`](#success-surface-subdued---p-success-surface-subdued)
  - [Success Text: `--p-success-text`](#success-text---p-success-text)
- [Transparency](#transparency)
  - [Backdrop](#backdrop)
  - [Shadow](#shadow)

## Surface (default: `#FAFAFA`)

The surface role is used for the backgrounds of our UIs, and consists of a range of gray hues. In light mode, surface colors are nearly white, while in dark mode, surface colors are nearly black. The color passed to the surface role impacts the rest of the color roles and their variants, adjusting them for light or dark contexts.

### Surface concepts

- **surface**: a variable background color that is light in light mode and dark in dark mode
- **inverse**: a variable background color that is dark in light mode and light in dark mode
- **dark**: a constant background color that is always dark regardless of mode
- **light**: a constant background color that is always light regardless of mode

### Surface Base: `--p-surface`

While use directly in our components is discouraged, the base variant is unmodified from the original role input color.

### Surface Background

For use in the background of our UIs as a background color, in components such as `Page` and `Frame` backgrounds.

- Surface Background: `--p-surface-background`
- Surface Inverse Background: `--p-surface-inverse-background`
- Surface Dark Background: `--p-surface-dark-background`
- Surface Light Background: `--p-surface-light-background`

### Surface Foreground

For use in the foreground of our UIs as a background color, in components such as `Card`, `Modal`, and `Popover`.

- Surface Foreground: `--p-surface-foreground`
- Surface Inverse Foreground: `--p-surface-inverse-foreground`
- Surface Dark Foreground: `--p-surface-dark-foreground`
- Surface Light Foreground: `--p-surface-light-foreground`

### Surface Foreground Subdued

For use in the foreground of our UIs as a subdued background color, in components such as `Card`, `Modal`, and `Popover`.

- Surface Foreground Subdued: `--p-surface-foreground-subdued`
- Surface Inverse Foreground Subdued: `--p-surface-inverse-foreground-subdued`
- Surface Dark Foreground Subdued: `--p-surface-dark-foreground-subdued`
- Surface Light Foreground Subdued: `--p-surface-light-foreground-subdued`

### Surface Hovered

For use as a surface color on interactive elements such as resource list items and action list items when in a hovered state.

- Surface Hovered: `--p-surface-hovered`
- Surface Inverse Hovered: `--p-surface-inverse-hovered`
- Surface Dark Hovered: `--p-surface-dark-hovered`
- Surface Light Hovered: `--p-surface-light-hovered`

### Surface Pressed: `--p-surface-pressed`

For use as a surface color on interactive elements such as resource list items and action list items when in a pressed state.

- Surface Pressed: `--p-surface-pressed`
- Surface Inverse Pressed: `--p-surface-inverse-pressed`
- Surface Dark Pressed: `--p-surface-dark-pressed`
- Surface Light Pressed: `--p-surface-light-pressed`

---

## On Surface (default: `#1F2225`)

The On Surface role is made up of elements which appear on top of a surface, including borders, neutral icons, and text. When a light Surface is provided, On Surface values will be dark. When a dark surface is provided, On Surface values will be light.

### On Surface base: `--p-on-surface`

While use directly in our components is discouraged, the base variant is unmodified from the original role input color.

### Border

For use as a border (border or interactive outline).

- Border On Surface: `--p-border-on-surface`
- Border On Inverse: `--p-border-on-inverse`
- Border On Dark: `--p-border-on-dark`
- Border On Light: `--p-border-on-light`

#### Border Disabled

For use as a an interactive outline on disabled elements.

- Border Disabled On Surface: `--p-border-disabled-on-surface`
- Border Disabled On Inverse: `--p-border-disabled-on-inverse`
- Border Disabled On Dark: `--p-border-disabled-on-dark`
- Border Disabled On Light: `--p-border-disabled-on-light`

#### Border Subdued

For use as a subdued border (border or interactive outline).

- Border Subdued On Surface: `--p-border-subdued-on-surface`
- Border Subdued On Inverse: `--p-border-subdued-on-inverse`
- Border Subdued On Dark: `--p-border-subdued-on-dark`
- Border Subdued On Light: `--p-border-subdued-on-light`

### Icon

For use as the fill color of neutral icons.

- Icon On Surface: `--p-icon-on-surface`
- Icon On Inverse: `--p-icon-on-inverse`
- Icon On Dark: `--p-icon-on-dark`
- Icon On Light: `--p-icon-on-light`

#### Icon subdued

For use as the fill color of subdued neutral icons.

- Icon Subdued On Surface: `--p-icon-subdued-on-surface`
- Icon Subdued On Inverse: `--p-icon-subdued-on-inverse`
- Icon Subdued On Dark: `--p-icon-subdued-on-dark`
- Icon Subdued On Light: `--p-icon-subdued-on-light`

#### Icon disabled

For use as the fill color of disabled neutral icons.

- Icon Disabled On Surface: `--p-icon-disabled-on-surface`
- Icon Disabled On Inverse: `--p-icon-disabled-on-inverse`
- Icon Disabled On Dark: `--p-icon-disabled-on-dark`
- Icon Disabled On Light: `--p-icon-disabled-on-light`

### Text

For use as a neutral text color.

- Text On Surface: `--p-text-on-surface`
- Text On Inverse: `--p-text-on-inverse`
- Text On Dark: `--p-text-on-dark`
- Text On Light: `--p-text-on-light`

#### Text Subdued

For use as a subdued neutral text color.

- Text Subdued On Surface: `--p-text-subdued-on-surface`
- Text Subdued On Inverse: `--p-text-subdued-on-inverse`
- Text Subdued On Dark: `--p-text-subdued-on-dark`
- Text Subdued On Light: `--p-text-subdued-on-light`

#### Text Disabled

For use as a disabled neutral text color.

- Text Disabled On Surface: `--p-text-disabled-on-surface`
- Text Disabled On Inverse: `--p-text-disabled-on-inverse`
- Text Disabled On Dark: `--p-text-disabled-on-dark`
- Text Disabled On Light: `--p-text-disabled-on-light`

---

## Interactive (default: `#0870D9`)

The interactive role is used to express interactivity in components. It is used in links, as an indicator of focus, and as an indicator of selected interactive states.

### Interactive Base: `--p-interactive`

While use directly in our components is discouraged, the base variant is unmodified from the original role input color.

### Interactive Action

- Interactive Action: `--p-interactive-action`
- Interactive Action Disabled: `--p-interactive-action-disabled`
- Interactive Action Hovered: `--p-interactive-action-hovered`
- Interactive Action Subdued: `--p-interactive-action-subdued`
- Interactive Action Pressed: `--p-interactive-action-pressed`

### Interactive Focus: `--p-interactive-focus`

For use in the focus ring on interactive elements.

### Interactive Selected

For use as a surface color in selected interactive elements, in components such as option list and resource list.

- Interactive Selected: `--p-interactive-selected`
- Interactive Selected Hovered: `--p-interactive-selected-hovered`
- Interactive Selected Pressed: `--p-interactive-selected-pressed`

---

## Neutral (default: `#EAEAEB`)

A neutral interactive color role, for use in secondary and tertiary buttons as a background color, as well as in form elements as a background color.

### Neutral Base : `--p-neutral`

While use directly in our components is discouraged, the base variant is unmodified from the original role input color.

### Neutral Action

- Neutral Action: `--p-neutral-action`
- Neutral Action Disabled: `--p-neutral-action-disabled`
- Neutral Action Hovered: `--p-neutral-action-hovered`
- Neutral Action Pressed: `--p-neutral-action-pressed`

---

## Branded (default: `#008060`)

A branded interactive color, for use in primary buttons as a background color. Also used in navigation and tabs for icons, and for a surface color when in a selected state.

### Branded Base: `--p-branded`

While use directly in our components is discouraged, the base variant is unmodified from the original role input color.

### Branded Action

Used as the background color for primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.

- Branded Action: `--p-branded-action`
- Branded Action Disabled: `--p-branded-action-disabled`
- Branded Action Hovered: `--p-branded-action-hovered`
- Branded Action Pressed: `--p-branded-action-pressed`

### Icon On Branded

For use as a fill color for icons on primary actions. Not for use in icons on navigation and tabs.

- Icon On Branded: `--p-icon-on-branded`
- Icon Subdued On Branded: `--p-icon-subdued-on-branded`
- Icon Disabled On Branded: `--p-icon-disabled-on-branded`

### Text On Branded

For use as a text color on primary actions. Not for use in text on navigation and tabs.

- Text On Branded: `--p-text-on-branded`
- Text Subdued On Branded: `--p-text-subdued-on-branded`
- Text Disabled On Branded: `--p-text-disabled-on-branded`

### Branded Selected

Used as a surface color to indicate selected interactive states in navigation and tabs.

- Branded Selected: `--p-branded-selected`
- Branded Selected Hovered: `--p-branded-selected-hovered`
- Branded Selected Pressed: `--p-branded-selected-pressed`

---

## Critical (default: `#D82C0D`)

Used to communicate destructive outcomes on interactive elements, for communicating errors, and to indicate a critical event in inert elements that requires immediate merchant action.

### Critical Base : `--p-critical`

While use directly in our components is discouraged, the base variant is unmodified from the original role input color.

### Critical Border

For use as a border on critical components such as banners, and as an outline on interactive elements in an error state.

- Critical Border: `--p-critical-border`
- Critical Border Disabled: `--p-critical-border-disabled`

### Critical Icon: `--p-critical-icon`

For use as an icon fill color on top of critical elements.

### Critical Surface: `--p-critical-surface`

For use as a surface color on critical elements including badges.

### Critical Surface Subdued: `--p-critical-surface-subdued`

For use as a surface color on critical elements including banners.

### Critical Surface Subdued Hovered: `--p-critical-surface-subdued-hovered`

For use as a surface color on critical interactive elements including action list items in a hovered state.

### Critical Surface Subdued Pressed: `--p-critical-surface-subdued-pressed`

For use as a surface color on critical interactive elements including action list items in a pressed state.

### Critical Text: `--p-critical-text`

For use as a text color in inert critical elements such as exception list. Not for use as a text color on banners and badges.

### Critical Action

For use as the background color for destructive buttons, and as the background color for error toast messages.

- Critical Action: `--p-critical-action`
- Critical Action Disabled: `--p-critical-action-disabled`
- Critical Action Hovered: `--p-critical-action-hovered`
- Critical Action Pressed: `--p-critical-action-pressed`

### Critical Link

For use as a text color in destructive plain buttons, as well as a text color on destructive action list items. Not for use on critical banners and badges.

- Critical Link: `--p-critical-link`
- Critical Link Disabled: `--p-critical-link-disabled`
- Critical Link Hovered: `--p-critical-link-hovered`
- Critical Link Pressed: `--p-critical-link-pressed`

---

## Warning (default: `#FFC453`)

For use as an indicator that action should be taken by merchants in components including badges, banners, and exception lists.

### Warning Base: `--p-warning`

While use directly in our components is discouraged, the base variant is unmodified from the original role input color.

### Warning Border: `--p-warning-border`

For use as a border on warning components such as banners.

### Warning Icon: `--p-warning-icon`

For use as an icon fill color on top of warning elements.

### Warning Surface: `--p-warning-surface`

For use as a surface color on warning elements including badges.

### Warning Surface Subdued: `--p-warning-surface-subdued`

For use as a surface color on warning elements including banners.

### Warning Text: `--p-warning-text`

For use as a text color in inert critical elements such as exception list. Not for use as a text color on banners and badges.

---

## Highlight (default: `#59D0C2`)

Used to highlight elements of the UI that are important for merchants, but do not require immediate action. Used in information banners and badges, indicators that draw attention to new information, bars that indicate loading or progress, and in data visualization.

### Highlight Base: `--p-highlight`

While use directly in our components is discouraged, the base variant is unmodified from the original role input color.

### Highlight Border: `--p-highlight-border`

For use as a border on informational components such as banners.

### Highlight Icon: `--p-highlight-icon`

For use as an icon fill color on top of informational elements.

### Highlight Surface: `--p-highlight-surface`

For use as a surface color on information elements including badges.

### Highlight Surface Subdued: `--p-highlight-surface-subdued`

For use as a surface color on information elements including banners.

### Highlight Text: `--p-highlight-text`

For use as a text color in inert informational elements. Not for use as a text color on banners and badges.

---

## Success (default: `#008060`)

Used to indicate the result of a successful action taken by a merchant, to indicate a positive event, or to illustrate growth.

### Success Base: `--p-success`

While use directly in our components is discouraged, the base variant is unmodified from the original role input color.

### Success Border: `--p-success-border`

For use as a border on success components such as banners.

### Success Icon: `--p-success-icon`

For use as an icon fill color on top of success elements.

### Success Surface: `--p-success-surface`

For use as a surface color on success elements including badges.

### Success Surface Subdued: `--p-success-surface-subdued`

For use as a surface color on information elements including banners.

### Success Text: `--p-success-text`

For use as a text color in inert success elements. Not for use as a text color on banners and badges.

---

## Transparency

Used to add depth to our UIs in the cases of backdrops and shadows. Used in navigation, popovers, cards, modals, and sheets.

**Note**: a white transparent backdrop is needed

### Backdrop

For use as the background color of the backdrop component for navigation and modal.

- Backdrop: `--p-backdrop`
- Backdrop Light: `--p-backdrop-light`

### Shadow

For use in building shadows for popovers, cards, and modals.

- Shadow From Ambient Light: `--p-shadow-from-ambient-light`
- Shadow From Direct Light: `--p-shadow-from-direct-light`
