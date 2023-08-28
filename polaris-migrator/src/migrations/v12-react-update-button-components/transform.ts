import type {
  API,
  FileInfo,
  JSXAttribute,
  JSXOpeningElement,
  Options,
} from 'jscodeshift';

import {POLARIS_MIGRATOR_COMMENT} from '../../utilities/constants';
import {hasImportDeclaration} from '../../utilities/imports';
import {
  insertJSXComment,
  removeProp,
  renameProps,
  insertJSXAttribute,
  removeJSXAttributes,
} from '../../utilities/jsx';

export default function transformer(
  fileInfo: FileInfo,
  {jscodeshift: j}: API,
  _: Options,
) {
  const source = j(fileInfo.source);
  const componentName = 'Button';

  if (!hasImportDeclaration(j, source, '@shopify/polaris')) {
    return fileInfo.source;
  }

  // Rename `primary` `plain` to `variant=`tertiary`
  source.findJSXElements(componentName).forEach((element) => {
    const allAttributes =
      (j(element).find(j.JSXOpeningElement).get().value as JSXOpeningElement)
        .attributes ?? [];
    const jsxAttributes = allAttributes as JSXAttribute[];
    const primaryAttribute = jsxAttributes.find(
      (attribute) => attribute.name.name === 'primary',
    );
    const plainAttribute = jsxAttributes.find(
      (attribute) => attribute.name.name === 'plain',
    );

    if (primaryAttribute && plainAttribute) {
      if (
        primaryAttribute.value?.type === 'JSXExpressionContainer' ||
        plainAttribute.value?.type === 'JSXExpressionContainer'
      ) {
        insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
        return;
      }

      insertJSXAttribute(j, element, 'variant', 'tertiary');
      removeJSXAttributes(j, element, 'plain');
      removeJSXAttributes(j, element, 'primary');
    }
  });

  // Remove `outline` prop from Button
  removeProp(j, source, componentName, 'outline');

  return source.toSource();
}
