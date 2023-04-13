import type {
  BreakpointsAlias,
  ColorBackgroundAlias,
  BorderRadiusScale,
  SpacingSpaceScale,
} from '@shopify/polaris-tokens';
import React from 'react';

import {useBreakpoints} from '../../utilities/breakpoints';
import type {ResponsiveProp} from '../../utilities/css';
import {Box} from '../Box';

type Spacing = ResponsiveProp<SpacingSpaceScale>;

export interface AlphaCardProps {
  children?: React.ReactNode;
  /** Background color
   * @default 'bg'
   */
  background?: ColorBackgroundAlias;
  /** The spacing around the card
   * @default {xs: '4', sm: '5'}
   * @example
   * padding='4'
   * padding={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  padding?: Spacing;
  /** Border radius value above a set breakpoint */
  roundedAbove?: BreakpointsAlias;
}

export const AlphaCard = ({
  children,
  background = 'bg',
  padding = {xs: '4', sm: '5'},
  roundedAbove,
}: AlphaCardProps) => {
  const breakpoints = useBreakpoints();
  const defaultBorderRadius: BorderRadiusScale = '2';

  let hasBorderRadius = !roundedAbove;

  if (roundedAbove && breakpoints[`${roundedAbove}Up`]) {
    hasBorderRadius = true;
  }

  return (
    <Box
      background={background}
      padding={padding}
      shadow="md"
      borderRadius={hasBorderRadius ? defaultBorderRadius : undefined}
      overflowX="hidden"
      overflowY="hidden"
    >
      {children}
    </Box>
  );
};
