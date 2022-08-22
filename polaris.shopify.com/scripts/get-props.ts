import * as ts from 'typescript';
import * as fs from 'fs';
import path from 'path';
import globby from 'globby';
import {NodeWithType, TypeList} from '../src/types';

function getProps(fileNames: string[], options: ts.CompilerOptions): void {
  let program = ts.createProgram(fileNames, options);
  let checker = program.getTypeChecker();
  let typeList: TypeList = [];

  let currentFile = '';

  for (const sourceFile of program.getSourceFiles()) {
    if (!sourceFile.isDeclarationFile) {
      ts.forEachChild(sourceFile, (child) => {
        currentFile = sourceFile.fileName;
        visit(child);
      });
    }
  }

  function naivelyGetQualifiedName(symbol: ts.Symbol): string {
    const fullyQualifiedName = program
      .getTypeChecker()
      .getFullyQualifiedName(symbol);
    return `${currentFile}#${fullyQualifiedName}`;
  }

  const filePath = path.join(__dirname, '../../../src/data/props.json');
  fs.writeFileSync(filePath, JSON.stringify(typeList, undefined, 2));

  function visit(
    node: ts.Node | ts.Declaration,
    level = 0,
  ): string | undefined {
    if (level > 10) {
      return undefined;
    }

    if (node.kind === ts.SyntaxKind.InterfaceDeclaration) {
      const interfaceDeclaration = node as ts.InterfaceDeclaration;
      const type = checker.getTypeAtLocation(interfaceDeclaration.name);
      const symbol = checker.getSymbolAtLocation(interfaceDeclaration.name);

      if (symbol) {
        const members: NodeWithType[] = [];
        const fullyQualifiedName = naivelyGetQualifiedName(symbol);

        for (const prop of type.getProperties()) {
          if (prop.valueDeclaration) {
            const name = prop.getName();
            const propType = checker.getTypeOfSymbolAtLocation(
              prop,
              prop.valueDeclaration,
            );
            const type = checker.typeToString(propType);
            const description = prop
              .getDocumentationComment(checker)
              .map((comment) => {
                return comment.kind === 'text' ? comment.text : '';
              })
              .join('\n');
            const tags = prop.getJsDocTags().map((tag) => {
              return {
                name: tag.name,
                text: tag.text
                  ? tag.text.map((text) => text.text).join('')
                  : '',
              };
            });

            let isOptional = false;
            if (
              prop.valueDeclaration.kind === ts.SyntaxKind.PropertySignature
            ) {
              const propertySignature =
                prop.valueDeclaration as ts.PropertyDeclaration;
              isOptional = propertySignature.questionToken !== undefined;
            }
            if (prop.valueDeclaration.kind === ts.SyntaxKind.MethodSignature) {
              const methodSignature =
                prop.valueDeclaration as ts.MethodSignature;
              isOptional = methodSignature.questionToken !== undefined;
            }

            members.push({
              id: fullyQualifiedName,
              kind: prop.valueDeclaration.kind,
              syntaxKind: ts.SyntaxKind[prop.valueDeclaration.kind],
              name,
              type,
              isOptional,
              description,
              tags,
            });
          }

          // We only end up in this else branch for the Button component
          // which extends another type in a really strange way.
          // https://github.com/Shopify/polaris/blob/main/polaris-react/src/components/Button/Button.tsx#L57
          else {
            const declarations = prop.getDeclarations();
            if (declarations) {
              declarations.forEach((declaration) => {
                visit(declaration, level + 1);
              });
            } else {
              throw new Error('Expected interface member to have declarations');
            }
            // throw new Error("Expected value declaration");
          }
        }

        typeList.push({
          id: fullyQualifiedName,
          kind: node.kind,
          syntaxKind: ts.SyntaxKind[node.kind],
          name: interfaceDeclaration.name.escapedText.toString(),
          description: '',
          tags: [],
          members,
        });
      } else {
        throw new Error('Expected interface declaration to have symbol');
      }
    } else if (node.kind === ts.SyntaxKind.TypeAliasDeclaration) {
      const typeAliasDeclaration = node as ts.TypeAliasDeclaration;
      const type = checker.getTypeAtLocation(typeAliasDeclaration.name);
      const symbol = checker.getSymbolAtLocation(typeAliasDeclaration.name);
      const typeName = checker.typeToString(type);

      // if (typeName === "LinkLikeComponent") {
      //   console.log(node);
      // }

      if (symbol) {
        const fullyQualifiedName = naivelyGetQualifiedName(symbol);

        if (typeAliasDeclaration.type.kind === ts.SyntaxKind.UnionType) {
          const unionType = typeAliasDeclaration.type as ts.UnionTypeNode;
          const unfurled = unionType.types
            .map((type) => {
              return type.getText();
            })
            .join(' | ');

          typeList.push({
            id: fullyQualifiedName,
            kind: node.kind,
            syntaxKind: ts.SyntaxKind[node.kind],
            name: typeName,
            type: unfurled,
            description: '',
            tags: [],
          });
        } else if (
          typeAliasDeclaration.type.kind === ts.SyntaxKind.IntersectionType
        ) {
          const unionType = typeAliasDeclaration.type as ts.UnionTypeNode;
          const unfurled = unionType.types
            .map((type) => {
              return type.getText();
            })
            .join(' & ');

          typeList.push({
            id: fullyQualifiedName,
            kind: node.kind,
            syntaxKind: ts.SyntaxKind[node.kind],
            name: typeName,
            type: unfurled,
            description: '',
            tags: [],
          });
        } else {
          // TBD: Resolve more types
          typeList.push({
            id: fullyQualifiedName,
            kind: node.kind,
            syntaxKind: ts.SyntaxKind[node.kind],
            name: typeName,
            type: typeAliasDeclaration?.getFullText() || '',
            description: '',
            tags: [],
          });
        }
      }
    }
  }
}

globby(['../polaris-react/src/**/*.ts', '../polaris-react/src/**/*.tsx']).then(
  (files) => {
    let filesWithoutTests = files.filter((file) => !file.endsWith('test.tsx'));
    // filesWithoutTests.forEach((file) => {
    //   if (file.includes("utilities/link")) {
    //     console.log(file);
    //   }
    // });
    getProps(filesWithoutTests, {
      target: ts.ScriptTarget.ES5,
      module: ts.ModuleKind.CommonJS,
    });
  },
);
