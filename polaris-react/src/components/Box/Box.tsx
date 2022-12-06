import React, {createElement, forwardRef} from 'react';
import type {
  ColorsActionTokenAlias,
  ColorsBackdropTokenAlias,
  ColorsBackgroundTokenAlias,
  ColorsOverlayTokenAlias,
  ColorsSurfaceTokenAlias,
  ShapeBorderWidthScale,
  DepthShadowAlias,
  SpacingSpaceScale,
  BreakpointsAlias,
} from '@shopify/polaris-tokens';

import {
  // getResponsiveProps,
  ResponsiveProp,
  classNames,
  sanitizeCustomProperties,
} from '../../utilities/css';

import styles from './Box.scss';

type Element = 'div' | 'span' | 'section';

type Overflow = 'hidden' | 'scroll';

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

type Spacing = ResponsiveProp<SpacingSpaceScale>;

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

export type BackgroundColors =
  | ColorsBackdropTokenAlias
  | ColorsBackgroundTokenAlias
  | ColorsOverlayTokenAlias
  | ColorsActionTokenAlias
  | ColorsSurfaceTokenAlias;

interface BorderRadius {
  startStart: BorderRadiusTokenScale;
  startEnd: BorderRadiusTokenScale;
  endStart: BorderRadiusTokenScale;
  endEnd: BorderRadiusTokenScale;
}

interface BorderWidth {
  blockStart: ShapeBorderWidthScale;
  blockEnd: ShapeBorderWidthScale;
  inlineStart: ShapeBorderWidthScale;
  inlineEnd: ShapeBorderWidthScale;
}

interface InlineBlock<T> {
  inline?: T;
  block?: T;
}

interface StartEnd<T> {
  start?: T;
  end?: T;
}

type InlineBlockPadding = InlineBlock<
  SpacingSpaceScale | StartEnd<SpacingSpaceScale>
>;

type ResponsiveProp2<T> = {
  [Breakpoint in BreakpointsAlias]?: T;
};

type Padding =
  | SpacingSpaceScale
  | InlineBlockPadding
  | ResponsiveProp2<SpacingSpaceScale | InlineBlockPadding>;

export interface BoxProps {
  /** HTML Element type */
  as?: Element;
  /** Background color */
  background?: BackgroundColors;
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
  /** Border width */
  borderWidth?: ShapeBorderWidthScale;
  /** Vertical start border width */
  borderBlockStartWidth?: ShapeBorderWidthScale;
  /** Vertical end border width */
  borderBlockEndWidth?: ShapeBorderWidthScale;
  /** Horizontal start border width */
  borderInlineStartWidth?: ShapeBorderWidthScale;
  /** Horizontal end border width */
  borderInlineEndWidth?: ShapeBorderWidthScale;
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
  padding?: Padding;
  // /** Vertical start spacing around children */
  // paddingBlockStart?: Spacing;
  // /** Vertical end spacing around children */
  // paddingBlockEnd?: Spacing;
  // /** Horizontal start spacing around children */
  // paddingInlineStart?: Spacing;
  // /** Horizontal end spacing around children */
  // paddingInlineEnd?: Spacing;
  /** Shadow */
  shadow?: DepthShadowAlias;
  /** Set width of container */
  width?: string;
  /** Elements to display inside box */
  children?: React.ReactNode;
}

type PaddingObjectKey =
  | keyof InlineBlockPadding
  | keyof ResponsiveProp2<InlineBlockPadding>;

function isResponsivePaddingObject(
  padding:
    | InlineBlockPadding
    | ResponsiveProp2<SpacingSpaceScale | InlineBlockPadding>,
): padding is ResponsiveProp2<SpacingSpaceScale | InlineBlockPadding> {
  // base this on the first key,
  const keys = Object.keys(padding);
  if (keys.length === 0) {
    return false;
  }

  const firstKey = Object.keys(padding)[0] as PaddingObjectKey;
  switch (firstKey) {
    case 'xs':
    case 'sm':
    case 'md':
    case 'lg':
    case 'xl':
      return true;
    default:
      return false;
  }
}

function paddingVariable(value: SpacingSpaceScale) {
  return `var(--p-space-${value})`;
}

type ValueAndSpecificity<T> = [T | undefined, number];

interface PaddingStylesAndSpecificities {
  'inline-start': ValueAndSpecificity<SpacingSpaceScale>;
  'inline-end': ValueAndSpecificity<SpacingSpaceScale>;
  'block-start': ValueAndSpecificity<SpacingSpaceScale>;
  'block-end': ValueAndSpecificity<SpacingSpaceScale>;
}

const defaultPaddingStyleAndSpecificities: PaddingStylesAndSpecificities = {
  'inline-start': [undefined, 0],
  'inline-end': [undefined, 0],
  'block-start': [undefined, 0],
  'block-end': [undefined, 0],
};

