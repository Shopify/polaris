import type {ASTNode, Collection, JSCodeshift} from 'jscodeshift';

import {
  hasJSXAttribute,
  getJSXAttributes,
  replaceJSXElement,
  replaceJSXAttributes,
  insertJSXAttribute,
  removeJSXAttributes,
} from '../../../utilities/jsx';
import {
  insertImportSpecifier,
  renameImportSpecifier,
  getImportSpecifierName,
  hasImportSpecifier,
  removeImportSpecifier,
} from '../../../utilities/imports';

const variationMap = {
  strong: {fontWeight: 'bold'},
  subdued: {color: 'subdued'},
  positive: {color: 'success'},
  negative: {color: 'critical'},
  warning: {color: 'warning'},
  code: {},
};

/**
 * Replace <TextStyle> with the <Text> component
 */
export function replaceTextStyle<NodeType = ASTNode>(
  j: JSCodeshift,
  source: Collection<NodeType>,
) {
  if (hasImportSpecifier(j, source, 'Text', '@shopify/polaris')) {
    removeImportSpecifier(j, source, 'TextStyle', '@shopify/polaris');
  } else {
    renameImportSpecifier(j, source, 'TextStyle', 'Text', '@shopify/polaris');
  }

  const localElementName =
    getImportSpecifierName(j, source, 'TextStyle', '@shopify/polaris') ||
    'TextStyle';

  source.findJSXElements(localElementName).forEach((element) => {
    replaceJSXElement(j, element, 'Text');
    insertJSXAttribute(j, element, 'variant', 'bodyMd');
    getJSXAttributes(j, element, 'variation')
      .find(j.StringLiteral)
      .forEach((literal) => {
        const currentValue = literal.node.value as keyof typeof variationMap;
        if (currentValue === 'code') {
          if (
            !hasImportSpecifier(j, source, 'InlineCode', '@shopify/polaris')
          ) {
            insertImportSpecifier(j, source, 'InlineCode', '@shopify/polaris');
          }

          const InlineCode = j.jsxElement(
            j.jsxOpeningElement(j.jsxIdentifier('InlineCode')),
            j.jsxClosingElement(j.jsxIdentifier('InlineCode')),
            element.node.children,
          );
          element.replace(
            j.jsxElement(
              element.node.openingElement,
              element.node.closingElement,
              [InlineCode],
            ),
          );
        } else {
          const newAttributes = variationMap[currentValue];
          Object.entries(newAttributes).forEach(([name, value]) => {
            insertJSXAttribute(j, element, name, value);
          });
        }
      });
    removeJSXAttributes(j, element, 'variation');
    if (hasJSXAttribute(j, element, 'element')) {
      replaceJSXAttributes(j, element, 'element', 'as');
    } else {
      insertJSXAttribute(j, element, 'as', 'span');
    }
  });
}
