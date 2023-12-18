import fs from 'fs';
import path from 'path';

import postcssJS from 'postcss-js';
import type {
  JSCodeshift,
  API,
  FileInfo,
  Options,
  Collection,
} from 'jscodeshift';
import postcss from 'postcss';

import {insertJSXAttribute, removeJSXAttributes} from '../../utilities/jsx';
import {removeImportDeclaration} from '../../utilities/imports';

type Path = any;
type Node = any;
interface StyleObject {
  [x: string]: string;
}
interface StyleFile {
  [x: string]: StyleObject;
}
type ImportCache = Map<Node, StyleFile>;

const getImportNode = (
  j: JSCodeshift,
  source: Collection<any>,
  name: string,
) => {
  return source
    .find(j.ImportDeclaration)
    .filter((importDeclaration) => {
      const value = importDeclaration.value;

      return Boolean(
        value.specifiers?.some((specifier) => specifier?.local?.name === name),
      );
    })
    .nodes()[0];
};

const processCSSFile = (importPath: string, file: FileInfo): StyleFile => {
  const pathToCSSFile = path.resolve(path.dirname(file.path), importPath);
  const cssFile = fs.readFileSync(pathToCSSFile, 'utf8').toString();
  const cssAST = postcss.parse(cssFile);
  return postcssJS.objectify(cssAST);
};

const walkExpressions = (
  j: JSCodeshift,
  source: Collection<any>,
  file: FileInfo,
  expression: any,
  importCache: ImportCache,
) => {
  debugger;
  const memberExpression = expression
    .find(j.MemberExpression, (node) => {})
    .get();
  console.log(memberExpression);
  if (expression.type === 'MemberExpression') {
    // className = {styles.Foo};
    const styleObject = getStyleObjectFromNode(
      j,
      source,
      file,
      expression,
      importCache,
    );
    console.log(styleObject);
    replaceExpressionWithObjectExpression(j, expression, styleObject);
  } else if (expression.type === 'CallExpression') {
    // className = classNames(styles.Foo, styles.Bar);
    expression.arguments.forEach((expression: any) =>
      walkExpressions(j, source, file, expression, importCache),
    );
  } else if (expression.type === 'ArrayExpression') {
    // className={[styles.Foo, styles.Bar]}
    expression.elements.forEach((expression: any) =>
      walkExpressions(j, source, file, expression, importCache),
    );
    // } else if (expression.type === 'ConditionalExpression') {
    //   // Ternary
    //   addMemberExpression(expression);
    //   // className={[styles.Foo, styles.Bar]}
    //   walkExpressions(j, expression.consequent, importCache);
    //   walkExpressions(j, expression.alternate, importCache);
  }
};

const getStyleObjectFromNode = (
  j: JSCodeshift,
  file: FileInfo,
  path: Path,
  importCache: ImportCache,
): StyleObject => {
  const importIdentifier = path.value.object?.name ?? path.value.name;
  const className = path.value.property?.name ?? path.value.name;
  const importNode = getImportNodeForIdentifier(j, importIdentifier, path);
  let CSSObject = importCache.get(importNode);
  if (!CSSObject) {
    CSSObject = processCSSFile(importNode.source.value as string, file);
    importCache.set(importNode, CSSObject!);
  }
  return CSSObject![`.${className}`];
};

const createObjectExpression = (j: JSCodeshift, obj: {[x: string]: any}) => {
  return j.objectExpression(
    Object.entries(obj).map(([key, value]) =>
      j.property('init', j.identifier(key), j.literal(value)),
    ),
  );
};

const replaceExpressionWithObjectExpression = (
  j: JSCodeshift,
  path: Path,
  styleObject: StyleObject,
) => {
  path.replace(
    j.objectExpression(
      Object.entries(styleObject).map(([key, value]) =>
        j.property('init', j.identifier(key), j.literal(value)),
      ),
    ),
  );
};

const insertStyleProps = (
  j: JSCodeshift,
  element: any,
  styleProps: {[key: string]: string},
) => {
  Object.entries(styleProps).forEach(([key, value]) => {
    insertJSXAttribute(j, element, key, value as string);
  });
  removeJSXAttributes(j, element, 'className');
};

