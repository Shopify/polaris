import React, {forwardRef} from 'react';
import type {
  ColorTextAlias,
  ColorBackgroundAlias,
  ColorBorderAlias,
  BorderWidthScale,
  BorderRadiusAliasOrScale,
  ShadowAliasOrScale,
  SpaceScale,
} from '@shopify/polaris-tokens';

import {
  getResponsiveProps,
  getResponsiveValue,
  mapResponsivePropValues,
  createPolarisCSSVar,
  classNames,
  sanitizeCustomProperties,
} from '../../utilities/css';
import type {ResponsiveProp, UnwrapResponsiveProp} from '../../utilities/css';

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
  background?: ResponsiveProp<ColorBackgroundAlias>;
  /** Border color */
  borderColor?: ResponsiveProp<ColorBorderAlias | 'transparent'>;
  /** Border style */
  borderStyle?: ResponsiveProp<LineStyles>;
  /** Border radius */
  borderRadius?: ResponsiveProp<BorderRadiusAliasOrScale>;
  /** Vertical end horizontal start border radius */
  borderEndStartRadius?: ResponsiveProp<BorderRadiusAliasOrScale>;
  /** Vertical end horizontal end border radius */
  borderEndEndRadius?: ResponsiveProp<BorderRadiusAliasOrScale>;
  /** Vertical start horizontal start border radius */
  borderStartStartRadius?: ResponsiveProp<BorderRadiusAliasOrScale>;
  /** Vertical start horizontal end border radius */
  borderStartEndRadius?: ResponsiveProp<BorderRadiusAliasOrScale>;
  /** Border width */
  borderWidth?: ResponsiveProp<BorderWidthScale>;
  /** Vertical start border width */
  borderBlockStartWidth?: ResponsiveProp<BorderWidthScale>;
  /** Vertical end border width */
  borderBlockEndWidth?: ResponsiveProp<BorderWidthScale>;
  /** Horizontal start border width */
  borderInlineStartWidth?: ResponsiveProp<BorderWidthScale>;
  /** Horizontal end border width */
  borderInlineEndWidth?: ResponsiveProp<BorderWidthScale>;
  /** Color of children */
  color?: ResponsiveProp<ColorTextAlias>;
  /** HTML id attribute */
  id?: string;
  /** Minimum height of container */
  minHeight?: ResponsiveProp;
  /** Minimum width of container */
  minWidth?: ResponsiveProp;
  /** Maximum width of container */
  maxWidth?: ResponsiveProp;
  /** Clip horizontal content of children */
  overflowX?: ResponsiveProp<Overflow>;
  /** Clip vertical content of children */
  overflowY?: ResponsiveProp<Overflow>;
  /** ResponsiveProp<SpaceScale> around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * padding='400'
   * padding={{xs: '200', sm: '300', md: '400', lg: '500', xl: '600'}}
   */
  padding?: ResponsiveProp<SpaceScale>;
  /** Vertical start spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * paddingBlockStart='400'
   * paddingBlockStart={{xs: '200', sm: '300', md: '400', lg: '500', xl: '600'}}
   */
  paddingBlockStart?: ResponsiveProp<SpaceScale>;
  /** Vertical end spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * paddingBlockEnd='400'
   * paddingBlockEnd={{xs: '200', sm: '300', md: '400', lg: '500', xl: '600'}}
   */
  paddingBlockEnd?: ResponsiveProp<SpaceScale>;
  /** Horizontal start spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * paddingInlineStart='400'
   * paddingInlineStart={{xs: '200', sm: '300', md: '400', lg: '500', xl: '600'}}
   */
  paddingInlineStart?: ResponsiveProp<SpaceScale>;
  /** Horizontal end spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * paddingInlineEnd='400'
   * paddingInlineEnd={{xs: '200', sm: '300', md: '400', lg: '500', xl: '600'}}
   */
  paddingInlineEnd?: ResponsiveProp<SpaceScale>;
  /** Aria role */
  role?: Extract<
    React.AriaRole,
    'status' | 'presentation' | 'menu' | 'listbox' | 'combobox'
  >;
  /** Shadow on box */
  shadow?: ResponsiveProp<ShadowAliasOrScale>;
  /** Set tab order */
  tabIndex?: Extract<React.AllHTMLAttributes<HTMLElement>['tabIndex'], number>;
  /** Width of container */
  width?: ResponsiveProp;
  // These could be moved to new layout component(s) in the future
  /** Position of box */
  position?: ResponsiveProp<Position>;
  /** Top position of box */
  insetBlockStart?: ResponsiveProp<SpaceScale>;
  /** Bottom position of box */
  insetBlockEnd?: ResponsiveProp<SpaceScale>;
  /** Left position of box */
  insetInlineStart?: ResponsiveProp<SpaceScale>;
  /** Right position of box */
  insetInlineEnd?: ResponsiveProp<SpaceScale>;
  /** Opacity of box */
  opacity?: ResponsiveProp;
  /** Outline color */
  outlineColor?: ResponsiveProp<ColorBorderAlias>;
  /** Outline style */
  outlineStyle?: ResponsiveProp<LineStyles>;
  /** Outline width */
  outlineWidth?: ResponsiveProp<BorderWidthScale>;
  /** Visually hide the contents during print */
  printHidden?: boolean;
  /** Visually hide the contents (still announced by screenreader) */
  visuallyHidden?: boolean;
  /** z-index of box */
  zIndex?: ResponsiveProp;
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
      borderEndStartRadius,
      borderEndEndRadius,
      borderStartStartRadius,
      borderStartEndRadius,
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
    const mapBorderStyle = (
      value: UnwrapResponsiveProp<BoxProps['borderStyle']>,
    ) => {
      // NOTE: Check for null / undefined here as other falsey values may be
      // valid
      // TODO: Make this responsive-aware so it only sets a value if borders are set for the current breakpoint
      // eslint-disable-next-line no-nested-ternary
      return value != null
        ? value
        : borderColor ||
          borderWidth ||
          borderBlockStartWidth ||
          borderBlockEndWidth ||
          borderInlineStartWidth ||
          borderInlineEndWidth
        ? 'solid'
        : undefined;
    };

    const mapOutlineStyle = (
      value: UnwrapResponsiveProp<BoxProps['outlineStyle']>,
    ) => {
      // NOTE: Check for null / undefined here as other falsey values may be
      // valid
      // TODO: Make this responsive-aware so it only sets a value if borders are set for the current breakpoint
      // eslint-disable-next-line no-nested-ternary
      return value != null
        ? value
        : outlineColor || outlineWidth
        ? 'solid'
        : undefined;
    };

    const mapBorderColor = (
      value: UnwrapResponsiveProp<BoxProps['borderColor']>,
    ) => {
      // ignore null & undefined
      if (value == null) {
        return value;
      }
      return value === 'transparent'
        ? 'transparent'
        : createPolarisCSSVar('color', value);
    };

    // prettier-ignore
    const style = {
      ...getResponsiveProps('box', 'background', 'color', background),
      ...getResponsiveProps('box', 'border-block-end-width', 'border-width', borderBlockEndWidth || borderWidth,),
      ...getResponsiveProps('box', 'border-block-start-width', 'border-width', borderBlockStartWidth || borderWidth,),
      ...getResponsiveValue('box', 'border-color', mapResponsivePropValues(borderColor, mapBorderColor)),
      ...getResponsiveProps('box', 'border-end-end-radius', 'border-radius', borderEndEndRadius || borderRadius,),
      ...getResponsiveProps('box', 'border-end-start-radius', 'border-radius', borderEndStartRadius || borderRadius,),
      ...getResponsiveProps('box', 'border-inline-end-width', 'border-width', borderInlineEndWidth || borderWidth,),
      ...getResponsiveProps('box', 'border-inline-start-width', 'border-width', borderInlineStartWidth || borderWidth,),
      ...getResponsiveProps('box', 'border-start-end-radius', 'border-radius', borderStartEndRadius || borderRadius,),
      ...getResponsiveProps('box', 'border-start-start-radius', 'border-radius', borderStartStartRadius || borderRadius,),
      ...getResponsiveValue('box', 'border-style', mapResponsivePropValues(borderStyle, mapBorderStyle)),
      ...getResponsiveProps('box', 'color', 'color', color),
      ...getResponsiveProps('box', 'inset-block-end', 'space', insetBlockEnd),
      ...getResponsiveProps('box', 'inset-block-start', 'space', insetBlockStart,),
      ...getResponsiveProps('box', 'inset-inline-end', 'space', insetInlineEnd),
      ...getResponsiveProps('box', 'inset-inline-start', 'space', insetInlineStart,),
      ...getResponsiveValue('box', 'max-width', maxWidth),
      ...getResponsiveValue('box', 'min-height', minHeight),
      ...getResponsiveValue('box', 'min-width', minWidth),
      ...getResponsiveProps('box', 'outline-color', 'color', outlineColor),
      ...getResponsiveValue('box', 'outline-style', mapResponsivePropValues(outlineStyle, mapOutlineStyle)),
      ...getResponsiveProps('box', 'outline-width', 'border-width', outlineWidth,),
      ...getResponsiveValue('box', 'overflow-x', overflowX),
      ...getResponsiveValue('box', 'overflow-y', overflowY),
      ...getResponsiveProps('box', 'padding-block-end', 'space', paddingBlockEnd || padding,),
      ...getResponsiveProps('box', 'padding-block-start', 'space', paddingBlockStart || padding,),
      ...getResponsiveProps('box', 'padding-inline-end', 'space', paddingInlineEnd || padding,),
      ...getResponsiveProps('box', 'padding-inline-start', 'space', paddingInlineStart || padding,),
      ...getResponsiveProps('box', 'shadow', 'shadow', shadow),
      ...getResponsiveValue('box', 'width', width),
      ...getResponsiveValue('box', 'position', position),
      ...getResponsiveValue('box', 'z-index', zIndex),
      ...getResponsiveValue('box', 'opacity', opacity),
    } as React.CSSProperties;

    const className = classNames(
      styles.Box,
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
