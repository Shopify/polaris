import React, {ReactNode} from 'react';

import {classNames} from '../../utilities/css';

import styles from './Text.scss';

export type Element =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'a'
  | 'p'
  | 'span';

export type Variant =
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

export type Align = 'inherit' | 'start' | 'center' | 'end' | 'justify';

export type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold';

export type Color = 'subdued' | '';

export interface TextProps {
  align?: Align;
  as?: Element;
  children: ReactNode;
  color?: Color;
  fontWeight?: FontWeight;
  truncate?: boolean;
  variant?: Variant;
}

export const Text = ({
  align = 'inherit',
  as,
  children,
  color,
  fontWeight = 'regular',
  truncate = false,
  variant,
}: TextProps) => {
  const Component = as || 'span';

  const className = classNames(
    styles.root,
    variant && styles[variant],
    fontWeight && styles[fontWeight],
    (align || truncate) && styles.block,
    align && styles[align],
    color && styles[color],
    truncate && styles.truncate,
  );

  return <Component className={className}>{children}</Component>;
};
