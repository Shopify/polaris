// Note: Hot module reloading for dev has been turned off for this environment
// Why? We embed playroom in an iframe, and that iframe is loaded from the public asset folder
// So we need to build into that public asset folder. Hence no dev mode and HMR
// Workaround: restart the next dev server after each change to the playroom config and associated files.

const path = require('path');
const {breakpoints, toPx} = require('@shopify/polaris-tokens');
const {playroom} = require('./constants');

// Note: We insert a 320 breakpoint to ensure we capture a representation of the
// "xs" size (which technically finishes at 1px smaller than the first non-zero value
// from the tokens, but we pick 320 as it's realistically the smallest mobile
// phone size you'll encounter)
const breakpointsConfig = [
  320,
  ...Object.values(breakpoints)
    .map((value) => +toPx(value).replace('px', ''))
    .filter((val) => val > 0),
];

module.exports = {
  baseUrl: playroom.baseUrl,
  components: './playroom/components.ts',
  outputPath: './public/playroom',
  // Optional:
  title: 'Polaris Sandbox',
  themes: './playroom/locales.ts',
  snippets: './playroom/snippets.ts',
  frameComponent: './playroom/FrameComponent.tsx',
  scope: './playroom/scope.ts',
  processCode: './playroom/process-code.ts',
  widths: breakpointsConfig,
  port: 9000,
  openBrowser: false,
  paramType: 'search', // default is 'hash'
  webpackConfig: ({production}) => ({
    ...(!production
      ? {
          resolve: {
            alias: {
              '@shopify/polaris-patterns': path.resolve(
                __dirname,
                '../polaris-patterns/src',
              ),
            },
          },
        }
      : {}),
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          include: [
            path.resolve('./playroom'),
            path.resolve('./src'),
            path.resolve('./package.json'),
            ...(!production ? [path.resolve('../polaris-patterns')] : []),
          ],
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: {
                presets: [
                  [
                    require.resolve('@babel/preset-env'),
                    {shippedProposals: true},
                  ],
                  require.resolve('@babel/preset-typescript'),
                  require.resolve('@babel/preset-react'),
                ],
                plugins: [require.resolve('babel-plugin-preval')],
              },
            },
          ],
        },
        {
          test: /\.css$/i,
          include: [
            path.dirname(require.resolve('@shopify/polaris/package.json')),
            path.dirname(
              require.resolve('@shopify/polaris-patterns/package.json'),
            ),
          ],
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  }),
  iframeSandbox: 'allow-scripts allow-same-origin',
};
