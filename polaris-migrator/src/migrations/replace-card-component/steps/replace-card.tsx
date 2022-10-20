import type {ASTNode, Collection, JSCodeshift} from 'jscodeshift';

import {replaceJSXElement} from '../../../utilities/jsx';
import {
  renameImportSpecifier,
  getImportSpecifierName,
  hasImportSpecifier,
  removeImportSpecifier,
} from '../../../utilities/imports';

/**
 * Replace <Card> with the <AlphaCard> component
 */
export function replaceCard<NodeType = ASTNode>(
  j: JSCodeshift,
  source: Collection<NodeType>,
  sourcePathRegex: RegExp,
) {
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
}
