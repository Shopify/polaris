import type {ASTNode, Collection, JSCodeshift} from 'jscodeshift';

import {
  hasJSXAttribute,
  insertJSXAttribute,
  replaceJSXElement,
} from '../../../utilities/jsx';
import {
  addNewImportSpecifier,
  getImportSpecifierName,
  hasImportSpecifier,
  renameImportSpecifier,
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

  const localCardElementName =
    getImportSpecifierName(j, source, 'Card', sourcePathRegex) || 'Card';

  // Iterate over all the JSXElements of Card
  source.findJSXElements(localCardElementName).forEach((element) => {
    // Replace <Card></Card> with <AlphaCard></AlphaCard>
    replaceJSXElement(j, element, 'AlphaCard');

    if (!hasImportSpecifier(j, source, 'AlphaStack', sourcePathRegex)) {
      // Add AlphaStack as an import
      addNewImportSpecifier(j, source, 'AlphaStack', sourcePathRegex);

      // Create <AlphaStack> element
      const AlphaStack = j.jsxElement(
        j.jsxOpeningElement(j.jsxIdentifier('AlphaStack')),
        j.jsxClosingElement(j.jsxIdentifier('AlphaStack')),
        element.node.children,
      );

      // Add JSXAttribute to <AlphaStack>
      const AlphaStackWithJSXAttribute = j.jsxElement(
        j.jsxOpeningElement(AlphaStack.openingElement.name, [
          ...(AlphaStack.openingElement.attributes || []),
          j.jsxAttribute(
            j.jsxIdentifier('spacing'),
            '5' ? j.stringLiteral('5') : null,
          ),
        ]),
        AlphaStack.closingElement,
        AlphaStack.children,
      );

      // Replace <AlphaCard> with new children
      element.replace(
        j.jsxElement(element.node.openingElement, element.node.closingElement, [
          AlphaStackWithJSXAttribute,
        ]),
      );
    }
  });
}
