import type {
  JSXOpeningElement,
  JSXAttribute,
  ASTPath,
  Collection,
} from 'jscodeshift';
import type core from 'jscodeshift';

import {POLARIS_MIGRATOR_COMMENT} from '../../../utilities/constants';
import {
  insertJSXComment,
  insertJSXAttribute,
  removeJSXAttributes,
} from '../../../utilities/jsx';

export function replaceBoolPropsWithVariant(
  j: core.JSCodeshift,
  source: Collection<any>,
  componentName: string,
  prop1: string,
  prop2: string,
  variantValue: string,
) {
  source.findJSXElements(componentName).forEach((element: ASTPath<any>) => {
    const allAttributes =
      (j(element).find(j.JSXOpeningElement).get().value as JSXOpeningElement)
        .attributes ?? [];
    const jsxAttributes = allAttributes as JSXAttribute[];
    const attribute1 = jsxAttributes.find(
      (attribute) => attribute.name.name === prop1,
    );
    const attribute2 = jsxAttributes.find(
      (attribute) => attribute.name.name === prop2,
    );

    if (attribute1 && attribute2) {
      if (
        attribute1.value?.type === 'JSXExpressionContainer' ||
        attribute2.value?.type === 'JSXExpressionContainer'
      ) {
        insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
        return;
      }

      // Handle self-closing elements
      if (
        element.node.openingElement.selfClosing === true &&
        element.node.openingElement.name.type === 'JSXIdentifier'
      ) {
        // Add variant prop
        element.node.openingElement.attributes = [
          ...element.node.openingElement.attributes,
          j.jsxAttribute(
            j.jsxIdentifier('variant'),
            j.stringLiteral(variantValue),
          ),
        ];

        attribute1.name.name = '';
        attribute1.value = null;
        attribute2.name.name = '';
        attribute2.value = null;
        return;
      }

      // Handle regular elements
      insertJSXAttribute(j, element, 'variant', variantValue);
      removeJSXAttributes(j, element, prop2);
      removeJSXAttributes(j, element, prop1);
    }
  });
}
