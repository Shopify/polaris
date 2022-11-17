import React, {createElement, forwardRef} from 'react';
import type {
  ColorsActionTokenAlias,
  ColorsBackdropTokenAlias,
  ColorsBackgroundTokenAlias,
  ColorsOverlayTokenAlias,
  ColorsSurfaceTokenAlias,
  ShapeBorderWidthScale,
  DepthShadowAlias,
  SpacingSpaceScale,
} from '@shopify/polaris-tokens';

import {
  getResponsiveProps,
  ResponsiveProp,
  classNames,
  sanitizeCustomProperties,
} from '../../utilities/css';

import styles from './Box.scss';

type Element = 'div' | 'span' | 'section';

type Overflow = 'hidden' | 'scroll';

export type ColorTokenScale =
  | 'text'
  | 'text-critical'
  | 'text-disabled'
  | 'text-highlight'
  | 'text-on-critical'
  | 'text-on-dark'
  | 'text-on-interactive'
  | 'text-on-primary'
  | 'text-primary'
  | 'text-primary-hovered'
  | 'text-primary-pressed'
  | 'text-subdued'
  | 'text-subdued-on-dark'
  | 'text-success'
  | 'text-warning';

export type BorderTokenAlias =
  | 'base'
  | 'dark'
  | 'divider'
  | 'divider-on-dark'
  | 'transparent';

type Spacing = ResponsiveProp<SpacingSpaceScale>;

export type BorderRadiusTokenScale =
  | '05'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | 'base'
  | 'large'
  | 'half';

export type BackgroundColors =
  | ColorsBackdropTokenAlias
  | ColorsBackgroundTokenAlias
  | ColorsOverlayTokenAlias
  | ColorsActionTokenAlias
  | ColorsSurfaceTokenAlias;

export interface BoxProps {
  /** HTML Element type */
  as?: Element;
  /** Background color */
  background?: BackgroundColors;
  /** Border style */
  border?: BorderTokenAlias;
  /** Vertical end border style */
  borderBlockEnd?: BorderTokenAlias;
  /** Horizontal start border style */
  borderInlineStart?: BorderTokenAlias;
  /** Horizontal end border style */
  borderInlineEnd?: BorderTokenAlias;
  /** Vertical start border style */
  borderBlockStart?: BorderTokenAlias;
  /** Border radius */
  borderRadius?: BorderRadiusTokenScale;
  /** Vertical end horizontal start border radius */
  borderRadiusEndStart?: BorderRadiusTokenScale;
  /** Vertical end horizontal end border radius */
  borderRadiusEndEnd?: BorderRadiusTokenScale;
  /** Vertical start horizontal start border radius */
  borderRadiusStartStart?: BorderRadiusTokenScale;
  /** Verital start horizontal end border radius */
  borderRadiusStartEnd?: BorderRadiusTokenScale;
  /** Border color */
  borderColor?: ColorTokenScale;
  /** Border width */
  borderWidth?: ShapeBorderWidthScale;
  /** Vertical start border width */
  borderBlockStartWidth?: ShapeBorderWidthScale;
  /** Vertical end border width */
  borderBlockEndWidth?: ShapeBorderWidthScale;
  /** Horizontal start border width */
  borderInlineStartWidth?: ShapeBorderWidthScale;
  /** Horizontal end border width */
  borderInlineEndWidth?: ShapeBorderWidthScale;
  /** Color of children */
  color?: ColorTokenScale;
  /** HTML id attribute */
  id?: string;
  /** Minimum height of container */
  minHeight?: string;
  /** Minimum width of container */
  minWidth?: string;
  /** Maximum width of container */
  maxWidth?: string;
  /** Clip horizontal content of children */
  overflowX?: Overflow;
  /** Clip vertical content of children */
  overflowY?: Overflow;
  /** Spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * padding='4'
   * padding={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  padding?: Spacing;
  /** Vertical start spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * paddingBlockStart='4'
   * paddingBlockStart={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  paddingBlockStart?: Spacing;
  /** Vertical end spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * paddingBlockEnd='4'
   * paddingBlockEnd={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  paddingBlockEnd?: Spacing;
  /** Horizontal start spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * paddingInlineStart='4'
   * paddingInlineStart={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  paddingInlineStart?: Spacing;
  /** Horizontal end spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * paddingInlineEnd='4'
   * paddingInlineEnd={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  paddingInlineEnd?: Spacing;
  /** Shadow */
  shadow?: DepthShadowAlias;
  /** Width of container */
  width?: string;
  /** Elements to display inside box */
  children?: React.ReactNode;
  // These could be moved to new layout component(s) in the future
  /** Position of the box */
  position?: 'relative' | 'absolute' | 'fixed' | 'sticky';
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  opacity?: string;
  visuallyHidden?: boolean;
  zIndex?: string;
}

