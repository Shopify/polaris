const path = require('path');

/* eslint-disable require-await */
/** @type {import('next').NextConfig} */
const nextConfig = {
  // See: https://nextjs.org/docs/advanced-features/output-file-tracing#automatically-copying-traced-files
  output: 'standalone',
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    scrollRestoration: true,
    // this includes files from the monorepo base one directory up
    outputFileTracingRoot: path.join(__dirname, '../'),
    // Force usage of SWC even though we have a babel file (it's used to
    // configure Jest only)
    //forceSwcTransforms: true,
  },
  async rewrites() {
    return [
      // We want to rewrite the sandbox route in production
      // to point at the public directory that our playroom assets are built to
      // We leverage a rewrite here instead of a redirect in order to preserve
      // a "pretty" url for the main playroom editor.
      ...(process.env.NODE_ENV !== 'production'
        ? [
            {
              source: '/playroom/:path*',
              destination: 'http://localhost:9000/:path*',
            },
          ]
        : []),
    ];
  },

  async redirects() {
    return [
      // We run a redirect to port 9000 for non prod environments
      // as playroom files aren't built to the public directory in dev mode.
      // We redirect to /preview/index.html here because Playroom's webpack is configured
      // to generate an html file for the preview page that reaches for assets in the root directory via a relative path.
      // In this case we don't care about a pretty url, and want to make absolutely certain that the browser is pointing to preview/index.html
      // such that it resolves the relative asset requests correctly.
      {
        source: '/playroom',
        destination: '/playroom/index.html',
        permanent: true,
      },
      {
        source: '/playroom/preview',
        destination: '/playroom/preview/index.html',
        permanent: true,
      },
      {
        source: '/components/get-started',
        destination: '/components',
        permanent: true,
      },
      {
        source: '/foundations/foundations/:slug',
        destination: '/foundations/:slug',
        permanent: true,
      },
      {
        source: '/foundations/content/:slug',
        destination: '/content/:slug',
        permanent: true,
      },
      {
        source: '/design/space',
        destination: '/design/layout',
        permanent: true,
      },
      {
        source: '/foundations/design/:slug',
        destination: '/design/:slug',
        permanent: true,
      },
      {
        source: '/foundations/patterns/:slug',
        destination: '/patterns/:slug',
        permanent: true,
      },
      {
        source: '/foundations/patterns/layout',
        destination: '/foundations/patterns/page-layouts',
        permanent: true,
      },
      {
        source: '/foundations/foundations/designing-apps',
        destination: 'https://shopify.dev/apps/design-guidelines',
        permanent: true,
      },
      {
        source: '/foundations/content/app-release-notes',
        destination: 'https://shopify.dev/apps/design-guidelines',
        permanent: true,
      },
      {
        source: '/tokens/all-tokens',
        destination: '/tokens/color',
        permanent: true,
      },
      {
        source: '/tokens',
        destination: '/tokens/color',
        permanent: true,
      },
      {
        source: '/legal/license',
        destination: 'https://github.com/Shopify/polaris/blob/main/LICENSE.md',
        permanent: true,
      },
      {
        source: '/patterns/error-messages',
        destination: '/content/error-messages',
        permanent: true,
      },
      {
        source: '/patterns/help-content',
        destination: '/content/help-content',
        permanent: true,
      },
      {
        source: '/patterns/loading',
        destination: '/patterns-legacy/loading',
        permanent: true,
      },
      {
        source: '/patterns/new-badge',
        destination: '/patterns-legacy/new-badge',
        permanent: true,
      },
      {
        source: '/patterns/pickers',
        destination: '/patterns-legacy/pickers',
        permanent: true,
      },
      {
        source: '/patterns/text-fields',
        destination: '/patterns-legacy/text-fields',
        permanent: true,
      },
      {
        source: '/patterns-legacy',
        destination: '/patterns#legacy',
        permanent: true,
      },
      {
        source: '/coming-soon',
        destination: '/coming-soon/view-transitions',
        permanent: false,
      },
      ...whatsNew,
      ...actions,
      ...deprecated,
      ...feedbackIndicators,
      ...imagesAndIcons,
      ...layoutAndStructure,
      ...lists,
      ...navigation,
      ...overlays,
      ...selectionAndInput,
      ...stylelintPolaris,
      ...tables,
      ...tokens,
      ...typography,
      ...utilities,
    ];
  },
};

module.exports = nextConfig;

const whatsNew = [
  {
    source: '/new-design-language',
    destination: '/whats-new/version-12',
    permanent: true,
  },
];

