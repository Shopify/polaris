import type {API, FileInfo} from 'jscodeshift';

import {POLARIS_MIGRATOR_COMMENT} from '../../utilities/constants';
import {
  getImportSpecifierName,
  hasImportDeclaration,
} from '../../utilities/imports';
import {
  hasJSXAttribute,
  insertCommentBefore,
  insertJSXAttribute,
  insertJSXComment,
} from '../../utilities/jsx';

const modalImportSources = [
  '@shopify/polaris-internal',
  '~/shared/components/Modal',
];

const formUtilityImportSources = [
  '~/shared/utilities/react-form-state',
  '~/shared/utilities/forms/useRouteForm',
  '~/shared/utilities/react-form',
];

export default function transformer(fileInfo: FileInfo, {jscodeshift: j}: API) {
  const source = j(fileInfo.source);

  const hasModalImports = modalImportSources.some((importSource) =>
    hasImportDeclaration(j, source, importSource),
  );

  if (!hasModalImports) {
    return fileInfo.source;
  }

  const hasFormUtilityImports = formUtilityImportSources.some((importSource) =>
    hasImportDeclaration(j, source, importSource),
  );

  if (!hasFormUtilityImports) {
    return fileInfo.source;
  }

  const localElementNames = modalImportSources.reduce<string[]>(
    (acc, importSource) => {
      const localElementName = getImportSpecifierName(
        j,
        source,
        'Modal',
        importSource,
      );
      return localElementName ? [...acc, localElementName] : acc;
    },
    [],
  );

  const hasDirtyIdentifier = source.find(j.VariableDeclarator).some((path) => {
    const {id} = path.node;

    return (
      (id.type === 'Identifier' && id.name === 'dirty') ||
      (id.type === 'ArrayPattern' &&
        id.elements.some(
          (element) =>
            element &&
            element.type === 'Identifier' &&
            element.name === 'dirty',
        )) ||
      (id.type === 'ObjectPattern' &&
        id.properties.some(
          (property) =>
            property.type === 'ObjectProperty' &&
            property.key.type === 'Identifier' &&
            property.key.name === 'dirty',
        ))
    );
  });

  source.find(j.JSXElement).forEach((element) => {
    if (element.node.openingElement.name.type !== 'JSXIdentifier') return;

    if (!localElementNames.includes(element.node.openingElement.name.name))
      return;

    const allAttributes = element.node.openingElement.attributes ?? [];

    if (allAttributes.some((attribute) => attribute.type !== 'JSXAttribute')) {
      insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
      return;
    }

    if (!hasJSXAttribute(j, element, 'dirty')) {
      if (hasDirtyIdentifier) {
        insertJSXAttribute(
          j,
          element,
          'dirty',
          j.jsxExpressionContainer(j.identifier('dirty')),
        );
      } else {
        insertCommentBefore(
          j,
          element,
          'polaris-migrator: Verify if `dirty` variable exists in the file',
        );
      }
    }
  });

  return source.toSource();
}
