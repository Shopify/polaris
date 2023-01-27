const path = require('path');

/* eslint-disable require-await */
/** @type {import('next').NextConfig} */
const nextConfig = {
  // See: https://nextjs.org/docs/advanced-features/output-file-tracing#automatically-copying-traced-files
  output: 'standalone',
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    scrollRestoration: true,
    // this includes files from the monorepo base one directory up
    outputFileTracingRoot: path.join(__dirname, '../'),
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
        permanent: false,
      },
      {
        source: '/foundations/foundations/:slug',
        destination: '/foundations/:slug',
        permanent: false,
      },
      {
        source: '/foundations/content/:slug',
        destination: '/content/:slug',
        permanent: false,
      },
      {
        source: '/foundations/design/:slug',
        destination: '/design/:slug',
        permanent: false,
      },
      {
        source: '/foundations/patterns/:slug',
        destination: '/patterns/:slug',
        permanent: false,
      },
      {
        source: '/foundations/patterns/layout',
        destination: '/foundations/patterns/page-layouts',
        permanent: false,
      },
      {
        source: '/foundations/foundations/designing-apps',
        destination: 'https://shopify.dev/apps/design-guidelines',
        permanent: false,
      },
      {
        source: '/foundations/content/app-release-notes',
        destination: 'https://shopify.dev/apps/design-guidelines',
        permanent: false,
      },
      {
        source: '/tokens/all-tokens',
        destination: '/tokens/colors',
        permanent: false,
      },
      {
        source: '/tokens',
        destination: '/tokens/colors',
        permanent: false,
      },
      {
        source: '/legal/license',
        destination: 'https://github.com/Shopify/polaris/blob/main/LICENSE.md',
        permanent: true,
      },
      ...actions,
      ...deprecated,
      ...feedbackIndicators,
      ...imagesAndIcons,
      ...layoutAndStructure,
      ...lists,
      ...navigation,
      ...overlays,
      ...selectionAndInput,
      ...tables,
      ...typography,
      ...utilities,
    ];
  },
};

module.exports = nextConfig;

const actions = [
  {
    source: '/components/account-connection',
    destination: '/components/actrions/account-connection',
    permanent: false,
  },
  {
    source: '/components/button-group',
    destination: '/components/actrions/button-group',
    permanent: false,
  },
  {
    source: '/components/button',
    destination: '/components/actrions/button',
    permanent: false,
  },
  {
    source: '/components/page-actions',
    destination: '/components/actrions/page-actions',
    permanent: false,
  },
  {
    source: '/components/setting-toggle',
    destination: '/components/actrions/setting-toggle',
    permanent: false,
  },
];

const deprecated = [
  {
    source: '/components/caption',
    destination: '/components/deprecated/caption',
    permanent: false,
  },
  {
    source: '/components/card',
    destination: '/components/deprecated/card',
    permanent: false,
  },
  {
    source: '/components/choice-list',
    destination: '/components/deprecated/choice-list',
    permanent: false,
  },
  {
    source: '/components/display-text',
    destination: '/components/deprecated/display-text',
    permanent: false,
  },
  {
    source: '/components/form-layout',
    destination: '/components/deprecated/form-layout',
    permanent: false,
  },
  {
    source: '/components/grid',
    destination: '/components/deprecated/grid',
    permanent: false,
  },
  {
    source: '/components/heading',
    destination: '/components/deprecated/heading',
    permanent: false,
  },
  {
    source: '/components/sheet',
    destination: '/components/deprecated/sheet',
    permanent: false,
  },
  {
    source: '/components/stack',
    destination: '/components/deprecated/stack',
    permanent: false,
  },
  {
    source: '/components/subheading',
    destination: '/components/deprecated/subheading',
    permanent: false,
  },
  {
    source: '/components/text-container',
    destination: '/components/deprecated/text-container',
    permanent: false,
  },
  {
    source: '/components/text-style',
    destination: '/components/deprecated/text-style',
    permanent: false,
  },
  {
    source: '/components/visually-hidden',
    destination: '/components/deprecated/visually-hidden',
    permanent: false,
  },
];