const actions = [
  {
    source: '/components/account-connection',
    destination: '/components/actions/account-connection',
    permanent: true,
  },
  {
    source: '/components/button-group',
    destination: '/components/actions/button-group',
    permanent: true,
  },
  {
    source: '/components/button',
    destination: '/components/actions/button',
    permanent: true,
  },
  {
    source: '/components/page-actions',
    destination: '/components/actions/page-actions',
    permanent: true,
  },
];

const deprecated = [
  {
    source: '/components/caption',
    destination: '/components/deprecated/caption',
    permanent: true,
  },
  {
    source: '/components/card',
    destination: '/components/deprecated/card',
    permanent: true,
  },
  {
    source: '/components/display-text',
    destination: '/components/deprecated/display-text',
    permanent: true,
  },
  {
    source: '/components/heading',
    destination: '/components/deprecated/heading',
    permanent: true,
  },
  {
    source: '/components/selection-and-input/legacy-filters',
    destination: '/components/deprecated/legacy-filters',
    permanent: true,
  },
  {
    source: '/components/layout-and-structure/legacy-card',
    destination: '/components/deprecated/legacy-card',
    permanent: true,
  },
  {
    source: '/components/layout-and-structure/legacy-stack',
    destination: '/components/deprecated/legacy-stack',
    permanent: true,
  },
  {
    source: '/components/navigation/legacy-tabs',
    destination: '/components/deprecated/legacy-tabs',
    permanent: true,
  },
  {
    source: '/components/selection-and-input/setting-toggle',
    destination: '/components/deprecated/setting-toggle',
    permanent: true,
  },
  {
    source: '/components/setting-toggle',
    destination: '/components/deprecated/setting-toggle',
    permanent: true,
  },
  {
    source: '/components/sheet',
    destination: '/components/deprecated/sheet',
    permanent: true,
  },
  {
    source: '/components/subheading',
    destination: '/components/deprecated/subheading',
    permanent: true,
  },
  {
    source: '/components/text-container',
    destination: '/components/deprecated/text-container',
    permanent: true,
  },
  {
    source: '/components/text-style',
    destination: '/components/deprecated/text-style',
    permanent: true,
  },
  {
    source: '/components/visually-hidden',
    destination: '/components/deprecated/visually-hidden',
    permanent: true,
  },
];

const feedbackIndicators = [
  {
    source: '/components/badge',
    destination: '/components/feedback-indicators/badge',
    permanent: true,
  },
  {
    source: '/components/banner',
    destination: '/components/feedback-indicators/banner',
    permanent: true,
  },
  {
    source: '/components/exception-list',
    destination: '/components/feedback-indicators/exception-list',
    permanent: true,
  },
  {
    source: '/components/loading',
    destination: '/components/deprecated/loading',
    permanent: true,
  },
  {
    source: '/components/feedback-indicators/loading',
    destination: '/components/deprecated/loading',
    permanent: true,
  },
  {
    source: '/components/progress-bar',
    destination: '/components/feedback-indicators/progress-bar',
    permanent: true,
  },
  {
    source: '/components/skeleton-body-text',
    destination: '/components/feedback-indicators/skeleton-body-text',
    permanent: true,
  },
  {
    source: '/components/skeleton-display-text',
    destination: '/components/feedback-indicators/skeleton-display-text',
    permanent: true,
  },
  {
    source: '/components/skeleton-page',
    destination: '/components/feedback-indicators/skeleton-page',
    permanent: true,
  },
  {
    source: '/components/skeleton-tabs',
    destination: '/components/feedback-indicators/skeleton-tabs',
    permanent: true,
  },
  {
    source: '/components/skeleton-thumbnail',
    destination: '/components/feedback-indicators/skeleton-thumbnail',
    permanent: true,
  },
  {
    source: '/components/spinner',
    destination: '/components/feedback-indicators/spinner',
    permanent: true,
  },
  {
    source: '/components/toast',
    destination: '/components/deprecated/toast',
    permanent: true,
  },
  {
    source: '/components/feedback-indicators/toast',
    destination: '/components/deprecated/toast',
    permanent: true,
  },
];

const imagesAndIcons = [
  {
    source: '/components/avatar',
    destination: '/components/images-and-icons/avatar',
    permanent: true,
  },
  {
    source: '/components/icon',
    destination: '/components/images-and-icons/icon',
    permanent: true,
  },
  {
    source: '/components/keyboard-key',
    destination: '/components/images-and-icons/keyboard-key',
    permanent: true,
  },
  {
    source: '/components/thumbnail',
    destination: '/components/images-and-icons/thumbnail',
    permanent: true,
  },
  {
    source: '/components/video-thumbnail',
    destination: '/components/images-and-icons/video-thumbnail',
    permanent: true,
  },
];

