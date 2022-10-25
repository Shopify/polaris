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
  getImportSourcePaths,
  removeImportDeclaration,
  renameImportDeclaration,
} from '../../../utilities/imports';
import type {MigrationOptions} from '../replace-text-component';

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
  options: MigrationOptions,
) {
  const relative = Boolean(options.relative);

  Object.entries(components).forEach(([componentName, {variant, as}]) => {
    const sourcePaths = getImportSourcePaths(j, source, {
      relative,
      currentFileName: componentName,
      nextFileName: 'Text',
    });

    if (!sourcePaths) return;

    const localElementName =
      getImportSpecifierName(j, source, componentName, sourcePaths.current) ||
      componentName;

    if (hasImportSpecifier(j, source, 'Text', sourcePaths.next)) {
      if (options.relative) {
        removeImportDeclaration(j, source, sourcePaths.current);
      } else {
        removeImportSpecifier(j, source, componentName, sourcePaths.current);
      }
    } else {
      if (options.relative) {
        renameImportDeclaration(
          j,
          source,
          sourcePaths.current,
          sourcePaths.next,
        );
      }
      renameImportSpecifier(j, source, componentName, 'Text', sourcePaths.next);
    }

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
