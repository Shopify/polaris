import babel from '@babel/core';
import {declare} from '@babel/helper-plugin-utils';

import type {MigrationFn} from '../../types';

const plugin = declare(({types: t}) => {
  return {
    visitor: {
      CallExpression(path) {
        if (!path.get('callee').matchesPattern('Object.assign')) return;

        const args = path.get('arguments');
        if (args.length === 0) return;

        const [objPath] = args;
        if (!objPath.isObjectExpression()) return;

        const obj = objPath.node;
        const {properties} = obj;

        for (let i = 1; i < args.length; i++) {
          const arg = args[i];
          const {node} = arg;

          if (t.isObjectExpression(node)) {
            properties.push(...node.properties);
          } else {
            properties.push(
              t.spreadElement(
                // @ts-expect-error fixme
                node,
              ),
            );
          }
        }

        path.replaceWith(obj);
      },
    },
  };
});

export const migration: MigrationFn = (fileContent: string) => {
  const result = babel.transform(fileContent, {
    plugins: [plugin],
  });

  return result?.code;
};

migration.extensions = ['.tsx', '.ts', '.jsx', '.js'];