const layoutAndStructure = [
  {
    source: '/components/alpha-card',
    destination: '/components/layout-and-structure/card',
    permanent: true,
  },
  {
    source: '/components/card',
    destination: '/components/layout-and-structure/card',
    permanent: true,
  },
  {
    source: '/components/bleed',
    destination: '/components/layout-and-structure/bleed',
    permanent: true,
  },
  {
    source: '/components/box',
    destination: '/components/layout-and-structure/box',
    permanent: true,
  },
  {
    source: '/components/callout-card',
    destination: '/components/layout-and-structure/callout-card',
    permanent: true,
  },
  {
    source: '/components/layout-and-structure/columns',
    destination: '/components/layout-and-structure/inline-grid',
    permanent: true,
  },
  {
    source: '/components/layout-and-structure/horizontal-grid',
    destination: '/components/layout-and-structure/inline-grid',
    permanent: true,
  },
  {
    source: '/components/divider',
    destination: '/components/layout-and-structure/divider',
    permanent: true,
  },
  {
    source: '/components/structure/empty-state',
    destination: '/components/layout-and-structure/empty-state',
    permanent: true,
  },
  {
    source: '/components/empty-state',
    destination: '/components/layout-and-structure/empty-state',
    permanent: true,
  },
  {
    source: '/components/form-layout',
    destination: '/components/layout-and-structure/form-layout',
    permanent: true,
  },
  {
    source: '/components/forms/form-layout',
    destination: '/components/layout-and-structure/form-layout',
    permanent: true,
  },
  {
    source: '/components/grid',
    destination: '/components/layout-and-structure/grid',
    permanent: true,
  },
  {
    source: '/components/layout-and-structure/horizontal-stack',
    destination: '/components/layout-and-structure/inline-stack',
    permanent: true,
  },
  {
    source: '/components/structure/layout',
    destination: '/components/layout-and-structure/layout',
    permanent: true,
  },
  {
    source: '/components/layout',
    destination: '/components/layout-and-structure/layout',
    permanent: true,
  },
  {
    source: '/components/legacy-card',
    destination: '/components/layout-and-structure/legacy-card',
    permanent: true,
  },
  {
    source: '/components/legacy-stack',
    destination: '/components/layout-and-structure/legacy-stack',
    permanent: true,
  },
  {
    source: '/components/media-card',
    destination: '/components/layout-and-structure/media-card',
    permanent: true,
  },
  {
    source: '/components/structure/page',
    destination: '/components/layout-and-structure/page',
    permanent: true,
  },
  {
    source: '/components/page',
    destination: '/components/layout-and-structure/page',
    permanent: true,
  },
  {
    source: '/components/layout-and-structure/vertical-stack',
    destination: '/components/layout-and-structure/block-stack',
    permanent: true,
  },
  {
    source: '/components/stack',
    destination: '/components/layout-and-structure/block-stack',
    permanent: true,
  },
];

const lists = [
  {
    source: '/components/action-list',
    destination: '/components/lists/action-list',
    permanent: true,
  },
  {
    source: '/components/description-list',
    destination: '/components/lists/description-list',
    permanent: true,
  },
  {
    source: '/components/list',
    destination: '/components/lists/list',
    permanent: true,
  },
  {
    source: '/components/listbox',
    destination: '/components/lists/listbox',
    permanent: true,
  },
  {
    source: '/components/option-list',
    destination: '/components/lists/option-list',
    permanent: true,
  },
  {
    source: '/components/resource-item',
    destination: '/components/lists/resource-item',
    permanent: true,
  },
  {
    source: '/components/resource-list',
    destination: '/components/lists/resource-list',
    permanent: true,
  },
];

const navigation = [
  {
    source: '/components/footer-help',
    destination: '/components/navigation/footer-help',
    permanent: true,
  },
  {
    source: '/components/fullscreen-bar',
    destination: '/components/navigation/fullscreen-bar',
    permanent: true,
  },
  {
    source: '/components/link',
    destination: '/components/navigation/link',
    permanent: true,
  },
  {
    source: '/components/navigation',
    destination: '/components/deprecated/navigation',
    permanent: true,
  },
  {
    source: '/components/navigation/navigation',
    destination: '/components/deprecated/navigation',
    permanent: true,
  },
  {
    source: '/components/pagination',
    destination: '/components/navigation/pagination',
    permanent: true,
  },
  {
    source: '/components/tabs',
    destination: '/components/navigation/tabs',
    permanent: true,
  },
  {
    source: '/components/top-bar',
    destination: '/components/deprecated/top-bar',
    permanent: true,
  },
  {
    source: '/components/navigation/top-bar',
    destination: '/components/deprecated/top-bar',
    permanent: true,
  },
];

