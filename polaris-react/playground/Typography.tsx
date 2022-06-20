import React, {ReactNode} from 'react';

import {classNames} from '../src/utilities/css';

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
  | 'span';

export type Align = 'inherit' | 'start' | 'center' | 'end' | 'justify';

interface TypographyProps {
  as: ElementType;
  className?: string;
  children: ReactNode;
  truncate?: boolean;
  align?: Align;
  // fontSize?: string;
  // fontWeight?: string;
}

export const Typography = ({
  as,
  children,
  className = '',
  truncate,
  align,
}: TypographyProps) => {
  const Component = as || 'span';

  return (
    <Component
      className={classNames(
        className,
        truncate && styles.truncate,
        align && styles[align],
      )}
    >
      {children}
    </Component>
  );
};
