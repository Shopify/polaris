import {parse, print} from 'recast';
import type {FileInfo, Options} from 'jscodeshift';
import type {PluginObj} from '@babel/core';
import {transformFromAstSync, types as t} from '@babel/core';

import {POLARIS_MIGRATOR_COMMENT} from '../../utilities/constants';

export interface MigrationOptions extends Options {
  relative: boolean;
  renameFrom: string;
  renameTo: string;
  renamePropsFrom: string;
  renamePropsTo: string;
}

export default function transform(fileInfo: FileInfo) {
  const transformed = transformFromAstSync(
    parse(fileInfo.source, {parser: require('recast/parsers/babel')}),
    fileInfo.source,
    {
      cloneInputAst: false,
      code: false,
      ast: true,
      plugins: [plugin],
    },
  );

  if (!transformed || !transformed.ast) return fileInfo.source;

  return print(transformed.ast).code;
}

function plugin(): PluginObj {
  return {
    visitor: {
      ImportDeclaration(path) {
        if (path.node.source.value !== '@shopify/polaris') return;

        const specifiers = path.get('specifiers');

        for (const specifier of specifiers) {
          if (specifier.isImportDefaultSpecifier()) {
            specifier.addComment('leading', 'Unable to process file');
            return;
          }
          if (specifier.isImportNamespaceSpecifier()) {
            specifier.addComment('leading', 'Unable to process file');
            return;
          }
          if (
            !specifier.isImportSpecifier() ||
            !t.isIdentifier(specifier.node.imported) ||
            specifier.node.imported.name !== 'Card'
          ) {
            continue;
          }

          const localIdentifier = specifier.get('local');
          const cardBinding = path.scope.getBinding(localIdentifier.node.name);

          if (!cardBinding?.referencePaths.length) continue;

          let canRemoveCard = true;
          let canInsertLegacyCard = false;

          cardBinding.referencePaths.forEach((referencePath) => {
            if (
              referencePath.isJSXIdentifier() ||
              referencePath.isIdentifier()
            ) {
              canInsertLegacyCard = true;
              referencePath.node.name = 'LegacyCard';
              return;
            }

            referencePath.addComment('leading', POLARIS_MIGRATOR_COMMENT);
            canRemoveCard = false;
          });

          if (canInsertLegacyCard) {
            path.node.specifiers.push(
              t.importSpecifier(
                t.identifier('LegacyCard'),
                t.identifier('LegacyCard'),
              ),
            );
          }

          if (canRemoveCard) {
            specifier.remove();
          }
        }
      },
    },
  };
}
