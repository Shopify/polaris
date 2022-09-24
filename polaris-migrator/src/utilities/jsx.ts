import core, {ASTPath, Collection} from 'jscodeshift';

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

export function hasJSXAttribute(
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
  attributeValue?: string,
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
  newAttributeValue?:
    | string
    | {
        [key: string]: string;
      },
) {
  return getJSXAttributes(j, element, attributeName).forEach((attribute) => {
    j(attribute)
      .find(j.JSXIdentifier)
      .replaceWith(j.jsxIdentifier(newAttributeName));

    if (!newAttributeValue) {
      return;
    }

    j(attribute)
      .find(j.StringLiteral)
      .forEach((literal) => {
        literal.node.value =
          typeof newAttributeValue === 'string'
            ? newAttributeValue
            : newAttributeValue[literal.node.value];
      });
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

export function renameProps(
  _j: core.JSCodeshift,
  source: Collection<any>,
  componentName: string,
  props: {[from: string]: string},
) {
  const fromProps = Object.keys(props);
  const isFromProp = (name: unknown): name is keyof typeof props =>
    fromProps.includes(name as string);

  source.findJSXElements(componentName)?.forEach((path) => {
    path.node.openingElement.attributes?.forEach((node) => {
      if (node.type === 'JSXAttribute' && isFromProp(node.name.name)) {
        node.name.name = props[node.name.name];
      }
    });
  });

  return source;
}
