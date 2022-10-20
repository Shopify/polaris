import type {API, FileInfo} from 'jscodeshift';

import {replaceJSXElement} from '../../utilities/jsx';
import {
  hasImportDeclaration,
  renameImportSpecifier,
  getImportSpecifierName,
  hasImportSpecifier,
  removeImportSpecifier,
} from '../../utilities/imports';

/**
 * Replace <Card> with the <AlphaCard> component
 */
export default function replaceCardComponent(
  fileInfo: FileInfo,
  {jscodeshift: j}: API,
) {
  const source = j(fileInfo.source);
  const sourcePathRegex = /(?:\@shopify\/polaris|components)/gi;

  if (!hasImportDeclaration(j, source, sourcePathRegex)) {
    return fileInfo.source;
  }

  if (hasImportSpecifier(j, source, 'AlphaCard', sourcePathRegex)) {
    removeImportSpecifier(j, source, 'Card', sourcePathRegex);
  } else {
    renameImportSpecifier(j, source, 'Card', 'AlphaCard', sourcePathRegex);
  }

  const localElementName =
    getImportSpecifierName(j, source, 'Card', sourcePathRegex) || 'Card';

  source.findJSXElements(localElementName).forEach((element) => {
    replaceJSXElement(j, element, 'AlphaCard');
  });

  return source.toSource();
}
