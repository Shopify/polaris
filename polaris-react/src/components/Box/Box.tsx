import React, {forwardRef} from 'react';
import type {
  ColorBorderAlias,
  BorderWidthScale,
  BorderRadiusScale,
  ShadowAlias,
  color,
  spacing,
} from '@shopify/polaris-tokens';

import {classNames, sanitizeCustomProperties} from '../../utilities/css';

import type {ResponsiveValue} from './Box.css';
import {mapResponsiveValue, atoms} from './Box.css';
import styles from './Box.scss';

type Element = 'div' | 'span' | 'section' | 'legend' | 'ul' | 'li';
type LineStyles = 'solid' | 'dashed';
type Overflow = 'hidden' | 'scroll';
type Position = 'relative' | 'absolute' | 'fixed' | 'sticky';

export interface BoxProps extends React.AriaAttributes {
  children?: React.ReactNode;
  /** HTML Element type
   * @default 'div'
   */
  as?: Element;
  /** Background color */
  background?: keyof typeof color;
  /** Border color */
  borderColor?: ColorBorderAlias | 'transparent';
  /** Border style */
  borderStyle?: LineStyles;
  /** Border radius */
  borderRadius?: BorderRadiusScale;
  /** Vertical end horizontal start border radius */
  borderRadiusEndStart?: BorderRadiusScale;
  /** Vertical end horizontal end border radius */
  borderRadiusEndEnd?: BorderRadiusScale;
  /** Vertical start horizontal start border radius */
  borderRadiusStartStart?: BorderRadiusScale;
  /** Vertical start horizontal end border radius */
  borderRadiusStartEnd?: BorderRadiusScale;
  /** Border width */
  borderWidth?: BorderWidthScale;
  /** Vertical start border width */
  borderBlockStartWidth?: BorderWidthScale;
  /** Vertical end border width */
  borderBlockEndWidth?: BorderWidthScale;
  /** Horizontal start border width */
  borderInlineStartWidth?: BorderWidthScale;
  /** Horizontal end border width */
  borderInlineEndWidth?: BorderWidthScale;
  /** Color of children */
  color?: keyof typeof color;
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
  padding?: ResponsiveValue<keyof typeof spacing>;
  /** Vertical start spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * paddingBlockStart='4'
   * paddingBlockStart={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  paddingBlockStart?: ResponsiveValue<keyof typeof spacing>;
  /** Vertical end spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * paddingBlockEnd='4'
   * paddingBlockEnd={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  paddingBlockEnd?: ResponsiveValue<keyof typeof spacing>;
  /** Horizontal start spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * paddingInlineStart='4'
   * paddingInlineStart={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  paddingInline?: ResponsiveValue<keyof typeof spacing>;
  paddingBlock?: ResponsiveValue<keyof typeof spacing>;
  paddingInlineStart?: ResponsiveValue<keyof typeof spacing>;
  /** Horizontal end spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * paddingInlineEnd='4'
   * paddingInlineEnd={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  paddingInlineEnd?: ResponsiveValue<keyof typeof spacing>;
  /** Aria role */
  role?: Extract<
    React.AriaRole,
    'status' | 'presentation' | 'menu' | 'listbox' | 'combobox'
  >;
  /** Shadow on box */
  shadow?: ShadowAlias;
  /** Set tab order */
  tabIndex?: Extract<React.AllHTMLAttributes<HTMLElement>['tabIndex'], number>;
  /** Width of container */
  width?: string;
  // These could be moved to new layout component(s) in the future
  /** Position of box */
  position?: Position;
  /** Top position of box */
  insetBlockStart?: ResponsiveValue<keyof typeof spacing>;
  /** Bottom position of box */
  insetBlockEnd?: ResponsiveValue<keyof typeof spacing>;
  /** Left position of box */
  insetInlineStart?: ResponsiveValue<keyof typeof spacing>;
  /** Right position of box */
  insetInlineEnd?: ResponsiveValue<keyof typeof spacing>;
  /** Opacity of box */
  opacity?: string;
  /** Outline color */
  outlineColor?: ColorBorderAlias;
  /** Outline style */
  outlineStyle?: LineStyles;
  /** Outline width */
  outlineWidth?: BorderWidthScale;
  /** Visually hide the contents during print */
  printHidden?: boolean;
  /** Visually hide the contents (still announced by screenreader) */
  visuallyHidden?: boolean;
  /** z-index of box */
  zIndex?: string;
}

