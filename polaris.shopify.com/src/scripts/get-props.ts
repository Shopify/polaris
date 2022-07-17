import * as ts from "typescript";
import * as fs from "fs";
import path from "path";
import globby from "globby";
import { PropsForComponent } from "../types";

export type Node = {
  id: string;
  kind: number;
  syntaxKind: string;
  name?: string;
  resolvedValue?: string;
  isOptional?: boolean;
  children: string[];
  UNSOLVED?: boolean;
};

function getProps(fileNames: string[], options: ts.CompilerOptions): void {
  let program = ts.createProgram(fileNames, options);
  let checker = program.getTypeChecker();
  let types: { [id: string]: Node } = {};

  for (const sourceFile of program.getSourceFiles()) {
    if (!sourceFile.isDeclarationFile) {
      ts.forEachChild(sourceFile, (child) => {
        visit(child);
      });
    }
  }

  function visit(node: ts.Node, level = 0): string | undefined {
    if (level > 10) {
      return undefined;
    }

    if (node.kind === ts.SyntaxKind.InterfaceDeclaration) {
      const interfaceNode = node as ts.InterfaceDeclaration;
      const type = checker.getTypeAtLocation(interfaceNode);

      const children: string[] = [];
      // interfaceNode.members.forEach((member) => {
      //   if (member.name) {
      //     const symbol = checker.getSymbolAtLocation(member.name);
      //     if (symbol) {
      //       visit(member, level + 1);
      //       children.push(checker.getFullyQualifiedName(symbol));
      //     }
      //   }
      // });

      for (const prop of type.getProperties()) {
        if (prop.valueDeclaration) {
          visit(prop.valueDeclaration, level + 1);
          children.push(checker.getFullyQualifiedName(prop));
        }
      }

      const symbol = checker.getSymbolAtLocation(interfaceNode.name);
      if (symbol) {
        const id = checker.getFullyQualifiedName(symbol);

        types[id] = {
          id,
          kind: node.kind,
          syntaxKind: ts.SyntaxKind[node.kind],
          name: interfaceNode.name.getText(),
          children,
        };
      }
    }

    if (node.kind === ts.SyntaxKind.PropertySignature) {
      const propertySignature = node as ts.PropertySignature;
      const name = propertySignature.name.getText();
      const typeNode = checker.getTypeAtLocation(propertySignature.name);
      const resolvedValue = checker.typeToString(typeNode);

      const children: string[] = [];
      if (
        resolvedValue !== "string" &&
        resolvedValue !== "number" &&
        resolvedValue !== "boolean" &&
        resolvedValue !== "React.ReactNode"
      ) {
        if (propertySignature.type) {
          if (typeNode.aliasSymbol) {
            visit(propertySignature.type, level + 1);
            children.push(checker.getFullyQualifiedName(typeNode.aliasSymbol));
          }
        }
      }

      const symbol = checker.getSymbolAtLocation(propertySignature.name);
      if (symbol) {
        const id = checker.getFullyQualifiedName(symbol);

        types[id] = {
          id,
          kind: node.kind,
          syntaxKind: ts.SyntaxKind[node.kind],
          name,
          resolvedValue,
          isOptional: !!propertySignature.questionToken,
          children,
        };
      }
    }

    // if (node.kind === ts.SyntaxKind.FunctionDeclaration) {
    //   const functionDeclaration = node as ts.FunctionDeclaration;
    //   const typeNode = checker.getTypeAtLocation(functionDeclaration);
    //   const resolvedValue = checker.typeToString(typeNode);

    //   ts.forEachChild(functionDeclaration, (child) => {
    //     visit(child, level + 1);
    //   });

    //   console.log(checker.getFullyQualifiedName(typeNode.symbol));

    //   types[node.pos] = {
    //     pos: node.pos,
    //     kind: node.kind,
    //     syntaxKind: ts.SyntaxKind[node.kind],
    //     resolvedValue,
    //     children: node.getChildren().map((child) => child.pos),
    //   };
    // }

    if (node.kind === ts.SyntaxKind.TypeReference) {
      const typeReference = node as ts.TypeReferenceNode;
      const type = checker.getTypeAtLocation(typeReference);

      const children: string[] = [];
      const referencedNodes = type.aliasSymbol?.getDeclarations();
      referencedNodes?.forEach((node) => {
        const symbol = checker.getSymbolAtLocation(node);
        if (symbol) {
          visit(node, level + 1);
          const id = checker.getFullyQualifiedName(symbol);
          children.push(id);
        }
      });
      const resolvedValue = checker.typeToString(type);

      if (!referencedNodes) {
        // console.log(node);
        typeReference.forEachChild((node) => {
          const symbol = checker.getSymbolAtLocation(node);
          if (symbol) {
            visit(node, level + 1);
            const id = checker.getFullyQualifiedName(symbol);
            children.push(id);
          }
        });
      }

      // ts.forEachChild(typeReference, (child) => {
      //   const returnedChild = visit(child, level + 1);
      //   if (returnedChild) {
      //     children.push(returnedChild);
      //   }
      // });

      const symbol = checker.getSymbolAtLocation(typeReference);
      if (symbol) {
        const id = checker.getFullyQualifiedName(symbol);

        types[id] = {
          id,
          kind: node.kind,
          syntaxKind: ts.SyntaxKind[node.kind],
          resolvedValue,
          children,
        };
      }
    }

    if (node.kind === ts.SyntaxKind.TypeAliasDeclaration) {
      const typeAliasDeclaration = node as ts.TypeAliasDeclaration;
      const typeNode = checker.getTypeAtLocation(typeAliasDeclaration.name);
      const symbol = checker.getSymbolAtLocation(typeAliasDeclaration.name);

      const children: string[] = [];

      if (typeAliasDeclaration.type) {
        const symbol = typeNode.aliasSymbol;
        if (checker.typeToString(typeNode) === "RowStatus") {
          let id = "NO ID";
          if (symbol) {
            const s = checker.getSymbolAtLocation(typeAliasDeclaration.type);
            if (s) {
              id = checker.getFullyQualifiedName(s);
            }
          }
          console.log("fo", id, typeAliasDeclaration.type);
        }
      }
      // declarations?.forEach((declaration) => {
      //   declaration.forEachChild((child) => {
      //     // console.log(child.kind);
      //     const symbol = checker.getSymbolAtLocation(child);
      //     if (symbol) {
      //       visit(child, level + 1);
      //       const id = checker.getFullyQualifiedName(symbol);
      //       children.push(id);
      //     }

      //   });
      // });
      // console.log(declarations);
      // if (symbol) {
      //   const aliased = checker.getAliasedSymbol(symbol);
      //   console.log({ aliased });
      // }

      // if (typeNode.aliasSymbol) {
      //   typeNode.aliasSymbol.declarations?.forEach((declaration) => {
      //     console.log(declaration);
      //   });
      // }
      // ts.forEachChild(typeAliasDeclaration, (child) => {
      //   const returnedChild = visit(child, level + 1);
      //   if (returnedChild) {
      //     children.push(returnedChild);
      //   }
      // });

      if (symbol) {
        const id = checker.getFullyQualifiedName(symbol);

        types[id] = {
          id,
          kind: node.kind,
          resolvedValue: typeAliasDeclaration.getFullText(),
          syntaxKind: ts.SyntaxKind[node.kind],
          children,
        };
      }
    }

    // if (node.kind === ts.SyntaxKind.Parameter) {
    //   const parameter = node as ts.ParameterDeclaration;
    //   const type = checker.getTypeAtLocation(parameter);

    //   ts.forEachChild(parameter, (child) => {
    //     visit(child, level + 1);
    //   });

    //   const resolvedValue = checker.typeToString(type);
    //   types[node.pos] = {
    //     pos: node.pos,
    //     kind: node.kind,
    //     name: type.getSymbol()?.name || undefined,
    //     syntaxKind: ts.SyntaxKind[node.kind],
    //     resolvedValue,
    //     children: node.getChildren().map((child) => child.pos),
    //   };
    // }

    // if (node.kind === ts.SyntaxKind.UnionType) {
    //   const union = node as ts.UnionTypeNode;
    //   const type = checker.getTypeAtLocation(union);

    //   ts.forEachChild(union, (child) => {
    //     visit(child, level + 1);
    //   });

    //   const resolvedValue = checker.typeToString(type);

    //   types[node.pos] = {
    //     pos: node.pos,
    //     kind: node.kind,
    //     syntaxKind: ts.SyntaxKind[node.kind],
    //     resolvedValue,
    //     children: node.getChildren().map((child) => child.pos),
    //   };
    // }

    // if (node.kind === ts.SyntaxKind.ArrayType) {
    //   const array = node as ts.ArrayTypeNode;
    //   const type = checker.getTypeAtLocation(array);

    //   ts.forEachChild(array, (child) => {
    //     visit(child, level + 1);
    //   });

    //   const resolvedValue = checker.typeToString(type);

    //   types[node.pos] = {
    //     pos: node.pos,
    //     kind: node.kind,
    //     syntaxKind: ts.SyntaxKind[node.kind],
    //     resolvedValue,
    //     children: node.getChildren().map((child) => child.pos),
    //   };
    // }

    // if (node.kind === ts.SyntaxKind.TypeOperator) {
    //   let children: Node[] = [];
    //   const typeOperator = node as ts.TypeOperatorNode;
    //   const type = checker.getTypeAtLocation(typeOperator);

    //   ts.forEachChild(typeOperator, (child) => {
    //     visit(child, level + 1);
    //   });

    //   const resolvedValue = checker.typeToString(type);

    //   types[node.pos] = {
    //     pos: node.pos,
    //     kind: node.kind,
    //     syntaxKind: ts.SyntaxKind[node.kind],
    //     resolvedValue,
    //     children: node.getChildren().map((child) => child.pos),
    //   };
    // }

    if (node.kind === ts.SyntaxKind.Identifier) {
      const identifier = node as ts.Identifier;
      const type = checker.getTypeAtLocation(identifier);

      const resolvedValue = checker.typeToString(type);

      const children: string[] = [];
      type.symbol?.members?.forEach((member) => {
        member.declarations?.forEach((declaration) => {
          const symbol = checker.getSymbolAtLocation(declaration);
          if (symbol) {
            visit(declaration, level + 1);
            const id = checker.getFullyQualifiedName(symbol);
            children.push(id);
          }
        });
      });

      if (type.symbol) {
        const id = checker.getFullyQualifiedName(type.symbol);

        types[id] = {
          id,
          kind: node.kind,
          syntaxKind: ts.SyntaxKind[node.kind],
          name: identifier.escapedText.toString(),
          resolvedValue,
          children,
        };
      }
    }

    if (
      node.kind === ts.SyntaxKind.ImportDeclaration ||
      node.kind === ts.SyntaxKind.ExportDeclaration ||
      node.kind === ts.SyntaxKind.ExportKeyword ||
      node.kind === ts.SyntaxKind.EndOfFileToken ||
      node.kind === ts.SyntaxKind.TypeParameter ||
      node.kind === ts.SyntaxKind.MethodSignature ||
      node.kind === ts.SyntaxKind.QuestionToken
    ) {
      return;
    }

    const symbol = checker.getSymbolAtLocation(node);
    if (symbol) {
      const id = checker.getFullyQualifiedName(symbol);

      types[id] = {
        id: id,
        kind: node.kind,
        syntaxKind: ts.SyntaxKind[node.kind],
        name: node.getText(),
        resolvedValue: checker.typeToString(checker.getTypeAtLocation(node)),
        children: [],
        UNSOLVED: true,
      };
    }
  }

  const filePath = path.join(__dirname, "../../../data/props.json");
  fs.writeFileSync(filePath, JSON.stringify(types, undefined, 2));

  return;
}

