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
        visit(child);
      });
    }
  }

  const filePath = path.join(__dirname, "../../../data/props.json");
  fs.writeFileSync(filePath, JSON.stringify(tree, undefined, 2));

  function visit(node: ts.Node, level = 0): string | undefined {
    if (level > 10) {
      return undefined;
    }

    if (node.kind === ts.SyntaxKind.InterfaceDeclaration) {
      const interfaceDeclaration = node as ts.InterfaceDeclaration;
      const symbol = checker.getSymbolAtLocation(interfaceDeclaration.name);
      if (symbol) {
        const id = checker.getFullyQualifiedName(symbol);
        if (id) {
          interfaceDeclaration.members.forEach((member) => {
            if (member.kind === ts.SyntaxKind.PropertySignature) {
              const propertySignature = member as ts.PropertySignature;
              if (propertySignature.type) {
                console.log(propertySignature.name.getText());
                console.log(propertySignature.type.getText());
                console.log(ts.SyntaxKind[propertySignature.type.kind]);
                const isLiteral = ts.isLiteralTypeNode(propertySignature.type);
                console.log({ isLiteral });
              }
            }
          });

          const returnedNode: Node = {
            kind: interfaceDeclaration.kind,
            name: interfaceDeclaration.name.escapedText.toString(),
            syntaxKind: ts.SyntaxKind[interfaceDeclaration.kind],
            members: [],
          };
          tree[id] = returnedNode;
          // ts.forEachChild(interfaceNode, (child) => {
          //   visit(child, level + 1);
          // });
        }
      } else {
        console.warn(
          "Expected interfaceDeclaration to have symbol",
          interfaceDeclaration
        );
      }
    }
  }

  // function getInterfaceMembers(
  //   interfaceDeclaration: ts.InterfaceDeclaration
  // ): Member[] {
  //   return interfaceDeclaration.members.map((member) => {
  //     return {
  //       name: member.name ? member.name : "",
  //       type,
  //       description: "bar",
  //     };
  //   });
  // }
}

globby("../polaris-react/src/**/*.tsx", {
  ignore: ["*.test.tsx"],
}).then((files) => {
  getProps(files, {
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.CommonJS,
  });
});
