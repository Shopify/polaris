import React from 'react';

import {Grid} from '../../../Grid';
import type {CellProps} from '../../../Grid';

export interface SectionProps {
  children?: React.ReactNode;
  oneThird?: boolean;
  oneHalf?: boolean;
  twoThirds?: boolean;
}

export function Section({
  children,
  oneHalf,
  oneThird,
  twoThirds,
}: SectionProps) {
  const gridProps: CellProps = {
    columnSpan: {xs: 6, lg: 12},
    ...(oneHalf && {columnSpan: {xs: 6, lg: 6}}),
    ...(oneThird && {columnSpan: {xs: 6, lg: 4}}),
    ...(twoThirds && {columnSpan: {xs: 6, lg: 8}}),
  };

  return <Grid.Cell {...gridProps}>{children}</Grid.Cell>;
}
