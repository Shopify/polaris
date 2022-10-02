const {messages, ruleName} = require('.');

const config = {
  atUseURLPatterns: [/legacy-polaris-v8$/, /styles\/breakpoints$/],
};

const atUseLegacyPolaris = `@use './legacy-polaris-v8'`;
const atUseLegacyPolarisReNamespaced = `${atUseLegacyPolaris} as v8`;
const atUseBreakpointsReNamespaced = `@use './styles/breakpoints' as bp`;
const atUseLegacyPolarisMultiline = `@use ${atUseLegacyPolaris}
  as v8 with (
    $var1: 1px,
    $var2: 2px,
)`;

testRule({
  ruleName,
  plugins: [__dirname],
  config,
  customSyntax: 'postcss-scss',
  accept: [
    {
      code: `${atUseLegacyPolaris}; .class#{legacy-polaris-v8.$var} {}`,
      description: 'Namespaced Sass variable interpolated in a selector',
    },
    {
      code: `${atUseLegacyPolaris}; .class#{legacy-polaris-v8.func()} {}`,
      description: 'Namespaced Sass function interpolated in a selector',
    },
    {
      code: `${atUseLegacyPolarisReNamespaced}; .class#{v8.$var} {}`,
      description: 'Re-namespaced Sass variable interpolated in a selector',
    },
    {
      code: `${atUseLegacyPolarisReNamespaced}; @include v8.mixin;`,
      description: 'Re-namespaced Sass mixin',
    },
    {
      code: `${atUseLegacyPolarisReNamespaced}; @include v8.mixin();`,
      description: 'Re-namespaced Sass mixin with parentheses',
    },
    {
      code: `${atUseLegacyPolarisReNamespaced}; @include mixin(v8.$var);`,
      description: 'Re-namespaced arg in Sass mixin',
    },
    {
      code: `${atUseLegacyPolarisReNamespaced}; .class { color: v8.func(); }`,
      description: 'Re-namespaced Sass declaration value',
    },
    {
      code: `${atUseLegacyPolarisReNamespaced}; .class { background: url('image-#{v8.$var}.png'); }`,
      description: 'Re-namespaced Sass declaration value',
    },
    {
      code: `${atUseLegacyPolarisReNamespaced}; @include /* comment */v8.mixin;`,
      description: 'Re-namespaced Sass mixin with comment before',
    },
    {
      code: `${atUseLegacyPolarisReNamespaced}; @include v8.mixin/* comment */;`,
      description: 'Re-namespaced Sass mixin with comment after',
    },
    {
      code: `${atUseLegacyPolarisReNamespaced}; @include v8.m/* comment */ixin;`,
      description: 'Re-namespaced Sass mixin with comment inside',
    },
    // TODO: Investigate why PostCSS is not removing the comment
    // {
    //   code: `${atUseLegacyPolarisReNamespaced}; @include v8./* comment */mixin;`,
    //   description: 'Re-namespaced Sass mixin with comment inside',
    // },
    {
      code: `${atUseLegacyPolarisReNamespaced}; .class#{v8.$var + v8.func()} {}`,
      description: 'Complex Sass expressions interpolated in a selector',
    },
    {
      code: `${atUseLegacyPolarisReNamespaced}; .class#{v8.$var}#{v8.func()} {}`,
      description: 'Multiple Sass expressions interpolated in a selector',
    },
    {
      code: `${atUseLegacyPolarisReNamespaced}; ${atUseBreakpointsReNamespaced}; @media #{bp.$var}{.class{color: v8.func()}}`,
      description: 'Multiple modules used in a stylesheet',
    },
    {
      code: `${atUseLegacyPolarisMultiline}; ${atUseBreakpointsReNamespaced}; @media #{bp.$var}{.class{color: v8.func()}}`,
      description: 'Multiple multiline modules used in a stylesheet',
    },
  ],

  reject: [
    {
      code: `${atUseLegacyPolaris}; .class {}`,
      description: 'Unused namespaced in a selector',
      message: messages.rejected('legacy-polaris-v8'),
    },
    {
      code: `${atUseLegacyPolarisReNamespaced}; .class {}`,
      description: 'Unused re-namespace in a selector',
      message: messages.rejected('legacy-polaris-v8', 'v8'),
    },
    {
      code: `${atUseLegacyPolarisReNamespaced}; /* v8.$var */`,
      description: 'Unused module (ignore namespace-like comments)',
      message: messages.rejected('legacy-polaris-v8', 'v8'),
    },
    {
      code: `${atUseLegacyPolarisReNamespaced}; .utils.func {}`,
      description: 'Unused module (ignore namespace-like selector)',
      message: messages.rejected('legacy-polaris-v8', 'v8'),
    },
    {
      code: `${atUseLegacyPolarisReNamespaced}; .class { background: url('v8.func'); }`,
      description: 'Unused module (ignore namespace-like URL)',
      message: messages.rejected('legacy-polaris-v8', 'v8'),
    },
    {
      code: `${atUseLegacyPolarisReNamespaced}; .class { background: url('/v8.func'); }`,
      description:
        'Unused module (ignore namespace-like URL with leading slash)',
      message: messages.rejected('legacy-polaris-v8', 'v8'),
    },
  ],
});
