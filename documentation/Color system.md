# Color system documentation

⚠️The color system is currently an unstable API, and is subject to change in non-major releases of Polaris react. Please use with caution.

## Surface (default: `#FAFAFA`)

The surface role is used for the backgrounds of our UIs, and consists of a range of gray hues. In light mode, surface colors are nearly white, while in dark mode, surface colors are nearly black. The color passed to the surface role impacts the rest of the color roles and their variants, adjusting them for light or dark contexts.

**Note** surface variants needed: inverse background, inverse foreground, dark background, dark foreground, light background, light foreground.

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

The On Surface role is made up of elements which appear on top of a surface, including plain text actions, borders (dividers), neutral icons, and text. When a light Surface is provided, On Surface values will be dark. When a dark surface is provided, On Surface values will be light.

### On Surface base: `--p-on-surface`

While use directly in our components is discouraged, the base variant is unmodified from the original role input color.

### Action

For use in plain text actions as a text color. **Note** might be clearer if named `Link`

- Action On Surface: `--p-action-on-surface`
- Action On Inverse: `--p-action-on-inverse`
- Action On Dark: `--p-action-on-dark`
- Action On Light: `--p-action-on-light`

#### Action Disabled

For use in plain text disabled actions as a text color.

- Action Disabled On Surface: `--p-action-disabled-on-surface`
- Action Disabled On Inverse: `--p-action-disabled-on-inverse`
- Action Disabled On Dark: `--p-action-disabled-on-dark`
- Action Disabled On Light: `--p-action-disabled-on-light`

#### Action Hovered

For use in plain text hovered actions as a text color.

- Action Hovered On Surface: `--p-action-hovered-on-surface`
- Action Hovered On Inverse: `--p-action-hovered-on-inverse`
- Action Hovered On Dark: `--p-action-hovered-on-dark`
- Action Hovered On Light: `--p-action-hovered-on-light`

#### Action Pressed

For use in plain text pressed actions as a text color.

- Action Pressed On Surface: `--p-action-pressed-on-surface`
- Action Pressed On Inverse: `--p-action-pressed-on-inverse`
- Action Pressed On Dark: `--p-action-pressed-on-dark`
- Action Pressed On Light: `--p-action-pressed-on-light`

### Divider

For use as a divider (border or interactive outline).

- Divider On Surface: `--p-divider-on-surface`
- Divider On Inverse: `--p-divider-on-inverse`
- Divider On Dark: `--p-divider-on-dark`
- Divider On Light: `--p-divider-on-light`

#### Divider Disabled

For use as a an interactive outline on disabled elements.

- Divider Disabled On Surface: `--p-divider-disabled-on-surface`
- Divider Disabled On Inverse: `--p-divider-disabled-on-inverse`
- Divider Disabled On Dark: `--p-divider-disabled-on-dark`
- Divider Disabled On Light: `--p-divider-disabled-on-light`

#### Divider Subdued

For use as a subdued divider (border or interactive outline).

- Divider Subdued On Surface: `--p-divider-subdued-on-surface`
- Divider Subdued On Inverse: `--p-divider-subdued-on-inverse`
- Divider Subdued On Dark: `--p-divider-subdued-on-dark`
- Divider Subdued On Light: `--p-divider-subdued-on-light`

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

For use as a text color in links and plain buttons. **Note** would be clearer if named `Link`

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

For use as a fill color for icons on primary actions. Not for use in icons on navigation and tabs. **Note** disabled variant needed.

- Icon On Branded: `--p-icon-on-branded`
- Icon Subdued On Branded: `--p-icon-subdued-on-branded`

### Text On Branded

For use as a text color on primary actions. Not for use in text on navigation and tabs. **Note** disabled variant needed.

- Text On Branded: `--p-text-on-branded`
- Text Subdued On Branded: `--p-text-subdued-on-branded`

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

### Critical Divider

For use as a border on critical components such as banners, and as an outline on interactive elements in an error state.

- Critical Divider: `--p-critical-divider`
- Critical Divider Disabled: `--p-critical-divider-disabled`

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

### Critical Action Subdued: `--p-critical-action-subdued`

**Note** Not currently used, and likely to be deleted

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

### Warning Divider: `--p-warning-divider`

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

### Highlight Divider: `--p-highlight-divider`

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

### Success Divider: `--p-success-divider`

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

### Backdrop : `--p-backdrop`

For use as the background color of the backdrop component for navigation and modal.

### Shadow

For use in building shadows for popovers, cards, and modals.

- Shadow From Ambient Light: `--p-shadow-from-ambient-light`
- Shadow From Direct Light: `--p-shadow-from-direct-light`