const feedbackIndicators = [
  {
    source: '/components/badge',
    destination: '/components/feedback-indicators/badge',
    permanent: false,
  },
  {
    source: '/components/banner',
    destination: '/components/feedback-indicators/banner',
    permanent: false,
  },
  {
    source: '/components/exception-list',
    destination: '/components/feedback-indicators/exception-list',
    permanent: false,
  },
  {
    source: '/components/loading',
    destination: '/components/feedback-indicators/loading',
    permanent: false,
  },
  {
    source: '/components/progress-bar',
    destination: '/components/feedback-indicators/progress-bar',
    permanent: false,
  },
  {
    source: '/components/skeleton-body-text',
    destination: '/components/feedback-indicators/skeleton-body-text',
    permanent: false,
  },
  {
    source: '/components/skeleton-display-text',
    destination: '/components/feedback-indicators/skeleton-display-text',
    permanent: false,
  },
  {
    source: '/components/skeleton-page',
    destination: '/components/feedback-indicators/skeleton-page',
    permanent: false,
  },
  {
    source: '/components/skeleton-tabs',
    destination: '/components/feedback-indicators/skeleton-tabs',
    permanent: false,
  },
  {
    source: '/components/skeleton-thumbnail',
    destination: '/components/feedback-indicators/skeleton-thumbnail',
    permanent: false,
  },
  {
    source: '/components/spinner',
    destination: '/components/feedback-indicators/spinner',
    permanent: false,
  },
  {
    source: '/components/toast',
    destination: '/components/feedback-indicators/toast',
    permanent: false,
  },
];

const imagesAndIcons = [
  {
    source: '/components/avatar',
    destination: '/components/images-and-icons/avatar',
    permanent: false,
  },
  {
    source: '/components/icon',
    destination: '/components/images-and-icons/icon',
    permanent: false,
  },
  {
    source: '/components/keyboard-key',
    destination: '/components/images-and-icons/keyboard-key',
    permanent: false,
  },
  {
    source: '/components/thumbnail',
    destination: '/components/images-and-icons/thumbnail',
    permanent: false,
  },
  {
    source: '/components/video-thumbnail',
    destination: '/components/images-and-icons/video-thumbnail',
    permanent: false,
  },
];

const layoutAndStructure = [
  {
    source: '/components/alpha-card',
    destination: '/components/layout-and-structure/alpha-card',
    permanent: false,
  },
  {
    source: '/components/alpha-stack',
    destination: '/components/layout-and-structure/alpha-stack',
    permanent: false,
  },
  {
    source: '/components/bleed',
    destination: '/components/layout-and-structure/bleed',
    permanent: false,
  },
  {
    source: '/components/box',
    destination: '/components/layout-and-structure/box',
    permanent: false,
  },
  {
    source: '/components/callout-card',
    destination: '/components/layout-and-structure/callout-card',
    permanent: false,
  },
  {
    source: '/components/columns',
    destination: '/components/layout-and-structure/columns',
    permanent: false,
  },
  {
    source: '/components/divider',
    destination: '/components/layout-and-structure/divider',
    permanent: false,
  },
  {
    source: '/components/empty-state',
    destination: '/components/layout-and-structure/empty-state',
    permanent: false,
  },
  {
    source: '/components/inline',
    destination: '/components/layout-and-structure/inline',
    permanent: false,
  },
  {
    source: '/components/layout',
    destination: '/components/layout-and-structure/layout',
    permanent: false,
  },
  {
    source: '/components/media-card',
    destination: '/components/layout-and-structure/media-card',
    permanent: false,
  },
  {
    source: '/components/page',
    destination: '/components/layout-and-structure/page',
    permanent: false,
  },
];

const lists = [
  {
    source: '/components/action-list',
    destination: '/components/lists/action-list',
    permanent: false,
  },
  {
    source: '/components/description-list',
    destination: '/components/lists/description-list',
    permanent: false,
  },
  {
    source: '/components/list',
    destination: '/components/lists/list',
    permanent: false,
  },
  {
    source: '/components/listbox',
    destination: '/components/lists/listbox',
    permanent: false,
  },
  {
    source: '/components/option-list',
    destination: '/components/lists/option-list',
    permanent: false,
  },
  {
    source: '/components/resource-item',
    destination: '/components/lists/resource-item',
    permanent: false,
  },
  {
    source: '/components/resource-list',
    destination: '/components/lists/resource-list',
    permanent: false,
  },
];

