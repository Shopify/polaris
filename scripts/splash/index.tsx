import path from 'path';
import React, {useState, useEffect} from 'react';
import {Box, Text, Color, render} from 'ink';
import sortBy from 'lodash/sortBy';
import {getGitStagedFiles, getDependencies} from './treebuilder';

enum Status {
  Loading = 'LOADING',
  Loaded = 'LOADED',
}

const excludedFileNames = (fileName) =>
  !fileName.includes('test') && !fileName.includes('types');

const getEmojiForExtension = (extension) => {
  switch (extension) {
    case '.tsx':
    case '.ts':
      return '🧩';
    case '.scss':
      return '🎨';
    default:
      return '❔';
  }
};

const formatDependencies = (dependencies) =>
  dependencies
    .filter(({fileName}) => excludedFileNames(fileName))
    .map((dependency) => ({
      pathname: `${path.dirname(dependency.fileName)}/`,
      filename: path.basename(dependency.fileName),
      dependencies: sortBy(
        dependency.dependencies.filter(excludedFileNames).map((dependency) => ({
          pathname: `${path.dirname(dependency)}/`,
          filename: path.basename(dependency),
          componentName: path
            .dirname(dependency)
            .replace('src/components/', '')
            .split('/')[0],
        })),
        ['pathname', 'filename'],
      ),
    }));

const Component = ({pathname, filename, dependencies}) => (
  <Box marginBottom={1} flexDirection="column">
    <Box>
      <Box width={3}>{getEmojiForExtension(path.extname(filename))}</Box>
      <Text bold>
        <Color greenBright>
          {pathname}
          {filename}
        </Color>
      </Text>
    </Box>
    <Box marginLeft={3}>
      <Box width={23}>Component name</Box>
      Files potentially affected (total: {dependencies.length})
    </Box>
    {dependencies.map(({pathname, filename, componentName}) => (
      <Box
        marginLeft={3}
        key={pathname + filename}
        flexDirection={process.stdout.columns > 80 ? 'row' : 'column'}
      >
        <Box width={23}>
          <Color dim>{'<'}</Color>
          <Color>{componentName}</Color>
          <Color dim>{' />'}</Color>
        </Box>
        <Box textWrap="wrap">
          <Color dim>{pathname}</Color>
          {filename}
        </Box>
      </Box>
    ))}
  </Box>
);

const Components = ({components, status}) => (
  <React.Fragment>
    {status === Status.Loading && (
      <Box marginLeft={4} marginBottom={1}>
        ⏳{'  '}
        Please wait during compilation… Beep boop beep 🤖
      </Box>
    )}

    {status === Status.Loaded &&
      components.map(({pathname, filename, dependencies}) => (
        <Component
          key={pathname + filename}
          pathname={pathname}
          filename={filename}
          dependencies={dependencies}
        />
      ))}
  </React.Fragment>
);

const Summary = ({
  componentsModified,
  dependencies,
  status,
}: {
  componentsModified: number;
  dependencies: number;
  status: string;
}) => (
  <Box flexDirection="column">
    <Box>
      <Box width={30}>
        <Text>Files modified:</Text>
      </Box>
      <Box justifyContent="flex-end" width={3}>
        {componentsModified}
      </Box>
    </Box>
    <Box>
      <Box width={30}>
        <Text>Files potentially affected:</Text>
      </Box>
      <Box justifyContent="flex-end" width={3}>
        {status === Status.Loading ? '⏳' : dependencies}
      </Box>
    </Box>
  </Box>
);

const App = () => {
  const [stagedFiles, setStagedFiles] = useState([]);
  const [data, setData] = useState([]);
  const [dataStatus, setDataStatus] = useState<Status>(Status.Loading);

  useEffect(
    () => {
      if (dataStatus === Status.Loading) {
        const getStagedFiles = async () => {
          const staged = (await getGitStagedFiles('src/')) as string[];
          setStagedFiles(staged);
        };
        getStagedFiles();
      }
    },
    [dataStatus],
  );

  useEffect(
    () => {
      if (stagedFiles.length !== 0) {
        const dependencies = getDependencies(
          'src/**/*.tsx',
          '*.test.tsx',
          stagedFiles,
        );
        setData(formatDependencies(dependencies));
      }

      setDataStatus(Status.Loaded);
    },
    [setData, stagedFiles],
  );

  return (
    <React.Fragment>
      <Box marginBottom={1} flexDirection="column">
        <Box>
          <Box width={3}>💦</Box>
          <Box>
            <Text bold>yarn splash</Text>: Observe the splash zone of a change
            across the entire library
          </Box>
        </Box>
      </Box>
      <Components components={data} status={dataStatus} />
      <Summary
        componentsModified={stagedFiles.length}
        status={dataStatus}
        dependencies={
          new Map([
            ...data.map(({pathname, filename}) => [
              pathname,
              pathname + filename,
            ]),
            ...data.reduce(
              (val, curr) =>
                val.concat(
                  curr.dependencies.map(({pathname}) => [
                    pathname,
                    curr.pathname + curr.filename,
                  ]),
                ),
              [],
            ),
          ]).size
        }
      />
      <Box marginTop={1}>
        <Color dim>
          <Box width={3}>💡</Box>
          <Box>
            Tip: command + click a file path to open it in your text editor
          </Box>
        </Color>
      </Box>
    </React.Fragment>
  );
};

render(<App />);
