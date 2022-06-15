import React, {ReactNode} from 'react';

import {classNames} from '../src/utilities/css';

import {Type, Typography} from './Typography';
import styles from './Heading.scss';

interface HeadingProps {
  as?: Type;
  children: ReactNode;
  noWrap?: boolean;
  size?: string;
  strong?: boolean;
}

// TODO: TS fix
const headingVariantMapping: any = {
  small: 'h4',
  medium: 'h3',
  large: 'h2',
  xlarge: 'h1',
};

export const Heading = ({
  as,
  children,
  noWrap,
  size = 'medium',
  strong,
}: HeadingProps) => {
  let type = as || 'span';
  if (!as && size) {
    type = headingVariantMapping[size];
  }

  const className = classNames(
    styles.Heading,
    styles[size],
    strong && styles.strong,
    noWrap && styles.nowrap,
  );

  return (
    <Typography as={type} className={className}>
      {children}
    </Typography>
  );
};
