import React, {ReactNode} from 'react';

import {classNames} from '../src/utilities/css';

import {Typography} from './Typography';
import styles from './Display.scss';

interface DisplayProps {
  children: ReactNode;
  noWrap?: boolean;
  size?: string;
  strong?: boolean;
}

export const Display = ({
  children,
  noWrap,
  size = 'small',
  strong,
}: DisplayProps) => {
  const className = classNames(
    styles.Display,
    styles[size],
    strong && styles.strong,
  );

  return (
    <Typography as="span" className={className} noWrap={noWrap}>
      {children}
    </Typography>
  );
};
