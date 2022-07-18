import core, {
  Collection,
  ImportSpecifier,
  ImportDefaultSpecifier,
} from 'jscodeshift';

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
  importSpecifier: ImportSpecifier | ImportDefaultSpecifier,
  sourcePath: string,
) {
  getImportDeclaration(j, source, sourcePath).replaceWith((declaration) =>
    j.importDeclaration(
      [
        // we are appending to the existing specifiers
        // We are doing a filter hear because sometimes specifiers can be removed
        // but they hang around in the declaration
        ...(declaration.value.specifiers || []).filter(
          (item) => item.type === 'ImportSpecifier' && item.imported != null,
        ),
        importSpecifier,
      ],
      j.literal(sourcePath),
    ),
  );
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
