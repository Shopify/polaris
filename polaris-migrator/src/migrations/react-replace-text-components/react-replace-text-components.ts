import type {API, FileInfo, Options} from 'jscodeshift';

import {hasImportDeclaration} from '../../utilities/imports';

import {replaceDisplayText} from './steps/replace-display-text';
import {replaceOther} from './steps/replace-other';
import {replaceTextStyle} from './steps/replace-text-style';

export interface MigrationOptions extends Options {
  relative: boolean;
}

export default function textReplaceComponents(
  file: FileInfo,
  {jscodeshift: j}: API,
  options: MigrationOptions,
) {
  const source = j(file.source);

  if (
    !options.relative &&
    !hasImportDeclaration(j, source, '@shopify/polaris')
  ) {
    return file.source;
  }

  replaceDisplayText(j, source, options);
  replaceOther(j, source, options);
  replaceTextStyle(j, source, options);

  return source.toSource();
}
