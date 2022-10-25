import core, {Collection} from 'jscodeshift';

export function hasImportDeclaration(
  j: core.JSCodeshift,
  source: Collection<any>,
  sourcePath: string,
) {
  return Boolean(
    source
      .find(j.ImportDeclaration)
      .filter((path) => path.node.source.value === sourcePath).length,
  );
}

export function getImportDeclaration(
  j: core.JSCodeshift,
  source: Collection<any>,
  sourcePath: string,
) {
  return source
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === sourcePath);
}

export function getRelativeImportDeclaration(
  j: core.JSCodeshift,
  source: Collection<any>,
  fileName = '',
) {
  const relativeRegex = new RegExp(String.raw`^[\.\/]*${fileName}$`);
  return source
    .find(j.ImportDeclaration)
    .filter(
      (path) =>
        typeof path.node.source.value === 'string' &&
        relativeRegex.test(path.node.source.value),
    );
}

export function getRelativeImportDeclarationValue(
  j: core.JSCodeshift,
  source: Collection<any>,
  fileName = '',
) {
  const declarations = getRelativeImportDeclaration(j, source, fileName);

  if (!declarations.length) return null;

  return (declarations.nodes()[0]!.source!.value as string) || null;
}

export function removeImportDeclaration(
  j: core.JSCodeshift,
  source: Collection<any>,
  sourcePath: string,
) {
  getImportDeclaration(j, source, sourcePath).remove();
}

export function renameImportDeclaration(
  j: core.JSCodeshift,
  source: Collection<any>,
  sourcePath: string,
  newSourcePath: string,
) {
  getImportDeclaration(j, source, sourcePath).forEach(
    (importDeclaration) =>
      (importDeclaration.node.source = j.stringLiteral(newSourcePath)),
  );
}

export function insertImportDeclaration(
  j: core.JSCodeshift,
  source: Collection<any>,
  importSpecifier: string,
  sourcePath: string,
  afterSourcePath: string,
) {
  getImportDeclaration(j, source, afterSourcePath).insertAfter(
    j.importDeclaration.from({
      source: j.literal(sourcePath),
      specifiers: [j.importSpecifier(j.identifier(importSpecifier))],
    }),
  );
}

export function getImportSourcePaths(
  j: core.JSCodeshift,
  source: Collection<any>,
  options = {
    relative: false,
    currentFileName: '',
    nextFileName: '',
  },
) {
  const {relative, currentFileName, nextFileName} = options;
  const sourcePaths = {
    current: '@shopify/polaris',
    next: '@shopify/polaris',
  };

  if (relative) {
    sourcePaths.current =
      getRelativeImportDeclarationValue(j, source, currentFileName) || '';

    if (!sourcePaths.current) return null;

    sourcePaths.next =
      getRelativeImportDeclarationValue(j, source, nextFileName) ||
      sourcePaths.current.replace(currentFileName, nextFileName);
  }

  return sourcePaths;
}

export function getDefaultImportSpecifier(
  j: core.JSCodeshift,
  source: Collection<any>,
  sourcePath: string,
) {
  return source
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === sourcePath)
    .find(j.ImportDefaultSpecifier);
}

export function removeDefaultImportSpecifier(
  j: core.JSCodeshift,
  source: Collection<any>,
  sourcePath: string,
) {
  return getDefaultImportSpecifier(j, source, sourcePath).remove();
}

export function getDefaultImportSpecifierName(
  j: core.JSCodeshift,
  source: Collection<any>,
  sourcePath: string,
) {
  const specifiers = getDefaultImportSpecifier(j, source, sourcePath);

  if (!specifiers.length) return null;

  return specifiers.nodes()[0]!.local!.name;
}

export function hasDefaultImportSpecifier(
  j: core.JSCodeshift,
  source: Collection<any>,
  sourcePath: string,
) {
  return Boolean(getDefaultImportSpecifier(j, source, sourcePath).length);
}

export function getImportSpecifier(
  j: core.JSCodeshift,
  source: Collection<any>,
  specifier: string,
  sourcePath: string,
) {
  return source
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === sourcePath)
    .find(j.ImportSpecifier)
    .filter((path) => path.value.imported.name === specifier);
}

export function getImportSpecifierName(
  j: core.JSCodeshift,
  source: Collection<any>,
  specifier: string,
  sourcePath: string,
) {
  const specifiers = getImportSpecifier(j, source, specifier, sourcePath);

  return specifiers.length > 0 ? specifiers.nodes()[0]!.local!.name : null;
}

export function hasImportSpecifier(
  j: core.JSCodeshift,
  source: Collection<any>,
  specifier: string,
  sourcePath: string,
) {
  return Boolean(getImportSpecifier(j, source, specifier, sourcePath)?.length);
}

export function insertImportSpecifier(
  j: core.JSCodeshift,
  source: Collection<any>,
  importSpecifier: string,
  sourcePath: string,
) {
  getImportDeclaration(j, source, sourcePath).replaceWith((declaration) => {
    return j.importDeclaration.from({
      source: j.literal(sourcePath),
      specifiers: [
        ...(declaration.value.specifiers || []).filter(
          (item) => item.type === 'ImportSpecifier' && item.imported != null,
        ),
        j.importSpecifier(j.identifier(importSpecifier)),
      ],
      comments: declaration.value.comments || null,
    });
  });
}

export function renameImportSpecifier(
  j: core.JSCodeshift,
  source: Collection<any>,
  specifier: string,
  newSpecifier: string,
  sourcePath: string,
) {
  getImportSpecifier(j, source, specifier, sourcePath).replaceWith(
    j.importSpecifier(j.identifier(newSpecifier)),
  );
}

export function removeImportSpecifier(
  j: core.JSCodeshift,
  source: Collection<any>,
  specifier: string,
  sourcePath: string,
) {
  getImportSpecifier(j, source, specifier, sourcePath).remove();
}
