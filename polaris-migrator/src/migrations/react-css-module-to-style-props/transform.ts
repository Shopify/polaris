import fs from 'fs';
import path from 'path';

import postcssJS from 'postcss-js';
import sassPlugin from '@csstools/postcss-sass';
import sassSyntax from 'postcss-scss';
import postcss from 'postcss';
import type {JSCodeshift, API, FileInfo, ObjectExpression} from 'jscodeshift';

import {
  insertJSXAttribute,
  removeJSXAttributes,
  insertJSXComment,
} from '../../utilities/jsx';

type ObjectExpressionProperty = ObjectExpression['properties'] extends Array<
  infer T
>
  ? T
  : never;
type Path = any;
type Node = any;
interface StyleObject {
  [x: string]: string;
}
interface StyleFile {
  [x: string]: StyleObject;
}
type ImportCache = Map<Node, StyleFile>;

const postcssProcessor = postcss([sassPlugin]);

const processCSSFile = async (
  importPath: string,
  file: FileInfo,
): Promise<StyleFile> => {
  const pathToCSSFile = path.resolve(path.dirname(file.path), importPath);
  const cssFile = fs.readFileSync(pathToCSSFile, 'utf8').toString();
  // Convert sass into css
  // @ts-expect-error no.
  const cssAST = await postcssProcessor.process(cssFile, {
    syntax: sassSyntax,
    from: pathToCSSFile,
  });

  // parse css into a JS object
  const parsedCssAst = postcss.parse(cssAST);

  return postcssJS.objectify(parsedCssAst);
};

const getStyleObjectFromNode = async (
  j: JSCodeshift,
  file: FileInfo,
  path: Path,
  importCache: ImportCache,
): Promise<StyleObject> => {
  const importIdentifier = path.value.object?.name ?? path.value.name;
  // In case the import is something like:
  // import {Foo as Bar} from './styles.scss';
  const className =
    path.value.property?.name ??
    getImportedNameForIdentifier(j, importIdentifier, path);
  const importNodePath = getImportNodeForIdentifier(j, importIdentifier, path);
  let CSSObject = importCache.get(importNodePath);
  if (!CSSObject) {
    CSSObject = await processCSSFile(
      importNodePath.value.source.value as string,
      file,
    );
    importCache.set(importNodePath, CSSObject!);
  }
  return CSSObject![`.${className}`];
};

const findUp = (
  nodePath: Path,
  fn: (nodePath: Path) => boolean,
): Path | undefined => {
  if (!nodePath) {
    return undefined;
  }
  let curNodePath = nodePath;
  while (curNodePath.parentPath) {
    curNodePath = curNodePath.parentPath;
    if (fn(curNodePath)) {
      return curNodePath;
    }
  }
  return undefined;
};

const createObjectExpression = (j: JSCodeshift, obj: {[x: string]: any}) => {
  return j.objectExpression(
    Object.entries(obj).map(([key, value]) =>
      j.property('init', j.identifier(key), j.literal(value)),
    ),
  );
};

const insertPropertyIntoObjectExpression = (
  expression: ObjectExpression,
  property: ObjectExpressionProperty,
) => {
  let index = -1;
  if (property.type === 'Property') {
    index = expression.properties.findIndex(
      // @ts-expect-error We've narrowed the type down, but TS doesn't realize
      // it
      (prop) => prop.type === 'Property' && prop.key.name === property.key.name,
    );
  }
  if (index === -1) {
    index = expression.properties.length;
  }
  expression.properties.splice(index, 1, property);
};

const mergeObjectExpressions = (
  target: ObjectExpression,
  ...expressions: ObjectExpression[]
) => {
  expressions.forEach((expression) => {
    expression.properties.forEach((property) =>
      insertPropertyIntoObjectExpression(target, property),
    );
  });
};

