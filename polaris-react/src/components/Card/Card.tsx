import type {
  BreakpointsAlias,
  ColorBackgroundAlias,
  BorderRadiusScale,
  SpaceScale,
} from '@shopify/polaris-tokens';
import React from 'react';

import {useBreakpoints} from '../../utilities/breakpoints';
import type {ResponsiveProp} from '../../utilities/css';
import {Box} from '../Box';
import {ShadowBevel} from '../ShadowBevel';
import {WithinContentContext} from '../../utilities/within-content-context';

type Spacing = ResponsiveProp<SpaceScale>;

export interface CardProps {
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

export const Card = ({
  children,
  background = 'bg',
  padding = {xs: '4'},
  roundedAbove,
}: CardProps) => {
  const breakpoints = useBreakpoints();
  const defaultBorderRadius: BorderRadiusScale = '3';

  let hasBorderRadius = !roundedAbove;

  if (roundedAbove && breakpoints[`${roundedAbove}Up`]) {
    hasBorderRadius = true;
  }

  return (
    <WithinContentContext.Provider value>
      <ShadowBevel
        boxShadow="xs"
        borderRadius={hasBorderRadius ? defaultBorderRadius : '0-experimental'}
        zIndex="32"
      >
        <Box
          background={background}
          padding={padding}
          overflowX="hidden"
          overflowY="hidden"
          minHeight="100%"
        >
          {children}
        </Box>
      </ShadowBevel>
    </WithinContentContext.Provider>
  );
};
