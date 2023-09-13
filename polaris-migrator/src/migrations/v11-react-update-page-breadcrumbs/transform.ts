import type {
  API,
  FileInfo,
  Options,
  ArrayExpression,
  ASTPath,
} from 'jscodeshift';

import {POLARIS_MIGRATOR_COMMENT} from '../../utilities/constants';
import {
  insertCommentBefore,
  removeJSXAttributes,
  replaceJSXAttributes,
} from '../../utilities/jsx';

export default function transformer(
  fileInfo: FileInfo,
  {jscodeshift: j}: API,
  _: Options,
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
      },
    })
    .find(j.JSXExpressionContainer)
    .filter((nodePath) => {
      if (nodePath.node.expression.type === 'Identifier') {
        replaceJSXAttributes(
          j,
          j(nodePath).closest(j.JSXElement).paths()[0],
          'breadcrumbs',
          'backAction',
        );

        insertCommentBefore(
          j,
          j(nodePath).find(j.Identifier).paths()[0],
          `${POLARIS_MIGRATOR_COMMENT} In this case, you will need to update the breadcrumbs variable to be a single object instead of an array as arrays have been deprecated.`,
        );
      }

      if (nodePath.node.expression.type === 'CallExpression') {
        replaceJSXAttributes(
          j,
          j(nodePath).closest(j.JSXElement).paths()[0],
          'breadcrumbs',
          'backAction',
        );
        insertCommentBefore(
          j,
          j(nodePath).find(j.Identifier).paths()[0],
          `${POLARIS_MIGRATOR_COMMENT} In this case, you will need to update the breadcrumbs variable to be a single object instead of an array as arrays have been deprecated.`,
        );
        return false;
      }

      if (nodePath.node.expression.type === 'ObjectExpression') {
        replaceJSXAttributes(
          j,
          j(nodePath).closest(j.JSXElement).paths()[0],
          'breadcrumbs',
          'backAction',
        );
      }

      return true;
    })
    .find(j.ArrayExpression)
    .replaceWith((nodePath: ASTPath<ArrayExpression>) => {
      const arrayOfBreadcrumbs = nodePath.node.elements;

      if (arrayOfBreadcrumbs.length === 0) {
        const element = j(nodePath).closest(j.JSXElement).paths()[0];
        removeJSXAttributes(j, element, 'breadcrumbs');
        return;
      }

      if (
        arrayOfBreadcrumbs[arrayOfBreadcrumbs.length - 1]?.type !==
        'ObjectExpression'
      )
        return;

      replaceJSXAttributes(
        j,
        j(nodePath).closest(j.JSXElement).paths()[0],
        'breadcrumbs',
        'backAction',
      );
      return j.template.expression`${
        arrayOfBreadcrumbs[arrayOfBreadcrumbs.length - 1]
      }`;
    });

  return source.toSource();
}
