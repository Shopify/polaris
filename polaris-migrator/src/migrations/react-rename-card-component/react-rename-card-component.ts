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
    to: 'CardLegacy',
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

  // If local `CardLegacy` is already used in the file, exit
  source.findJSXElements('CardLegacy').forEach((element) => {
    insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
    hasExistingJsx = true;
  });

  if (hasExistingJsx) return source.toSource();

  // If `CardLegacy` is already used as an identifier, exit
  source
    .find(j.Identifier)
    .filter(
      (path) =>
        path.node.name === 'CardLegacy' || path.node.name === 'CardLegacyProps',
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

  // Find all JSX elements that are named `Card` and replace them with `CardLegacy`
  source.findJSXElements(localElementName).forEach((element) => {
    replaceJSXElement(j, element, 'CardLegacy');
  });

  // Find all references to the `Card` component and replace them with `CardLegacy`
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
        path.node.name = 'CardLegacy';
      }

      if (path.node.name === localElementTypeName) {
        path.node.name = 'CardLegacyProps';
      }
    });

  if (!hasImportSpecifier(j, source, 'CardLegacy', sourcePaths.to)) {
    if (options.relative) {
      insertImportDeclaration(
        j,
        source,
        'CardLegacy',
        sourcePaths.to,
        sourcePaths.from,
      );
    } else {
      insertImportSpecifier(j, source, 'CardLegacy', sourcePaths.to);
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
