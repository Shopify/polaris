import type {
  API,
  FileInfo,
  JSXAttribute,
  JSXOpeningElement,
  Options,
} from 'jscodeshift';

import {
  insertJSXAttribute,
  insertJSXComment,
  removeJSXAttributes,
} from '../../utilities/jsx';
import {POLARIS_MIGRATOR_COMMENT} from '../../constants';
import {
  normalizeImportSourcePaths,
  hasImportSpecifier,
  getImportSpecifierName,
  hasImportDeclaration,
} from '../../utilities/imports';

export interface MigrationOptions extends Options {
  relative?: boolean;
}

export default function v11ReactReplaceLinkComponents(
  fileInfo: FileInfo,
  {jscodeshift: j}: API,
  options: MigrationOptions,
) {
  const source = j(fileInfo.source);

  if (
    !options.relative &&
    !hasImportDeclaration(j, source, '@shopify/polaris')
  ) {
    return fileInfo.source;
  }

  const sourcePaths = normalizeImportSourcePaths(j, source, {
    // @Todo remove assertion
    relative: options.relative!,
    from: 'Link',
    to: 'Link',
  });

  if (!sourcePaths) return;
  if (
    !hasImportSpecifier(j, source, 'Link', sourcePaths.from) &&
    !hasImportSpecifier(j, source, 'LinkProps', sourcePaths.from)
  ) {
    return;
  }

  const localElementName =
    getImportSpecifierName(j, source, 'Link', sourcePaths.from) || 'Link';

  source.findJSXElements(localElementName).forEach((element) => {
    const allAttributes =
      (j(element).find(j.JSXOpeningElement).get().value as JSXOpeningElement)
        .attributes ?? [];

    if (allAttributes.some((attribute) => attribute.type !== 'JSXAttribute')) {
      insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
      return;
    }

    const jsxAttributes = allAttributes as JSXAttribute[];

    const externalAttribute = jsxAttributes.find(
      (attribute) => attribute.name.name === 'external',
    );

    if (externalAttribute && externalAttribute.value !== null) {
      insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
      return;
    }

    const isExternal = Boolean(externalAttribute);

    if (isExternal) {
      insertJSXAttribute(j, element, 'target', '_blank');
      removeJSXAttributes(j, element, 'external');
    }
  });

  return source.toSource();
}
