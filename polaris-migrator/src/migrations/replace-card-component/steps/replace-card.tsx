import type {ASTNode, Collection, JSCodeshift} from 'jscodeshift';

import {
  getJSXAttributes,
  hasJSXAttribute,
  removeJSXAttributes,
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

  // Find JSXElements that match Card
  source.findJSXElements(localCardElementName).forEach((element) => {
    // Replace <Card></Card> with <AlphaCard></AlphaCard>
    replaceJSXElement(j, element, 'AlphaCard');

    // Check if <Card> has `title` attribute
    if (hasJSXAttribute(j, element, 'title')) {
      getJSXAttributes(j, element, 'title')
        .find(j.StringLiteral)
        .forEach((literal) => {
          const jsxAttributeValue = literal.node.value;

          // Remove `title` attribute and value from <AlphaCard>
          removeJSXAttributes(j, element, 'title');

          if (!hasImportSpecifier(j, source, 'Text', sourcePathRegex)) {
            // Add Text as an import
            addNewImportSpecifier(j, source, 'Text', sourcePathRegex);

            // Create <Text> element
            const Text = j.jsxElement(
              j.jsxOpeningElement(j.jsxIdentifier('Text')),
              j.jsxClosingElement(j.jsxIdentifier('Text')),
              [j.stringLiteral(jsxAttributeValue)],
            );

            // Add JSXAttributes to <Text>
            let TextWithJSXAttribute = j.jsxElement(
              j.jsxOpeningElement(Text.openingElement.name, [
                ...(Text.openingElement.attributes || []),
                j.jsxAttribute(
                  j.jsxIdentifier('as'),
                  'h3' ? j.stringLiteral('h3') : null,
                ),
                j.jsxAttribute(
                  j.jsxIdentifier('variant'),
                  'headingMd' ? j.stringLiteral('headingMd') : null,
                ),
              ]),
              Text.closingElement,
              Text.children,
            );

            // Replace <Alpha> with component that combines new Text child with existing children
            element.replace(
              j.jsxElement(
                element.node.openingElement,
                element.node.closingElement,
                [TextWithJSXAttribute, ...(element.node.children ?? [])],
              ),
            );
          }
        });
    }

    // Check if <Card> has `sectioned` attribute
    if (hasJSXAttribute(j, element, 'sectioned')) {
      if (!hasImportSpecifier(j, source, 'AlphaStack', sourcePathRegex)) {
        // Add AlphaStack as an import
        addNewImportSpecifier(j, source, 'AlphaStack', sourcePathRegex);
      }

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
          j.jsxAttribute(j.jsxIdentifier('fullWidth')),
        ]),
        AlphaStack.closingElement,
        AlphaStack.children,
      );

      // Replace <AlphaCard> with <AlphaStack> wrapping all existing children
      element.replace(
        j.jsxElement(element.node.openingElement, element.node.closingElement, [
          AlphaStackWithJSXAttribute,
        ]),
      );

      // Remove `sectioned` attribute from <AlphaCard>
      removeJSXAttributes(j, element, 'sectioned');
    }
  });
}
