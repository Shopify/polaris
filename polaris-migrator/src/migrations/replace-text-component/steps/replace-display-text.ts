import type {ASTNode, Collection, JSCodeshift} from 'jscodeshift';

import {
  hasJSXAttribute,
  replaceJSXElement,
  replaceJSXAttributes,
  insertJSXAttribute,
} from '../../../utilities/jsx';
import {
  renameImportSpecifier,
  getImportSpecifierName,
  hasImportSpecifier,
  removeImportSpecifier,
  getImportSourcePaths,
  renameImportDeclaration,
  removeImportDeclaration,
} from '../../../utilities/imports';
import type {MigrationOptions} from '../replace-text-component';

const displayTextSizeMap = {
  small: 'headingXl',
  medium: 'heading2xl',
  large: 'heading3xl',
  extraLarge: 'heading4xl',
};

/**
 * Replace <DisplayText> with the <Text> component
 */
export function replaceDisplayText<NodeType = ASTNode>(
  j: JSCodeshift,
  source: Collection<NodeType>,
  options: MigrationOptions,
) {
  const sourcePaths = getImportSourcePaths(j, source, {
    relative: Boolean(options.relative),
    currentFileName: 'DisplayText',
    nextFileName: 'Text',
  });

  if (!sourcePaths) return;

  const localElementName =
    getImportSpecifierName(j, source, 'DisplayText', sourcePaths.current) ||
    'DisplayText';

  if (hasImportSpecifier(j, source, 'Text', sourcePaths.next)) {
    if (options.relative) {
      removeImportDeclaration(j, source, sourcePaths.current);
    } else {
      removeImportSpecifier(j, source, 'DisplayText', sourcePaths.current);
    }
  } else {
    if (options.relative) {
      renameImportDeclaration(j, source, sourcePaths.current, sourcePaths.next);
    }
    renameImportSpecifier(j, source, 'DisplayText', 'Text', sourcePaths.next);
  }

  source.findJSXElements(localElementName).forEach((element) => {
    replaceJSXElement(j, element, 'Text');
    replaceJSXAttributes(j, element, 'size', 'variant', displayTextSizeMap);

    if (hasJSXAttribute(j, element, 'element')) {
      replaceJSXAttributes(j, element, 'element', 'as');
    } else {
      insertJSXAttribute(j, element, 'as', 'p');
    }
  });
}
