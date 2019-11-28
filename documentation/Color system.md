# Color system

⚠️ The color system is currently an unstable API, and is subject to change in non-major releases of Polaris react. Please use with caution.

## Table of contents

- [`surface`](#surface)
  - [`surface`](#surface)
  - [`surfaceBackground`](#surfaceBackground)
  - [`surfaceForeground`](#surfaceForeground)
  - [`surfaceForegroundSubdued`](#surfaceForegroundSubdued)
  - [`surfaceHovered`](#surfaceHovered)
  - [`surfacePressed`](#surfacePressed)
  - [`backdrop`](#backdrop)
  - [`shadowFromAmbientLight`](#shadowFromAmbientLight)
  - [`shadowFromDirectLight`](#shadowFromDirectLight)
- [`onSurface`](#onSurface)
  - [`onSurface`](#onSurface)
  - [`borderOnSurface`](#borderOnSurface)
  - [`borderDisabledOnSurface`](#borderDisabledOnSurface)
  - [`borderSubduedOnSurface`](#borderSubduedOnSurface)
  - [`iconOnSurface`](#iconOnSurface)
  - [`iconDisabledOnSurface`](#iconDisabledOnSurface)
  - [`iconSubduedOnSurface`](#iconSubduedOnSurface)
  - [`textOnSurface`](#textOnSurface)
  - [`textDisabledOnSurface`](#textDisabledOnSurface)
  - [`textSubduedOnSurface`](#textSubduedOnSurface)
- [`interactive`](#interactive)
  - [`interactive`](#interactive)
  - [`interactiveAction`](#interactiveAction)
  - [`interactiveActionDisabled`](#interactiveActionDisabled)
  - [`interactiveActionHovered`](#interactiveActionHovered)
  - [`interactiveActionSubdued`](#interactiveActionSubdued)
  - [`interactiveActionPressed`](#interactiveActionPressed)
  - [`interactiveFocus`](#interactiveFocus)
  - [`interactiveSelected`](#interactiveSelected)
  - [`interactiveSelectedHovered`](#interactiveSelectedHovered)
  - [`interactiveSelectedPressed`](#interactiveSelectedPressed)
- [`neutral`](#neutral)
  - [`neutral`](#neutral)
  - [`neutralAction`](#neutralAction)
  - [`neutralActionDisabled`](#neutralActionDisabled)
  - [`neutralActionHovered`](#neutralActionHovered)
  - [`neutralActionPressed`](#neutralActionPressed)
- [`primary`](#primary)
  - [`primary`](#primary)
  - [`primaryAction`](#primaryAction)
  - [`primaryActionDisabled`](#primaryActionDisabled)
  - [`primaryActionHovered`](#primaryActionHovered)
  - [`primaryActionPressed`](#primaryActionPressed)
  - [`iconOnPrimary`](#iconOnPrimary)
  - [`iconSubduedOnPrimary`](#iconSubduedOnPrimary)
  - [`iconDisabledOnPrimary`](#iconDisabledOnPrimary)
  - [`textOnPrimary`](#textOnPrimary)
  - [`textSubduedOnPrimary`](#textSubduedOnPrimary)
  - [`textDisabledOnPrimary`](#textDisabledOnPrimary)
  - [`primarySelected`](#primarySelected)
  - [`primarySelectedHovered`](#primarySelectedHovered)
  - [`primarySelectedPressed`](#primarySelectedPressed)
- [`critical`](#critical)
  - [`critical`](#critical)
  - [`criticalBorder`](#criticalBorder)
  - [`criticalBorderDisabled`](#criticalBorderDisabled)
  - [`criticalIcon`](#criticalIcon)
  - [`criticalSurface`](#criticalSurface)
  - [`criticalSurfaceSubdued`](#criticalSurfaceSubdued)
  - [`criticalSurfaceSubduedHovered`](#criticalSurfaceSubduedHovered)
  - [`criticalSurfaceSubduedPressed`](#criticalSurfaceSubduedPressed)
  - [`criticalText`](#criticalText)
  - [`criticalAction`](#criticalAction)
  - [`criticalActionDisabled`](#criticalActionDisabled)
  - [`criticalActionHovered`](#criticalActionHovered)
  - [`criticalActionPressed`](#criticalActionPressed)
  - [`criticalLink`](#criticalLink)
  - [`criticalLinkDisabled`](#criticalLinkDisabled)
  - [`criticalLinkHovered`](#criticalLinkHovered)
  - [`criticalLinkPressed`](#criticalLinkPressed)
- [`warning`](#warning)
  - [`warning`](#warning)
  - [`warningBorder`](#warningBorder)
  - [`warningIcon`](#warningIcon)
  - [`warningSurface`](#warningSurface)
  - [`warningSurfaceSubdued`](#warningSurfaceSubdued)
  - [`warningText`](#warningText)
- [`highlight`](#highlight)
  - [`highlight`](#highlight)
  - [`highlightBorder`](#highlightBorder)
  - [`highlightIcon`](#highlightIcon)
  - [`highlightSurface`](#highlightSurface)
  - [`highlightSurfaceSubdued`](#highlightSurfaceSubdued)
  - [`highlightext`](#highlightext)
- [`success`](#success)
  - [`success`](#success)
  - [`successBorder`](#successBorder)
  - [`successIcon`](#successIcon)
  - [`successSurface`](#successSurface)
  - [`successSurfaceSubdued`](#successSurfaceSubdued)
  - [`successText`](#successText)


## `surface`

GET DESC FROM TYPE

### `surface`

While use directly in our components is discouraged, the base variant is unmodified from the original role input color.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-surface`         | ![][surfaceLight] | ![][surfaceDark]  |
| `--p-surface-inverse` | ![][surfaceDark]  | ![][surfaceLight] |
| `--p-surface-light`   | ![][surfaceLight] | ![][surfaceLight] |
| `--p-surface-dark`    | ![][surfaceDark]  | ![][surfaceDark]  |

[surfaceLight]: https://www.gifpng.com/64x32/fafafa/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[surfaceDark]: https://www.gifpng.com/64x32/111213/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `surfaceBackground`

For use in the background of our UIs as a background color, in components such as Page and Frame backgrounds.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-surface-background`         | ![][surfaceBackgroundLight] | ![][surfaceBackgroundDark]  |
| `--p-surface-background-inverse` | ![][surfaceBackgroundDark]  | ![][surfaceBackgroundLight] |
| `--p-surface-background-light`   | ![][surfaceBackgroundLight] | ![][surfaceBackgroundLight] |
| `--p-surface-background-dark`    | ![][surfaceBackgroundDark]  | ![][surfaceBackgroundDark]  |

[surfaceBackgroundLight]: https://www.gifpng.com/64x32/fafafa/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[surfaceBackgroundDark]: https://www.gifpng.com/64x32/0c0d0e/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `surfaceForeground`

For use in the foreground of our UIs as a background color, in components such as Card, Modal, and Popover.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-surface-foreground`         | ![][surfaceForegroundLight] | ![][surfaceForegroundDark]  |
| `--p-surface-foreground-inverse` | ![][surfaceForegroundDark]  | ![][surfaceForegroundLight] |
| `--p-surface-foreground-light`   | ![][surfaceForegroundLight] | ![][surfaceForegroundLight] |
| `--p-surface-foreground-dark`    | ![][surfaceForegroundDark]  | ![][surfaceForegroundDark]  |

[surfaceForegroundLight]: https://www.gifpng.com/64x32/ffffff/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[surfaceForegroundDark]: https://www.gifpng.com/64x32/181a1b/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `surfaceForegroundSubdued`

For use in the foreground of our UIs as a subdued background color, in components such as Card, Modal, and Popover.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-surface-foreground-subdued`         | ![][surfaceForegroundSubduedLight] | ![][surfaceForegroundSubduedDark]  |
| `--p-surface-foreground-subdued-inverse` | ![][surfaceForegroundSubduedDark]  | ![][surfaceForegroundSubduedLight] |
| `--p-surface-foreground-subdued-light`   | ![][surfaceForegroundSubduedLight] | ![][surfaceForegroundSubduedLight] |
| `--p-surface-foreground-subdued-dark`    | ![][surfaceForegroundSubduedDark]  | ![][surfaceForegroundSubduedDark]  |

[surfaceForegroundSubduedLight]: https://www.gifpng.com/64x32/f2f2f2/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[surfaceForegroundSubduedDark]: https://www.gifpng.com/64x32/1b1d1d/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `surfaceHovered`

For use as a surface color on interactive elements such as resource list items and action list items when in a hovered state.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-surface-hovered`         | ![][surfaceHoveredLight] | ![][surfaceHoveredDark]  |
| `--p-surface-hovered-inverse` | ![][surfaceHoveredDark]  | ![][surfaceHoveredLight] |
| `--p-surface-hovered-light`   | ![][surfaceHoveredLight] | ![][surfaceHoveredLight] |
| `--p-surface-hovered-dark`    | ![][surfaceHoveredDark]  | ![][surfaceHoveredDark]  |

[surfaceHoveredLight]: https://www.gifpng.com/64x32/f2f2f2/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[surfaceHoveredDark]: https://www.gifpng.com/64x32/2f3032/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `surfacePressed`

For use as a surface color on interactive elements such as resource list items and action list items when in a pressed state.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-surface-pressed`         | ![][surfacePressedLight] | ![][surfacePressedDark]  |
| `--p-surface-pressed-inverse` | ![][surfacePressedDark]  | ![][surfacePressedLight] |
| `--p-surface-pressed-light`   | ![][surfacePressedLight] | ![][surfacePressedLight] |
| `--p-surface-pressed-dark`    | ![][surfacePressedDark]  | ![][surfacePressedDark]  |

[surfacePressedLight]: https://www.gifpng.com/64x32/e3e3e3/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[surfacePressedDark]: https://www.gifpng.com/64x32/3d3f42/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `backdrop`

For use as the background color of the backdrop component for navigation and modal.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-backdrop`         | ![][backdropLight] | ![][backdropDark]  |


[backdropLight]: https://www.gifpng.com/64x32/000000/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[backdropDark]: https://www.gifpng.com/64x32/000000/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `shadowFromAmbientLight`

For use in building shadows for popovers, cards, and modals.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-shadow-from-ambient-light`         | ![][shadowFromAmbientLightLight] | ![][shadowFromAmbientLightDark]  |


[shadowFromAmbientLightLight]: https://www.gifpng.com/64x32/161717/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[shadowFromAmbientLightDark]: https://www.gifpng.com/64x32/161717/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `shadowFromDirectLight`

For use in building shadows for popovers, cards, and modals.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-shadow-from-direct-light`         | ![][shadowFromDirectLightLight] | ![][shadowFromDirectLightDark]  |


[shadowFromDirectLightLight]: https://www.gifpng.com/64x32/000000/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[shadowFromDirectLightDark]: https://www.gifpng.com/64x32/000000/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

## `onSurface`

GET DESC FROM TYPE

### `onSurface`

While use directly in our components is discouraged, the base variant is unmodified from the original role input color.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-on-surface`         | ![][onSurfaceLight] | ![][onSurfaceDark]  |


[onSurfaceLight]: https://www.gifpng.com/64x32/1e2124/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[onSurfaceDark]: https://www.gifpng.com/64x32/1e2124/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `borderOnSurface`

For use as a border (border or interactive outline).

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-border-on-surface`         | ![][borderOnSurfaceLight] | ![][borderOnSurfaceDark]  |
| `--p-border-on-surface-inverse` | ![][borderOnSurfaceDark]  | ![][borderOnSurfaceLight] |
| `--p-border-on-surface-light`   | ![][borderOnSurfaceLight] | ![][borderOnSurfaceLight] |
| `--p-border-on-surface-dark`    | ![][borderOnSurfaceDark]  | ![][borderOnSurfaceDark]  |

[borderOnSurfaceLight]: https://www.gifpng.com/64x32/b1bac4/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[borderOnSurfaceDark]: https://www.gifpng.com/64x32/4e545a/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `borderDisabledOnSurface`

For use as a an interactive outline on disabled elements.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-border-disabled-on-surface`         | ![][borderDisabledOnSurfaceLight] | ![][borderDisabledOnSurfaceDark]  |
| `--p-border-disabled-on-surface-inverse` | ![][borderDisabledOnSurfaceDark]  | ![][borderDisabledOnSurfaceLight] |
| `--p-border-disabled-on-surface-light`   | ![][borderDisabledOnSurfaceLight] | ![][borderDisabledOnSurfaceLight] |
| `--p-border-disabled-on-surface-dark`    | ![][borderDisabledOnSurfaceDark]  | ![][borderDisabledOnSurfaceDark]  |

[borderDisabledOnSurfaceLight]: https://www.gifpng.com/64x32/f0f2f4/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[borderDisabledOnSurfaceDark]: https://www.gifpng.com/64x32/a2aeb9/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `borderSubduedOnSurface`

For use as a subdued border (border or interactive outline).

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-border-subdued-on-surface`         | ![][borderSubduedOnSurfaceLight] | ![][borderSubduedOnSurfaceDark]  |
| `--p-border-subdued-on-surface-inverse` | ![][borderSubduedOnSurfaceDark]  | ![][borderSubduedOnSurfaceLight] |
| `--p-border-subdued-on-surface-light`   | ![][borderSubduedOnSurfaceLight] | ![][borderSubduedOnSurfaceLight] |
| `--p-border-subdued-on-surface-dark`    | ![][borderSubduedOnSurfaceDark]  | ![][borderSubduedOnSurfaceDark]  |

[borderSubduedOnSurfaceLight]: https://www.gifpng.com/64x32/d0d6dc/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[borderSubduedOnSurfaceDark]: https://www.gifpng.com/64x32/232629/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `iconOnSurface`

For use as the fill color of neutral icons.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-icon-on-surface`         | ![][iconOnSurfaceLight] | ![][iconOnSurfaceDark]  |
| `--p-icon-on-surface-inverse` | ![][iconOnSurfaceDark]  | ![][iconOnSurfaceLight] |
| `--p-icon-on-surface-light`   | ![][iconOnSurfaceLight] | ![][iconOnSurfaceLight] |
| `--p-icon-on-surface-dark`    | ![][iconOnSurfaceDark]  | ![][iconOnSurfaceDark]  |

[iconOnSurfaceLight]: https://www.gifpng.com/64x32/42474c/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[iconOnSurfaceDark]: https://www.gifpng.com/64x32/f9f9fa/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `iconDisabledOnSurface`

For use as the fill color of disabled neutral icons.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-icon-disabled-on-surface`         | ![][iconDisabledOnSurfaceLight] | ![][iconDisabledOnSurfaceDark]  |
| `--p-icon-disabled-on-surface-inverse` | ![][iconDisabledOnSurfaceDark]  | ![][iconDisabledOnSurfaceLight] |
| `--p-icon-disabled-on-surface-light`   | ![][iconDisabledOnSurfaceLight] | ![][iconDisabledOnSurfaceLight] |
| `--p-icon-disabled-on-surface-dark`    | ![][iconDisabledOnSurfaceDark]  | ![][iconDisabledOnSurfaceDark]  |

[iconDisabledOnSurfaceLight]: https://www.gifpng.com/64x32/9ba6b0/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[iconDisabledOnSurfaceDark]: https://www.gifpng.com/64x32/b1bac4/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `iconSubduedOnSurface`

For use as the fill color of subdued neutral icons.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-icon-subdued-on-surface`         | ![][iconSubduedOnSurfaceLight] | ![][iconSubduedOnSurfaceDark]  |
| `--p-icon-subdued-on-surface-inverse` | ![][iconSubduedOnSurfaceDark]  | ![][iconSubduedOnSurfaceLight] |
| `--p-icon-subdued-on-surface-light`   | ![][iconSubduedOnSurfaceLight] | ![][iconSubduedOnSurfaceLight] |
| `--p-icon-subdued-on-surface-dark`    | ![][iconSubduedOnSurfaceDark]  | ![][iconSubduedOnSurfaceDark]  |

[iconSubduedOnSurfaceLight]: https://www.gifpng.com/64x32/87919b/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[iconSubduedOnSurfaceDark]: https://www.gifpng.com/64x32/8c96a1/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `textOnSurface`

For use as a neutral text color.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-text-on-surface`         | ![][textOnSurfaceLight] | ![][textOnSurfaceDark]  |
| `--p-text-on-surface-inverse` | ![][textOnSurfaceDark]  | ![][textOnSurfaceLight] |
| `--p-text-on-surface-light`   | ![][textOnSurfaceLight] | ![][textOnSurfaceLight] |
| `--p-text-on-surface-dark`    | ![][textOnSurfaceDark]  | ![][textOnSurfaceDark]  |

[textOnSurfaceLight]: https://www.gifpng.com/64x32/1e2124/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[textOnSurfaceDark]: https://www.gifpng.com/64x32/ffffff/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `textDisabledOnSurface`

For use as a disabled neutral text color.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-text-disabled-on-surface`         | ![][textDisabledOnSurfaceLight] | ![][textDisabledOnSurfaceDark]  |
| `--p-text-disabled-on-surface-inverse` | ![][textDisabledOnSurfaceDark]  | ![][textDisabledOnSurfaceLight] |
| `--p-text-disabled-on-surface-light`   | ![][textDisabledOnSurfaceLight] | ![][textDisabledOnSurfaceLight] |
| `--p-text-disabled-on-surface-dark`    | ![][textDisabledOnSurfaceDark]  | ![][textDisabledOnSurfaceDark]  |

[textDisabledOnSurfaceLight]: https://www.gifpng.com/64x32/8a949e/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[textDisabledOnSurfaceDark]: https://www.gifpng.com/64x32/6f7880/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `textSubduedOnSurface`

For use as a subdued neutral text color.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-text-subdued-on-surface`         | ![][textSubduedOnSurfaceLight] | ![][textSubduedOnSurfaceDark]  |
| `--p-text-subdued-on-surface-inverse` | ![][textSubduedOnSurfaceDark]  | ![][textSubduedOnSurfaceLight] |
| `--p-text-subdued-on-surface-light`   | ![][textSubduedOnSurfaceLight] | ![][textSubduedOnSurfaceLight] |
| `--p-text-subdued-on-surface-dark`    | ![][textSubduedOnSurfaceDark]  | ![][textSubduedOnSurfaceDark]  |

[textSubduedOnSurfaceLight]: https://www.gifpng.com/64x32/53595f/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[textSubduedOnSurfaceDark]: https://www.gifpng.com/64x32/8c96a1/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

## `interactive`

GET DESC FROM TYPE

### `interactive`

While use directly in our components is discouraged, the base variant is unmodified from the original role input color.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-interactive`         | ![][interactiveLight] | ![][interactiveDark]  |


[interactiveLight]: https://www.gifpng.com/64x32/0870d9/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[interactiveDark]: https://www.gifpng.com/64x32/0870d9/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `interactiveAction`

Used for links and plain buttons.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-interactive-action`         | ![][interactiveActionLight] | ![][interactiveActionDark]  |
| `--p-interactive-action-inverse` | ![][interactiveActionDark]  | ![][interactiveActionLight] |
| `--p-interactive-action-light`   | ![][interactiveActionLight] | ![][interactiveActionLight] |
| `--p-interactive-action-dark`    | ![][interactiveActionDark]  | ![][interactiveActionDark]  |

[interactiveActionLight]: https://www.gifpng.com/64x32/0769ca/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[interactiveActionDark]: https://www.gifpng.com/64x32/679cfe/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `interactiveActionDisabled`

Used for disabled links and plain buttons.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-interactive-action-disabled`         | ![][interactiveActionDisabledLight] | ![][interactiveActionDisabledDark]  |
| `--p-interactive-action-disabled-inverse` | ![][interactiveActionDisabledDark]  | ![][interactiveActionDisabledLight] |
| `--p-interactive-action-disabled-light`   | ![][interactiveActionDisabledLight] | ![][interactiveActionDisabledLight] |
| `--p-interactive-action-disabled-dark`    | ![][interactiveActionDisabledDark]  | ![][interactiveActionDisabledDark]  |

[interactiveActionDisabledLight]: https://www.gifpng.com/64x32/348cfe/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[interactiveActionDisabledDark]: https://www.gifpng.com/64x32/0663c1/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `interactiveActionHovered`

Used for hovered links and plain buttons.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-interactive-action-hovered`         | ![][interactiveActionHoveredLight] | ![][interactiveActionHoveredDark]  |
| `--p-interactive-action-hovered-inverse` | ![][interactiveActionHoveredDark]  | ![][interactiveActionHoveredLight] |
| `--p-interactive-action-hovered-light`   | ![][interactiveActionHoveredLight] | ![][interactiveActionHoveredLight] |
| `--p-interactive-action-hovered-dark`    | ![][interactiveActionHoveredDark]  | ![][interactiveActionHoveredDark]  |

[interactiveActionHoveredLight]: https://www.gifpng.com/64x32/0557a8/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[interactiveActionHoveredDark]: https://www.gifpng.com/64x32/81a8fe/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `interactiveActionSubdued`

Used for subdued links and plain buttons.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-interactive-action-subdued`         | ![][interactiveActionSubduedLight] | ![][interactiveActionSubduedDark]  |
| `--p-interactive-action-subdued-inverse` | ![][interactiveActionSubduedDark]  | ![][interactiveActionSubduedLight] |
| `--p-interactive-action-subdued-light`   | ![][interactiveActionSubduedLight] | ![][interactiveActionSubduedLight] |
| `--p-interactive-action-subdued-dark`    | ![][interactiveActionSubduedDark]  | ![][interactiveActionSubduedDark]  |

[interactiveActionSubduedLight]: https://www.gifpng.com/64x32/0878e7/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[interactiveActionSubduedDark]: https://www.gifpng.com/64x32/0873dd/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `interactiveActionPressed`

Used for pressed links and plain buttons.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-interactive-action-pressed`         | ![][interactiveActionPressedLight] | ![][interactiveActionPressedDark]  |
| `--p-interactive-action-pressed-inverse` | ![][interactiveActionPressedDark]  | ![][interactiveActionPressedLight] |
| `--p-interactive-action-pressed-light`   | ![][interactiveActionPressedLight] | ![][interactiveActionPressedLight] |
| `--p-interactive-action-pressed-dark`    | ![][interactiveActionPressedDark]  | ![][interactiveActionPressedDark]  |

[interactiveActionPressedLight]: https://www.gifpng.com/64x32/034891/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[interactiveActionPressedDark]: https://www.gifpng.com/64x32/9ab8fe/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `interactiveFocus`

For use in the focus ring on interactive elements.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-interactive-focus`         | ![][interactiveFocusLight] | ![][interactiveFocusDark]  |
| `--p-interactive-focus-inverse` | ![][interactiveFocusDark]  | ![][interactiveFocusLight] |
| `--p-interactive-focus-light`   | ![][interactiveFocusLight] | ![][interactiveFocusLight] |
| `--p-interactive-focus-dark`    | ![][interactiveFocusDark]  | ![][interactiveFocusDark]  |

[interactiveFocusLight]: https://www.gifpng.com/64x32/348cfe/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[interactiveFocusDark]: https://www.gifpng.com/64x32/0663c1/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `interactiveSelected`

For use as a surface color in selected interactive elements, in components such as option list and resource list.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-interactive-selected`         | ![][interactiveSelectedLight] | ![][interactiveSelectedDark]  |
| `--p-interactive-selected-inverse` | ![][interactiveSelectedDark]  | ![][interactiveSelectedLight] |
| `--p-interactive-selected-light`   | ![][interactiveSelectedLight] | ![][interactiveSelectedLight] |
| `--p-interactive-selected-dark`    | ![][interactiveSelectedDark]  | ![][interactiveSelectedDark]  |

[interactiveSelectedLight]: https://www.gifpng.com/64x32/f0f3ff/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[interactiveSelectedDark]: https://www.gifpng.com/64x32/000e24/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `interactiveSelectedHovered`

For use as a surface color in selected interactive elements that are hovered, in components such as option list and resource list.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-interactive-selected-hovered`         | ![][interactiveSelectedHoveredLight] | ![][interactiveSelectedHoveredDark]  |
| `--p-interactive-selected-hovered-inverse` | ![][interactiveSelectedHoveredDark]  | ![][interactiveSelectedHoveredLight] |
| `--p-interactive-selected-hovered-light`   | ![][interactiveSelectedHoveredLight] | ![][interactiveSelectedHoveredLight] |
| `--p-interactive-selected-hovered-dark`    | ![][interactiveSelectedHoveredDark]  | ![][interactiveSelectedHoveredDark]  |

[interactiveSelectedHoveredLight]: https://www.gifpng.com/64x32/d6e0ff/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[interactiveSelectedHoveredDark]: https://www.gifpng.com/64x32/011d41/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `interactiveSelectedPressed`

For use as a surface color in selected interactive elements that are pressed, in components such as option list and resource list.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-interactive-selected-pressed`         | ![][interactiveSelectedPressedLight] | ![][interactiveSelectedPressedDark]  |
| `--p-interactive-selected-pressed-inverse` | ![][interactiveSelectedPressedDark]  | ![][interactiveSelectedPressedLight] |
| `--p-interactive-selected-pressed-light`   | ![][interactiveSelectedPressedLight] | ![][interactiveSelectedPressedLight] |
| `--p-interactive-selected-pressed-dark`    | ![][interactiveSelectedPressedDark]  | ![][interactiveSelectedPressedDark]  |

[interactiveSelectedPressedLight]: https://www.gifpng.com/64x32/b8cbff/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[interactiveSelectedPressedDark]: https://www.gifpng.com/64x32/012b5b/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

## `neutral`

GET DESC FROM TYPE

### `neutral`

While use directly in our components is discouraged, the base variant is unmodified from the original role input color.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-neutral`         | ![][neutralLight] | ![][neutralDark]  |


[neutralLight]: https://www.gifpng.com/64x32/eaeaeb/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[neutralDark]: https://www.gifpng.com/64x32/eaeaeb/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `neutralAction`

Used for secondary buttons and tertiary buttons, as well as in form elements as a background color and pontentially other neutral surfaces.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-neutral-action`         | ![][neutralActionLight] | ![][neutralActionDark]  |
| `--p-neutral-action-inverse` | ![][neutralActionDark]  | ![][neutralActionLight] |
| `--p-neutral-action-light`   | ![][neutralActionLight] | ![][neutralActionLight] |
| `--p-neutral-action-dark`    | ![][neutralActionDark]  | ![][neutralActionDark]  |

[neutralActionLight]: https://www.gifpng.com/64x32/eaeaeb/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[neutralActionDark]: https://www.gifpng.com/64x32/35353b/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `neutralActionDisabled`

Used as a disabled state for secondary buttons

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-neutral-action-disabled`         | ![][neutralActionDisabledLight] | ![][neutralActionDisabledDark]  |
| `--p-neutral-action-disabled-inverse` | ![][neutralActionDisabledDark]  | ![][neutralActionDisabledLight] |
| `--p-neutral-action-disabled-light`   | ![][neutralActionDisabledLight] | ![][neutralActionDisabledLight] |
| `--p-neutral-action-disabled-dark`    | ![][neutralActionDisabledDark]  | ![][neutralActionDisabledDark]  |

[neutralActionDisabledLight]: https://www.gifpng.com/64x32/ededed/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[neutralActionDisabledDark]: https://www.gifpng.com/64x32/222226/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `neutralActionHovered`

Used as a hovered state for secondary buttons

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-neutral-action-hovered`         | ![][neutralActionHoveredLight] | ![][neutralActionHoveredDark]  |
| `--p-neutral-action-hovered-inverse` | ![][neutralActionHoveredDark]  | ![][neutralActionHoveredLight] |
| `--p-neutral-action-hovered-light`   | ![][neutralActionHoveredLight] | ![][neutralActionHoveredLight] |
| `--p-neutral-action-hovered-dark`    | ![][neutralActionHoveredDark]  | ![][neutralActionHoveredDark]  |

[neutralActionHoveredLight]: https://www.gifpng.com/64x32/e2e2e4/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[neutralActionHoveredDark]: https://www.gifpng.com/64x32/3a3a40/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `neutralActionPressed`

Used as a pressed state for secondary buttons

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-neutral-action-pressed`         | ![][neutralActionPressedLight] | ![][neutralActionPressedDark]  |
| `--p-neutral-action-pressed-inverse` | ![][neutralActionPressedDark]  | ![][neutralActionPressedLight] |
| `--p-neutral-action-pressed-light`   | ![][neutralActionPressedLight] | ![][neutralActionPressedLight] |
| `--p-neutral-action-pressed-dark`    | ![][neutralActionPressedDark]  | ![][neutralActionPressedDark]  |

[neutralActionPressedLight]: https://www.gifpng.com/64x32/dadadc/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[neutralActionPressedDark]: https://www.gifpng.com/64x32/5b5b62/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

## `primary`

GET DESC FROM TYPE

### `primary`

While use directly in our components is discouraged, the base variant is unmodified from the original role input color.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-primary`         | ![][primaryLight] | ![][primaryDark]  |


[primaryLight]: https://www.gifpng.com/64x32/008060/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[primaryDark]: https://www.gifpng.com/64x32/008060/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `primaryAction`

Used as the background color for primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-primary-action`         | ![][primaryActionLight] | ![][primaryActionDark]  |


[primaryActionLight]: https://www.gifpng.com/64x32/008060/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[primaryActionDark]: https://www.gifpng.com/64x32/008060/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `primaryActionDisabled`

Used as the background color for disabled primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-primary-action-disabled`         | ![][primaryActionDisabledLight] | ![][primaryActionDisabledDark]  |


[primaryActionDisabledLight]: https://www.gifpng.com/64x32/005741/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[primaryActionDisabledDark]: https://www.gifpng.com/64x32/005741/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `primaryActionHovered`

Used as the background color for hovered primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-primary-action-hovered`         | ![][primaryActionHoveredLight] | ![][primaryActionHoveredDark]  |
| `--p-primary-action-hovered-inverse` | ![][primaryActionHoveredDark]  | ![][primaryActionHoveredLight] |
| `--p-primary-action-hovered-light`   | ![][primaryActionHoveredLight] | ![][primaryActionHoveredLight] |
| `--p-primary-action-hovered-dark`    | ![][primaryActionHoveredDark]  | ![][primaryActionHoveredDark]  |

[primaryActionHoveredLight]: https://www.gifpng.com/64x32/007054/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[primaryActionHoveredDark]: https://www.gifpng.com/64x32/00946f/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `primaryActionPressed`

Used as the background color for pressed primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-primary-action-pressed`         | ![][primaryActionPressedLight] | ![][primaryActionPressedDark]  |
| `--p-primary-action-pressed-inverse` | ![][primaryActionPressedDark]  | ![][primaryActionPressedLight] |
| `--p-primary-action-pressed-light`   | ![][primaryActionPressedLight] | ![][primaryActionPressedLight] |
| `--p-primary-action-pressed-dark`    | ![][primaryActionPressedDark]  | ![][primaryActionPressedDark]  |

[primaryActionPressedLight]: https://www.gifpng.com/64x32/00664d/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[primaryActionPressedDark]: https://www.gifpng.com/64x32/00a37a/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `iconOnPrimary`

For use as a fill color for icons on primary actions. Not for use in icons on navigation and tabs.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-icon-on-primary`         | ![][iconOnPrimaryLight] | ![][iconOnPrimaryDark]  |


[iconOnPrimaryLight]: https://www.gifpng.com/64x32/e5fff4/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[iconOnPrimaryDark]: https://www.gifpng.com/64x32/e5fff4/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `iconSubduedOnPrimary`

For use as a fill color for icons on subdued primary actions. Not for use in icons on navigation and tabs.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-icon-subdued-on-primary`         | ![][iconSubduedOnPrimaryLight] | ![][iconSubduedOnPrimaryDark]  |


[iconSubduedOnPrimaryLight]: https://www.gifpng.com/64x32/00fac0/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[iconSubduedOnPrimaryDark]: https://www.gifpng.com/64x32/00fac0/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `iconDisabledOnPrimary`

For use as a fill color for icons on disabled primary actions. Not for use in icons on navigation and tabs.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-icon-disabled-on-primary`         | ![][iconDisabledOnPrimaryLight] | ![][iconDisabledOnPrimaryDark]  |


[iconDisabledOnPrimaryLight]: https://www.gifpng.com/64x32/00dba4/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[iconDisabledOnPrimaryDark]: https://www.gifpng.com/64x32/00dba4/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `textOnPrimary`

For use as a text color on primary actions. Not for use in text on navigation and tabs.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-text-on-primary`         | ![][textOnPrimaryLight] | ![][textOnPrimaryDark]  |


[textOnPrimaryLight]: https://www.gifpng.com/64x32/ffffff/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[textOnPrimaryDark]: https://www.gifpng.com/64x32/ffffff/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `textSubduedOnPrimary`

For use as a text color on subdued primary actions. Not for use in text on navigation and tabs.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-text-subdued-on-primary`         | ![][textSubduedOnPrimaryLight] | ![][textSubduedOnPrimaryDark]  |


[textSubduedOnPrimaryLight]: https://www.gifpng.com/64x32/33ffc5/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[textSubduedOnPrimaryDark]: https://www.gifpng.com/64x32/33ffc5/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `textDisabledOnPrimary`

For use as a text color on disabled primary actions. Not for use in text on navigation and tabs.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-text-disabled-on-primary`         | ![][textDisabledOnPrimaryLight] | ![][textDisabledOnPrimaryDark]  |


[textDisabledOnPrimaryLight]: https://www.gifpng.com/64x32/33ffc5/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[textDisabledOnPrimaryDark]: https://www.gifpng.com/64x32/33ffc5/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `primarySelected`

Used as a surface color to indicate selected interactive states in navigation and tabs.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-primary-selected`         | ![][primarySelectedLight] | ![][primarySelectedDark]  |
| `--p-primary-selected-inverse` | ![][primarySelectedDark]  | ![][primarySelectedLight] |
| `--p-primary-selected-light`   | ![][primarySelectedLight] | ![][primarySelectedLight] |
| `--p-primary-selected-dark`    | ![][primarySelectedDark]  | ![][primarySelectedDark]  |

[primarySelectedLight]: https://www.gifpng.com/64x32/e1f5ec/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[primarySelectedDark]: https://www.gifpng.com/64x32/0c1210/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `primarySelectedHovered`

Used as a surface color to indicate selected interactive states that are hovered in navigation and tabs.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-primary-selected-hovered`         | ![][primarySelectedHoveredLight] | ![][primarySelectedHoveredDark]  |
| `--p-primary-selected-hovered-inverse` | ![][primarySelectedHoveredDark]  | ![][primarySelectedHoveredLight] |
| `--p-primary-selected-hovered-light`   | ![][primarySelectedHoveredLight] | ![][primarySelectedHoveredLight] |
| `--p-primary-selected-hovered-dark`    | ![][primarySelectedHoveredDark]  | ![][primarySelectedHoveredDark]  |

[primarySelectedHoveredLight]: https://www.gifpng.com/64x32/b3d0c3/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[primarySelectedHoveredDark]: https://www.gifpng.com/64x32/272f2b/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `primarySelectedPressed`

Used as a surface color to indicate selected interactive states that are pressed in navigation and tabs.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-primary-selected-pressed`         | ![][primarySelectedPressedLight] | ![][primarySelectedPressedDark]  |
| `--p-primary-selected-pressed-inverse` | ![][primarySelectedPressedDark]  | ![][primarySelectedPressedLight] |
| `--p-primary-selected-pressed-light`   | ![][primarySelectedPressedLight] | ![][primarySelectedPressedLight] |
| `--p-primary-selected-pressed-dark`    | ![][primarySelectedPressedDark]  | ![][primarySelectedPressedDark]  |

[primarySelectedPressedLight]: https://www.gifpng.com/64x32/a3bdb1/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[primarySelectedPressedDark]: https://www.gifpng.com/64x32/363f3b/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

## `critical`

GET DESC FROM TYPE

### `critical`

While use directly in our components is discouraged, the base variant is unmodified from the original role input color.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-critical`         | ![][criticalLight] | ![][criticalDark]  |


[criticalLight]: https://www.gifpng.com/64x32/d92b0d/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[criticalDark]: https://www.gifpng.com/64x32/d92b0d/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `criticalBorder`

For use as a border on critical components such as banners, and as an outline on interactive elements in an error state.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-critical-border`         | ![][criticalBorderLight] | ![][criticalBorderDark]  |


[criticalBorderLight]: https://www.gifpng.com/64x32/e12e0e/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[criticalBorderDark]: https://www.gifpng.com/64x32/e12e0e/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `criticalBorderDisabled`

For use as a disabled border on critical components such as banners, and as an outline on interactive elements in an error state.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-critical-border-disabled`         | ![][criticalBorderDisabledLight] | ![][criticalBorderDisabledDark]  |
| `--p-critical-border-disabled-inverse` | ![][criticalBorderDisabledDark]  | ![][criticalBorderDisabledLight] |
| `--p-critical-border-disabled-light`   | ![][criticalBorderDisabledLight] | ![][criticalBorderDisabledLight] |
| `--p-critical-border-disabled-dark`    | ![][criticalBorderDisabledDark]  | ![][criticalBorderDisabledDark]  |

[criticalBorderDisabledLight]: https://www.gifpng.com/64x32/febcb9/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[criticalBorderDisabledDark]: https://www.gifpng.com/64x32/811704/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `criticalIcon`

For use as an icon fill color on top of critical elements.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-critical-icon`         | ![][criticalIconLight] | ![][criticalIconDark]  |
| `--p-critical-icon-inverse` | ![][criticalIconDark]  | ![][criticalIconLight] |
| `--p-critical-icon-light`   | ![][criticalIconLight] | ![][criticalIconLight] |
| `--p-critical-icon-dark`    | ![][criticalIconDark]  | ![][criticalIconDark]  |

[criticalIconLight]: https://www.gifpng.com/64x32/eb300f/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[criticalIconDark]: https://www.gifpng.com/64x32/d92b0d/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `criticalSurface`

For use as a surface color on critical elements including badges.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-critical-surface`         | ![][criticalSurfaceLight] | ![][criticalSurfaceDark]  |
| `--p-critical-surface-inverse` | ![][criticalSurfaceDark]  | ![][criticalSurfaceLight] |
| `--p-critical-surface-light`   | ![][criticalSurfaceLight] | ![][criticalSurfaceLight] |
| `--p-critical-surface-dark`    | ![][criticalSurfaceDark]  | ![][criticalSurfaceDark]  |

[criticalSurfaceLight]: https://www.gifpng.com/64x32/fffafa/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[criticalSurfaceDark]: https://www.gifpng.com/64x32/460701/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `criticalSurfaceSubdued`

For use as a subdued surface color on critical elements including banners.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-critical-surface-subdued`         | ![][criticalSurfaceSubduedLight] | ![][criticalSurfaceSubduedDark]  |
| `--p-critical-surface-subdued-inverse` | ![][criticalSurfaceSubduedDark]  | ![][criticalSurfaceSubduedLight] |
| `--p-critical-surface-subdued-light`   | ![][criticalSurfaceSubduedLight] | ![][criticalSurfaceSubduedLight] |
| `--p-critical-surface-subdued-dark`    | ![][criticalSurfaceSubduedDark]  | ![][criticalSurfaceSubduedDark]  |

[criticalSurfaceSubduedLight]: https://www.gifpng.com/64x32/fff6f5/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[criticalSurfaceSubduedDark]: https://www.gifpng.com/64x32/460701/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `criticalSurfaceSubduedHovered`

For use as a surface color on critical interactive elements including action list items in a hovered state.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-critical-surface-subdued-hovered`         | ![][criticalSurfaceSubduedHoveredLight] | ![][criticalSurfaceSubduedHoveredDark]  |
| `--p-critical-surface-subdued-hovered-inverse` | ![][criticalSurfaceSubduedHoveredDark]  | ![][criticalSurfaceSubduedHoveredLight] |
| `--p-critical-surface-subdued-hovered-light`   | ![][criticalSurfaceSubduedHoveredLight] | ![][criticalSurfaceSubduedHoveredLight] |
| `--p-critical-surface-subdued-hovered-dark`    | ![][criticalSurfaceSubduedHoveredDark]  | ![][criticalSurfaceSubduedHoveredDark]  |

[criticalSurfaceSubduedHoveredLight]: https://www.gifpng.com/64x32/fee7e6/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[criticalSurfaceSubduedHoveredDark]: https://www.gifpng.com/64x32/431714/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `criticalSurfaceSubduedPressed`

For use as a surface color on critical interactive elements including action list items in a pressed state.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-critical-surface-subdued-pressed`         | ![][criticalSurfaceSubduedPressedLight] | ![][criticalSurfaceSubduedPressedDark]  |
| `--p-critical-surface-subdued-pressed-inverse` | ![][criticalSurfaceSubduedPressedDark]  | ![][criticalSurfaceSubduedPressedLight] |
| `--p-critical-surface-subdued-pressed-light`   | ![][criticalSurfaceSubduedPressedLight] | ![][criticalSurfaceSubduedPressedLight] |
| `--p-critical-surface-subdued-pressed-dark`    | ![][criticalSurfaceSubduedPressedDark]  | ![][criticalSurfaceSubduedPressedDark]  |

[criticalSurfaceSubduedPressedLight]: https://www.gifpng.com/64x32/fed4d2/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[criticalSurfaceSubduedPressedDark]: https://www.gifpng.com/64x32/6d1103/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `criticalText`

For use as a text color in inert critical elements such as exception list. Not for use as a text color on banners and badges.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-critical-text`         | ![][criticalTextLight] | ![][criticalTextDark]  |
| `--p-critical-text-inverse` | ![][criticalTextDark]  | ![][criticalTextLight] |
| `--p-critical-text-light`   | ![][criticalTextLight] | ![][criticalTextLight] |
| `--p-critical-text-dark`    | ![][criticalTextDark]  | ![][criticalTextDark]  |

[criticalTextLight]: https://www.gifpng.com/64x32/b42208/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[criticalTextDark]: https://www.gifpng.com/64x32/fd5849/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `criticalAction`

For use as the background color for destructive buttons, and as the background color for error toast messages.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-critical-action`         | ![][criticalActionLight] | ![][criticalActionDark]  |
| `--p-critical-action-inverse` | ![][criticalActionDark]  | ![][criticalActionLight] |
| `--p-critical-action-light`   | ![][criticalActionLight] | ![][criticalActionLight] |
| `--p-critical-action-dark`    | ![][criticalActionDark]  | ![][criticalActionDark]  |

[criticalActionLight]: https://www.gifpng.com/64x32/d92b0d/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[criticalActionDark]: https://www.gifpng.com/64x32/cf290c/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `criticalActionDisabled`

For use as the background color for disabled destructive buttons, and as the background color for error toast messages.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-critical-action-disabled`         | ![][criticalActionDisabledLight] | ![][criticalActionDisabledDark]  |
| `--p-critical-action-disabled-inverse` | ![][criticalActionDisabledDark]  | ![][criticalActionDisabledLight] |
| `--p-critical-action-disabled-light`   | ![][criticalActionDisabledLight] | ![][criticalActionDisabledLight] |
| `--p-critical-action-disabled-dark`    | ![][criticalActionDisabledDark]  | ![][criticalActionDisabledDark]  |

[criticalActionDisabledLight]: https://www.gifpng.com/64x32/fd4f3f/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[criticalActionDisabledDark]: https://www.gifpng.com/64x32/bd250a/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `criticalActionHovered`

For use as the background color for hovered destructive buttons, and as the background color for error toast messages.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-critical-action-hovered`         | ![][criticalActionHoveredLight] | ![][criticalActionHoveredDark]  |
| `--p-critical-action-hovered-inverse` | ![][criticalActionHoveredDark]  | ![][criticalActionHoveredLight] |
| `--p-critical-action-hovered-light`   | ![][criticalActionHoveredLight] | ![][criticalActionHoveredLight] |
| `--p-critical-action-hovered-dark`    | ![][criticalActionHoveredDark]  | ![][criticalActionHoveredDark]  |

[criticalActionHoveredLight]: https://www.gifpng.com/64x32/c2260a/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[criticalActionHoveredDark]: https://www.gifpng.com/64x32/e12e0e/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `criticalActionPressed`

For use as the background color for pressed destructive buttons, and as the background color for error toast messages.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-critical-action-pressed`         | ![][criticalActionPressedLight] | ![][criticalActionPressedDark]  |
| `--p-critical-action-pressed-inverse` | ![][criticalActionPressedDark]  | ![][criticalActionPressedLight] |
| `--p-critical-action-pressed-light`   | ![][criticalActionPressedLight] | ![][criticalActionPressedLight] |
| `--p-critical-action-pressed-dark`    | ![][criticalActionPressedDark]  | ![][criticalActionPressedDark]  |

[criticalActionPressedLight]: https://www.gifpng.com/64x32/aa2008/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[criticalActionPressedDark]: https://www.gifpng.com/64x32/fd5849/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `criticalLink`

For use as a text color in destructive plain buttons, as well as a text color on destructive action list items. Not for use on critical banners and badges.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-critical-link`         | ![][criticalLinkLight] | ![][criticalLinkDark]  |
| `--p-critical-link-inverse` | ![][criticalLinkDark]  | ![][criticalLinkLight] |
| `--p-critical-link-light`   | ![][criticalLinkLight] | ![][criticalLinkLight] |
| `--p-critical-link-dark`    | ![][criticalLinkDark]  | ![][criticalLinkDark]  |

[criticalLinkLight]: https://www.gifpng.com/64x32/dd2d0e/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[criticalLinkDark]: https://www.gifpng.com/64x32/fd7068/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `criticalLinkDisabled`

For use as a text color in disabled destructive plain buttons, as well as a text color on destructive action list items. Not for use on critical banners and badges.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-critical-link-disabled`         | ![][criticalLinkDisabledLight] | ![][criticalLinkDisabledDark]  |
| `--p-critical-link-disabled-inverse` | ![][criticalLinkDisabledDark]  | ![][criticalLinkDisabledLight] |
| `--p-critical-link-disabled-light`   | ![][criticalLinkDisabledLight] | ![][criticalLinkDisabledLight] |
| `--p-critical-link-disabled-dark`    | ![][criticalLinkDisabledDark]  | ![][criticalLinkDisabledDark]  |

[criticalLinkDisabledLight]: https://www.gifpng.com/64x32/fd918b/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[criticalLinkDisabledDark]: https://www.gifpng.com/64x32/feada9/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `criticalLinkHovered`

For use as a text color in hovered destructive plain buttons, as well as a text color on destructive action list items. Not for use on critical banners and badges.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-critical-link-hovered`         | ![][criticalLinkHoveredLight] | ![][criticalLinkHoveredDark]  |
| `--p-critical-link-hovered-inverse` | ![][criticalLinkHoveredDark]  | ![][criticalLinkHoveredLight] |
| `--p-critical-link-hovered-light`   | ![][criticalLinkHoveredLight] | ![][criticalLinkHoveredLight] |
| `--p-critical-link-hovered-dark`    | ![][criticalLinkHoveredDark]  | ![][criticalLinkHoveredDark]  |

[criticalLinkHoveredLight]: https://www.gifpng.com/64x32/cf290c/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[criticalLinkHoveredDark]: https://www.gifpng.com/64x32/fd8881/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `criticalLinkPressed`

For use as a text color in pressed destructive plain buttons, as well as a text color on destructive action list items. Not for use on critical banners and badges.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-critical-link-pressed`         | ![][criticalLinkPressedLight] | ![][criticalLinkPressedDark]  |
| `--p-critical-link-pressed-inverse` | ![][criticalLinkPressedDark]  | ![][criticalLinkPressedLight] |
| `--p-critical-link-pressed-light`   | ![][criticalLinkPressedLight] | ![][criticalLinkPressedLight] |
| `--p-critical-link-pressed-dark`    | ![][criticalLinkPressedDark]  | ![][criticalLinkPressedDark]  |

[criticalLinkPressedLight]: https://www.gifpng.com/64x32/680f03/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[criticalLinkPressedDark]: https://www.gifpng.com/64x32/fd9e9b/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

## `warning`

GET DESC FROM TYPE

### `warning`

While use directly in our components is discouraged, the base variant is unmodified from the original role input color.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-warning`         | ![][warningLight] | ![][warningDark]  |


[warningLight]: https://www.gifpng.com/64x32/ffc252/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[warningDark]: https://www.gifpng.com/64x32/ffc252/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `warningBorder`

For use as a border on warning components such as banners.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-warning-border`         | ![][warningBorderLight] | ![][warningBorderDark]  |
| `--p-warning-border-inverse` | ![][warningBorderDark]  | ![][warningBorderLight] |
| `--p-warning-border-light`   | ![][warningBorderLight] | ![][warningBorderLight] |
| `--p-warning-border-dark`    | ![][warningBorderDark]  | ![][warningBorderDark]  |

[warningBorderLight]: https://www.gifpng.com/64x32/f0b400/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[warningBorderDark]: https://www.gifpng.com/64x32/997000/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `warningIcon`

For use as an icon fill color on top of warning elements.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-warning-icon`         | ![][warningIconLight] | ![][warningIconDark]  |
| `--p-warning-icon-inverse` | ![][warningIconDark]  | ![][warningIconLight] |
| `--p-warning-icon-light`   | ![][warningIconLight] | ![][warningIconLight] |
| `--p-warning-icon-dark`    | ![][warningIconDark]  | ![][warningIconDark]  |

[warningIconLight]: https://www.gifpng.com/64x32/cc9600/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[warningIconDark]: https://www.gifpng.com/64x32/664900/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `warningSurface`

For use as a surface color on warning elements including badges.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-warning-surface`         | ![][warningSurfaceLight] | ![][warningSurfaceDark]  |
| `--p-warning-surface-inverse` | ![][warningSurfaceDark]  | ![][warningSurfaceLight] |
| `--p-warning-surface-light`   | ![][warningSurfaceLight] | ![][warningSurfaceLight] |
| `--p-warning-surface-dark`    | ![][warningSurfaceDark]  | ![][warningSurfaceDark]  |

[warningSurfaceLight]: https://www.gifpng.com/64x32/ffcd75/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[warningSurfaceDark]: https://www.gifpng.com/64x32/997000/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `warningSurfaceSubdued`

For use as a subdued surface color on warning elements including banners.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-warning-surface-subdued`         | ![][warningSurfaceSubduedLight] | ![][warningSurfaceSubduedDark]  |
| `--p-warning-surface-subdued-inverse` | ![][warningSurfaceSubduedDark]  | ![][warningSurfaceSubduedLight] |
| `--p-warning-surface-subdued-light`   | ![][warningSurfaceSubduedLight] | ![][warningSurfaceSubduedLight] |
| `--p-warning-surface-subdued-dark`    | ![][warningSurfaceSubduedDark]  | ![][warningSurfaceSubduedDark]  |

[warningSurfaceSubduedLight]: https://www.gifpng.com/64x32/fffcfa/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[warningSurfaceSubduedDark]: https://www.gifpng.com/64x32/332300/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `warningText`

For use as a text color in inert critical elements such as exception list. Not for use as a text color on banners and badges.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-warning-text`         | ![][warningTextLight] | ![][warningTextDark]  |
| `--p-warning-text-inverse` | ![][warningTextDark]  | ![][warningTextLight] |
| `--p-warning-text-light`   | ![][warningTextLight] | ![][warningTextLight] |
| `--p-warning-text-dark`    | ![][warningTextDark]  | ![][warningTextDark]  |

[warningTextLight]: https://www.gifpng.com/64x32/5c4200/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[warningTextDark]: https://www.gifpng.com/64x32/dba100/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

## `highlight`

GET DESC FROM TYPE

### `highlight`

While use directly in our components is discouraged, the base variant is unmodified from the original role input color.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-highlight`         | ![][highlightLight] | ![][highlightDark]  |


[highlightLight]: https://www.gifpng.com/64x32/58d0c2/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[highlightDark]: https://www.gifpng.com/64x32/58d0c2/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `highlightBorder`

For use as a border on informational components such as banners.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-highlight-border`         | ![][highlightBorderLight] | ![][highlightBorderDark]  |


[highlightBorderLight]: https://www.gifpng.com/64x32/429e93/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[highlightBorderDark]: https://www.gifpng.com/64x32/429e93/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `highlightIcon`

For use as an icon fill color on top of informational elements.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-highlight-icon`         | ![][highlightIconLight] | ![][highlightIconDark]  |
| `--p-highlight-icon-inverse` | ![][highlightIconDark]  | ![][highlightIconLight] |
| `--p-highlight-icon-light`   | ![][highlightIconLight] | ![][highlightIconLight] |
| `--p-highlight-icon-dark`    | ![][highlightIconDark]  | ![][highlightIconDark]  |

[highlightIconLight]: https://www.gifpng.com/64x32/419b90/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[highlightIconDark]: https://www.gifpng.com/64x32/2c6d67/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `highlightSurface`

For use as a surface color on information elements including badges.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-highlight-surface`         | ![][highlightSurfaceLight] | ![][highlightSurfaceDark]  |
| `--p-highlight-surface-inverse` | ![][highlightSurfaceDark]  | ![][highlightSurfaceLight] |
| `--p-highlight-surface-light`   | ![][highlightSurfaceLight] | ![][highlightSurfaceLight] |
| `--p-highlight-surface-dark`    | ![][highlightSurfaceDark]  | ![][highlightSurfaceDark]  |

[highlightSurfaceLight]: https://www.gifpng.com/64x32/8de2d7/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[highlightSurfaceDark]: https://www.gifpng.com/64x32/00857a/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `highlightSurfaceSubdued`

For use as a surface color on information elements including banners.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-highlight-surface-subdued`         | ![][highlightSurfaceSubduedLight] | ![][highlightSurfaceSubduedDark]  |
| `--p-highlight-surface-subdued-inverse` | ![][highlightSurfaceSubduedDark]  | ![][highlightSurfaceSubduedLight] |
| `--p-highlight-surface-subdued-light`   | ![][highlightSurfaceSubduedLight] | ![][highlightSurfaceSubduedLight] |
| `--p-highlight-surface-subdued-dark`    | ![][highlightSurfaceSubduedDark]  | ![][highlightSurfaceSubduedDark]  |

[highlightSurfaceSubduedLight]: https://www.gifpng.com/64x32/f1fefc/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[highlightSurfaceSubduedDark]: https://www.gifpng.com/64x32/123631/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `highlightext`

For use as a text color in inert informational elements. Not for use as a text color on banners and badges.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-highlightext`         | ![][highlightextLight] | ![][highlightextDark]  |
| `--p-highlightext-inverse` | ![][highlightextDark]  | ![][highlightextLight] |
| `--p-highlightext-light`   | ![][highlightextLight] | ![][highlightextLight] |
| `--p-highlightext-dark`    | ![][highlightextDark]  | ![][highlightextDark]  |

[highlightextLight]: https://www.gifpng.com/64x32/e7fefa/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[highlightextDark]: https://www.gifpng.com/64x32/010908/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

## `success`

GET DESC FROM TYPE

### `success`

While use directly in our components is discouraged, the base variant is unmodified from the original role input color.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-success`         | ![][successLight] | ![][successDark]  |


[successLight]: https://www.gifpng.com/64x32/008060/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[successDark]: https://www.gifpng.com/64x32/008060/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `successBorder`

For use as a border on success components such as banners.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-success-border`         | ![][successBorderLight] | ![][successBorderDark]  |


[successBorderLight]: https://www.gifpng.com/64x32/008563/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[successBorderDark]: https://www.gifpng.com/64x32/008563/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `successIcon`

For use as an icon fill color on top of success elements.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-success-icon`         | ![][successIconLight] | ![][successIconDark]  |
| `--p-success-icon-inverse` | ![][successIconDark]  | ![][successIconLight] |
| `--p-success-icon-light`   | ![][successIconLight] | ![][successIconLight] |
| `--p-success-icon-dark`    | ![][successIconDark]  | ![][successIconDark]  |

[successIconLight]: https://www.gifpng.com/64x32/004231/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[successIconDark]: https://www.gifpng.com/64x32/005c45/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `successSurface`

For use as a surface color on success elements including badges.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-success-surface`         | ![][successSurfaceLight] | ![][successSurfaceDark]  |
| `--p-success-surface-inverse` | ![][successSurfaceDark]  | ![][successSurfaceLight] |
| `--p-success-surface-light`   | ![][successSurfaceLight] | ![][successSurfaceLight] |
| `--p-success-surface-dark`    | ![][successSurfaceDark]  | ![][successSurfaceDark]  |

[successSurfaceLight]: https://www.gifpng.com/64x32/8ae5c2/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[successSurfaceDark]: https://www.gifpng.com/64x32/006b4f/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `successSurfaceSubdued`

For use as a surface color on information elements including banners.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-success-surface-subdued`         | ![][successSurfaceSubduedLight] | ![][successSurfaceSubduedDark]  |
| `--p-success-surface-subdued-inverse` | ![][successSurfaceSubduedDark]  | ![][successSurfaceSubduedLight] |
| `--p-success-surface-subdued-light`   | ![][successSurfaceSubduedLight] | ![][successSurfaceSubduedLight] |
| `--p-success-surface-subdued-dark`    | ![][successSurfaceSubduedDark]  | ![][successSurfaceSubduedDark]  |

[successSurfaceSubduedLight]: https://www.gifpng.com/64x32/f6fefa/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[successSurfaceSubduedDark]: https://www.gifpng.com/64x32/1c352c/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

### `successText`

For use as a text color in inert success elements. Not for use as a text color on banners and badges.

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| `--p-success-text`         | ![][successTextLight] | ![][successTextDark]  |
| `--p-success-text-inverse` | ![][successTextDark]  | ![][successTextLight] |
| `--p-success-text-light`   | ![][successTextLight] | ![][successTextLight] |
| `--p-success-text-dark`    | ![][successTextDark]  | ![][successTextDark]  |

[successTextLight]: https://www.gifpng.com/64x32/006b4f/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[successTextDark]: https://www.gifpng.com/64x32/00a37a/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

