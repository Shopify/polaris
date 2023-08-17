import type {API, FileInfo, Options} from 'jscodeshift';

import {renameProps} from '../../utilities/jsx';

export default function transformer(
  file: FileInfo,
  {jscodeshift: j}: API,
  options: Options,
) {
  const componentParts = options.componentName?.split('.');
  if (
    !options.componentName ||
    !options.from ||
    !options.to ||
    componentParts?.length > 2
  ) {
    throw new Error(
      'Missing required options: componentName, from, to, or your compound component exceeds 2 levels',
    );
  }

  const source = j(file.source);
  const componentName = options.componentName;
  const props = {[options.from]: options.to};

  renameProps(j, source, componentName, props, options.newValue);

  return source.toSource();
}