export const Box = forwardRef<HTMLElement, BoxProps>(
  (
    {
      as = 'div',
      background,
      borderColor,
      borderStyle,
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
      outlineColor,
      outlineStyle,
      outlineWidth,
      padding,
      paddingBlock,
      paddingInline,
      paddingBlockStart,
      paddingBlockEnd,
      paddingInlineStart,
      paddingInlineEnd,
      role,
      shadow,
      tabIndex,
      width,
      printHidden,
      visuallyHidden,
      position,
      insetBlockStart,
      insetBlockEnd,
      insetInlineStart,
      insetInlineEnd,
      zIndex,
      opacity,
      ...restProps
    },
    ref,
  ) => {
    // eslint-disable-next-line no-nested-ternary
    const borderStyleValue = borderStyle
      ? borderStyle
      : borderColor ||
        borderWidth ||
        borderBlockStartWidth ||
        borderBlockEndWidth ||
        borderInlineStartWidth ||
        borderInlineEndWidth
      ? 'solid'
      : undefined;

    // eslint-disable-next-line no-nested-ternary
    const outlineStyleValue = outlineStyle
      ? outlineStyle
      : outlineColor || outlineWidth
      ? 'solid'
      : undefined;

    const atomicClasses = atoms({
      background,
      color,
      padding: padding
        ? mapResponsiveValue(padding, (value) => value)
        : undefined,
      paddingInline: paddingInline
        ? mapResponsiveValue(paddingInline, (value) => value ?? padding)
        : undefined,
      paddingBlock: paddingBlock
        ? mapResponsiveValue(paddingBlock, (value) => value ?? padding)
        : undefined,
      paddingInlineStart: paddingInlineStart
        ? mapResponsiveValue(paddingInlineStart, (value) => value ?? padding)
        : undefined,
      paddingInlineEnd: paddingInlineEnd
        ? mapResponsiveValue(paddingInlineEnd, (value) => value ?? padding)
        : undefined,
      paddingBlockStart: paddingBlockStart
        ? mapResponsiveValue(paddingBlockStart, (value) => value ?? padding)
        : undefined,
      paddingBlockEnd: paddingBlockEnd
        ? mapResponsiveValue(paddingBlockEnd, (value) => value ?? padding)
        : undefined,
    });

    const style = {
      // eslint-disable-next-line no-nested-ternary
      '--pc-box-border-color': borderColor
        ? borderColor === 'transparent'
          ? 'transparent'
          : `var(--p-color-${borderColor})`
        : undefined,
      '--pc-box-border-style': borderStyleValue,
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
      '--pc-box-outline-color': outlineColor
        ? `var(--p-color-${outlineColor})`
        : undefined,
      '--pc-box-outline-style': outlineStyleValue,
      '--pc-box-outline-width': outlineWidth
        ? `var(--p-border-width-${outlineWidth})`
        : undefined,
      '--pc-box-shadow': shadow ? `var(--p-shadow-${shadow})` : undefined,
      '--pc-box-width': width,
      position,
      zIndex,
      opacity,
    } as React.CSSProperties;

    const className = classNames(
      atomicClasses,
      visuallyHidden && styles.visuallyHidden,
      printHidden && styles.printHidden,
      as === 'ul' && styles.listReset,
    );

    return React.createElement(
      as,
      {
        className,
        id,
        ref,
        style: sanitizeCustomProperties(style),
        role,
        tabIndex,
        ...restProps,
      },
      children,
    );
  },
);

Box.displayName = 'Box';
