import type {
  API,
  FileInfo,
  Options,
  JSXOpeningElement,
  JSXAttribute,
} from 'jscodeshift';

import {
  hasImportDeclaration,
  normalizeImportSourcePaths,
  hasImportSpecifier,
  getImportSpecifierName,
  insertImportDeclaration,
  insertImportSpecifier,
  removeImportSpecifier,
  hasImportSpecifiers,
  removeImportDeclaration,
} from '../../utilities/imports';
import {
  insertJSXAttribute,
  replaceJSXElement,
  removeJSXAttributes,
  insertJSXComment,
  hasJSXAttribute,
  insertCommentBefore,
} from '../../utilities/jsx';
import {POLARIS_MIGRATOR_COMMENT} from '../../constants';

export interface MigrationOptions extends Options {
  relative: boolean;
}

const spacingValues = ['tight', 'loose'] as const;

type SpacingValues = typeof spacingValues[number];
type GapValues = '2' | '5';
type SpacingMapType = {
  [key in SpacingValues]: GapValues;
};

// maping the TextContainer spacing prop to the AlphaStack gap prop
const SPACING_MAP: SpacingMapType = {tight: '2', loose: '5'};

// check that the spacing values are valid
const isValidSpacingValue = (value: any): value is SpacingValues =>
  spacingValues.includes(value);

export default function v11ReactReplaceTextContainerComponents(
  fileInfo: FileInfo,
  {jscodeshift: j}: API,
  options: MigrationOptions,
) {
  const source = j(fileInfo.source);

  // if the current file does not import polaris, bail
  if (!hasImportDeclaration(j, source, '@shopify/polaris')) {
    return fileInfo.source;
  }

  const sourcePaths = normalizeImportSourcePaths(j, source, {
    relative: options.relative,
    from: 'TextContainer',
    to: 'AlphaStack',
  });

  // if current file does not import anything, bail
  if (!sourcePaths) return;
  // if current file does not import a TextContainer component, bail
  if (!hasImportSpecifier(j, source, 'TextContainer', sourcePaths.from)) {
    return;
  }

  // get the name of the element we're targeting
  const localElementName =
    getImportSpecifierName(j, source, 'TextContainer', sourcePaths.from) ||
    'TextContainer';

  const localElementTypeName = getImportSpecifierName(
    j,
    source,
    'TextContainerProps',
    sourcePaths.from,
  );

  let canInsertAlphaStackImport = false;
  let canRemoveTextContainerImport = Boolean(!localElementTypeName);

  // query for all JSX elements in the file and iterate over them
  source.findJSXElements(localElementName).forEach((element) => {
    // get the props on the current jsx element
    const allAttributes =
      (j(element).find(j.JSXOpeningElement).get().value as JSXOpeningElement)
        .attributes ?? [];

    // if any of the props aren't JSXAttribute (like spread/rest) then bail
    if (allAttributes.some((attribute) => attribute.type !== 'JSXAttribute')) {
      canRemoveTextContainerImport = false;
      insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
      return;
    }

    const jsxAttributes = allAttributes as JSXAttribute[];

    // we care about the spacing prop for TextContainer
    const spacingAttribute = jsxAttributes.find((attribute) => {
      return attribute.name.name === 'spacing';
    });

    const spacingAttributeValueNode = spacingAttribute?.value;

    // default AlphaStack gap prop value to 4
    let gapAttributeValue = '4';

    // check if the spacing prop is set and map to its corresponding gap value
    if (spacingAttributeValueNode) {
      // we need to check the type first before we can access the value
      if (
        spacingAttributeValueNode?.type === 'StringLiteral' &&
        // make sure our spacing values match the props we're expecting
        isValidSpacingValue(spacingAttributeValueNode.value)
      ) {
        // is this typescript legal? 🚨 🚔
        const spacingAttributeValue =
          spacingAttributeValueNode.value as SpacingValues;

        gapAttributeValue = SPACING_MAP[spacingAttributeValue];
      } else {
        // if no valid value then we bail
        canRemoveTextContainerImport = false;
        insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
        return;
      }
    }

    canInsertAlphaStackImport = true;

    replaceJSXElement(j, element, 'AlphaStack');
    // all AlphaStack components need a gap prop
    insertJSXAttribute(j, element, 'gap', gapAttributeValue);

    // remove the spacing prop
    if (hasJSXAttribute(j, element, 'spacing')) {
      removeJSXAttributes(j, element, 'spacing');
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
        canRemoveTextContainerImport = false;
      }

      insertCommentBefore(j, path, POLARIS_MIGRATOR_COMMENT);

      if (path.node.name === localElementName) {
        insertCommentBefore(j, path, 'Replace with: AlphaStack');
      } else {
        insertCommentBefore(j, path, 'Replace with: AlphaStackProps');
      }
    });

  if (canInsertAlphaStackImport) {
    if (!hasImportSpecifier(j, source, 'AlphaStack', sourcePaths.to)) {
      if (options.relative) {
        insertImportDeclaration(
          j,
          source,
          'AlphaStack',
          sourcePaths.to,
          sourcePaths.from,
        );
      } else {
        insertImportSpecifier(j, source, 'AlphaStack', sourcePaths.to);
      }
    }
  }

  if (canRemoveTextContainerImport) {
    if (hasImportSpecifier(j, source, 'TextContainer', sourcePaths.from)) {
      removeImportSpecifier(j, source, 'TextContainer', sourcePaths.from);
    }
    if (!hasImportSpecifiers(j, source, sourcePaths.from)) {
      removeImportDeclaration(j, source, sourcePaths.from);
    }
  }

  return source.toSource();
}
