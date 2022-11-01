import type {
  BreakpointsAlias,
  ColorsTokenName,
  ShapeBorderRadiusScale,
  SpacingSpaceScale,
} from '@shopify/polaris-tokens';
import React from 'react';

import {useBreakpoints} from '../../utilities/breakpoints';
import {Box} from '../Box';

type CardBackgroundColorTokenScale = Extract<
  ColorsTokenName,
  'surface' | 'surface-subdued'
>;

export interface AlphaCardProps {
  /** Elements to display inside card */
  children?: React.ReactNode;
  /** Background color
   * @default 'surface'
   */
  background?: CardBackgroundColorTokenScale;
  /** The spacing around the card
   * @default '5'
   */
  padding?: SpacingSpaceScale;
  /** Border radius value above a set breakpoint */
  roundedAbove?: BreakpointsAlias;
}

export const AlphaCard = ({
  children,
  background = 'surface',
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
      shadow="card"
      {...(hasBorderRadius && {borderRadius: defaultBorderRadius})}
    >
      {children}
    </Box>
  );
};