//   function visit(node: ts.Node) {
//     if (node.kind === ts.SyntaxKind.UnionType) {
//       const union = node as ts.UnionTypeNode;
//       const type = checker.getTypeAtLocation(union);
//       const types = union.types.map((type) => type.getText()).join(" | ");
//       console.log(union.getText());
//     }

//     if (node.kind === ts.SyntaxKind.TypeAliasDeclaration) {
//       const typeAlias = node as ts.TypeAliasDeclaration;
//       const type = checker.getTypeAtLocation(typeAlias.name);

//       let propsForComponent: PropsForComponent = {
//         interfaceName: typeAlias.name.escapedText.toString(),
//         props: [],
//       };

//       // console.log(typeAlias.name.escapedText, "->", type.aliasSymbol?.name);
//       // const typeNode = typeAlias.type;
//       // console.log(typeNode.kind);
//       // if (typeNode.kind === ts.SyntaxKind.TypeLiteral) {
//       //   const typeLiteral = typeNode as ts.TypeLiteralNode;
//       //   typeLiteral.members.forEach((member) => {
//       //     console.log(member);
//       //   });
//       // }

//       for (const prop of type.getProperties()) {
//         let comment = "";
//         const comments = prop.getDocumentationComment(checker);
//         if (comments.length === 1) {
//           comment = comments[0].text;
//         }

