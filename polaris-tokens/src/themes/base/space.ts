import {size} from '../../size';
import {createVarName} from '../../utils';
import type {MetaTokenProperties, ObjectFromKeys} from '../types';

export const mappedSpaceStyleProps = [
  // Shorthands
  'margin',
  'padding',
  'gap',
  // Logical properties
  'marginInline',
  'marginInlineStart',
  'marginInlineEnd',
  'marginBlock',
  'marginBlockStart',
  'marginBlockEnd',
  'paddingInline',
  'paddingInlineStart',
  'paddingInlineEnd',
  'paddingBlock',
  'paddingBlockStart',
  'paddingBlockEnd',
  'rowGap',
  'columnGap',
  // Positional properties
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
] as const;

export type MappedSpaceStyleProps = ObjectFromKeys<
  typeof mappedSpaceStyleProps,
  `space-${SpaceScale}`
>;

export type SpaceScale =
  | '0'
  | '025'
  | '050'
  | '100'
  | '150'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '800'
  | '1000'
  | '1200'
  | '1600'
  | '2000'
  | '2400'
  | '2800'
  | '3200';

export type SpaceAlias =
  /** Specialty and component spacing. */
  'button-group-gap' | 'card-gap' | 'card-padding' | 'table-cell-padding';

export type SpaceAliasOrScale = SpaceAlias | SpaceScale;

export type SpaceTokenName = `space-${SpaceAliasOrScale}`;

export type SpaceTokenGroup = {
  [TokenName in SpaceTokenName]: string;
};

export const space: {
  [TokenName in SpaceTokenName]: MetaTokenProperties;
} = {
  'space-0': {
    value: size[0],
  },
  'space-025': {
    value: size['025'],
  },
  'space-050': {
    value: size['050'],
  },
  'space-100': {
    value: size[100],
  },
  'space-150': {
    value: size[150],
  },
  'space-200': {
    value: size[200],
  },
  'space-300': {
    value: size[300],
  },
  'space-400': {
    value: size[400],
  },
  'space-500': {
    value: size[500],
  },
  'space-600': {
    value: size[600],
  },
  'space-800': {
    value: size[800],
  },
  'space-1000': {
    value: size[1000],
  },
  'space-1200': {
    value: size[1200],
  },
  'space-1600': {
    value: size[1600],
  },
  'space-2000': {
    value: size[2000],
  },
  'space-2400': {
    value: size[2400],
  },
  'space-2800': {
    value: size[2800],
  },
  'space-3200': {
    value: size[3200],
  },
  'space-button-group-gap': {
    value: createVar('space-200'),
  },
  'space-card-gap': {
    value: createVar('space-400'),
  },
  'space-card-padding': {
    value: createVar('space-400'),
  },
  'space-table-cell-padding': {
    value: createVar('space-150'),
  },
};

function createVar(spaceTokenName: SpaceTokenName) {
  return `var(${createVarName(spaceTokenName)})`;
}
