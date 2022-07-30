import * as fs from 'node:fs';

import babel from '@babel/core';
import {declare} from '@babel/helper-plugin-utils';

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

export async function migration(filePath: string) {
  const content = await fs.promises.readFile(filePath, 'utf-8');

  const result = babel.transform(content, {
    plugins: [plugin],
  });

  if (!result?.code) {
    throw new Error(`Unable to run migration on ${filePath}`);
  }

  console.log('result?.code:', result?.code);

  // await fs.promises.writeFile(filePath, result.code);
}
