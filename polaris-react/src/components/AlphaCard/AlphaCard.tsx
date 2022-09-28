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
  'surface' | 'surface-subdued'
>;

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AlphaCardProps {
  /** Elements to display inside card */
  children?: React.ReactNode;
  backgroundColor?: CardBackgroundColorTokenScale;
  hasBorderRadius?: boolean;
  elevation?: CardElevationTokensScale;
  padding?: SpacingTokenScale;
  roundedAbove?: Breakpoint;
}

export const AlphaCard = ({
  children,
  backgroundColor = 'surface',
  hasBorderRadius: hasBorderRadiusProp = true,
  elevation = 'card',
  padding = '5',
  roundedAbove,
}: AlphaCardProps) => {
  const breakpoints = useBreakpoints();
  const defaultBorderRadius = '2' as BorderRadiusTokenScale;

  let hasBorderRadius = !roundedAbove && hasBorderRadiusProp;

  if (roundedAbove && breakpoints[`${roundedAbove}Up`]) {
    hasBorderRadius = true;
  }

  return (
    <Box
      background={backgroundColor}
      padding={padding}
      shadow={elevation}
      {...(hasBorderRadius && {borderRadius: defaultBorderRadius})}
    >
      {children}
    </Box>
  );
};
