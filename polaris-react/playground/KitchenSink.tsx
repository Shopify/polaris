import React from 'react';

import {RenderPerformanceProfiler} from '../.storybook/RenderPerformanceProfiler';

interface ReadmeModule {
  [key: string]: any;
}

const readmeReq = require.context(
  '../src/components',
  true,
  /\/.+\/README.md$/,
);
const readmeModules = readmeReq
  .keys()
  .map((filename): ReadmeModule => readmeReq(filename));

export function KitchenSink() {
  return readmeModules.reduce((memo, readmeModule) => {
    const stories = Object.entries(readmeModule)
      .filter(filterExports)
      .map(([storyName, Story]) => {
        const id = `${readmeModule.default.title}:${storyName}`;
        return (
          <div key={id}>
            <RenderPerformanceProfiler
              id={id.replace('All Components/', '')}
              kind={storyName}
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

    memo.push(...stories);
    return memo;
  }, []);
}

function filterExports([exportName]: [string, any]) {
  const excludedStoryNames =
    /AllExamples|frame|theme|ContextualSaveBar|topbar|defaultloading|modal|sheet/i;
  return exportName !== 'default' && !excludedStoryNames.test(exportName);
}
