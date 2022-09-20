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
} from '../../../utilities/imports';

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
) {
  if (hasImportSpecifier(j, source, 'Text', '@shopify/polaris')) {
    removeImportSpecifier(j, source, 'DisplayText', '@shopify/polaris');
  } else {
    renameImportSpecifier(j, source, 'DisplayText', 'Text', '@shopify/polaris');
  }

  const localElementName =
    getImportSpecifierName(j, source, 'DisplayText', '@shopify/polaris') ||
    'DisplayText';

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
