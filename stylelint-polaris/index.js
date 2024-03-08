/** @type {import('stylelint').Config} */
module.exports = {
  customSyntax: 'postcss-scss',
  reportDescriptionlessDisables: true,
  reportNeedlessDisables: true,
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
    './plugins/custom-property-disallowed-list',
    './plugins/media-query-allowed-list',
    './plugins/declaration-property-value-disallowed-list',
  ],
  rules: {
    'polaris/coverage': true,
  },
};
