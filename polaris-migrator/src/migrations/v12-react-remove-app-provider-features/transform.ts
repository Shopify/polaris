import type {API, FileInfo, Options} from 'jscodeshift';

import {
  getImportSpecifierName,
  hasImportDeclaration,
  hasImportSpecifier,
} from '../../utilities/imports';
import {removeJSXAttributes} from '../../utilities/jsx';

export interface MigrationOptions extends Options {
  relative?: boolean;
}

export default function transformer(
  fileInfo: FileInfo,
  {jscodeshift: j}: API,
  _: Options,
) {
  const source = j(fileInfo.source);

  // If `AppProvider` component name is not imported, exit
  if (
    !(
      hasImportDeclaration(j, source, '@shopify/polaris') &&
      (hasImportSpecifier(j, source, 'AppProvider', '@shopify/polaris') ||
        hasImportSpecifier(j, source, 'AppProviderProps', '@shopify/polaris'))
    )
  ) {
    return fileInfo.source;
  }

  const localElementName =
    getImportSpecifierName(j, source, 'AppProvider', '@shopify/polaris') ||
    'AppProvider';

  // Find all JSX elements with the name 'AppProvider'
  source.findJSXElements(localElementName).forEach((element) => {
    removeJSXAttributes(j, element, 'features');
  });

  return source.toSource();
}
