# Changelog

## 5.3.0

### Minor Changes

- [#6108](https://github.com/Shopify/polaris/pull/6108) [`b7160b861`](https://github.com/Shopify/polaris/commit/b7160b86107f8466bb275122cf08aad0bed8bbd2) Thanks [@samrose3](https://github.com/samrose3)! - Added color and shape tokens for dark UI: `border-divider-on-dark` and `surface-pressed-dark`.

### Patch Changes

* [#6110](https://github.com/Shopify/polaris/pull/6110) [`738e31e13`](https://github.com/Shopify/polaris/commit/738e31e1320b289fbf68a2468bcb208b9a629edf) Thanks [@aaronccasanova](https://github.com/aaronccasanova)! - Added CSS unit utilities

- [#5803](https://github.com/Shopify/polaris/pull/5803) [`a19fe4f9f`](https://github.com/Shopify/polaris/commit/a19fe4f9f2982ff74d5c34a597dea34ef6519b4a) Thanks [@aaronccasanova](https://github.com/aaronccasanova)! - Improved TypeScript declarations for `@shopify/polaris-tokens`

## 5.2.1

### Patch Changes

- [#6062](https://github.com/Shopify/polaris/pull/6062) [`1d2f51ee9`](https://github.com/Shopify/polaris/commit/1d2f51ee98a3ce8fc7948a50953900ae29aa0b2f) Thanks [@chazdean](https://github.com/chazdean)! - Add keyboard shortcut

## 5.2.0

### Minor Changes

- [#6004](https://github.com/Shopify/polaris/pull/6004) [`27a0fba87`](https://github.com/Shopify/polaris/commit/27a0fba877789a3becb10c6e60d78921d71e6887) Thanks [@samrose3](https://github.com/samrose3)! - Added dark variants for the light scheme color tokens

### Patch Changes

- [#6054](https://github.com/Shopify/polaris/pull/6054) [`f63177602`](https://github.com/Shopify/polaris/commit/f63177602b2bdd447dabd930dcb3187344f9a5e6) Thanks [@chazdean](https://github.com/chazdean)! - Implement icons modal

## 5.1.1

### Patch Changes

- [#6012](https://github.com/Shopify/polaris/pull/6012) [`c71d26cff`](https://github.com/Shopify/polaris/commit/c71d26cffcb21f663b8a58d7b64d8957d555cb67) Thanks [@kyledurand](https://github.com/kyledurand)! - Fixed breakpoint tokens

## 5.1.0

### Minor Changes

- [`07702ad51`](https://github.com/Shopify/polaris/commit/07702ad513bab12be071e30e121997ef2f7ae7d7) Thanks [@romellogoodman](https://github.com/romellogoodman)! - Expose the .scss css file under dist/scss

## 5.0.1

- Exposes .scss file [#5689](https://github.com/Shopify/polaris/pull/5689)
- Fixes and issue with ESM interoperability [#5686](https://github.com/Shopify/polaris/pull/5686)

## 5.0.0

Polaris Tokens v5.0.0 features an overhaul of the package and the APIs for accessing tokens. Documentation on all of the available tokens can be found at [polaris.shopify.com/tokens/getting-started-with-tokens](https://polaris.shopify.com/tokens/getting-started-with-tokens).

The Sass variables, maps, functions, mixins, and CSS Filters have all been removed. In addition to deprecating access to tokens via the Rails assets pipelines. This new version leverages JavaScript objects for each Token Group which are passed through various build transforms to compose the distributed artifacts.

This new version standardizes the token naming across all of the package outputs. Each token is formatted in [kebab-case](https://wiki.c2.com/?KebabCase) following common CSS variable name conventions.

## 4.0.0

- Removed color theme for 6 River Systems MFP UI design system ([#208](https://github.com/Shopify/polaris-tokens/pull/208))

## 3.1.0

Added `iconInteractive` to colors ([#189](https://github.com/Shopify/polaris-tokens/pull/189))

## 3.0.0

- **Breaking:** Move `onSurface.onSurfaceBackground` to `surface.surfaceSearchField`. ([#183](https://github.com/Shopify/polaris-tokens/pull/183))
  Consumers of the variant `onSurfaceBackground` should replace it with `surfaceSearchField`. The color value is unchanged.

## 2.21.1

- Fix `icon` and `action` colors not being exposed in `dist/color-filters.color-map.scss`. ([#182](https://github.com/Shopify/polaris-tokens/pull/182))

## 2.21.0

- Added `mergeConfigs` and `Config` to the public API of `dist-modern/index.js` ([#180](https://github.com/Shopify/polaris-tokens/pull/180))
- Added esm support for legacy tokens. Doing `import {colorInk} from '@shopify/polaris-tokens';` shall load content from `dist/index.esm.js` which allows for better tree shaking. A default export so you can do `import tokens from '@shopify/polaris-tokens';` is provided for backwards compatability however this is just a stopgap, and will be removed in polaris-tokens v3.0.0. You should use either named imports (`import {colorInk}`) or a namespace import (`import * as tokens`) ([#181](https://github.com/Shopify/polaris-tokens/pull/181))

## 2.20.0

- Added color theme for 6 River Systems MFP UI design system ([#179](https://github.com/Shopify/polaris-tokens/pull/179))

## 2.19.0

- Added support for `.hbs` (handlebars) format templates ([#176](https://github.com/Shopify/polaris-tokens/pull/176))
- Increased contrast of dark border divider ([#177](https://github.com/Shopify/polaris-tokens/pull/177))

## 2.18.0

- Added prefixed CSS custom properties output for colors ([#174](https://github.com/Shopify/polaris-tokens/pull/174), [#175](https://github.com/Shopify/polaris-tokens/pull/175))

## 2.17.0

- Froze and deprecated design tokens in `./dist`. In a future version, this directory may be moved to `./dist-legacy` ([#170](https://github.com/Shopify/polaris-tokens/pull/170))

## 2.16.0

- Added textPrimary with hovered and pressed variations ([#164](https://github.com/Shopify/polaris-tokens/pull/164))

## 2.15.0

- Changed borderShadow value ([#157](https://github.com/Shopify/polaris-tokens/pull/157))

## 2.14.0

- Adds states for surfaceNeutral ([#155](https://github.com/Shopify/polaris-tokens/pull/155))
- Changed dark mode values for some subdued borders ([#156](https://github.com/Shopify/polaris-tokens/pull/156))

## 2.13.1

- Moved mistaken border variants to surface variants ([#154](https://github.com/Shopify/polaris-tokens/pull/154))

## 2.13.0

- Add subdued variants to warning, highlight, and success ([#153](https://github.com/Shopify/polaris-tokens/pull/153))

## 2.12.9

- Update action secondary depressed color / add border depressed ([#150](https://github.com/Shopify/polaris-tokens/pull/150))

## 2.12.8

- Add icon and action colors to color-filters-map ([#149](https://github.com/Shopify/polaris-tokens/pull/149))

## 2.12.7

- Updates the onSurface background name ([#147](https://github.com/Shopify/polaris-tokens/pull/147))

## 2.12.6

- Added background under onSurface ([#146](https://github.com/Shopify/polaris-tokens/pull/146))

## 2.12.5

- Updated borderSubdued and added borderShadow, borderShadowSubdued, and divider colors ([#145](https://github.com/Shopify/polaris-tokens/pull/145))

## 2.12.4

- Updated background, surface, and action colors ([#140](https://github.com/Shopify/polaris-tokens/pull/140))

## 2.12.3

- Updated the font stack so that Segoe UI comes before Roboto. ([#131](https://github.com/Shopify/polaris-tokens/pull/131))

## 2.12.2

- Loosened the type of the first argument of `color-factory` to account for stricter merge checks in Typescript 3.8 ([#130](https://github.com/Shopify/polaris-tokens/pull/130))

## 2.12.1

- Adjusted Figma metadata for variants. Adjusted description of one variant. ([#126](https://github.com/Shopify/polaris-tokens/pull/126))

## 2.12.0

- Added variants for border subdued roles ([#123](https://github.com/Shopify/polaris-tokens/pull/123))

## 2.11.0

- Added missing variants ([#121](https://github.com/Shopify/polaris-tokens/pull/121))
- Updated hover variants ([#120](https://github.com/Shopify/polaris-tokens/pull/120))
- Updated color variants to use `saturationAdjustmentFn` instead of `saturation` ([#119](https://github.com/Shopify/polaris-tokens/pull/119))

## 2.10.0

- Removed `borderSecondary`, `borderSecondaryHovered`, and `borderSecondaryDisabled` color variants from the `secondary` role in favor of `border` and the newly added `borderHovered` and `borderDisabled` color variants in the `onSurface` role ([#115](https://github.com/Shopify/polaris-tokens/pull/115))
  - Note: This is technically a breaking change although we will continue to ship as minor and patch versions until the new color system is enabled by default in production

## 2.9.0

- Added Figma color name metadata ([#110](https://github.com/Shopify/polaris-tokens/pull/110))

## 2.8.2

- Fixed an issue where dev environment utils and types were exported ([#113](https://github.com/Shopify/polaris-tokens/pull/113))

## 2.8.1

- Updated color variants to match Figma ([#108](https://github.com/Shopify/polaris-tokens/pull/108))
- Updated `interactiveCritical` description ([#107](https://github.com/Shopify/polaris-tokens/pull/107))

## 2.8.0

- Added color factory and built modern tokens ([#105](https://github.com/Shopify/polaris-tokens/pull/105))
  - Added surface disabled variant and updated other variant configs ([#101](https://github.com/Shopify/polaris-tokens/pull/101))
  - Added TypeScript build for modern tokens, and shifted directory structures to differentiate between legacy and modern tokens ([#97](https://github.com/Shopify/polaris-tokens/pull/97))
  - Updated variant names and descriptions ([#96](https://github.com/Shopify/polaris-tokens/pull/96))
  - Added decorative icon variants ([#94](https://github.com/Shopify/polaris-tokens/pull/94))
  - Built changes from previous release, and added textOnInteractive variant ([#93](https://github.com/Shopify/polaris-tokens/pull/93))
  - Fixed an issue where legacy themes caused the color factory to throw ([#92](https://github.com/Shopify/polaris-tokens/pull/92))
  - Updated color variants for consistency with changes in Polaris React ([#91](https://github.com/Shopify/polaris-tokens/pull/91))
  - Marked the config as optional and the colors as partial ([dd3d8fc](https://github.com/Shopify/polaris-tokens/commit/dd3d8fc05572fb03e764a85a0519bbd3dde11855))
  - Added the Color Factory. Long live the Color Factory! ([#89](https://github.com/Shopify/polaris-tokens/pull/89))

## 2.7.0

- Updated filter for the Blue color ([#64](https://github.com/Shopify/polaris-tokens/pull/64))
- Removed reliance on the Invision DSM import script (colors are now directly managed in `tokens/colors.yml`) ([#66](https://github.com/Shopify/polaris-tokens/pull/66))
- Added a JSON color export for iOS ([`colors.ios.json`](/dist/colors.ios.json)) ([#86](https://github.com/Shopify/polaris-tokens/pull/86))

## 2.6.0

- Update `color-blue` to `#006fbb` from `#007ace` for accessibility ([#63](https://github.com/Shopify/polaris-tokens/pull/63))
- Add missing `colorYellowDark` values from ([#44](https://github.com/Shopify/polaris-tokens/pull/44))

## 2.5.0

- Duration tokens (with `type: time`) are treated as unitless and converted to milliseconds in JavaScript formats

## 2.4.0

- Added color names to the Sketch palette ([#53](https://github.com/Shopify/polaris-tokens/pull/53))
- Fixed a bug where the font family value was wrapped in quotes ([#58](https://github.com/Shopify/polaris-tokens/pull/58))

## 2.3.0

- Added spacing-map format, usable as `spacing.spacing-map.scss` ([#52](https://github.com/Shopify/polaris-tokens/pull/52))

## 2.2.0

- Updated devDependencies ([#45](https://github.com/Shopify/polaris-tokens/pull/45))
- Added `base-tight` to the spacing map ([#48](https://github.com/Shopify/polaris-tokens/pull/48))

## 2.1.1

- No changes in this version (re-publishing as the 2.1.0 Gem release failed)

## 2.1.0

- Updated `color-yellow-dark` for accessibility ([#44](https://github.com/Shopify/polaris-tokens/pull/44))
- Documented how to import tokens using ES Modules ([#37](https://github.com/Shopify/polaris-tokens/pull/37))
- Updated Node.js to v10
- Updated Node.js & Ruby dependencies
- Reformatted files using sewing-kit

## 2.0.0

- **Breaking:** renamed `colors.android-colors.xml` to `colors.android.xml`
- **Breaking:** removed `-base` suffix from base color token names (fixes [#16](https://github.com/Shopify/polaris-tokens/issues/16))

  Upgrade path:

  - CSS: remove `-base`. For example: `var(--color-ink-base)` → `var(--color-ink)`.
  - Sass: remove `-base`. For example: `$color-ink-base` → `$color-ink`.
  - JSON: remove `-base`. For example: `tokens['color-ink-base']` → `tokens['color-ink']`.
  - Android: remove `_base`. For example: `polaris_color_blue_base` → `polaris_color_blue`.
  - JavaScript: remove `Base`. For example: `colorPurpleBase` → `colorPurple`.

- Updated dependencies, including Theo to from `^7.0.1` to `8.0.0-beta.2`
- Updated the Android token format to enable it to format other properties than just colors

## 1.3.1

- Updated devDependencies, including [Prettier](https://prettier.io/). This reformatted SCSS files in `./dist/` but didn’t impact the tokens themselves.

## 1.3.0

- Added [`colors.android-colors.xml`](https://github.com/Shopify/polaris-tokens/blob/main/dist/colors.android-colors.xml), for Android apps

## 1.2.0

- `ase` and `clr` palettes: removed the `color-` prefix from color names
- Updated devDependencies

## 1.1.0

Polaris tokens are now available as both a [npm package](https://www.npmjs.com/package/@shopify/polaris-tokens) and a [Ruby gem](https://rubygems.org/gems/polaris_tokens)! Check the [README](https://github.com/Shopify/polaris-tokens/blob/main/README.md) for installation and usage instructions for both.

## 1.0.0

First stable release 🎉

Color design tokens are now used in:

- `Shopify/shopify`
- `Shopify/polaris-styleguide`
- `Shopify/polaris-react` (`@shopify/polaris` v2 on npm)
