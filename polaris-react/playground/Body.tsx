import React, {ReactNode} from 'react';

import {classNames} from '../src/utilities/css';

import {ElementType, Typography} from './Typography';
import styles from './Body.scss';

interface BodyProps {
  as?: ElementType;
  children: ReactNode;
  noWrap?: boolean;
  size?: string;
  strong?: boolean;
}

export const Body = ({
  as,
  children,
  noWrap,
  size = 'medium',
  strong,
}: BodyProps) => {
  const type = as || 'p';

  const className = classNames(
    styles.Body,
    styles[size],
    strong && styles.strong,
  );

  return (
    <Typography as={type} className={className} noWrap={noWrap}>
      {children}
    </Typography>
  );
};
