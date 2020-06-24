module.exports = function (api) {
  // When building (using rollup) or running storybook (using babel-loader) we
  // want to compile for the web otherwise compile for node usage (within jest)
  const isWeb = api.caller((caller = {}) => {
    return ['babel-loader', '@rollup/plugin-babel'].includes(caller.name);
  });

  const runtimePreset = isWeb
    ? ['@shopify/babel-preset/web', {modules: false, typescript: true}]
    : ['@shopify/babel-preset/node', {modules: 'commonjs', typescript: true}];

  return {
    presets: [runtimePreset, ['@shopify/babel-preset/react']],
  };
};
