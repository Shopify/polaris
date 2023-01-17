import type {API, FileInfo} from 'jscodeshift';

import {POLARIS_MIGRATOR_COMMENT} from '../../constants';
import {insertCommentBefore} from '../../utilities/jsx';

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
    .filter((nodePath) => {
      const arrayOfBreadcrumbs = nodePath.node.elements;

      if (arrayOfBreadcrumbs.length === 0) {
        if (arrayOfBreadcrumbs.length === 0) {
          insertCommentBefore(j, nodePath, POLARIS_MIGRATOR_COMMENT);
        }
        return false;
      } else {
        return true;
      }
    })
    .replaceWith((nodePath) => {
      const arrayOfBreadcrumbs = nodePath.node.elements;

      if (arrayOfBreadcrumbs[0]?.type !== 'ObjectExpression') return;

      return j.template.expression`${arrayOfBreadcrumbs[0]}`;
    });

  return source.toSource();
}
