import React from 'react';
import {AddonPanel, Icons, IconButton} from '@storybook/components';
import {PureArgsTable} from '@storybook/blocks';
import {addons, types} from '@storybook/manager-api';
import {styled} from '@storybook/theming';
import {useGlobals} from '@storybook/api';

addons.register('global-controls', () => {
  addons.add('grid-options/panel', {
    type: types.PANEL,
    title: 'Grid',
    match: ({viewMode}) => viewMode === 'story',
    render: ({active, key}) => <GridPanel active={active} key={key} />,
  });
  addons.add('feature-flags/panel', {
    type: types.PANEL,
    title: 'Feature flags',
    match: ({viewMode}) => viewMode === 'story',
    render: ({active, key}) => <FeatureFlagPanel active={active} key={key} />,
  });
  addons.add('github/link', {
    type: types.TOOLEXTRA,
    title: 'GitHub',
    match: ({viewMode}) => viewMode === 'story' || viewMode === 'docs',
    render: GitHubToolbar,
  });
});

export const featureFlagOptions = {
  polarisSummerEditions2023: {
    name: 'polarisSummerEditions2023',
    description: 'Toggle the summer editions feature flag',
    defaultValue: false,
    control: {type: 'boolean'},
  },
  polarisSummerEditions2023ShadowBevelOptOut: {
    name: 'polarisSummerEditions2023ShadowBevelOptOut',
    description: 'Toggle the shadow-bevel opt out feature flag',
    defaultValue: false,
    control: {type: 'boolean'},
  },
};

export const gridOptions = {
  showGrid: {
    name: 'Show grid overlay',
    description: 'Show or hide a 4 / 12 column grid, overlaying components',
    defaultValue: false,
    control: {type: 'boolean'},
  },
  gridInFrame: {
    name: 'Grid in frame',
    description: 'Show grid within app frame context',
    defaultValue: false,
    control: {type: 'boolean'},
  },
  gridWidth: {
    name: 'Grid width',
    description: 'Set a max width for the grid overlay',
    default: '100%',
    control: {type: 'select'},
    options: ['560px', '768px', '1008px', '100%'],
  },
  gridLayer: {
    name: 'Grid layer',
    description: 'Set the grid layer above or below content',
    default: 'below',
    control: {type: 'select'},
    options: ['above', 'below'],
  },
};

function GridPanel(props) {
  const [globals, updateGlobals] = useGlobals();

  return (
    <AddonPanel {...props}>
      <PureArgsTable
        inAddonPanel
        rows={gridOptions}
        args={globals}
        updateArgs={updateGlobals}
      />
    </AddonPanel>
  );
}

function FeatureFlagPanel(props) {
  const [globals, updateGlobals] = useGlobals();
  return (
    <AddonPanel {...props}>
      <PureArgsTable
        inAddonPanel
        rows={featureFlagOptions}
        args={globals}
        updateArgs={updateGlobals}
      />
    </AddonPanel>
  );
}

const IconButtonLink = styled(IconButton)({
  textDecoration: 'none',
});

function GitHubToolbar() {
  let link;
  let title;
  let buttonText;
  // All of the storybook manager leverages the `@storybook/builder-manager` package, which builds with esbuild under the hood, and not vite.
  // This means that we can't use the `import.meta.env` syntax to access environment variables.
  // See https://github.com/storybookjs/storybook/blob/d112cbac280f23530b366918b9d54818006db963/code/builders/builder-manager/src/index.ts#L103
  if (process.env.STORYBOOK_GITHUB_REPO_URL) {
    link = `${process.env.STORYBOOK_GITHUB_REPO_URL}`;
    title = 'View source on GitHub';
    buttonText = 'GitHub';
    if (process.env.STORYBOOK_GITHUB_PR) {
      link = `${link}/pull/${process.env.STORYBOOK_GITHUB_PR}`;
      title = `Built from PR #${process.env.STORYBOOK_GITHUB_PR}`;
      buttonText = `PR #${process.env.STORYBOOK_GITHUB_PR}`;
    } else if (process.env.STORYBOOK_GITHUB_SHA) {
      link = `${link}/commit/${process.env.STORYBOOK_GITHUB_SHA}`;
      title = `Built from commit ${process.env.STORYBOOK_GITHUB_SHA}`;
      buttonText = <code>{process.env.STORYBOOK_GITHUB_SHA.slice(0, 7)}</code>;
    }
  }

  return link ? (
    <IconButtonLink as="a" href={link} title={title} target="_blank">
      <Icons icon="github" />
      &nbsp;{buttonText}
    </IconButtonLink>
  ) : null;
}
