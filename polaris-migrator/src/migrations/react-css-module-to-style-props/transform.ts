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

export default function transformer(
  file: FileInfo,
  {jscodeshift: j}: API,
  options: Options,
) {
  const source = j(file.source);

  convertCSSModuleToStyleProps(j, source, file);

  return source.toSource();
}

function convertCSSModuleToStyleProps(
  j: JSCodeshift,
  source: Collection<any>,
  file: FileInfo,
) {
  // Handle basic components
  source.findJSXElements()?.forEach((element) => {
    updateNode(element);
  });

  return source;

  function updateNode(element: any) {
    // get Attribute

    const classNameProp = element.node.openingElement.attributes?.find(
      (node: any) => {
        return node.type === 'JSXAttribute' && node.name.name === 'className';
      },
    );

    const expression = classNameProp.value.expression;
    const classNameExpressionArray: [any, string][] = [];
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
            value.specifiers?.some(
              (specifier) => specifier?.local?.name === name,
            ),
          );
        })
        .nodes()[0];
    };
    const addMemberExpression = (
      j: JSCodeshift,
      source: Collection<any>,
      expression: any,
      expressionMap: typeof classNameExpressionArray,
    ) => {
      const importNode = getImportNode(j, source, expression.object.name);
      expressionMap.push([importNode, expression.property.name]);
    };
    const processCSSFile = (node: any, file: FileInfo) => {
      const pathToCSSFile = path.resolve(
        path.dirname(file.path),
        node.source.value as string,
      );

      const cssFile = fs.readFileSync(pathToCSSFile, 'utf8').toString();

      const cssAST = postcss.parse(cssFile);
      return postcssJS.objectify(cssAST);
    };
    const evaluateExpression = (expression: any) => {
      if (expression.type === 'MemberExpression') {
        // className = {styles.Foo};
        addMemberExpression(j, source, expression, classNameExpressionArray);
      } else if (expression.type === 'CallExpression') {
        // className = classNames(styles.Foo, styles.Bar);
        expression.arguments.forEach((expression: any) =>
          evaluateExpression(expression),
        );
      } else if (expression.type === 'ArrayExpression') {
        // className={[styles.Foo, styles.Bar]}
        expression.elements.forEach((expression: any) =>
          evaluateExpression(expression),
        );
      }
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

    evaluateExpression(expression);

    const styleProps = classNameExpressionArray.reduce(
      (acc, [importNode, properties]) => {
        const CSSObject = processCSSFile(importNode, file);
        return {...acc, ...CSSObject[`.${properties}`]};
      },
      {},
    );

    const importNodes = Array.from(
      new Set(classNameExpressionArray.map(([importNode]) => importNode)),
    );

    insertStyleProps(j, element, styleProps);
    importNodes.forEach((node) => {
      removeImportDeclaration(j, source, node.source.value);
    });

    return element;

    // Case 3, compound classNames behind an identifier e.g.

    // const x = classNames(styles.Foo, styles.Bar)
    // classNames = {x}

    // Case 4, compound classnames with ternary
    // clasSNames = classNames(prop ? styles.Foo : styles.Bar);

    // Case 5
    // classNames={[styles.Foo, styles.Bar]}

    // TODO:
    // 1. Use `node.value` to get the variable name passed in
    // 2. Find where that variable was imported
    // 3. Get the import filename
    // 4. Pass that filename to postcss: return postcss(plugin(options)).process(file.source, { syntax: require('postcss-scss'), }).css;
    // 5. Convert the PostCSS style AST to a set of attributes
    // 6. Add those attributes onto this element

    return element;
  }
}
