import React, {ReactNode} from 'react';

import {ElementType, Typography} from './Typography';

type HeadingSize = 'xl' | 'lg' | 'md' | 'sm';

interface HeadingProps {
  as?: ElementType;
  children: ReactNode;
  strong?: boolean;
  noWrap?: boolean;
  size?: HeadingSize;
}

// TODO: TS fix
const headingVariantMapping: any = {
  sm: 'h4',
  md: 'h3',
  lg: 'h2',
  xl: 'h1',
};

export const Heading = ({
  as,
  children,
  strong,
  noWrap,
  size = 'md',
}: HeadingProps) => {
  let type = as || 'span';
  if (!as && size) {
    type = headingVariantMapping[size];
  }

  return (
    <Typography
      variant="heading"
      as={type}
      fontWeight={strong ? 'bold' : 'semibold'}
      noWrap={noWrap}
      size={size}
    >
      {children}
    </Typography>
  );
};
