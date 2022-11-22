module.exports = {
  colors: {
    'color-named': {
      message: (name) =>
        `(color-named): Replace named color "${name}" with a Polaris color token`,
    },
    'color-no-hex': {
      message: (hex) =>
        `(color-no-hex): Replace hex code "${hex}" with a Polaris color token`,
    },
    'declaration-property-value-disallowed-list': {
      message: (prop, value) =>
        `(declaration-property-value-disallowed-list) - Replace ${prop} value "${value}" with a Polaris color token`,
      args: ['prop', 'value'],
    },
    'function-disallowed-list': {
      message: (func) =>
        `(function-disallowed-list): Replace function "${func}" with a Polaris color token`,
    },
    'stylelint-polaris/at-rule-disallowed-list': {
      message: (name, params) =>
        `(at-rule-disallowed-list) - Replace legacy Sass mixin "@${name} ${params} with a Polaris color token`,
      args: ['name', 'params'],
    },
    'stylelint-polaris/global-disallowed-list': {
      message: (value) => {
        const legacyValueTypeMap = {
          // Legacy mixin map-get data
          '$polaris-colors': 'Sass variable',
          '$color-filter-palette-data': 'Sass variable',
          '$color-palette-data': 'Sass variable',
          // Legacy custom properties
          '--p-override-transparent': 'CSS custom property',
          '--p-badge-mix-blend-mode': 'CSS custom property',
        };

        return `(global-disallowed-list) - Replace legacy ${legacyValueTypeMap[value]} "${value}" with a Polaris color token`;
      },
    },
  },
  motion: {
    'at-rule-disallowed-list': {
      message: (atRule) =>
        `(at-rule-disallowed-list) - Replace legacy Sass mixin "${atRule}" with a Polaris motion token`,
    },
    'function-disallowed-list': {
      message: (func) =>
        `(function-disallowed-list) - Replace legacy Sass function "${func}" with a Polaris motion token`,
    },
    'stylelint-polaris/at-rule-disallowed-list': {
      message: (name, params) =>
        `(at-rule-disallowed-list) - Replace legacy Sass mixin "@${name} ${params}} with a Polaris motion token`,
      args: ['name', 'params'],
    },
    'stylelint-polaris/global-disallowed-list': {
      message: (value) => {
        const legacyValueTypeMap = {
          '$duration-data': 'Sass variable',
          '$polaris-duration-map': 'Sass variable',
          '$skeleton-shimmer-duration': 'Sass variable',
          '$easing-data': 'Sass variable',
          // Legacy custom properties
          '--p-range-slider-thumb-scale': 'CSS custom property',
          '--p-duration-1-0-0': 'CSS custom property',
          '--p-duration-1-5-0': 'CSS custom property',
        };

        return `(global-disallowed-list) - Replace legacy ${legacyValueTypeMap[value]} "${value}" with a Polaris motion token`;
      },
    },
  },
  font: {
    'declaration-property-value-disallowed-list': {
      message: (prop, value) =>
        `(declaration-property-value-disallowed-list) - Replace ${prop} value "${value}" with a Polaris font token`,
      args: ['prop', 'value'],
    },
    'function-disallowed-list': {
      message: (func) =>
        `(function-disallowed-list) - Replace legacy Sass function "${func}" with a Polaris font token`,
    },
    'stylelint-polaris/at-rule-disallowed-list': {
      message: (name, params) =>
        `(at-rule-disallowed-list) - Replace legacy Sass mixin "@${name} ${params}} with a Polaris font token`,
      args: ['name', 'params'],
    },
    'stylelint-polaris/global-disallowed-list': {
      message: (value) => {
        const legacyValueTypeMap = {
          '$typography-condensed': 'Sass variable',
          '$base-font-size': 'Sass variable',
          '$line-height-data': 'Sass variable',
          '$font-family-data': 'Sass variable',
          '$font-size-data': 'Sass variable',
          '$default-browser-font-size': 'Sass variable',
          // Legacy custom properties
          '--p-button-font': 'CSS custom property',
          '--p-badge-font': 'CSS custom property',
        };

        return `(global-disallowed-list) - Replace legacy ${legacyValueTypeMap[value]} "${value}" with a Polaris font token`;
      },
    },
  },
  layout: {
    'declaration-property-value-disallowed-list': {
      message: (prop, value) => {
        const messageMap = {
          display: `Replace use of "${prop}: ${value}" with a Polaris layout component if possible`,
          top: `Replace "${prop}" value "${value}" with a px or rem length value`,
          bottom: `Replace "${prop}" value "${value}" with a px or rem length value`,
          left: `Replace "${prop}" value "${value}" with a px or rem length value`,
          right: `Replace "${prop}" value "${value}" with a px or rem length value`,
          width: `Replace "${prop}" value "${value}" with a px or rem length value`,
          height: `Replace "${prop}" value "${value}" with a px or rem length value`,
        };

        return `(declaration-property-value-disallowed-list) - ${messageMap[prop]}`;
      },
      args: ['prop', 'value'],
    },
    'property-disallowed-list': {
      message: (prop) =>
        `(property-disallowed-list) - Replace use of "${prop}" with a Polaris layout component if possible`,
      args: ['prop'],
    },
    'function-disallowed-list': {
      message: (func) =>
        `(function-disallowed-list) - Replace legacy Sass function "${func}" with a px or rem length`,
    },
    'stylelint-polaris/at-rule-disallowed-list': {
      message: (name, params) =>
        `(at-rule-disallowed-list) - Replace legacy Sass mixin "@${name} ${params}" with a Polaris component`,
      args: ['name', 'params'],
    },
    'stylelint-polaris/global-disallowed-list': {
      message: (value) => {
        const legacyValueTypeMap = {
          // Legacy map variables
          '$layout-width-data': 'Sass variable',
          '$navigation-width': 'Sass variable',
          '$small-thumbnail-size': 'Sass variable',
          '$large-thumbnail-size': 'Sass variable',
          '$medium-thumbnail-size': 'Sass variable',
          '$thumbnail-sizes': 'Sass variable',
          // Legacy custom properties
          '--p-range-slider-thumb-size-base': 'CSS custom property',
          '--p-range-slider-thumb-size-active': 'CSS custom property',
          '--p-override-visible': 'CSS custom property',
          '--p-icon-size': 'CSS custom property',
          '--p-choice-size': 'CSS custom property',
        };

        return `(global-disallowed-list) - Replace legacy ${legacyValueTypeMap[value]} "${value}" with a px or rem length`;
      },
    },
  },
  spacing: {
    'function-disallowed-list': {
      message: (func) =>
        `(function-disallowed-list) - Replace legacy Sass function "${func}" with a Polaris token`,
    },
    'stylelint-polaris/global-disallowed-list': {
      message: (value) => {
        const legacyValueTypeMap = {
          // Legacy map variables
          '$polaris-spacing': 'CSS custom property',
          '$spacing-data': 'CSS custom property',
          '$actions-vertical-spacing': 'CSS custom property',
          // Legacy custom properties
          '--p-button-group-item-spacing': 'CSS custom property',
          '--p-choice-margin': 'CSS custom property',
          '--p-text-field-spinner-offset': 'CSS custom property',
        };

        return `(global-disallowed-list) - Replace legacy ${legacyValueTypeMap[value]} "${value}" with a Polaris spacing token`;
      },
    },
  },
  shape: {
    'stylelint-polaris/at-rule-disallowed-list': {
      message: (name, params) =>
        `(at-rule-disallowed-list) - Replace legacy Sass mixin "@${name} ${params}} with a Polaris shape token`,
      args: ['name', 'params'],
    },
    'stylelint-polaris/global-disallowed-list': {
      message: (value) => {
        const legacyValueTypeMap = {
          // Legacy map variables
          '$border-radius-data': 'Sass variable',
          '$border-width-data': 'Sass variable',
          '$borders-data': 'Sass variable',
          // Legacy custom properties
          'var(--p-border-radius-base)': 'CSS custom property',
          'var(--p-border-radius-wide)': 'CSS custom property',
          'var(--p-border-radius-full)': 'CSS custom property',
          'var(--p-control-border-width)': 'CSS custom property',
          'var(--p-thin-border-subdued)': 'CSS custom property',
          'var(--p-banner-border-default)': 'CSS custom property',
          'var(--p-banner-border-success)': 'CSS custom property',
          'var(--p-banner-border-highlight)': 'CSS custom property',
          'var(--p-banner-border-warning)': 'CSS custom property',
          'var(--p-banner-border-critical)': 'CSS custom property',
          'var(--p-text-field-focus-ring-border-radius)': 'CSS custom property',
          'var(--p-text-field-focus-ring-offset)': 'CSS custom property',
        };
        legacyValueTypeMap[value];
        return `(global-disallowed-list) - Replace legacy ${legacyValueTypeMap[value]} "${value}" with a Polaris shape token`;
      },
    },
  },
  depth: {
    'function-disallowed-list': {
      message: (func) =>
        `(function-disallowed-list) - Replace legacy Sass function "${func}" with a Polaris depth token`,
    },
    'stylelint-polaris/global-disallowed-list': {
      message: (value) => {
        const legacyValueTypeMap = {
          // Legacy mixin map-get data
          '$shadows-data': 'Sass variable',
          '$fixed-element-stacking-order': 'Sass variable',
          '$global-elements': 'Sass variable',
          // Legacy custom properties
          '--p-button-drop-shadow': 'CSS custom property',
          '--p-button-inner-shadow': 'CSS custom property',
          '--p-button-pressed-inner-shadow': 'CSS custom property',
          '--p-card-shadow': 'CSS custom property',
          '--p-popover-shadow': 'CSS custom property',
          '--p-modal-shadow': 'CSS custom property',
          '--p-top-bar-shadow': 'CSS custom property',
        };

        return `(global-disallowed-list) - Replace legacy ${legacyValueTypeMap[value]} "${value}" with a Polaris depth token`;
      },
    },
  },
  'z-index': {
    'declaration-property-value-allowed-list': {
      message: (prop, value) =>
        `(declaration-property-value-allowed-list) - Replace "${prop}" value "${value}" with a Polaris z-index token`,
      args: ['prop', 'value'],
    },
    'function-disallowed-list': {
      message: (func) =>
        `(function-disallowed-list) - Replace legacy Sass function "${func}" with a Polaris z-index token`,
    },
    'stylelint-polaris/global-disallowed-list': {
      message: (value) => {
        const legacyValueTypeMap = {
          // Legacy mixin map-get data
          '$fixed-element-stacking-order': 'Sass variable',
          '$global-elements': 'Sass variable',
          // Legacy custom properties
          'var(--p-override-loading-z-index)': 'CSS custom property',
        };

        return `(global-disallowed-list) - Replace legacy ${legacyValueTypeMap[value]} "${value}" with a Polaris z-index token`;
      },
    },
  },
  conventions: {
    'unit-disallowed-list': {
      message: (unit) =>
        `(unit-disallowed-list) - Replace hard-coded value ${
          unit ? `"${unit}" ` : ''
        }with a Polaris token`,
    },
    'stylelint-polaris/custom-properties-allowed-list': {
      message: (value) =>
        `(custom-properties-allowed-list) - Unexpected CSS custom property ${value}`,
    },
  },
  breakpoints: {
    'function-disallowed-list': {
      message: (func) =>
        `(function-disallowed-list) - Replace legacy Sass function "${func}" with a Polaris breakpoint token`,
    },
    'stylelint-polaris/media-queries-allowed-list': {
      message: (name, params) =>
        `(media-query-allowed-list) - Replace media query params "${params}" with a Polaris breakpoint token`,
      args: ['name', 'params'],
    },
    'stylelint-polaris/at-rule-disallowed-list': {
      message: (name, params) =>
        `(at-rule-disallowed-list) - Replace legacy Sass mixin "@${name} ${params}" with a Polaris breakpoint token`,
      args: ['name', 'params'],
    },
  },
  legacy: {
    'function-disallowed-list': {
      message: (func) =>
        `(function-disallowed-list) - Replace legacy Sass function "${func}" with a Polaris token`,
    },
    'stylelint-polaris/at-rule-disallowed-list': {
      message: (name, params) =>
        `(at-rule-disallowed-list) - Unexpected use of legacy Sass mixin "@${name} ${params}"`,
      args: ['name', 'params'],
    },
    'stylelint-polaris/global-disallowed-list': {
      message: (property) => {
        const legacyCustomPropertyMap = {
          '--p-override-none': `"none"`,
          '--p-override-one': `"1"`,
          '--p-override-zero': `"0"`,
          '--p-non-null-content': `""`,
        };

        return `Replace legacy Polaris custom CSS property "${property}" with ${legacyCustomPropertyMap[property]}`;
      },
    },
  },
};
