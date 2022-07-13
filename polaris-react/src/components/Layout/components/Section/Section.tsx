import React from 'react';

import {Grid} from '../../../Grid';
import type {CellProps} from '../../../Grid';

interface NonMutuallyExclusiveProps {
  condensed?: boolean;
  children?: React.ReactNode;
}

type SectionProps = NonMutuallyExclusiveProps &
  (
    | {oneHalf?: true; oneThird?: never; twoThirds?: never}
    | {oneHalf?: never; oneThird?: true; twoThirds?: never}
    | {oneHalf?: never; oneThird?: never; twoThirds?: true}
  );

export function Section({
  children,
  oneHalf,
  oneThird,
  twoThirds,
  condensed,
}: SectionProps) {
  const gridProps: CellProps = {
    columnSpan: {xs: 6, lg: 12},
    ...(oneHalf && {columnSpan: {xs: 6, lg: 6}}),
    ...(oneHalf && condensed && {columnSpan: {xs: 6, md: 3, lg: 6}}),
    ...(oneThird && {columnSpan: {xs: 6, lg: 4}}),
    ...(oneThird && condensed && {columnSpan: {xs: 6, md: 2, lg: 4}}),
    ...(twoThirds && {columnSpan: {xs: 6, lg: 8}}),
    ...(twoThirds && condensed && {columnSpan: {xs: 6, md: 4, lg: 8}}),
  };

  return <Grid.Cell {...gridProps}>{children}</Grid.Cell>;
}
