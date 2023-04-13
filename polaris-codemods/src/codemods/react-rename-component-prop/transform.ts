import type {API, FileInfo, Options} from 'jscodeshift';

import {typescript} from '../../utilities/constants';
import {renameProps} from '../../utilities/jsx';

export default function transformer(
  file: FileInfo,
  {jscodeshift: j}: API,
  options: Options,
) {
  if (!options.componentName || !options.from || !options.to) {
    throw new Error('Missing required options: componentName, from, to');
  }

  const source = j(file.source);
  const componentName = options.componentName;
  const props = {[options.from]: options.to};

  renameProps(j, source, componentName, props);

  return source.toSource();
}

export const extensions = typescript.extensions;
export const options = {
  relative: typescript.options.relative,
  componentName: {
    name: 'componentName',
    type: 'string',
    description: 'The JSX element to target.',
    required: true,
  },
  from: {
    name: 'from',
    type: 'string',
    description: 'The target prop to rename.',
    required: true,
  },
  to: {
    name: 'to',
    type: 'string',
    description: 'The desired new prop name.',
    required: true,
  },
};
