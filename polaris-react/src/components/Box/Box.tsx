import React, {createElement, forwardRef, ReactNode} from 'react';
import type {
  ColorsTokenName,
  DepthShadowAlias,
  ShapeTokenName,
  SpacingSpaceScale,
} from '@shopify/polaris-tokens';

import {classNames, sanitizeCustomProperties} from '../../utilities/css';

import styles from './Box.scss';

type BackgroundColorTokenScale = Extract<
  ColorsTokenName,
  | 'background'
  | `background-${string}`
  | 'surface'
  | `surface-${string}`
  | 'backdrop'
  | 'overlay'
  | `action-${string}`
>;
type ColorTokenScale = Extract<ColorsTokenName, 'text' | `text-${string}`>;

type BorderShapeTokenScale = ShapeTokenName extends `border-${infer Scale}`
  ? Scale
  : never;
type BorderTokenScale = Exclude<
  BorderShapeTokenScale,
  `radius-${string}` | `width-${string}`
>;

interface Border {
  bottom: BorderTokenScale;
  left: BorderTokenScale;
  right: BorderTokenScale;
  top: BorderTokenScale;
}

type BorderRadiusTokenScale = Extract<
  BorderShapeTokenScale,
  `radius-${string}`
> extends `radius-${infer Scale}`
  ? Scale
  : never;

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

type Element = 'div' | 'span';

export interface BoxProps {
  /** HTML Element type */
  as?: Element;
  /** Background color */
  background?: BackgroundColorTokenScale;
  /** Border style */
  border?: BorderTokenScale;
  /** Bottom border style */
  borderBottom?: BorderTokenScale;
  /** Left border style */
  borderLeft?: BorderTokenScale;
  /** Right border style */
  borderRight?: BorderTokenScale;
  /** Top border style */
  borderTop?: BorderTokenScale;
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
  /** Inner content */
  children: ReactNode;
  /** Color of children */
  color?: ColorTokenScale;
  /** HTML id attribute */
  id?: string;
  /** Spacing outside of container */
  maxWidth?: string;
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
      padding,
      paddingBottom,
      paddingLeft,
      paddingRight,
      paddingTop,
      shadow,
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
      ...(background
        ? {'--pc-box-background': `var(--p-${background})`}
        : undefined),
      ...(borders.bottom
        ? {'--pc-box-border-bottom': `var(--p-border-${borders.bottom})`}
        : undefined),
      ...(borders.left
        ? {'--pc-box-border-left': `var(--p-border-${borders.left})`}
        : undefined),
      ...(borders.right
        ? {'--pc-box-border-right': `var(--p-border-${borders.right})`}
        : undefined),
      ...(borders.top
        ? {'--pc-box-border-top': `var(--p-border-${borders.top})`}
        : undefined),
      ...(borderRadiuses.bottomLeft
        ? {
            '--pc-box-border-radius-bottom-left': `var(--p-border-radius-${borderRadiuses.bottomLeft})`,
          }
        : undefined),
      ...(borderRadiuses.bottomRight
        ? {
            '--pc-box-border-radius-bottom-right': `var(--p-border-radius-${borderRadiuses.bottomRight})`,
          }
        : undefined),
      ...(borderRadiuses.topLeft
        ? {
            '--pc-box-border-radius-top-left': `var(--p-border-radius-${borderRadiuses.topLeft})`,
          }
        : undefined),
      ...(borderRadiuses.topRight
        ? {
            '--pc-box-border-radius-top-right': `var(--p-border-radius-${borderRadiuses.topRight})`,
          }
        : undefined),
      ...(color ? {'--pc-box-color': `var(--p-${color})`} : undefined),
      ...(maxWidth ? {'--pc-box-max-width': `${maxWidth}px`} : undefined),
      ...(paddings.bottom
        ? {'--pc-box-padding-bottom': `var(--p-space-${paddings.bottom})`}
        : undefined),
      ...(paddings.left
        ? {'--pc-box-padding-left': `var(--p-space-${paddings.left})`}
        : undefined),
      ...(paddings.right
        ? {'--pc-box-padding-right': `var(--p-space-${paddings.right})`}
        : undefined),
      ...(paddings.top
        ? {'--pc-box-padding-top': `var(--p-space-${paddings.top})`}
        : undefined),
      ...(shadow
        ? {'--pc-box-shadow': `var(--p-shadow-${shadow})`}
        : undefined),
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
