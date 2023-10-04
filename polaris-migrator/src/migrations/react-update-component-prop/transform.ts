import type {API, FileInfo, JSXAttribute, Options} from 'jscodeshift';

import {insertJSXComment} from '../../utilities/jsx';
import {POLARIS_MIGRATOR_COMMENT} from '../../utilities/constants';

export interface MigrationOptions extends Options {
  componentName: string;
  fromProp: string;
  toProp?: string;
  fromValue?: string;
  toValue?: string;
}

export default function transformer(
  file: FileInfo,
  {jscodeshift: j}: API,
  options: MigrationOptions,
) {
  const {componentName, fromProp, toProp, fromValue, toValue} = options;

  if (!componentName || !fromProp) {
    throw new Error('Missing required options: componentName, fromProp');
  }

  const source = j(file.source);
  const componentNames = componentName.split('.');

  source.find(j.JSXElement).forEach((element) => {
    const nameChain = getNameChain(element.node.openingElement.name);

    if (
      nameChain.length === componentNames.length &&
      componentNames.every((name, index) => name === nameChain[index])
    ) {
      const allAttributes = element.node.openingElement.attributes ?? [];

      if (
        // Early exit on spread operators
        allAttributes.some((attribute) => attribute.type !== 'JSXAttribute')
      ) {
        insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
        return;
      }

      const jsxAttributes = allAttributes as JSXAttribute[];

      jsxAttributes.forEach((jsxAttribute) => {
        if (
          !(
            jsxAttribute.type === 'JSXAttribute' &&
            jsxAttribute.name.name === fromProp
          )
        ) {
          return jsxAttribute;
        }

        // Current jsxAttribute matches target fromProp

        const attributeValueValue =
          jsxAttribute.value?.type === 'StringLiteral'
            ? jsxAttribute.value.value
            : null;

        if (
          toProp &&
          toProp !== fromProp &&
          (!fromValue || fromValue === attributeValueValue)
        ) {
          jsxAttribute.name.name = toProp;
        }

        if (fromValue && fromValue !== attributeValueValue) return jsxAttribute;

        jsxAttribute.value = toValue
          ? j.stringLiteral(toValue)
          : jsxAttribute.value;
      });
    }
  });

  return source.toSource();
}

function getNameChain(name: any): string[] {
  if (name.type === 'JSXIdentifier') {
    return [name.name];
  }
  if (name.type === 'JSXMemberExpression') {
    return [...getNameChain(name.object), name.property.name];
  }
  return [];
}
