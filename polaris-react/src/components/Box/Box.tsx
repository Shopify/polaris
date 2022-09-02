import React, {createElement, forwardRef, ReactNode} from 'react';
import type {colors, depth, shape, spacing} from '@shopify/polaris-tokens';

import {classNames, sanitizeCustomProperties} from '../../utilities/css';

import styles from './Box.scss';

type ColorsTokenGroup = typeof colors;
type ColorsTokenName = keyof ColorsTokenGroup;
type BackgroundColorTokenScale = Extract<
  ColorsTokenName,
  | 'background'
  | `background-${string}`
  | 'surface'
  | `surface-${string}`
  | 'backdrop'
  | 'overlay'
>;

type DepthTokenGroup = typeof depth;
type DepthTokenName = keyof DepthTokenGroup;
type ShadowsTokenName = Exclude<DepthTokenName, `shadows-${string}`>;

type DepthTokenScale = ShadowsTokenName extends `shadow-${infer Scale}`
  ? Scale
  : never;

type ShapeTokenGroup = typeof shape;
type ShapeTokenName = keyof ShapeTokenGroup;

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

type SpacingTokenGroup = typeof spacing;
type SpacingTokenName = keyof SpacingTokenGroup;

// TODO: Bring this logic into tokens
type SpacingTokenScale = SpacingTokenName extends `space-${infer Scale}`
  ? Scale
  : never;

interface Spacing {
  bottom: SpacingTokenScale;
  left: SpacingTokenScale;
  right: SpacingTokenScale;
  top: SpacingTokenScale;
}

export interface BoxProps {
  as?: 'div' | 'span';
  /** Background color of the Box */
  background?: BackgroundColorTokenScale;
  /** Border styling of the Box */
  border?: BorderTokenScale;
  /** Bottom border styling of the Box */
  borderBottom?: BorderTokenScale;
  /** Left border styling of the Box */
  borderLeft?: BorderTokenScale;
  /** Right border styling of the Box */
  borderRight?: BorderTokenScale;
  /** Top border styling of the Box */
  borderTop?: BorderTokenScale;
  /** Border radius of the Box */
  borderRadius?: BorderRadiusTokenScale;
  /** Bottom left border radius of the Box */
  borderRadiusBottomLeft?: BorderRadiusTokenScale;
  /** Bottom right border radius of the Box */
  borderRadiusBottomRight?: BorderRadiusTokenScale;
  /** Top left border radius of the Box */
  borderRadiusTopLeft?: BorderRadiusTokenScale;
  /** Top right border radius of the Box */
  borderRadiusTopRight?: BorderRadiusTokenScale;
  /** Inner content of the Box */
  children: ReactNode;
  /** Spacing outside of the Box */
  margin?: SpacingTokenScale;
  /** Bottom spacing outside of the Box */
  marginBottom?: SpacingTokenScale;
  /** Left side spacing outside of the Box */
  marginLeft?: SpacingTokenScale;
  /** Right side spacing outside of the Box */
  marginRight?: SpacingTokenScale;
  /** Top spacing outside of the Box */
  marginTop?: SpacingTokenScale;
  /** Spacing inside of the Box */
  padding?: SpacingTokenScale;
  /** Bottom spacing inside of the Box */
  paddingBottom?: SpacingTokenScale;
  /** Left side spacing inside of the Box */
  paddingLeft?: SpacingTokenScale;
  /** Right side spacing inside of the Box */
  paddingRight?: SpacingTokenScale;
  /** Top spacing inside of the Box */
  paddingTop?: SpacingTokenScale;
  /** Shadow on the Box */
  shadow?: DepthTokenScale;
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
      margin,
      marginBottom,
      marginLeft,
      marginRight,
      marginTop,
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

    const margins = {
      bottom: marginBottom ? marginBottom : margin,
      left: marginLeft ? marginLeft : margin,
      right: marginRight ? marginRight : margin,
      top: marginTop ? marginTop : margin,
    } as Spacing;

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
      ...(margins.bottom
        ? {'--pc-box-margin-bottom': `var(--p-space-${margins.bottom})`}
        : undefined),
      ...(margins.left
        ? {'--pc-box-margin-left': `var(--p-space-${margins.left})`}
        : undefined),
      ...(margins.right
        ? {'--pc-box-margin-right': `var(--p-space-${margins.right})`}
        : undefined),
      ...(margins.top
        ? {'--pc-box-margin-top': `var(--p-space-${margins.top})`}
        : undefined),
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
        style: sanitizeCustomProperties(style),
        ref,
      },
      children,
    );
  },
);

Box.displayName = 'Box';
