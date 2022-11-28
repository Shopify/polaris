import type {
  ASTNode,
  Collection,
  JSCodeshift,
  JSXAttribute,
  JSXOpeningElement,
} from 'jscodeshift';

import {
  insertCommentBefore,
  insertJSXAttribute,
  insertJSXComment,
  removeJSXAttributes,
  replaceJSXElement,
} from '../../../utilities/jsx';
import {
  getImportSpecifierName,
  hasImportSpecifier,
  hasImportSpecifiers,
  insertImportDeclaration,
  insertImportSpecifier,
  normalizeImportSourcePaths,
  removeImportDeclaration,
  removeImportSpecifier,
} from '../../../utilities/imports';
import type {MigrationOptions} from '../react-replace-text-components';
import {POLARIS_MIGRATOR_COMMENT} from '../../../constants';
import {isKeyOf} from '../../../utilities/type-guards';

const variationMap = {
  strong: {fontWeight: 'semibold'},
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
  const sourcePaths = normalizeImportSourcePaths(j, source, {
    relative: options.relative,
    from: 'TextStyle',
    to: 'Text',
  });

  if (!sourcePaths) return;
  if (
    !hasImportSpecifier(j, source, 'TextStyle', sourcePaths.from) &&
    !hasImportSpecifier(j, source, 'TextStyleProps', sourcePaths.from)
  ) {
    return;
  }

  const localElementName =
    getImportSpecifierName(j, source, 'TextStyle', sourcePaths.from) ||
    'TextStyle';

  const localElementTypeName = getImportSpecifierName(
    j,
    source,
    'TextStyleProps',
    sourcePaths.from,
  );

  let canInsertTextImport = false;
  let canRemoveTextStyleImport = Boolean(!localElementTypeName);
  let canInsertInlineCodeImport = false;

  source.findJSXElements(localElementName).forEach((element) => {
    const allAttributes =
      (j(element).find(j.JSXOpeningElement).get().value as JSXOpeningElement)
        .attributes ?? [];

    if (allAttributes.some((attribute) => attribute.type !== 'JSXAttribute')) {
      canRemoveTextStyleImport = false;
      insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
      return;
    }

    const jsxAttributes = allAttributes as JSXAttribute[];

    const variationAttribute = jsxAttributes.find(
      (attribute) => attribute.name.name === 'variation',
    );

    let variationValue: keyof typeof variationMap | undefined;

    if (variationAttribute) {
      const variationAttributeValue = variationAttribute.value;

      if (
        variationAttributeValue?.type === 'StringLiteral' &&
        isKeyOf(variationMap, variationAttributeValue.value)
      ) {
        variationValue = variationAttributeValue.value;
      } else {
        canRemoveTextStyleImport = false;
        insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
        return;
      }
    }

    canInsertTextImport = true;

    replaceJSXElement(j, element, 'Text');
    insertJSXAttribute(j, element, 'variant', 'bodyMd');
    insertJSXAttribute(j, element, 'as', 'span');
    removeJSXAttributes(j, element, 'variation');

    if (typeof variationValue === 'undefined') return;

    if (variationValue === 'code') {
      canInsertInlineCodeImport = true;

      const InlineCode = j.jsxElement(
        j.jsxOpeningElement(j.jsxIdentifier('InlineCode')),
        j.jsxClosingElement(j.jsxIdentifier('InlineCode')),
        element.node.children,
      );

      element.replace(
        j.jsxElement(element.node.openingElement, element.node.closingElement, [
          InlineCode,
        ]),
      );

      return;
    }

    Object.entries(variationMap[variationValue]).forEach(([name, value]) => {
      insertJSXAttribute(j, element, name, value);
    });
  });

  source
    .find(j.Identifier)
    .filter(
      (path) =>
        path.node.name === localElementName ||
        path.node.name === localElementTypeName,
    )
    .forEach((path) => {
      if (path.node.type !== 'Identifier') return;

      if (path.parent.value.type !== 'ImportSpecifier') {
        canRemoveTextStyleImport = false;
      }

      insertCommentBefore(j, path, POLARIS_MIGRATOR_COMMENT);

      if (path.node.name === localElementName) {
        insertCommentBefore(j, path, 'Replace with: Text');
      } else {
        insertCommentBefore(j, path, 'Replace with: TextProps');
      }
    });

  if (canInsertTextImport) {
    if (!hasImportSpecifier(j, source, 'Text', sourcePaths.to)) {
      if (options.relative) {
        insertImportDeclaration(
          j,
          source,
          'Text',
          sourcePaths.to,
          sourcePaths.from,
        );
      } else {
        insertImportSpecifier(j, source, 'Text', sourcePaths.to);
      }
    }
  }

  const inlineTextSourcePath = options.relative
    ? sourcePaths.from.replace('TextStyle', 'InlineCode')
    : '@shopify/polaris';

  if (canInsertInlineCodeImport) {
    if (!hasImportSpecifier(j, source, 'InlineCode', inlineTextSourcePath)) {
      if (options.relative) {
        insertImportDeclaration(
          j,
          source,
          'InlineCode',
          inlineTextSourcePath,
          sourcePaths.to,
        );
      } else {
        insertImportSpecifier(j, source, 'InlineCode', inlineTextSourcePath);
      }
    }
  }

  if (canRemoveTextStyleImport) {
    if (hasImportSpecifier(j, source, 'TextStyle', sourcePaths.from)) {
      removeImportSpecifier(j, source, 'TextStyle', sourcePaths.from);
    }
    if (!hasImportSpecifiers(j, source, sourcePaths.from)) {
      removeImportDeclaration(j, source, sourcePaths.from);
    }
  }
}