const fromObjectExpression = (expression: ObjectExpression) => {
  return expression.properties
    .filter((property) => property.type === 'Property')
    .reduce((acc, property) => {
      // @ts-expect-error We've narrowed this type above in the filter, but TS
      // doesn't understand
      acc[property.key.name] = property.value.value;
      return acc;
    }, {});
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

const getImportedNameForIdentifier = (
  j: JSCodeshift,
  identifier: string,
  path: Path,
): Node | undefined => {
  // Use scope to find this variable's declaration binding.
  // This avoids issues with variable shadowing
  const importNode = path.scope.lookup(identifier)?.getBindings()?.[
    identifier
  ][0].parent;

  if (j.ImportDeclaration.check(importNode.parent.value)) {
    return importNode.value.imported.name;
  }

  return undefined;
};

const getImportNodeForIdentifier = (
  j: JSCodeshift,
  identifier: string,
  path: Path,
): Node | undefined => {
  // Use scope to find this variable's declaration binding.
  // This avoids issues with variable shadowing
  return findUp(
    path.scope.lookup(identifier)?.getBindings()?.[identifier][0],
    (nodePath) => j.ImportDeclaration.check(nodePath.value),
  );
};

const IS_CSS_FILE_PATH = /\.s?css$/;

const isReferenceToCSSImport = (
  j: JSCodeshift,
  identifier: string,
  path: Path,
): boolean => {
  return IS_CSS_FILE_PATH.test(
    getImportNodeForIdentifier(j, identifier, path)?.value.source.value,
  );
};

// const isLocalVariableReference = (
//   j: JSCodeshift,
//   identifier: string,
//   path: Path,
// ): boolean => {
//   // TODO
//   return false;
// };

export default async function transformer(
  file: FileInfo,
  {jscodeshift: j}: API,
) {
  const source = j(file.source);
  const importCache: ImportCache = new Map();

  const classNameCollection = source
    .findJSXElements()
    .find(j.JSXAttribute, (node) => node.name.name === 'className');

  await Promise.all(
    classNameCollection
      .find(j.MemberExpression)
      // @ts-expect-error But it does exist.
      .filter((path) => isReferenceToCSSImport(j, path.value.object.name, path))
      .paths()
      .map(async (path) => {
        const styleObject = await getStyleObjectFromNode(
          j,
          file,
          path,
          importCache,
        );
        if (styleObject) {
          path.replace(createObjectExpression(j, styleObject));
        } else {
          // TODO: Error? Insert comment?
        }
      }),
  );

  const identifierCollection = classNameCollection.find(j.Identifier).filter(
    (path) =>
      // For some reason, a JSXIdentifier matches a `j.Identifier`, so we want
      // to filter that out
      !j.JSXIdentifier.check(path.value) &&
      // Ignore identifiers that are part of an expression (eg; `styles.Foo`)
      !j.Expression.check(path.parentPath.value),
  );

  await Promise.all(
    identifierCollection
      .filter((path) => isReferenceToCSSImport(j, path.value.name, path))
      .paths()
      .map(async (path) => {
        const styleObject = await getStyleObjectFromNode(
          j,
          file,
          path,
          importCache,
        );
        if (styleObject) {
          path.replace(createObjectExpression(j, styleObject));
        } else {
          // TODO: Error? Insert comment?
        }
      }),
  );

  // When we have styles reassigned to a variable, we have to switch over to
  // that assignment and do all the same dance with converting to POJOs, etc
  // identifierCollection
  //   .filter((path) => isLocalVariableReference(j, path.value.name, path))
  //   .forEach((path) => {
  //     // TODO: Recurse on this whole process
  //   });

  const bailouts: Path[] = [];

  // Is it a call to classNames()?
  // TODO
  classNameCollection
    .find(j.FunctionExpression)
    .filter((path) => path.parentPath.value.type === 'JSXExpressionContainer');

  // Is it just an array of values?
  classNameCollection
    .find(j.ArrayExpression)
    .filter((path) => path.parentPath.value.type === 'JSXExpressionContainer')
    .forEach((path) => {
      let canFullyMerge = true;
      const elements = path.value.elements;
      // Reset the elements so we can re-insert runs of ObjectExpressions as
      // merged objects.
      path.value.elements = [];

      let index = 0;

      // Scan the entire array looking for runs of ObjectExpressions we can
      // merge togethe
      while (index < elements.length) {
        const acc = createObjectExpression(j, {});
        // Accumulate a run of ObjectExpressions using JS object merge order t
        // override earlier
        while (
          index < elements.length &&
          elements[index]?.type === 'ObjectExpression'
        ) {
          mergeObjectExpressions(acc, elements[index] as ObjectExpression);
          index++;
        }

        if (Object.keys(acc).length) {
          // push acc into array if it has keys
          path.value.elements.push(acc);
        }

        if (
          index < elements.length &&
          elements[index]?.type !== 'ObjectExpression'
        ) {
          canFullyMerge = false;
          path.value.elements.push(elements[index]);
          // push element into array
        }

        index++;
      }

      if (canFullyMerge) {
        // Replace the whole array expression with the single POJO
        // @ts-expect-error This 100% works, the typings for the replace method
        // must be wrong.
        path.replace(path.value.elements[0]);
      } else {
        const jsxElement = findUp(path, (parentPath) =>
          j.JSXElement.check(parentPath.value),
        );
        // Unable to process this fully, create a comment with the current
        // state, then replace it with the original node
        bailouts.push(jsxElement);
      }
    });

  // Is it a POJO?
  classNameCollection
    .find(j.ObjectExpression)
    .filter((path) => {
      return path.parentPath.value.type === 'JSXExpressionContainer';
    })
    .forEach((path) => {
      const pojo = fromObjectExpression(path.value);
      const jsxElement = findUp(path, (parentPath) =>
        j.JSXElement.check(parentPath.value),
      );
      insertStyleProps(j, jsxElement, pojo);
    });

  // Inject comments
  j(bailouts).forEach((path) => {
    const comment = `Couldn't merge all styles:\n${j(path).toSource()}`;
    insertJSXComment(j, path, comment, 'before');
    // Restore nodes to their original
    path.replace(path.value.original);
  });

  const importPaths = Array.from(importCache.keys());

  const removableImportPaths = importPaths.filter((importPath) => {
    const identifiers = importPath.value.specifiers.map(
      (specifier: any) => specifier.local.name,
    );

    const referencesToImport = source
      .find(j.Identifier, (value) => identifiers.includes(value.name))
      .filter(
        (path) =>
          // Don't match the identifiers in the import statement itself
          !findUp(path, (nodePath) =>
            j.ImportDeclaration.check(nodePath.value),
          ) &&
          // Ensure it's associated with the import we want to remove
          getImportNodeForIdentifier(j, path.value.name, path) === importPath,
      )
      .size();

    return referencesToImport === 0;
  });

  j(removableImportPaths).remove();

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
