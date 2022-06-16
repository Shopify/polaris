import React, {ReactNode} from 'react';

import {classNames, variationName} from '../src/utilities/css';

import styles from './Typography.scss';

export type ElementType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'a'
  | 'p'
  | 'span'
  | 'div';

type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold';

interface BaseTypographyProps {
  as: ElementType;
  children: ReactNode;
  fontWeight?: FontWeight;
  noWrap?: boolean;
  size?: string;
  variant?: string;
  // fontSize?: string;
}

interface TypographyProps extends BaseTypographyProps {
  variant: string;
  size: string;
}

export const Typography = ({
  as,
  children,
  fontWeight,
  noWrap,
  size,
  variant,
}: TypographyProps) => {
  const Component = as || 'span';

  const className = classNames(
    styles.root,
    variant && styles[variationName(variant, size)],
    noWrap && styles.nowrap,
    fontWeight && styles[fontWeight],
  );

  return <Component className={className}>{children}</Component>;
};