function getPaddingStyleFromConfig(
  padding: SpacingSpaceScale | InlineBlockPadding | undefined,
): PaddingStylesAndSpecificities {
  if (!padding) {
    return defaultPaddingStyleAndSpecificities;
  }
  if (typeof padding === 'string') {
    return {
      'inline-start': [padding, 1],
      'inline-end': [padding, 1],
      'block-start': [padding, 1],
      'block-end': [padding, 1],
    };
  } else {
    const styles = {
      ...defaultPaddingStyleAndSpecificities,
    };

    if (padding.block) {
      if (typeof padding.block === 'string') {
        styles['block-start'] = [padding.block, 2];
        styles['block-end'] = [padding.block, 2];
      }

      if (typeof padding.block === 'object') {
        if (padding.block.start) {
          styles['block-start'] = [padding.block.start, 3];
        }

        if (padding.block.end) {
          styles['block-end'] = [padding.block.end, 3];
        }
      }
    }

    if (padding.inline) {
      if (typeof padding.inline === 'string') {
        styles['inline-start'] = [padding.inline, 2];
        styles['inline-end'] = [padding.inline, 2];
      }

      if (typeof padding.inline === 'object') {
        if (padding.inline.start) {
          styles['inline-start'] = [padding.inline.start, 3];
        }

        if (padding.inline.end) {
          styles['inline-end'] = [padding.inline.end, 3];
        }
      }
    }

    return styles;
  }
}

function paddingStyles(padding?: Padding) {
  if (!padding) {
    return {};
  }

  const styles = {} as any;

  // we want to set the 4x5 items for each padding side and breakpoint
  // inheritence rules are:

  // first use specific longhand values for the breakpoint
  // next use specific longhand values for the previous breakpoint
  // next use shorter-handed values for the current breakpoint
  // finally use shorter-handed values for the previous breakpoint
  // basically, more longhanded values have precendence over shorter handed values
  // on the same breakpoints

  const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl'] as BreakpointsAlias[];
  // would be nice to ensure that we get them all in case the breakpoints change
  // we could just export the breakpoint aliases from polaris/tokens

  const breakpointedStyles = (() => {
    if (typeof padding === 'object') {
      if (isResponsivePaddingObject(padding)) {
        return padding;
      }

      return {
        xs: padding,
      };
    } else {
      return {xs: padding};
    }
  })();

  // keep a record of the previous breakpoints values
  // and also how specific they are
  // e.g. `padding: "2"` is less specific than `padding: {{inline: start: "4"}}`
  const mostSpecific = {
    ...defaultPaddingStyleAndSpecificities,
  };

  breakpoints.forEach((breakpoint) => {
    // get the defined styles for the current breakpoint
    const breakpointDefinedStyles = breakpointedStyles[breakpoint];

    const x = getPaddingStyleFromConfig(breakpointDefinedStyles);

    const properties = [
      'inline-start',
      'inline-end',
      'block-start',
      'block-end',
    ] as const;

    // for each edge, check if we have a more specific value

    properties.forEach((property) => {
      if (x[property][1] >= mostSpecific[property][1]) {
        mostSpecific[property] = x[property];
      }

      const value = x[property][0];
      // emit the most specific styles for this breakpoint
      if (value) {
        styles[`--pc-box-padding-${property}-${breakpoint}`] =
          paddingVariable(value);
      }
    });
  });

  return styles;
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
      padding,
      // TODO: for now, until the props can be removed
      // these should be massaged into the paddingStyles helper
      // paddingBlockStart,
      // paddingBlockEnd,
      // paddingInlineStart,
      // paddingInlineEnd,
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

    const borderWidths = {
      blockStart: borderBlockStartWidth,
      blockEnd: borderBlockEndWidth,
      inlineStart: borderInlineStartWidth,
      inlineEnd: borderInlineEndWidth,
    } as BorderWidth;

    const style = {
      '--pc-box-color': color ? `var(--p-${color})` : undefined,
      '--pc-box-background': background ? `var(--p-${background})` : undefined,
      '--pc-box-border': border ? `var(--p-border-${border})` : undefined,
      '--pc-box-border-block-end': borders.blockEnd
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
      '--pc-box-border-width': borderWidth
        ? `var(--p-border-width-${borderWidth})`
        : undefined,
      '--pc-box-border-block-start-width': borderWidths.blockStart
        ? `var(--p-border-width-${borderWidths.blockStart})`
        : undefined,
      '--pc-box-border-block-end-width': borderWidths.blockEnd
        ? `var(--p-border-width-${borderWidths.blockEnd})`
        : undefined,
      '--pc-box-border-inline-start-width': borderWidths.inlineStart
        ? `var(--p-border-width-${borderWidths.inlineStart})`
        : undefined,
      '--pc-box-border-inline-end-width': borderWidths.inlineEnd
        ? `var(--p-border-width-${borderWidths.inlineEnd})`
        : undefined,
      '--pc-box-min-height': minHeight,
      '--pc-box-min-width': minWidth,
      '--pc-box-max-width': maxWidth,
      '--pc-box-overflow-x': overflowX,
      '--pc-box-overflow-y': overflowY,
      ...paddingStyles(padding),
      // ...getResponsiveProps('box', 'padding', 'space', padding),
      // ...getResponsiveProps(
      //   'box',
      //   'padding-block-end',
      //   'space',
      //   paddingBlockEnd,
      // ),
      // ...getResponsiveProps(
      //   'box',
      //   'padding-block-start',
      //   'space',
      //   paddingBlockStart,
      // ),
      // ...getResponsiveProps(
      //   'box',
      //   'padding-inline-start',
      //   'space',
      //   paddingInlineStart,
      // ),
      // ...getResponsiveProps(
      //   'box',
      //   'padding-inline-end',
      //   'space',
      //   paddingInlineEnd,
      // ),
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
