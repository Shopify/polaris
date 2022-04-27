import React, {useMemo} from 'react';
import {useGlobals, useGlobalTypes, useParameter} from '@storybook/api';
import {
  AddonPanel,
  ArgsTable,
  ArgTypes,
  PresetColor,
} from '@storybook/components';

export type GlobalControlsParam = {
  presetColors?: PresetColor[];
};

type PanelProps = {
  active: boolean;
};

const filterUncontrolledTypes = (globalTypes: ArgTypes) =>
  Object.entries(globalTypes).reduce((acc, [key, arg]) => {
    if (arg.control !== undefined) acc[key] = arg;
    return acc;
  }, {} as ArgTypes);

const addPresetColors = (globalTypes: ArgTypes, presetColors: PresetColor[]) =>
  Object.entries(globalTypes).reduce((acc, [key, arg]) => {
    if (arg?.control?.type !== 'color' || arg?.control?.presetColors)
      acc[key] = arg;
    else acc[key] = {...arg, control: {...arg.control, presetColors}};
    return acc;
  }, {} as ArgTypes);

const getRows = (globalTypes: ArgTypes, presetColors: PresetColor[]) =>
  addPresetColors(filterUncontrolledTypes(globalTypes), presetColors);

export function GridPanel(props: PanelProps) {
  const {presetColors} = useParameter<GlobalControlsParam>('globalControls', {
    presetColors: [],
  });
  const globalTypes = useGlobalTypes();
  const [globals, updateGlobals] = useGlobals();

  const rows = useMemo(
    () => getRows(globalTypes, presetColors),
    [globalTypes, presetColors],
  );

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
