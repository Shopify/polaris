import type {API, FileInfo} from 'jscodeshift';

import {POLARIS_MIGRATOR_COMMENT} from '../../constants';
import {
  insertCommentBefore,
  insertJSXComment,
  removeJSXAttributes,
} from '../../utilities/jsx';

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
          type: 'Identifier',
        },
      },
    })
    .forEach((nodePath) => {
      const hasVariable = j(nodePath).find(j.Identifier).length > 0;

      if (hasVariable) {
        insertJSXComment(
          j,
          j(nodePath).find(j.Identifier).closest(j.JSXElement).paths()[0],
          `${POLARIS_MIGRATOR_COMMENT} In this case, you will need to update the breadcrumbs variable to be a single object instead of an array as arrays have been deprecated.`,
        );
      }
    });

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
          type: 'CallExpression',
        },
      },
    })
    .forEach((nodePath) => {
      const hasVariable = j(nodePath).find(j.CallExpression).length > 0;

      if (hasVariable) {
        insertJSXComment(
          j,
          j(nodePath).find(j.Identifier).closest(j.JSXElement).paths()[0],
          `${POLARIS_MIGRATOR_COMMENT} In this case, you will need to update the breadcrumbs variable to be a single object instead of an array as arrays have been deprecated.`,
        );
      }
    });

  return source.toSource();
}