//         const deprecated = prop
//           .getJsDocTags()
//           .some((tag) => tag.name.includes("deprecated"));

//         if (prop.valueDeclaration) {
//           const propType = checker.getTypeOfSymbolAtLocation(
//             prop,
//             prop.valueDeclaration
//           );

//           let optional = false;
//           const { valueDeclaration } = prop;
//           if (valueDeclaration.kind === ts.SyntaxKind.PropertySignature) {
//             const propertySignature = valueDeclaration as ts.PropertySignature;
//             optional = !!propertySignature.questionToken;
//           }

//           propsForComponent.props.push({
//             name: prop.getName(),
//             type: checker.typeToString(propType),
//             comment,
//             optional,
//             deprecated,
//           });
//         }
//       }
//       props.push(propsForComponent);
//     }

//     // if (node.kind === ts.SyntaxKind.InterfaceDeclaration) {
//     //   const interfaceNode = node as ts.InterfaceDeclaration;

//     //   if (false) {
//     //     let propsForComponent: PropsForComponent = {
//     //       interfaceName: interfaceNode.name.escapedText.toString(),
//     //       props: [],
//     //     };

//     //     const type = checker.getTypeAtLocation(interfaceNode.name);
//     //     for (const prop of type.getProperties()) {
//     //       let comment = "";
//     //       const comments = prop.getDocumentationComment(checker);
//     //       if (comments.length === 1) {
//     //         comment = comments[0].text;
//     //       }

//     //       const deprecated = prop
//     //         .getJsDocTags()
//     //         .some((tag) => tag.name.includes("deprecated"));

//     //       if (prop.valueDeclaration) {
//     //         const propType = checker.getTypeOfSymbolAtLocation(
//     //           prop,
//     //           prop.valueDeclaration
//     //         );

//     //         let optional = false;
//     //         const { valueDeclaration } = prop;
//     //         if (valueDeclaration.kind === ts.SyntaxKind.PropertySignature) {
//     //           const propertySignature =
//     //             valueDeclaration as ts.PropertySignature;
//     //           optional = !!propertySignature.questionToken;
//     //         }

//     //         propsForComponent.props.push({
//     //           name: prop.getName(),
//     //           type: checker.typeToString(propType),
//     //           comment,
//     //           optional,
//     //           deprecated,
//     //         });
//     //       }
//     //     }

//     //     props.push(propsForComponent);
//     //   }

//     ts.forEachChild(node, visit);
//     // }
//   }
// }

globby("../polaris-react/src/**/*.tsx", {
  ignore: ["*.test.tsx"],
}).then((files) => {
  getProps(files, {
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.CommonJS,
  });
});
