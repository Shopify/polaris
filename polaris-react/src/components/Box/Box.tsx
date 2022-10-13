import React, {createElement, forwardRef, ReactNode} from 'react';
import type {
  DepthShadowAlias,
  SpacingSpaceScale,
} from '@shopify/polaris-tokens';

import {classNames, sanitizeCustomProperties} from '../../utilities/css';

import styles from './Box.scss';

type Element = 'div' | 'span';

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

export interface BoxProps {
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
