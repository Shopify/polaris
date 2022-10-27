import React, {createElement, forwardRef, PropsWithChildren} from 'react';
import type {
  DepthShadowAlias,
  SpacingSpaceScale,
} from '@shopify/polaris-tokens';

import {classNames, sanitizeCustomProperties} from '../../utilities/css';

import styles from './Box.scss';

type Element = 'div' | 'span' | 'section';

type Overflow = 'hidden' | 'scroll';

export type BackgroundColorTokenScale =
  | 'action-critical'
  | 'action-critical-depressed'
  | 'action-critical-disabled'
  | 'action-critical-hovered'
  | 'action-critical-pressed'
  | 'action-primary'
  | 'action-primary-depressed'
  | 'action-primary-disabled'
  | 'action-primary-hovered'
  | 'action-primary-pressed'
  | 'action-secondary'
  | 'action-secondary-depressed'
  | 'action-secondary-disabled'
  | 'action-secondary-hovered'
  | 'action-secondary-hovered-dark'
  | 'action-secondary-pressed'
  | 'action-secondary-pressed-dark'
  | 'backdrop'
  | 'background'
  | 'background-hovered'
  | 'background-pressed'
  | 'background-selected'
  | 'overlay'
  | 'surface'
  | 'surface-attention'
  | 'surface-critical'
  | 'surface-critical-subdued'
  | 'surface-critical-subdued-depressed'
  | 'surface-critical-subdued-hovered'
  | 'surface-critical-subdued-pressed'
  | 'surface-dark'
  | 'surface-depressed'
  | 'surface-disabled'
  | 'surface-highlight'
  | 'surface-highlight-subdued'
  | 'surface-highlight-subdued-hovered'
  | 'surface-highlight-subdued-pressed'
  | 'surface-hovered'
  | 'surface-hovered-dark'
  | 'surface-neutral'
  | 'surface-neutral-disabled'
  | 'surface-neutral-hovered'
  | 'surface-neutral-pressed'
  | 'surface-neutral-subdued'
  | 'surface-neutral-subdued-dark'
  | 'surface-pressed'
  | 'surface-pressed-dark'
  | 'surface-primary-selected'
  | 'surface-primary-selected-hovered'
  | 'surface-primary-selected-pressed'
  | 'surface-search-field'
  | 'surface-search-field-dark'
  | 'surface-selected'
  | 'surface-selected-hovered'
  | 'surface-selected-pressed'
  | 'surface-subdued'
  | 'surface-success'
  | 'surface-success-subdued'
  | 'surface-success-subdued-hovered'
  | 'surface-success-subdued-pressed'
  | 'surface-warning'
  | 'surface-warning-subdued'
  | 'surface-warning-subdued-hovered'
  | 'surface-warning-subdued-pressed';

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

export interface BoxProps extends PropsWithChildren {
  /** HTML Element type */
  as?: Element;
  /** Background color */
  background?: BackgroundColorTokenScale;
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
      '--pc-box-border-bottom': borders.blockEnd
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
