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
Object.entries(modules).forEach(
  ([filePath, mod]: [string, {[key: string]: any}]) => {
    mod.__namedExportsOrder.forEach((name: string) => {
      const componentName = `${
        filePath.replace('../src/components/', '').split('/')[0]
      }:${name}`;
      stories[componentName] = mod[name];
    });
  },
);

export const KitchenSink = {
  tags: ['skip-tests'],
  render() {
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
            'AppProvider',
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
  },
};
