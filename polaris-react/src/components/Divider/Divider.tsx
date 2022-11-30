import React from 'react';
import type {ShapeBorderWidthScale} from '@shopify/polaris-tokens';

import {Box} from '../Box';

export type BorderTokenAlias =
  | 'base'
  | 'dark'
  | 'divider'
  | 'divider-on-dark'
  | 'transparent';

export interface DividerProps {
  /** Divider style */
  border?: BorderTokenAlias;
  /** Divider width */
  width?: ShapeBorderWidthScale;
}

export const Divider = ({border, width}: DividerProps) => {
  return (
    <Box
      borderBlockStart={border}
      borderBlockStartWidth={width}
      borderBlockEnd="transparent"
    />
  );
};
