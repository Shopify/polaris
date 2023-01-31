import type {API, FileInfo, Options} from 'jscodeshift';

import {POLARIS_MIGRATOR_COMMENT} from '../../constants';
import {
  getImportSpecifierName,
  hasImportDeclaration,
  hasImportSpecifier,
  hasImportSpecifiers,
  insertImportDeclaration,
  insertImportSpecifier,
  normalizeImportSourcePaths,
  removeImportDeclaration,
  removeImportSpecifier,
} from '../../utilities/imports';
import {
  insertCommentBefore,
  insertJSXComment,
  replaceJSXElement,
} from '../../utilities/jsx';

export interface MigrationOptions extends Options {
  relative: boolean;
}

export default function reactRenameComponent(
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
    relative: options.relative,
    from: 'Card',
    to: 'LegacyCard',
  });

  if (!sourcePaths) return;

  // If the Card component is not imported, exit
  if (
    !hasImportSpecifier(j, source, 'Card', sourcePaths.from) &&
    !hasImportSpecifier(j, source, 'CardProps', sourcePaths.from)
  ) {
    return fileInfo.source;
  }

  let hasExistingJsx = false;
  let hasExistingIdentifier = false;

  // If local `LegacyCard` is already used in the file, exit
  source.findJSXElements('LegacyCard').forEach((element) => {
    insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
    hasExistingJsx = true;
  });

  if (hasExistingJsx) return source.toSource();

  // If `LegacyCard` is already used as an identifier, exit
  source
    .find(j.Identifier)
    .filter(
      (path) =>
        path.node.name === 'LegacyCard' || path.node.name === 'LegacyCardProps',
    )
    .forEach((path) => {
      if (path.node.type !== 'Identifier') return;

      insertCommentBefore(j, path, POLARIS_MIGRATOR_COMMENT);
      hasExistingIdentifier = true;
    });

  if (hasExistingIdentifier) return source.toSource();

  const localElementName =
    getImportSpecifierName(j, source, 'Card', sourcePaths.from) || 'Card';

  const localElementTypeName = getImportSpecifierName(
    j,
    source,
    'CardProps',
    sourcePaths.from,
  );

  // Find all JSX elements that are named `Card` and replace them with `LegacyCard`
  source.findJSXElements(localElementName).forEach((element) => {
    replaceJSXElement(j, element, 'LegacyCard');
  });

  // Find all references to the `Card` component and replace them with `LegacyCard`
  source
    .find(j.Identifier)
    .filter(
      (path) =>
        path.node.name === localElementName ||
        path.node.name === localElementTypeName,
    )
    .forEach((path) => {
      if (path.node.type !== 'Identifier') return;

      if (path.node.name === localElementName) {
        path.node.name = 'LegacyCard';
      }

      if (path.node.name === localElementTypeName) {
        path.node.name = 'LegacyCardProps';
      }
    });

  if (!hasImportSpecifier(j, source, 'LegacyCard', sourcePaths.to)) {
    if (options.relative) {
      insertImportDeclaration(
        j,
        source,
        'LegacyCard',
        sourcePaths.to,
        sourcePaths.from,
      );
    } else {
      insertImportSpecifier(j, source, 'LegacyCard', sourcePaths.to);
    }
  }

  // Remove the `Card` import
  if (hasImportSpecifier(j, source, 'Card', sourcePaths.from)) {
    removeImportSpecifier(j, source, 'Card', sourcePaths.from);
  }

  // Remove the `CardProps` import
  if (!hasImportSpecifiers(j, source, sourcePaths.from)) {
    removeImportDeclaration(j, source, sourcePaths.from);
  }

  return source.toSource();
}
