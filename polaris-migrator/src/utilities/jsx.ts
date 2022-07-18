import core, {ASTPath} from 'jscodeshift';

import type {ReplacementMap} from './regex';

export function getJSXAttributes(
  j: core.JSCodeshift,
  element: ASTPath<any>,
  attributeName: string,
) {
  return j(element)
    .find(j.JSXOpeningElement)
    .find(j.JSXAttribute)
    .filter((attribute) => {
      const matches = j(attribute)
        .find(j.JSXIdentifier)
        .filter((identifier) => identifier.value.name === attributeName);
      return Boolean(matches.length);
    });
}

export function hasJSXAttributes(
  j: core.JSCodeshift,
  element: ASTPath<any>,
  attributeName: string,
) {
  return getJSXAttributes(j, element, attributeName).length > 0;
}

export function removeJSXAttributes(
  j: core.JSCodeshift,
  element: ASTPath<any>,
  attributeName: string,
) {
  return getJSXAttributes(j, element, attributeName).remove();
}

export function insertJSXAttribute(
  j: core.JSCodeshift,
  element: ASTPath<any>,
  attributeName: string,
  attributeValue: string,
) {
  const newComponent = j.jsxElement(
    j.jsxOpeningElement(element.node.openingElement.name, [
      ...(element.node.openingElement.attributes || []),
      j.jsxAttribute(
        j.jsxIdentifier(attributeName),
        attributeValue ? j.stringLiteral(attributeValue) : null,
      ),
    ]),
    element.node.closingElement,
    element.node.children,
  );

  return j(element).replaceWith(newComponent);
}

export function replaceJSXAttributes(
  j: core.JSCodeshift,
  element: ASTPath<any>,
  attributeName: string,
  newAttributeName: string,
  newAttributeValueMap?: ReplacementMap,
) {
  return getJSXAttributes(j, element, attributeName).forEach((attribute) => {
    j(attribute)
      .find(j.JSXIdentifier)
      .replaceWith(j.jsxIdentifier(newAttributeName));

    if (!newAttributeValueMap) {
      return;
    }

    j(attribute)
      .filter(
        (attr) =>
          attr.node.value && attr.node.value.value in newAttributeValueMap,
      )
      .replaceWith((attr) =>
        j.jsxAttribute(
          j.jsxIdentifier(newAttributeName),
          j.stringLiteral(
            newAttributeValueMap[
              attr.node.value.value as keyof typeof newAttributeValueMap
            ],
          ),
        ),
      );
  });
}

export function replaceJSXElement(
  j: core.JSCodeshift,
  element: ASTPath<any>,
  componentName: string,
) {
  const newComponent = j.jsxElement(
    j.jsxOpeningElement(
      j.jsxIdentifier(componentName),
      element.node.openingElement.attributes,
    ),
    j.jsxClosingElement(j.jsxIdentifier(componentName)),
    element.node.children,
  );

  return j(element).replaceWith(newComponent);
}
