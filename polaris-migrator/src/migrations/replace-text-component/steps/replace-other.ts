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

const components = {
  Heading: {
    variant: 'headingLg',
    as: 'h2',
  },
  Subheading: {
    variant: 'headingSm',
    as: 'h3',
  },
  Caption: {
    variant: 'bodySm',
    as: 'p',
  },
  VisuallyHidden: {
    variant: 'bodySm',
    as: 'span',
  },
} as const;

/**
 * Replace <Heading>, <Subheading>, <Caption>, and <VisuallyHidden> with the <Text> component
 */
export function replaceOther<NodeType = ASTNode>(
  j: JSCodeshift,
  source: Collection<NodeType>,
) {
  Object.entries(components).forEach(([componentName, {variant, as}]) => {
    if (hasImportSpecifier(j, source, 'Text', '@shopify/polaris')) {
      removeImportSpecifier(j, source, componentName, '@shopify/polaris');
    } else {
      renameImportSpecifier(
        j,
        source,
        componentName,
        'Text',
        '@shopify/polaris',
      );
    }

    const localElementName =
      getImportSpecifierName(j, source, componentName, '@shopify/polaris') ||
      componentName;

    source.findJSXElements(localElementName).forEach((element) => {
      replaceJSXElement(j, element, 'Text');
      insertJSXAttribute(j, element, 'variant', variant);

      if (hasJSXAttribute(j, element, 'element')) {
        replaceJSXAttributes(j, element, 'element', 'as');
      } else {
        insertJSXAttribute(j, element, 'as', as);
      }

      if (componentName === 'VisuallyHidden') {
        insertJSXAttribute(j, element, 'visuallyHidden');
      }
    });
  });
}
