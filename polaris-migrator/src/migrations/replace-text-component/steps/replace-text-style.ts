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
  getImportSourcePaths,
  renameImportDeclaration,
  removeImportDeclaration,
  insertImportDeclaration,
} from '../../../utilities/imports';
import type {MigrationOptions} from '../replace-text-component';

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
  options: MigrationOptions,
) {
  const sourcePaths = getImportSourcePaths(j, source, {
    relative: Boolean(options.relative),
    currentFileName: 'TextStyle',
    nextFileName: 'Text',
  });

  if (!sourcePaths) return;

  const localElementName =
    getImportSpecifierName(j, source, 'TextStyle', sourcePaths.current) ||
    'TextStyle';

  if (hasImportSpecifier(j, source, 'Text', sourcePaths.next)) {
    if (options.relative) {
      removeImportDeclaration(j, source, sourcePaths.current);
    } else {
      removeImportSpecifier(j, source, 'TextStyle', sourcePaths.current);
    }
  } else {
    if (options.relative) {
      renameImportDeclaration(j, source, sourcePaths.current, sourcePaths.next);
    }
    renameImportSpecifier(j, source, 'TextStyle', 'Text', sourcePaths.next);
  }

  source.findJSXElements(localElementName).forEach((element) => {
    replaceJSXElement(j, element, 'Text');
    insertJSXAttribute(j, element, 'variant', 'bodyMd');
    getJSXAttributes(j, element, 'variation')
      .find(j.StringLiteral)
      .forEach((literal) => {
        const currentValue = literal.node.value as keyof typeof variationMap;
        if (currentValue === 'code') {
          const inlineTextSourcePath = options.relative
            ? sourcePaths.current.replace('TextStyle', 'InlineCode')
            : '@shopify/polaris';

          if (
            !hasImportSpecifier(j, source, 'InlineCode', inlineTextSourcePath)
          ) {
            if (options.relative) {
              insertImportDeclaration(
                j,
                source,
                'InlineCode',
                inlineTextSourcePath,
                sourcePaths.next,
              );
            } else {
              insertImportSpecifier(
                j,
                source,
                'InlineCode',
                inlineTextSourcePath,
              );
            }
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
