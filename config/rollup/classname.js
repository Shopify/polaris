import {basename} from 'path';

const cache = {
  lastFile: null,
  lastComponent: null,
  files: {},
};

export default function getClassName(localName, filePath) {
  if (filePath !== cache.lastFile) {
    cache.lastComponent = null;
  }

  const file = cache.files[filePath] || {};
  const componentName = basename(filePath, '.scss');
  let className = file[localName];

  if (className == null) {
    if (isComponent(localName)) {
      className = componentName === localName
        ? quiltClassName(componentName)
        : quiltClassName(subcomponentClassName(componentName, localName));
      
      cache.lastComponent = className;
    } else if (cache.lastComponent == null) {
      const rootClass = quiltClassName(componentName);
      className = variationClassName(rootClass, localName);
      cache.lastComponent = rootClass;
    } else {
      className = variationClassName(cache.lastComponent, localName);
    }
  }

  file[localName] = className;

  cache.lastFile = filePath;
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
