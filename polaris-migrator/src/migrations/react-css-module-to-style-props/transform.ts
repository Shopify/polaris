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
  const {componentName} = options;
  const componentParts = componentName?.split('.');
  if (!componentName || componentParts?.length > 2) {
    throw new Error(
      'Missing required options: componentName, or your compound component exceeds 2 levels',
    );
  }

  const source = j(file.source);

  convertCSSModuleToStyleProps(j, source, componentName, file);

  return source.toSource();
}

function convertCSSModuleToStyleProps(
  j: JSCodeshift,
  source: Collection<any>,
  componentName: string,
  file: FileInfo,
) {
  const [component, subcomponent] = componentName.split('.');

  // Handle compound components
  if (component && subcomponent) {
    source.find(j.JSXElement).forEach((element) => {
      if (
        element.node.openingElement.name.type === 'JSXMemberExpression' &&
        element.node.openingElement.name.object.type === 'JSXIdentifier' &&
        element.node.openingElement.name.object.name === component &&
        element.node.openingElement.name.property.name === subcomponent
      ) {
        updateNode(element);
      }
    });
    return;
  }

  // Handle basic components
  source.findJSXElements(componentName)?.forEach((element) => {
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
    if (expression.type === 'MemberExpression') {
      // Case 1, single property name; e.g. clasName = {styles.Foo};
      const property = expression.property.name;

      const importNode = source
        .find(j.ImportDeclaration)
        .filter((importDeclaration) => {
          const value = importDeclaration.value;

          return Boolean(
            value.specifiers?.some(
              (specifier) => specifier?.local?.name === 'styles',
            ),
          );
        })
        .nodes()[0];

      const pathToCSSFile = path.resolve(
        path.dirname(file.path),
        importNode.source.value as string,
      );

      const cssFile = fs.readFileSync(pathToCSSFile, 'utf8').toString();

      const cssAST = postcss.parse(cssFile);
      const cssObject = postcssJS.objectify(cssAST);
      Object.entries(cssObject[`.${property}`]).forEach(([key, value]) => {
        insertJSXAttribute(j, element, key, value as string);
      });
      removeJSXAttributes(j, element, 'className');
      removeImportDeclaration(j, source, importNode.source.value as string);
      return element;
    }

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