const navigation = [
  {
    source: '/components/footer-help',
    destination: '/components/navigation/footer-help',
    permanent: false,
  },
  {
    source: '/components/fullscreen-bar',
    destination: '/components/navigation/fullscreen-bar',
    permanent: false,
  },
  {
    source: '/components/link',
    destination: '/components/navigation/link',
    permanent: false,
  },
  {
    source: '/components/navigation',
    destination: '/components/navigation/navigation',
    permanent: false,
  },
  {
    source: '/components/pagination',
    destination: '/components/navigation/pagination',
    permanent: false,
  },
  {
    source: '/components/tabs',
    destination: '/components/navigation/tabs',
    permanent: false,
  },
  {
    source: '/components/top-bar',
    destination: '/components/navigation/top-bar',
    permanent: false,
  },
];

const overlays = [
  {
    source: '/components/modal',
    destination: '/components/overlays/modal',
    permanent: false,
  },
  {
    source: '/components/popover',
    destination: '/components/overlays/popover',
    permanent: false,
  },
  {
    source: '/components/tooltip',
    destination: '/components/overlays/tooltip',
    permanent: false,
  },
];

const selectionAndInput = [
  {
    source: '/components/autocomplete',
    destination: '/components/selection-and-input/autocomplete',
    permanent: false,
  },
  {
    source: '/components/checkbox',
    destination: '/components/selection-and-input/checkbox',
    permanent: false,
  },
  {
    source: '/components/color-picker',
    destination: '/components/selection-and-input/color-picker',
    permanent: false,
  },
  {
    source: '/components/combobox',
    destination: '/components/selection-and-input/combobox',
    permanent: false,
  },
  {
    source: '/components/contextual-save-bar',
    destination: '/components/selection-and-input/contextual-save-bar',
    permanent: false,
  },
  {
    source: '/components/date-picker',
    destination: '/components/selection-and-input/date-picker',
    permanent: false,
  },
  {
    source: '/components/drop-zone',
    destination: '/components/selection-and-input/drop-zone',
    permanent: false,
  },
  {
    source: '/components/filters',
    destination: '/components/selection-and-input/filters',
    permanent: false,
  },
  {
    source: '/components/form',
    destination: '/components/selection-and-input/form',
    permanent: false,
  },
  {
    source: '/components/inline-error',
    destination: '/components/selection-and-input/inline-error',
    permanent: false,
  },
  {
    source: '/components/radio-button',
    destination: '/components/selection-and-input/radio-button',
    permanent: false,
  },
  {
    source: '/components/range-slider',
    destination: '/components/selection-and-input/range-slider',
    permanent: false,
  },
  {
    source: '/components/select',
    destination: '/components/selection-and-input/select',
    permanent: false,
  },
  {
    source: '/components/tag',
    destination: '/components/selection-and-input/tag',
    permanent: false,
  },
  {
    source: '/components/text-field',
    destination: '/components/selection-and-input/text-field',
    permanent: false,
  },
];

const tables = [
  {
    source: '/components/table',
    destination: '/components/tables/table',
    permanent: false,
  },
  {
    source: '/components/index-table',
    destination: '/components/tables/index-table',
    permanent: false,
  },
];

const typography = [
  {
    source: '/components/text',
    destination: '/components/typography/text',
    permanent: false,
  },
];

const utilities = [
  {
    source: '/components/app-provider',
    destination: '/components/utilities/app-provider',
    permanent: false,
  },
  {
    source: '/components/collapsible',
    destination: '/components/utilities/collapsible',
    permanent: false,
  },
  {
    source: '/components/frame',
    destination: '/components/utilities/frame',
    permanent: false,
  },
  {
    source: '/components/scrollable',
    destination: '/components/utilities/scrollable',
    permanent: false,
  },
];
