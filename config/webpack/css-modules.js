const getClassName = require('../classname');

module.exports = function getClassNameWebpack(loaderContext, localIdentName, localName) {
  return getClassName(localName, loaderContext.resourcePath);
};