const overlays = [
  {
    source: '/components/modal',
    destination: '/components/deprecated/modal',
    permanent: true,
  },
  {
    source: '/components/overlays/modal',
    destination: '/components/deprecated/modal',
    permanent: true,
  },
  {
    source: '/components/popover',
    destination: '/components/overlays/popover',
    permanent: true,
  },
  {
    source: '/components/tooltip',
    destination: '/components/overlays/tooltip',
    permanent: true,
  },
];

const selectionAndInput = [
  {
    source: '/components/autocomplete',
    destination: '/components/selection-and-input/autocomplete',
    permanent: true,
  },
  {
    source: '/components/checkbox',
    destination: '/components/selection-and-input/checkbox',
    permanent: true,
  },
  {
    source: '/components/choice-list',
    destination: '/components/selection-and-input/choice-list',
    permanent: true,
  },
  {
    source: '/components/forms/choice-list',
    destination: '/components/selection-and-input/choice-list',
    permanent: true,
  },
  {
    source: '/components/color-picker',
    destination: '/components/selection-and-input/color-picker',
    permanent: true,
  },
  {
    source: '/components/combobox',
    destination: '/components/selection-and-input/combobox',
    permanent: true,
  },
  {
    source: '/components/contextual-save-bar',
    destination: '/components/deprecated/contextual-save-bar',
    permanent: true,
  },
  {
    source: '/components/selection-and-input/contextual-save-bar',
    destination: '/components/deprecated/contextual-save-bar',
    permanent: true,
  },
  {
    source: '/components/date-picker',
    destination: '/components/selection-and-input/date-picker',
    permanent: true,
  },
  {
    source: '/components/drop-zone',
    destination: '/components/selection-and-input/drop-zone',
    permanent: true,
  },
  {
    source: '/components/filters',
    destination: '/components/selection-and-input/filters',
    permanent: true,
  },
  {
    source: '/components/form',
    destination: '/components/selection-and-input/form',
    permanent: true,
  },
  {
    source: '/components/forms/form',
    destination: '/components/selection-and-input/form',
    permanent: true,
  },
  {
    source: '/components/inline-error',
    destination: '/components/selection-and-input/inline-error',
    permanent: true,
  },
  {
    source: '/components/radio-button',
    destination: '/components/selection-and-input/radio-button',
    permanent: true,
  },
  {
    source: '/components/range-slider',
    destination: '/components/selection-and-input/range-slider',
    permanent: true,
  },
  {
    source: '/components/select',
    destination: '/components/selection-and-input/select',
    permanent: true,
  },
  {
    source: '/components/forms/select',
    destination: '/components/selection-and-input/select',
    permanent: true,
  },
  {
    source: '/components/tag',
    destination: '/components/selection-and-input/tag',
    permanent: true,
  },
  {
    source: '/components/text-field',
    destination: '/components/selection-and-input/text-field',
    permanent: true,
  },
  {
    source: '/components/forms/text-field',
    destination: '/components/selection-and-input/text-field',
    permanent: true,
  },
];

