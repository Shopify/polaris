# Changelog

## 6.9.0

### Minor Changes

- [#8414](https://github.com/Shopify/polaris/pull/8414) [`01725d205`](https://github.com/Shopify/polaris/commit/01725d2057af75bb9e2346a936233fb9f40352e5) Thanks [@aaronccasanova](https://github.com/aaronccasanova)! - Migrate `color` custom properties from Polaris `v10` to `v11`

### Patch Changes

- [#8843](https://github.com/Shopify/polaris/pull/8843) [`5f21c9069`](https://github.com/Shopify/polaris/commit/5f21c90699f0f8b2893ddfc6ba253a75b8c87d1c) Thanks [@lgriffee](https://github.com/lgriffee)! - Updated `color` alias tokens to improve color contrast

## 6.8.1

### Patch Changes

- [#8727](https://github.com/Shopify/polaris/pull/8727) [`df0378cbc`](https://github.com/Shopify/polaris/commit/df0378cbcf926d901ee6dc4aab8a81535c873491) Thanks [@laurkim](https://github.com/laurkim)! - Bumped `eslint-plugin-import`, `@typescript-eslint/**`, and `downlevel-dts` packages, added type import/export rules, and updated type imports

## 6.8.0

### Minor Changes

- [#8572](https://github.com/Shopify/polaris/pull/8572) [`7d1c4f1db`](https://github.com/Shopify/polaris/commit/7d1c4f1db629ad9cfc68f65bd5f704127d10136e) Thanks [@lgriffee](https://github.com/lgriffee)! - Added a new `shadow` token group

## 6.7.0

### Minor Changes

- [#8130](https://github.com/Shopify/polaris/pull/8130) [`6c0dda128`](https://github.com/Shopify/polaris/commit/6c0dda128a3626cd4a24a755fb2d0809c958f907) Thanks [@mrcthms](https://github.com/mrcthms)! - - Added a `suffix` prop to `Tooltip`
  - Improved the UX of `Tooltip` by refining open and close animations and adding an arrow pointing to the center of the `activator`
  - Added the `EmpemeralPresenceManager` to manage the presence of non-blocking overlays, like `Tooltip` and `Toast`

## 6.6.1

### Patch Changes

- [#8456](https://github.com/Shopify/polaris/pull/8456) [`0e9fa8433`](https://github.com/Shopify/polaris/commit/0e9fa843397a9ec1d1a7eee70d0178d76dd231f8) Thanks [@aaronccasanova](https://github.com/aaronccasanova)! - Updated `border-caution-subdued` and `border-success-subdued` tokens to improve color contrast

* [#8483](https://github.com/Shopify/polaris/pull/8483) [`b1768f037`](https://github.com/Shopify/polaris/commit/b1768f03795f224e760edc405dc5bfde298061cb) Thanks [@aaronccasanova](https://github.com/aaronccasanova)! - Adjusted colors to meet color contrast requirements

## 6.6.0

### Minor Changes

- [#8417](https://github.com/Shopify/polaris/pull/8417) [`48dffd03d`](https://github.com/Shopify/polaris/commit/48dffd03da4e4fd5ebbaf133725b01aecfa2d9b8) Thanks [@heyjoethomas](https://github.com/heyjoethomas)! - Added new magic tokens

### Patch Changes

- [#8428](https://github.com/Shopify/polaris/pull/8428) [`952ce97ea`](https://github.com/Shopify/polaris/commit/952ce97eacb675bd145ca049b41c91bf270e5954) Thanks [@aaronccasanova](https://github.com/aaronccasanova)! - Added `bg-app-active` and `text-primary-hover` `color` tokens

* [#8427](https://github.com/Shopify/polaris/pull/8427) [`7c434b257`](https://github.com/Shopify/polaris/commit/7c434b257c308a6f80216c360faff6bfb7bb07c8) Thanks [@heyjoethomas](https://github.com/heyjoethomas)! - Fixed typo in `yellow-100` shade and lightened `blue-100` shade

## 6.5.1

### Patch Changes

- [#8384](https://github.com/Shopify/polaris/pull/8384) [`7a9977b4d`](https://github.com/Shopify/polaris/commit/7a9977b4dfe29217279d4988a60cf056d8404419) Thanks [@aaronccasanova](https://github.com/aaronccasanova)! - Improved token group types and fixed typo in `color` alias types

## 6.5.0

### Minor Changes

- [#8246](https://github.com/Shopify/polaris/pull/8246) [`60ef0dffc`](https://github.com/Shopify/polaris/commit/60ef0dffc9f6064d1d42793f5d2bd96f35b14489) Thanks [@aaronccasanova](https://github.com/aaronccasanova)! - Added a `color` token group using the new internal palette

* [#8305](https://github.com/Shopify/polaris/pull/8305) [`4bff95206`](https://github.com/Shopify/polaris/commit/4bff95206877cc24c261f1103589464314ca8cb7) Thanks [@alex-page](https://github.com/alex-page)! - Created a new token --p-border-radius-full that replaces --p-border-radius-half

## 6.4.0

### Minor Changes

- [#8245](https://github.com/Shopify/polaris/pull/8245) [`1b1394d32`](https://github.com/Shopify/polaris/commit/1b1394d32ecb122bcb77b6cb38b6106631ff8afd) Thanks [@lgriffee](https://github.com/lgriffee)! - Added new z-index tokens that will be the default in v7.0.0

## 6.3.0

### Minor Changes

- [#7621](https://github.com/Shopify/polaris/pull/7621) [`6e9edd3b5`](https://github.com/Shopify/polaris/commit/6e9edd3b58875ced12d0f27772b825034d83bf6a) Thanks [@aveline](https://github.com/aveline)! - - Added border width prop to `Box`
  - Exported color token subset alias types from tokens package and remove from `Box`

## 6.2.1

### Patch Changes

- [#7385](https://github.com/Shopify/polaris/pull/7385) [`c3f427c17`](https://github.com/Shopify/polaris/commit/c3f427c17d268f406618aaddb684ba12c3fa15d1) Thanks [@laurkim](https://github.com/laurkim)! - Refactored exported alias and scale types in `breakpoints`, `depth`, `font`, `motion`, `shape`, `spacing`, and `zIndex`.

## 6.2.0

### Minor Changes

- [#7056](https://github.com/Shopify/polaris/pull/7056) [`0be40aa94`](https://github.com/Shopify/polaris/commit/0be40aa94be8c95f96f0835b4df7f91f6da0b5c2) Thanks [@laurkim](https://github.com/laurkim)! - Refactored token types in primitive Layout components
  Exposed `DepthShadowAlias` type

## 6.1.0

### Minor Changes

- [#7274](https://github.com/Shopify/polaris/pull/7274) [`3fd9f6415`](https://github.com/Shopify/polaris/commit/3fd9f6415c0d7e3721eb7462c6777d4816437345) Thanks [@aaronccasanova](https://github.com/aaronccasanova)! - Exposed types for each token group including scale/alias unions for select token groups

### Patch Changes

- [#7239](https://github.com/Shopify/polaris/pull/7239) [`8626d6a1b`](https://github.com/Shopify/polaris/commit/8626d6a1b8a2ab50e6aa6074037144d11819734b) Thanks [@BPScott](https://github.com/BPScott)! - Increase `$p-breakpoint-*-{down,only}` breakpoint max-width values by 0.01px so that they are representable in fewer digits of precision when expressed as `em`s. This ensures they are representable without rounding when using `node-sass`'s default precision. E.g. `$p-breakpoints-md-down`changes from `max-width: 47.996875em` to `max-width: 47.9975em`.

## 6.0.1

### Patch Changes

- [#7230](https://github.com/Shopify/polaris/pull/7230) [`a55193a8a`](https://github.com/Shopify/polaris/commit/a55193a8ad0de90a40de25b5d4909c1692861bc9) Thanks [@lgriffee](https://github.com/lgriffee)! - Add documentation on breakpoint token usage in media queries

## 6.0.0

### Major Changes

- [#6675](https://github.com/Shopify/polaris/pull/6675) [`2b14c0b60`](https://github.com/Shopify/polaris/commit/2b14c0b60097f75d21df7eaa744dfaf84f8f53f7) Thanks [@samrose3](https://github.com/samrose3)! - Removed dark color tokens and color scheme support.

* [#6996](https://github.com/Shopify/polaris/pull/6996) [`7d7ae1e87`](https://github.com/Shopify/polaris/commit/7d7ae1e8797ce18820b96b16e360334e38671a5a) Thanks [@samrose3](https://github.com/samrose3)! - Renamed the following token groups: `colorScheme` to `colors`, `legacyTokens` to `legacy`, and `typography` to `fonts`.

- [#6995](https://github.com/Shopify/polaris/pull/6995) [`84ceaa3fc`](https://github.com/Shopify/polaris/commit/84ceaa3fc332d686c7efda312357854555d5e0e6) Thanks [@aveline](https://github.com/aveline)! - Updated type scale and font size token names.

  - Hardcoded existing `font-size` values outside the new scale.
  - Updated `line-height` token values and hardcoded values outside the new scale.

## 5.5.2

### Patch Changes

- [#6975](https://github.com/Shopify/polaris/pull/6975) [`e5eb70032`](https://github.com/Shopify/polaris/commit/e5eb700321c7ddf4fd3bd8679dfcebbc1514e3d4) Thanks [@jonathaneckmier](https://github.com/jonathaneckmier)! - Add missing alpha values in RGBA colors

## 5.5.1

### Patch Changes

- [#6865](https://github.com/Shopify/polaris/pull/6865) [`655bd4828`](https://github.com/Shopify/polaris/commit/655bd48288f87ba6196d932a7696ab0c6e6c9024) Thanks [@alex-page](https://github.com/alex-page)! - Remove og-image generation script, clean up other scripts, mv scripts to root

## 5.5.0

### Minor Changes

- [#6407](https://github.com/Shopify/polaris/pull/6407) [`b506363cb`](https://github.com/Shopify/polaris/commit/b506363cb42248ecb463c85a2ec8bcd6f9556624) Thanks [@aaronccasanova](https://github.com/aaronccasanova)! - Exposed SCSS media conditions for the `breakpoints` token group

## 5.4.0

### Minor Changes

- [#6216](https://github.com/Shopify/polaris/pull/6216) [`78285533c`](https://github.com/Shopify/polaris/commit/78285533c921c8b438d4e8881d794716d8316690) Thanks [@heyjoethomas](https://github.com/heyjoethomas)! - Changed popover shadow token to be a little stronger and provide more visual distinction with background

## 5.3.0

### Minor Changes

- [#6108](https://github.com/Shopify/polaris/pull/6108) [`b7160b861`](https://github.com/Shopify/polaris/commit/b7160b86107f8466bb275122cf08aad0bed8bbd2) Thanks [@samrose3](https://github.com/samrose3)! - Added color and shape tokens for dark UI: `border-divider-on-dark` and `surface-pressed-dark`.

### Patch Changes

- [#6110](https://github.com/Shopify/polaris/pull/6110) [`738e31e13`](https://github.com/Shopify/polaris/commit/738e31e1320b289fbf68a2468bcb208b9a629edf) Thanks [@aaronccasanova](https://github.com/aaronccasanova)! - Added CSS unit utilities

* [#5803](https://github.com/Shopify/polaris/pull/5803) [`a19fe4f9f`](https://github.com/Shopify/polaris/commit/a19fe4f9f2982ff74d5c34a597dea34ef6519b4a) Thanks [@aaronccasanova](https://github.com/aaronccasanova)! - Improved TypeScript declarations for `@shopify/polaris-tokens`

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
