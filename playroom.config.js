const sbWebpackConfig = require('./.storybook/webpack.config');

module.exports = {
  components: './playroom/index.ts',
  frameComponent: './playroom/Wrapper.tsx',
  outputPath: './build/playroom',
  title: 'Polaris',
  widths: [400, 768, 1024],
  port: 9000,
  openBrowser: true,
  exampleCode:
    '{/* Check out https://polaris.shopify.com/components/get-started for more info */}',
  // Disable all the type parsing as it throws an error for now
  typeScriptFiles: [],
  webpackConfig: () => {
    // This is kinda funky as we're building on things that probably shouldn't
    // be built on. But it's a lot shorter than duplicating all the webpack config
    const sbWebpack = sbWebpackConfig({
      config: {
        module: {rules: []},
        output: {},
        resolve: {extensions: ['.js']},
      },
      mode: 'development',
    });

    sbWebpack.module.rules = sbWebpack.module.rules.filter(Boolean);
    return sbWebpack;
  },
};
