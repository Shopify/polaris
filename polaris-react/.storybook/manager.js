import React from 'react';
import {AddonPanel, ArgsTable, Icons, IconButton} from '@storybook/components';
import {addons, types} from '@storybook/addons';
import {useGlobals} from '@storybook/api';
import {styled, create} from '@storybook/theming';

const colors = {
  primary: '#008060',
  secondary: '#6d7175',
  background: '#f6f6f7',
  border: '#202123',
  surface: '#ffffff',
  text: '#202223',
};

addons.setConfig({
  // Config
  panelPosition: 'bottom',

  // Base theme
  theme: create({
    base: 'light',
    brandTitle: 'Shopify Polaris Storybook',
    brandUrl: '/',
    brandImage:
      'https://cdn.shopify.com/shopifycloud/brochure/assets/brand-assets/shopify-logo-primary-logo-456baa801ee66a0a435671082365958316831c9960c480451dd0330bcdae304f.svg',
    appBg: colors.background,
    appContentBg: colors.background,
    appBorderRadius: 4,

    // Main colors
    colorPrimary: colors.primary,
    colorSecondary: colors.secondary,

    // Typography
    textColor: colors.text,
    textInverseColor: colors.surface,
    fontBase: 'ShopifySans, Helvetica, Arial, Lucida Grande, sans-serif',

    // Toolbar default and active colors
    barTextColor: colors.text,
    barSelectedColor: colors.primary,
    barBg: colors.background,

    // Form colors
    inputBg: colors.background,
    inputBorder: colors.background,
    inputTextColor: colors.text,
    inputBorderRadius: 4,
  }),
});

addons.register('polaris/global-controls', () => {
  addons.add('grid/panel', {
    type: types.PANEL,
    title: 'Grid',
    match: ({viewMode}) => viewMode === 'story',
    render: ({active, key}) => <GridPanel active={active} key={key} />,
  });
  addons.add('provider/panel', {
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

export const featureFlagOptions = {};

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

const IconButtonLink = styled(IconButton)({
  textDecoration: 'none',
});

function GitHubToolbar() {
  let link;
  let title;
  let buttonText;

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

function FeatureFlagPanel(props) {
  const [globals, updateGlobals] = useGlobals();
  return (
    <AddonPanel {...props}>
      <ArgsTable
        inAddonPanel
        rows={featureFlagOptions}
        args={globals}
        updateArgs={updateGlobals}
      />
    </AddonPanel>
  );
}

function GridPanel(props) {
  const [globals, updateGlobals] = useGlobals();

  return (
    <AddonPanel {...props}>
      <ArgsTable
        inAddonPanel
        rows={gridOptions}
        args={globals}
        updateArgs={updateGlobals}
      />
    </AddonPanel>
  );
}
