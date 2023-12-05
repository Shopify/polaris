import type {API, FileInfo, Options} from 'jscodeshift';

import {renameProps} from '../../utilities/jsx';

export default function transformer(
  file: FileInfo,
  {jscodeshift: j}: API,
  options: Options,
) {
  const componentParts = options.componentName?.split('.');
  const {componentName, from, to, fromValue, toValue} = options;
  if (!componentName || !from || !to || componentParts?.length > 2) {
    throw new Error(
      'Missing required options: componentName, from, to, or your compound component exceeds 2 levels',
    );
  }

  const source = j(file.source);
  const props = {[from]: to};

  renameProps(j, source, componentName, props, fromValue, toValue);

  return source.toSource();
}
