import React from 'react';

import {RenderPerformanceProfiler} from '../.storybook/RenderPerformanceProfiler';

interface Stories {
  [key: string]: React.ComponentType;
}

const stories: Stories = {};
// @ts-expect-error import.meta.glob is a Vite-only equivalent of
// require.context
const modules = import.meta.glob('../src/components/**/*.stories.tsx', {
  eager: true,
});
console.log(Object.keys(modules));
Object.entries(modules).forEach(
  ([filePath, namedExports]: [string, {string: any}]) => {
    Object.entries(namedExports).forEach(([name, Story]) => {
      const componentName = `${filePath.split('/')[1]}:${name}`;
      stories[componentName] = Story;
    });
  },
);

export function KitchenSink() {
  return Object.entries(stories)
    .filter(
      ([id]) =>
        ![
          'Modal',
          'ContextualSaveBar',
          'TopBar',
          'Sheet',
          'Frame',
          'Loading',
        ].includes(id.split(':')[0]),
    )
    .map(([id, Story]) => {
      return (
        <div key={id}>
          <RenderPerformanceProfiler
            id={id.replace('All Components/', '')}
            kind={id}
            printToDOM
          >
            <Story />
          </RenderPerformanceProfiler>
          <hr
            style={{
              border: 'none',
              margin: 10,
            }}
          />
        </div>
      );
    });
}
