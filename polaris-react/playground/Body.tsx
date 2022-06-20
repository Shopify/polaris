import React, {ReactNode} from 'react';

import {classNames} from '../src/utilities/css';

import {ElementType, Typography, Align} from './Typography';
import styles from './Body.scss';

interface BodyProps {
  as?: ElementType;
  children: ReactNode;
  truncate?: boolean;
  size?: string;
  strong?: boolean;
  align?: Align;
}

export const Body = ({
  as,
  children,
  truncate,
  size = 'medium',
  strong,
  align,
}: BodyProps) => {
  const type = as || 'p';

  const className = classNames(
    styles.Body,
    styles[size],
    strong && styles.strong,
  );

  return (
    <Typography
      as={type}
      className={className}
      truncate={truncate}
      align={align}
    >
      {children}
    </Typography>
  );
};
