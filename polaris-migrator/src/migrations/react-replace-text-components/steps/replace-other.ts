import type {ASTNode, Collection, JSCodeshift} from 'jscodeshift';

import {
  hasJSXAttribute,
  replaceJSXElement,
  replaceJSXAttributes,
  insertJSXAttribute,
} from '../../../utilities/jsx';
import {
  getImportSpecifierName,
  normalizeImportSourcePaths,
  updateImports,
} from '../../../utilities/imports';
import type {MigrationOptions} from '../react-replace-text-components';

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
  const relative = options.relative;

  Object.entries(components).forEach(([componentName, {variant, as}]) => {
    const sourcePaths = normalizeImportSourcePaths(j, source, {
      relative,
      from: componentName,
      to: 'Text',
    });

    if (!sourcePaths) return;

    const localElementName =
      getImportSpecifierName(j, source, componentName, sourcePaths.from) ||
      componentName;

    updateImports(j, source, {
      fromSpecifier: componentName,
      toSpecifier: 'Text',
      fromSourcePath: sourcePaths.from,
      toSourcePath: sourcePaths.to,
    });

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
