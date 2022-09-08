import React, {createElement, forwardRef, ReactNode} from 'react';
import type {colors, depth, shape, spacing} from '@shopify/polaris-tokens';

import {classNames, sanitizeCustomProperties} from '../../utilities/css';

import styles from './Box.scss';

type Element = 'div' | 'span' | 'button';

// TODO: Bring logic to extract token values into `polaris-tokens`
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
  /** Used to indicate the element is being modified */
  ariaBusy?: boolean;
  /** Used to identify the ID of the element that describes Box */
  ariaDescribedBy?: string;
  /** Used to identify the Id of element used as aria-labelledby */
  ariaLabelledBy?: string;
  /** Used to indicate the element will be updated */
  ariaLive?: string;
  /** Used to describe the semantic element type */
  ariaRoleType?: string;
  /** HTML Element type */
  as?: Element;
  /** Background color */
  background?: BackgroundColorTokenScale;
  /** Border styling */
  border?: BorderTokenScale;
  /** Bottom border styling */
  borderBottom?: BorderTokenScale;
  /** Left border styling */
  borderLeft?: BorderTokenScale;
  /** Right border styling */
  borderRight?: BorderTokenScale;
  /** Top border styling */
  borderTop?: BorderTokenScale;
  /** Border radius styling */
  borderRadius?: BorderRadiusTokenScale;
  /** Bottom left border radius styling */
  borderRadiusBottomLeft?: BorderRadiusTokenScale;
  /** Bottom right border radius styling */
  borderRadiusBottomRight?: BorderRadiusTokenScale;
  /** Top left border radius styling */
  borderRadiusTopLeft?: BorderRadiusTokenScale;
  /** Top right border radius styling */
  borderRadiusTopRight?: BorderRadiusTokenScale;
  /** Inner content of the Box */
  children: ReactNode;
  /** A custom class name to apply styles to the Box */
  className?: string;
  /** Set disabled state on the Box */
  disabled?: boolean;
  /** A unique identifier */
  id?: string;
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
  /** Shadow styling */
  shadow?: DepthTokenScale;
  /** Used to indicate the element is focusable in sequential order */
  tabIndex?: number;
  /** Callback triggered when focus is removed */
  onBlur?(event: React.FocusEvent<HTMLElement>): void;
  /** Callback triggered on click */
  onClick?(event: React.MouseEvent<HTMLElement>): void;
  /** Callback triggered on key up */
  onKeyUp?(event: React.KeyboardEvent<HTMLElement>): void;
  /** Callback triggered on mouse up */
  onMouseUp?(event: React.MouseEvent<HTMLElement>): void;
}

export const Box = forwardRef<HTMLElement, BoxProps>(
  (
    {
      ariaBusy,
      ariaDescribedBy,
      ariaLabelledBy,
      ariaLive,
      ariaRoleType,
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
      className,
      children,
      disabled = false,
      id,
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
      tabIndex,
      onBlur,
      onClick,
      onKeyUp,
      onMouseUp,
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

    const boxClassName = classNames(styles.Box, className && className);

    return createElement(
      as,
      {
        className: boxClassName,
        'aria-busy': ariaBusy,
        'aria-describedby': ariaDescribedBy,
        'aria-labelledby': ariaLabelledBy,
        'aria-live': ariaLive,
        role: ariaRoleType,
        disabled,
        id,
        ref,
        style: sanitizeCustomProperties(style),
        tabIndex,
        ...(onBlur ? {onBlur} : undefined),
        ...(onClick ? {onClick} : undefined),
        ...(onKeyUp ? {onKeyUp} : undefined),
        ...(onMouseUp ? {onMouseUp} : undefined),
      },
      children,
    );
  },
);

Box.displayName = 'Box';
