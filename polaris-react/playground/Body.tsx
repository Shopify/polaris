import React, {ReactNode} from 'react';

import {classNames} from '../src/utilities/css';
import {Type, Typography} from './Typography';

import styles from './Body.scss';

interface BodyProps {
  as?: Type;
  children: ReactNode;
  noWrap?: boolean;
  size: string;
  strong?: boolean;
}

export const Body = ({as, children, noWrap, size, strong}: BodyProps) => {
  const type = as || 'p';

  const className = classNames(
    styles.Body,
    styles[size],
    strong && styles.strong,
    noWrap && styles.noWrap,
  );

  return (
    <Typography as={type} className={className}>
      {children}
    </Typography>
  );
};
