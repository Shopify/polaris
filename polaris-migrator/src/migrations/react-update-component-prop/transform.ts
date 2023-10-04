import type {API, FileInfo, Options} from 'jscodeshift';

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
        allAttributes.some((attribute) => attribute.type !== 'JSXAttribute')
      ) {
        insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
        return;
      }

      allAttributes.forEach((attribute) => {
        if (
          !(
            attribute.type === 'JSXAttribute' &&
            attribute.name.name === fromProp
          )
        ) {
          return attribute;
        }

        // Current attribute matches target fromProp

        if (toProp) {
          attribute.name.name = toProp;
        }

        const attributeValueValue =
          attribute.value?.type === 'StringLiteral'
            ? attribute.value.value
            : null;

        if (fromValue && fromValue !== attributeValueValue) return attribute;

        attribute.value = toValue ? j.stringLiteral(toValue) : attribute.value;
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
