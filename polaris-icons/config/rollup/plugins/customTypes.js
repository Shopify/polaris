import {createFilter} from '@rollup/pluginutils';
import {parse, traverse} from '@babel/core';

function generateTypesFile(iconExports) {
  return iconExports
    .map(
      (exportName) =>
        `export declare const ${exportName}: React.SFC<React.SVGProps<SVGSVGElement>>;`,
    )
    .join('\n');
}

export default function icon(options = {}) {
  const filter = createFilter(options.include, options.exclude, {
    resolve: false,
  });
  const iconExports = [];
  const virtualPrefix = '\u0000virtual:';

  return {
    name: 'shopify-icon',

    transform(source, id) {
      const nonVirtualId = id.startsWith(virtualPrefix)
        ? id.replace(virtualPrefix, '')
        : id;

      if (filter(nonVirtualId)) {
        const ast = parse(source, {filename: nonVirtualId});

        traverse(ast, {
          ExportNamedDeclaration(path) {
            const exportDeclarationName = path.node.specifiers
              .filter((obj) => obj.local.name === 'default')
              .map((obj) => obj.exported.name);
            iconExports.push(...exportDeclarationName);
          },
        });
      }

      return null;
    },
    buildEnd() {
      if (iconExports.length === 0) {
        this.warn('Found no exports when processing types');
      }

      this.emitFile({
        type: 'asset',
        fileName: `index.d.ts`,
        source: generateTypesFile(iconExports),
      });
    },
  };
}
