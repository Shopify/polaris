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

type CardShadowTokensScale = Extract<DepthShadowAlias, 'card' | 'transparent'>;

type CardBackgroundColorTokenScale = Extract<
  ColorsTokenName,
  'surface' | 'surface-subdued'
>;

export interface AlphaCardProps {
  /** Elements to display inside card */
  children?: React.ReactNode;
  background?: CardBackgroundColorTokenScale;
  shadow?: CardShadowTokensScale;
  padding?: SpacingSpaceScale;
  roundedAbove?: BreakpointsAlias;
}

export const AlphaCard = ({
  children,
  background = 'surface',
  shadow = 'card',
  padding = '5',
  roundedAbove,
}: AlphaCardProps) => {
  const breakpoints = useBreakpoints();
  const defaultBorderRadius = '2' as ShapeBorderRadiusScale;

  let hasBorderRadius = !roundedAbove;

  if (roundedAbove && breakpoints[`${roundedAbove}Up`]) {
    hasBorderRadius = true;
  }

  return (
    <Box
      background={background}
      padding={padding}
      shadow={shadow}
      {...(hasBorderRadius && {borderRadius: defaultBorderRadius})}
    >
      {children}
    </Box>
  );
};
