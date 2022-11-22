import type {
  ASTNode,
  Collection,
  JSCodeshift,
  JSXOpeningElement,
  JSXAttribute,
} from 'jscodeshift';

import {
  hasJSXAttribute,
  replaceJSXElement,
  replaceJSXAttributes,
  insertJSXAttribute,
  insertJSXComment,
  insertCommentBefore,
} from '../../../utilities/jsx';
import {isKeyOf} from '../../../utilities/type-guards';
import {
  getImportSpecifierName,
  hasImportSpecifier,
  normalizeImportSourcePaths,
  updateImports,
} from '../../../utilities/imports';
import type {MigrationOptions} from '../react-replace-text-components';
import {POLARIS_MIGRATOR_COMMENT} from '../../../constants';

const displayTextElements = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p']);

const defaultDisplayTextElement = 'p';

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

  let canInsertTextImport = false;
  let canRemoveDisplayTextImport = true;

  source.findJSXElements(localElementName).forEach((element) => {
    const allAttributes =
      (j(element).find(j.JSXOpeningElement).get().value as JSXOpeningElement)
        .attributes ?? [];

    if (allAttributes.some((attribute) => attribute.type !== 'JSXAttribute')) {
      canRemoveDisplayTextImport = false;
      insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
      return;
    }

    const jsxAttributes = allAttributes as JSXAttribute[];

    const elementAttribute = jsxAttributes.find(
      (attribute) => attribute.name.name === 'element',
    );

    let elementValue = defaultDisplayTextElement;

    if (elementAttribute) {
      const elementAttributeValue = elementAttribute.value;

      if (
        elementAttributeValue?.type === 'StringLiteral' &&
        displayTextElements.has(elementAttributeValue.value)
      ) {
        elementValue = elementAttributeValue.value;
      } else {
        canRemoveDisplayTextImport = false;
        insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
        return;
      }
    }

    const sizeAttribute = jsxAttributes.find(
      (attribute) => attribute.name.name === 'size',
    );

    let sizeValue: keyof typeof displayTextSizeMap = defaultDisplayTextSize;

    if (sizeAttribute) {
      const sizeAttributeValue = sizeAttribute.value;

      if (
        sizeAttributeValue?.type === 'StringLiteral' &&
        isKeyOf(displayTextSizeMap, sizeAttributeValue.value)
      ) {
        sizeValue = sizeAttributeValue.value;
      } else {
        canRemoveDisplayTextImport = false;
        insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
        return;
      }
    }

    canInsertTextImport = true;

    replaceJSXElement(j, element, 'Text');

    if (!hasJSXAttribute(j, element, 'element')) {
      insertJSXAttribute(j, element, 'as', elementValue);
    } else {
      replaceJSXAttributes(j, element, 'element', 'as', elementValue);
    }

    if (!hasJSXAttribute(j, element, 'size')) {
      insertJSXAttribute(j, element, 'variant', displayTextSizeMap[sizeValue]);
    } else {
      replaceJSXAttributes(
        j,
        element,
        'size',
        'variant',
        displayTextSizeMap[sizeValue],
      );
    }
  });

  source
    .find(j.Identifier)
    .filter((path) => path.node.name === localElementName)
    .forEach((path) => {
      insertCommentBefore(j, path, POLARIS_MIGRATOR_COMMENT);
      insertCommentBefore(j, path, 'Text');
      canRemoveDisplayTextImport = false;
    });

  // TODO: Update imports after processing the file..
  updateImports(j, source, {
    fromSpecifier: 'DisplayText',
    toSpecifier: 'Text',
    fromSourcePath: sourcePaths.from,
    toSourcePath: sourcePaths.to,
  });
}
