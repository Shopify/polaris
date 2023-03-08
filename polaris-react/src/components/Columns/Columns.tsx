import React from 'react';
import type {SpacingSpaceScale} from '@shopify/polaris-tokens';

import {
  getResponsiveProps,
  getResponsiveValue,
  ResponsiveValue,
} from '../../utilities/css';
import type {ResponsiveProp} from '../../utilities/css';
import {Box, BoxProps} from '../Box';

type ColumnsAlias = 'oneThird' | 'oneHalf' | 'twoThirds';
type ColumnsType = number | string | ColumnsAlias[];
type Columns = ResponsiveProp<ColumnsType>;
type Gap = ResponsiveProp<SpacingSpaceScale>;
type ColumnsAlignItems = 'start' | 'end' | 'center';

export interface ColumnsProps
  extends React.AriaAttributes,
    Pick<
      BoxProps,
      | 'padding'
      | 'paddingBlockEnd'
      | 'paddingBlockStart'
      | 'paddingInlineEnd'
      | 'paddingInlineStart'
    > {
  children?: React.ReactNode;
  /** The number of columns to display. Accepts either a single value or an object of values for different screen sizes.
   * @example
   * columns={6}
   * columns={{xs: 1, sm: 1, md: 3, lg: 6, xl: 6}}
   */
  columns?: Columns;
  /** The spacing between children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * gap='2'
   * gap={{xs: '1', sm: '2', md: '3', lg: '4', xl: '5'}}
   */
  gap?: Gap;
  /** Vertical alignment of children. If not set, inline elements will stretch to the height of the parent.
   * @example
   * alignItems='start'
   */
  alignItems?: ColumnsAlignItems;
}

export function Columns({
  children,
  columns,
  gap,
  alignItems,
  ...boxProps
}: ColumnsProps) {
  const style = {
    ...getResponsiveValue(
      'columns',
      'grid-template-columns',
      formatColumns(columns),
    ),
    ...getResponsiveProps('columns', 'gap', 'space', gap),
    '--pc-columns-align-items': alignItems,
  } as React.CSSProperties;

  return (
    <Box
      layout={{
        component: 'Columns',
        customProperties: style,
      }}
      {...boxProps}
    >
      {children}
    </Box>
  );
}

function formatColumns(columns?: Columns): ResponsiveValue {
  if (
    typeof columns === 'object' &&
    columns !== null &&
    !Array.isArray(columns)
  ) {
    return Object.fromEntries(
      Object.entries(columns).map(([breakpointAlias, breakpointColumns]) => [
        breakpointAlias,
        getColumnValue(breakpointColumns),
      ]),
    );
  }

  return getColumnValue(columns);
}

function getColumnValue(columns?: ColumnsType) {
  if (!columns) return undefined;

  if (typeof columns === 'string') return columns;

  if (typeof columns === 'number') {
    return `repeat(${columns}, minmax(0, 1fr))`;
  }

  return columns
    .map((column) => {
      switch (column) {
        case 'oneThird':
          return 'minmax(0, 1fr)';
        case 'oneHalf':
          return 'minmax(0, 1fr)';
        case 'twoThirds':
          return 'minmax(0, 2fr)';
      }
    })
    .join(' ');
}