const getImportNodeForIdentifier = (
  j: JSCodeshift,
  identifier: string,
  path: Path,
): Node | undefined => {
  // Use scope to find this variable's declaration binding.
  // This avoids issues with variable shadowing
  const importNode = path.scope.lookup(identifier)?.getBindings()?.[
    identifier
  ][0].parent.parent.value;

  if (j.ImportDeclaration.check(importNode)) {
    return importNode;
  }

  return undefined;
};

const IS_CSS_FILE_PATH = /\.s?css$/;

const isReferenceToCSSImport = (
  j: JSCodeshift,
  identifier: string,
  path: Path,
): boolean => {
  return IS_CSS_FILE_PATH.test(
    getImportNodeForIdentifier(j, identifier, path)?.source.value,
  );
};

export default function transformer(
  file: FileInfo,
  {jscodeshift: j}: API,
  options: Options,
) {
  const source = j(file.source);
  const importCache: ImportCache = new Map();

  const classNameCollection = source
    .findJSXElements()
    .find(j.JSXAttribute, (node) => node.name.name === 'className');

  classNameCollection
    .find(j.MemberExpression)
    .filter((path) => isReferenceToCSSImport(j, path.value.object.name, path))
    .forEach((path) => {
      const styleObject = getStyleObjectFromNode(j, file, path, importCache);
      if (styleObject) {
        path.replace(createObjectExpression(j, styleObject));
      } else {
        // TODO: Error? Insert comment?
      }
    });

  classNameCollection
    .find(j.Identifier)
    .filter(
      (path) =>
        // For some reason, a JSXIdentifier matches a `j.Identifier`, so we want
        // to filter that out
        !j.JSXIdentifier.check(path.value) &&
        // Ignore identifiers that are part of an expression (eg; `styles.Foo`)
        !j.Expression.check(path.parentPath.value),
    )
    .filter((path) => isReferenceToCSSImport(j, path.value.name, path))
    .forEach((path) => {
      const styleObject = getStyleObjectFromNode(j, file, path, importCache);
      if (styleObject) {
        path.replace(createObjectExpression(j, styleObject));
      } else {
        // TODO: Error? Insert comment?
      }
    });

  classNameCollection.find(j.ConditionalExpression).forEach((path) => {
    // TODO;
    debugger;
  });

  // Is it just an array of values?
  const arrayOfValues = classNameCollection
    .find(j.ArrayExpression)
    .filter((path) => path.parentPath.value.type === 'JSXExpressionContainer');

  if (arrayOfValues.size() > 0) {
    // TODO Flatten the array down to a single ObjcetExpressionn
    debugger;
  }

  // Is it a POJO?
  const objectValue = classNameCollection
    .find(j.ObjectExpressioon)
    .filter((path) => path.parentPath.value.type === 'JSXExpressionContainer');

  if (objectValue.size() > 0) {
    // TODO convert to style props on the object, then delete `className`
    debugger;
  }

  // Is it a ternary?
  const ternaryValue = classNameCollection
    .find(j.ConditionalExpression)
    .filter((path) => path.parentPath.value.type === 'JSXExpressionContainer');

  if (ternaryValue.size() > 0) {
    // TODO Convert to an object spread, then delete `className`
    debugger;
  }

  /*
    .replaceWith((path) => {
      debugger;
      const expression = j(path.value);
      // get Attribute
      walkExpressions(j, source, file, expression, importCache);

      // const styleProps = classNameExpressionArray.reduce(
      //   (acc, [importNode, properties]) => {
      //     const CSSObject = processCSSFile(importNode.source.value as string, file);
      //     return {...acc, ...CSSObject[`.${properties}`]};
      //   },
      //   {},
      // );

      // const importNodes = Array.from(
      //   new Set(classNameExpressionArray.map(([importNode]) => importNode)),
      // );

      // insertStyleProps(j, expression, styleProps);
      // importNodes.forEach((node) => {
      //   removeImportDeclaration(j, source, node.source.value);
      // });

      return expression;
    });
  */

  return source.toSource();
}
