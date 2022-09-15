import React, {createElement, forwardRef, ReactNode} from 'react';
import type {colors, depth, shape, spacing} from '@shopify/polaris-tokens';

import {sanitizeCustomProperties} from '../../utilities/css';

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
      '--pc-box-background': background ? `var(--p-${background})` : 'initial',
      '--pc-box-shadow': shadow ? `var(--p-shadow-${shadow})` : 'initial',
      ...generateProperties('border', borders),
      ...generateProperties('border-radius', borderRadiuses),
      ...generateProperties('margin', margins, 'space'),
      ...generateProperties('padding', paddings, 'space'),
    } as React.CSSProperties;

    return createElement(
      as,
      {
        className: styles.Box,
        style: sanitizeCustomProperties(style),
        ref,
      },
      children,
    );
  },
);

Box.displayName = 'Box';

function generateProperties(
  groupName: string,
  properties: {[key: string]: string},
  type?: string,
) {
  return Object.entries(properties).reduce((acc, [property, value]) => {
    acc[`--pc-box-${groupName}-${kebabCase(property)}`] = value
      ? `var(--p-${type ?? groupName}-${value})`
      : 'initial';
    return acc;
  }, {} as {[key: string]: string});
}

function kebabCase(string: string) {
  return string.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}
