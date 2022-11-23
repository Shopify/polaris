import type {
  ASTNode,
  Collection,
  JSCodeshift,
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
  hasImportDeclaration,
  hasImportSpecifier,
  hasImportSpecifiers,
  insertImportDeclaration,
  normalizeImportSourcePaths,
  removeImportDeclaration,
  removeImportSpecifier,
  updateImports,
} from '../../../utilities/imports';
import type {MigrationOptions} from '../react-replace-text-components';
import {POLARIS_MIGRATOR_COMMENT} from '../../../constants';

const components = {
  Heading: {
    variant: 'headingMd',
    as: 'h2',
  },
  Subheading: {
    variant: 'headingXs',
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
  options: MigrationOptions,
) {
  Object.entries(components).forEach(([componentName, {variant, as}]) => {
    const sourcePaths = normalizeImportSourcePaths(j, source, {
      relative: options.relative,
      from: componentName,
      to: 'Text',
    });

    if (!sourcePaths) return;
    if (!hasImportSpecifier(j, source, componentName, sourcePaths.from)) return;

    const localElementName =
      getImportSpecifierName(j, source, componentName, sourcePaths.from) ||
      componentName;

    let canInsertTextImport = false;
    let canRemovePreviousComponentImport = true;

    source.findJSXElements(localElementName).forEach((element) => {
      const allAttributes =
        (j(element).find(j.JSXOpeningElement).get().value as JSXOpeningElement)
          .attributes ?? [];

      if (
        allAttributes.some((attribute) => attribute.type !== 'JSXAttribute')
      ) {
        canRemovePreviousComponentImport = false;
        insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
        return;
      }

      canInsertTextImport = true;

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

    source
      .find(j.Identifier)
      .filter((path) => path.node.name === localElementName)
      .forEach((path) => {
        if (path.node.type !== 'Identifier') return;

        canRemovePreviousComponentImport = false;

        insertCommentBefore(j, path, POLARIS_MIGRATOR_COMMENT);
        insertCommentBefore(j, path, 'Replace with: Text');
      });

    if (!hasImportDeclaration(j, source, sourcePaths.to)) {
      insertImportDeclaration(
        j,
        source,
        'Text',
        sourcePaths.to,
        sourcePaths.from,
      );
    }

    if (canInsertTextImport) {
      updateImports(j, source, {
        fromSpecifier: componentName,
        toSpecifier: 'Text',
        fromSourcePath: sourcePaths.from,
        toSourcePath: sourcePaths.to,
      });
    }

    if (canRemovePreviousComponentImport) {
      if (hasImportSpecifier(j, source, componentName, sourcePaths.from)) {
        removeImportSpecifier(j, source, componentName, sourcePaths.from);
      }
      if (!hasImportSpecifiers(j, source, sourcePaths.from)) {
        removeImportDeclaration(j, source, sourcePaths.from);
      }
    }
  });
}
