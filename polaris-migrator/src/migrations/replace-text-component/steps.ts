import type {ASTNode, Collection, JSCodeshift} from 'jscodeshift';

import {
  replaceJSXElement,
  replaceJSXAttributes,
  insertJSXAttribute,
} from '../../utilities/jsx';
import {renameImportSpecifier} from '../../utilities/imports';

/**
 * Replace <DisplayText> with the <Text> component
 */
export function replaceDisplayText<NodeType = ASTNode>(
  j: JSCodeshift,
  source: Collection<NodeType>,
) {
  const displayTextSizeMap = {
    small: 'headingXl',
    medium: 'heading2xl',
    large: 'heading3xl',
    extraLarge: 'heading4xl',
  };

  renameImportSpecifier(j, source, 'DisplayText', 'Text', '@shopify/polaris');

  source.findJSXElements('DisplayText').forEach((element) => {
    replaceJSXElement(j, element, 'Text');
    replaceJSXAttributes(j, element, 'size', 'variant', displayTextSizeMap);
  });
}
/**
 * Replace <Heading> with the <Text> component
 */
export function replaceHeading<NodeType = ASTNode>(
  j: JSCodeshift,
  source: Collection<NodeType>,
) {
  renameImportSpecifier(j, source, 'Heading', 'Text', '@shopify/polaris');

  source.findJSXElements('Heading').forEach((element) => {
    replaceJSXElement(j, element, 'Text');
    insertJSXAttribute(j, element, 'variant', 'headingLg');
  });
}
