import type {ASTNode, Collection, JSCodeshift} from 'jscodeshift';

import {
  hasJSXAttribute,
  replaceJSXElement,
  replaceJSXAttributes,
  insertJSXAttribute,
} from '../../../utilities/jsx';
import {
  getImportSpecifierName,
  hasImportSpecifier,
  normalizeImportSourcePaths,
  updateImports,
} from '../../../utilities/imports';
import type {MigrationOptions} from '../react-replace-text-components';

const displayTextSizeMap = {
  small: 'headingLg',
  medium: 'headingXl',
  large: 'heading2xl',
  extraLarge: 'heading4xl',
};

const defaultDisplayTextSize = 'medium';

/**
 * Replace <DisplayText> with the <Text> component
 */
export function replaceDisplayText<NodeType = ASTNode>(
  j: JSCodeshift,
  source: Collection<NodeType>,
  options: MigrationOptions,
) {
  const sourcePaths = normalizeImportSourcePaths(j, source, {
    relative: options.relative,
    from: 'DisplayText',
    to: 'Text',
  });

  if (!sourcePaths) return;
  if (!hasImportSpecifier(j, source, 'DisplayText', sourcePaths.from)) return;

  const localElementName =
    getImportSpecifierName(j, source, 'DisplayText', sourcePaths.from) ||
    'DisplayText';

  updateImports(j, source, {
    fromSpecifier: 'DisplayText',
    toSpecifier: 'Text',
    fromSourcePath: sourcePaths.from,
    toSourcePath: sourcePaths.to,
  });

  source.findJSXElements(localElementName).forEach((element) => {
    replaceJSXElement(j, element, 'Text');

    if (!hasJSXAttribute(j, element, 'size')) {
      insertJSXAttribute(j, element, 'size', defaultDisplayTextSize);
    }

    replaceJSXAttributes(j, element, 'size', 'variant', displayTextSizeMap);

    if (hasJSXAttribute(j, element, 'element')) {
      replaceJSXAttributes(j, element, 'element', 'as');
    } else {
      insertJSXAttribute(j, element, 'as', 'p');
    }
  });

  source
    .find(j.Identifier)
    .filter((path) => path.node.name === localElementName)
    .forEach((path) => {
      path.node.name = 'Text';
    });
}
