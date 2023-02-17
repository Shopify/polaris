const {
  getCustomPropertyNames,
  createVar,
  tokens,
} = require('@shopify/polaris-tokens');

const disallowedUnits = [
  'px',
  'rem',
  'em',
  '%',
  'ex',
  'ch',
  'lh',
  'rlh',
  'vw',
  'vh',
  'vmin',
  'vmax',
  'vb',
  'vi',
  'svw',
  'svh',
  'lvw',
  'lvh',
  'dvw',
  'dvh',
  'cm',
  'mm',
  'Q',
  'in',
  'pc',
  'pt',
];

/**
 * @type {import('./plugins/coverage').PrimaryOptions} The stylelint-polaris/coverage rule expects a 3-dimensional rule config that groups Stylelint rules by coverage categories. It reports problems with dynamic rule names by appending the category to the coverage plugin's rule name

(e.g., Unexpected named color "blue" - Please use a Polaris color token Stylelint(polaris/colors/color-named)")
*/
const stylelintPolarisCoverageOptions = {
  colors: [
    {
      'color-named': 'never',
      'color-no-hex': true,
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
        ...['color-multiply', 'color', 'filter'].map(matchNameRegExp),
      ],
      'polaris/at-rule-disallowed-list': {
        include: [
          // Legacy mixins
          'color-icon',
          'recolor-icon',
          'ms-high-contrast-color',
        ].map(matchNameRegExp),
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
    },
  ],
  motion: [
    {
      'function-disallowed-list': [
        'control-icon-transition',
        'duration',
        'easing',
      ].map(matchNameRegExp),
      'declaration-property-unit-disallowed-list': [
        {
          '/^animation/': ['ms', 's'],
          '/^transition/': ['ms', 's'],
        },
      ],
      'at-rule-disallowed-list': ['keyframes'],
      'polaris/at-rule-disallowed-list': {
        include: ['skeleton-shimmer'].map(matchNameRegExp),
      },
      'polaris/global-disallowed-list': [
        // Legacy mixin map-get data
        /\$duration-data/,
        /\$polaris-duration-map/,
        /\$skeleton-shimmer-duration/,
        /\$easing-data/,
        // Legacy custom properties
        /--p-duration-1-0-0/,
        /--p-duration-1-5-0/,
      ],
    },
    {
      message: 'Please use a Polaris motion token',
    },
  ],
  typography: [
    {
      'polaris/declaration-property-value-disallowed-list': {
        'font-weight': [/(\$.*|[0-9]+)/],
      },
      'declaration-property-unit-disallowed-list': [
        {
          '/^font/': disallowedUnits,
          'line-height': disallowedUnits,
        },
      ],
      'property-disallowed-list': ['text-transform'],
      'function-disallowed-list': [
        'font-family',
        'font-size',
        'line-height',
      ].map(matchNameRegExp),
      'polaris/at-rule-disallowed-list': {
        include: [
          'truncate',
          'text-breakword',
          'text-emphasis-normal',
          'text-emphasis-strong',
          'text-emphasis-subdued',
          'text-style-body',
          'text-style-button-large',
          'text-style-button',
          'text-style-caption',
          'text-style-display-large',
          'text-style-display-medium',
          'text-style-display-small',
          'text-style-display-x-large',
          'text-style-heading',
          'text-style-input',
          'text-style-subheading',
        ].map(matchNameRegExp),
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
      message: 'Please use a Polaris font token or typography component',
    },
  ],
  layout: [
    {
      // 'declaration-property-value-disallowed-list': [
      //   {
      //     top: [/(?!var\(--p-).+$/],
      //     bottom: [/(?!var\(--p-).+$/],
      //     left: [/(?!var\(--p-).+$/],
      //     right: [/(?!var\(--p-).+$/],
      //     '/^width/': [/(?!var\(--p-).+$/],
      //     '/^height/': [/(?!var\(--p-).+$/],
      //   },
      //   {severity: 'warning'},
      // ],
      // 'property-disallowed-list': [
      //   [
      //     'position',
      //     'grid',
      //     'flex',
      //     'flex-grow',
      //     'flex-shrink',
      //     'flex-basis',
      //     'justify-content',
      //     'align-items',
      //     'grid-row',
      //     'grid-row-start',
      //     'grid-row-end',
      //     'grid-column',
      //     'grid-column-start',
      //     'grid-column-end',
      //     'grid-template',
      //     'grid-template-areas',
      //     'grid-template-rows',
      //     'grid-template-columns',
      //     'grid-area',
      //     'display',
      //   ],
      //   {severity: 'warning'},
      // ],
      'function-disallowed-list': [
        'nav-min-window-corrected',
        'control-height',
        'control-slim-height',
        'mobile-nav-width',
        'thumbnail-size',
        'icon-size',
        'top-bar-height',
      ].map(matchNameRegExp),
      'polaris/at-rule-disallowed-list': {
        include: [
          'layout-flex-fix',
          'safe-area-for',
          'skeleton-page-header-layout',
          'skeleton-page-secondary-actions-layout',
        ].map(matchNameRegExp),
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
        /--p-range-slider-thumb-scale/,
        /--p-override-visible/,
        /--p-icon-size/,
        /--p-choice-size/,
      ],
    },
    {
      message: 'Please use a Polaris layout component',
    },
  ],
  spacing: [
    {
      'function-disallowed-list': ['control-vertical-padding', 'spacing'].map(
        matchNameRegExp,
      ),
      'declaration-property-unit-disallowed-list': [
        {
          '/^padding/': disallowedUnits,
          '/^margin/': disallowedUnits,
          '/^gap/': disallowedUnits,
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
    },
  ],
  shape: [
    {
      'function-disallowed-list': [
        'border-radius',
        'border-width',
        'border',
      ].map(matchNameRegExp),
      'declaration-property-unit-disallowed-list': [
        {
          'border-width': disallowedUnits,
          border: disallowedUnits,
          'border-radius': disallowedUnits,
          'outline-offset': disallowedUnits,
          outline: disallowedUnits,
        },
      ],
      'polaris/at-rule-disallowed-list': {
        include: [
          'high-contrast-border',
          'high-contrast-button-outline',
          'high-contrast-outline',
          'focus-ring',
          'no-focus-ring',
        ].map(matchNameRegExp),
      },
      'polaris/global-disallowed-list': [
        // Legacy mixin map-get data
        /\$border-radius-data/,
        /\$border-width-data/,
        /\$borders-data/,
        // Legacy custom properties
        // /--p-border-radius-base/,
        /--p-border-radius-wide/,
        // /--p-border-radius-full/,
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
    },
  ],
  depth: [
    {
      'function-disallowed-list': ['shadow'].map(matchNameRegExp),
      'declaration-property-unit-disallowed-list': [
        {
          'box-shadow': disallowedUnits,
        },
      ],
      'property-disallowed-list': ['text-shadow'],
      'polaris/global-disallowed-list': [
        // Legacy mixin map-get data
        /\$shadows-data/,
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
    },
  ],
  'z-index': [
    {
      'declaration-property-value-allowed-list': [
        {
          'z-index': Object.keys(tokens.zIndex).map(
            (token) => `var(${createVar(token)})`,
          ),
        },
      ],
      'function-disallowed-list': ['z-index'].map(matchNameRegExp),
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
    },
  ],
  conventions: {
    'polaris/custom-property-allowed-list': {
      // Allows definition of custom properties not prefixed with `--p-`, `--pc-`, or `--polaris-version-`
      allowedProperties: [/--(?!(p|pc|polaris-version)-).+/],
      // Allows use of custom properties prefixed with `--p-` that are valid Polaris tokens
      allowedValues: {
        '/.+/': [
          // Note: Order is important
          // This pattern allows use of `--p-*` custom properties that are valid Polaris tokens
          ...getCustomPropertyNames(tokens),
          // This pattern flags unknown `--p-*` custom properties or usage of deprecated `--pc-*` custom properties private to polaris-react
          /--(?!(p|pc)-).+/,
        ],
      },
    },
  },
  'media-queries': [
    {
      'polaris/media-query-allowed-list': {
        // Allowed media types and media conditions
        // https://www.w3.org/TR/mediaquery5/#media
        allowedMediaTypes: ['print', 'screen'],
        allowedMediaFeatureNames: ['forced-colors', '-ms-high-contrast'],
        allowedScssInterpolations: [
          // TODO: Add utility to @shopify/polaris-tokens to getMediaConditionNames
          matchNameRegExp(
            String.raw`\$p-breakpoints-(xs|sm|md|lg|xl)-(up|down|only)`,
          ),
        ],
      },
      // Legacy functions
      'function-disallowed-list': ['breakpoint', 'layout-width'].map(
        matchNameRegExp,
      ),
      // Legacy mixins
      'polaris/at-rule-disallowed-list': {
        include: [
          'after-topbar-sheet',
          'breakpoint-after',
          'breakpoint-before',
          'frame-when-nav-displayed',
          'frame-when-nav-hidden',
          'frame-with-nav-when-not-max-width',
          'page-actions-layout',
          'page-content-breakpoint-after',
          'page-content-breakpoint-before',
          'page-content-layout',
          'page-content-when-fully-condensed',
          'page-content-when-layout-not-stacked',
          'page-content-when-layout-stacked',
          'page-content-when-not-fully-condensed',
          'page-content-when-not-partially-condensed',
          'page-content-when-partially-condensed',
          'page-header-has-navigation',
          'page-header-has-secondary-actions',
          'page-header-layout',
          'page-header-without-navigation',
          'page-layout',
          'page-padding-not-fully-condensed',
          'page-padding-not-partially-condensed',
          'page-title-layout',
          'page-when-not-max-width',
          'when-typography-condensed',
          'when-typography-not-condensed',
          'when-not-printing',
          'hidden-when-printing',
          'print-hidden',
        ].map(matchNameRegExp),
      },
    },
    {
      message: 'Please use a Polaris breakpoint token',
    },
  ],
  legacy: [
    {
      // Legacy mixins
      'polaris/at-rule-disallowed-list': {
        include: [
          'base-button-disabled',
          'button-base',
          'button-filled',
          'button-full-width',
          'button-outline-disabled',
          'button-outline',
          'control-backdrop',
          'list-selected-indicator',
          'plain-button-backdrop',
          'unstyled-button',
          'skeleton-content',
          'unstyled-input',
          'unstyled-link',
          'unstyled-list',
          'range-thumb-selectors',
          'range-track-selectors',
          'state',
          'visually-hidden',
        ].map(matchNameRegExp),
      },
      // Legacy functions
      'function-disallowed-list': [
        'available-names',
        'map-extend',
        'em',
        'px',
        'rem',
      ].map(matchNameRegExp),
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
      message: 'Please use a Polaris token or component',
    },
  ],
};

/** @type {import('stylelint').Config} */
module.exports = {
  customSyntax: 'postcss-scss',
  reportNeedlessDisables: [
    true,
    {
      // Report needless disables for all rules except layout coverage rules
      // Note: This doesn't affect the default Stylelint behavior/reporting
      // and is only need because we dynamically create these rule names
      except: ['all', /^polaris\/layout\/.+$/],
    },
  ],
  reportInvalidScopeDisables: [
    true,
    {
      // Report invalid scope disables for all rules except coverage rules
      // Note: This doesn't affect the default Stylelint behavior/reporting
      // and is only need because we dynamically create these rule names
      except: /^polaris\/.+?\/.+$/,
    },
  ],
  plugins: [
    'stylelint-scss',
    './plugins/coverage',
    './plugins/global-disallowed-list',
    './plugins/at-rule-disallowed-list',
    './plugins/custom-property-allowed-list',
    './plugins/media-query-allowed-list',
    './plugins/declaration-property-value-disallowed-list',
  ],
  rules: {
    'polaris/coverage': stylelintPolarisCoverageOptions,
  },
};

function matchNameRegExp(name) {
  // Using `^` to match the start of a string since postcss normalizes name properties
  // https://regex101.com/r/3tzvIW/1
  return new RegExp(String.raw`^([\w-]+\.)?(?<![\w-])${name}(?![\w-])`);
}
