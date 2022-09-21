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

export interface AlphaCardProps {
  /** Elements to display inside card */
  children?: React.ReactNode;
  backgroundColor?: CardBackgroundColorTokenScale;
  borderRadius?: BorderRadiusTokenScale;
  elevation?: CardElevationTokensScale;
  padding?: SpacingTokenScale;
}

export const AlphaCard = ({
  children,
  backgroundColor = 'surface',
  borderRadius = '2',
  elevation = 'card',
  padding = '5',
}: AlphaCardProps) => {
  const {smUp} = useBreakpoints();

  return (
    <Box
      background={backgroundColor}
      padding={padding}
      shadow={elevation}
      {...(smUp ? {borderRadius} : {})}
    >
      {children}
    </Box>
  );
};
