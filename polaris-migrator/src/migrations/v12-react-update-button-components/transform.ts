import type {API, FileInfo, Options} from 'jscodeshift';

import {removeProp} from '../../utilities/jsx';

export default function transformer(
  file: FileInfo,
  {jscodeshift: j}: API,
  _: Options,
) {
  const source = j(file.source);
  const componentName = 'Button';

  // Remove `outline` prop from Button
  removeProp(j, source, componentName, 'outline');

  return source.toSource();
}
