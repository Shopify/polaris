const path = require('path');

const cache = {
  lastFile: null,
  lastClass: null,
  files: {},
};

module.exports = function getClassName(localName, filePath) {
  if (filePath !== cache.lastFile) {
    cache.lastClass = null;
  }

  const file = cache.files[filePath] || {};
  const componentName = path.basename(filePath, '.scss');
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

  cache.lastFile = filePath;
  cache.lastClass = className;
  cache.files[filePath] = file;
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
