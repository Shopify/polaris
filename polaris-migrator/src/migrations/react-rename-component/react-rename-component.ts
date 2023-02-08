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
  renameFrom: string;
  renameTo: string;
  renamePropsFrom: string;
  renamePropsTo: string;
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

  if (!options.renameFrom || !options.renameTo) {
    throw new Error('Missing required options: renameFrom and renameTo');
  }

  const sourcePaths = normalizeImportSourcePaths(j, source, {
    relative: options.relative,
    from: options.renameFrom,
    to: options.renameTo,
  });

  if (!sourcePaths) return;

  // If the Card component is not imported, exit

  if (
    !hasImportSpecifier(j, source, options.renameFrom, sourcePaths.from) &&
    !hasImportSpecifier(j, source, options.renamePropsFrom, sourcePaths.from)
  ) {
    return fileInfo.source;
  }

  let hasExistingJsx = false;
  let hasExistingIdentifier = false;

  // If local `LegacyCard` is already used in the file, exit
  source.findJSXElements(options.renameTo).forEach((element) => {
    insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
    hasExistingJsx = true;
  });

  if (hasExistingJsx) return source.toSource();

  // If `LegacyCard` is already used as an identifier, exit
  source
    .find(j.Identifier)
    .filter(
      (path) =>
        path.node.name === options.renameTo ||
        path.node.name === options.renamePropsTo,
    )
    .forEach((path) => {
      if (path.node.type !== 'Identifier') return;

      insertCommentBefore(j, path, POLARIS_MIGRATOR_COMMENT);
      hasExistingIdentifier = true;
    });

  if (hasExistingIdentifier) return source.toSource();

  const localElementName =
    getImportSpecifierName(j, source, options.renameFrom, sourcePaths.from) ||
    options.renameFrom;

  const localElementTypeName = getImportSpecifierName(
    j,
    source,
    options.renamePropsFrom,
    sourcePaths.from,
  );

  // Find all JSX elements and compound elements that are named `Card` and
  // replace them with `LegacyCard`
  source.find(j.JSXElement).forEach((element) => {
    if (
      element.node.openingElement.name.type === 'JSXIdentifier' &&
      element.node.openingElement.name.name === localElementName
    ) {
      replaceJSXElement(j, element, options.renameTo);
      return;
    }

    if (
      element.node.openingElement.name.type === 'JSXMemberExpression' &&
      element.node.openingElement.name.object.type === 'JSXIdentifier' &&
      element.node.openingElement.name.object.name === localElementName &&
      element.node.closingElement?.name.type === 'JSXMemberExpression' &&
      element.node.closingElement?.name.object.type === 'JSXIdentifier' &&
      element.node.closingElement?.name.object.name === localElementName
    ) {
      element.node.openingElement.name.object.name = options.renameTo;
      element.node.closingElement.name.object.name = options.renameTo;
    }
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

      if (
        path.node.name === localElementName &&
        path.parent.value.type !== 'MemberExpression'
      ) {
        path.node.name = options.renameTo;
      }

      if (path.node.name === localElementTypeName) {
        path.node.name = options.renamePropsTo;
      }
    });

  if (!hasImportSpecifier(j, source, options.renameTo, sourcePaths.to)) {
    if (options.relative) {
      insertImportDeclaration(
        j,
        source,
        options.renameTo,
        sourcePaths.to,
        sourcePaths.from,
      );
    } else {
      insertImportSpecifier(j, source, options.renameTo, sourcePaths.to);
    }
  }

  // Remove the `Card` import
  if (hasImportSpecifier(j, source, options.renameFrom, sourcePaths.from)) {
    removeImportSpecifier(j, source, options.renameFrom, sourcePaths.from);
  }

  // Remove the `CardProps` import
  if (!hasImportSpecifiers(j, source, sourcePaths.from)) {
    removeImportDeclaration(j, source, sourcePaths.from);
  }

  return source.toSource();
}
