const {
  getCustomPropertyNames,
  createVar,
  tokens,
} = require('@shopify/polaris-tokens');

/**
 * @type {import('./plugins/coverage').CategorizedRules} The stylelint-polaris/coverage rule expects a 3-dimensional rule config that groups Stylelint rules by coverage categories. It reports problems with dynamic rule names by appending the category to the coverage plugin's rule name

(e.g., Unexpected named color "blue" - Please use a Polaris color token Stylelint(stylelint-polaris/coverage/colors/color-named)")
*/
const stylelintPolarisCoverageOptions = {
  colors: [
    {
      'color-named': 'never',
      'color-no-hex': [true, {message: 'Please use a Polaris color token'}],
      'scss/function-color-relative': true,
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
      'polaris/at-rule-disallowed-list': {
        include: [
          // Legacy mixins
          /([\w-]+\.)?color-icon($|\()/,
          /([\w-]+\.)?recolor-icon($|\()/,
          /([\w-]+\.)?control-backdrop($|\()/,
          /([\w-]+\.)?ms-high-contrast-color/,
        ],
      },
      'polaris/global-disallowed-list': [
        // Legacy mixin map-get data
        /\$polaris-colors/,
        /\$color-filter-palette-data/,
        /\$color-palette-data/,
        // Legacy custom properties
        /--p-override-transparent/,
        /--p-badge-mix-blend-mode/,
      ],
    },
    {
      message: 'Please use a Polaris color token',
      meta: {
        url: 'https://github.com/Shopify/polaris/blob/main/stylelint-polaris/README.md#color',
      },
    },
  ],
  motion: [
    {
      'at-rule-disallowed-list': ['keyframes'],
      'function-disallowed-list': [
        /([\w-]+\.)?control-icon-transition/,
        /([\w-]+\.)?duration/,
        /([\w-]+\.)?easing/,
      ],
      'declaration-property-unit-disallowed-list': [
        {
          '/^animation/': ['ms', 's'],
          '/^transition/': ['ms', 's'],
        },
      ],
      'polaris/at-rule-disallowed-list': {
        include: [/([\w-]+\.)?skeleton-shimmer($|\()/],
      },
      'polaris/global-disallowed-list': [
        // Legacy mixin map-get data
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
    {
      message: 'Please use a Polaris motion token',
      meta: {
        url: 'https://github.com/Shopify/polaris/blob/main/stylelint-polaris/README.md#motion',
      },
    },
  ],
  typography: [
    {
      'declaration-property-value-disallowed-list': {
        'font-weight': [/(\$.*|[0-9]+)/],
      },
      'declaration-property-unit-disallowed-list': [
        {
          '/^font/': ['px', 'rem', 'em'],
          'line-height': ['px', 'rem', 'em'],
        },
      ],
      'function-disallowed-list': [
        /([\w-]+\.)?font-family/,
        /([\w-]+\.)?font-size/,
        /([\w-]+\.)?line-height/,
      ],
      'polaris/at-rule-disallowed-list': {
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
      'polaris/global-disallowed-list': [
        // Legacy mixin map-get data
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
    {
      message: 'Please use a Polaris font token',
      meta: {
        url: 'https://github.com/Shopify/polaris/blob/main/stylelint-polaris/README.md#typography',
      },
    },
  ],
  layout: [
    {
      'declaration-property-value-disallowed-list': [
        {
          top: [/(?!var\(--p-).+$/],
          bottom: [/(?!var\(--p-).+$/],
          left: [/(?!var\(--p-).+$/],
          right: [/(?!var\(--p-).+$/],
          '/^width/': [/(?!var\(--p-).+$/],
          '/^height/': [/(?!var\(--p-).+$/],
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
      ],
      'polaris/at-rule-disallowed-list': {
        include: [
          /([\w-]+\.)?hidden-when-printing($|\()/,
          /([\w-]+\.)?print-hidden($|\()/,
          /([\w-]+\.)?layout-flex-fix($|\()/,
          /([\w-]+\.)?safe-area-for($|\()/,
          /([\w-]+\.)?skeleton-page-header-layout($|\()/,
          /([\w-]+\.)?skeleton-page-secondary-actions-layout($|\()/,
        ],
      },
      'polaris/global-disallowed-list': [
        // Legacy mixin map-get data
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
        /--p-override-loading-z-index/,
        /--p-icon-size/,
        /--p-choice-size/,
      ],
    },
    {
      message: 'Please use a Polaris layout component',
      meta: {
        url: 'https://github.com/Shopify/polaris/blob/main/stylelint-polaris/README.md#layout',
      },
    },
  ],
  spacing: [
    {
      'function-disallowed-list': [
        /([\w-]+\.)?control-vertical-padding/,
        /([\w-]+\.)?em/,
        /([\w-]+\.)?px/,
        /([\w-]+\.)?rem/,
        /([\w-]+\.)?spacing/,
      ],
      'declaration-property-unit-disallowed-list': [
        {
          '/^padding/': ['px', 'rem', 'em'],
          '/^margin/': ['px', 'rem', 'em'],
          '/^gap/': ['px', 'rem', 'em'],
        },
      ],
      'polaris/global-disallowed-list': [
        // Legacy mixin map-get data
        /\$polaris-spacing/,
        /\$spacing-data/,
        /\$actions-vertical-spacing/,
        // Legacy custom properties
        /--p-button-group-item-spacing/,
        /--p-choice-margin/,
        /--p-text-field-spinner-offset/,
      ],
    },
    {
      message: 'Please use a Polaris spacing token',
      meta: {
        url: 'https://github.com/Shopify/polaris/blob/main/stylelint-polaris/README.md#spacing',
      },
    },
  ],
  shape: [
    {
      'declaration-property-unit-disallowed-list': [
        {
          'border-width': ['px', 'rem', 'em'],
          border: ['px', 'rem', 'em'],
          'border-radius': ['px', 'rem', 'em'],
          'outline-offset': ['px', 'rem', 'em'],
          outline: ['px', 'rem', 'em'],
        },
      ],
      'polaris/at-rule-disallowed-list': {
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
      'polaris/global-disallowed-list': [
        // Legacy mixin map-get data
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
    {
      message: 'Please use a Polaris shape token',
      meta: {
        url: 'https://github.com/Shopify/polaris/blob/main/stylelint-polaris/README.md#shape',
      },
    },
  ],
  depth: [
    {
      'function-disallowed-list': [/([\w-]+\.)?shadow/],
      'declaration-property-unit-disallowed-list': [
        {
          'box-shadow': ['px', 'rem', 'em'],
        },
      ],
      'property-disallowed-list': ['text-shadow'],
      'polaris/global-disallowed-list': [
        // Legacy mixin map-get data
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
      ],
    },
    {
      message: 'Please use a Polaris depth token',
      meta: {
        url: 'https://github.com/Shopify/polaris/blob/main/stylelint-polaris/README.md#depth',
      },
    },
  ],
  'z-index': [
    {
      'declaration-property-value-allowed-list': [
        {
          'z-index': Object.keys(tokens.zIndex).map(createVar),
        },
      ],
      'function-disallowed-list': [/([\w-]+\.)?z-index/],
      'polaris/global-disallowed-list': [
        // Legacy mixin map-get data
        /\$fixed-element-stacking-order/,
        /\$global-elements/,
        // Legacy custom properties
        /--p-override-loading-z-index/,
      ],
    },
    {
      message: 'Please use a Polaris z-index token',
      meta: {
        url: 'https://github.com/Shopify/polaris/blob/main/stylelint-polaris/README.md#z-index',
      },
    },
  ],
  conventions: [
    {
      'polaris/custom-property-allowed-list': {
        // Allow any custom property not prefixed with `--p-`, `--pc-`, or `--polaris-version-`
        allowedProperties: [/--(?!(p|pc|polaris-version)-).+/],
        allowedValues: {
          '/.+/': [
            // Note: Order is important.
            // The first pattern validates `--p-*`
            // custom properties are valid Polaris tokens
            ...getCustomPropertyNames(tokens),
            // and the second pattern flags unknown `--p-*` custom properties
            // or usages of our "private" `--pc-*` custom properties
            /--(?!(p|pc)-).+/,
          ],
        },
      },
    },
    {
      meta: {
        url: 'https://github.com/Shopify/polaris/blob/main/stylelint-polaris/README.md#conventions',
      },
    },
  ],
  'media-queries': [
    {
      'polaris/media-query-allowed-list': {
        // Allowed media types and media conditions
        // https://www.w3.org/TR/mediaquery5/#media
        allowedMediaTypes: ['print', 'screen'],
        allowedMediaFeatureNames: ['forced-colors', '-ms-high-contrast'],
        allowedScssInterpolations: [
          // TODO: Add utility to @shopify/polaris-tokens to getMediaConditionNames
          /^\$p-breakpoints-(xs|sm|md|lg|xl)-(up|down|only)$/,
        ],
      },
      // Legacy functions
      'function-disallowed-list': [
        /([\w-]+\.)?breakpoint/,
        /([\w-]+\.)?layout-width/,
      ],
      // Legacy mixins
      'polaris/at-rule-disallowed-list': {
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
    {
      meta: {
        url: 'https://github.com/Shopify/polaris/blob/main/stylelint-polaris/README.md#media-queries',
      },
    },
  ],
  legacy: [
    {
      // Legacy mixins
      'polaris/at-rule-disallowed-list': {
        include: [
          /([\w-]+\.)?base-button-disabled($|\()/,
          /([\w-]+\.)?button-base($|\()/,
          /([\w-]+\.)?button-filled($|\()/,
          /([\w-]+\.)?button-full-width($|\()/,
          /([\w-]+\.)?button-outline-disabled($|\()/,
          /([\w-]+\.)?button-outline($|\()/,
          /([\w-]+\.)?control-backdrop($|\()/,
          /([\w-]+\.)?list-selected-indicator($|\()/,
          /([\w-]+\.)?plain-button-backdrop($|\()/,
          /([\w-]+\.)?unstyled-button($|\()/,
          /([\w-]+\.)?skeleton-content($|\()/,
          /([\w-]+\.)?unstyled-input($|\()/,
          /([\w-]+\.)?unstyled-link($|\()/,
          /([\w-]+\.)?unstyled-list($|\()/,
          /([\w-]+\.)?range-thumb-selectors($|\()/,
          /([\w-]+\.)?range-track-selectors($|\()/,
          /([\w-]+\.)?state($|\()/,
          /([\w-]+\.)?visually-hidden($|\()/,
        ],
      },
      // Legacy functions
      'function-disallowed-list': [
        /([\w-]+\.)?available-names/,
        /([\w-]+\.)?map-extend/,
      ],
      'polaris/global-disallowed-list': [
        // Legacy variables
        / \* \$/,
        // Legacy custom properties
        /--p-override-none/,
        /--p-override-one/,
        /--p-override-zero/,
        /--p-non-null-content/,
      ],
    },
    {
      message: 'Please use a Polaris token',
      meta: {
        url: 'https://github.com/Shopify/polaris/blob/main/stylelint-polaris/README.md#legacy',
      },
    },
  ],
};

/** @type {import('stylelint').Config} */
module.exports = {
  customSyntax: 'postcss-scss',
  reportDescriptionlessDisables: true,
  reportInvalidScopeDisables: [
    true,
    {
      // Report invalid scope disables for all rules except coverage rules
      // Note: This doesn't affect the default Stylelint behavior/reporting
      // and is only need because we dynamically create these rule names
      except: Object.entries(stylelintPolarisCoverageOptions).flatMap(
        ([categoryName, categoryConfigRules]) =>
          Object.keys(categoryConfigRules).map(
            (categoryRuleName) => `polaris/${categoryName}/${categoryRuleName}`,
          ),
      ),
    },
  ],
  plugins: [
    'stylelint-scss',
    './plugins/coverage',
    './plugins/global-disallowed-list',
    './plugins/at-rule-disallowed-list',
    './plugins/custom-property-allowed-list',
    './plugins/media-query-allowed-list',
  ],
  rules: {
    'polaris/coverage': stylelintPolarisCoverageOptions,
  },
};
