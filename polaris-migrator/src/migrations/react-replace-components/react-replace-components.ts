import type {
  API,
  FileInfo,
  Options,
  JSXOpeningElement,
  JSXAttribute,
} from 'jscodeshift';

import {
  hasImportDeclaration,
  normalizeImportSourcePaths,
  hasImportSpecifier,
  getImportSpecifierName,
  insertImportDeclaration,
  insertImportSpecifier,
  removeImportSpecifier,
  hasImportSpecifiers,
  removeImportDeclaration,
} from '../../utilities/imports';
import {
  insertJSXAttribute,
  replaceJSXElement,
  removeJSXAttributes,
  insertJSXComment,
  hasJSXAttribute,
  insertCommentBefore,
} from '../../utilities/jsx';
import {POLARIS_MIGRATOR_COMMENT} from '../../constants';

export interface ReplaceComponentMigrationOptions
  extends Options,
    PropsMapObject {
  relative: boolean;
}

interface PropsMapObject {
  fromProp: string;
  toProp: string;
  defaultValue: any;
  valueMap: {
    [propName: string]: any;
  };
}

export default function reactReplaceComponents(
  fileInfo: FileInfo,
  {jscodeshift: j}: API,
  options: ReplaceComponentMigrationOptions,
) {
  // first check that we're getting all the required options
  const {
    fromComponent,
    toComponent,
    fromComponentProps,
    toComponentProps,
    propMaps,
  } = options;

  if (
    !fromComponent ||
    !toComponent ||
    !fromComponentProps ||
    !toComponentProps ||
    !propMaps
  ) {
    const optionsKeys = Object.keys(options);
    const requiredOptions = [
      'fromComponent',
      'toComponent',
      'fromComponentProps',
      'toComponentProps',
      'propMaps',
    ];
    const missing = requiredOptions.filter((key) => {
      return !optionsKeys.includes(key);
    });

    throw new Error(`Missing required options values: ${missing.join(', ')}`);
  }

  const source = j(fileInfo.source);

  // if the current file does not import polaris, bail
  if (!hasImportDeclaration(j, source, '@shopify/polaris')) {
    return fileInfo.source;
  }

  const sourcePaths = normalizeImportSourcePaths(j, source, {
    relative: options.relative,
    from: fromComponent,
    to: toComponent,
  });

  // if current file does not import anything, bail
  if (!sourcePaths) {
    return;
  }
  // if current file does not import the 'from' component, bail
  if (!hasImportSpecifier(j, source, fromComponent, sourcePaths.from)) {
    return;
  }

  // get the name of the element we're targeting
  const localElementName =
    getImportSpecifierName(j, source, fromComponent, sourcePaths.from) ||
    fromComponent;

  const localElementTypeName = getImportSpecifierName(
    j,
    source,
    fromComponentProps,
    sourcePaths.from,
  );

  let canInsertNewComponentImport = false;
  let canRemoveOldComponentImport = Boolean(!localElementTypeName);

  // query for all JSX elements in the file and iterate over them
  source.findJSXElements(localElementName).forEach((element) => {
    // get the props on the current jsx element
    const allAttributes =
      (j(element).find(j.JSXOpeningElement).get().value as JSXOpeningElement)
        .attributes ?? [];

    // if any of the props aren't JSXAttribute (like spread/rest) then bail
    if (allAttributes.some((attribute) => attribute.type !== 'JSXAttribute')) {
      canRemoveOldComponentImport = false;
      // eslint-disable-next-line no-console
      console.log(
        `Component props include non "JSXAttribute" type ex. {...spread} or {...rest}. Unable to migrate ${fileInfo.path}`,
      );
      // insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
      return;
    }

    const jsxAttributes = allAttributes as JSXAttribute[];

    // map over objects in propMaps
    propMaps.forEach((propObj: PropsMapObject) => {
      const {fromProp, toProp, valueMap, defaultValue} = propObj;

      const attribute = jsxAttributes.find((attribute) => {
        return attribute.name.name === fromProp;
      });

      const attributeValueNode = attribute?.value;

      let toPropValue = defaultValue;

      // check if value is set and map to new value
      if (attributeValueNode) {
        // check the type also TODO check that it is a valid value
        if (attributeValueNode?.type === 'StringLiteral') {
          const attributeValue = attributeValueNode.value;
          const mappedValue = valueMap[attributeValue];

          if (mappedValue) {
            toPropValue = valueMap[attributeValue];
          } else {
            // if no valid value then we bail
            canRemoveOldComponentImport = false;
            insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
            return;
          }
        } else {
          // if no valid value then we bail
          canRemoveOldComponentImport = false;
          insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
          return;
        }
      }

      canInsertNewComponentImport = true;

      replaceJSXElement(j, element, toComponent);
      // all BlockStack components need a gap prop
      insertJSXAttribute(j, element, toProp, toPropValue);

      // remove the spacing prop
      if (hasJSXAttribute(j, element, fromProp)) {
        removeJSXAttributes(j, element, fromProp);
      }
    });
  });

  source
    .find(j.Identifier)
    .filter(
      (path) =>
        path.node.name === localElementName ||
        path.node.name === localElementTypeName,
    )
    .forEach((path) => {
      if (path.node.type !== 'Identifier') return;

      if (path.parent.value.type !== 'ImportSpecifier') {
        canRemoveOldComponentImport = false;
      }

      insertCommentBefore(j, path, POLARIS_MIGRATOR_COMMENT);

      if (path.node.name === localElementName) {
        insertCommentBefore(j, path, `Replace with: ${toComponent}`);
      } else {
        insertCommentBefore(j, path, `Replace with: ${toComponentProps}`);
      }
    });

  if (canInsertNewComponentImport) {
    if (!hasImportSpecifier(j, source, toComponent, sourcePaths.to)) {
      if (options.relative) {
        insertImportDeclaration(
          j,
          source,
          toComponent,
          sourcePaths.to,
          sourcePaths.from,
        );
      } else {
        insertImportSpecifier(j, source, toComponent, sourcePaths.to);
      }
    }
  }

  if (canRemoveOldComponentImport) {
    if (hasImportSpecifier(j, source, fromComponent, sourcePaths.from)) {
      removeImportSpecifier(j, source, fromComponent, sourcePaths.from);
    }
    if (!hasImportSpecifiers(j, source, sourcePaths.from)) {
      removeImportDeclaration(j, source, sourcePaths.from);
    }
  }

  return source.toSource();
}