const stylelintPolaris = [
  {
    source: '/tools/stylelint-polaris/rules/colors-at-rule-disallowed-list',
    destination: '/tools/stylelint-polaris/rules/color-at-rule-disallowed-list',
    permanent: true,
  },
  {
    source: '/tools/stylelint-polaris/rules/colors-color-named',
    destination: '/tools/stylelint-polaris/rules/color-color-named',
    permanent: true,
  },
  {
    source: '/tools/stylelint-polaris/rules/colors-color-no-hex',
    destination: '/tools/stylelint-polaris/rules/color-color-no-hex',
    permanent: true,
  },
  {
    source:
      '/tools/stylelint-polaris/rules/colors-custom-property-disallowed-list',
    destination:
      '/tools/stylelint-polaris/rules/color-custom-property-disallowed-list',
    permanent: true,
  },
  {
    source:
      '/tools/stylelint-polaris/rules/colors-declaration-property-value-disallowed-list',
    destination:
      '/tools/stylelint-polaris/rules/color-declaration-property-value-disallowed-list',
    permanent: true,
  },
  {
    source: '/tools/stylelint-polaris/rules/colors-function-disallowed-list',
    destination:
      '/tools/stylelint-polaris/rules/color-function-disallowed-list',
    permanent: true,
  },
  {
    source: '/tools/stylelint-polaris/rules/colors-global-disallowed-list',
    destination: '/tools/stylelint-polaris/rules/color-global-disallowed-list',
    permanent: true,
  },
  {
    source:
      '/tools/stylelint-polaris/rules/depth-custom-property-disallowed-list',
    destination:
      '/tools/stylelint-polaris/rules/shadow-custom-property-disallowed-list',
    permanent: true,
  },
  {
    source:
      '/tools/stylelint-polaris/rules/depth-declaration-property-unit-disallowed-list',
    destination:
      '/tools/stylelint-polaris/rules/shadow-declaration-property-unit-disallowed-list',
    permanent: true,
  },
  {
    source: '/tools/stylelint-polaris/rules/depth-function-disallowed-list',
    destination:
      '/tools/stylelint-polaris/rules/shadow-function-disallowed-list',
    permanent: true,
  },
  {
    source: '/tools/stylelint-polaris/rules/depth-global-disallowed-list',
    destination: '/tools/stylelint-polaris/rules/shadow-global-disallowed-list',
    permanent: true,
  },
  {
    source: '/tools/stylelint-polaris/rules/depth-property-disallowed-list',
    destination:
      '/tools/stylelint-polaris/rules/shadow-property-disallowed-list',
    permanent: true,
  },
  {
    source: '/tools/stylelint-polaris/rules/shape-at-rule-disallowed-list',
    destination:
      '/tools/stylelint-polaris/rules/border-at-rule-disallowed-list',
    permanent: true,
  },
  {
    source:
      '/tools/stylelint-polaris/rules/shape-custom-property-disallowed-list',
    destination:
      '/tools/stylelint-polaris/rules/border-custom-property-disallowed-list',
    permanent: true,
  },
  {
    source:
      '/tools/stylelint-polaris/rules/shape-declaration-property-unit-disallowed-list',
    destination:
      '/tools/stylelint-polaris/rules/border-declaration-property-unit-disallowed-list',
    permanent: true,
  },
  {
    source: '/tools/stylelint-polaris/rules/shape-function-disallowed-list',
    destination:
      '/tools/stylelint-polaris/rules/border-function-disallowed-list',
    permanent: true,
  },
  {
    source:
      '/tools/stylelint-polaris/rules/spacing-custom-property-disallowed-list',
    destination:
      '/tools/stylelint-polaris/rules/space-custom-property-disallowed-list',
    permanent: true,
  },
  {
    source:
      '/tools/stylelint-polaris/rules/spacing-declaration-property-unit-disallowed-list',
    destination:
      '/tools/stylelint-polaris/rules/space-declaration-property-unit-disallowed-list',
    permanent: true,
  },
  {
    source: '/tools/stylelint-polaris/rules/spacing-function-disallowed-list',
    destination:
      '/tools/stylelint-polaris/rules/space-function-disallowed-list',
    permanent: true,
  },
  {
    source: '/tools/stylelint-polaris/rules/spacing-global-disallowed-list',
    destination: '/tools/stylelint-polaris/rules/space-global-disallowed-list',
    permanent: true,
  },
];

const tables = [
  {
    source: '/components/table',
    destination: '/components/tables/table',
    permanent: true,
  },
  {
    source: '/components/index-table',
    destination: '/components/tables/index-table',
    permanent: true,
  },
  {
    source: '/components/lists-and-tables/index-table',
    destination: '/components/tables/index-table',
    permanent: true,
  },
];

const tokens = [
  {
    source: '/tokens/colors',
    destination: '/tokens/color',
    permanent: true,
  },
  {
    source: '/tokens/shape',
    destination: '/tokens/border',
    permanent: true,
  },
  {
    source: '/tokens/spacing',
    destination: '/tokens/space',
    permanent: true,
  },
  {
    source: '/tokens/depth',
    destination: '/tokens/shadow',
    permanent: true,
  },
];

const typography = [
  {
    source: '/components/titles-and-text/text-style',
    destination: '/components/typography/text',
    permanent: true,
  },
  {
    source: '/components/text',
    destination: '/components/typography/text',
    permanent: true,
  },
];

const utilities = [
  {
    source: '/components/app-provider',
    destination: '/components/utilities/app-provider',
    permanent: true,
  },
  {
    source: '/components/collapsible',
    destination: '/components/utilities/collapsible',
    permanent: true,
  },
  {
    source: '/components/frame',
    destination: '/components/deprecated/frame',
    permanent: true,
  },
  {
    source: '/components/utilities/frame',
    destination: '/components/deprecated/frame',
    permanent: true,
  },
  {
    source: '/components/scrollable',
    destination: '/components/utilities/scrollable',
    permanent: true,
  },
];
