import * as ts from "typescript";
import * as fs from "fs";
import path from "path";
import globby from "globby";
import { PropsForComponent } from "../types";

function getProps(fileNames: string[], options: ts.CompilerOptions): void {
  let program = ts.createProgram(fileNames, options);
  let checker = program.getTypeChecker();
  let props: PropsForComponent[] = [];

  for (const sourceFile of program.getSourceFiles()) {
    if (!sourceFile.isDeclarationFile) {
      ts.forEachChild(sourceFile, visit);
    }
  }

  const filePath = path.join(__dirname, "../../../data/props.json");
  fs.writeFileSync(filePath, JSON.stringify(props, undefined, 2));

  return;

  function visit(node: ts.Node) {
    if (node.kind === ts.SyntaxKind.InterfaceDeclaration) {
      const interfaceNode = node as ts.InterfaceDeclaration;

      if (interfaceNode.name.escapedText.toString().endsWith("Props")) {
        let propsForComponent: PropsForComponent = {
          interfaceName: interfaceNode.name.escapedText.toString(),
          props: [],
        };

        const type = checker.getTypeAtLocation(interfaceNode.name);
        for (const prop of type.getProperties()) {
          let comment = "";
          const comments = prop.getDocumentationComment(checker);
          if (comments.length === 1) {
            comment = comments[0].text;
          }

          const deprecated = prop
            .getJsDocTags()
            .some((tag) => tag.name.includes("deprecated"));

          if (prop.valueDeclaration) {
            const propType = checker.getTypeOfSymbolAtLocation(
              prop,
              prop.valueDeclaration
            );

            let optional = false;
            const { valueDeclaration } = prop;
            if (valueDeclaration.kind === ts.SyntaxKind.PropertySignature) {
              const propertySignature =
                valueDeclaration as ts.PropertySignature;
              optional = !!propertySignature.questionToken;
            }

            propsForComponent.props.push({
              name: prop.getName(),
              type: checker.typeToString(propType),
              comment,
              optional,
              deprecated,
            });
          }
        }

        props.push(propsForComponent);
      }

      ts.forEachChild(node, visit);
    }
  }
}

globby("../polaris-react/src/components/*/*.tsx", {
  ignore: ["*.test.tsx"],
}).then((files) => {
  getProps(files, {
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.CommonJS,
  });
});
