import type {API, FileInfo, Options} from 'jscodeshift';

import {hasImportDeclaration} from '../../utilities/imports';

import {replaceDisplayText} from './steps/replace-display-text';
import {replaceOther, components} from './steps/replace-other';
import {replaceTextStyle} from './steps/replace-text-style';

export interface MigrationOptions extends Options {
  relative: boolean;
  componentName?: keyof typeof components | 'DisplayText' | 'TextStyle';
}

export default function v10ReactReplaceTextComponents(
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

  if (options.componentName) {
    if (options.componentName === 'DisplayText') {
      replaceDisplayText(j, source, options);
    } else if (options.componentName === 'TextStyle') {
      replaceTextStyle(j, source, options);
    } else {
      replaceOther(j, source, options);
    }
  } else {
    replaceDisplayText(j, source, options);
    replaceOther(j, source, options);
    replaceTextStyle(j, source, options);
  }

  return source.toSource();
}
