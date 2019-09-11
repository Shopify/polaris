import path from 'path';
import React, {useState, useEffect} from 'react';
import {Box, Text, Color, render} from 'ink';
import sortBy from 'lodash/sortBy';
import {getGitStagedFiles, getDependencies} from '../../treebuilder';

const excludedFileNames = (fileName) =>
  !fileName.includes('test') &&
  !fileName.includes('types') &&
  !fileName.endsWith('index.ts') &&
  !fileName.endsWith('utils.tsx');

const formatDependencies = (dependencies) =>
  dependencies
    .filter(({fileName}) => excludedFileNames(fileName))
    .map((dependency) => ({
      path: `${path.dirname(dependency.fileName)}/`,
      filename: path.basename(dependency.fileName),
      dependencies: sortBy(
        dependency.dependencies.filter(excludedFileNames).map((dependency) => ({
          path: `${path.dirname(dependency)}/`,
          filename: path.basename(dependency),
          componentName: path
            .dirname(dependency)
            .replace('src/components/', '')
            .split('/')[0],
        })),
        ['path', 'filename'],
      ),
    }));

const Component = ({path, filename, dependencies}) => (
  <Box marginBottom={1} flexDirection="column">
    <Box paddingLeft={2}>
      {filename.endsWith('tsx') ? '🧩  ' : '💅 '}
      <Text bold>
        <Color greenBright>
          {path}
          {filename}
        </Color>
      </Text>
    </Box>
    <Box marginLeft={4}>
      <Box width={23}>Component name</Box>
      File potentially affected (total: {dependencies.length})
    </Box>
    {dependencies.map(({path, filename, componentName}) => (
      <Box marginLeft={4} key={path + filename}>
        <Box width={23}>
          <Color dim>{'<'}</Color>
          <Color>{componentName}</Color>
          <Color dim>{' />'}</Color>
        </Box>
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
    {components.map(({path, filename, dependencies}) => (
      <Component
        key={path + filename}
        path={path}
        filename={filename}
        dependencies={dependencies}
      />
    ))}
  </React.Fragment>
);

const Summary = ({
  componentsModified,
  dependencies,
}: {
  componentsModified: number;
  dependencies: number;
}) => (
  <Box flexDirection="column">
    <Box>
      <Box width={30}>
        <Text>Files modified:</Text>
      </Box>
      {componentsModified}
    </Box>
    <Box>
      <Box width={30}>
        <Text>Files potentially affected:</Text>
      </Box>
      {dependencies}
    </Box>
  </Box>
);

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const stagedFiles = (await getGitStagedFiles('src/')) as string[];
      const dependencies = await getDependencies(
        'src/**/*.tsx',
        '*.test.tsx',
        stagedFiles,
      );
      setData(formatDependencies(dependencies));
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Box marginBottom={1}>
        💡 tip: command + click file paths to open them in your text editor
      </Box>
      <Components components={data} />
      <Summary
        componentsModified={data.length}
        dependencies={
          new Map([
            ...data.map(({path, filename}) => [path, path + filename]),
            ...data.reduce(
              (val, curr) =>
                val.concat(
                  curr.dependencies.map(({path}) => [
                    path,
                    curr.path + curr.filename,
                  ]),
                ),
              [],
            ),
          ]).size
        }
      />
    </React.Fragment>
  );
};

render(<App />);
