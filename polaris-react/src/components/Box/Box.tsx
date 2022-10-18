import React, {createElement, forwardRef, PropsWithChildren} from 'react';
import type {
  DepthShadowAlias,
  SpacingSpaceScale,
} from '@shopify/polaris-tokens';

import {classNames, sanitizeCustomProperties} from '../../utilities/css';

import styles from './Box.scss';

type Element = 'div' | 'span';

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
  bottom: BorderTokenAlias;
  left: BorderTokenAlias;
  right: BorderTokenAlias;
  top: BorderTokenAlias;
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
  bottomLeft: BorderRadiusTokenScale;
  bottomRight: BorderRadiusTokenScale;
  topLeft: BorderRadiusTokenScale;
  topRight: BorderRadiusTokenScale;
}

interface Spacing {
  bottom: SpacingSpaceScale;
  left: SpacingSpaceScale;
  right: SpacingSpaceScale;
  top: SpacingSpaceScale;
}

export interface BoxProps extends PropsWithChildren {
  /** HTML Element type */
  as?: Element;
  /** Background color */
  background?: BackgroundColorTokenScale;
  /** Border style */
  border?: BorderTokenAlias;
  /** Bottom border style */
  borderBottom?: BorderTokenAlias;
  /** Left border style */
  borderLeft?: BorderTokenAlias;
  /** Right border style */
  borderRight?: BorderTokenAlias;
  /** Top border style */
  borderTop?: BorderTokenAlias;
  /** Border radius */
  borderRadius?: BorderRadiusTokenScale;
  /** Bottom left border radius */
  borderRadiusBottomLeft?: BorderRadiusTokenScale;
  /** Bottom right border radius */
  borderRadiusBottomRight?: BorderRadiusTokenScale;
  /** Top left border radius */
  borderRadiusTopLeft?: BorderRadiusTokenScale;
  /** Top right border radius */
  borderRadiusTopRight?: BorderRadiusTokenScale;
  /** Color of children */
  color?: ColorTokenScale;
  /** HTML id attribute */
  id?: string;
  /** Set maximum width of container */
  maxWidth?: string;
  /** Clip horizontal content of children */
  overflowX?: Overflow;
  /** Clip vertical content of children */
  overflowY?: Overflow;
  /** Spacing around children */
  padding?: SpacingSpaceScale;
  /** Bottom spacing around children */
  paddingBottom?: SpacingSpaceScale;
  /** Left spacing around children */
  paddingLeft?: SpacingSpaceScale;
  /** Right spacing around children */
  paddingRight?: SpacingSpaceScale;
  /** Top spacing around children */
  paddingTop?: SpacingSpaceScale;
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
      borderBottom,
      borderLeft,
      borderRight,
      borderTop,
      borderRadius,
      borderRadiusBottomLeft,
      borderRadiusBottomRight,
      borderRadiusTopLeft,
      borderRadiusTopRight,
      children,
      color,
      id,
      maxWidth,
      overflowX,
      overflowY,
      padding,
      paddingBottom,
      paddingLeft,
      paddingRight,
      paddingTop,
      shadow,
      width,
    },
    ref,
  ) => {
    const borders = {
      bottom: borderBottom ? borderBottom : border,
      left: borderLeft ? borderLeft : border,
      right: borderRight ? borderRight : border,
      top: borderTop ? borderTop : border,
    } as Border;

    const borderRadiuses = {
      bottomLeft: borderRadiusBottomLeft
        ? borderRadiusBottomLeft
        : borderRadius,
      bottomRight: borderRadiusBottomRight
        ? borderRadiusBottomRight
        : borderRadius,
      topLeft: borderRadiusTopLeft ? borderRadiusTopLeft : borderRadius,
      topRight: borderRadiusTopRight ? borderRadiusTopRight : borderRadius,
    } as BorderRadius;

    const paddings = {
      bottom: paddingBottom ? paddingBottom : padding,
      left: paddingLeft ? paddingLeft : padding,
      right: paddingRight ? paddingRight : padding,
      top: paddingTop ? paddingTop : padding,
    } as Spacing;

    const style = {
      '--pc-box-color': color ? `var(--p-${color})` : undefined,
      '--pc-box-background': background ? `var(--p-${background})` : undefined,
      '--pc-box-border-bottom': borders.bottom
        ? `var(--p-border-${borders.bottom})`
        : undefined,
      '--pc-box-border-left': borders.left
        ? `var(--p-border-${borders.left})`
        : undefined,
      '--pc-box-border-right': borders.right
        ? `var(--p-border-${borders.right})`
        : undefined,
      '--pc-box-border-top': borders.top
        ? `var(--p-border-${borders.top})`
        : undefined,
      '--pc-box-border-radius-bottom-left': borderRadiuses.bottomLeft
        ? `var(--p-border-radius-${borderRadiuses.bottomLeft})`
        : undefined,
      '--pc-box-border-radius-bottom-right': borderRadiuses.bottomRight
        ? `var(--p-border-radius-${borderRadiuses.bottomRight})`
        : undefined,
      '--pc-box-border-radius-top-left': borderRadiuses.topLeft
        ? `var(--p-border-radius-${borderRadiuses.topLeft})`
        : undefined,
      '--pc-box-border-radius-top-right': borderRadiuses.topRight
        ? `var(--p-border-radius-${borderRadiuses.topRight})`
        : undefined,
      '--pc-box-max-width': maxWidth ?? undefined,
      '--pc-box-overflow-x': overflowX ?? undefined,
      '--pc-box-overflow-y': overflowY ?? undefined,
      '--pc-box-padding-bottom': paddings.bottom
        ? `var(--p-space-${paddings.bottom})`
        : undefined,
      '--pc-box-padding-left': paddings.left
        ? `var(--p-space-${paddings.left})`
        : undefined,
      '--pc-box-padding-right': paddings.right
        ? `var(--p-space-${paddings.right})`
        : undefined,
      '--pc-box-padding-top': paddings.top
        ? `var(--p-space-${paddings.top})`
        : undefined,
      '--pc-box-shadow': shadow ? `var(--p-shadow-${shadow})` : undefined,
      '--pc-box-width': width ?? undefined,
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
