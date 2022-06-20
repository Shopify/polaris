import React, {ReactNode} from 'react';

import {classNames} from '../src/utilities/css';

import {ElementType, Typography, Align} from './Typography';
import styles from './Heading.scss';

interface HeadingProps {
  as?: ElementType;
  children: ReactNode;
  truncate?: boolean;
  size?: string;
  strong?: boolean;
  align?: Align;
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
  truncate,
  size = 'medium',
  strong,
  align,
}: HeadingProps) => {
  let type = as || 'span';
  if (!as && size) {
    type = headingVariantMapping[size];
  }

  const className = classNames(
    styles.Heading,
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
