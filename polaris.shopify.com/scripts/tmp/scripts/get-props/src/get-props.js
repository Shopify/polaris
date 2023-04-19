"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRelevantTypes = exports.getProps = exports.normalizePath = void 0;
const ts = __importStar(require("typescript"));
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const globby_1 = __importDefault(require("globby"));
const compilerOptions = {
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.CommonJS,
};
function normalizePath(path) {
    let normalizedPath = path;
    if (normalizedPath.startsWith('.')) {
        normalizedPath = normalizedPath.replace(/^\.{1,2}\//, '');
    }
    else if (normalizedPath.includes('/polaris/')) {
        normalizedPath = normalizedPath.split('/polaris/')[1];
    }
    else if (normalizedPath.startsWith('/')) {
        normalizedPath = normalizedPath.replace('/', '');
    }
    return normalizedPath;
}
exports.normalizePath = normalizePath;
function getProps(filePaths) {
    let ast = {};
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
    function visit(node, level = 0) {
        // Escape hatch
        if (level > 10) {
            return undefined;
        }
        const parserArgs = [ast, node, checker, program, filePath];
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
exports.getProps = getProps;
const parseInterfaceDeclaration = (ast, node, checker, _program, filePath) => {
    const interfaceDeclaration = node;
    const type = checker.getTypeAtLocation(interfaceDeclaration.name);
    const symbol = checker.getSymbolAtLocation(interfaceDeclaration.name);
    if (!symbol)
        throw new Error('Expected interface declaration to have symbol');
    const members = [];
    interfaceDeclaration.members.forEach((member) => {
        if (member.kind === ts.SyntaxKind.IndexSignature) {
            const indexSignature = member;
            const name = `[${indexSignature.parameters
                .map((param) => `${param.name.getText()}: ${param.type?.getText()}`)
                .join(', ')}]`;
            const value = indexSignature.type.getText();
            members.push({ filePath, name, value });
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
            const { deprecationMessage, defaultValue } = parseJSDocTags(prop);
            let memberNode = {
                filePath,
                syntaxKind,
                name,
                value,
                description,
            };
            if (valueDeclaration.kind === ts.SyntaxKind.PropertySignature ||
                valueDeclaration.kind === ts.SyntaxKind.MethodSignature) {
                const signature = valueDeclaration;
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
    }
    const name = interfaceDeclaration.name.escapedText.toString();
    const description = getSymbolComment(symbol, checker);
    const value = interfaceDeclaration.getText();
    if (!ast[name]) {
        ast[name] = {};
    }
    ast[name][filePath] = {
        filePath,
        name,
        description,
        members,
        value,
    };
};
const parseTypeAliasDeclaration = (ast, node, checker, _program, filePath) => {
    const typeAliasDeclaration = node;
    const symbol = checker.getSymbolAtLocation(typeAliasDeclaration.name);
    if (!symbol) {
        throw new Error('Expected type alias declaration to have a symbol');
    }
    const description = getSymbolComment(symbol, checker);
    const name = symbol.escapedName.toString();
    const syntaxKind = ts.SyntaxKind[typeAliasDeclaration.kind];
    const typeRefNode = typeAliasDeclaration.type;
    let value = typeAliasDeclaration.type.getText();
    for (const typeArg of typeRefNode.typeArguments ?? []) {
        if (typeArg.kind === ts.SyntaxKind.UnionType) {
            value = checker.typeToString(checker.getTypeAtLocation(typeArg));
        }
    }
    if (typeAliasDeclaration.type.kind === ts.SyntaxKind.UnionType) {
        const unionType = typeAliasDeclaration.type;
        value = unionType.types.map((type) => type.getText()).join(' | ');
    }
    else if (typeAliasDeclaration.type.kind === ts.SyntaxKind.IntersectionType) {
        const unionType = typeAliasDeclaration.type;
        value = unionType.types.map((type) => type.getText()).join(' & ');
    }
    if (!ast[name]) {
        ast[name] = {};
    }
    ast[name][filePath] = {
        filePath,
        syntaxKind,
        name,
        value,
        description,
    };
};
const parseEnumDeclaration = (ast, node, checker, _program, filePath) => {
    const enumDeclation = node;
    const symbol = checker.getSymbolAtLocation(enumDeclation.name);
    if (!symbol)
        throw new Error('Expected enum to have a matching symbol');
    const syntaxKind = ts.SyntaxKind[enumDeclation.kind];
    const name = enumDeclation.name.getText();
    const value = enumDeclation.getText();
    const members = enumDeclation.members.map((member) => {
        const type = checker.getTypeAtLocation(member.name);
        return {
            filePath,
            name: member.name.getText(),
            value: type.isLiteral() ? type.value.valueOf() : '',
        };
    });
    if (!ast[name]) {
        ast[name] = {};
    }
    ast[name][filePath] = {
        filePath,
        syntaxKind,
        name,
        value,
        members,
    };
};
function parseJSDocTags(symbol) {
    const tags = symbol.getJsDocTags();
    let deprecationMessage = undefined;
    let defaultValue = undefined;
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
    return { deprecationMessage, defaultValue };
}
function getSymbolComment(symbol, checker) {
    return symbol
        .getDocumentationComment(checker)
        .map((comment) => (comment.kind === 'text' ? comment.text : ''))
        .join('\n');
}
const isExecutedThroughCommandLine = require.main === module;
if (isExecutedThroughCommandLine) {
    (0, globby_1.default)([
        '../polaris-react/src/**/*.ts',
        '../polaris-react/src/**/*.tsx',
    ]).then((files) => {
        let filesWithoutTests = files.filter((file) => !file.endsWith('test.tsx'));
        const ast = getProps(filesWithoutTests);
        const cacheDir = path_1.default.join(__dirname, '../../../../../.cache');
        if (!fs.existsSync(cacheDir)) {
            fs.mkdirSync(cacheDir, { recursive: true });
        }
        fs.writeFileSync(path_1.default.join(cacheDir, 'props.json'), JSON.stringify(ast, undefined, 2));
    });
}
const nonPolarisTypes = [
    'React',
    'ReactNode',
    'any',
    'CSSProperties',
    'ElementType',
    'MouseEvent',
    'File',
    'HTMLElement',
];
function getRelevantTypes(ast, name, filePath) {
    let matchingNode = ast[name][filePath];
    if (!matchingNode) {
        matchingNode = Object.values(ast[name])[0];
    }
    if (!matchingNode) {
        throw new Error(`Expected to find a Props definition at ast['${name}']['${filePath}'] or at least Object.values(ast['${name}])[0]`);
    }
    const pascalCaseRegex = /[A-Z]+[a-z]+(?:[A-Z][a-z]+)*/gm;
    let output = {};
    extractTypes(matchingNode);
    function extractTypes(node) {
        output[node.name] = node;
        let typeDefinitionString = node.members
            ? node.members.map((member) => member.value.toString()).join(' ')
            : node.value.toString();
        let detectedTypeDefinitions = typeDefinitionString.match(pascalCaseRegex);
        detectedTypeDefinitions?.forEach((name) => {
            if (nonPolarisTypes.includes(name))
                return;
            if (Object.keys(output).includes(name))
                return;
            const typeDefinitionInSameFile = ast[name]
                ? ast[name][node.filePath]
                : undefined;
            if (typeDefinitionInSameFile) {
                extractTypes(typeDefinitionInSameFile);
            }
            else {
                const typeDefinitionsWithSameName = ast[name];
                const typeDefinitionsWithSameNameCount = Object.keys(typeDefinitionsWithSameName || {}).length;
                if (typeDefinitionsWithSameNameCount === 1) {
                    extractTypes(Object.values(typeDefinitionsWithSameName)[0]);
                }
                else {
                    console.warn(`Found ${typeDefinitionsWithSameNameCount} definitions for type ${name}`);
                }
            }
        });
    }
    return output;
}
exports.getRelevantTypes = getRelevantTypes;
