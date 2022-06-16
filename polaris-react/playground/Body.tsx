import React, {ReactNode} from 'react';

import {classNames} from '../src/utilities/css';

import {ElementType, Typography, Align} from './Typography';
import styles from './Body.scss';

interface BodyProps {
  as?: ElementType;
  children: ReactNode;
  noWrap?: boolean;
  size?: string;
  strong?: boolean;
  align?: Align;
}

export const Body = ({
  as,
  children,
  noWrap,
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
    <Typography as={type} className={className} noWrap={noWrap} align={align}>
      {children}
    </Typography>
  );
};
