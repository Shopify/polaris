import type {API, FileInfo} from 'jscodeshift';

import {hasImportDeclaration} from '../../utilities/imports';

import {replaceDisplayText, replaceHeading} from './steps';

export default function migration(file: FileInfo, {jscodeshift: j}: API) {
  const source = j(file.source);

  if (!hasImportDeclaration(j, source, '@shopify/polaris')) {
    return source.toSource();
  }

  replaceDisplayText(j, source);
  replaceHeading(j, source);

  return source.toSource();
}
