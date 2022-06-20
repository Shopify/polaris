import React, {ReactNode} from 'react';

import {classNames} from '../src/utilities/css';

import {Typography, Align} from './Typography';
import styles from './Display.scss';

interface DisplayProps {
  children: ReactNode;
  truncate?: boolean;
  size?: string;
  strong?: boolean;
  align?: Align;
}

export const Display = ({
  children,
  truncate,
  size = 'small',
  strong,
  align,
}: DisplayProps) => {
  const className = classNames(
    styles.Display,
    styles[size],
    strong && styles.strong,
  );

  return (
    <Typography
      as="span"
      className={className}
      truncate={truncate}
      align={align}
    >
      {children}
    </Typography>
  );
};
