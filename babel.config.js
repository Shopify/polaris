module.exports = function(api) {
  // When building (using rollup) or running storybook (using babel-loader) we
  // want to compile for the web otherwise compile for node usage (within jest)
  const isWeb = api.caller((caller = {}) => {
    return ['babel-loader', 'rollup-plugin-babel'].includes(caller.name);
  });

  const runtimePreset = isWeb
    ? ['babel-preset-shopify/web', {modules: false}]
    : ['babel-preset-shopify/node', {modules: 'commonjs'}];

  // babel-preset-shopify/react only uses HMR if hot is true and the env is
  // development or test
  return {
    presets: [runtimePreset, ['babel-preset-shopify/react', {hot: isWeb}]],
    plugins: ['./config/babel/plugins/sass-namespace-to-default-import.js'],
  };
};
