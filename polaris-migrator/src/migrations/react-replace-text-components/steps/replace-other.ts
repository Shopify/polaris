import type {
  ASTNode,
  Collection,
  JSCodeshift,
  JSXAttribute,
  JSXOpeningElement,
} from 'jscodeshift';

import {
  hasJSXAttribute,
  insertJSXAttribute,
  insertJSXComment,
  insertCommentBefore,
  replaceJSXAttributes,
  replaceJSXElement,
} from '../../../utilities/jsx';
import {
  getImportSpecifierName,
  hasImportSpecifier,
  hasImportSpecifiers,
  insertImportSpecifier,
  normalizeImportSourcePaths,
  removeImportDeclaration,
  removeImportSpecifier,
} from '../../../utilities/imports';
import type {MigrationOptions} from '../react-replace-text-components';
import {POLARIS_MIGRATOR_COMMENT} from '../../../constants';

const components = {
  Heading: {
    validElements: new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p']),
    defaultElement: 'h2',
    as: 'h2',
    variant: 'headingMd',
  },
  Subheading: {
    validElements: new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p']),
    defaultElement: 'h3',
    as: 'h3',
    variant: 'headingXs',
  },
  Caption: {
    validElements: new Set<string>(),
    defaultElement: undefined,
    as: 'p',
    variant: 'bodySm',
  },
  VisuallyHidden: {
    validElements: new Set<string>(),
    defaultElement: undefined,
    as: 'span',
    variant: 'bodySm',
  },
} as const;

/**
 * Replace <Heading>, <Subheading>, <Caption>, and <VisuallyHidden> with the <Text> component
 */
export function replaceOther<NodeType = ASTNode>(
  j: JSCodeshift,
  source: Collection<NodeType>,
  options: MigrationOptions,
) {
  Object.entries(components).forEach(
    ([componentName, {validElements, defaultElement, variant, as}]) => {
      const sourcePaths = normalizeImportSourcePaths(j, source, {
        relative: options.relative,
        from: componentName,
        to: 'Text',
      });

      if (!sourcePaths) return;
      if (
        !hasImportSpecifier(j, source, componentName, sourcePaths.from) &&
        !hasImportSpecifier(
          j,
          source,
          `${componentName}Props`,
          sourcePaths.from,
        )
      ) {
        return;
      }

      const localElementName =
        getImportSpecifierName(j, source, componentName, sourcePaths.from) ||
        componentName;

      const localElementTypeName = getImportSpecifierName(
        j,
        source,
        `${componentName}Props`,
        sourcePaths.from,
      );

      let canInsertTextImport = false;
      let canRemoveComponentImport = Boolean(!localElementTypeName);

      source.findJSXElements(localElementName).forEach((element) => {
        const allAttributes =
          (
            j(element).find(j.JSXOpeningElement).get()
              .value as JSXOpeningElement
          ).attributes ?? [];

        if (
          allAttributes.some((attribute) => attribute.type !== 'JSXAttribute')
        ) {
          canRemoveComponentImport = false;
          insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
          return;
        }

        const jsxAttributes = allAttributes as JSXAttribute[];

        const elementAttribute = jsxAttributes.find(
          (attribute) => attribute.name.name === 'element',
        );

        let elementValue: string | undefined = defaultElement;

        if (elementAttribute) {
          const elementAttributeValue = elementAttribute.value;

          if (
            elementAttributeValue?.type === 'StringLiteral' &&
            validElements.has(elementAttributeValue.value)
          ) {
            elementValue = elementAttributeValue.value;
          } else {
            canRemoveComponentImport = false;
            insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
            return;
          }
        }

        canInsertTextImport = true;

        replaceJSXElement(j, element, 'Text');
        insertJSXAttribute(j, element, 'variant', variant);

        if (hasJSXAttribute(j, element, 'element')) {
          replaceJSXAttributes(j, element, 'element', 'as', elementValue ?? as);
        } else {
          insertJSXAttribute(j, element, 'as', elementValue ?? as);
        }

        if (componentName === 'VisuallyHidden') {
          insertJSXAttribute(j, element, 'visuallyHidden');
        }
      });

      source
        .find(j.Identifier)
        .filter(
          (path) =>
            path.node.name === localElementName ||
            path.node.name === localElementTypeName,
        )
        .forEach((path) => {
          if (path.node.type !== 'Identifier') return;

          if (path.parent.value.type !== 'ImportSpecifier') {
            canRemoveComponentImport = false;
          }

          insertCommentBefore(j, path, POLARIS_MIGRATOR_COMMENT);

          if (path.node.name === localElementName) {
            insertCommentBefore(j, path, 'Replace with: Text');
          } else {
            insertCommentBefore(j, path, 'Replace with: TextProps');
          }
        });

      if (
        canInsertTextImport &&
        !hasImportSpecifier(j, source, 'Text', sourcePaths.to)
      ) {
        insertImportSpecifier(j, source, 'Text', sourcePaths.to);
      }

      if (canRemoveComponentImport) {
        if (hasImportSpecifier(j, source, componentName, sourcePaths.from)) {
          removeImportSpecifier(j, source, componentName, sourcePaths.from);
        }
        if (!hasImportSpecifiers(j, source, sourcePaths.from)) {
          removeImportDeclaration(j, source, sourcePaths.from);
        }
      }
    },
  );
}
