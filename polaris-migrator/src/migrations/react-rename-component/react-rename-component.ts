import type {API, FileInfo, Options} from 'jscodeshift';

import {
  getImportSpecifierName,
  hasImportDeclaration,
  hasImportSpecifier,
  normalizeImportSourcePaths,
} from '../../utilities/imports';

export interface MigrationOptions extends Options {
  relative: boolean;
  to: string;
  from: string;
}

export default function reactRenameComponent(
  fileInfo: FileInfo,
  {jscodeshift: j}: API,
  options: MigrationOptions,
) {
  if (!options.from || !options.to) {
    throw new Error('Missing required options: from, to');
  }

  const source = j(fileInfo.source);

  if (
    !options.relative &&
    !hasImportDeclaration(j, source, '@shopify/polaris')
  ) {
    return fileInfo.source;
  }

  const sourcePaths = normalizeImportSourcePaths(j, source, {
    relative: options.relative,
    from: options.from,
    to: options.to,
  });

  if (!sourcePaths) return;

  if (
    !hasImportSpecifier(j, source, options.from, sourcePaths.from) &&
    !hasImportSpecifier(j, source, 'DisplayTextProps', sourcePaths.from)
  ) {
    return;
  }

  const localElementName =
    getImportSpecifierName(j, source, options.from, sourcePaths.from) ||
    options.from;

  const localElementTypeName = getImportSpecifierName(
    j,
    source,
    'DisplayTextProps',
    sourcePaths.from,
  );

  source.findJSXElements('div').forEach((element) => {
    element.replace(
      j.jsxElement(element.node.openingElement, element.node.closingElement, [
        j.stringLiteral('world'),
      ]),
    );
  });

  return source.toSource();
}
