import React, {ReactNode} from 'react';

import {classNames} from '../../utilities/css';

import styles from './Text.scss';

type Element = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

type Variant =
  | 'displaySm'
  | 'displayMd'
  | 'displayLg'
  | 'headingSm'
  | 'headingMd'
  | 'headingLg'
  | 'headingXl'
  | 'bodySm'
  | 'bodyMd'
  | 'bodyLg';

type Alignment = 'inherit' | 'start' | 'center' | 'end' | 'justify';

type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold';

type Color = 'success' | 'critical' | 'warning' | 'subdued';

const VariantFontWeightMapping: {[V in Variant]: FontWeight} = {
  displaySm: 'semibold',
  displayMd: 'semibold',
  displayLg: 'bold',
  headingSm: 'bold',
  headingMd: 'semibold',
  headingLg: 'semibold',
  headingXl: 'semibold',
  bodySm: 'regular',
  bodyMd: 'regular',
  bodyLg: 'regular',
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
  fontWeight?: FontWeight;
  /** Truncate text overflow with ellipsis */
  truncate?: boolean;
  /** Typographic style of text */
  variant: Variant;
  /** Visually hide the text */
  visuallyHidden?: boolean;
}

export const Text = ({
  alignment = 'inherit',
  as,
  children,
  color,
  fontWeight,
  truncate = false,
  variant,
  visuallyHidden = false,
}: TextProps) => {
  const Component = as || (visuallyHidden ? 'span' : 'p');

  const className = classNames(
    styles.root,
    styles[variant],
    fontWeight ? styles[fontWeight] : styles[VariantFontWeightMapping[variant]],
    (alignment || truncate) && styles.block,
    alignment && styles[alignment],
    color && styles[color],
    truncate && styles.truncate,
    visuallyHidden && styles.visuallyHidden,
  );

  return <Component className={className}>{children}</Component>;
};
