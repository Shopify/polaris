import {basename} from 'path';
import {camelCase} from 'change-case';

const cache = {
  files: {},
};

const COMPONENT_REGEX = /^[A-Z]\w+$/;
const SUBCOMPONENT_VARIATION_SELECTOR = /^\w+-\w+$/;
const NESTED_COMPONENT_PATH_REGEX = /.*\/components\/(.*)\/components/;

export default function getNamespacedClassName(localName, filePath) {
  const file = cache.files[filePath] || {};
  const componentName = basename(filePath, '.scss');
  const nestedComponentMatch = NESTED_COMPONENT_PATH_REGEX.exec(filePath);

  const polarisComponentName =
    nestedComponentMatch && nestedComponentMatch.length > 1
      ? `${polarisClassName(nestedComponentMatch[1])}-${componentName}`
      : polarisClassName(componentName);

  let className = file[localName];

  if (className == null) {
    if (isComponent(localName)) {
      className =
        componentName === localName
          ? polarisComponentName
          : subcomponentClassName(polarisComponentName, localName);
    } else if (SUBCOMPONENT_VARIATION_SELECTOR.test(localName)) {
      const [subcomponent, variation] = localName.split('-');
      const subcomponentName = subcomponentClassName(
        polarisComponentName,
        subcomponent,
      );
      className = variationClassName(subcomponentName, camelCase(variation));
    } else {
      className = variationClassName(
        polarisComponentName,
        camelCase(localName),
      );
    }
  }

  file[localName] = className;
  cache.files[filePath] = file;
  return className;
}

function isComponent(className) {
  return COMPONENT_REGEX.test(className);
}

function polarisClassName(className) {
  return `Polaris-${className}`;
}

function subcomponentClassName(component, subcomponent) {
  return `${component}__${subcomponent}`;
}

function variationClassName(component, variation) {
  return `${component}--${variation}`;
}
