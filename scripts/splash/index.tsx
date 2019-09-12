import path from 'path';
import React, {useState, useEffect} from 'react';
import {Box, Text, Color, render} from 'ink';
import sortBy from 'lodash/sortBy';
import {argv} from 'yargs';
import {getGitStagedFiles, getDependencies} from './treebuilder';

const excludedFileNames = (fileName) =>
  !fileName.includes('test') &&
  !fileName.includes('types') &&
  !fileName.endsWith('index.ts') &&
  !fileName.endsWith('utils.tsx');

const getEmojiForExtension = (extension) => {
  switch (extension) {
    case '.tsx':
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
      <Box marginLeft={3} key={pathname + filename}>
        <Box width={23}>
          <Color dim>{'<'}</Color>
          <Color>{componentName}</Color>
          <Color dim>{' />'}</Color>
        </Box>
        <Text>
          <Color dim>{pathname}</Color>
          {filename}
        </Text>
      </Box>
    ))}
  </Box>
);

const Components = ({components, status}) => (
  <React.Fragment>
    {status === 'loading' && (
      <Box marginLeft={4} marginBottom={1}>
        ⏳{'  '}Please wait during compilation… Beep boop beep 🤖
      </Box>
    )}

    {status === 'loaded' &&
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
}: {
  componentsModified: number;
  dependencies: number;
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
        {dependencies > -1 ? dependencies : '⏳'}
      </Box>
    </Box>
  </Box>
);

const App = () => {
  const [stagedFiles, setStagedFiles] = useState([]);
  const [data, setData] = useState([]);
  const [dataStatus, setDataStatus] = useState('loading');

  const getStagedFiles = async () => {
    const staged = (await getGitStagedFiles('src/')) as string[];
    setStagedFiles(staged);
    if (staged.length === 0) {
      setDataStatus('loaded');
    }
  };

  useEffect(() => {
    if (!argv.watch) {
      getStagedFiles();
    }
  }, []);
  // ^ empty dependency array = exits after one run

  useEffect(() => {
    if (argv.watch) {
      getStagedFiles();
    }
  });
  // ^ no dependencies = keeps watching

  useEffect(() => {
    if (stagedFiles.length > 0) {
      const dependencies = getDependencies(
        'src/**/*.tsx',
        '*.test.tsx',
        stagedFiles,
      );
      setData(formatDependencies(dependencies));
      setDataStatus('loaded');
    }
  }, [setData, stagedFiles]);

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
        dependencies={
          dataStatus === 'loading'
            ? -1
            : new Map([
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
            tip: command + click a file path to open it in your text editor
          </Box>
        </Color>
      </Box>
    </React.Fragment>
  );
};

render(<App />);
