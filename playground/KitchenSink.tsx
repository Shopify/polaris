import React from 'react';

type ReadmeModule = Record<string, any>;

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
      .map(([storyName, Story]) => (
        <StoryWithWrapper key={`${readmeModule.default.title}:${storyName}`}>
          <Story />
        </StoryWithWrapper>
      ));

    memo.push(...stories);
    return memo;
  }, []);
}

function filterExports([exportName]: [string, any]) {
  const excludedStoryNames = /AllExamples|frame|theme|ContextualSaveBar|topbar|defaultloading|modal|sheet/i;
  return exportName !== 'default' && !excludedStoryNames.test(exportName);
}

function StoryWithWrapper({children}: {children: React.ReactNode}) {
  return (
    <>
      {children}
      <hr
        style={{
          border: 'none',
          margin: 10,
        }}
      />
    </>
  );
}
