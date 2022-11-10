const {getCustomPropertyNames, tokens} = require('@shopify/polaris-tokens');

/**
 * Allowed Polaris token custom properties.
 *
 * @example ['--p-text', '--p-background']
 */
const polarisCustomPropertyNames = getCustomPropertyNames(tokens);

/**
 * User defined custom property names.
 *
 * Determined by allowing any custom property that are not prefixed with:
 * `--p-`, `--pc-`, or '--polaris-version-`
 */
const userDefinedCustomPropertyNames = /--(?!(p|pc|polaris-version)-).+/;

/**
 * @type {import('stylelint').Config}
 */
module.exports = {
  plugins: [
    'stylelint-scss',
    './plugins/coverage',
    './plugins/global-disallowed-list',
    './plugins/at-rule-disallowed-list',
    './plugins/custom-properties-allowed-list',
    './plugins/media-queries-allowed-list',
  ],
  rules: {
    'stylelint-polaris/coverage': {
      colors: {
        'color-named': 'never',
        'color-no-hex': true,
        // TODO: Receiving an error that the rule doesn't exist
        // 'scss/function-color-relative': true,
        'declaration-property-value-disallowed-list': {
          opacity: [/(?!0|1)\d$|^\d{2,}|^[1-9]+\.|^\d+\.\d+\.|^0\.\d{3,}/],
        },
        'function-disallowed-list': [
          // Include Sass namespace
          // https://regex101.com/r/UdW0oV/1
          'brightness',
          'contrast',
          'hue-rotate',
          'hsl',
          'hsla',
          'invert',
          'rgb',
          'rgba',
          'sepia',
          /([\w-]+\.)?color-multiply/,
          /([\w-]+\.)?color/,
          /([\w-]+\.)?filter/,
        ],
        'stylelint-polaris/at-rule-disallowed-list': {
          include: [
            // mixins
            /([\w-]+\.)?color-icon($|\()/,
            /([\w-]+\.)?recolor-icon($|\()/,
            /([\w-]+\.)?control-backdrop($|\()/,
            /([\w-]+\.)?ms-high-contrast-color/,
          ],
        },
        'stylelint-polaris/global-disallowed-list': [
          /\$polaris-colors/,
          /\$color-filter-palette-data/,
          /\$color-palette-data/,
          // Legacy custom properties
          /--p-override-transparent/,
          /--p-badge-mix-blend-mode/,
        ],
      },
      motion: {
        'at-rule-disallowed-list': ['keyframes'],
        'function-disallowed-list': [
          /([\w-]+\.)?control-icon-transition/,
          /([\w-]+\.)?duration/,
          /([\w-]+\.)?easing/,
        ],
        'stylelint-polaris/at-rule-disallowed-list': {
          include: [/([\w-]+\.)?skeleton-shimmer($|\()/],
        },
        'stylelint-polaris/global-disallowed-list': [
          /\$duration-data/,
          /\$polaris-duration-map/,
          /\$skeleton-shimmer-duration/,
          /\$easing-data/,
          // Legacy custom properties
          /--p-range-slider-thumb-scale/,
          /--p-duration-1-0-0/,
          /--p-duration-1-5-0/,
        ],
      },
      typography: {
        'declaration-property-value-disallowed-list': {
          'font-weight': [/(\$.*|[0-9]+)/],
        },
        'function-disallowed-list': [
          /([\w-]+\.)?font-family/,
          /([\w-]+\.)?font-size/,
          /([\w-]+\.)?line-height/,
        ],
        'stylelint-polaris/at-rule-disallowed-list': {
          include: [
            /([\w-]+\.)?truncate($|\()/,
            /([\w-]+\.)?text-breakword($|\()/,
            /([\w-]+\.)?text-emphasis-normal($|\()/,
            /([\w-]+\.)?text-emphasis-strong($|\()/,
            /([\w-]+\.)?text-emphasis-subdued($|\()/,
            /([\w-]+\.)?text-style-body($|\()/,
            /([\w-]+\.)?text-style-button-large($|\()/,
            /([\w-]+\.)?text-style-button($|\()/,
            /([\w-]+\.)?text-style-caption($|\()/,
            /([\w-]+\.)?text-style-display-large($|\()/,
            /([\w-]+\.)?text-style-display-medium($|\()/,
            /([\w-]+\.)?text-style-display-small($|\()/,
            /([\w-]+\.)?text-style-display-x-large($|\()/,
            /([\w-]+\.)?text-style-heading($|\()/,
            /([\w-]+\.)?text-style-input($|\()/,
            /([\w-]+\.)?text-style-subheading($|\()/,
          ],
        },
        'stylelint-polaris/global-disallowed-list': [
          /\$typography-condensed/,
          /\$typography-condensed/,
          /\$base-font-size/,
          /\$line-height-data/,
          /\$font-family-data/,
          /\$font-size-data/,
          /\$default-browser-font-size/,
          // Legacy custom properties
          /--p-button-font/,
          /--p-badge-font/,
        ],
      },
      layout: {
        'declaration-property-value-disallowed-list': [
          {
            display: ['grid', 'flex'],
            top: [/(?!var\(--p-).+$/],
            bottom: [/(?!var\(--p-).+$/],
            left: [/(?!var\(--p-).+$/],
            right: [/(?!var\(--p-).+$/],
            width: [/(?!var\(--p-).+$/],
            height: [/(?!var\(--p-).+$/],
            'z-index': [/(?!var\(--p-).+$/],
          },
          {severity: 'warning'},
        ],
        'property-disallowed-list': [
          [
            'position',
            'grid',
            'flex',
            'flex-grow',
            'flex-shrink',
            'flex-basis',
            'justify-content',
            'align-items',
            'grid-row',
            'grid-row-start',
            'grid-row-end',
            'grid-column',
            'grid-column-start',
            'grid-column-end',
            'grid-template',
            'grid-template-areas',
            'grid-template-rows',
            'grid-template-columns',
            'grid-area',
            'display',
          ],
          {severity: 'warning'},
        ],
        'function-disallowed-list': [
          /([\w-]+\.)?nav-min-window-corrected/,
          /([\w-]+\.)?control-height/,
          /([\w-]+\.)?control-slim-height/,
          /([\w-]+\.)?mobile-nav-width/,
          /([\w-]+\.)?thumbnail-size/,
          /([\w-]+\.)?icon-size($|\()/,
          /([\w-]+\.)?top-bar-height/,
          /([\w-]+\.)?z-index/,
          /([\w-]+\.)?safe-area-for($|\()/,
        ],
        'stylelint-polaris/at-rule-disallowed-list': {
          include: [
            /([\w-]+\.)?hidden-when-printing($|\()/,
            /([\w-]+\.)?print-hidden($|\()/,
            /([\w-]+\.)?layout-flex-fix($|\()/,
            /([\w-]+\.)?skeleton-page-header-layout($|\()/,
            /([\w-]+\.)?skeleton-page-secondary-actions-layout($|\()/,
          ],
        },
        'stylelint-polaris/global-disallowed-list': [
          /\$layout-width-data/,
          /\$navigation-width/,
          /\$small-thumbnail-size/,
          /\$large-thumbnail-size/,
          /\$medium-thumbnail-size/,
          /\$thumbnail-sizes/,
          // Legacy custom properties
          /--p-range-slider-thumb-size-base/,
          /--p-range-slider-thumb-size-active/,
          /--p-override-visible/,
          /--p-icon-size/,
          /--p-choice-size/,
        ],
      },
      spacing: {
        'function-disallowed-list': [
          /([\w-]+\.)?control-vertical-padding/,
          /([\w-]+\.)?em/,
          /([\w-]+\.)?px/,
          /([\w-]+\.)?rem/,
          /([\w-]+\.)?spacing/,
        ],
        'stylelint-polaris/global-disallowed-list': [
          /\$polaris-spacing/,
          /\$spacing-data/,
          /\$actions-vertical-spacing/,
          // Legacy custom properties
          /--p-button-group-item-spacing/,
          /--p-choice-margin/,
          /--p-text-field-spinner-offset/,
        ],
      },
      shape: {
        'stylelint-polaris/at-rule-disallowed-list': {
          include: [
            /([\w-]+\.)?border-radius/,
            /([\w-]+\.)?border-width/,
            /([\w-]+\.)?border/,
            /([\w-]+\.)?high-contrast-border($|\()/,
            /([\w-]+\.)?high-contrast-button-outline($|\()/,
            /([\w-]+\.)?high-contrast-outline($|\()/,
            /([\w-]+\.)?focus-ring($|\()/,
            /([\w-]+\.)?no-focus-ring($|\()/,
          ],
        },
        'stylelint-polaris/global-disallowed-list': [
          /\$border-radius-data/,
          /\$border-width-data/,
          /\$borders-data/,
          // Legacy custom properties
          /--p-border-radius-base/,
          /--p-border-radius-wide/,
          /--p-border-radius-full/,
          /--p-control-border-width/,
          /--p-thin-border-subdued/,
          /--p-banner-border-default/,
          /--p-banner-border-success/,
          /--p-banner-border-highlight/,
          /--p-banner-border-warning/,
          /--p-banner-border-critical/,
          /--p-text-field-focus-ring-border-radius/,
          /--p-text-field-focus-ring-offset/,
        ],
      },
      depth: {
        'function-disallowed-list': [/([\w-]+\.)?shadow/],
        'stylelint-polaris/global-disallowed-list': [
          /\$shadows-data/,
          /\$fixed-element-stacking-order/,
          /\$global-elements/,
          // Legacy custom properties
          /--p-button-drop-shadow/,
          /--p-button-inner-shadow/,
          /--p-button-pressed-inner-shadow/,
          /--p-card-shadow/,
          /--p-popover-shadow/,
          /--p-modal-shadow/,
          /--p-top-bar-shadow/,
          /--p-override-loading-z-index/,
        ],
      },
      conventions: {
        'unit-disallowed-list': [
          // TODO: Should 's' and 'ms' move to `motion`?
          ['px', 'rem', 'em', 's', 'ms'],
          {severity: 'warning'},
        ],
        /**
         * TODO: After consolidating internal and public configs, this rule
         * would make more sense as a disallow list.
         *
         * Custom property constraints:
         * - Allow any user defined custom properties
         * - Allow `--p-*` Polaris custom properties as values
         * - Disallow `--p-*` Polaris custom properties as property overrides
         * - Disallow `--pc-*` Polaris component custom properties as values and property overrides
         */
        'stylelint-polaris/custom-properties-allowed-list': {
          allowedProperties: [userDefinedCustomPropertyNames],
          allowedValues: {
            '/.+/': [
              ...polarisCustomPropertyNames,
              userDefinedCustomPropertyNames,
            ],
          },
        },
        'stylelint-polaris/global-disallowed-list': [
          / \* \$/,
          // Legacy custom properties
          /--p-override-none/,
          /--p-override-one/,
          /--p-override-zero/,
          /--p-non-null-content/,
        ],
      },
      mediaQueries: {
        'function-disallowed-list': [
          /([\w-]+\.)?breakpoint/,
          /([\w-]+\.)?layout-width/,
        ],
        'stylelint-polaris/media-queries-allowed-list': {
          // Allowed media types and media conditions
          // https://www.w3.org/TR/mediaqueries-5/#media
          allowedMediaTypes: ['print', 'screen'],
          allowedMediaFeatureNames: ['forced-colors', '-ms-high-contrast'],
          allowedScssInterpolations: [
            // TODO: Add utility to @shopify/polaris-tokens to getMediaConditionNames
            /^\$p-breakpoints-(xs|sm|md|lg|xl)-(up|down|only)$/,
          ],
        },
        'stylelint-polaris/at-rule-disallowed-list': {
          include: [
            /([\w-]+\.)?after-topbar-sheet($|\()/,
            /([\w-]+\.)?breakpoint-after($|\()/,
            /([\w-]+\.)?breakpoint-before($|\()/,
            /([\w-]+\.)?frame-when-nav-displayed($|\()/,
            /([\w-]+\.)?frame-when-nav-hidden($|\()/,
            /([\w-]+\.)?frame-with-nav-when-not-max-width($|\()/,
            /([\w-]+\.)?page-actions-layout($|\()/,
            /([\w-]+\.)?page-content-breakpoint-after($|\()/,
            /([\w-]+\.)?page-content-breakpoint-before($|\()/,
            /([\w-]+\.)?page-content-layout($|\()/,
            /([\w-]+\.)?page-content-when-fully-condensed($|\()/,
            /([\w-]+\.)?page-content-when-layout-not-stacked($|\()/,
            /([\w-]+\.)?page-content-when-layout-stacked($|\()/,
            /([\w-]+\.)?page-content-when-not-fully-condensed($|\()/,
            /([\w-]+\.)?page-content-when-not-partially-condensed($|\()/,
            /([\w-]+\.)?page-content-when-partially-condensed($|\()/,
            /([\w-]+\.)?page-header-has-navigation($|\()/,
            /([\w-]+\.)?page-header-has-secondary-actions($|\()/,
            /([\w-]+\.)?page-header-layout($|\()/,
            /([\w-]+\.)?page-header-without-navigation($|\()/,
            /([\w-]+\.)?page-layout($|\()/,
            /([\w-]+\.)?page-padding-not-fully-condensed($|\()/,
            /([\w-]+\.)?page-padding-not-partially-condensed($|\()/,
            /([\w-]+\.)?page-title-layout($|\()/,
            /([\w-]+\.)?page-when-not-max-width($|\()/,
            /([\w-]+\.)?when-typography-condensed($|\()/,
            /([\w-]+\.)?when-typography-not-condensed($|\()/,
            /([\w-]+\.)?when-not-printing($|\()/,
            /([\w-]+\.)?when-printing($|\()/,
          ],
        },
      },
      legacySass: {
        'stylelint-polaris/at-rule-disallowed-list': {
          include: [
            /([\w-]+\.)?base-button-disabled($|\()/,
            /([\w-]+\.)?button-base($|\()/,
            /([\w-]+\.)?button-filled($|\()/,
            /([\w-]+\.)?button-full-width($|\()/,
            /([\w-]+\.)?button-outline-disabled($|\()/,
            /([\w-]+\.)?button-outline($|\()/,
            /([\w-]+\.)?plain-button-backdrop($|\()/,
            /([\w-]+\.)?unstyled-button($|\()/,
            /([\w-]+\.)?skeleton-content($|\()/,
            /([\w-]+\.)?unstyled-input($|\()/,
            /([\w-]+\.)?unstyled-link($|\()/,
            /([\w-]+\.)?unstyled-list($|\()/,
            /([\w-]+\.)?range-thumb-selectors($|\()/,
            /([\w-]+\.)?range-track-selectors($|\()/,
            /([\w-]+\.)?visually-hidden($|\()/,
          ],
        },
        'function-disallowed-list': [
          /([\w-]+\.)?available-names/,
          /([\w-]+\.)?map-extend/,
          /([\w-]+\.)?control-backdrop($|\()/,
          /([\w-]+\.)?list-selected-indicator($|\()/,
          /([\w-]+\.)?state($|\()/,
        ],
      },
    },
  },
};
