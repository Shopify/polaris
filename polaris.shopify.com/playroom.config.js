/**
 * NOTE:
 *  Hot module reloading for dev has been turned off for this environment
 *  Why? We embed playroom in an iframe, and that iframe is loaded from the public asset folder
 *  So we need to build into that public asset folder. Hence no dev mode and HMR
 *  Workaround: restart the next dev server after each change to the playroom config and associated files.
 */

const path = require('node:path');
const {breakpoints, toPx} = require('@shopify/polaris-tokens');
const {playroom} = require('./constants');
const breakpointsConfig = Object.values(breakpoints)
  .map((value) => +toPx(value).replace('px', ''))
  .filter((val) => val > 0);

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
  //exampleCode: `
  //  <Button>
  //    Hello World!
  //  </Button>
  //`,
  webpackConfig: () => ({
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          include: path.resolve('./playroom'),
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: {
                presets: [
                  [
                    require.resolve('@babel/preset-env'),
                    {shippedProposals: true},
                  ],
                  require.resolve('@babel/preset-react'),
                  require.resolve('@babel/preset-typescript'),
                ],
                plugins: [require.resolve('babel-plugin-preval')],
              },
            },
          ],
        },
        {
          test: /\.css$/i,
          include: path.dirname(
            require.resolve('@shopify/polaris/package.json'),
          ),
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  }),
  iframeSandbox: 'allow-scripts',
};
