import type {API, FileInfo} from 'jscodeshift';

import {removeJSXAttributes} from '../../utilities/jsx';

export default function reactBreadcrumbsMigrateFromArray(
  fileInfo: FileInfo,
  {jscodeshift: j}: API,
) {
  const source = j(fileInfo.source);

  source
    .findJSXElements('Page')
    .find(j.JSXAttribute, {
      name: {
        type: 'JSXIdentifier',
        name: 'breadcrumbs',
      },
      value: {
        type: 'JSXExpressionContainer',
        expression: {
          type: 'ArrayExpression',
        },
      },
    })
    .find(j.ArrayExpression)
    .replaceWith((nodePath) => {
      const arrayOfBreadcrumbs = nodePath.node.elements;

      if (arrayOfBreadcrumbs.length === 0) {
        removeJSXAttributes(
          j,
          nodePath.parentPath.parentPath.parentPath.parentPath,
          'breadcrumbs',
        );
        return;
      }

      if (
        arrayOfBreadcrumbs[arrayOfBreadcrumbs.length - 1]?.type !==
        'ObjectExpression'
      )
        return;

      return j.template.expression`${
        arrayOfBreadcrumbs[arrayOfBreadcrumbs.length - 1]
      }`;
    });

  return source.toSource();
}
