import React from 'react';

import {useBreakpoints} from '../../utilities/breakpoints';
// These should come from polaris-tokens eventually, see #7164
import {
  BackgroundColorTokenScale,
  BorderRadiusTokenScale,
  Box,
  DepthTokenScale,
  SpacingTokenScale,
} from '../Box';

type CardElevationTokensScale = Extract<
  DepthTokenScale,
  'card' | 'transparent'
>;

type CardBackgroundColorTokenScale = Extract<
  BackgroundColorTokenScale,
  'surface' | `surface-${string}`
>;

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AlphaCardProps {
  /** Elements to display inside card */
  children?: React.ReactNode;
  backgroundColor?: CardBackgroundColorTokenScale;
  borderRadius?: BorderRadiusTokenScale;
  elevation?: CardElevationTokensScale;
  padding?: SpacingTokenScale;
  roundedAbove?: Breakpoint;
}

const defaultBorderRadius = '2';

export const AlphaCard = ({
  children,
  backgroundColor = 'surface',
  borderRadius: borderRadiusProp = defaultBorderRadius,
  elevation = 'card',
  padding = '5',
  roundedAbove,
}: AlphaCardProps) => {
  const breakpoints = useBreakpoints();

  let borderRadius = !roundedAbove ? borderRadiusProp : null;

  if (roundedAbove && breakpoints[`${roundedAbove}Up`]) {
    borderRadius = borderRadiusProp;
  }

  return (
    <Box
      background={backgroundColor}
      padding={padding}
      shadow={elevation}
      {...(borderRadius && {borderRadius})}
    >
      {children}
    </Box>
  );
};
