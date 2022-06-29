const {messages, ruleName} = require('.');

// Allowed media types and media conditions
// https://www.w3.org/TR/mediaqueries-5/#media
const allowedMedia = ['print', '$p-breakpoints-sm-up'];

testRule({
  ruleName,
  plugins: [__dirname],
  config: {allowedMedia},
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
  ],
});
