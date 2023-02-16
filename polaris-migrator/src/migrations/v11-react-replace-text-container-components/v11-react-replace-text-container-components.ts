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
} from '../../utilities/jsx';

export interface MigrationOptions extends Options {
  relative: boolean;
}

export default function v11ReactReplaceTextContainerComponents(
  fileInfo: FileInfo,
  {jscodeshift: j}: API,
  options: MigrationOptions,
) {
  const source = j(fileInfo.source);

  // if the current file does not import polaris, exit
  if (!hasImportDeclaration(j, source, '@shopify/polaris')) {
    return fileInfo.source;
  }

  const sourcePaths = normalizeImportSourcePaths(j, source, {
    relative: options.relative,
    from: 'TextContainer',
    to: 'AlphaStack',
  });

  if (!sourcePaths) return;
  // if current file does not import a TextContainer component, bail
  if (!hasImportSpecifier(j, source, 'TextContainer', sourcePaths.from)) {
    return;
  }

  // get the name of the element we're targeting
  const localElementName =
    getImportSpecifierName(j, source, 'TextContainer', sourcePaths.from) ||
    'TextContainer';

  source.findJSXElements(localElementName).forEach((element) => {
    const allAttributes =
      (j(element).find(j.JSXOpeningElement).get().value as JSXOpeningElement)
        .attributes ?? [];

    // console.log(allAttributes);

    const jsxAttributes = allAttributes as JSXAttribute[];

    const spacingAttribute = jsxAttributes.find((attribute) => {
      return attribute.name.name === 'spacing';
    });

    const spacingAttributeValueNode = spacingAttribute?.value;

    // default gap value to 4
    let gapAttributeValue = '4';

    // check if the `spacing` attribute is set and map to it's corresponding gap
    if (spacingAttributeValueNode) {
      if (spacingAttributeValueNode?.type === 'StringLiteral') {
        const spacingAttributeValue = spacingAttributeValueNode.value;

        gapAttributeValue = spacingAttributeValue === 'tight' ? '2' : '5';
      }
    }

    replaceJSXElement(j, element, 'AlphaStack');
    insertJSXAttribute(j, element, 'gap', gapAttributeValue);
    removeJSXAttributes(j, element, 'spacing');
  });

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

  if (hasImportSpecifier(j, source, 'TextContainer', sourcePaths.from)) {
    removeImportSpecifier(j, source, 'TextContainer', sourcePaths.from);
  }
  if (!hasImportSpecifiers(j, source, sourcePaths.from)) {
    removeImportDeclaration(j, source, sourcePaths.from);
  }

  return source.toSource();
}
