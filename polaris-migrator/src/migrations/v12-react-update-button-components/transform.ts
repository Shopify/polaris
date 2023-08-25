import type {API, FileInfo, Options} from 'jscodeshift';

import {removeProp} from '../../utilities/jsx';

export interface MigrationOptions extends Options {
  removeProp: string;
}

export default function transformer(
  file: FileInfo,
  {jscodeshift: j}: API,
  options: MigrationOptions,
) {
  const componentParts = options.componentName?.split('.');
  if (
    !options.componentName ||
    !options.removeProp ||
    componentParts?.length > 2
  ) {
    throw new Error(
      'Missing required options: componentName, from, to, or your compound component exceeds 2 levels',
    );
  }

  const source = j(file.source);
  const componentName = options.componentName;
  const prop = options.removeProp;

  removeProp(j, source, componentName, prop);

  return source.toSource();
}
