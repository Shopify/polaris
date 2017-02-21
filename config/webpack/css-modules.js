const path = require('path');

const cache = {
  lastFile: null,
  lastClass: null,
  files: {},
};

module.exports = function getClassName(loaderContext, localIdentName, localName) {
  const {resourcePath} = loaderContext;

  if (resourcePath !== cache.lastFile) {
    cache.lastClass = null;
  }

  const file = cache.files[resourcePath] || {};
  const componentName = path.basename(resourcePath, '.scss');
  let className = file[localName];

  if (className == null) {
    if (isComponent(localName)) {
      className = componentName === localName
        ? quiltClassName(componentName)
        : quiltClassName(subcomponentClassName(componentName, localName));
    } else if (cache.lastClass == null) {
      className = variationClassName(quiltClassName(componentName), localName);
    } else {
      className = variationClassName(cache.lastClass, localName);
    }
  }

  file[localName] = className;

  cache.lastFile = resourcePath;
  cache.lastClass = className;
  cache.files[resourcePath] = file;

  return className;
};

function isComponent([firstLetter]) {
  return firstLetter === firstLetter.toUpperCase();
}

function quiltClassName(className) {
  return `Quilt-${className}`;
}

function subcomponentClassName(component, subcomponent) {
  return `${component}__${subcomponent}`;
}

function variationClassName(component, variation) {
  return `${component}--${variation}`;
}
