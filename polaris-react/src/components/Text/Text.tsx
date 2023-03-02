import React, {ReactNode} from 'react';

import {classNames} from '../../utilities/css';

import styles from './Text.scss';

type Element =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'legend';

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

type Alignment = 'start' | 'center' | 'end' | 'justify';

type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold';

type Color = 'success' | 'critical' | 'warning' | 'subdued' | 'text-inverse';

interface NonMutuallyExclusiveProps {
  /** Adjust horizontal alignment of text */
  alignment?: Alignment;
  /** The element type */
  as?: Element;
  /** Prevent text from overflowing */
  breakWord?: boolean;
  /** Text to display */
  children: ReactNode;
  /** Adjust color of text */
  color?: Color;
  /** Adjust weight of text */
  fontWeight?: FontWeight;
  /** HTML id attribute */
  id?: string;
  /** Use a numeric font variant with monospace appearance */
  numeric?: boolean;
  /** Truncate text overflow with ellipsis */
  truncate?: boolean;
  /** Typographic style of text */
  variant?: Variant;
  /** Visually hide the text */
  visuallyHidden?: boolean;
}

export type TextProps = NonMutuallyExclusiveProps &
  (
    | {visuallyHidden?: boolean; as?: undefined; variant?: undefined}
    | {visuallyHidden?: undefined; as?: Element; variant?: Variant}
  );

export const Text = ({
  alignment,
  as,
  breakWord,
  children,
  color,
  fontWeight,
  id,
  numeric = false,
  truncate = false,
  variant,
  visuallyHidden = false,
}: TextProps) => {
  const Component = as || (visuallyHidden ? 'span' : 'p');

  const className = classNames(
    styles.root,
    variant && styles[variant],
    fontWeight && styles[fontWeight],
    (alignment || truncate) && styles.block,
    alignment && styles[alignment],
    breakWord && styles.break,
    color && styles[color],
    numeric && styles.numeric,
    truncate && styles.truncate,
    visuallyHidden && styles.visuallyHidden,
  );

  return (
    <Component className={className} {...(id && {id})}>
      {children}
    </Component>
  );
};
