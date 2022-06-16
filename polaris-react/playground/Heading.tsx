import React, {ReactNode} from 'react';

import {ElementType, Typography} from './Typography';

type FontWeight = 'semibold' | 'bold';

interface HeadingProps {
  as?: ElementType;
  children: ReactNode;
  fontWeight?: FontWeight;
  noWrap?: boolean;
  size?: string;
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
  fontWeight = 'semibold',
  noWrap,
  size = 'medium',
}: HeadingProps) => {
  let type = as || 'span';
  if (!as && size) {
    type = headingVariantMapping[size];
  }

  return (
    <Typography
      variant="heading"
      as={type}
      fontWeight={fontWeight}
      noWrap={noWrap}
      size={size}
    >
      {children}
    </Typography>
  );
};
