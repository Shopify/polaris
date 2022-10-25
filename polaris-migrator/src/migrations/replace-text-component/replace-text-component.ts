import type {API, FileInfo} from 'jscodeshift';

import {hasImportDeclaration} from '../../utilities/imports';

import {replaceDisplayText} from './steps/replace-display-text';
import {replaceOther} from './steps/replace-other';
import {replaceTextStyle} from './steps/replace-text-style';

export default function replaceTextComponent(
  file: FileInfo,
  {jscodeshift: j}: API,
) {
  const source = j(file.source);

  if (!hasImportDeclaration(j, source, '@shopify/polaris')) {
    return file.source;
  }

  replaceDisplayText(j, source);
  replaceOther(j, source);
  replaceTextStyle(j, source);

  return source.toSource();
}
