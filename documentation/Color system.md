# Color system

⚠️ The color system is currently an unstable API, and is subject to change in non-major releases of Polaris react. Please use with caution.

## Table of contents

- [surface](#surface)
  - [surface](#surface), [surfaceBackground](#surfaceBackground), [surfaceForeground](#surfaceForeground), [surfaceForegroundSubdued](#surfaceForegroundSubdued), [surfaceHovered](#surfaceHovered), [surfacePressed](#surfacePressed), [backdrop](#backdrop), [shadowFromAmbientLight](#shadowFromAmbientLight), [shadowFromDirectLight](#shadowFromDirectLight),
- [onSurface](#onSurface)
  - [onSurface](#onSurface), [borderOnSurface](#borderOnSurface), [borderDisabledOnSurface](#borderDisabledOnSurface), [borderSubduedOnSurface](#borderSubduedOnSurface), [iconOnSurface](#iconOnSurface), [iconDisabledOnSurface](#iconDisabledOnSurface), [iconSubduedOnSurface](#iconSubduedOnSurface), [textOnSurface](#textOnSurface), [textDisabledOnSurface](#textDisabledOnSurface), [textSubduedOnSurface](#textSubduedOnSurface),
- [interactive](#interactive)
  - [interactive](#interactive), [interactiveAction](#interactiveAction), [interactiveActionDisabled](#interactiveActionDisabled), [interactiveActionHovered](#interactiveActionHovered), [interactiveActionSubdued](#interactiveActionSubdued), [interactiveActionPressed](#interactiveActionPressed), [interactiveFocus](#interactiveFocus), [interactiveSelected](#interactiveSelected), [interactiveSelectedHovered](#interactiveSelectedHovered), [interactiveSelectedPressed](#interactiveSelectedPressed),
- [neutral](#neutral)
  - [neutral](#neutral), [neutralAction](#neutralAction), [neutralActionDisabled](#neutralActionDisabled), [neutralActionHovered](#neutralActionHovered), [neutralActionPressed](#neutralActionPressed),
- [primary](#primary)
  - [primary](#primary), [primaryAction](#primaryAction), [primaryActionDisabled](#primaryActionDisabled), [primaryActionHovered](#primaryActionHovered), [primaryActionPressed](#primaryActionPressed), [iconOnPrimary](#iconOnPrimary), [iconSubduedOnPrimary](#iconSubduedOnPrimary), [iconDisabledOnPrimary](#iconDisabledOnPrimary), [textOnPrimary](#textOnPrimary), [textSubduedOnPrimary](#textSubduedOnPrimary), [textDisabledOnPrimary](#textDisabledOnPrimary), [primarySelected](#primarySelected), [primarySelectedHovered](#primarySelectedHovered), [primarySelectedPressed](#primarySelectedPressed),
- [critical](#critical)
  - [critical](#critical), [criticalBorder](#criticalBorder), [criticalBorderDisabled](#criticalBorderDisabled), [criticalIcon](#criticalIcon), [criticalSurface](#criticalSurface), [criticalSurfaceSubdued](#criticalSurfaceSubdued), [criticalSurfaceSubduedHovered](#criticalSurfaceSubduedHovered), [criticalSurfaceSubduedPressed](#criticalSurfaceSubduedPressed), [criticalText](#criticalText), [criticalAction](#criticalAction), [criticalActionDisabled](#criticalActionDisabled), [criticalActionHovered](#criticalActionHovered), [criticalActionPressed](#criticalActionPressed), [criticalLink](#criticalLink), [criticalLinkDisabled](#criticalLinkDisabled), [criticalLinkHovered](#criticalLinkHovered), [criticalLinkPressed](#criticalLinkPressed),
- [warning](#warning)
  - [warning](#warning), [warningBorder](#warningBorder), [warningIcon](#warningIcon), [warningSurface](#warningSurface), [warningSurfaceSubdued](#warningSurfaceSubdued), [warningText](#warningText),
- [highlight](#highlight)
  - [highlight](#highlight), [highlightBorder](#highlightBorder), [highlightIcon](#highlightIcon), [highlightSurface](#highlightSurface), [highlightSurfaceSubdued](#highlightSurfaceSubdued), [highlightext](#highlightext),
- [success](#success)
  - [success](#success), [successBorder](#successBorder), [successIcon](#successIcon), [successSurface](#successSurface), [successSurfaceSubdued](#successSurfaceSubdued), [successText](#successText),
- [decorative](#decorative)
  - [decorativeOneSurface](#decorativeOneSurface), [decorativeOneText](#decorativeOneText), [decorativeTwoSurface](#decorativeTwoSurface), [decorativeTwoText](#decorativeTwoText), [decorativeThreeSurface](#decorativeThreeSurface), [decorativeThreeText](#decorativeThreeText), [decorativeFourSurface](#decorativeFourSurface), [decorativeFourText](#decorativeFourText), [decorativeFiveSurface](#decorativeFiveSurface), [decorativeFiveText](#decorativeFiveText),

## surface

The surface role is used for the backgrounds of the UI. In light mode, surface colors are nearly white, while in dark mode, surface colors are nearly black. The color passed to the surface role impacts the rest of the color roles and their variants, adjusting them for light or dark contexts.

### surface [↑](#Table-of-contents)

While use directly in our components is discouraged, the base variant is unmodified from the original role input color.

| CSS variable  | Light mode        | Dark mode        |
| ------------- | ----------------- | ---------------- |
| `--p-surface` | ![][surfacelight] | ![][surfacedark] |

- `--p-surface-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-surface-light`: returns the fixed light value regardless of mode
- `--p-surface-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-surface-inverse` | ![][surfaceDark]  | ![][surfaceLight] |
  | `--p-surface-light`   | ![][surfaceLight] | ![][surfaceLight] |
  | `--p-surface-dark`    | ![][surfaceDark]  | ![][surfaceDark]  |
  -->

[surfacelight]: https://www.gifpng.com/128x96/fafafa/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[surfacedark]: https://www.gifpng.com/128x96/111213/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### surfaceBackground [↑](#Table-of-contents)

For use in the background of our UIs as a background color, in components such as Page and Frame backgrounds.

| CSS variable             | Light mode                  | Dark mode                  |
| ------------------------ | --------------------------- | -------------------------- |
| `--p-surface-background` | ![][surfacebackgroundlight] | ![][surfacebackgrounddark] |

- `--p-surface-background-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-surface-background-light`: returns the fixed light value regardless of mode
- `--p-surface-background-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-surface-background-inverse` | ![][surfaceBackgroundDark]  | ![][surfaceBackgroundLight] |
  | `--p-surface-background-light`   | ![][surfaceBackgroundLight] | ![][surfaceBackgroundLight] |
  | `--p-surface-background-dark`    | ![][surfaceBackgroundDark]  | ![][surfaceBackgroundDark]  |
  -->

[surfacebackgroundlight]: https://www.gifpng.com/128x96/fafafa/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[surfacebackgrounddark]: https://www.gifpng.com/128x96/0c0d0e/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### surfaceForeground [↑](#Table-of-contents)

For use in the foreground of our UIs as a background color, in components such as Card, Modal, and Popover.

| CSS variable             | Light mode                  | Dark mode                  |
| ------------------------ | --------------------------- | -------------------------- |
| `--p-surface-foreground` | ![][surfaceforegroundlight] | ![][surfaceforegrounddark] |

- `--p-surface-foreground-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-surface-foreground-light`: returns the fixed light value regardless of mode
- `--p-surface-foreground-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-surface-foreground-inverse` | ![][surfaceForegroundDark]  | ![][surfaceForegroundLight] |
  | `--p-surface-foreground-light`   | ![][surfaceForegroundLight] | ![][surfaceForegroundLight] |
  | `--p-surface-foreground-dark`    | ![][surfaceForegroundDark]  | ![][surfaceForegroundDark]  |
  -->

[surfaceforegroundlight]: https://www.gifpng.com/128x96/ffffff/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[surfaceforegrounddark]: https://www.gifpng.com/128x96/181a1b/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### surfaceForegroundSubdued [↑](#Table-of-contents)

For use in the foreground of our UIs as a subdued background color, in components such as Card, Modal, and Popover.

| CSS variable                     | Light mode                         | Dark mode                         |
| -------------------------------- | ---------------------------------- | --------------------------------- |
| `--p-surface-foreground-subdued` | ![][surfaceforegroundsubduedlight] | ![][surfaceforegroundsubdueddark] |

- `--p-surface-foreground-subdued-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-surface-foreground-subdued-light`: returns the fixed light value regardless of mode
- `--p-surface-foreground-subdued-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-surface-foreground-subdued-inverse` | ![][surfaceForegroundSubduedDark]  | ![][surfaceForegroundSubduedLight] |
  | `--p-surface-foreground-subdued-light`   | ![][surfaceForegroundSubduedLight] | ![][surfaceForegroundSubduedLight] |
  | `--p-surface-foreground-subdued-dark`    | ![][surfaceForegroundSubduedDark]  | ![][surfaceForegroundSubduedDark]  |
  -->

[surfaceforegroundsubduedlight]: https://www.gifpng.com/128x96/f2f2f2/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[surfaceforegroundsubdueddark]: https://www.gifpng.com/128x96/1b1d1d/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### surfaceHovered [↑](#Table-of-contents)

For use as a surface color on interactive elements such as resource list items and action list items when in a hovered state.

| CSS variable          | Light mode               | Dark mode               |
| --------------------- | ------------------------ | ----------------------- |
| `--p-surface-hovered` | ![][surfacehoveredlight] | ![][surfacehovereddark] |

- `--p-surface-hovered-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-surface-hovered-light`: returns the fixed light value regardless of mode
- `--p-surface-hovered-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-surface-hovered-inverse` | ![][surfaceHoveredDark]  | ![][surfaceHoveredLight] |
  | `--p-surface-hovered-light`   | ![][surfaceHoveredLight] | ![][surfaceHoveredLight] |
  | `--p-surface-hovered-dark`    | ![][surfaceHoveredDark]  | ![][surfaceHoveredDark]  |
  -->

[surfacehoveredlight]: https://www.gifpng.com/128x96/f2f2f2/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[surfacehovereddark]: https://www.gifpng.com/128x96/2f3032/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### surfacePressed [↑](#Table-of-contents)

For use as a surface color on interactive elements such as resource list items and action list items when in a pressed state.

| CSS variable          | Light mode               | Dark mode               |
| --------------------- | ------------------------ | ----------------------- |
| `--p-surface-pressed` | ![][surfacepressedlight] | ![][surfacepresseddark] |

- `--p-surface-pressed-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-surface-pressed-light`: returns the fixed light value regardless of mode
- `--p-surface-pressed-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-surface-pressed-inverse` | ![][surfacePressedDark]  | ![][surfacePressedLight] |
  | `--p-surface-pressed-light`   | ![][surfacePressedLight] | ![][surfacePressedLight] |
  | `--p-surface-pressed-dark`    | ![][surfacePressedDark]  | ![][surfacePressedDark]  |
  -->

[surfacepressedlight]: https://www.gifpng.com/128x96/e3e3e3/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[surfacepresseddark]: https://www.gifpng.com/128x96/3d3f42/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### backdrop [↑](#Table-of-contents)

For use as the background color of the backdrop component for navigation and modal.

| CSS variable   | Light mode         | Dark mode         |
| -------------- | ------------------ | ----------------- |
| `--p-backdrop` | ![][backdroplight] | ![][backdropdark] |

[backdroplight]: https://www.gifpng.com/128x96/000000/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[backdropdark]: https://www.gifpng.com/128x96/000000/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### shadowFromAmbientLight [↑](#Table-of-contents)

For use in building shadows for popovers, cards, and modals.

| CSS variable                    | Light mode                       | Dark mode                       |
| ------------------------------- | -------------------------------- | ------------------------------- |
| `--p-shadow-from-ambient-light` | ![][shadowfromambientlightlight] | ![][shadowfromambientlightdark] |

[shadowfromambientlightlight]: https://www.gifpng.com/128x96/161717/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[shadowfromambientlightdark]: https://www.gifpng.com/128x96/161717/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### shadowFromDirectLight [↑](#Table-of-contents)

For use in building shadows for popovers, cards, and modals.

| CSS variable                   | Light mode                      | Dark mode                      |
| ------------------------------ | ------------------------------- | ------------------------------ |
| `--p-shadow-from-direct-light` | ![][shadowfromdirectlightlight] | ![][shadowfromdirectlightdark] |

[shadowfromdirectlightlight]: https://www.gifpng.com/128x96/000000/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[shadowfromdirectlightdark]: https://www.gifpng.com/128x96/000000/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

## onSurface

The onSurface role is made up of elements which appear on top of a surface, including borders, neutral icons, and text. When a light surface is provided, onSurface values will be dark. When a dark surface is provided, onSurface values will be light.

### onSurface [↑](#Table-of-contents)

While use directly in our components is discouraged, the base variant is unmodified from the original role input color.

| CSS variable     | Light mode          | Dark mode          |
| ---------------- | ------------------- | ------------------ |
| `--p-on-surface` | ![][onsurfacelight] | ![][onsurfacedark] |

[onsurfacelight]: https://www.gifpng.com/128x96/1e2124/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[onsurfacedark]: https://www.gifpng.com/128x96/1e2124/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### borderOnSurface [↑](#Table-of-contents)

For use as a border (border or interactive outline).

| CSS variable            | Light mode                | Dark mode                |
| ----------------------- | ------------------------- | ------------------------ |
| `--p-border-on-surface` | ![][borderonsurfacelight] | ![][borderonsurfacedark] |

- `--p-border-on-surface-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-border-on-surface-light`: returns the fixed light value regardless of mode
- `--p-border-on-surface-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-border-on-surface-inverse` | ![][borderOnSurfaceDark]  | ![][borderOnSurfaceLight] |
  | `--p-border-on-surface-light`   | ![][borderOnSurfaceLight] | ![][borderOnSurfaceLight] |
  | `--p-border-on-surface-dark`    | ![][borderOnSurfaceDark]  | ![][borderOnSurfaceDark]  |
  -->

[borderonsurfacelight]: https://www.gifpng.com/128x96/b1bac4/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[borderonsurfacedark]: https://www.gifpng.com/128x96/4e545a/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### borderDisabledOnSurface [↑](#Table-of-contents)

For use as a an interactive outline on disabled elements.

| CSS variable                     | Light mode                        | Dark mode                        |
| -------------------------------- | --------------------------------- | -------------------------------- |
| `--p-border-disabled-on-surface` | ![][borderdisabledonsurfacelight] | ![][borderdisabledonsurfacedark] |

- `--p-border-disabled-on-surface-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-border-disabled-on-surface-light`: returns the fixed light value regardless of mode
- `--p-border-disabled-on-surface-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-border-disabled-on-surface-inverse` | ![][borderDisabledOnSurfaceDark]  | ![][borderDisabledOnSurfaceLight] |
  | `--p-border-disabled-on-surface-light`   | ![][borderDisabledOnSurfaceLight] | ![][borderDisabledOnSurfaceLight] |
  | `--p-border-disabled-on-surface-dark`    | ![][borderDisabledOnSurfaceDark]  | ![][borderDisabledOnSurfaceDark]  |
  -->

[borderdisabledonsurfacelight]: https://www.gifpng.com/128x96/f0f2f4/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[borderdisabledonsurfacedark]: https://www.gifpng.com/128x96/a2aeb9/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### borderSubduedOnSurface [↑](#Table-of-contents)

For use as a subdued border (border or interactive outline).

| CSS variable                    | Light mode                       | Dark mode                       |
| ------------------------------- | -------------------------------- | ------------------------------- |
| `--p-border-subdued-on-surface` | ![][bordersubduedonsurfacelight] | ![][bordersubduedonsurfacedark] |

- `--p-border-subdued-on-surface-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-border-subdued-on-surface-light`: returns the fixed light value regardless of mode
- `--p-border-subdued-on-surface-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-border-subdued-on-surface-inverse` | ![][borderSubduedOnSurfaceDark]  | ![][borderSubduedOnSurfaceLight] |
  | `--p-border-subdued-on-surface-light`   | ![][borderSubduedOnSurfaceLight] | ![][borderSubduedOnSurfaceLight] |
  | `--p-border-subdued-on-surface-dark`    | ![][borderSubduedOnSurfaceDark]  | ![][borderSubduedOnSurfaceDark]  |
  -->

[bordersubduedonsurfacelight]: https://www.gifpng.com/128x96/d0d6dc/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[bordersubduedonsurfacedark]: https://www.gifpng.com/128x96/232629/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### iconOnSurface [↑](#Table-of-contents)

For use as the fill color of neutral icons.

| CSS variable          | Light mode              | Dark mode              |
| --------------------- | ----------------------- | ---------------------- |
| `--p-icon-on-surface` | ![][icononsurfacelight] | ![][icononsurfacedark] |

- `--p-icon-on-surface-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-icon-on-surface-light`: returns the fixed light value regardless of mode
- `--p-icon-on-surface-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-icon-on-surface-inverse` | ![][iconOnSurfaceDark]  | ![][iconOnSurfaceLight] |
  | `--p-icon-on-surface-light`   | ![][iconOnSurfaceLight] | ![][iconOnSurfaceLight] |
  | `--p-icon-on-surface-dark`    | ![][iconOnSurfaceDark]  | ![][iconOnSurfaceDark]  |
  -->

[icononsurfacelight]: https://www.gifpng.com/128x96/42474c/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[icononsurfacedark]: https://www.gifpng.com/128x96/f9f9fa/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### iconDisabledOnSurface [↑](#Table-of-contents)

For use as the fill color of disabled neutral icons.

| CSS variable                   | Light mode                      | Dark mode                      |
| ------------------------------ | ------------------------------- | ------------------------------ |
| `--p-icon-disabled-on-surface` | ![][icondisabledonsurfacelight] | ![][icondisabledonsurfacedark] |

- `--p-icon-disabled-on-surface-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-icon-disabled-on-surface-light`: returns the fixed light value regardless of mode
- `--p-icon-disabled-on-surface-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-icon-disabled-on-surface-inverse` | ![][iconDisabledOnSurfaceDark]  | ![][iconDisabledOnSurfaceLight] |
  | `--p-icon-disabled-on-surface-light`   | ![][iconDisabledOnSurfaceLight] | ![][iconDisabledOnSurfaceLight] |
  | `--p-icon-disabled-on-surface-dark`    | ![][iconDisabledOnSurfaceDark]  | ![][iconDisabledOnSurfaceDark]  |
  -->

[icondisabledonsurfacelight]: https://www.gifpng.com/128x96/9ba6b0/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[icondisabledonsurfacedark]: https://www.gifpng.com/128x96/b1bac4/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### iconSubduedOnSurface [↑](#Table-of-contents)

For use as the fill color of subdued neutral icons.

| CSS variable                  | Light mode                     | Dark mode                     |
| ----------------------------- | ------------------------------ | ----------------------------- |
| `--p-icon-subdued-on-surface` | ![][iconsubduedonsurfacelight] | ![][iconsubduedonsurfacedark] |

- `--p-icon-subdued-on-surface-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-icon-subdued-on-surface-light`: returns the fixed light value regardless of mode
- `--p-icon-subdued-on-surface-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-icon-subdued-on-surface-inverse` | ![][iconSubduedOnSurfaceDark]  | ![][iconSubduedOnSurfaceLight] |
  | `--p-icon-subdued-on-surface-light`   | ![][iconSubduedOnSurfaceLight] | ![][iconSubduedOnSurfaceLight] |
  | `--p-icon-subdued-on-surface-dark`    | ![][iconSubduedOnSurfaceDark]  | ![][iconSubduedOnSurfaceDark]  |
  -->

[iconsubduedonsurfacelight]: https://www.gifpng.com/128x96/87919b/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[iconsubduedonsurfacedark]: https://www.gifpng.com/128x96/8c96a1/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### textOnSurface [↑](#Table-of-contents)

For use as a neutral text color.

| CSS variable          | Light mode              | Dark mode              |
| --------------------- | ----------------------- | ---------------------- |
| `--p-text-on-surface` | ![][textonsurfacelight] | ![][textonsurfacedark] |

- `--p-text-on-surface-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-text-on-surface-light`: returns the fixed light value regardless of mode
- `--p-text-on-surface-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-text-on-surface-inverse` | ![][textOnSurfaceDark]  | ![][textOnSurfaceLight] |
  | `--p-text-on-surface-light`   | ![][textOnSurfaceLight] | ![][textOnSurfaceLight] |
  | `--p-text-on-surface-dark`    | ![][textOnSurfaceDark]  | ![][textOnSurfaceDark]  |
  -->

[textonsurfacelight]: https://www.gifpng.com/128x96/1e2124/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[textonsurfacedark]: https://www.gifpng.com/128x96/ffffff/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### textDisabledOnSurface [↑](#Table-of-contents)

For use as a disabled neutral text color.

| CSS variable                   | Light mode                      | Dark mode                      |
| ------------------------------ | ------------------------------- | ------------------------------ |
| `--p-text-disabled-on-surface` | ![][textdisabledonsurfacelight] | ![][textdisabledonsurfacedark] |

- `--p-text-disabled-on-surface-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-text-disabled-on-surface-light`: returns the fixed light value regardless of mode
- `--p-text-disabled-on-surface-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-text-disabled-on-surface-inverse` | ![][textDisabledOnSurfaceDark]  | ![][textDisabledOnSurfaceLight] |
  | `--p-text-disabled-on-surface-light`   | ![][textDisabledOnSurfaceLight] | ![][textDisabledOnSurfaceLight] |
  | `--p-text-disabled-on-surface-dark`    | ![][textDisabledOnSurfaceDark]  | ![][textDisabledOnSurfaceDark]  |
  -->

[textdisabledonsurfacelight]: https://www.gifpng.com/128x96/8a949e/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[textdisabledonsurfacedark]: https://www.gifpng.com/128x96/6f7880/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### textSubduedOnSurface [↑](#Table-of-contents)

For use as a subdued neutral text color.

| CSS variable                  | Light mode                     | Dark mode                     |
| ----------------------------- | ------------------------------ | ----------------------------- |
| `--p-text-subdued-on-surface` | ![][textsubduedonsurfacelight] | ![][textsubduedonsurfacedark] |

- `--p-text-subdued-on-surface-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-text-subdued-on-surface-light`: returns the fixed light value regardless of mode
- `--p-text-subdued-on-surface-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-text-subdued-on-surface-inverse` | ![][textSubduedOnSurfaceDark]  | ![][textSubduedOnSurfaceLight] |
  | `--p-text-subdued-on-surface-light`   | ![][textSubduedOnSurfaceLight] | ![][textSubduedOnSurfaceLight] |
  | `--p-text-subdued-on-surface-dark`    | ![][textSubduedOnSurfaceDark]  | ![][textSubduedOnSurfaceDark]  |
  -->

[textsubduedonsurfacelight]: https://www.gifpng.com/128x96/53595f/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[textsubduedonsurfacedark]: https://www.gifpng.com/128x96/8c96a1/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

## interactive

The interactive role is used to express interactivity in components. It is used in links, as an indicator of focus, and as an indicator of selected interactive states.

### interactive [↑](#Table-of-contents)

While use directly in our components is discouraged, the base variant is unmodified from the original role input color.

| CSS variable      | Light mode            | Dark mode            |
| ----------------- | --------------------- | -------------------- |
| `--p-interactive` | ![][interactivelight] | ![][interactivedark] |

[interactivelight]: https://www.gifpng.com/128x96/0870d9/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[interactivedark]: https://www.gifpng.com/128x96/0870d9/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### interactiveAction [↑](#Table-of-contents)

Used for links and plain buttons.

| CSS variable             | Light mode                  | Dark mode                  |
| ------------------------ | --------------------------- | -------------------------- |
| `--p-interactive-action` | ![][interactiveactionlight] | ![][interactiveactiondark] |

- `--p-interactive-action-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-interactive-action-light`: returns the fixed light value regardless of mode
- `--p-interactive-action-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-interactive-action-inverse` | ![][interactiveActionDark]  | ![][interactiveActionLight] |
  | `--p-interactive-action-light`   | ![][interactiveActionLight] | ![][interactiveActionLight] |
  | `--p-interactive-action-dark`    | ![][interactiveActionDark]  | ![][interactiveActionDark]  |
  -->

[interactiveactionlight]: https://www.gifpng.com/128x96/0769ca/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[interactiveactiondark]: https://www.gifpng.com/128x96/679cfe/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### interactiveActionDisabled [↑](#Table-of-contents)

Used for disabled links and plain buttons.

| CSS variable                      | Light mode                          | Dark mode                          |
| --------------------------------- | ----------------------------------- | ---------------------------------- |
| `--p-interactive-action-disabled` | ![][interactiveactiondisabledlight] | ![][interactiveactiondisableddark] |

- `--p-interactive-action-disabled-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-interactive-action-disabled-light`: returns the fixed light value regardless of mode
- `--p-interactive-action-disabled-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-interactive-action-disabled-inverse` | ![][interactiveActionDisabledDark]  | ![][interactiveActionDisabledLight] |
  | `--p-interactive-action-disabled-light`   | ![][interactiveActionDisabledLight] | ![][interactiveActionDisabledLight] |
  | `--p-interactive-action-disabled-dark`    | ![][interactiveActionDisabledDark]  | ![][interactiveActionDisabledDark]  |
  -->

[interactiveactiondisabledlight]: https://www.gifpng.com/128x96/348cfe/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[interactiveactiondisableddark]: https://www.gifpng.com/128x96/0663c1/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### interactiveActionHovered [↑](#Table-of-contents)

Used for hovered links and plain buttons.

| CSS variable                     | Light mode                         | Dark mode                         |
| -------------------------------- | ---------------------------------- | --------------------------------- |
| `--p-interactive-action-hovered` | ![][interactiveactionhoveredlight] | ![][interactiveactionhovereddark] |

- `--p-interactive-action-hovered-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-interactive-action-hovered-light`: returns the fixed light value regardless of mode
- `--p-interactive-action-hovered-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-interactive-action-hovered-inverse` | ![][interactiveActionHoveredDark]  | ![][interactiveActionHoveredLight] |
  | `--p-interactive-action-hovered-light`   | ![][interactiveActionHoveredLight] | ![][interactiveActionHoveredLight] |
  | `--p-interactive-action-hovered-dark`    | ![][interactiveActionHoveredDark]  | ![][interactiveActionHoveredDark]  |
  -->

[interactiveactionhoveredlight]: https://www.gifpng.com/128x96/0557a8/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[interactiveactionhovereddark]: https://www.gifpng.com/128x96/81a8fe/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### interactiveActionSubdued [↑](#Table-of-contents)

Used for subdued links and plain buttons.

| CSS variable                     | Light mode                         | Dark mode                         |
| -------------------------------- | ---------------------------------- | --------------------------------- |
| `--p-interactive-action-subdued` | ![][interactiveactionsubduedlight] | ![][interactiveactionsubdueddark] |

- `--p-interactive-action-subdued-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-interactive-action-subdued-light`: returns the fixed light value regardless of mode
- `--p-interactive-action-subdued-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-interactive-action-subdued-inverse` | ![][interactiveActionSubduedDark]  | ![][interactiveActionSubduedLight] |
  | `--p-interactive-action-subdued-light`   | ![][interactiveActionSubduedLight] | ![][interactiveActionSubduedLight] |
  | `--p-interactive-action-subdued-dark`    | ![][interactiveActionSubduedDark]  | ![][interactiveActionSubduedDark]  |
  -->

[interactiveactionsubduedlight]: https://www.gifpng.com/128x96/0878e7/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[interactiveactionsubdueddark]: https://www.gifpng.com/128x96/0873dd/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### interactiveActionPressed [↑](#Table-of-contents)

Used for pressed links and plain buttons.

| CSS variable                     | Light mode                         | Dark mode                         |
| -------------------------------- | ---------------------------------- | --------------------------------- |
| `--p-interactive-action-pressed` | ![][interactiveactionpressedlight] | ![][interactiveactionpresseddark] |

- `--p-interactive-action-pressed-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-interactive-action-pressed-light`: returns the fixed light value regardless of mode
- `--p-interactive-action-pressed-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-interactive-action-pressed-inverse` | ![][interactiveActionPressedDark]  | ![][interactiveActionPressedLight] |
  | `--p-interactive-action-pressed-light`   | ![][interactiveActionPressedLight] | ![][interactiveActionPressedLight] |
  | `--p-interactive-action-pressed-dark`    | ![][interactiveActionPressedDark]  | ![][interactiveActionPressedDark]  |
  -->

[interactiveactionpressedlight]: https://www.gifpng.com/128x96/034891/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[interactiveactionpresseddark]: https://www.gifpng.com/128x96/9ab8fe/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### interactiveFocus [↑](#Table-of-contents)

For use in the focus ring on interactive elements.

| CSS variable            | Light mode                 | Dark mode                 |
| ----------------------- | -------------------------- | ------------------------- |
| `--p-interactive-focus` | ![][interactivefocuslight] | ![][interactivefocusdark] |

- `--p-interactive-focus-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-interactive-focus-light`: returns the fixed light value regardless of mode
- `--p-interactive-focus-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-interactive-focus-inverse` | ![][interactiveFocusDark]  | ![][interactiveFocusLight] |
  | `--p-interactive-focus-light`   | ![][interactiveFocusLight] | ![][interactiveFocusLight] |
  | `--p-interactive-focus-dark`    | ![][interactiveFocusDark]  | ![][interactiveFocusDark]  |
  -->

[interactivefocuslight]: https://www.gifpng.com/128x96/348cfe/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[interactivefocusdark]: https://www.gifpng.com/128x96/0663c1/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### interactiveSelected [↑](#Table-of-contents)

For use as a surface color in selected interactive elements, in components such as option list and resource list.

| CSS variable               | Light mode                    | Dark mode                    |
| -------------------------- | ----------------------------- | ---------------------------- |
| `--p-interactive-selected` | ![][interactiveselectedlight] | ![][interactiveselecteddark] |

- `--p-interactive-selected-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-interactive-selected-light`: returns the fixed light value regardless of mode
- `--p-interactive-selected-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-interactive-selected-inverse` | ![][interactiveSelectedDark]  | ![][interactiveSelectedLight] |
  | `--p-interactive-selected-light`   | ![][interactiveSelectedLight] | ![][interactiveSelectedLight] |
  | `--p-interactive-selected-dark`    | ![][interactiveSelectedDark]  | ![][interactiveSelectedDark]  |
  -->

[interactiveselectedlight]: https://www.gifpng.com/128x96/f0f3ff/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[interactiveselecteddark]: https://www.gifpng.com/128x96/000e24/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### interactiveSelectedHovered [↑](#Table-of-contents)

For use as a surface color in selected interactive elements that are hovered, in components such as option list and resource list.

| CSS variable                       | Light mode                           | Dark mode                           |
| ---------------------------------- | ------------------------------------ | ----------------------------------- |
| `--p-interactive-selected-hovered` | ![][interactiveselectedhoveredlight] | ![][interactiveselectedhovereddark] |

- `--p-interactive-selected-hovered-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-interactive-selected-hovered-light`: returns the fixed light value regardless of mode
- `--p-interactive-selected-hovered-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-interactive-selected-hovered-inverse` | ![][interactiveSelectedHoveredDark]  | ![][interactiveSelectedHoveredLight] |
  | `--p-interactive-selected-hovered-light`   | ![][interactiveSelectedHoveredLight] | ![][interactiveSelectedHoveredLight] |
  | `--p-interactive-selected-hovered-dark`    | ![][interactiveSelectedHoveredDark]  | ![][interactiveSelectedHoveredDark]  |
  -->

[interactiveselectedhoveredlight]: https://www.gifpng.com/128x96/d6e0ff/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[interactiveselectedhovereddark]: https://www.gifpng.com/128x96/011d41/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### interactiveSelectedPressed [↑](#Table-of-contents)

For use as a surface color in selected interactive elements that are pressed, in components such as option list and resource list.

| CSS variable                       | Light mode                           | Dark mode                           |
| ---------------------------------- | ------------------------------------ | ----------------------------------- |
| `--p-interactive-selected-pressed` | ![][interactiveselectedpressedlight] | ![][interactiveselectedpresseddark] |

- `--p-interactive-selected-pressed-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-interactive-selected-pressed-light`: returns the fixed light value regardless of mode
- `--p-interactive-selected-pressed-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-interactive-selected-pressed-inverse` | ![][interactiveSelectedPressedDark]  | ![][interactiveSelectedPressedLight] |
  | `--p-interactive-selected-pressed-light`   | ![][interactiveSelectedPressedLight] | ![][interactiveSelectedPressedLight] |
  | `--p-interactive-selected-pressed-dark`    | ![][interactiveSelectedPressedDark]  | ![][interactiveSelectedPressedDark]  |
  -->

[interactiveselectedpressedlight]: https://www.gifpng.com/128x96/b8cbff/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[interactiveselectedpresseddark]: https://www.gifpng.com/128x96/012b5b/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

## neutral

A neutral interactive color role, for use in secondary and tertiary buttons as a background color, as well as in form elements as a background color.

### neutral [↑](#Table-of-contents)

While use directly in our components is discouraged, the base variant is unmodified from the original role input color.

| CSS variable  | Light mode        | Dark mode        |
| ------------- | ----------------- | ---------------- |
| `--p-neutral` | ![][neutrallight] | ![][neutraldark] |

[neutrallight]: https://www.gifpng.com/128x96/eaeaeb/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[neutraldark]: https://www.gifpng.com/128x96/eaeaeb/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### neutralAction [↑](#Table-of-contents)

Used for secondary buttons and tertiary buttons, as well as in form elements as a background color and pontentially other neutral surfaces.

| CSS variable         | Light mode              | Dark mode              |
| -------------------- | ----------------------- | ---------------------- |
| `--p-neutral-action` | ![][neutralactionlight] | ![][neutralactiondark] |

- `--p-neutral-action-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-neutral-action-light`: returns the fixed light value regardless of mode
- `--p-neutral-action-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-neutral-action-inverse` | ![][neutralActionDark]  | ![][neutralActionLight] |
  | `--p-neutral-action-light`   | ![][neutralActionLight] | ![][neutralActionLight] |
  | `--p-neutral-action-dark`    | ![][neutralActionDark]  | ![][neutralActionDark]  |
  -->

[neutralactionlight]: https://www.gifpng.com/128x96/eaeaeb/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[neutralactiondark]: https://www.gifpng.com/128x96/35353b/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### neutralActionDisabled [↑](#Table-of-contents)

Used as a disabled state for secondary buttons

| CSS variable                  | Light mode                      | Dark mode                      |
| ----------------------------- | ------------------------------- | ------------------------------ |
| `--p-neutral-action-disabled` | ![][neutralactiondisabledlight] | ![][neutralactiondisableddark] |

- `--p-neutral-action-disabled-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-neutral-action-disabled-light`: returns the fixed light value regardless of mode
- `--p-neutral-action-disabled-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-neutral-action-disabled-inverse` | ![][neutralActionDisabledDark]  | ![][neutralActionDisabledLight] |
  | `--p-neutral-action-disabled-light`   | ![][neutralActionDisabledLight] | ![][neutralActionDisabledLight] |
  | `--p-neutral-action-disabled-dark`    | ![][neutralActionDisabledDark]  | ![][neutralActionDisabledDark]  |
  -->

[neutralactiondisabledlight]: https://www.gifpng.com/128x96/ededed/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[neutralactiondisableddark]: https://www.gifpng.com/128x96/222226/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### neutralActionHovered [↑](#Table-of-contents)

Used as a hovered state for secondary buttons

| CSS variable                 | Light mode                     | Dark mode                     |
| ---------------------------- | ------------------------------ | ----------------------------- |
| `--p-neutral-action-hovered` | ![][neutralactionhoveredlight] | ![][neutralactionhovereddark] |

- `--p-neutral-action-hovered-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-neutral-action-hovered-light`: returns the fixed light value regardless of mode
- `--p-neutral-action-hovered-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-neutral-action-hovered-inverse` | ![][neutralActionHoveredDark]  | ![][neutralActionHoveredLight] |
  | `--p-neutral-action-hovered-light`   | ![][neutralActionHoveredLight] | ![][neutralActionHoveredLight] |
  | `--p-neutral-action-hovered-dark`    | ![][neutralActionHoveredDark]  | ![][neutralActionHoveredDark]  |
  -->

[neutralactionhoveredlight]: https://www.gifpng.com/128x96/e2e2e4/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[neutralactionhovereddark]: https://www.gifpng.com/128x96/3a3a40/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### neutralActionPressed [↑](#Table-of-contents)

Used as a pressed state for secondary buttons

| CSS variable                 | Light mode                     | Dark mode                     |
| ---------------------------- | ------------------------------ | ----------------------------- |
| `--p-neutral-action-pressed` | ![][neutralactionpressedlight] | ![][neutralactionpresseddark] |

- `--p-neutral-action-pressed-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-neutral-action-pressed-light`: returns the fixed light value regardless of mode
- `--p-neutral-action-pressed-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-neutral-action-pressed-inverse` | ![][neutralActionPressedDark]  | ![][neutralActionPressedLight] |
  | `--p-neutral-action-pressed-light`   | ![][neutralActionPressedLight] | ![][neutralActionPressedLight] |
  | `--p-neutral-action-pressed-dark`    | ![][neutralActionPressedDark]  | ![][neutralActionPressedDark]  |
  -->

[neutralactionpressedlight]: https://www.gifpng.com/128x96/dadadc/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[neutralactionpresseddark]: https://www.gifpng.com/128x96/5b5b62/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

## primary

A primary interactive color, for use in primary buttons as a background color. Also used in navigation and tabs for icons, and for a surface color when in a selected state.

### primary [↑](#Table-of-contents)

While use directly in our components is discouraged, the base variant is unmodified from the original role input color.

| CSS variable  | Light mode        | Dark mode        |
| ------------- | ----------------- | ---------------- |
| `--p-primary` | ![][primarylight] | ![][primarydark] |

[primarylight]: https://www.gifpng.com/128x96/008060/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[primarydark]: https://www.gifpng.com/128x96/008060/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### primaryAction [↑](#Table-of-contents)

Used as the background color for primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.

| CSS variable         | Light mode              | Dark mode              |
| -------------------- | ----------------------- | ---------------------- |
| `--p-primary-action` | ![][primaryactionlight] | ![][primaryactiondark] |

[primaryactionlight]: https://www.gifpng.com/128x96/008060/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[primaryactiondark]: https://www.gifpng.com/128x96/008060/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### primaryActionDisabled [↑](#Table-of-contents)

Used as the background color for disabled primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.

| CSS variable                  | Light mode                      | Dark mode                      |
| ----------------------------- | ------------------------------- | ------------------------------ |
| `--p-primary-action-disabled` | ![][primaryactiondisabledlight] | ![][primaryactiondisableddark] |

[primaryactiondisabledlight]: https://www.gifpng.com/128x96/005741/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[primaryactiondisableddark]: https://www.gifpng.com/128x96/005741/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### primaryActionHovered [↑](#Table-of-contents)

Used as the background color for hovered primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.

| CSS variable                 | Light mode                     | Dark mode                     |
| ---------------------------- | ------------------------------ | ----------------------------- |
| `--p-primary-action-hovered` | ![][primaryactionhoveredlight] | ![][primaryactionhovereddark] |

- `--p-primary-action-hovered-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-primary-action-hovered-light`: returns the fixed light value regardless of mode
- `--p-primary-action-hovered-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-primary-action-hovered-inverse` | ![][primaryActionHoveredDark]  | ![][primaryActionHoveredLight] |
  | `--p-primary-action-hovered-light`   | ![][primaryActionHoveredLight] | ![][primaryActionHoveredLight] |
  | `--p-primary-action-hovered-dark`    | ![][primaryActionHoveredDark]  | ![][primaryActionHoveredDark]  |
  -->

[primaryactionhoveredlight]: https://www.gifpng.com/128x96/007054/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[primaryactionhovereddark]: https://www.gifpng.com/128x96/00946f/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### primaryActionPressed [↑](#Table-of-contents)

Used as the background color for pressed primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.

| CSS variable                 | Light mode                     | Dark mode                     |
| ---------------------------- | ------------------------------ | ----------------------------- |
| `--p-primary-action-pressed` | ![][primaryactionpressedlight] | ![][primaryactionpresseddark] |

- `--p-primary-action-pressed-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-primary-action-pressed-light`: returns the fixed light value regardless of mode
- `--p-primary-action-pressed-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-primary-action-pressed-inverse` | ![][primaryActionPressedDark]  | ![][primaryActionPressedLight] |
  | `--p-primary-action-pressed-light`   | ![][primaryActionPressedLight] | ![][primaryActionPressedLight] |
  | `--p-primary-action-pressed-dark`    | ![][primaryActionPressedDark]  | ![][primaryActionPressedDark]  |
  -->

[primaryactionpressedlight]: https://www.gifpng.com/128x96/00664d/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[primaryactionpresseddark]: https://www.gifpng.com/128x96/00a37a/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### iconOnPrimary [↑](#Table-of-contents)

For use as a fill color for icons on primary actions. Not for use in icons on navigation and tabs.

| CSS variable          | Light mode              | Dark mode              |
| --------------------- | ----------------------- | ---------------------- |
| `--p-icon-on-primary` | ![][icononprimarylight] | ![][icononprimarydark] |

[icononprimarylight]: https://www.gifpng.com/128x96/e5fff4/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[icononprimarydark]: https://www.gifpng.com/128x96/e5fff4/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### iconSubduedOnPrimary [↑](#Table-of-contents)

For use as a fill color for icons on subdued primary actions. Not for use in icons on navigation and tabs.

| CSS variable                  | Light mode                     | Dark mode                     |
| ----------------------------- | ------------------------------ | ----------------------------- |
| `--p-icon-subdued-on-primary` | ![][iconsubduedonprimarylight] | ![][iconsubduedonprimarydark] |

[iconsubduedonprimarylight]: https://www.gifpng.com/128x96/00fac0/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[iconsubduedonprimarydark]: https://www.gifpng.com/128x96/00fac0/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### iconDisabledOnPrimary [↑](#Table-of-contents)

For use as a fill color for icons on disabled primary actions. Not for use in icons on navigation and tabs.

| CSS variable                   | Light mode                      | Dark mode                      |
| ------------------------------ | ------------------------------- | ------------------------------ |
| `--p-icon-disabled-on-primary` | ![][icondisabledonprimarylight] | ![][icondisabledonprimarydark] |

[icondisabledonprimarylight]: https://www.gifpng.com/128x96/00dba4/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[icondisabledonprimarydark]: https://www.gifpng.com/128x96/00dba4/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### textOnPrimary [↑](#Table-of-contents)

For use as a text color on primary actions. Not for use in text on navigation and tabs.

| CSS variable          | Light mode              | Dark mode              |
| --------------------- | ----------------------- | ---------------------- |
| `--p-text-on-primary` | ![][textonprimarylight] | ![][textonprimarydark] |

[textonprimarylight]: https://www.gifpng.com/128x96/ffffff/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[textonprimarydark]: https://www.gifpng.com/128x96/ffffff/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### textSubduedOnPrimary [↑](#Table-of-contents)

For use as a text color on subdued primary actions. Not for use in text on navigation and tabs.

| CSS variable                  | Light mode                     | Dark mode                     |
| ----------------------------- | ------------------------------ | ----------------------------- |
| `--p-text-subdued-on-primary` | ![][textsubduedonprimarylight] | ![][textsubduedonprimarydark] |

[textsubduedonprimarylight]: https://www.gifpng.com/128x96/33ffc5/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[textsubduedonprimarydark]: https://www.gifpng.com/128x96/33ffc5/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### textDisabledOnPrimary [↑](#Table-of-contents)

For use as a text color on disabled primary actions. Not for use in text on navigation and tabs.

| CSS variable                   | Light mode                      | Dark mode                      |
| ------------------------------ | ------------------------------- | ------------------------------ |
| `--p-text-disabled-on-primary` | ![][textdisabledonprimarylight] | ![][textdisabledonprimarydark] |

[textdisabledonprimarylight]: https://www.gifpng.com/128x96/33ffc5/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[textdisabledonprimarydark]: https://www.gifpng.com/128x96/33ffc5/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### primarySelected [↑](#Table-of-contents)

Used as a surface color to indicate selected interactive states in navigation and tabs.

| CSS variable           | Light mode                | Dark mode                |
| ---------------------- | ------------------------- | ------------------------ |
| `--p-primary-selected` | ![][primaryselectedlight] | ![][primaryselecteddark] |

- `--p-primary-selected-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-primary-selected-light`: returns the fixed light value regardless of mode
- `--p-primary-selected-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-primary-selected-inverse` | ![][primarySelectedDark]  | ![][primarySelectedLight] |
  | `--p-primary-selected-light`   | ![][primarySelectedLight] | ![][primarySelectedLight] |
  | `--p-primary-selected-dark`    | ![][primarySelectedDark]  | ![][primarySelectedDark]  |
  -->

[primaryselectedlight]: https://www.gifpng.com/128x96/e1f5ec/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[primaryselecteddark]: https://www.gifpng.com/128x96/0c1210/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### primarySelectedHovered [↑](#Table-of-contents)

Used as a surface color to indicate selected interactive states that are hovered in navigation and tabs.

| CSS variable                   | Light mode                       | Dark mode                       |
| ------------------------------ | -------------------------------- | ------------------------------- |
| `--p-primary-selected-hovered` | ![][primaryselectedhoveredlight] | ![][primaryselectedhovereddark] |

- `--p-primary-selected-hovered-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-primary-selected-hovered-light`: returns the fixed light value regardless of mode
- `--p-primary-selected-hovered-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-primary-selected-hovered-inverse` | ![][primarySelectedHoveredDark]  | ![][primarySelectedHoveredLight] |
  | `--p-primary-selected-hovered-light`   | ![][primarySelectedHoveredLight] | ![][primarySelectedHoveredLight] |
  | `--p-primary-selected-hovered-dark`    | ![][primarySelectedHoveredDark]  | ![][primarySelectedHoveredDark]  |
  -->

[primaryselectedhoveredlight]: https://www.gifpng.com/128x96/b3d0c3/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[primaryselectedhovereddark]: https://www.gifpng.com/128x96/272f2b/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### primarySelectedPressed [↑](#Table-of-contents)

Used as a surface color to indicate selected interactive states that are pressed in navigation and tabs.

| CSS variable                   | Light mode                       | Dark mode                       |
| ------------------------------ | -------------------------------- | ------------------------------- |
| `--p-primary-selected-pressed` | ![][primaryselectedpressedlight] | ![][primaryselectedpresseddark] |

- `--p-primary-selected-pressed-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-primary-selected-pressed-light`: returns the fixed light value regardless of mode
- `--p-primary-selected-pressed-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-primary-selected-pressed-inverse` | ![][primarySelectedPressedDark]  | ![][primarySelectedPressedLight] |
  | `--p-primary-selected-pressed-light`   | ![][primarySelectedPressedLight] | ![][primarySelectedPressedLight] |
  | `--p-primary-selected-pressed-dark`    | ![][primarySelectedPressedDark]  | ![][primarySelectedPressedDark]  |
  -->

[primaryselectedpressedlight]: https://www.gifpng.com/128x96/a3bdb1/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[primaryselectedpresseddark]: https://www.gifpng.com/128x96/363f3b/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

## critical

Used to communicate destructive outcomes on interactive elements, for communicating errors, and to indicate a critical event in inert elements that requires immediate merchant action.

### critical [↑](#Table-of-contents)

While use directly in our components is discouraged, the base variant is unmodified from the original role input color.

| CSS variable   | Light mode         | Dark mode         |
| -------------- | ------------------ | ----------------- |
| `--p-critical` | ![][criticallight] | ![][criticaldark] |

[criticallight]: https://www.gifpng.com/128x96/d92b0d/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[criticaldark]: https://www.gifpng.com/128x96/d92b0d/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### criticalBorder [↑](#Table-of-contents)

For use as a border on critical components such as banners, and as an outline on interactive elements in an error state.

| CSS variable          | Light mode               | Dark mode               |
| --------------------- | ------------------------ | ----------------------- |
| `--p-critical-border` | ![][criticalborderlight] | ![][criticalborderdark] |

[criticalborderlight]: https://www.gifpng.com/128x96/e12e0e/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[criticalborderdark]: https://www.gifpng.com/128x96/e12e0e/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### criticalBorderDisabled [↑](#Table-of-contents)

For use as a disabled border on critical components such as banners, and as an outline on interactive elements in an error state.

| CSS variable                   | Light mode                       | Dark mode                       |
| ------------------------------ | -------------------------------- | ------------------------------- |
| `--p-critical-border-disabled` | ![][criticalborderdisabledlight] | ![][criticalborderdisableddark] |

- `--p-critical-border-disabled-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-critical-border-disabled-light`: returns the fixed light value regardless of mode
- `--p-critical-border-disabled-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-critical-border-disabled-inverse` | ![][criticalBorderDisabledDark]  | ![][criticalBorderDisabledLight] |
  | `--p-critical-border-disabled-light`   | ![][criticalBorderDisabledLight] | ![][criticalBorderDisabledLight] |
  | `--p-critical-border-disabled-dark`    | ![][criticalBorderDisabledDark]  | ![][criticalBorderDisabledDark]  |
  -->

[criticalborderdisabledlight]: https://www.gifpng.com/128x96/febcb9/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[criticalborderdisableddark]: https://www.gifpng.com/128x96/811704/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### criticalIcon [↑](#Table-of-contents)

For use as an icon fill color on top of critical elements.

| CSS variable        | Light mode             | Dark mode             |
| ------------------- | ---------------------- | --------------------- |
| `--p-critical-icon` | ![][criticaliconlight] | ![][criticalicondark] |

- `--p-critical-icon-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-critical-icon-light`: returns the fixed light value regardless of mode
- `--p-critical-icon-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-critical-icon-inverse` | ![][criticalIconDark]  | ![][criticalIconLight] |
  | `--p-critical-icon-light`   | ![][criticalIconLight] | ![][criticalIconLight] |
  | `--p-critical-icon-dark`    | ![][criticalIconDark]  | ![][criticalIconDark]  |
  -->

[criticaliconlight]: https://www.gifpng.com/128x96/eb300f/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[criticalicondark]: https://www.gifpng.com/128x96/d92b0d/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### criticalSurface [↑](#Table-of-contents)

For use as a surface color on critical elements including badges.

| CSS variable           | Light mode                | Dark mode                |
| ---------------------- | ------------------------- | ------------------------ |
| `--p-critical-surface` | ![][criticalsurfacelight] | ![][criticalsurfacedark] |

- `--p-critical-surface-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-critical-surface-light`: returns the fixed light value regardless of mode
- `--p-critical-surface-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-critical-surface-inverse` | ![][criticalSurfaceDark]  | ![][criticalSurfaceLight] |
  | `--p-critical-surface-light`   | ![][criticalSurfaceLight] | ![][criticalSurfaceLight] |
  | `--p-critical-surface-dark`    | ![][criticalSurfaceDark]  | ![][criticalSurfaceDark]  |
  -->

[criticalsurfacelight]: https://www.gifpng.com/128x96/fffafa/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[criticalsurfacedark]: https://www.gifpng.com/128x96/460701/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### criticalSurfaceSubdued [↑](#Table-of-contents)

For use as a subdued surface color on critical elements including banners.

| CSS variable                   | Light mode                       | Dark mode                       |
| ------------------------------ | -------------------------------- | ------------------------------- |
| `--p-critical-surface-subdued` | ![][criticalsurfacesubduedlight] | ![][criticalsurfacesubdueddark] |

- `--p-critical-surface-subdued-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-critical-surface-subdued-light`: returns the fixed light value regardless of mode
- `--p-critical-surface-subdued-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-critical-surface-subdued-inverse` | ![][criticalSurfaceSubduedDark]  | ![][criticalSurfaceSubduedLight] |
  | `--p-critical-surface-subdued-light`   | ![][criticalSurfaceSubduedLight] | ![][criticalSurfaceSubduedLight] |
  | `--p-critical-surface-subdued-dark`    | ![][criticalSurfaceSubduedDark]  | ![][criticalSurfaceSubduedDark]  |
  -->

[criticalsurfacesubduedlight]: https://www.gifpng.com/128x96/fff6f5/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[criticalsurfacesubdueddark]: https://www.gifpng.com/128x96/460701/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### criticalSurfaceSubduedHovered [↑](#Table-of-contents)

For use as a surface color on critical interactive elements including action list items in a hovered state.

| CSS variable                           | Light mode                              | Dark mode                              |
| -------------------------------------- | --------------------------------------- | -------------------------------------- |
| `--p-critical-surface-subdued-hovered` | ![][criticalsurfacesubduedhoveredlight] | ![][criticalsurfacesubduedhovereddark] |

- `--p-critical-surface-subdued-hovered-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-critical-surface-subdued-hovered-light`: returns the fixed light value regardless of mode
- `--p-critical-surface-subdued-hovered-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-critical-surface-subdued-hovered-inverse` | ![][criticalSurfaceSubduedHoveredDark]  | ![][criticalSurfaceSubduedHoveredLight] |
  | `--p-critical-surface-subdued-hovered-light`   | ![][criticalSurfaceSubduedHoveredLight] | ![][criticalSurfaceSubduedHoveredLight] |
  | `--p-critical-surface-subdued-hovered-dark`    | ![][criticalSurfaceSubduedHoveredDark]  | ![][criticalSurfaceSubduedHoveredDark]  |
  -->

[criticalsurfacesubduedhoveredlight]: https://www.gifpng.com/128x96/fee7e6/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[criticalsurfacesubduedhovereddark]: https://www.gifpng.com/128x96/431714/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### criticalSurfaceSubduedPressed [↑](#Table-of-contents)

For use as a surface color on critical interactive elements including action list items in a pressed state.

| CSS variable                           | Light mode                              | Dark mode                              |
| -------------------------------------- | --------------------------------------- | -------------------------------------- |
| `--p-critical-surface-subdued-pressed` | ![][criticalsurfacesubduedpressedlight] | ![][criticalsurfacesubduedpresseddark] |

- `--p-critical-surface-subdued-pressed-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-critical-surface-subdued-pressed-light`: returns the fixed light value regardless of mode
- `--p-critical-surface-subdued-pressed-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-critical-surface-subdued-pressed-inverse` | ![][criticalSurfaceSubduedPressedDark]  | ![][criticalSurfaceSubduedPressedLight] |
  | `--p-critical-surface-subdued-pressed-light`   | ![][criticalSurfaceSubduedPressedLight] | ![][criticalSurfaceSubduedPressedLight] |
  | `--p-critical-surface-subdued-pressed-dark`    | ![][criticalSurfaceSubduedPressedDark]  | ![][criticalSurfaceSubduedPressedDark]  |
  -->

[criticalsurfacesubduedpressedlight]: https://www.gifpng.com/128x96/fed4d2/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[criticalsurfacesubduedpresseddark]: https://www.gifpng.com/128x96/6d1103/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### criticalText [↑](#Table-of-contents)

For use as a text color in inert critical elements such as exception list. Not for use as a text color on banners and badges.

| CSS variable        | Light mode             | Dark mode             |
| ------------------- | ---------------------- | --------------------- |
| `--p-critical-text` | ![][criticaltextlight] | ![][criticaltextdark] |

- `--p-critical-text-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-critical-text-light`: returns the fixed light value regardless of mode
- `--p-critical-text-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-critical-text-inverse` | ![][criticalTextDark]  | ![][criticalTextLight] |
  | `--p-critical-text-light`   | ![][criticalTextLight] | ![][criticalTextLight] |
  | `--p-critical-text-dark`    | ![][criticalTextDark]  | ![][criticalTextDark]  |
  -->

[criticaltextlight]: https://www.gifpng.com/128x96/b42208/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[criticaltextdark]: https://www.gifpng.com/128x96/fd5849/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### criticalAction [↑](#Table-of-contents)

For use as the background color for destructive buttons, and as the background color for error toast messages.

| CSS variable          | Light mode               | Dark mode               |
| --------------------- | ------------------------ | ----------------------- |
| `--p-critical-action` | ![][criticalactionlight] | ![][criticalactiondark] |

- `--p-critical-action-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-critical-action-light`: returns the fixed light value regardless of mode
- `--p-critical-action-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-critical-action-inverse` | ![][criticalActionDark]  | ![][criticalActionLight] |
  | `--p-critical-action-light`   | ![][criticalActionLight] | ![][criticalActionLight] |
  | `--p-critical-action-dark`    | ![][criticalActionDark]  | ![][criticalActionDark]  |
  -->

[criticalactionlight]: https://www.gifpng.com/128x96/d92b0d/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[criticalactiondark]: https://www.gifpng.com/128x96/cf290c/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### criticalActionDisabled [↑](#Table-of-contents)

For use as the background color for disabled destructive buttons, and as the background color for error toast messages.

| CSS variable                   | Light mode                       | Dark mode                       |
| ------------------------------ | -------------------------------- | ------------------------------- |
| `--p-critical-action-disabled` | ![][criticalactiondisabledlight] | ![][criticalactiondisableddark] |

- `--p-critical-action-disabled-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-critical-action-disabled-light`: returns the fixed light value regardless of mode
- `--p-critical-action-disabled-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-critical-action-disabled-inverse` | ![][criticalActionDisabledDark]  | ![][criticalActionDisabledLight] |
  | `--p-critical-action-disabled-light`   | ![][criticalActionDisabledLight] | ![][criticalActionDisabledLight] |
  | `--p-critical-action-disabled-dark`    | ![][criticalActionDisabledDark]  | ![][criticalActionDisabledDark]  |
  -->

[criticalactiondisabledlight]: https://www.gifpng.com/128x96/fd4f3f/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[criticalactiondisableddark]: https://www.gifpng.com/128x96/bd250a/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### criticalActionHovered [↑](#Table-of-contents)

For use as the background color for hovered destructive buttons, and as the background color for error toast messages.

| CSS variable                  | Light mode                      | Dark mode                      |
| ----------------------------- | ------------------------------- | ------------------------------ |
| `--p-critical-action-hovered` | ![][criticalactionhoveredlight] | ![][criticalactionhovereddark] |

- `--p-critical-action-hovered-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-critical-action-hovered-light`: returns the fixed light value regardless of mode
- `--p-critical-action-hovered-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-critical-action-hovered-inverse` | ![][criticalActionHoveredDark]  | ![][criticalActionHoveredLight] |
  | `--p-critical-action-hovered-light`   | ![][criticalActionHoveredLight] | ![][criticalActionHoveredLight] |
  | `--p-critical-action-hovered-dark`    | ![][criticalActionHoveredDark]  | ![][criticalActionHoveredDark]  |
  -->

[criticalactionhoveredlight]: https://www.gifpng.com/128x96/c2260a/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[criticalactionhovereddark]: https://www.gifpng.com/128x96/e12e0e/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### criticalActionPressed [↑](#Table-of-contents)

For use as the background color for pressed destructive buttons, and as the background color for error toast messages.

| CSS variable                  | Light mode                      | Dark mode                      |
| ----------------------------- | ------------------------------- | ------------------------------ |
| `--p-critical-action-pressed` | ![][criticalactionpressedlight] | ![][criticalactionpresseddark] |

- `--p-critical-action-pressed-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-critical-action-pressed-light`: returns the fixed light value regardless of mode
- `--p-critical-action-pressed-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-critical-action-pressed-inverse` | ![][criticalActionPressedDark]  | ![][criticalActionPressedLight] |
  | `--p-critical-action-pressed-light`   | ![][criticalActionPressedLight] | ![][criticalActionPressedLight] |
  | `--p-critical-action-pressed-dark`    | ![][criticalActionPressedDark]  | ![][criticalActionPressedDark]  |
  -->

[criticalactionpressedlight]: https://www.gifpng.com/128x96/aa2008/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[criticalactionpresseddark]: https://www.gifpng.com/128x96/fd5849/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### criticalLink [↑](#Table-of-contents)

For use as a text color in destructive plain buttons, as well as a text color on destructive action list items. Not for use on critical banners and badges.

| CSS variable        | Light mode             | Dark mode             |
| ------------------- | ---------------------- | --------------------- |
| `--p-critical-link` | ![][criticallinklight] | ![][criticallinkdark] |

- `--p-critical-link-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-critical-link-light`: returns the fixed light value regardless of mode
- `--p-critical-link-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-critical-link-inverse` | ![][criticalLinkDark]  | ![][criticalLinkLight] |
  | `--p-critical-link-light`   | ![][criticalLinkLight] | ![][criticalLinkLight] |
  | `--p-critical-link-dark`    | ![][criticalLinkDark]  | ![][criticalLinkDark]  |
  -->

[criticallinklight]: https://www.gifpng.com/128x96/dd2d0e/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[criticallinkdark]: https://www.gifpng.com/128x96/fd7068/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### criticalLinkDisabled [↑](#Table-of-contents)

For use as a text color in disabled destructive plain buttons, as well as a text color on destructive action list items. Not for use on critical banners and badges.

| CSS variable                 | Light mode                     | Dark mode                     |
| ---------------------------- | ------------------------------ | ----------------------------- |
| `--p-critical-link-disabled` | ![][criticallinkdisabledlight] | ![][criticallinkdisableddark] |

- `--p-critical-link-disabled-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-critical-link-disabled-light`: returns the fixed light value regardless of mode
- `--p-critical-link-disabled-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-critical-link-disabled-inverse` | ![][criticalLinkDisabledDark]  | ![][criticalLinkDisabledLight] |
  | `--p-critical-link-disabled-light`   | ![][criticalLinkDisabledLight] | ![][criticalLinkDisabledLight] |
  | `--p-critical-link-disabled-dark`    | ![][criticalLinkDisabledDark]  | ![][criticalLinkDisabledDark]  |
  -->

[criticallinkdisabledlight]: https://www.gifpng.com/128x96/fd918b/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[criticallinkdisableddark]: https://www.gifpng.com/128x96/feada9/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### criticalLinkHovered [↑](#Table-of-contents)

For use as a text color in hovered destructive plain buttons, as well as a text color on destructive action list items. Not for use on critical banners and badges.

| CSS variable                | Light mode                    | Dark mode                    |
| --------------------------- | ----------------------------- | ---------------------------- |
| `--p-critical-link-hovered` | ![][criticallinkhoveredlight] | ![][criticallinkhovereddark] |

- `--p-critical-link-hovered-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-critical-link-hovered-light`: returns the fixed light value regardless of mode
- `--p-critical-link-hovered-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-critical-link-hovered-inverse` | ![][criticalLinkHoveredDark]  | ![][criticalLinkHoveredLight] |
  | `--p-critical-link-hovered-light`   | ![][criticalLinkHoveredLight] | ![][criticalLinkHoveredLight] |
  | `--p-critical-link-hovered-dark`    | ![][criticalLinkHoveredDark]  | ![][criticalLinkHoveredDark]  |
  -->

[criticallinkhoveredlight]: https://www.gifpng.com/128x96/cf290c/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[criticallinkhovereddark]: https://www.gifpng.com/128x96/fd8881/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### criticalLinkPressed [↑](#Table-of-contents)

For use as a text color in pressed destructive plain buttons, as well as a text color on destructive action list items. Not for use on critical banners and badges.

| CSS variable                | Light mode                    | Dark mode                    |
| --------------------------- | ----------------------------- | ---------------------------- |
| `--p-critical-link-pressed` | ![][criticallinkpressedlight] | ![][criticallinkpresseddark] |

- `--p-critical-link-pressed-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-critical-link-pressed-light`: returns the fixed light value regardless of mode
- `--p-critical-link-pressed-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-critical-link-pressed-inverse` | ![][criticalLinkPressedDark]  | ![][criticalLinkPressedLight] |
  | `--p-critical-link-pressed-light`   | ![][criticalLinkPressedLight] | ![][criticalLinkPressedLight] |
  | `--p-critical-link-pressed-dark`    | ![][criticalLinkPressedDark]  | ![][criticalLinkPressedDark]  |
  -->

[criticallinkpressedlight]: https://www.gifpng.com/128x96/680f03/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[criticallinkpresseddark]: https://www.gifpng.com/128x96/fd9e9b/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

## warning

For use as an indicator that action should be taken by merchants in components including badges, banners, and exception lists.

### warning [↑](#Table-of-contents)

While use directly in our components is discouraged, the base variant is unmodified from the original role input color.

| CSS variable  | Light mode        | Dark mode        |
| ------------- | ----------------- | ---------------- |
| `--p-warning` | ![][warninglight] | ![][warningdark] |

[warninglight]: https://www.gifpng.com/128x96/ffc252/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[warningdark]: https://www.gifpng.com/128x96/ffc252/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### warningBorder [↑](#Table-of-contents)

For use as a border on warning components such as banners.

| CSS variable         | Light mode              | Dark mode              |
| -------------------- | ----------------------- | ---------------------- |
| `--p-warning-border` | ![][warningborderlight] | ![][warningborderdark] |

- `--p-warning-border-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-warning-border-light`: returns the fixed light value regardless of mode
- `--p-warning-border-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-warning-border-inverse` | ![][warningBorderDark]  | ![][warningBorderLight] |
  | `--p-warning-border-light`   | ![][warningBorderLight] | ![][warningBorderLight] |
  | `--p-warning-border-dark`    | ![][warningBorderDark]  | ![][warningBorderDark]  |
  -->

[warningborderlight]: https://www.gifpng.com/128x96/f0b400/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[warningborderdark]: https://www.gifpng.com/128x96/997000/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### warningIcon [↑](#Table-of-contents)

For use as an icon fill color on top of warning elements.

| CSS variable       | Light mode            | Dark mode            |
| ------------------ | --------------------- | -------------------- |
| `--p-warning-icon` | ![][warningiconlight] | ![][warningicondark] |

- `--p-warning-icon-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-warning-icon-light`: returns the fixed light value regardless of mode
- `--p-warning-icon-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-warning-icon-inverse` | ![][warningIconDark]  | ![][warningIconLight] |
  | `--p-warning-icon-light`   | ![][warningIconLight] | ![][warningIconLight] |
  | `--p-warning-icon-dark`    | ![][warningIconDark]  | ![][warningIconDark]  |
  -->

[warningiconlight]: https://www.gifpng.com/128x96/cc9600/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[warningicondark]: https://www.gifpng.com/128x96/664900/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### warningSurface [↑](#Table-of-contents)

For use as a surface color on warning elements including badges.

| CSS variable          | Light mode               | Dark mode               |
| --------------------- | ------------------------ | ----------------------- |
| `--p-warning-surface` | ![][warningsurfacelight] | ![][warningsurfacedark] |

- `--p-warning-surface-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-warning-surface-light`: returns the fixed light value regardless of mode
- `--p-warning-surface-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-warning-surface-inverse` | ![][warningSurfaceDark]  | ![][warningSurfaceLight] |
  | `--p-warning-surface-light`   | ![][warningSurfaceLight] | ![][warningSurfaceLight] |
  | `--p-warning-surface-dark`    | ![][warningSurfaceDark]  | ![][warningSurfaceDark]  |
  -->

[warningsurfacelight]: https://www.gifpng.com/128x96/ffcd75/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[warningsurfacedark]: https://www.gifpng.com/128x96/997000/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### warningSurfaceSubdued [↑](#Table-of-contents)

For use as a subdued surface color on warning elements including banners.

| CSS variable                  | Light mode                      | Dark mode                      |
| ----------------------------- | ------------------------------- | ------------------------------ |
| `--p-warning-surface-subdued` | ![][warningsurfacesubduedlight] | ![][warningsurfacesubdueddark] |

- `--p-warning-surface-subdued-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-warning-surface-subdued-light`: returns the fixed light value regardless of mode
- `--p-warning-surface-subdued-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-warning-surface-subdued-inverse` | ![][warningSurfaceSubduedDark]  | ![][warningSurfaceSubduedLight] |
  | `--p-warning-surface-subdued-light`   | ![][warningSurfaceSubduedLight] | ![][warningSurfaceSubduedLight] |
  | `--p-warning-surface-subdued-dark`    | ![][warningSurfaceSubduedDark]  | ![][warningSurfaceSubduedDark]  |
  -->

[warningsurfacesubduedlight]: https://www.gifpng.com/128x96/fffcfa/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[warningsurfacesubdueddark]: https://www.gifpng.com/128x96/332300/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### warningText [↑](#Table-of-contents)

For use as a text color in inert critical elements such as exception list. Not for use as a text color on banners and badges.

| CSS variable       | Light mode            | Dark mode            |
| ------------------ | --------------------- | -------------------- |
| `--p-warning-text` | ![][warningtextlight] | ![][warningtextdark] |

- `--p-warning-text-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-warning-text-light`: returns the fixed light value regardless of mode
- `--p-warning-text-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-warning-text-inverse` | ![][warningTextDark]  | ![][warningTextLight] |
  | `--p-warning-text-light`   | ![][warningTextLight] | ![][warningTextLight] |
  | `--p-warning-text-dark`    | ![][warningTextDark]  | ![][warningTextDark]  |
  -->

[warningtextlight]: https://www.gifpng.com/128x96/5c4200/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[warningtextdark]: https://www.gifpng.com/128x96/dba100/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

## highlight

Used to highlight elements of the UI that are important for merchants, but do not require immediate action. Used in information banners and badges, indicators that draw attention to new information, bars that indicate loading or progress, and in data visualization.

### highlight [↑](#Table-of-contents)

While use directly in our components is discouraged, the base variant is unmodified from the original role input color.

| CSS variable    | Light mode          | Dark mode          |
| --------------- | ------------------- | ------------------ |
| `--p-highlight` | ![][highlightlight] | ![][highlightdark] |

[highlightlight]: https://www.gifpng.com/128x96/58d0c2/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[highlightdark]: https://www.gifpng.com/128x96/58d0c2/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### highlightBorder [↑](#Table-of-contents)

For use as a border on informational components such as banners.

| CSS variable           | Light mode                | Dark mode                |
| ---------------------- | ------------------------- | ------------------------ |
| `--p-highlight-border` | ![][highlightborderlight] | ![][highlightborderdark] |

[highlightborderlight]: https://www.gifpng.com/128x96/429e93/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[highlightborderdark]: https://www.gifpng.com/128x96/429e93/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### highlightIcon [↑](#Table-of-contents)

For use as an icon fill color on top of informational elements.

| CSS variable         | Light mode              | Dark mode              |
| -------------------- | ----------------------- | ---------------------- |
| `--p-highlight-icon` | ![][highlighticonlight] | ![][highlighticondark] |

- `--p-highlight-icon-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-highlight-icon-light`: returns the fixed light value regardless of mode
- `--p-highlight-icon-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-highlight-icon-inverse` | ![][highlightIconDark]  | ![][highlightIconLight] |
  | `--p-highlight-icon-light`   | ![][highlightIconLight] | ![][highlightIconLight] |
  | `--p-highlight-icon-dark`    | ![][highlightIconDark]  | ![][highlightIconDark]  |
  -->

[highlighticonlight]: https://www.gifpng.com/128x96/419b90/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[highlighticondark]: https://www.gifpng.com/128x96/2c6d67/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### highlightSurface [↑](#Table-of-contents)

For use as a surface color on information elements including badges.

| CSS variable            | Light mode                 | Dark mode                 |
| ----------------------- | -------------------------- | ------------------------- |
| `--p-highlight-surface` | ![][highlightsurfacelight] | ![][highlightsurfacedark] |

- `--p-highlight-surface-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-highlight-surface-light`: returns the fixed light value regardless of mode
- `--p-highlight-surface-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-highlight-surface-inverse` | ![][highlightSurfaceDark]  | ![][highlightSurfaceLight] |
  | `--p-highlight-surface-light`   | ![][highlightSurfaceLight] | ![][highlightSurfaceLight] |
  | `--p-highlight-surface-dark`    | ![][highlightSurfaceDark]  | ![][highlightSurfaceDark]  |
  -->

[highlightsurfacelight]: https://www.gifpng.com/128x96/8de2d7/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[highlightsurfacedark]: https://www.gifpng.com/128x96/00857a/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### highlightSurfaceSubdued [↑](#Table-of-contents)

For use as a surface color on information elements including banners.

| CSS variable                    | Light mode                        | Dark mode                        |
| ------------------------------- | --------------------------------- | -------------------------------- |
| `--p-highlight-surface-subdued` | ![][highlightsurfacesubduedlight] | ![][highlightsurfacesubdueddark] |

- `--p-highlight-surface-subdued-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-highlight-surface-subdued-light`: returns the fixed light value regardless of mode
- `--p-highlight-surface-subdued-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-highlight-surface-subdued-inverse` | ![][highlightSurfaceSubduedDark]  | ![][highlightSurfaceSubduedLight] |
  | `--p-highlight-surface-subdued-light`   | ![][highlightSurfaceSubduedLight] | ![][highlightSurfaceSubduedLight] |
  | `--p-highlight-surface-subdued-dark`    | ![][highlightSurfaceSubduedDark]  | ![][highlightSurfaceSubduedDark]  |
  -->

[highlightsurfacesubduedlight]: https://www.gifpng.com/128x96/f1fefc/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[highlightsurfacesubdueddark]: https://www.gifpng.com/128x96/123631/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### highlightext [↑](#Table-of-contents)

For use as a text color in inert informational elements. Not for use as a text color on banners and badges.

| CSS variable       | Light mode             | Dark mode             |
| ------------------ | ---------------------- | --------------------- |
| `--p-highlightext` | ![][highlightextlight] | ![][highlightextdark] |

- `--p-highlightext-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-highlightext-light`: returns the fixed light value regardless of mode
- `--p-highlightext-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-highlightext-inverse` | ![][highlightextDark]  | ![][highlightextLight] |
  | `--p-highlightext-light`   | ![][highlightextLight] | ![][highlightextLight] |
  | `--p-highlightext-dark`    | ![][highlightextDark]  | ![][highlightextDark]  |
  -->

[highlightextlight]: https://www.gifpng.com/128x96/071d1a/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[highlightextdark]: https://www.gifpng.com/128x96/6df8e8/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

## success

Used to indicate the result of a successful action taken by a merchant, to indicate a positive event, or to illustrate growth.

### success [↑](#Table-of-contents)

While use directly in our components is discouraged, the base variant is unmodified from the original role input color.

| CSS variable  | Light mode        | Dark mode        |
| ------------- | ----------------- | ---------------- |
| `--p-success` | ![][successlight] | ![][successdark] |

[successlight]: https://www.gifpng.com/128x96/008060/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[successdark]: https://www.gifpng.com/128x96/008060/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### successBorder [↑](#Table-of-contents)

For use as a border on success components such as banners.

| CSS variable         | Light mode              | Dark mode              |
| -------------------- | ----------------------- | ---------------------- |
| `--p-success-border` | ![][successborderlight] | ![][successborderdark] |

[successborderlight]: https://www.gifpng.com/128x96/008563/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[successborderdark]: https://www.gifpng.com/128x96/008563/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### successIcon [↑](#Table-of-contents)

For use as an icon fill color on top of success elements.

| CSS variable       | Light mode            | Dark mode            |
| ------------------ | --------------------- | -------------------- |
| `--p-success-icon` | ![][successiconlight] | ![][successicondark] |

- `--p-success-icon-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-success-icon-light`: returns the fixed light value regardless of mode
- `--p-success-icon-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-success-icon-inverse` | ![][successIconDark]  | ![][successIconLight] |
  | `--p-success-icon-light`   | ![][successIconLight] | ![][successIconLight] |
  | `--p-success-icon-dark`    | ![][successIconDark]  | ![][successIconDark]  |
  -->

[successiconlight]: https://www.gifpng.com/128x96/004231/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[successicondark]: https://www.gifpng.com/128x96/005c45/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### successSurface [↑](#Table-of-contents)

For use as a surface color on success elements including badges.

| CSS variable          | Light mode               | Dark mode               |
| --------------------- | ------------------------ | ----------------------- |
| `--p-success-surface` | ![][successsurfacelight] | ![][successsurfacedark] |

- `--p-success-surface-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-success-surface-light`: returns the fixed light value regardless of mode
- `--p-success-surface-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-success-surface-inverse` | ![][successSurfaceDark]  | ![][successSurfaceLight] |
  | `--p-success-surface-light`   | ![][successSurfaceLight] | ![][successSurfaceLight] |
  | `--p-success-surface-dark`    | ![][successSurfaceDark]  | ![][successSurfaceDark]  |
  -->

[successsurfacelight]: https://www.gifpng.com/128x96/8ae5c2/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[successsurfacedark]: https://www.gifpng.com/128x96/006b4f/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### successSurfaceSubdued [↑](#Table-of-contents)

For use as a surface color on information elements including banners.

| CSS variable                  | Light mode                      | Dark mode                      |
| ----------------------------- | ------------------------------- | ------------------------------ |
| `--p-success-surface-subdued` | ![][successsurfacesubduedlight] | ![][successsurfacesubdueddark] |

- `--p-success-surface-subdued-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-success-surface-subdued-light`: returns the fixed light value regardless of mode
- `--p-success-surface-subdued-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-success-surface-subdued-inverse` | ![][successSurfaceSubduedDark]  | ![][successSurfaceSubduedLight] |
  | `--p-success-surface-subdued-light`   | ![][successSurfaceSubduedLight] | ![][successSurfaceSubduedLight] |
  | `--p-success-surface-subdued-dark`    | ![][successSurfaceSubduedDark]  | ![][successSurfaceSubduedDark]  |
  -->

[successsurfacesubduedlight]: https://www.gifpng.com/128x96/f6fefa/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[successsurfacesubdueddark]: https://www.gifpng.com/128x96/1c352c/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### successText [↑](#Table-of-contents)

For use as a text color in inert success elements. Not for use as a text color on banners and badges.

| CSS variable       | Light mode            | Dark mode            |
| ------------------ | --------------------- | -------------------- |
| `--p-success-text` | ![][successtextlight] | ![][successtextdark] |

- `--p-success-text-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-success-text-light`: returns the fixed light value regardless of mode
- `--p-success-text-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-success-text-inverse` | ![][successTextDark]  | ![][successTextLight] |
  | `--p-success-text-light`   | ![][successTextLight] | ![][successTextLight] |
  | `--p-success-text-dark`    | ![][successTextDark]  | ![][successTextDark]  |
  -->

[successtextlight]: https://www.gifpng.com/128x96/006b4f/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[successtextdark]: https://www.gifpng.com/128x96/00a37a/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

## decorative

Used to decorate elements where color does convey a specific meaning in components like avatars

### decorativeOneSurface [↑](#Table-of-contents)

For use as a decorative surface color.

| CSS variable                 | Light mode                     | Dark mode                     |
| ---------------------------- | ------------------------------ | ----------------------------- |
| `--p-decorative-one-surface` | ![][decorativeonesurfacelight] | ![][decorativeonesurfacedark] |

- `--p-decorative-one-surface-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-decorative-one-surface-light`: returns the fixed light value regardless of mode
- `--p-decorative-one-surface-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-decorative-one-surface-inverse` | ![][decorativeOneSurfaceDark]  | ![][decorativeOneSurfaceLight] |
  | `--p-decorative-one-surface-light`   | ![][decorativeOneSurfaceLight] | ![][decorativeOneSurfaceLight] |
  | `--p-decorative-one-surface-dark`    | ![][decorativeOneSurfaceDark]  | ![][decorativeOneSurfaceDark]  |
  -->

[decorativeonesurfacelight]: https://www.gifpng.com/128x96/ffc96b/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[decorativeonesurfacedark]: https://www.gifpng.com/128x96/906709/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### decorativeOneText [↑](#Table-of-contents)

For use as a decorative text color that is applied on a decorative surface.

| CSS variable              | Light mode                  | Dark mode                  |
| ------------------------- | --------------------------- | -------------------------- |
| `--p-decorative-one-text` | ![][decorativeonetextlight] | ![][decorativeonetextdark] |

- `--p-decorative-one-text-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-decorative-one-text-light`: returns the fixed light value regardless of mode
- `--p-decorative-one-text-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-decorative-one-text-inverse` | ![][decorativeOneTextDark]  | ![][decorativeOneTextLight] |
  | `--p-decorative-one-text-light`   | ![][decorativeOneTextLight] | ![][decorativeOneTextLight] |
  | `--p-decorative-one-text-dark`    | ![][decorativeOneTextDark]  | ![][decorativeOneTextDark]  |
  -->

[decorativeonetextlight]: https://www.gifpng.com/128x96/3d2800/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[decorativeonetextdark]: https://www.gifpng.com/128x96/ffffff/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### decorativeTwoSurface [↑](#Table-of-contents)

For use as a decorative surface color.

| CSS variable                 | Light mode                     | Dark mode                     |
| ---------------------------- | ------------------------------ | ----------------------------- |
| `--p-decorative-two-surface` | ![][decorativetwosurfacelight] | ![][decorativetwosurfacedark] |

- `--p-decorative-two-surface-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-decorative-two-surface-light`: returns the fixed light value regardless of mode
- `--p-decorative-two-surface-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-decorative-two-surface-inverse` | ![][decorativeTwoSurfaceDark]  | ![][decorativeTwoSurfaceLight] |
  | `--p-decorative-two-surface-light`   | ![][decorativeTwoSurfaceLight] | ![][decorativeTwoSurfaceLight] |
  | `--p-decorative-two-surface-dark`    | ![][decorativeTwoSurfaceDark]  | ![][decorativeTwoSurfaceDark]  |
  -->

[decorativetwosurfacelight]: https://www.gifpng.com/128x96/ffc6b3/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[decorativetwosurfacedark]: https://www.gifpng.com/128x96/cc5814/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### decorativeTwoText [↑](#Table-of-contents)

For use as a decorative text color that is applied on a decorative surface.

| CSS variable              | Light mode                  | Dark mode                  |
| ------------------------- | --------------------------- | -------------------------- |
| `--p-decorative-two-text` | ![][decorativetwotextlight] | ![][decorativetwotextdark] |

- `--p-decorative-two-text-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-decorative-two-text-light`: returns the fixed light value regardless of mode
- `--p-decorative-two-text-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-decorative-two-text-inverse` | ![][decorativeTwoTextDark]  | ![][decorativeTwoTextLight] |
  | `--p-decorative-two-text-light`   | ![][decorativeTwoTextLight] | ![][decorativeTwoTextLight] |
  | `--p-decorative-two-text-dark`    | ![][decorativeTwoTextDark]  | ![][decorativeTwoTextDark]  |
  -->

[decorativetwotextlight]: https://www.gifpng.com/128x96/470b1b/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[decorativetwotextdark]: https://www.gifpng.com/128x96/ffffff/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### decorativeThreeSurface [↑](#Table-of-contents)

For use as a decorative surface color.

| CSS variable                   | Light mode                       | Dark mode                       |
| ------------------------------ | -------------------------------- | ------------------------------- |
| `--p-decorative-three-surface` | ![][decorativethreesurfacelight] | ![][decorativethreesurfacedark] |

- `--p-decorative-three-surface-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-decorative-three-surface-light`: returns the fixed light value regardless of mode
- `--p-decorative-three-surface-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-decorative-three-surface-inverse` | ![][decorativeThreeSurfaceDark]  | ![][decorativeThreeSurfaceLight] |
  | `--p-decorative-three-surface-light`   | ![][decorativeThreeSurfaceLight] | ![][decorativeThreeSurfaceLight] |
  | `--p-decorative-three-surface-dark`    | ![][decorativeThreeSurfaceDark]  | ![][decorativeThreeSurfaceDark]  |
  -->

[decorativethreesurfacelight]: https://www.gifpng.com/128x96/91e3b3/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[decorativethreesurfacedark]: https://www.gifpng.com/128x96/007a5a/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### decorativeThreeText [↑](#Table-of-contents)

For use as a decorative text color that is applied on a decorative surface.

| CSS variable                | Light mode                    | Dark mode                    |
| --------------------------- | ----------------------------- | ---------------------------- |
| `--p-decorative-three-text` | ![][decorativethreetextlight] | ![][decorativethreetextdark] |

- `--p-decorative-three-text-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-decorative-three-text-light`: returns the fixed light value regardless of mode
- `--p-decorative-three-text-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-decorative-three-text-inverse` | ![][decorativeThreeTextDark]  | ![][decorativeThreeTextLight] |
  | `--p-decorative-three-text-light`   | ![][decorativeThreeTextLight] | ![][decorativeThreeTextLight] |
  | `--p-decorative-three-text-dark`    | ![][decorativeThreeTextDark]  | ![][decorativeThreeTextDark]  |
  -->

[decorativethreetextlight]: https://www.gifpng.com/128x96/002e18/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[decorativethreetextdark]: https://www.gifpng.com/128x96/ffffff/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### decorativeFourSurface [↑](#Table-of-contents)

For use as a decorative surface color.

| CSS variable                  | Light mode                      | Dark mode                      |
| ----------------------------- | ------------------------------- | ------------------------------ |
| `--p-decorative-four-surface` | ![][decorativefoursurfacelight] | ![][decorativefoursurfacedark] |

- `--p-decorative-four-surface-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-decorative-four-surface-light`: returns the fixed light value regardless of mode
- `--p-decorative-four-surface-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-decorative-four-surface-inverse` | ![][decorativeFourSurfaceDark]  | ![][decorativeFourSurfaceLight] |
  | `--p-decorative-four-surface-light`   | ![][decorativeFourSurfaceLight] | ![][decorativeFourSurfaceLight] |
  | `--p-decorative-four-surface-dark`    | ![][decorativeFourSurfaceDark]  | ![][decorativeFourSurfaceDark]  |
  -->

[decorativefoursurfacelight]: https://www.gifpng.com/128x96/90e0d5/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[decorativefoursurfacedark]: https://www.gifpng.com/128x96/167e7a/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### decorativeFourText [↑](#Table-of-contents)

For use as a decorative text color that is applied on a decorative surface.

| CSS variable               | Light mode                   | Dark mode                   |
| -------------------------- | ---------------------------- | --------------------------- |
| `--p-decorative-four-text` | ![][decorativefourtextlight] | ![][decorativefourtextdark] |

- `--p-decorative-four-text-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-decorative-four-text-light`: returns the fixed light value regardless of mode
- `--p-decorative-four-text-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-decorative-four-text-inverse` | ![][decorativeFourTextDark]  | ![][decorativeFourTextLight] |
  | `--p-decorative-four-text-light`   | ![][decorativeFourTextLight] | ![][decorativeFourTextLight] |
  | `--p-decorative-four-text-dark`    | ![][decorativeFourTextDark]  | ![][decorativeFourTextDark]  |
  -->

[decorativefourtextlight]: https://www.gifpng.com/128x96/002e2e/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[decorativefourtextdark]: https://www.gifpng.com/128x96/ffffff/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### decorativeFiveSurface [↑](#Table-of-contents)

For use as a decorative surface color.

| CSS variable                  | Light mode                      | Dark mode                      |
| ----------------------------- | ------------------------------- | ------------------------------ |
| `--p-decorative-five-surface` | ![][decorativefivesurfacelight] | ![][decorativefivesurfacedark] |

- `--p-decorative-five-surface-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-decorative-five-surface-light`: returns the fixed light value regardless of mode
- `--p-decorative-five-surface-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-decorative-five-surface-inverse` | ![][decorativeFiveSurfaceDark]  | ![][decorativeFiveSurfaceLight] |
  | `--p-decorative-five-surface-light`   | ![][decorativeFiveSurfaceLight] | ![][decorativeFiveSurfaceLight] |
  | `--p-decorative-five-surface-dark`    | ![][decorativeFiveSurfaceDark]  | ![][decorativeFiveSurfaceDark]  |
  -->

[decorativefivesurfacelight]: https://www.gifpng.com/128x96/fdc9d0/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[decorativefivesurfacedark]: https://www.gifpng.com/128x96/c13357/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---

### decorativeFiveText [↑](#Table-of-contents)

For use as a decorative text color that is applied on a decorative surface.

| CSS variable               | Light mode                   | Dark mode                   |
| -------------------------- | ---------------------------- | --------------------------- |
| `--p-decorative-five-text` | ![][decorativefivetextlight] | ![][decorativefivetextdark] |

- `--p-decorative-five-text-inverse`: returns the dark mode color while in light mode and vice versa
- `--p-decorative-five-text-light`: returns the fixed light value regardless of mode
- `--p-decorative-five-text-dark`: returns the fixed dark value regardless of mode
  <!--
  | `--p-decorative-five-text-inverse` | ![][decorativeFiveTextDark]  | ![][decorativeFiveTextLight] |
  | `--p-decorative-five-text-light`   | ![][decorativeFiveTextLight] | ![][decorativeFiveTextLight] |
  | `--p-decorative-five-text-dark`    | ![][decorativeFiveTextDark]  | ![][decorativeFiveTextDark]  |
  -->

[decorativefivetextlight]: https://www.gifpng.com/128x96/4e0e1f/FFFFFF?border-width=32&border-type=rectangle&border-color=fafafa&text=%20
[decorativefivetextdark]: https://www.gifpng.com/128x96/ffffff/FFFFFF?border-width=32&border-type=rectangle&border-color=0c0d0e&text=%20

---
