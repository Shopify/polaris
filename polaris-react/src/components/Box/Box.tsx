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

import {classNames, sanitizeCustomProperties} from '../../utilities/css';

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

interface Border {
  blockStart: BorderTokenAlias;
  blockEnd: BorderTokenAlias;
  inlineStart: BorderTokenAlias;
  inlineEnd: BorderTokenAlias;
}

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

type BackgroundColors =
  | ColorsBackdropTokenAlias
  | ColorsBackgroundTokenAlias
  | ColorsOverlayTokenAlias
  | ColorsActionTokenAlias
  | ColorsSurfaceTokenAlias;

interface BorderRadius {
  startStart: BorderRadiusTokenScale;
  startEnd: BorderRadiusTokenScale;
  endStart: BorderRadiusTokenScale;
  endEnd: BorderRadiusTokenScale;
}

interface Spacing {
  blockStart: SpacingSpaceScale;
  blockEnd: SpacingSpaceScale;
  inlineStart: SpacingSpaceScale;
  inlineEnd: SpacingSpaceScale;
}

interface BorderWidth {
  blockStart: ShapeBorderWidthScale;
  blockEnd: ShapeBorderWidthScale;
  inlineStart: ShapeBorderWidthScale;
  inlineEnd: ShapeBorderWidthScale;
}

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
  /** Set minimum height of container */
  minHeight?: string;
  /** Set minimum width of container */
  minWidth?: string;
  /** Set maximum width of container */
  maxWidth?: string;
  /** Clip horizontal content of children */
  overflowX?: Overflow;
  /** Clip vertical content of children */
  overflowY?: Overflow;
  /** Spacing around children */
  padding?: SpacingSpaceScale;
  /** Vertical start spacing around children */
  paddingBlockStart?: SpacingSpaceScale;
  /** Vertical end spacing around children */
  paddingBlockEnd?: SpacingSpaceScale;
  /** Horizontal start spacing around children */
  paddingInlineStart?: SpacingSpaceScale;
  /** Horizontal end spacing around children */
  paddingInlineEnd?: SpacingSpaceScale;
  /** Shadow */
  shadow?: DepthShadowAlias;
  /** Set width of container */
  width?: string;
  /** Elements to display inside box */
  children?: React.ReactNode;
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
    },
    ref,
  ) => {
    const borders = {
      blockEnd: borderBlockEnd,
      inlineStart: borderInlineStart,
      inlineEnd: borderInlineEnd,
      blockStart: borderBlockStart,
    } as Border;

    const borderRadiuses = {
      endStart: borderRadiusEndStart,
      endEnd: borderRadiusEndEnd,
      startStart: borderRadiusStartStart,
      startEnd: borderRadiusStartEnd,
    } as BorderRadius;

    const borderWidths = {
      blockStart: borderBlockStartWidth,
      blockEnd: borderBlockEndWidth,
      inlineStart: borderInlineStartWidth,
      inlineEnd: borderInlineEndWidth,
    } as BorderWidth;

    const paddings = {
      blockEnd: paddingBlockEnd,
      inlineStart: paddingInlineStart,
      inlineEnd: paddingInlineEnd,
      blockStart: paddingBlockStart,
    } as Spacing;

    const style = {
      '--pc-box-color': color ? `var(--p-${color})` : undefined,
      '--pc-box-background': background ? `var(--p-${background})` : undefined,
      '--pc-box-border': border ? `var(--p-border-${border})` : undefined,
      '--pc-box-border-block-end': borders.blockEnd
        ? `var(--p-border-${borders.blockEnd})`
        : undefined,
      '--pc-box-border-inline-start': borders.inlineStart
        ? `var(--p-border-${borders.inlineStart})`
        : undefined,
      '--pc-box-border-inline-end': borders.inlineEnd
        ? `var(--p-border-${borders.inlineEnd})`
        : undefined,
      '--pc-box-border-block-start': borders.blockStart
        ? `var(--p-border-${borders.blockStart})`
        : undefined,
      '--pc-box-border-radius': borderRadius
        ? `var(--p-border-radius-${borderRadius})`
        : undefined,
      '--pc-box-border-radius-end-start': borderRadiuses.endStart
        ? `var(--p-border-radius-${borderRadiuses.endStart})`
        : undefined,
      '--pc-box-border-radius-end-end': borderRadiuses.endEnd
        ? `var(--p-border-radius-${borderRadiuses.endEnd})`
        : undefined,
      '--pc-box-border-radius-start-start': borderRadiuses.startStart
        ? `var(--p-border-radius-${borderRadiuses.startStart})`
        : undefined,
      '--pc-box-border-radius-start-end': borderRadiuses.startEnd
        ? `var(--p-border-radius-${borderRadiuses.startEnd})`
        : undefined,
      '--pc-box-border-width': borderWidth
        ? `var(--p-border-width-${borderWidth})`
        : undefined,
      '--pc-box-border-block-start-width': borderWidths.blockStart
        ? `var(--p-border-width-${borderWidths.blockStart})`
        : undefined,
      '--pc-box-border-block-end-width': borderWidths.blockEnd
        ? `var(--p-border-width-${borderWidths.blockEnd})`
        : undefined,
      '--pc-box-border-inline-start-width': borderWidths.inlineStart
        ? `var(--p-border-width-${borderWidths.inlineStart})`
        : undefined,
      '--pc-box-border-inline-end-width': borderWidths.inlineEnd
        ? `var(--p-border-width-${borderWidths.inlineEnd})`
        : undefined,
      '--pc-box-min-height': minHeight,
      '--pc-box-min-width': minWidth,
      '--pc-box-max-width': maxWidth,
      '--pc-box-overflow-x': overflowX,
      '--pc-box-overflow-y': overflowY,
      '--pc-box-padding': padding ? `var(--p-space-${padding})` : undefined,
      '--pc-box-padding-block-end': paddings.blockEnd
        ? `var(--p-space-${paddings.blockEnd})`
        : undefined,
      '--pc-box-padding-inline-start': paddings.inlineStart
        ? `var(--p-space-${paddings.inlineStart})`
        : undefined,
      '--pc-box-padding-inline-end': paddings.inlineEnd
        ? `var(--p-space-${paddings.inlineEnd})`
        : undefined,
      '--pc-box-padding-block-start': paddings.blockStart
        ? `var(--p-space-${paddings.blockStart})`
        : undefined,
      '--pc-box-shadow': shadow ? `var(--p-shadow-${shadow})` : undefined,
      '--pc-box-width': width,
    } as React.CSSProperties;

    const className = classNames(styles.Box);

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
