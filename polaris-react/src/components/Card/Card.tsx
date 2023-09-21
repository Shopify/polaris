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
import {useFeatures} from '../../utilities/features';
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
  padding = {xs: '4', sm: '5'},
  roundedAbove,
}: CardProps) => {
  const breakpoints = useBreakpoints();
  const {polarisSummerEditions2023} = useFeatures();
  const defaultBorderRadius: BorderRadiusScale = polarisSummerEditions2023
    ? '3'
    : '2';

  const isDefaultPadding =
    typeof padding !== 'string' &&
    padding?.xs === '4' &&
    padding?.sm === '5' &&
    padding.md === undefined &&
    padding.lg === undefined &&
    padding.xl === undefined;

  const finalPadding: CardProps['padding'] =
    isDefaultPadding && polarisSummerEditions2023 ? {xs: '4'} : padding;

  let hasBorderRadius = !roundedAbove;

  if (roundedAbove && breakpoints[`${roundedAbove}Up`]) {
    hasBorderRadius = true;
  }

  return (
    <WithinContentContext.Provider value>
      {polarisSummerEditions2023 ? (
        <ShadowBevel
          boxShadow="xs"
          borderRadius={hasBorderRadius ? '3' : '0-experimental'}
          zIndex="32"
        >
          <Box
            background={background}
            padding={finalPadding}
            overflowX="hidden"
            overflowY="hidden"
            minHeight="100%"
          >
            {children}
          </Box>
        </ShadowBevel>
      ) : (
        <Box
          background={background}
          padding={finalPadding}
          shadow="md"
          borderRadius={hasBorderRadius ? defaultBorderRadius : undefined}
          overflowX="hidden"
          overflowY="hidden"
        >
          {children}
        </Box>
      )}
    </WithinContentContext.Provider>
  );
};
