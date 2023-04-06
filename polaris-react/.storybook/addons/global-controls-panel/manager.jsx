import React from 'react';
import {AddonPanel} from '@storybook/components';
import {PureArgsTable} from '@storybook/blocks';
import {addons, types} from '@storybook/manager-api';
import {useGlobals} from '@storybook/api';

addons.register('global-controls', () => {
  addons.add('global-controls/panel', {
    type: types.PANEL,
    title: 'Grid',
    match: ({viewMode}) => viewMode === 'story',
    render: ({active, key}) => <GridPanel active={active} key={key} />,
  });
});

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
