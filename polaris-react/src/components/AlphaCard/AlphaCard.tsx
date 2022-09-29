import type {
  BreakpointsAlias,
  ColorsTokenName,
  DepthShadowAlias,
  ShapeBorderRadiusScale,
  SpacingSpaceScale,
} from '@shopify/polaris-tokens';
import React from 'react';

import {useBreakpoints} from '../../utilities/breakpoints';
import {Box} from '../Box';

type CardElevationTokensScale = Extract<
  DepthShadowAlias,
  'card' | 'transparent'
>;

type CardBackgroundColorTokenScale = Extract<
  ColorsTokenName,
  'surface' | 'surface-subdued'
>;

export interface AlphaCardProps {
  /** Elements to display inside card */
  children?: React.ReactNode;
  backgroundColor?: CardBackgroundColorTokenScale;
  hasBorderRadius?: boolean;
  elevation?: CardElevationTokensScale;
  padding?: SpacingSpaceScale;
  roundedAbove?: BreakpointsAlias;
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
  const defaultBorderRadius = '2' as ShapeBorderRadiusScale;

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
