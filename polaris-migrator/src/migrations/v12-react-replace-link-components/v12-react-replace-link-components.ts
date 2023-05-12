import type {API, FileInfo, JSXAttribute, JSXOpeningElement} from 'jscodeshift';

import {
  insertJSXAttribute,
  insertJSXComment,
  removeJSXAttributes,
} from '../../utilities/jsx';
import {POLARIS_MIGRATOR_COMMENT} from '../../constants';

export default function v12ReactReplaceLinkComponents(
  fileInfo: FileInfo,
  {jscodeshift: j}: API,
) {
  const source = j(fileInfo.source);

  const localElementName = 'Link';

  source.findJSXElements(localElementName).forEach((element) => {
    const allAttributes =
      (j(element).find(j.JSXOpeningElement).get().value as JSXOpeningElement)
        .attributes ?? [];

    if (allAttributes.some((attribute) => attribute.type !== 'JSXAttribute')) {
      insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
      return;
    }

    const jsxAttributes = allAttributes as JSXAttribute[];

    const externalAttribute = jsxAttributes.find(
      (attribute) => attribute.name.name === 'external',
    );

    if (externalAttribute && externalAttribute.value !== null) {
      insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
      return;
    }

    const isExternal = Boolean(externalAttribute);

    if (isExternal) {
      insertJSXAttribute(j, element, 'target', '_blank');
      removeJSXAttributes(j, element, 'external');
    }
  });

  return source.toSource();
}
