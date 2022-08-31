import React, {createElement, forwardRef, ReactNode} from 'react';
import type {colors, depth, shape, spacing} from '@shopify/polaris-tokens';

import {classNames} from '../../utilities/css';

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
  bottomLeft: BorderRadiusTokenScale | '';
  bottomRight: BorderRadiusTokenScale | '';
  topLeft: BorderRadiusTokenScale | '';
  topRight: BorderRadiusTokenScale | '';
}

type SpacingTokenGroup = typeof spacing;
type SpacingTokenName = keyof SpacingTokenGroup;

// TODO: Bring this logic into tokens
type SpacingTokenScale = SpacingTokenName extends `space-${infer Scale}`
  ? Scale
  : never;

interface Spacing {
  bottom: SpacingTokenScale | '';
  left: SpacingTokenScale | '';
  right: SpacingTokenScale | '';
  top: SpacingTokenScale | '';
}

export interface BoxBaseProps {
  as?: 'div' | 'span';
  /** Background color of the Box */
  background?: BackgroundColorTokenScale;
  /** Border styling of the Box */
  border?: BorderTokenScale | '';
  /** Bottom border styling of the Box */
  borderBottom?: BorderTokenScale | '';
  /** Left border styling of the Box */
  borderLeft?: BorderTokenScale | '';
  /** Right border styling of the Box */
  borderRight?: BorderTokenScale | '';
  /** Top border styling of the Box */
  borderTop?: BorderTokenScale | '';
  /** Border radius of the Box */
  borderRadius?: BorderRadiusTokenScale | '';
  /** Bottom left border radius of the Box */
  borderRadiusBottomLeft?: BorderRadiusTokenScale | '';
  /** Bottom right border radius of the Box */
  borderRadiusBottomRight?: BorderRadiusTokenScale | '';
  /** Top left border radius of the Box */
  borderRadiusTopLeft?: BorderRadiusTokenScale | '';
  /** Top right border radius of the Box */
  borderRadiusTopRight?: BorderRadiusTokenScale | '';
  /** Inner content of the Box */
  children: ReactNode;
  /** Spacing outside of the Box */
  margin?: SpacingTokenScale | '';
  /** Bottom spacing outside of the Box */
  marginBottom?: SpacingTokenScale | '';
  /** Left side spacing outside of the Box */
  marginLeft?: SpacingTokenScale | '';
  /** Right side spacing outside of the Box */
  marginRight?: SpacingTokenScale | '';
  /** Top spacing outside of the Box */
  marginTop?: SpacingTokenScale | '';
  /** Spacing inside of the Box */
  padding?: SpacingTokenScale | '';
  /** Bottom spacing inside of the Box */
  paddingBottom?: SpacingTokenScale | '';
  /** Left side spacing inside of the Box */
  paddingLeft?: SpacingTokenScale | '';
  /** Right side spacing inside of the Box */
  paddingRight?: SpacingTokenScale | '';
  /** Top spacing inside of the Box */
  paddingTop?: SpacingTokenScale | '';
  /** Shadow on the Box */
  shadow?: DepthTokenScale;
}

export const Box = forwardRef<HTMLElement, BoxBaseProps>(
  (
    {
      as = 'div',
      background,
      border = '',
      borderBottom = '',
      borderLeft = '',
      borderRight = '',
      borderTop = '',
      borderRadius = '',
      borderRadiusBottomLeft = '',
      borderRadiusBottomRight = '',
      borderRadiusTopLeft = '',
      borderRadiusTopRight = '',
      children,
      margin = '',
      marginBottom = '',
      marginLeft = '',
      marginRight = '',
      marginTop = '',
      padding = '',
      paddingBottom = '',
      paddingLeft = '',
      paddingRight = '',
      paddingTop = '',
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
      '--pc-box-background': background ? `var(--p-${background})` : '',
      '--pc-box-margin-bottom': margins.bottom
        ? `var(--p-space-${margins.bottom})`
        : '',
      '--pc-box-margin-left': margins.left
        ? `var(--p-space-${margins.left})`
        : '',
      '--pc-box-margin-right': margins.right
        ? `var(--p-space-${margins.right})`
        : '',
      '--pc-box-margin-top': margins.top ? `var(--p-space-${margins.top})` : '',
      '--pc-box-padding-bottom': paddings.bottom
        ? `var(--p-space-${paddings.bottom})`
        : '',
      '--pc-box-padding-left': paddings.left
        ? `var(--p-space-${paddings.left})`
        : '',
      '--pc-box-padding-right': paddings.right
        ? `var(--p-space-${paddings.right})`
        : '',
      '--pc-box-padding-top': paddings.top
        ? `var(--p-space-${paddings.top})`
        : '',
      '--pc-box-border-bottom': borders.bottom
        ? `var(--p-border-${borders.bottom})`
        : '',
      '--pc-box-border-left': borders.left
        ? `var(--p-border-${borders.left})`
        : '',
      '--pc-box-border-right': borders.right
        ? `var(--p-border-${borders.right})`
        : '',
      '--pc-box-border-top': borders.top
        ? `var(--p-border-${borders.top})`
        : '',
      '--pc-box-border-radius-bottom-left': borderRadiuses.bottomLeft
        ? `var(--p-border-radius-${borderRadiuses.bottomLeft})`
        : '',
      '--pc-box-border-radius-bottom-right': borderRadiuses.bottomRight
        ? `var(--p-border-radius-${borderRadiuses.bottomRight})`
        : '',
      '--pc-box-border-radius-top-left': borderRadiuses.topLeft
        ? `var(--p-border-radius-${borderRadiuses.topLeft})`
        : '',
      '--pc-box-border-radius-top-right': borderRadiuses.topRight
        ? `var(--p-border-radius-${borderRadiuses.topRight})`
        : '',
      '--pc-box-shadow': shadow ? `var(--p-shadow-${shadow})` : '',
    } as React.CSSProperties;

    const className = classNames(styles.Box);

    return createElement(
      as,
      {
        className,
        style,
        ref,
      },
      children,
    );
  },
);

Box.displayName = 'Box';