export const Box = forwardRef<HTMLElement, BoxProps>(
  (
    {
      as = 'div',
      background,
      border,
      borderBlockEnd,
      borderInlineStart,
      borderInlineEnd,
      borderBlockStart,
      borderColor,
      borderWidth,
      borderBlockStartWidth,
      borderBlockEndWidth,
      borderInlineStartWidth,
      borderInlineEndWidth,
      borderRadius,
      borderRadiusEndStart,
      borderRadiusEndEnd,
      borderRadiusStartStart,
      borderRadiusStartEnd,
      children,
      color,
      id,
      minHeight,
      minWidth,
      maxWidth,
      overflowX,
      overflowY,
      padding,
      paddingBlockStart,
      paddingBlockEnd,
      paddingInlineStart,
      paddingInlineEnd,
      shadow,
      width,
      visuallyHidden,
      position,
      top,
      right,
      bottom,
      left,
      zIndex,
      opacity,
    },
    ref,
  ) => {
    const style = {
      '--pc-box-color': color ? `var(--p-${color})` : undefined,
      '--pc-box-background': background ? `var(--p-${background})` : undefined,
      '--pc-box-border': border ? `var(--p-border-${border})` : undefined,
      '--pc-box-border-block-end': borderBlockEnd
        ? `var(--p-border-${borderBlockEnd})`
        : undefined,
      '--pc-box-border-inline-start': borderInlineStart
        ? `var(--p-border-${borderInlineStart})`
        : undefined,
      '--pc-box-border-inline-end': borderInlineEnd
        ? `var(--p-border-${borderInlineEnd})`
        : undefined,
      '--pc-box-border-block-start': borderBlockStart
        ? `var(--p-border-${borderBlockStart})`
        : undefined,
      '--pc-box-border-radius': borderRadius
        ? `var(--p-border-radius-${borderRadius})`
        : undefined,
      '--pc-box-border-radius-end-start': borderRadiusEndStart
        ? `var(--p-border-radius-${borderRadiusEndStart})`
        : undefined,
      '--pc-box-border-radius-end-end': borderRadiusEndEnd
        ? `var(--p-border-radius-${borderRadiusEndEnd})`
        : undefined,
      '--pc-box-border-radius-start-start': borderRadiusStartStart
        ? `var(--p-border-radius-${borderRadiusStartStart})`
        : undefined,
      '--pc-box-border-radius-start-end': borderRadiusStartEnd
        ? `var(--p-border-radius-${borderRadiusStartEnd})`
        : undefined,
      '--pc-box-border-color': borderColor
        ? `var(--p-${borderColor})`
        : undefined,
      '--pc-box-border-width': borderWidth
        ? `var(--p-border-width-${borderWidth})`
        : undefined,
      '--pc-box-border-block-start-width': borderBlockStartWidth
        ? `var(--p-border-width-${borderBlockStartWidth})`
        : undefined,
      '--pc-box-border-block-end-width': borderBlockEndWidth
        ? `var(--p-border-width-${borderBlockEndWidth})`
        : undefined,
      '--pc-box-border-inline-start-width': borderInlineStartWidth
        ? `var(--p-border-width-${borderInlineStartWidth})`
        : undefined,
      '--pc-box-border-inline-end-width': borderInlineEndWidth
        ? `var(--p-border-width-${borderInlineEndWidth})`
        : undefined,
      '--pc-box-min-height': minHeight,
      '--pc-box-min-width': minWidth,
      '--pc-box-max-width': maxWidth,
      '--pc-box-overflow-x': overflowX,
      '--pc-box-overflow-y': overflowY,
      ...getResponsiveProps('box', 'padding', 'space', padding),
      ...getResponsiveProps(
        'box',
        'padding-block-end',
        'space',
        paddingBlockEnd,
      ),
      ...getResponsiveProps(
        'box',
        'padding-block-start',
        'space',
        paddingBlockStart,
      ),
      ...getResponsiveProps(
        'box',
        'padding-inline-start',
        'space',
        paddingInlineStart,
      ),
      ...getResponsiveProps(
        'box',
        'padding-inline-end',
        'space',
        paddingInlineEnd,
      ),
      '--pc-box-shadow': shadow ? `var(--p-shadow-${shadow})` : undefined,
      '--pc-box-width': width,
      position,
      top,
      right,
      bottom,
      left,
      zIndex,
      opacity,
    } as React.CSSProperties;

    const className = classNames(
      styles.Box,
      visuallyHidden && styles.visuallyHidden,
    );

    return createElement(
      as,
      {
        className,
        id,
        ref,
        style: sanitizeCustomProperties(style),
      },
      children,
    );
  },
);

Box.displayName = 'Box';
