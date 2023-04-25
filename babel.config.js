/**
 * @type {import('@babel/core').TransformOptions}
 */
module.exports = function (api) {
  const envName = api.env();
  const development = envName === 'development' || envName === 'test';
  return {
    presets: [
      [
        '@babel/preset-env',
        {useBuiltIns: 'entry', corejs: '3.0', bugfixes: true},
      ],
      ['@babel/preset-typescript'],
      ['@babel/preset-react', {development, useBuiltIns: true}],
    ],
    assumptions: {
      setPublicClassFields: true,
      privateFieldsAsProperties: true,
      // nothing accesses `document.all`:
      noDocumentAll: true,
      // nothing relies on class constructors invoked without `new` throwing:
      noClassCalls: true,
      // nothing should be relying on tagged template strings being frozen:
      mutableTemplateObject: true,
      // nothing is relying on Function.prototype.length:
      ignoreFunctionLength: true,
      // nothing is relying on mutable re-exported bindings:
      constantReexports: true,
      // don't bother marking Module records non-enumerable:
      enumerableModuleMeta: true,
      // nothing uses [[Symbol.toPrimitive]]:
      // (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive)
      ignoreToPrimitiveHint: true,
      // nothing relies on spread copying Symbol keys:  ({...{ [Symbol()]: 1 }})
      objectRestNoSymbols: true,
      // nothing relies on `new (() => {})` throwing:
      noNewArrows: true,
      // transpile object spread to assignment instead of defineProperty():
      setSpreadProperties: true,
      // nothing should be using custom iterator protocol:
      skipForOfIteratorClosing: true,
      // nothing inherits from a constructor function with explicit return value:
      superIsCallableConstructor: true,
      // nothing relies on CJS-transpiled namespace imports having all properties prior to module execution completing:
      noIncompleteNsImportDetection: true,
    },
    babelrcRoots: [
      '.',
      // Note: The following projects use rootMode: 'upward' to inherit
      // and merge with this root level config.
      './polaris-codemods',
      './polaris-migrator',
      './polaris-tokens',
      './polaris-icons',
      './polaris-react',
    ],
  };
};
