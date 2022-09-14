import React, {ReactNode} from 'react';
import type {font} from '@shopify/polaris-tokens';

import {classNames} from '../../utilities/css';

import styles from './Text.scss';

type Element = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

type Variant =
  | 'headingXs'
  | 'headingSm'
  | 'headingMd'
  | 'headingLg'
  | 'headingXl'
  | 'heading2xl'
  | 'heading3xl'
  | 'heading4xl'
  | 'bodySm'
  | 'bodyMd'
  | 'bodyLg';

const Alignment = {
  start: 'start',
  center: 'center',
  end: 'end',
  justify: 'justify',
};

type Alignment = keyof typeof Alignment;

const Color = {
  success: 'success',
  critical: 'critical',
  warning: 'warning',
  subdued: 'subdued',
};

type Color = keyof typeof Color;

type FontTokenName = keyof typeof font;

type FontWeightTokenScale = Extract<
  FontTokenName,
  `font-weight-${string}`
> extends `font-weight-${infer Scale}`
  ? Scale
  : never;

const VariantFontWeightMapping: {[V in Variant]: FontWeightTokenScale} = {
  headingXs: 'semibold',
  headingSm: 'semibold',
  headingMd: 'semibold',
  headingLg: 'semibold',
  headingXl: 'semibold',
  heading2xl: 'semibold',
  heading3xl: 'semibold',
  heading4xl: 'bold',
  bodySm: 'regular',
  bodyMd: 'regular',
  bodyLg: 'regular',
};

type FontSizeTokenScale = Extract<
  FontTokenName,
  `font-size-${string}`
> extends `font-size-${infer Scale}`
  ? Scale
  : never;

const VariantFontSizeMapping: {[V in Variant]: FontSizeTokenScale} = {
  headingXs: '75',
  headingSm: '100',
  headingMd: '200',
  headingLg: '300',
  headingXl: '400',
  heading2xl: '500',
  heading3xl: '600',
  heading4xl: '700',
  bodySm: '75',
  bodyMd: '100',
  bodyLg: '200',
};

type FontLineHeightTokenScale = Extract<
  FontTokenName,
  `font-line-height-${string}`
> extends `font-line-height-${infer Scale}`
  ? Scale
  : never;

const VariantFontLineHeightMapping: {[V in Variant]: FontLineHeightTokenScale} =
  {
    headingXs: '1',
    headingSm: '2',
    headingMd: '3',
    headingLg: '3',
    headingXl: '4',
    heading2xl: '5',
    heading3xl: '6',
    heading4xl: '7',
    bodySm: '1',
    bodyMd: '2',
    bodyLg: '2',
  };

export interface TextProps {
  /** Adjust horizontal alignment of text */
  alignment?: Alignment;
  /** The element type */
  as: Element;
  /** Text to display */
  children: ReactNode;
  /** Adjust color of text */
  color?: Color;
  /** Adjust weight of text */
  fontWeight?: FontWeightTokenScale;
  /** Truncate text overflow with ellipsis */
  truncate?: boolean;
  /** Typographic style of text */
  variant: Variant;
  /** Visually hide the text */
  visuallyHidden?: boolean;
}

export const Text = ({
  alignment,
  as,
  children,
  color,
  fontWeight,
  truncate = false,
  variant,
  visuallyHidden = false,
}: TextProps) => {
  const Component = as || (visuallyHidden ? 'span' : 'p');

  const style = {
    '--pc-text-font-size': `var(--p-font-size-${VariantFontSizeMapping[variant]})`,
    '--pc-text-font-line-height': `var(--p-font-line-height-${VariantFontLineHeightMapping[variant]})`,
    ...(alignment ? {'--pc-text-alignment': alignment} : undefined),
    ...(color ? {'--pc-text-color': `var(--p-text-${color})`} : undefined),
    ...(alignment || truncate ? {'--pc-text-display': 'block'} : undefined),
    ...(fontWeight
      ? {'--pc-text-font-weight': `var(--p-font-weight-${fontWeight})`}
      : {
          '--pc-text-font-weight': `var(--p-font-weight-${VariantFontWeightMapping[variant]})`,
        }),
  } as React.CSSProperties;

  const isResponsiveVariant =
    variant === 'heading2xl' ||
    variant === 'heading3xl' ||
    variant === 'heading4xl';

  const className = classNames(
    styles.Text,
    isResponsiveVariant && styles[variant],
    truncate && styles.truncate,
    visuallyHidden && styles.visuallyHidden,
  );

  return (
    <Component className={className} style={style}>
      {children}
    </Component>
  );
};
