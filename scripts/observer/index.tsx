import React from 'react';
import tinycolor from 'tinycolor2';
import tokens from '@shopify/polaris-tokens';
import {Box, Text, render, Color} from 'ink';

const data = [
  {
    path: 'src/components/Button/',
    filename: 'Button.tsx',
    componentsAffected: [
      {path: 'src/components/ButtonGroup/', filename: 'ButtonGroup.tsx'},
      {path: 'src/components/CalloutCard/', filename: 'CalloutCard.tsx'},
      {path: 'src/components/Caption/', filename: 'Caption.tsx'},
      {path: 'src/components/TopBar/', filename: 'TopBar.tsx'},
    ],
  },
  {
    path: 'src/components/Button/',
    filename: 'Button.scss',
    componentsAffected: [
      {path: 'src/components/ButtonGroup/', filename: 'ButtonGroup.tsx'},
      {path: 'src/components/Caption/', filename: 'Caption.tsx'},
      {path: 'src/components/Button/', filename: 'Button.tsx'},
    ],
  },
  {
    path: 'src/components/Checkbox/',
    filename: 'Checkbox.tsx',
    componentsAffected: [
      {
        path: 'src/components/ContextualSaveBar/',
        filename: 'ContextualSaveBar.tsx',
      },
      {
        path: 'src/components/EmptySearchResult/',
        filename: 'EmptySearchResult.tsx',
      },
      {path: 'src/components/Labelled/', filename: 'Labelled.tsx'},
      {path: 'src/components/Button/', filename: 'Button.tsx'},
    ],
  },
];

const Component = ({path, filename, componentsAffected}) => (
  <Box marginBottom={1} flexDirection="column">
    <Box paddingLeft={2}>
      {filename.endsWith('tsx') ? '🧩  ' : '💅 '}
      <Text underline>
        <Color dim>{path}</Color>
        <Text bold>{filename}</Text>
      </Text>
    </Box>
    <Box marginLeft={4}>Affected files:</Box>
    {componentsAffected.map(({path, filename}) => (
      <Box marginLeft={4} key={path + filename}>
        <Text>
          <Color dim>{path}</Color>
          {filename}
        </Text>
      </Box>
    ))}
  </Box>
);

const Components = ({components}) => (
  <React.Fragment>
    {components.map(({path, filename, componentsAffected}) => (
      <Component
        key={path + filename}
        path={path}
        filename={filename}
        componentsAffected={componentsAffected}
      />
    ))}
  </React.Fragment>
);

const Summary = ({
  componentsModified,
  componentsAffected,
}: {
  componentsModified: number;
  componentsAffected: number;
}) => (
  <Box flexDirection="column">
    <Box>
      <Box width={22}>
        <Text>Components modified:</Text>
      </Box>
      {componentsModified}
    </Box>
    <Box>
      <Box width={22}>
        <Text>Components affected:</Text>
      </Box>
      {componentsAffected}
    </Box>
  </Box>
);

render(
  <React.Fragment>
    <Box marginBottom={1}>
      💡 tip: command + click file paths to open them in your text editor
    </Box>
    <Components components={data} />
    <Summary
      componentsModified={data.length}
      componentsAffected={
        new Map([
          ...data.map(({path, filename}) => [path, path + filename]),
          ...data.reduce(
            (val, curr) =>
              val.concat(
                curr.componentsAffected.map(({path}) => [
                  path,
                  curr.path + curr.filename,
                ]),
              ),
            [],
          ),
        ]).size
      }
    />
  </React.Fragment>,
);
