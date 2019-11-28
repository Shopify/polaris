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
- [`decorative`](#decorative)
  - [`decorativeOneSurface`](#decorativeOneSurface)
  - [`decorativeOneText`](#decorativeOneText)
  - [`decorativeTwoSurface`](#decorativeTwoSurface)
  - [`decorativeTwoText`](#decorativeTwoText)
  - [`decorativeThreeSurface`](#decorativeThreeSurface)
  - [`decorativeThreeText`](#decorativeThreeText)
  - [`decorativeFourSurface`](#decorativeFourSurface)
  - [`decorativeFourText`](#decorativeFourText)
  - [`decorativeFiveSurface`](#decorativeFiveSurface)
  - [`decorativeFiveText`](#decorativeFiveText)

## `surface`

The surface role is used for the backgrounds of the UI. In light mode, surface colors are nearly white, while in dark mode, surface colors are nearly black. The color passed to the surface role impacts the rest of the color roles and their variants, adjusting them for light or dark contexts.

### `surface`

[Back to top](#Table-of-contents)

While use directly in our components is discouraged, the base variant is unmodified from the original role input color.

| CSS variable          | Light mode        | Dark mode         |
| --------------------- | ----------------- | ----------------- |
| `--p-surface`         | ![][surfacelight] | ![][surfacedark]  |
| `--p-surface-inverse` | ![][surfacedark]  | ![][surfacelight] |
| `--p-surface-light`   | ![][surfacelight] | ![][surfacelight] |
| `--p-surface-dark`    | ![][surfacedark]  | ![][surfacedark]  |

[surfacelight]: https://www.gifpng.com/64x32/fafafa/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[surfacedark]: https://www.gifpng.com/64x32/111213/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `surfaceBackground`

[Back to top](#Table-of-contents)

For use in the background of our UIs as a background color, in components such as Page and Frame backgrounds.

| CSS variable                     | Light mode                  | Dark mode                   |
| -------------------------------- | --------------------------- | --------------------------- |
| `--p-surface-background`         | ![][surfacebackgroundlight] | ![][surfacebackgrounddark]  |
| `--p-surface-background-inverse` | ![][surfacebackgrounddark]  | ![][surfacebackgroundlight] |
| `--p-surface-background-light`   | ![][surfacebackgroundlight] | ![][surfacebackgroundlight] |
| `--p-surface-background-dark`    | ![][surfacebackgrounddark]  | ![][surfacebackgrounddark]  |

[surfacebackgroundlight]: https://www.gifpng.com/64x32/fafafa/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[surfacebackgrounddark]: https://www.gifpng.com/64x32/0c0d0e/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `surfaceForeground`

[Back to top](#Table-of-contents)

For use in the foreground of our UIs as a background color, in components such as Card, Modal, and Popover.

| CSS variable                     | Light mode                  | Dark mode                   |
| -------------------------------- | --------------------------- | --------------------------- |
| `--p-surface-foreground`         | ![][surfaceforegroundlight] | ![][surfaceforegrounddark]  |
| `--p-surface-foreground-inverse` | ![][surfaceforegrounddark]  | ![][surfaceforegroundlight] |
| `--p-surface-foreground-light`   | ![][surfaceforegroundlight] | ![][surfaceforegroundlight] |
| `--p-surface-foreground-dark`    | ![][surfaceforegrounddark]  | ![][surfaceforegrounddark]  |

[surfaceforegroundlight]: https://www.gifpng.com/64x32/ffffff/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[surfaceforegrounddark]: https://www.gifpng.com/64x32/181a1b/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `surfaceForegroundSubdued`

[Back to top](#Table-of-contents)

For use in the foreground of our UIs as a subdued background color, in components such as Card, Modal, and Popover.

| CSS variable                             | Light mode                         | Dark mode                          |
| ---------------------------------------- | ---------------------------------- | ---------------------------------- |
| `--p-surface-foreground-subdued`         | ![][surfaceforegroundsubduedlight] | ![][surfaceforegroundsubdueddark]  |
| `--p-surface-foreground-subdued-inverse` | ![][surfaceforegroundsubdueddark]  | ![][surfaceforegroundsubduedlight] |
| `--p-surface-foreground-subdued-light`   | ![][surfaceforegroundsubduedlight] | ![][surfaceforegroundsubduedlight] |
| `--p-surface-foreground-subdued-dark`    | ![][surfaceforegroundsubdueddark]  | ![][surfaceforegroundsubdueddark]  |

[surfaceforegroundsubduedlight]: https://www.gifpng.com/64x32/f2f2f2/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[surfaceforegroundsubdueddark]: https://www.gifpng.com/64x32/1b1d1d/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `surfaceHovered`

[Back to top](#Table-of-contents)

For use as a surface color on interactive elements such as resource list items and action list items when in a hovered state.

| CSS variable                  | Light mode               | Dark mode                |
| ----------------------------- | ------------------------ | ------------------------ |
| `--p-surface-hovered`         | ![][surfacehoveredlight] | ![][surfacehovereddark]  |
| `--p-surface-hovered-inverse` | ![][surfacehovereddark]  | ![][surfacehoveredlight] |
| `--p-surface-hovered-light`   | ![][surfacehoveredlight] | ![][surfacehoveredlight] |
| `--p-surface-hovered-dark`    | ![][surfacehovereddark]  | ![][surfacehovereddark]  |

[surfacehoveredlight]: https://www.gifpng.com/64x32/f2f2f2/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[surfacehovereddark]: https://www.gifpng.com/64x32/2f3032/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `surfacePressed`

[Back to top](#Table-of-contents)

For use as a surface color on interactive elements such as resource list items and action list items when in a pressed state.

| CSS variable                  | Light mode               | Dark mode                |
| ----------------------------- | ------------------------ | ------------------------ |
| `--p-surface-pressed`         | ![][surfacepressedlight] | ![][surfacepresseddark]  |
| `--p-surface-pressed-inverse` | ![][surfacepresseddark]  | ![][surfacepressedlight] |
| `--p-surface-pressed-light`   | ![][surfacepressedlight] | ![][surfacepressedlight] |
| `--p-surface-pressed-dark`    | ![][surfacepresseddark]  | ![][surfacepresseddark]  |

[surfacepressedlight]: https://www.gifpng.com/64x32/e3e3e3/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[surfacepresseddark]: https://www.gifpng.com/64x32/3d3f42/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `backdrop`

[Back to top](#Table-of-contents)

For use as the background color of the backdrop component for navigation and modal.

| CSS variable   | Light mode         | Dark mode         |
| -------------- | ------------------ | ----------------- |
| `--p-backdrop` | ![][backdroplight] | ![][backdropdark] |

[backdroplight]: https://www.gifpng.com/64x32/000000/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[backdropdark]: https://www.gifpng.com/64x32/000000/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `shadowFromAmbientLight`

[Back to top](#Table-of-contents)

For use in building shadows for popovers, cards, and modals.

| CSS variable                    | Light mode                       | Dark mode                       |
| ------------------------------- | -------------------------------- | ------------------------------- |
| `--p-shadow-from-ambient-light` | ![][shadowfromambientlightlight] | ![][shadowfromambientlightdark] |

[shadowfromambientlightlight]: https://www.gifpng.com/64x32/161717/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[shadowfromambientlightdark]: https://www.gifpng.com/64x32/161717/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `shadowFromDirectLight`

[Back to top](#Table-of-contents)

For use in building shadows for popovers, cards, and modals.

| CSS variable                   | Light mode                      | Dark mode                      |
| ------------------------------ | ------------------------------- | ------------------------------ |
| `--p-shadow-from-direct-light` | ![][shadowfromdirectlightlight] | ![][shadowfromdirectlightdark] |

[shadowfromdirectlightlight]: https://www.gifpng.com/64x32/000000/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[shadowfromdirectlightdark]: https://www.gifpng.com/64x32/000000/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

## `onSurface`

The onSurface role is made up of elements which appear on top of a surface, including borders, neutral icons, and text. When a light surface is provided, onSurface values will be dark. When a dark surface is provided, onSurface values will be light.

### `onSurface`

[Back to top](#Table-of-contents)

While use directly in our components is discouraged, the base variant is unmodified from the original role input color.

| CSS variable     | Light mode          | Dark mode          |
| ---------------- | ------------------- | ------------------ |
| `--p-on-surface` | ![][onsurfacelight] | ![][onsurfacedark] |

[onsurfacelight]: https://www.gifpng.com/64x32/1e2124/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[onsurfacedark]: https://www.gifpng.com/64x32/1e2124/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `borderOnSurface`

[Back to top](#Table-of-contents)

For use as a border (border or interactive outline).

| CSS variable                    | Light mode                | Dark mode                 |
| ------------------------------- | ------------------------- | ------------------------- |
| `--p-border-on-surface`         | ![][borderonsurfacelight] | ![][borderonsurfacedark]  |
| `--p-border-on-surface-inverse` | ![][borderonsurfacedark]  | ![][borderonsurfacelight] |
| `--p-border-on-surface-light`   | ![][borderonsurfacelight] | ![][borderonsurfacelight] |
| `--p-border-on-surface-dark`    | ![][borderonsurfacedark]  | ![][borderonsurfacedark]  |

[borderonsurfacelight]: https://www.gifpng.com/64x32/b1bac4/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[borderonsurfacedark]: https://www.gifpng.com/64x32/4e545a/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `borderDisabledOnSurface`

[Back to top](#Table-of-contents)

For use as a an interactive outline on disabled elements.

| CSS variable                             | Light mode                        | Dark mode                         |
| ---------------------------------------- | --------------------------------- | --------------------------------- |
| `--p-border-disabled-on-surface`         | ![][borderdisabledonsurfacelight] | ![][borderdisabledonsurfacedark]  |
| `--p-border-disabled-on-surface-inverse` | ![][borderdisabledonsurfacedark]  | ![][borderdisabledonsurfacelight] |
| `--p-border-disabled-on-surface-light`   | ![][borderdisabledonsurfacelight] | ![][borderdisabledonsurfacelight] |
| `--p-border-disabled-on-surface-dark`    | ![][borderdisabledonsurfacedark]  | ![][borderdisabledonsurfacedark]  |

[borderdisabledonsurfacelight]: https://www.gifpng.com/64x32/f0f2f4/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[borderdisabledonsurfacedark]: https://www.gifpng.com/64x32/a2aeb9/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `borderSubduedOnSurface`

[Back to top](#Table-of-contents)

For use as a subdued border (border or interactive outline).

| CSS variable                            | Light mode                       | Dark mode                        |
| --------------------------------------- | -------------------------------- | -------------------------------- |
| `--p-border-subdued-on-surface`         | ![][bordersubduedonsurfacelight] | ![][bordersubduedonsurfacedark]  |
| `--p-border-subdued-on-surface-inverse` | ![][bordersubduedonsurfacedark]  | ![][bordersubduedonsurfacelight] |
| `--p-border-subdued-on-surface-light`   | ![][bordersubduedonsurfacelight] | ![][bordersubduedonsurfacelight] |
| `--p-border-subdued-on-surface-dark`    | ![][bordersubduedonsurfacedark]  | ![][bordersubduedonsurfacedark]  |

[bordersubduedonsurfacelight]: https://www.gifpng.com/64x32/d0d6dc/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[bordersubduedonsurfacedark]: https://www.gifpng.com/64x32/232629/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `iconOnSurface`

[Back to top](#Table-of-contents)

For use as the fill color of neutral icons.

| CSS variable                  | Light mode              | Dark mode               |
| ----------------------------- | ----------------------- | ----------------------- |
| `--p-icon-on-surface`         | ![][icononsurfacelight] | ![][icononsurfacedark]  |
| `--p-icon-on-surface-inverse` | ![][icononsurfacedark]  | ![][icononsurfacelight] |
| `--p-icon-on-surface-light`   | ![][icononsurfacelight] | ![][icononsurfacelight] |
| `--p-icon-on-surface-dark`    | ![][icononsurfacedark]  | ![][icononsurfacedark]  |

[icononsurfacelight]: https://www.gifpng.com/64x32/42474c/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[icononsurfacedark]: https://www.gifpng.com/64x32/f9f9fa/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `iconDisabledOnSurface`

[Back to top](#Table-of-contents)

For use as the fill color of disabled neutral icons.

| CSS variable                           | Light mode                      | Dark mode                       |
| -------------------------------------- | ------------------------------- | ------------------------------- |
| `--p-icon-disabled-on-surface`         | ![][icondisabledonsurfacelight] | ![][icondisabledonsurfacedark]  |
| `--p-icon-disabled-on-surface-inverse` | ![][icondisabledonsurfacedark]  | ![][icondisabledonsurfacelight] |
| `--p-icon-disabled-on-surface-light`   | ![][icondisabledonsurfacelight] | ![][icondisabledonsurfacelight] |
| `--p-icon-disabled-on-surface-dark`    | ![][icondisabledonsurfacedark]  | ![][icondisabledonsurfacedark]  |

[icondisabledonsurfacelight]: https://www.gifpng.com/64x32/9ba6b0/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[icondisabledonsurfacedark]: https://www.gifpng.com/64x32/b1bac4/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `iconSubduedOnSurface`

[Back to top](#Table-of-contents)

For use as the fill color of subdued neutral icons.

| CSS variable                          | Light mode                     | Dark mode                      |
| ------------------------------------- | ------------------------------ | ------------------------------ |
| `--p-icon-subdued-on-surface`         | ![][iconsubduedonsurfacelight] | ![][iconsubduedonsurfacedark]  |
| `--p-icon-subdued-on-surface-inverse` | ![][iconsubduedonsurfacedark]  | ![][iconsubduedonsurfacelight] |
| `--p-icon-subdued-on-surface-light`   | ![][iconsubduedonsurfacelight] | ![][iconsubduedonsurfacelight] |
| `--p-icon-subdued-on-surface-dark`    | ![][iconsubduedonsurfacedark]  | ![][iconsubduedonsurfacedark]  |

[iconsubduedonsurfacelight]: https://www.gifpng.com/64x32/87919b/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[iconsubduedonsurfacedark]: https://www.gifpng.com/64x32/8c96a1/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `textOnSurface`

[Back to top](#Table-of-contents)

For use as a neutral text color.

| CSS variable                  | Light mode              | Dark mode               |
| ----------------------------- | ----------------------- | ----------------------- |
| `--p-text-on-surface`         | ![][textonsurfacelight] | ![][textonsurfacedark]  |
| `--p-text-on-surface-inverse` | ![][textonsurfacedark]  | ![][textonsurfacelight] |
| `--p-text-on-surface-light`   | ![][textonsurfacelight] | ![][textonsurfacelight] |
| `--p-text-on-surface-dark`    | ![][textonsurfacedark]  | ![][textonsurfacedark]  |

[textonsurfacelight]: https://www.gifpng.com/64x32/1e2124/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[textonsurfacedark]: https://www.gifpng.com/64x32/ffffff/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `textDisabledOnSurface`

[Back to top](#Table-of-contents)

For use as a disabled neutral text color.

| CSS variable                           | Light mode                      | Dark mode                       |
| -------------------------------------- | ------------------------------- | ------------------------------- |
| `--p-text-disabled-on-surface`         | ![][textdisabledonsurfacelight] | ![][textdisabledonsurfacedark]  |
| `--p-text-disabled-on-surface-inverse` | ![][textdisabledonsurfacedark]  | ![][textdisabledonsurfacelight] |
| `--p-text-disabled-on-surface-light`   | ![][textdisabledonsurfacelight] | ![][textdisabledonsurfacelight] |
| `--p-text-disabled-on-surface-dark`    | ![][textdisabledonsurfacedark]  | ![][textdisabledonsurfacedark]  |

[textdisabledonsurfacelight]: https://www.gifpng.com/64x32/8a949e/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[textdisabledonsurfacedark]: https://www.gifpng.com/64x32/6f7880/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `textSubduedOnSurface`

[Back to top](#Table-of-contents)

For use as a subdued neutral text color.

| CSS variable                          | Light mode                     | Dark mode                      |
| ------------------------------------- | ------------------------------ | ------------------------------ |
| `--p-text-subdued-on-surface`         | ![][textsubduedonsurfacelight] | ![][textsubduedonsurfacedark]  |
| `--p-text-subdued-on-surface-inverse` | ![][textsubduedonsurfacedark]  | ![][textsubduedonsurfacelight] |
| `--p-text-subdued-on-surface-light`   | ![][textsubduedonsurfacelight] | ![][textsubduedonsurfacelight] |
| `--p-text-subdued-on-surface-dark`    | ![][textsubduedonsurfacedark]  | ![][textsubduedonsurfacedark]  |

[textsubduedonsurfacelight]: https://www.gifpng.com/64x32/53595f/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[textsubduedonsurfacedark]: https://www.gifpng.com/64x32/8c96a1/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

## `interactive`

The interactive role is used to express interactivity in components. It is used in links, as an indicator of focus, and as an indicator of selected interactive states.

### `interactive`

[Back to top](#Table-of-contents)

While use directly in our components is discouraged, the base variant is unmodified from the original role input color.

| CSS variable      | Light mode            | Dark mode            |
| ----------------- | --------------------- | -------------------- |
| `--p-interactive` | ![][interactivelight] | ![][interactivedark] |

[interactivelight]: https://www.gifpng.com/64x32/0870d9/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[interactivedark]: https://www.gifpng.com/64x32/0870d9/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `interactiveAction`

[Back to top](#Table-of-contents)

Used for links and plain buttons.

| CSS variable                     | Light mode                  | Dark mode                   |
| -------------------------------- | --------------------------- | --------------------------- |
| `--p-interactive-action`         | ![][interactiveactionlight] | ![][interactiveactiondark]  |
| `--p-interactive-action-inverse` | ![][interactiveactiondark]  | ![][interactiveactionlight] |
| `--p-interactive-action-light`   | ![][interactiveactionlight] | ![][interactiveactionlight] |
| `--p-interactive-action-dark`    | ![][interactiveactiondark]  | ![][interactiveactiondark]  |

[interactiveactionlight]: https://www.gifpng.com/64x32/0769ca/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[interactiveactiondark]: https://www.gifpng.com/64x32/679cfe/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `interactiveActionDisabled`

[Back to top](#Table-of-contents)

Used for disabled links and plain buttons.

| CSS variable                              | Light mode                          | Dark mode                           |
| ----------------------------------------- | ----------------------------------- | ----------------------------------- |
| `--p-interactive-action-disabled`         | ![][interactiveactiondisabledlight] | ![][interactiveactiondisableddark]  |
| `--p-interactive-action-disabled-inverse` | ![][interactiveactiondisableddark]  | ![][interactiveactiondisabledlight] |
| `--p-interactive-action-disabled-light`   | ![][interactiveactiondisabledlight] | ![][interactiveactiondisabledlight] |
| `--p-interactive-action-disabled-dark`    | ![][interactiveactiondisableddark]  | ![][interactiveactiondisableddark]  |

[interactiveactiondisabledlight]: https://www.gifpng.com/64x32/348cfe/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[interactiveactiondisableddark]: https://www.gifpng.com/64x32/0663c1/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `interactiveActionHovered`

[Back to top](#Table-of-contents)

Used for hovered links and plain buttons.

| CSS variable                             | Light mode                         | Dark mode                          |
| ---------------------------------------- | ---------------------------------- | ---------------------------------- |
| `--p-interactive-action-hovered`         | ![][interactiveactionhoveredlight] | ![][interactiveactionhovereddark]  |
| `--p-interactive-action-hovered-inverse` | ![][interactiveactionhovereddark]  | ![][interactiveactionhoveredlight] |
| `--p-interactive-action-hovered-light`   | ![][interactiveactionhoveredlight] | ![][interactiveactionhoveredlight] |
| `--p-interactive-action-hovered-dark`    | ![][interactiveactionhovereddark]  | ![][interactiveactionhovereddark]  |

[interactiveactionhoveredlight]: https://www.gifpng.com/64x32/0557a8/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[interactiveactionhovereddark]: https://www.gifpng.com/64x32/81a8fe/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `interactiveActionSubdued`

[Back to top](#Table-of-contents)

Used for subdued links and plain buttons.

| CSS variable                             | Light mode                         | Dark mode                          |
| ---------------------------------------- | ---------------------------------- | ---------------------------------- |
| `--p-interactive-action-subdued`         | ![][interactiveactionsubduedlight] | ![][interactiveactionsubdueddark]  |
| `--p-interactive-action-subdued-inverse` | ![][interactiveactionsubdueddark]  | ![][interactiveactionsubduedlight] |
| `--p-interactive-action-subdued-light`   | ![][interactiveactionsubduedlight] | ![][interactiveactionsubduedlight] |
| `--p-interactive-action-subdued-dark`    | ![][interactiveactionsubdueddark]  | ![][interactiveactionsubdueddark]  |

[interactiveactionsubduedlight]: https://www.gifpng.com/64x32/0878e7/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[interactiveactionsubdueddark]: https://www.gifpng.com/64x32/0873dd/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `interactiveActionPressed`

[Back to top](#Table-of-contents)

Used for pressed links and plain buttons.

| CSS variable                             | Light mode                         | Dark mode                          |
| ---------------------------------------- | ---------------------------------- | ---------------------------------- |
| `--p-interactive-action-pressed`         | ![][interactiveactionpressedlight] | ![][interactiveactionpresseddark]  |
| `--p-interactive-action-pressed-inverse` | ![][interactiveactionpresseddark]  | ![][interactiveactionpressedlight] |
| `--p-interactive-action-pressed-light`   | ![][interactiveactionpressedlight] | ![][interactiveactionpressedlight] |
| `--p-interactive-action-pressed-dark`    | ![][interactiveactionpresseddark]  | ![][interactiveactionpresseddark]  |

[interactiveactionpressedlight]: https://www.gifpng.com/64x32/034891/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[interactiveactionpresseddark]: https://www.gifpng.com/64x32/9ab8fe/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `interactiveFocus`

[Back to top](#Table-of-contents)

For use in the focus ring on interactive elements.

| CSS variable                    | Light mode                 | Dark mode                  |
| ------------------------------- | -------------------------- | -------------------------- |
| `--p-interactive-focus`         | ![][interactivefocuslight] | ![][interactivefocusdark]  |
| `--p-interactive-focus-inverse` | ![][interactivefocusdark]  | ![][interactivefocuslight] |
| `--p-interactive-focus-light`   | ![][interactivefocuslight] | ![][interactivefocuslight] |
| `--p-interactive-focus-dark`    | ![][interactivefocusdark]  | ![][interactivefocusdark]  |

[interactivefocuslight]: https://www.gifpng.com/64x32/348cfe/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[interactivefocusdark]: https://www.gifpng.com/64x32/0663c1/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `interactiveSelected`

[Back to top](#Table-of-contents)

For use as a surface color in selected interactive elements, in components such as option list and resource list.

| CSS variable                       | Light mode                    | Dark mode                     |
| ---------------------------------- | ----------------------------- | ----------------------------- |
| `--p-interactive-selected`         | ![][interactiveselectedlight] | ![][interactiveselecteddark]  |
| `--p-interactive-selected-inverse` | ![][interactiveselecteddark]  | ![][interactiveselectedlight] |
| `--p-interactive-selected-light`   | ![][interactiveselectedlight] | ![][interactiveselectedlight] |
| `--p-interactive-selected-dark`    | ![][interactiveselecteddark]  | ![][interactiveselecteddark]  |

[interactiveselectedlight]: https://www.gifpng.com/64x32/f0f3ff/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[interactiveselecteddark]: https://www.gifpng.com/64x32/000e24/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `interactiveSelectedHovered`

[Back to top](#Table-of-contents)

For use as a surface color in selected interactive elements that are hovered, in components such as option list and resource list.

| CSS variable                               | Light mode                           | Dark mode                            |
| ------------------------------------------ | ------------------------------------ | ------------------------------------ |
| `--p-interactive-selected-hovered`         | ![][interactiveselectedhoveredlight] | ![][interactiveselectedhovereddark]  |
| `--p-interactive-selected-hovered-inverse` | ![][interactiveselectedhovereddark]  | ![][interactiveselectedhoveredlight] |
| `--p-interactive-selected-hovered-light`   | ![][interactiveselectedhoveredlight] | ![][interactiveselectedhoveredlight] |
| `--p-interactive-selected-hovered-dark`    | ![][interactiveselectedhovereddark]  | ![][interactiveselectedhovereddark]  |

[interactiveselectedhoveredlight]: https://www.gifpng.com/64x32/d6e0ff/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[interactiveselectedhovereddark]: https://www.gifpng.com/64x32/011d41/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `interactiveSelectedPressed`

[Back to top](#Table-of-contents)

For use as a surface color in selected interactive elements that are pressed, in components such as option list and resource list.

| CSS variable                               | Light mode                           | Dark mode                            |
| ------------------------------------------ | ------------------------------------ | ------------------------------------ |
| `--p-interactive-selected-pressed`         | ![][interactiveselectedpressedlight] | ![][interactiveselectedpresseddark]  |
| `--p-interactive-selected-pressed-inverse` | ![][interactiveselectedpresseddark]  | ![][interactiveselectedpressedlight] |
| `--p-interactive-selected-pressed-light`   | ![][interactiveselectedpressedlight] | ![][interactiveselectedpressedlight] |
| `--p-interactive-selected-pressed-dark`    | ![][interactiveselectedpresseddark]  | ![][interactiveselectedpresseddark]  |

[interactiveselectedpressedlight]: https://www.gifpng.com/64x32/b8cbff/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[interactiveselectedpresseddark]: https://www.gifpng.com/64x32/012b5b/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

## `neutral`

A neutral interactive color role, for use in secondary and tertiary buttons as a background color, as well as in form elements as a background color.

### `neutral`

[Back to top](#Table-of-contents)

While use directly in our components is discouraged, the base variant is unmodified from the original role input color.

| CSS variable  | Light mode        | Dark mode        |
| ------------- | ----------------- | ---------------- |
| `--p-neutral` | ![][neutrallight] | ![][neutraldark] |

[neutrallight]: https://www.gifpng.com/64x32/eaeaeb/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[neutraldark]: https://www.gifpng.com/64x32/eaeaeb/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `neutralAction`

[Back to top](#Table-of-contents)

Used for secondary buttons and tertiary buttons, as well as in form elements as a background color and pontentially other neutral surfaces.

| CSS variable                 | Light mode              | Dark mode               |
| ---------------------------- | ----------------------- | ----------------------- |
| `--p-neutral-action`         | ![][neutralactionlight] | ![][neutralactiondark]  |
| `--p-neutral-action-inverse` | ![][neutralactiondark]  | ![][neutralactionlight] |
| `--p-neutral-action-light`   | ![][neutralactionlight] | ![][neutralactionlight] |
| `--p-neutral-action-dark`    | ![][neutralactiondark]  | ![][neutralactiondark]  |

[neutralactionlight]: https://www.gifpng.com/64x32/eaeaeb/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[neutralactiondark]: https://www.gifpng.com/64x32/35353b/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `neutralActionDisabled`

[Back to top](#Table-of-contents)

Used as a disabled state for secondary buttons

| CSS variable                          | Light mode                      | Dark mode                       |
| ------------------------------------- | ------------------------------- | ------------------------------- |
| `--p-neutral-action-disabled`         | ![][neutralactiondisabledlight] | ![][neutralactiondisableddark]  |
| `--p-neutral-action-disabled-inverse` | ![][neutralactiondisableddark]  | ![][neutralactiondisabledlight] |
| `--p-neutral-action-disabled-light`   | ![][neutralactiondisabledlight] | ![][neutralactiondisabledlight] |
| `--p-neutral-action-disabled-dark`    | ![][neutralactiondisableddark]  | ![][neutralactiondisableddark]  |

[neutralactiondisabledlight]: https://www.gifpng.com/64x32/ededed/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[neutralactiondisableddark]: https://www.gifpng.com/64x32/222226/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `neutralActionHovered`

[Back to top](#Table-of-contents)

Used as a hovered state for secondary buttons

| CSS variable                         | Light mode                     | Dark mode                      |
| ------------------------------------ | ------------------------------ | ------------------------------ |
| `--p-neutral-action-hovered`         | ![][neutralactionhoveredlight] | ![][neutralactionhovereddark]  |
| `--p-neutral-action-hovered-inverse` | ![][neutralactionhovereddark]  | ![][neutralactionhoveredlight] |
| `--p-neutral-action-hovered-light`   | ![][neutralactionhoveredlight] | ![][neutralactionhoveredlight] |
| `--p-neutral-action-hovered-dark`    | ![][neutralactionhovereddark]  | ![][neutralactionhovereddark]  |

[neutralactionhoveredlight]: https://www.gifpng.com/64x32/e2e2e4/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[neutralactionhovereddark]: https://www.gifpng.com/64x32/3a3a40/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `neutralActionPressed`

[Back to top](#Table-of-contents)

Used as a pressed state for secondary buttons

| CSS variable                         | Light mode                     | Dark mode                      |
| ------------------------------------ | ------------------------------ | ------------------------------ |
| `--p-neutral-action-pressed`         | ![][neutralactionpressedlight] | ![][neutralactionpresseddark]  |
| `--p-neutral-action-pressed-inverse` | ![][neutralactionpresseddark]  | ![][neutralactionpressedlight] |
| `--p-neutral-action-pressed-light`   | ![][neutralactionpressedlight] | ![][neutralactionpressedlight] |
| `--p-neutral-action-pressed-dark`    | ![][neutralactionpresseddark]  | ![][neutralactionpresseddark]  |

[neutralactionpressedlight]: https://www.gifpng.com/64x32/dadadc/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[neutralactionpresseddark]: https://www.gifpng.com/64x32/5b5b62/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

## `primary`

A primary interactive color, for use in primary buttons as a background color. Also used in navigation and tabs for icons, and for a surface color when in a selected state.

### `primary`

[Back to top](#Table-of-contents)

While use directly in our components is discouraged, the base variant is unmodified from the original role input color.

| CSS variable  | Light mode        | Dark mode        |
| ------------- | ----------------- | ---------------- |
| `--p-primary` | ![][primarylight] | ![][primarydark] |

[primarylight]: https://www.gifpng.com/64x32/008060/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[primarydark]: https://www.gifpng.com/64x32/008060/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `primaryAction`

[Back to top](#Table-of-contents)

Used as the background color for primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.

| CSS variable         | Light mode              | Dark mode              |
| -------------------- | ----------------------- | ---------------------- |
| `--p-primary-action` | ![][primaryactionlight] | ![][primaryactiondark] |

[primaryactionlight]: https://www.gifpng.com/64x32/008060/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[primaryactiondark]: https://www.gifpng.com/64x32/008060/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `primaryActionDisabled`

[Back to top](#Table-of-contents)

Used as the background color for disabled primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.

| CSS variable                  | Light mode                      | Dark mode                      |
| ----------------------------- | ------------------------------- | ------------------------------ |
| `--p-primary-action-disabled` | ![][primaryactiondisabledlight] | ![][primaryactiondisableddark] |

[primaryactiondisabledlight]: https://www.gifpng.com/64x32/005741/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[primaryactiondisableddark]: https://www.gifpng.com/64x32/005741/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `primaryActionHovered`

[Back to top](#Table-of-contents)

Used as the background color for hovered primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.

| CSS variable                         | Light mode                     | Dark mode                      |
| ------------------------------------ | ------------------------------ | ------------------------------ |
| `--p-primary-action-hovered`         | ![][primaryactionhoveredlight] | ![][primaryactionhovereddark]  |
| `--p-primary-action-hovered-inverse` | ![][primaryactionhovereddark]  | ![][primaryactionhoveredlight] |
| `--p-primary-action-hovered-light`   | ![][primaryactionhoveredlight] | ![][primaryactionhoveredlight] |
| `--p-primary-action-hovered-dark`    | ![][primaryactionhovereddark]  | ![][primaryactionhovereddark]  |

[primaryactionhoveredlight]: https://www.gifpng.com/64x32/007054/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[primaryactionhovereddark]: https://www.gifpng.com/64x32/00946f/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `primaryActionPressed`

[Back to top](#Table-of-contents)

Used as the background color for pressed primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.

| CSS variable                         | Light mode                     | Dark mode                      |
| ------------------------------------ | ------------------------------ | ------------------------------ |
| `--p-primary-action-pressed`         | ![][primaryactionpressedlight] | ![][primaryactionpresseddark]  |
| `--p-primary-action-pressed-inverse` | ![][primaryactionpresseddark]  | ![][primaryactionpressedlight] |
| `--p-primary-action-pressed-light`   | ![][primaryactionpressedlight] | ![][primaryactionpressedlight] |
| `--p-primary-action-pressed-dark`    | ![][primaryactionpresseddark]  | ![][primaryactionpresseddark]  |

[primaryactionpressedlight]: https://www.gifpng.com/64x32/00664d/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[primaryactionpresseddark]: https://www.gifpng.com/64x32/00a37a/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `iconOnPrimary`

[Back to top](#Table-of-contents)

For use as a fill color for icons on primary actions. Not for use in icons on navigation and tabs.

| CSS variable          | Light mode              | Dark mode              |
| --------------------- | ----------------------- | ---------------------- |
| `--p-icon-on-primary` | ![][icononprimarylight] | ![][icononprimarydark] |

[icononprimarylight]: https://www.gifpng.com/64x32/e5fff4/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[icononprimarydark]: https://www.gifpng.com/64x32/e5fff4/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `iconSubduedOnPrimary`

[Back to top](#Table-of-contents)

For use as a fill color for icons on subdued primary actions. Not for use in icons on navigation and tabs.

| CSS variable                  | Light mode                     | Dark mode                     |
| ----------------------------- | ------------------------------ | ----------------------------- |
| `--p-icon-subdued-on-primary` | ![][iconsubduedonprimarylight] | ![][iconsubduedonprimarydark] |

[iconsubduedonprimarylight]: https://www.gifpng.com/64x32/00fac0/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[iconsubduedonprimarydark]: https://www.gifpng.com/64x32/00fac0/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `iconDisabledOnPrimary`

[Back to top](#Table-of-contents)

For use as a fill color for icons on disabled primary actions. Not for use in icons on navigation and tabs.

| CSS variable                   | Light mode                      | Dark mode                      |
| ------------------------------ | ------------------------------- | ------------------------------ |
| `--p-icon-disabled-on-primary` | ![][icondisabledonprimarylight] | ![][icondisabledonprimarydark] |

[icondisabledonprimarylight]: https://www.gifpng.com/64x32/00dba4/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[icondisabledonprimarydark]: https://www.gifpng.com/64x32/00dba4/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `textOnPrimary`

[Back to top](#Table-of-contents)

For use as a text color on primary actions. Not for use in text on navigation and tabs.

| CSS variable          | Light mode              | Dark mode              |
| --------------------- | ----------------------- | ---------------------- |
| `--p-text-on-primary` | ![][textonprimarylight] | ![][textonprimarydark] |

[textonprimarylight]: https://www.gifpng.com/64x32/ffffff/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[textonprimarydark]: https://www.gifpng.com/64x32/ffffff/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `textSubduedOnPrimary`

[Back to top](#Table-of-contents)

For use as a text color on subdued primary actions. Not for use in text on navigation and tabs.

| CSS variable                  | Light mode                     | Dark mode                     |
| ----------------------------- | ------------------------------ | ----------------------------- |
| `--p-text-subdued-on-primary` | ![][textsubduedonprimarylight] | ![][textsubduedonprimarydark] |

[textsubduedonprimarylight]: https://www.gifpng.com/64x32/33ffc5/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[textsubduedonprimarydark]: https://www.gifpng.com/64x32/33ffc5/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `textDisabledOnPrimary`

[Back to top](#Table-of-contents)

For use as a text color on disabled primary actions. Not for use in text on navigation and tabs.

| CSS variable                   | Light mode                      | Dark mode                      |
| ------------------------------ | ------------------------------- | ------------------------------ |
| `--p-text-disabled-on-primary` | ![][textdisabledonprimarylight] | ![][textdisabledonprimarydark] |

[textdisabledonprimarylight]: https://www.gifpng.com/64x32/33ffc5/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[textdisabledonprimarydark]: https://www.gifpng.com/64x32/33ffc5/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `primarySelected`

[Back to top](#Table-of-contents)

Used as a surface color to indicate selected interactive states in navigation and tabs.

| CSS variable                   | Light mode                | Dark mode                 |
| ------------------------------ | ------------------------- | ------------------------- |
| `--p-primary-selected`         | ![][primaryselectedlight] | ![][primaryselecteddark]  |
| `--p-primary-selected-inverse` | ![][primaryselecteddark]  | ![][primaryselectedlight] |
| `--p-primary-selected-light`   | ![][primaryselectedlight] | ![][primaryselectedlight] |
| `--p-primary-selected-dark`    | ![][primaryselecteddark]  | ![][primaryselecteddark]  |

[primaryselectedlight]: https://www.gifpng.com/64x32/e1f5ec/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[primaryselecteddark]: https://www.gifpng.com/64x32/0c1210/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `primarySelectedHovered`

[Back to top](#Table-of-contents)

Used as a surface color to indicate selected interactive states that are hovered in navigation and tabs.

| CSS variable                           | Light mode                       | Dark mode                        |
| -------------------------------------- | -------------------------------- | -------------------------------- |
| `--p-primary-selected-hovered`         | ![][primaryselectedhoveredlight] | ![][primaryselectedhovereddark]  |
| `--p-primary-selected-hovered-inverse` | ![][primaryselectedhovereddark]  | ![][primaryselectedhoveredlight] |
| `--p-primary-selected-hovered-light`   | ![][primaryselectedhoveredlight] | ![][primaryselectedhoveredlight] |
| `--p-primary-selected-hovered-dark`    | ![][primaryselectedhovereddark]  | ![][primaryselectedhovereddark]  |

[primaryselectedhoveredlight]: https://www.gifpng.com/64x32/b3d0c3/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[primaryselectedhovereddark]: https://www.gifpng.com/64x32/272f2b/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `primarySelectedPressed`

[Back to top](#Table-of-contents)

Used as a surface color to indicate selected interactive states that are pressed in navigation and tabs.

| CSS variable                           | Light mode                       | Dark mode                        |
| -------------------------------------- | -------------------------------- | -------------------------------- |
| `--p-primary-selected-pressed`         | ![][primaryselectedpressedlight] | ![][primaryselectedpresseddark]  |
| `--p-primary-selected-pressed-inverse` | ![][primaryselectedpresseddark]  | ![][primaryselectedpressedlight] |
| `--p-primary-selected-pressed-light`   | ![][primaryselectedpressedlight] | ![][primaryselectedpressedlight] |
| `--p-primary-selected-pressed-dark`    | ![][primaryselectedpresseddark]  | ![][primaryselectedpresseddark]  |

[primaryselectedpressedlight]: https://www.gifpng.com/64x32/a3bdb1/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[primaryselectedpresseddark]: https://www.gifpng.com/64x32/363f3b/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

## `critical`

Used to communicate destructive outcomes on interactive elements, for communicating errors, and to indicate a critical event in inert elements that requires immediate merchant action.

### `critical`

[Back to top](#Table-of-contents)

While use directly in our components is discouraged, the base variant is unmodified from the original role input color.

| CSS variable   | Light mode         | Dark mode         |
| -------------- | ------------------ | ----------------- |
| `--p-critical` | ![][criticallight] | ![][criticaldark] |

[criticallight]: https://www.gifpng.com/64x32/d92b0d/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[criticaldark]: https://www.gifpng.com/64x32/d92b0d/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `criticalBorder`

[Back to top](#Table-of-contents)

For use as a border on critical components such as banners, and as an outline on interactive elements in an error state.

| CSS variable          | Light mode               | Dark mode               |
| --------------------- | ------------------------ | ----------------------- |
| `--p-critical-border` | ![][criticalborderlight] | ![][criticalborderdark] |

[criticalborderlight]: https://www.gifpng.com/64x32/e12e0e/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[criticalborderdark]: https://www.gifpng.com/64x32/e12e0e/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `criticalBorderDisabled`

[Back to top](#Table-of-contents)

For use as a disabled border on critical components such as banners, and as an outline on interactive elements in an error state.

| CSS variable                           | Light mode                       | Dark mode                        |
| -------------------------------------- | -------------------------------- | -------------------------------- |
| `--p-critical-border-disabled`         | ![][criticalborderdisabledlight] | ![][criticalborderdisableddark]  |
| `--p-critical-border-disabled-inverse` | ![][criticalborderdisableddark]  | ![][criticalborderdisabledlight] |
| `--p-critical-border-disabled-light`   | ![][criticalborderdisabledlight] | ![][criticalborderdisabledlight] |
| `--p-critical-border-disabled-dark`    | ![][criticalborderdisableddark]  | ![][criticalborderdisableddark]  |

[criticalborderdisabledlight]: https://www.gifpng.com/64x32/febcb9/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[criticalborderdisableddark]: https://www.gifpng.com/64x32/811704/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `criticalIcon`

[Back to top](#Table-of-contents)

For use as an icon fill color on top of critical elements.

| CSS variable                | Light mode             | Dark mode              |
| --------------------------- | ---------------------- | ---------------------- |
| `--p-critical-icon`         | ![][criticaliconlight] | ![][criticalicondark]  |
| `--p-critical-icon-inverse` | ![][criticalicondark]  | ![][criticaliconlight] |
| `--p-critical-icon-light`   | ![][criticaliconlight] | ![][criticaliconlight] |
| `--p-critical-icon-dark`    | ![][criticalicondark]  | ![][criticalicondark]  |

[criticaliconlight]: https://www.gifpng.com/64x32/eb300f/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[criticalicondark]: https://www.gifpng.com/64x32/d92b0d/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `criticalSurface`

[Back to top](#Table-of-contents)

For use as a surface color on critical elements including badges.

| CSS variable                   | Light mode                | Dark mode                 |
| ------------------------------ | ------------------------- | ------------------------- |
| `--p-critical-surface`         | ![][criticalsurfacelight] | ![][criticalsurfacedark]  |
| `--p-critical-surface-inverse` | ![][criticalsurfacedark]  | ![][criticalsurfacelight] |
| `--p-critical-surface-light`   | ![][criticalsurfacelight] | ![][criticalsurfacelight] |
| `--p-critical-surface-dark`    | ![][criticalsurfacedark]  | ![][criticalsurfacedark]  |

[criticalsurfacelight]: https://www.gifpng.com/64x32/fffafa/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[criticalsurfacedark]: https://www.gifpng.com/64x32/460701/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `criticalSurfaceSubdued`

[Back to top](#Table-of-contents)

For use as a subdued surface color on critical elements including banners.

| CSS variable                           | Light mode                       | Dark mode                        |
| -------------------------------------- | -------------------------------- | -------------------------------- |
| `--p-critical-surface-subdued`         | ![][criticalsurfacesubduedlight] | ![][criticalsurfacesubdueddark]  |
| `--p-critical-surface-subdued-inverse` | ![][criticalsurfacesubdueddark]  | ![][criticalsurfacesubduedlight] |
| `--p-critical-surface-subdued-light`   | ![][criticalsurfacesubduedlight] | ![][criticalsurfacesubduedlight] |
| `--p-critical-surface-subdued-dark`    | ![][criticalsurfacesubdueddark]  | ![][criticalsurfacesubdueddark]  |

[criticalsurfacesubduedlight]: https://www.gifpng.com/64x32/fff6f5/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[criticalsurfacesubdueddark]: https://www.gifpng.com/64x32/460701/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `criticalSurfaceSubduedHovered`

[Back to top](#Table-of-contents)

For use as a surface color on critical interactive elements including action list items in a hovered state.

| CSS variable                                   | Light mode                              | Dark mode                               |
| ---------------------------------------------- | --------------------------------------- | --------------------------------------- |
| `--p-critical-surface-subdued-hovered`         | ![][criticalsurfacesubduedhoveredlight] | ![][criticalsurfacesubduedhovereddark]  |
| `--p-critical-surface-subdued-hovered-inverse` | ![][criticalsurfacesubduedhovereddark]  | ![][criticalsurfacesubduedhoveredlight] |
| `--p-critical-surface-subdued-hovered-light`   | ![][criticalsurfacesubduedhoveredlight] | ![][criticalsurfacesubduedhoveredlight] |
| `--p-critical-surface-subdued-hovered-dark`    | ![][criticalsurfacesubduedhovereddark]  | ![][criticalsurfacesubduedhovereddark]  |

[criticalsurfacesubduedhoveredlight]: https://www.gifpng.com/64x32/fee7e6/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[criticalsurfacesubduedhovereddark]: https://www.gifpng.com/64x32/431714/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `criticalSurfaceSubduedPressed`

[Back to top](#Table-of-contents)

For use as a surface color on critical interactive elements including action list items in a pressed state.

| CSS variable                                   | Light mode                              | Dark mode                               |
| ---------------------------------------------- | --------------------------------------- | --------------------------------------- |
| `--p-critical-surface-subdued-pressed`         | ![][criticalsurfacesubduedpressedlight] | ![][criticalsurfacesubduedpresseddark]  |
| `--p-critical-surface-subdued-pressed-inverse` | ![][criticalsurfacesubduedpresseddark]  | ![][criticalsurfacesubduedpressedlight] |
| `--p-critical-surface-subdued-pressed-light`   | ![][criticalsurfacesubduedpressedlight] | ![][criticalsurfacesubduedpressedlight] |
| `--p-critical-surface-subdued-pressed-dark`    | ![][criticalsurfacesubduedpresseddark]  | ![][criticalsurfacesubduedpresseddark]  |

[criticalsurfacesubduedpressedlight]: https://www.gifpng.com/64x32/fed4d2/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[criticalsurfacesubduedpresseddark]: https://www.gifpng.com/64x32/6d1103/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `criticalText`

[Back to top](#Table-of-contents)

For use as a text color in inert critical elements such as exception list. Not for use as a text color on banners and badges.

| CSS variable                | Light mode             | Dark mode              |
| --------------------------- | ---------------------- | ---------------------- |
| `--p-critical-text`         | ![][criticaltextlight] | ![][criticaltextdark]  |
| `--p-critical-text-inverse` | ![][criticaltextdark]  | ![][criticaltextlight] |
| `--p-critical-text-light`   | ![][criticaltextlight] | ![][criticaltextlight] |
| `--p-critical-text-dark`    | ![][criticaltextdark]  | ![][criticaltextdark]  |

[criticaltextlight]: https://www.gifpng.com/64x32/b42208/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[criticaltextdark]: https://www.gifpng.com/64x32/fd5849/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `criticalAction`

[Back to top](#Table-of-contents)

For use as the background color for destructive buttons, and as the background color for error toast messages.

| CSS variable                  | Light mode               | Dark mode                |
| ----------------------------- | ------------------------ | ------------------------ |
| `--p-critical-action`         | ![][criticalactionlight] | ![][criticalactiondark]  |
| `--p-critical-action-inverse` | ![][criticalactiondark]  | ![][criticalactionlight] |
| `--p-critical-action-light`   | ![][criticalactionlight] | ![][criticalactionlight] |
| `--p-critical-action-dark`    | ![][criticalactiondark]  | ![][criticalactiondark]  |

[criticalactionlight]: https://www.gifpng.com/64x32/d92b0d/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[criticalactiondark]: https://www.gifpng.com/64x32/cf290c/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `criticalActionDisabled`

[Back to top](#Table-of-contents)

For use as the background color for disabled destructive buttons, and as the background color for error toast messages.

| CSS variable                           | Light mode                       | Dark mode                        |
| -------------------------------------- | -------------------------------- | -------------------------------- |
| `--p-critical-action-disabled`         | ![][criticalactiondisabledlight] | ![][criticalactiondisableddark]  |
| `--p-critical-action-disabled-inverse` | ![][criticalactiondisableddark]  | ![][criticalactiondisabledlight] |
| `--p-critical-action-disabled-light`   | ![][criticalactiondisabledlight] | ![][criticalactiondisabledlight] |
| `--p-critical-action-disabled-dark`    | ![][criticalactiondisableddark]  | ![][criticalactiondisableddark]  |

[criticalactiondisabledlight]: https://www.gifpng.com/64x32/fd4f3f/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[criticalactiondisableddark]: https://www.gifpng.com/64x32/bd250a/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `criticalActionHovered`

[Back to top](#Table-of-contents)

For use as the background color for hovered destructive buttons, and as the background color for error toast messages.

| CSS variable                          | Light mode                      | Dark mode                       |
| ------------------------------------- | ------------------------------- | ------------------------------- |
| `--p-critical-action-hovered`         | ![][criticalactionhoveredlight] | ![][criticalactionhovereddark]  |
| `--p-critical-action-hovered-inverse` | ![][criticalactionhovereddark]  | ![][criticalactionhoveredlight] |
| `--p-critical-action-hovered-light`   | ![][criticalactionhoveredlight] | ![][criticalactionhoveredlight] |
| `--p-critical-action-hovered-dark`    | ![][criticalactionhovereddark]  | ![][criticalactionhovereddark]  |

[criticalactionhoveredlight]: https://www.gifpng.com/64x32/c2260a/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[criticalactionhovereddark]: https://www.gifpng.com/64x32/e12e0e/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `criticalActionPressed`

[Back to top](#Table-of-contents)

For use as the background color for pressed destructive buttons, and as the background color for error toast messages.

| CSS variable                          | Light mode                      | Dark mode                       |
| ------------------------------------- | ------------------------------- | ------------------------------- |
| `--p-critical-action-pressed`         | ![][criticalactionpressedlight] | ![][criticalactionpresseddark]  |
| `--p-critical-action-pressed-inverse` | ![][criticalactionpresseddark]  | ![][criticalactionpressedlight] |
| `--p-critical-action-pressed-light`   | ![][criticalactionpressedlight] | ![][criticalactionpressedlight] |
| `--p-critical-action-pressed-dark`    | ![][criticalactionpresseddark]  | ![][criticalactionpresseddark]  |

[criticalactionpressedlight]: https://www.gifpng.com/64x32/aa2008/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[criticalactionpresseddark]: https://www.gifpng.com/64x32/fd5849/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `criticalLink`

[Back to top](#Table-of-contents)

For use as a text color in destructive plain buttons, as well as a text color on destructive action list items. Not for use on critical banners and badges.

| CSS variable                | Light mode             | Dark mode              |
| --------------------------- | ---------------------- | ---------------------- |
| `--p-critical-link`         | ![][criticallinklight] | ![][criticallinkdark]  |
| `--p-critical-link-inverse` | ![][criticallinkdark]  | ![][criticallinklight] |
| `--p-critical-link-light`   | ![][criticallinklight] | ![][criticallinklight] |
| `--p-critical-link-dark`    | ![][criticallinkdark]  | ![][criticallinkdark]  |

[criticallinklight]: https://www.gifpng.com/64x32/dd2d0e/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[criticallinkdark]: https://www.gifpng.com/64x32/fd7068/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `criticalLinkDisabled`

[Back to top](#Table-of-contents)

For use as a text color in disabled destructive plain buttons, as well as a text color on destructive action list items. Not for use on critical banners and badges.

| CSS variable                         | Light mode                     | Dark mode                      |
| ------------------------------------ | ------------------------------ | ------------------------------ |
| `--p-critical-link-disabled`         | ![][criticallinkdisabledlight] | ![][criticallinkdisableddark]  |
| `--p-critical-link-disabled-inverse` | ![][criticallinkdisableddark]  | ![][criticallinkdisabledlight] |
| `--p-critical-link-disabled-light`   | ![][criticallinkdisabledlight] | ![][criticallinkdisabledlight] |
| `--p-critical-link-disabled-dark`    | ![][criticallinkdisableddark]  | ![][criticallinkdisableddark]  |

[criticallinkdisabledlight]: https://www.gifpng.com/64x32/fd918b/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[criticallinkdisableddark]: https://www.gifpng.com/64x32/feada9/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `criticalLinkHovered`

[Back to top](#Table-of-contents)

For use as a text color in hovered destructive plain buttons, as well as a text color on destructive action list items. Not for use on critical banners and badges.

| CSS variable                        | Light mode                    | Dark mode                     |
| ----------------------------------- | ----------------------------- | ----------------------------- |
| `--p-critical-link-hovered`         | ![][criticallinkhoveredlight] | ![][criticallinkhovereddark]  |
| `--p-critical-link-hovered-inverse` | ![][criticallinkhovereddark]  | ![][criticallinkhoveredlight] |
| `--p-critical-link-hovered-light`   | ![][criticallinkhoveredlight] | ![][criticallinkhoveredlight] |
| `--p-critical-link-hovered-dark`    | ![][criticallinkhovereddark]  | ![][criticallinkhovereddark]  |

[criticallinkhoveredlight]: https://www.gifpng.com/64x32/cf290c/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[criticallinkhovereddark]: https://www.gifpng.com/64x32/fd8881/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `criticalLinkPressed`

[Back to top](#Table-of-contents)

For use as a text color in pressed destructive plain buttons, as well as a text color on destructive action list items. Not for use on critical banners and badges.

| CSS variable                        | Light mode                    | Dark mode                     |
| ----------------------------------- | ----------------------------- | ----------------------------- |
| `--p-critical-link-pressed`         | ![][criticallinkpressedlight] | ![][criticallinkpresseddark]  |
| `--p-critical-link-pressed-inverse` | ![][criticallinkpresseddark]  | ![][criticallinkpressedlight] |
| `--p-critical-link-pressed-light`   | ![][criticallinkpressedlight] | ![][criticallinkpressedlight] |
| `--p-critical-link-pressed-dark`    | ![][criticallinkpresseddark]  | ![][criticallinkpresseddark]  |

[criticallinkpressedlight]: https://www.gifpng.com/64x32/680f03/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[criticallinkpresseddark]: https://www.gifpng.com/64x32/fd9e9b/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

## `warning`

For use as an indicator that action should be taken by merchants in components including badges, banners, and exception lists.

### `warning`

[Back to top](#Table-of-contents)

While use directly in our components is discouraged, the base variant is unmodified from the original role input color.

| CSS variable  | Light mode        | Dark mode        |
| ------------- | ----------------- | ---------------- |
| `--p-warning` | ![][warninglight] | ![][warningdark] |

[warninglight]: https://www.gifpng.com/64x32/ffc252/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[warningdark]: https://www.gifpng.com/64x32/ffc252/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `warningBorder`

[Back to top](#Table-of-contents)

For use as a border on warning components such as banners.

| CSS variable                 | Light mode              | Dark mode               |
| ---------------------------- | ----------------------- | ----------------------- |
| `--p-warning-border`         | ![][warningborderlight] | ![][warningborderdark]  |
| `--p-warning-border-inverse` | ![][warningborderdark]  | ![][warningborderlight] |
| `--p-warning-border-light`   | ![][warningborderlight] | ![][warningborderlight] |
| `--p-warning-border-dark`    | ![][warningborderdark]  | ![][warningborderdark]  |

[warningborderlight]: https://www.gifpng.com/64x32/f0b400/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[warningborderdark]: https://www.gifpng.com/64x32/997000/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `warningIcon`

[Back to top](#Table-of-contents)

For use as an icon fill color on top of warning elements.

| CSS variable               | Light mode            | Dark mode             |
| -------------------------- | --------------------- | --------------------- |
| `--p-warning-icon`         | ![][warningiconlight] | ![][warningicondark]  |
| `--p-warning-icon-inverse` | ![][warningicondark]  | ![][warningiconlight] |
| `--p-warning-icon-light`   | ![][warningiconlight] | ![][warningiconlight] |
| `--p-warning-icon-dark`    | ![][warningicondark]  | ![][warningicondark]  |

[warningiconlight]: https://www.gifpng.com/64x32/cc9600/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[warningicondark]: https://www.gifpng.com/64x32/664900/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `warningSurface`

[Back to top](#Table-of-contents)

For use as a surface color on warning elements including badges.

| CSS variable                  | Light mode               | Dark mode                |
| ----------------------------- | ------------------------ | ------------------------ |
| `--p-warning-surface`         | ![][warningsurfacelight] | ![][warningsurfacedark]  |
| `--p-warning-surface-inverse` | ![][warningsurfacedark]  | ![][warningsurfacelight] |
| `--p-warning-surface-light`   | ![][warningsurfacelight] | ![][warningsurfacelight] |
| `--p-warning-surface-dark`    | ![][warningsurfacedark]  | ![][warningsurfacedark]  |

[warningsurfacelight]: https://www.gifpng.com/64x32/ffcd75/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[warningsurfacedark]: https://www.gifpng.com/64x32/997000/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `warningSurfaceSubdued`

[Back to top](#Table-of-contents)

For use as a subdued surface color on warning elements including banners.

| CSS variable                          | Light mode                      | Dark mode                       |
| ------------------------------------- | ------------------------------- | ------------------------------- |
| `--p-warning-surface-subdued`         | ![][warningsurfacesubduedlight] | ![][warningsurfacesubdueddark]  |
| `--p-warning-surface-subdued-inverse` | ![][warningsurfacesubdueddark]  | ![][warningsurfacesubduedlight] |
| `--p-warning-surface-subdued-light`   | ![][warningsurfacesubduedlight] | ![][warningsurfacesubduedlight] |
| `--p-warning-surface-subdued-dark`    | ![][warningsurfacesubdueddark]  | ![][warningsurfacesubdueddark]  |

[warningsurfacesubduedlight]: https://www.gifpng.com/64x32/fffcfa/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[warningsurfacesubdueddark]: https://www.gifpng.com/64x32/332300/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `warningText`

[Back to top](#Table-of-contents)

For use as a text color in inert critical elements such as exception list. Not for use as a text color on banners and badges.

| CSS variable               | Light mode            | Dark mode             |
| -------------------------- | --------------------- | --------------------- |
| `--p-warning-text`         | ![][warningtextlight] | ![][warningtextdark]  |
| `--p-warning-text-inverse` | ![][warningtextdark]  | ![][warningtextlight] |
| `--p-warning-text-light`   | ![][warningtextlight] | ![][warningtextlight] |
| `--p-warning-text-dark`    | ![][warningtextdark]  | ![][warningtextdark]  |

[warningtextlight]: https://www.gifpng.com/64x32/5c4200/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[warningtextdark]: https://www.gifpng.com/64x32/dba100/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

## `highlight`

Used to highlight elements of the UI that are important for merchants, but do not require immediate action. Used in information banners and badges, indicators that draw attention to new information, bars that indicate loading or progress, and in data visualization.

### `highlight`

[Back to top](#Table-of-contents)

While use directly in our components is discouraged, the base variant is unmodified from the original role input color.

| CSS variable    | Light mode          | Dark mode          |
| --------------- | ------------------- | ------------------ |
| `--p-highlight` | ![][highlightlight] | ![][highlightdark] |

[highlightlight]: https://www.gifpng.com/64x32/58d0c2/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[highlightdark]: https://www.gifpng.com/64x32/58d0c2/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `highlightBorder`

[Back to top](#Table-of-contents)

For use as a border on informational components such as banners.

| CSS variable           | Light mode                | Dark mode                |
| ---------------------- | ------------------------- | ------------------------ |
| `--p-highlight-border` | ![][highlightborderlight] | ![][highlightborderdark] |

[highlightborderlight]: https://www.gifpng.com/64x32/429e93/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[highlightborderdark]: https://www.gifpng.com/64x32/429e93/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `highlightIcon`

[Back to top](#Table-of-contents)

For use as an icon fill color on top of informational elements.

| CSS variable                 | Light mode              | Dark mode               |
| ---------------------------- | ----------------------- | ----------------------- |
| `--p-highlight-icon`         | ![][highlighticonlight] | ![][highlighticondark]  |
| `--p-highlight-icon-inverse` | ![][highlighticondark]  | ![][highlighticonlight] |
| `--p-highlight-icon-light`   | ![][highlighticonlight] | ![][highlighticonlight] |
| `--p-highlight-icon-dark`    | ![][highlighticondark]  | ![][highlighticondark]  |

[highlighticonlight]: https://www.gifpng.com/64x32/419b90/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[highlighticondark]: https://www.gifpng.com/64x32/2c6d67/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `highlightSurface`

[Back to top](#Table-of-contents)

For use as a surface color on information elements including badges.

| CSS variable                    | Light mode                 | Dark mode                  |
| ------------------------------- | -------------------------- | -------------------------- |
| `--p-highlight-surface`         | ![][highlightsurfacelight] | ![][highlightsurfacedark]  |
| `--p-highlight-surface-inverse` | ![][highlightsurfacedark]  | ![][highlightsurfacelight] |
| `--p-highlight-surface-light`   | ![][highlightsurfacelight] | ![][highlightsurfacelight] |
| `--p-highlight-surface-dark`    | ![][highlightsurfacedark]  | ![][highlightsurfacedark]  |

[highlightsurfacelight]: https://www.gifpng.com/64x32/8de2d7/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[highlightsurfacedark]: https://www.gifpng.com/64x32/00857a/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `highlightSurfaceSubdued`

[Back to top](#Table-of-contents)

For use as a surface color on information elements including banners.

| CSS variable                            | Light mode                        | Dark mode                         |
| --------------------------------------- | --------------------------------- | --------------------------------- |
| `--p-highlight-surface-subdued`         | ![][highlightsurfacesubduedlight] | ![][highlightsurfacesubdueddark]  |
| `--p-highlight-surface-subdued-inverse` | ![][highlightsurfacesubdueddark]  | ![][highlightsurfacesubduedlight] |
| `--p-highlight-surface-subdued-light`   | ![][highlightsurfacesubduedlight] | ![][highlightsurfacesubduedlight] |
| `--p-highlight-surface-subdued-dark`    | ![][highlightsurfacesubdueddark]  | ![][highlightsurfacesubdueddark]  |

[highlightsurfacesubduedlight]: https://www.gifpng.com/64x32/f1fefc/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[highlightsurfacesubdueddark]: https://www.gifpng.com/64x32/123631/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `highlightext`

[Back to top](#Table-of-contents)

For use as a text color in inert informational elements. Not for use as a text color on banners and badges.

| CSS variable               | Light mode             | Dark mode              |
| -------------------------- | ---------------------- | ---------------------- |
| `--p-highlightext`         | ![][highlightextlight] | ![][highlightextdark]  |
| `--p-highlightext-inverse` | ![][highlightextdark]  | ![][highlightextlight] |
| `--p-highlightext-light`   | ![][highlightextlight] | ![][highlightextlight] |
| `--p-highlightext-dark`    | ![][highlightextdark]  | ![][highlightextdark]  |

[highlightextlight]: https://www.gifpng.com/64x32/071d1a/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[highlightextdark]: https://www.gifpng.com/64x32/6df8e8/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

## `success`

Used to indicate the result of a successful action taken by a merchant, to indicate a positive event, or to illustrate growth.

### `success`

[Back to top](#Table-of-contents)

While use directly in our components is discouraged, the base variant is unmodified from the original role input color.

| CSS variable  | Light mode        | Dark mode        |
| ------------- | ----------------- | ---------------- |
| `--p-success` | ![][successlight] | ![][successdark] |

[successlight]: https://www.gifpng.com/64x32/008060/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[successdark]: https://www.gifpng.com/64x32/008060/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `successBorder`

[Back to top](#Table-of-contents)

For use as a border on success components such as banners.

| CSS variable         | Light mode              | Dark mode              |
| -------------------- | ----------------------- | ---------------------- |
| `--p-success-border` | ![][successborderlight] | ![][successborderdark] |

[successborderlight]: https://www.gifpng.com/64x32/008563/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[successborderdark]: https://www.gifpng.com/64x32/008563/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `successIcon`

[Back to top](#Table-of-contents)

For use as an icon fill color on top of success elements.

| CSS variable               | Light mode            | Dark mode             |
| -------------------------- | --------------------- | --------------------- |
| `--p-success-icon`         | ![][successiconlight] | ![][successicondark]  |
| `--p-success-icon-inverse` | ![][successicondark]  | ![][successiconlight] |
| `--p-success-icon-light`   | ![][successiconlight] | ![][successiconlight] |
| `--p-success-icon-dark`    | ![][successicondark]  | ![][successicondark]  |

[successiconlight]: https://www.gifpng.com/64x32/004231/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[successicondark]: https://www.gifpng.com/64x32/005c45/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `successSurface`

[Back to top](#Table-of-contents)

For use as a surface color on success elements including badges.

| CSS variable                  | Light mode               | Dark mode                |
| ----------------------------- | ------------------------ | ------------------------ |
| `--p-success-surface`         | ![][successsurfacelight] | ![][successsurfacedark]  |
| `--p-success-surface-inverse` | ![][successsurfacedark]  | ![][successsurfacelight] |
| `--p-success-surface-light`   | ![][successsurfacelight] | ![][successsurfacelight] |
| `--p-success-surface-dark`    | ![][successsurfacedark]  | ![][successsurfacedark]  |

[successsurfacelight]: https://www.gifpng.com/64x32/8ae5c2/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[successsurfacedark]: https://www.gifpng.com/64x32/006b4f/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `successSurfaceSubdued`

[Back to top](#Table-of-contents)

For use as a surface color on information elements including banners.

| CSS variable                          | Light mode                      | Dark mode                       |
| ------------------------------------- | ------------------------------- | ------------------------------- |
| `--p-success-surface-subdued`         | ![][successsurfacesubduedlight] | ![][successsurfacesubdueddark]  |
| `--p-success-surface-subdued-inverse` | ![][successsurfacesubdueddark]  | ![][successsurfacesubduedlight] |
| `--p-success-surface-subdued-light`   | ![][successsurfacesubduedlight] | ![][successsurfacesubduedlight] |
| `--p-success-surface-subdued-dark`    | ![][successsurfacesubdueddark]  | ![][successsurfacesubdueddark]  |

[successsurfacesubduedlight]: https://www.gifpng.com/64x32/f6fefa/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[successsurfacesubdueddark]: https://www.gifpng.com/64x32/1c352c/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `successText`

[Back to top](#Table-of-contents)

For use as a text color in inert success elements. Not for use as a text color on banners and badges.

| CSS variable               | Light mode            | Dark mode             |
| -------------------------- | --------------------- | --------------------- |
| `--p-success-text`         | ![][successtextlight] | ![][successtextdark]  |
| `--p-success-text-inverse` | ![][successtextdark]  | ![][successtextlight] |
| `--p-success-text-light`   | ![][successtextlight] | ![][successtextlight] |
| `--p-success-text-dark`    | ![][successtextdark]  | ![][successtextdark]  |

[successtextlight]: https://www.gifpng.com/64x32/006b4f/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[successtextdark]: https://www.gifpng.com/64x32/00a37a/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

## `decorative`

Used to decorate elements where color does convey a specific meaning in components like avatars

### `decorativeOneSurface`

[Back to top](#Table-of-contents)

For use as a decorative surface color.

| CSS variable                         | Light mode                     | Dark mode                      |
| ------------------------------------ | ------------------------------ | ------------------------------ |
| `--p-decorative-one-surface`         | ![][decorativeonesurfacelight] | ![][decorativeonesurfacedark]  |
| `--p-decorative-one-surface-inverse` | ![][decorativeonesurfacedark]  | ![][decorativeonesurfacelight] |
| `--p-decorative-one-surface-light`   | ![][decorativeonesurfacelight] | ![][decorativeonesurfacelight] |
| `--p-decorative-one-surface-dark`    | ![][decorativeonesurfacedark]  | ![][decorativeonesurfacedark]  |

[decorativeonesurfacelight]: https://www.gifpng.com/64x32/ffc96b/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[decorativeonesurfacedark]: https://www.gifpng.com/64x32/906709/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `decorativeOneText`

[Back to top](#Table-of-contents)

For use as a decorative text color that is applied on a decorative surface.

| CSS variable                      | Light mode                  | Dark mode                   |
| --------------------------------- | --------------------------- | --------------------------- |
| `--p-decorative-one-text`         | ![][decorativeonetextlight] | ![][decorativeonetextdark]  |
| `--p-decorative-one-text-inverse` | ![][decorativeonetextdark]  | ![][decorativeonetextlight] |
| `--p-decorative-one-text-light`   | ![][decorativeonetextlight] | ![][decorativeonetextlight] |
| `--p-decorative-one-text-dark`    | ![][decorativeonetextdark]  | ![][decorativeonetextdark]  |

[decorativeonetextlight]: https://www.gifpng.com/64x32/3d2800/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[decorativeonetextdark]: https://www.gifpng.com/64x32/ffffff/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `decorativeTwoSurface`

[Back to top](#Table-of-contents)

For use as a decorative surface color.

| CSS variable                         | Light mode                     | Dark mode                      |
| ------------------------------------ | ------------------------------ | ------------------------------ |
| `--p-decorative-two-surface`         | ![][decorativetwosurfacelight] | ![][decorativetwosurfacedark]  |
| `--p-decorative-two-surface-inverse` | ![][decorativetwosurfacedark]  | ![][decorativetwosurfacelight] |
| `--p-decorative-two-surface-light`   | ![][decorativetwosurfacelight] | ![][decorativetwosurfacelight] |
| `--p-decorative-two-surface-dark`    | ![][decorativetwosurfacedark]  | ![][decorativetwosurfacedark]  |

[decorativetwosurfacelight]: https://www.gifpng.com/64x32/ffc6b3/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[decorativetwosurfacedark]: https://www.gifpng.com/64x32/cc5814/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `decorativeTwoText`

[Back to top](#Table-of-contents)

For use as a decorative text color that is applied on a decorative surface.

| CSS variable                      | Light mode                  | Dark mode                   |
| --------------------------------- | --------------------------- | --------------------------- |
| `--p-decorative-two-text`         | ![][decorativetwotextlight] | ![][decorativetwotextdark]  |
| `--p-decorative-two-text-inverse` | ![][decorativetwotextdark]  | ![][decorativetwotextlight] |
| `--p-decorative-two-text-light`   | ![][decorativetwotextlight] | ![][decorativetwotextlight] |
| `--p-decorative-two-text-dark`    | ![][decorativetwotextdark]  | ![][decorativetwotextdark]  |

[decorativetwotextlight]: https://www.gifpng.com/64x32/470b1b/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[decorativetwotextdark]: https://www.gifpng.com/64x32/ffffff/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `decorativeThreeSurface`

[Back to top](#Table-of-contents)

For use as a decorative surface color.

| CSS variable                           | Light mode                       | Dark mode                        |
| -------------------------------------- | -------------------------------- | -------------------------------- |
| `--p-decorative-three-surface`         | ![][decorativethreesurfacelight] | ![][decorativethreesurfacedark]  |
| `--p-decorative-three-surface-inverse` | ![][decorativethreesurfacedark]  | ![][decorativethreesurfacelight] |
| `--p-decorative-three-surface-light`   | ![][decorativethreesurfacelight] | ![][decorativethreesurfacelight] |
| `--p-decorative-three-surface-dark`    | ![][decorativethreesurfacedark]  | ![][decorativethreesurfacedark]  |

[decorativethreesurfacelight]: https://www.gifpng.com/64x32/91e3b3/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[decorativethreesurfacedark]: https://www.gifpng.com/64x32/007a5a/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `decorativeThreeText`

[Back to top](#Table-of-contents)

For use as a decorative text color that is applied on a decorative surface.

| CSS variable                        | Light mode                    | Dark mode                     |
| ----------------------------------- | ----------------------------- | ----------------------------- |
| `--p-decorative-three-text`         | ![][decorativethreetextlight] | ![][decorativethreetextdark]  |
| `--p-decorative-three-text-inverse` | ![][decorativethreetextdark]  | ![][decorativethreetextlight] |
| `--p-decorative-three-text-light`   | ![][decorativethreetextlight] | ![][decorativethreetextlight] |
| `--p-decorative-three-text-dark`    | ![][decorativethreetextdark]  | ![][decorativethreetextdark]  |

[decorativethreetextlight]: https://www.gifpng.com/64x32/002e18/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[decorativethreetextdark]: https://www.gifpng.com/64x32/ffffff/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `decorativeFourSurface`

[Back to top](#Table-of-contents)

For use as a decorative surface color.

| CSS variable                          | Light mode                      | Dark mode                       |
| ------------------------------------- | ------------------------------- | ------------------------------- |
| `--p-decorative-four-surface`         | ![][decorativefoursurfacelight] | ![][decorativefoursurfacedark]  |
| `--p-decorative-four-surface-inverse` | ![][decorativefoursurfacedark]  | ![][decorativefoursurfacelight] |
| `--p-decorative-four-surface-light`   | ![][decorativefoursurfacelight] | ![][decorativefoursurfacelight] |
| `--p-decorative-four-surface-dark`    | ![][decorativefoursurfacedark]  | ![][decorativefoursurfacedark]  |

[decorativefoursurfacelight]: https://www.gifpng.com/64x32/90e0d5/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[decorativefoursurfacedark]: https://www.gifpng.com/64x32/167e7a/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `decorativeFourText`

[Back to top](#Table-of-contents)

For use as a decorative text color that is applied on a decorative surface.

| CSS variable                       | Light mode                   | Dark mode                    |
| ---------------------------------- | ---------------------------- | ---------------------------- |
| `--p-decorative-four-text`         | ![][decorativefourtextlight] | ![][decorativefourtextdark]  |
| `--p-decorative-four-text-inverse` | ![][decorativefourtextdark]  | ![][decorativefourtextlight] |
| `--p-decorative-four-text-light`   | ![][decorativefourtextlight] | ![][decorativefourtextlight] |
| `--p-decorative-four-text-dark`    | ![][decorativefourtextdark]  | ![][decorativefourtextdark]  |

[decorativefourtextlight]: https://www.gifpng.com/64x32/002e2e/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[decorativefourtextdark]: https://www.gifpng.com/64x32/ffffff/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `decorativeFiveSurface`

[Back to top](#Table-of-contents)

For use as a decorative surface color.

| CSS variable                          | Light mode                      | Dark mode                       |
| ------------------------------------- | ------------------------------- | ------------------------------- |
| `--p-decorative-five-surface`         | ![][decorativefivesurfacelight] | ![][decorativefivesurfacedark]  |
| `--p-decorative-five-surface-inverse` | ![][decorativefivesurfacedark]  | ![][decorativefivesurfacelight] |
| `--p-decorative-five-surface-light`   | ![][decorativefivesurfacelight] | ![][decorativefivesurfacelight] |
| `--p-decorative-five-surface-dark`    | ![][decorativefivesurfacedark]  | ![][decorativefivesurfacedark]  |

[decorativefivesurfacelight]: https://www.gifpng.com/64x32/fdc9d0/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[decorativefivesurfacedark]: https://www.gifpng.com/64x32/c13357/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---

### `decorativeFiveText`

[Back to top](#Table-of-contents)

For use as a decorative text color that is applied on a decorative surface.

| CSS variable                       | Light mode                   | Dark mode                    |
| ---------------------------------- | ---------------------------- | ---------------------------- |
| `--p-decorative-five-text`         | ![][decorativefivetextlight] | ![][decorativefivetextdark]  |
| `--p-decorative-five-text-inverse` | ![][decorativefivetextdark]  | ![][decorativefivetextlight] |
| `--p-decorative-five-text-light`   | ![][decorativefivetextlight] | ![][decorativefivetextlight] |
| `--p-decorative-five-text-dark`    | ![][decorativefivetextdark]  | ![][decorativefivetextdark]  |

[decorativefivetextlight]: https://www.gifpng.com/64x32/4e0e1f/FFFFFF?border-width=8&border-type=rectangle&border-color=fafafa&text=%20
[decorativefivetextdark]: https://www.gifpng.com/64x32/ffffff/FFFFFF?border-width=8&border-type=rectangle&border-color=0c0d0e&text=%20

---
