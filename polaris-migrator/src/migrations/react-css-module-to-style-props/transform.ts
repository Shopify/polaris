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
    const classNameExpressions = new Map();
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
    const processCSSFile = (
      j: JSCodeshift,
      source: Collection<any>,
      node: any,
      file: FileInfo,
      propertyName: string,
    ) => {
      const pathToCSSFile = path.resolve(
        path.dirname(file.path),
        node.source.value as string,
      );

      const cssFile = fs.readFileSync(pathToCSSFile, 'utf8').toString();

      const cssAST = postcss.parse(cssFile);
      const cssObject = postcssJS.objectify(cssAST);
      Object.entries(cssObject[`.${propertyName}`]).forEach(([key, value]) => {
        insertJSXAttribute(j, element, key, value as string);
      });
      removeJSXAttributes(j, element, 'className');
      removeImportDeclaration(j, source, node.source.value as string);
    };
    if (expression.type === 'MemberExpression') {
      // Case 1, single property name; e.g. clasName = {styles.Foo};

      const importNode = getImportNode(j, source, expression.object.name);
      if (!classNameExpressions.has(importNode)) {
        classNameExpressions.set(importNode, [expression.property.name]);
      } else {
        classNameExpressions.get(importNode).push(expression.property.name);
      }
    } else if (expression.type === 'CallExpression') {
      // Collect Properties
    }

    classNameExpressions.forEach((properties, node) => {
      properties.forEach((propertyName: string) => {
        processCSSFile(j, source, node, file, propertyName);
      });
    });

    return element;

    // Case 2, compound className; e.g. className = classNames(styles.Foo, styles.Bar);

    // Case 3, compound classNames behind an identifier e.g.
    // const x = classNames(styles.Foo, styles.Bar)
    // classNames = {x}

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
