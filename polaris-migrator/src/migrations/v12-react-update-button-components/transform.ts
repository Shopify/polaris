import type {API, FileInfo, Options} from 'jscodeshift';

import {hasImportDeclaration} from '../../utilities/imports';
import {removeProp} from '../../utilities/jsx';

import {replaceBoolPropsWithVariant} from './steps/replace-bool-props-with-variant';

export default function transformer(
  fileInfo: FileInfo,
  {jscodeshift: j}: API,
  _: Options,
) {
  const source = j(fileInfo.source);
  const componentName = 'Button';

  if (!hasImportDeclaration(j, source, '@shopify/polaris')) {
    return fileInfo.source;
  }

  // Rename `primary` `plain` to `variant=`tertiary`
  replaceBoolPropsWithVariant(
    j,
    source,
    componentName,
    'plain',
    'primary',
    'tertiary',
  );

  // Rename `plain` `monochrome` to `variant=`plainMonochrome`
  replaceBoolPropsWithVariant(
    j,
    source,
    componentName,
    'plain',
    'monochrome',
    'monochromePlain',
  );

  // Remove `outline` prop from Button
  removeProp(j, source, componentName, 'outline');

  return source.toSource();
}
