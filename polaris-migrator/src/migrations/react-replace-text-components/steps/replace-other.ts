import type {ASTNode, Collection, JSCodeshift} from 'jscodeshift';

import {
  hasJSXAttribute,
  replaceJSXElement,
  replaceJSXAttributes,
  insertJSXAttribute,
  hasJSXSpreadAttribute,
  insertJSXComment,
} from '../../../utilities/jsx';
import {
  hasImportSpecifier,
  getImportSpecifierName,
  normalizeImportSourcePaths,
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
};

/**
 * Replace <Heading>, <Subheading>, <Caption>, and <VisuallyHidden> with the <Text> component
 */
export function replaceOther<NodeType = ASTNode>(
  j: JSCodeshift,
  source: Collection<NodeType>,
  options: MigrationOptions,
) {
  const replaceOtherComponent = (
    j: JSCodeshift,
    source: Collection<NodeType>,
    componentName: string,
    relative: boolean,
  ) => {
    const {variant, as} = (components as any)[componentName];

    const sourcePaths = normalizeImportSourcePaths(j, source, {
      relative,
      from: componentName,
      to: 'Text',
    });

    if (!sourcePaths) return;
    if (!hasImportSpecifier(j, source, componentName, sourcePaths.from)) return;

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
      if (hasJSXSpreadAttribute(j, element)) {
        insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
      }

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
        path.node.name = 'Text';
      });
  };

  if (
    options.componentNames &&
    options.componentNames.some(
      (component) => !Object.keys(components).includes(component),
    )
  ) {
    throw new Error(`Unsupported component name: ${options.componentNames}`);
  }

  const componentNames = options.componentNames || Object.keys(components);

  componentNames.forEach((componentName) =>
    replaceOtherComponent(j, source, componentName, options.relative),
  );
}
