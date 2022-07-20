import * as ts from "typescript";
import * as fs from "fs";
import path from "path";
import globby from "globby";
import { PropsForComponent } from "../types";

export type BaseNode = {
  kind: number;
  syntaxKind: string;
  name: string;
  UNSOLVED?: boolean;
};

type Member = {
  name: string;
  type: string;
  description: string;
  tags: { name: string; text: string }[];
};
export interface TypeOrInterfaceNode extends BaseNode {
  members: Member[];
}

type Node = TypeOrInterfaceNode;

export type Tree = {
  [id: string]: Node;
};

function getProps(fileNames: string[], options: ts.CompilerOptions): void {
  let program = ts.createProgram(fileNames, options);
  let checker = program.getTypeChecker();
  let tree: Tree = {};

  for (const sourceFile of program.getSourceFiles()) {
    if (!sourceFile.isDeclarationFile) {
      ts.forEachChild(sourceFile, (child) => {
        // console.log(sourceFile.fileName);
        visit(child);
      });
    }
  }

  const filePath = path.join(__dirname, "../../../data/props.json");
  fs.writeFileSync(filePath, JSON.stringify(tree, undefined, 2));

  function visit(
    node: ts.Node | ts.Declaration,
    level = 0
  ): string | undefined {
    if (level > 10) {
      return undefined;
    }

    if (node.kind === ts.SyntaxKind.InterfaceDeclaration) {
      const interfaceDeclaration = node as ts.InterfaceDeclaration;
      const type = checker.getTypeAtLocation(interfaceDeclaration.name);
      const symbol = checker.getSymbolAtLocation(interfaceDeclaration.name);

      if (symbol) {
        const members: Member[] = [];
        const fullyQualifiedName = checker.getFullyQualifiedName(symbol);

        for (const prop of type.getProperties()) {
          if (prop.valueDeclaration) {
            const name = prop.getName();
            const propType = checker.getTypeOfSymbolAtLocation(
              prop,
              prop.valueDeclaration
            );
            const type = checker.typeToString(propType);
            const description = prop
              .getDocumentationComment(checker)
              .map((comment) => {
                return comment.kind === "text" ? comment.text : "";
              })
              .join("\n");
            const tags = prop.getJsDocTags().map((tag) => {
              return {
                name: tag.name,
                text: tag.text
                  ? tag.text.map((text) => text.text).join("")
                  : "",
              };
            });

            if (propType.aliasSymbol) {
              console.log("alias symbol");
              const x = propType.aliasSymbol.getName();
              const y = propType.aliasSymbol.valueDeclaration;
              const sis = checker.getSymbolsInScope(node, ts.SymbolFlags.Type);
              console.log({
                x,
                y,
                sis: sis.find((symbol) => symbol.name === name),
              });
            }

            members.push({ name, type, description, tags });
          }

          // We only end up in this else branch for the Button component
          // which extends another type in a really strange way.
          // https://github.com/Shopify/polaris/blob/main/polaris-react/src/components/Button/Button.tsx#L57
          else {
            const declarations = prop.getDeclarations();
            if (declarations) {
              declarations.forEach((declaration) => {
                console.log(">>", declaration.getText());
                console.log(">>", declaration.kind);
                visit(declaration, level + 1);
              });
            } else {
              throw new Error("Expected interface member to have declarations");
            }
            // throw new Error("Expected value declaration");
          }
        }

        tree[fullyQualifiedName] = {
          kind: node.kind,
          syntaxKind: ts.SyntaxKind[node.kind],
          name: interfaceDeclaration.name.escapedText.toString(),
          members,
        };
      } else {
        throw new Error("Expected interface declaration to have symbol");
      }
    } else if (node.kind === ts.SyntaxKind.TypeAliasDeclaration) {
      const typeAliasDeclaration = node as ts.TypeAliasDeclaration;
      const type = checker.getTypeAtLocation(typeAliasDeclaration.name);
      const symbol = checker.getSymbolAtLocation(typeAliasDeclaration.name);

      if (symbol) {
        const fullyQualifiedName = program
          .getTypeChecker()
          .getFullyQualifiedName(symbol);
        const text = typeAliasDeclaration.getFullText();

        if (typeAliasDeclaration.type.kind === ts.SyntaxKind.UnionType) {
          const unionType = typeAliasDeclaration.type as ts.UnionTypeNode;
          const unfurled = unionType.types
            .map((type) => {
              return type.getText();
            })
            .join(" | ");
          if (fullyQualifiedName.includes("Alignment")) {
            console.log({ fullyQualifiedName, text, unfurled });
          }
        } else if (
          typeAliasDeclaration.type.kind === ts.SyntaxKind.IntersectionType
        ) {
          const unionType = typeAliasDeclaration.type as ts.UnionTypeNode;
          const unfurled = unionType.types
            .map((type) => {
              return type.getText();
            })
            .join(" & ");
          if (fullyQualifiedName.includes("Alignment")) {
            console.log({ fullyQualifiedName, text, unfurled });
          }
        }
      }
    }
  }
}

globby(["../polaris-react/src/**/*.tsx"]).then((files) => {
  let filesWithoutTests = files.filter((file) => !file.endsWith("test.tsx"));
  getProps(filesWithoutTests, {
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.CommonJS,
  });
});
