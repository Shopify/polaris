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
    .filter((path) => path.node.importKind !== 'type')
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
  const isSameModuleSpecifier = sourcePath === afterSourcePath;
  if (isSameModuleSpecifier) {
    insertImportSpecifier(j, source, sourcePath, importSpecifier);
  } else {
    getImportDeclaration(j, source, afterSourcePath).insertAfter(
      j.importDeclaration.from({
        source: j.literal(sourcePath),
        specifiers: [j.importSpecifier(j.identifier(importSpecifier))],
      }),
    );
  }
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

export function getImportAllSpecifiers(
  j: core.JSCodeshift,
  source: Collection<any>,
  sourcePath: string,
) {
  return source
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === sourcePath)
    .find(j.ImportSpecifier);
}

export function getImportSpecifier(
  j: core.JSCodeshift,
  source: Collection<any>,
  specifier: string,
  sourcePath: string,
) {
  return getImportAllSpecifiers(j, source, sourcePath).filter(
    (path) => path.value.imported.name === specifier,
  );
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

export function hasImportSpecifiers(
  j: core.JSCodeshift,
  source: Collection<any>,
  sourcePath: string,
) {
  return Boolean(getImportAllSpecifiers(j, source, sourcePath)?.length);
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

export function normalizeImportSourcePaths(
  j: core.JSCodeshift,
  source: Collection<any>,
  options = {
    relative: false,
    from: '',
    to: '',
  },
) {
  const {relative, from, to} = options;
  const sourcePaths = {
    from: '@shopify/polaris',
    to: '@shopify/polaris',
  };

  if (relative) {
    sourcePaths.from = getRelativeImportDeclarationValue(j, source, from) || '';

    if (!sourcePaths.from) return null;

    sourcePaths.to =
      getRelativeImportDeclarationValue(j, source, to) ||
      sourcePaths.from.replace(from, to);
  }

  return sourcePaths;
}

export function updateImports(
  j: core.JSCodeshift,
  source: Collection<any>,
  options: {
    fromSpecifier: string;
    toSpecifier: string;
    fromSourcePath: string;
    toSourcePath: string;
  },
) {
  const {fromSpecifier, toSpecifier, fromSourcePath, toSourcePath} = options;

  // Insert new import
  if (!hasImportDeclaration(j, source, toSourcePath)) {
    insertImportDeclaration(
      j,
      source,
      toSpecifier,
      toSourcePath,
      fromSourcePath,
    );
  }
  if (!hasImportSpecifier(j, source, toSpecifier, toSourcePath)) {
    insertImportSpecifier(j, source, toSpecifier, toSourcePath);
  }

  // Remove old import
  if (hasImportSpecifier(j, source, fromSpecifier, fromSourcePath)) {
    removeImportSpecifier(j, source, fromSpecifier, fromSourcePath);
  }
  if (!hasImportSpecifiers(j, source, fromSourcePath)) {
    removeImportDeclaration(j, source, fromSourcePath);
  }
}
