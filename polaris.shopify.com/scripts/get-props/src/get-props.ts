import * as ts from 'typescript';
import * as fs from 'fs';
import path from 'path';
import globby from 'globby';
import {TypeMeta} from '../../../src/types';

type NodeParser = (
  ast: TypeMeta[],
  node: ts.Node,
  checker: ts.TypeChecker,
  program: ts.Program,
  filePath: string,
) => void;

const compilerOptions = {
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS,
};

export function normalizePath(path: string): string {
  let normalizedPath = path;
  if (normalizedPath.startsWith('.')) {
    normalizedPath = normalizedPath.replace(/^\.{1,2}\//, '');
  } else if (normalizedPath.includes('/polaris/')) {
    normalizedPath = normalizedPath.split('/polaris/')[1];
  } else if (normalizedPath.startsWith('/')) {
    normalizedPath = normalizedPath.replace('/', '');
  }
  return normalizedPath;
}

export function getProps(filePaths: string[]): TypeMeta[] {
  let ast: TypeMeta[] = [];
  let program = ts.createProgram(filePaths, compilerOptions);
  let checker = program.getTypeChecker();

  let filePath = '';

  for (const sourceFile of program.getSourceFiles()) {
    if (!sourceFile.isDeclarationFile) {
      ts.forEachChild(sourceFile, (child) => {
        filePath = normalizePath(sourceFile.fileName);
        visit(child);
      });
    }
  }

  return ast;

  function visit(
    node: ts.Node | ts.Declaration,
    level = 0,
  ): string | undefined {
    // Escape hatch
    if (level > 10) {
      return undefined;
    }

    const parserArgs = [ast, node, checker, program, filePath] as const;

    switch (node.kind) {
      case ts.SyntaxKind.EnumDeclaration:
        parseEnumDeclaration(...parserArgs);
        break;

      case ts.SyntaxKind.InterfaceDeclaration:
        parseInterfaceDeclaration(...parserArgs);
        break;

      case ts.SyntaxKind.TypeAliasDeclaration:
        parseTypeAliasDeclaration(...parserArgs);
        break;
    }
  }
}

const parseInterfaceDeclaration: NodeParser = (
  ast,
  node,
  checker,
  program,
  filePath,
) => {
  const interfaceDeclaration = node as ts.InterfaceDeclaration;
  const type = checker.getTypeAtLocation(interfaceDeclaration.name);
  const symbol = checker.getSymbolAtLocation(interfaceDeclaration.name);

  if (!symbol) throw new Error('Expected interface declaration to have symbol');

  const members: TypeMeta[] = [];

  interfaceDeclaration.members.forEach((member) => {
    if (member.kind === ts.SyntaxKind.IndexSignature) {
      const indexSignature = member as ts.IndexSignatureDeclaration;
      const name = `[${indexSignature.parameters
        .map((param) => `${param.name.getText()}: ${param.type?.getText()}`)
        .join(', ')}]`;
      const value = indexSignature.type.getText();
      members.push({name, value});
    }
  });

  for (const prop of type.getProperties()) {
    const valueDeclaration = prop.valueDeclaration;
    if (valueDeclaration) {
      const name = prop.getName();
      const description = getSymbolComment(prop, checker);
      const syntaxKind = ts.SyntaxKind[valueDeclaration.kind];
      const type = checker.getTypeOfSymbolAtLocation(prop, valueDeclaration);
      const value = checker.typeToString(type);
      const {deprecationMessage, defaultValue} = parseJSDocTags(prop);

      let memberNode: TypeMeta = {syntaxKind, name, value, description};

      if (
        valueDeclaration.kind === ts.SyntaxKind.PropertySignature ||
        valueDeclaration.kind === ts.SyntaxKind.MethodSignature
      ) {
        const signature = valueDeclaration as
          | ts.MethodSignature
          | ts.PropertySignature;
        if (signature.questionToken !== undefined) {
          memberNode.isOptional = true;
        }
      }

      if (deprecationMessage) {
        memberNode.deprecationMessage = deprecationMessage;
      }
      if (defaultValue) {
        memberNode.defaultValue = defaultValue;
      }

      members.push(memberNode);
    }

    // We only end up in this else branch for the Button component
    // which extends another type in a really strange way.
    // https://github.com/Shopify/polaris/blob/main/polaris-react/src/components/Button/Button.tsx#L57
    else {
      //   const declarations = prop.getDeclarations();
      //   if (declarations) {
      //     declarations.forEach((declaration) => {
      //       visit(declaration, level + 1);
      //     });
      //   } else {
      //     throw new Error('Expected interface member to have declarations');
      //   }
      //   throw new Error('Expected value declaration');
    }
  }

  const name = interfaceDeclaration.name.escapedText.toString();
  const description = getSymbolComment(symbol, checker);
  const value = interfaceDeclaration.getText();

  ast.push({filePath, name, description, members, value});
};

const parseTypeAliasDeclaration: NodeParser = (
  ast,
  node,
  checker,
  program,
  filePath,
) => {
  const typeAliasDeclaration = node as ts.TypeAliasDeclaration;
  const symbol = checker.getSymbolAtLocation(typeAliasDeclaration.name);

  if (!symbol) {
    throw new Error('Expected type alias declaration to have a symbol');
  }

  const description = getSymbolComment(symbol, checker);
  const name = symbol.escapedName.toString();
  const syntaxKind = ts.SyntaxKind[typeAliasDeclaration.kind];
  let value = typeAliasDeclaration.type.getText();

  if (typeAliasDeclaration.type.kind === ts.SyntaxKind.UnionType) {
    const unionType = typeAliasDeclaration.type as ts.UnionTypeNode;
    value = unionType.types.map((type) => type.getText()).join(' | ');
  } else if (
    typeAliasDeclaration.type.kind === ts.SyntaxKind.IntersectionType
  ) {
    const unionType = typeAliasDeclaration.type as ts.UnionTypeNode;
    value = unionType.types.map((type) => type.getText()).join(' & ');
  }

  ast.push({filePath, syntaxKind, name, value, description});
};

const parseEnumDeclaration: NodeParser = (
  ast,
  node,
  checker,
  program,
  filePath,
) => {
  const enumDeclation = node as ts.EnumDeclaration;
  const symbol = checker.getSymbolAtLocation(enumDeclation.name);

  if (!symbol) throw new Error('Expected enum to have a matching symbol');

  const syntaxKind = ts.SyntaxKind[enumDeclation.kind];
  const name = enumDeclation.name.getText();
  const value = enumDeclation.getText();
  const members: TypeMeta[] = enumDeclation.members.map((member) => {
    const type = checker.getTypeAtLocation(member.name);
    return {
      name: member.name.getText(),
      value: type.isLiteral() ? type.value.valueOf() : '',
    };
  });
  ast.push({filePath, syntaxKind, name, value, members});
};

function parseJSDocTags(symbol: ts.Symbol): {
  deprecationMessage?: string;
  defaultValue?: string;
} {
  const tags = symbol.getJsDocTags();
  let deprecationMessage: string | undefined = undefined;
  let defaultValue: string | undefined = undefined;

  tags.forEach((tag) => {
    if (tag.name.toLowerCase() === 'default' && tag.text) {
      defaultValue = tag.text.map((t) => t.text).join('');
    }
    if (tag.name.toLowerCase() === 'deprecated') {
      deprecationMessage = tag.text
        ? tag.text.map((t) => t.text).join('')
        : 'Deprecated';
    }
  });

  return {deprecationMessage, defaultValue};
}

function getSymbolComment(
  symbol: ts.Symbol,
  checker: ts.TypeChecker,
): string | undefined {
  return symbol
    .getDocumentationComment(checker)
    .map((comment) => (comment.kind === 'text' ? comment.text : ''))
    .join('\n');
}

const isExecutedThroughCommandLine = require.main === module;
if (isExecutedThroughCommandLine) {
  globby([
    '../polaris-react/src/**/*.ts',
    '../polaris-react/src/**/*.tsx',
  ]).then((files) => {
    let filesWithoutTests = files.filter((file) => !file.endsWith('test.tsx'));
    filesWithoutTests.forEach((file) => {
      if (file.includes('utilities/link')) {
        console.log(file);
      }
    });
    const ast = getProps(filesWithoutTests);

    const filePath = path.join(__dirname, '../../../../../src/data/props.json');
    fs.writeFileSync(filePath, JSON.stringify(ast, undefined, 2));
  });
}

export function filterTypeMetas(
  allNodes: TypeMeta[],
  name: string,
  filePath: string,
): TypeMeta[] {
  const matchingNodes = getMatchingNodes(allNodes, name, filePath);
  if (matchingNodes.length !== 1) {
    throw new Error(
      `Expected to find 1 starting node, but found ${matchingNodes.length}`,
    );
  }
  let startingNode = matchingNodes[0];

  let ignoredNames: string[] = [startingNode.name];
  let openSet: TypeMeta[] = [startingNode];
  let closedSet: TypeMeta[] = [];

  while (openSet.length > 0) {
    closedSet = [...closedSet, ...openSet];

    let newOpenSet: TypeMeta[] = [];
    openSet.forEach((node) => {
      const referencedTypes = getReferencedTypes(allNodes, node, ignoredNames);
      newOpenSet = [...newOpenSet, ...referencedTypes];
      ignoredNames = [
        ...ignoredNames,
        ...referencedTypes.map(({name}) => name),
      ];
    });

    openSet = newOpenSet;
  }

  return closedSet;
}

function getReferencedTypes(
  allNodes: TypeMeta[],
  searchedNode: TypeMeta,
  ignoredNames: string[],
): TypeMeta[] {
  let returnedNodes: TypeMeta[] = [];
  if (typeof searchedNode.value === 'string') {
    const typeNames = searchedNode.value.match(/[A-Z][a-zA-Z]+/g);
    typeNames?.forEach((name) => {
      if (!ignoredNames.includes(name)) {
        const referencedNode = getMatchingNodes(
          allNodes,
          name,
          searchedNode.filePath,
        );
        if (referencedNode.length === 1) {
          returnedNodes = [...returnedNodes, ...referencedNode];
        } else {
          console.log(
            `Type ${name} could not be referenced. It was defined ${referencedNode.length} times.`,
          );
        }
      }
    });
  }
  return returnedNodes;
}

function getMatchingNodes(
  allNodes: TypeMeta[],
  name: string,
  filePath?: string,
): TypeMeta[] {
  let matchingNodes = allNodes.filter(
    (node) => node.filePath === filePath && node.name === name,
  );

  if (matchingNodes.length !== 1) {
    matchingNodes = allNodes.filter((node) => node.name === name);
  }

  return matchingNodes;
}
