const {messages, ruleName} = require('.');

// Allowed media types and media conditions
// https://www.w3.org/TR/mediaqueries-5/#media
const config = {
  allowedMediaTypes: ['print'],
  allowedMediaFeatureNames: ['forced-colors', '-ms-high-contrast'],
  allowedScssInterpolations: [
    /^\$p-breakpoints-(xs|sm|md|lg|xl)-(up|down|only)$/,
  ],
};

testRule({
  ruleName,
  plugins: [__dirname],
  config,
  customSyntax: 'postcss-scss',
  accept: [
    {
      code: '@media #{$p-breakpoints-sm-up} {}',
      description: 'Uses allowed Polaris breakpoints alias',
    },
    {
      code: '@media print {}',
      description: 'Uses allowed media type',
    },
    {
      code: '@media not print and #{$p-breakpoints-sm-up} {}',
      description: 'Uses allowed media type and Polaris breakpoints alias',
    },
    {
      code: '@media #{$p-breakpoints-sm-up} and #{$p-breakpoints-md-down} {}',
      description: 'Uses allowed Polaris breakpoints alias',
    },
    {
      code: '@media (forced-colors: active) {}',
      description: 'Uses allowed media feature name',
    },
    {
      code: '@media (-ms-high-contrast: active) {}',
      description: 'Uses allowed prefixed media feature name',
    },
  ],

  reject: [
    {
      code: '@media (width: 0px) {}',
      description: 'Defining media queries with width',
      message: messages.rejected('(width: 0px)'),
    },
    {
      code: '@media (min-width: 0px) {}',
      description: 'Defining media queries with min-width',
      message: messages.rejected('(min-width: 0px)'),
    },
    {
      code: '@media (max-width: 0px) {}',
      description: 'Defining media queries with max-width',
      message: messages.rejected('(max-width: 0px)'),
    },
    {
      code: '@media (height: 0px) {}',
      description: 'Defining media queries with height',
      message: messages.rejected('(height: 0px)'),
    },
    {
      code: '@media (min-height: 0px) {}',
      description: 'Defining media queries with min-height',
      message: messages.rejected('(min-height: 0px)'),
    },
    {
      code: '@media (max-height: 0px) {}',
      description: 'Defining media queries with max-height',
      message: messages.rejected('(max-height: 0px)'),
    },
    {
      code: '@media (min-width: 0px) and #{$p-breakpoints-sm-up} {}',
      description:
        'Defining media queries with min-width and an allowed Polaris breakpoints alias',
      message: messages.rejected(
        '(min-width: 0px) and #{$p-breakpoints-sm-up}',
      ),
    },
    {
      code: '@media #{$p-breakpoints-sm-up} and (min-width: 0px) {}',
      description:
        'Defining media queries with an allowed Polaris breakpoints alias and min-width',
      message: messages.rejected(
        '#{$p-breakpoints-sm-up} and (min-width: 0px)',
      ),
    },
    {
      code: '@media not print and (min-width: 0px) {}',
      description:
        'Defining media queries with an allowed media type and min-width',
      message: messages.rejected('not print and (min-width: 0px)'),
    },
    {
      code: '@media screen {}',
      description: 'Defining media queries an unsupported media type',
      message: messages.rejected('screen'),
    },
    {
      code: '@media (-ms-high-contrast: active) and (min-width: 0px) {}',
      description:
        'Uses allowed prefixed media feature name and disallowed min-width',
      message: messages.rejected(
        '(-ms-high-contrast: active) and (min-width: 0px)',
      ),
    },
  ],
});
