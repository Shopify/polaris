module.exports = function (api) {
  // When building (using rollup) or running storybook (using babel-loader) we
  // want to compile for the web otherwise compile for node usage (within jest)
  const isWeb = api.caller((caller = {}) => {
    return ['babel-loader', '@rollup/plugin-babel'].includes(caller.name);
  });

  // Our esnext rollup build will want to override the browserslist we pass in
  // instead of using the default as defined in our package.json
  const browsers = api.caller((caller = {}) => caller.browserslistOverride);

  const runtimePreset = isWeb
    ? [
        '@shopify/babel-preset/web',
        {modules: 'auto', typescript: true, browsers},
      ]
    : ['@shopify/babel-preset/node', {modules: 'auto', typescript: true}];

  return {
    presets: [runtimePreset, ['@shopify/babel-preset/react']],
  };
};
