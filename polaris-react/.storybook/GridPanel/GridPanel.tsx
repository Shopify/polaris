import React from 'react';
import {useGlobals} from '@storybook/api';
import {AddonPanel, ArgsTable, PresetColor} from '@storybook/components';

type PanelProps = {
  active: boolean;
};

export function GridPanel(props: PanelProps) {
  const [globals, updateGlobals] = useGlobals();

  return (
    <AddonPanel {...props}>
      <ArgsTable
        inAddonPanel
        rows={{
          showGrid: {
            name: 'Show grid overlay',
            description:
              'Show or hide a 4 / 12 column grid, overlaying components',
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
            default: '1080',
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
        }}
        args={globals}
        updateArgs={updateGlobals}
      />
    </AddonPanel>
  );
}
