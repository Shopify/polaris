import type {ASTPath, Collection, JSXAttribute, JSXElement} from 'jscodeshift';
import type core from 'jscodeshift';

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

export function hasJSXSpreadAttribute(
  j: core.JSCodeshift,
  element: ASTPath<any>,
) {
  return (
    j(element).find(j.JSXOpeningElement).find(j.JSXSpreadAttribute).length > 0
  );
}

export function removeJSXAttributes(
  _j: core.JSCodeshift,
  element: ASTPath<JSXElement>,
  attributeName: string,
) {
  const jsxAttributes = element.value.openingElement?.attributes?.filter(
    (attr) => attr.type === 'JSXAttribute' && attr.name.name === attributeName,
  );

  if (!jsxAttributes) return;

  jsxAttributes.forEach((attr) => {
    const jsxAttribute = attr as JSXAttribute;

    jsxAttribute.name.name = '';
    jsxAttribute.value = null;
  });
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
        const isStringLiteral = typeof newAttributeValue === 'string';

        if (isStringLiteral) {
          literal.node.value = newAttributeValue;
          return;
        }

        const value = literal.node.value as string;

        if (value in newAttributeValue) {
          literal.node.value = newAttributeValue[literal.node.value];
        }
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
  j: core.JSCodeshift,
  source: Collection<any>,
  componentName: string,
  props: {[from: string]: string},
  fromValue?: string,
  toValue?: string,
) {
  const [component, subcomponent] = componentName.split('.');

  // Handle compound components
  if (component && subcomponent) {
    source.find(j.JSXElement).forEach((element) => {
      if (
        element.node.openingElement.name.type === 'JSXMemberExpression' &&
        element.node.openingElement.name.object.type === 'JSXIdentifier' &&
        element.node.openingElement.name.object.name === component &&
        element.node.openingElement.name.property.name === subcomponent
      ) {
        element.node.openingElement.attributes?.forEach((node) =>
          updateNode(node, props, fromValue, toValue),
        );
      }
    });
    return;
  }

  // Handle basic components
  source.findJSXElements(componentName)?.forEach((element) => {
    element.node.openingElement.attributes?.forEach((node) =>
      updateNode(node, props, fromValue, toValue),
    );
  });

  return source;

  function updateNode(
    node: any,
    props: {[from: string]: string},
    fromValue?: string,
    toValue?: string,
  ) {
    const isFromProp = (prop: unknown): prop is keyof typeof props =>
      Object.keys(props).includes(prop as string);

    if (!(node.type === 'JSXAttribute' && isFromProp(node.name.name))) {
      return node;
    }

    node.name.name = props[node.name.name];
    if (fromValue && node.value.value !== fromValue) return node;
    node.value = j.stringLiteral(toValue ?? node.value.value);
    return node;
  }
}

export function insertJSXComment(
  j: core.JSCodeshift,
  element: ASTPath<any>,
  comment: string,
  position: 'before' | 'after' = 'before',
) {
  const commentContent = j.jsxEmptyExpression();
  commentContent.comments = [j.commentBlock(` ${comment} `, false, true)];

  const jsxComment = j.jsxExpressionContainer(commentContent);
  const lineBreak = j.jsxText('\n');

  if (position === 'before') {
    if (element.parentPath.value.type === 'ReturnStatement') {
      insertCommentBefore(j, element, comment);
    } else {
      element.insertBefore(jsxComment);
      element.insertBefore(lineBreak);
    }
  }

  if (position === 'after') {
    element.insertAfter(lineBreak);
    element.insertAfter(jsxComment);
  }
}

export function insertCommentBefore(
  j: core.JSCodeshift,
  path: ASTPath<any>,
  comment: string,
) {
  const content = ` ${comment} `;

  path.value.comments = path.value.comments || [];

  const exists = path.value.comments.find(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (comment) => comment.value === content,
  );

  // Avoiding duplicates of the same comment
  if (exists) return;

  path.value.comments.push(j.commentBlock(content));
}
