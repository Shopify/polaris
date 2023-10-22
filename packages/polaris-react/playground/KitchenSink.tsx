import React from 'react';

import {RenderPerformanceProfiler} from '../.storybook/RenderPerformanceProfiler';

interface Stories {
  [key: string]: React.ComponentType;
}

const stories: Stories = {};
const req = require.context('../src/components', true, /.stories.tsx$/);
req.keys().forEach((filePath: string) =>
  req(filePath).__namedExportsOrder.forEach((namedExport: string) => {
    const componentName = `${filePath.split('/')[1]}:${namedExport}`;
    stories[componentName] = req(filePath)[namedExport];
  }),
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
}
