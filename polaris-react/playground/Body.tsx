import React, {ReactNode} from 'react';

import {ElementType, Typography} from './Typography';

type FontWeight = 'regular' | 'medium';

interface BodyProps {
  as?: ElementType;
  children: ReactNode;
  fontWeight?: FontWeight;
  noWrap?: boolean;
  size?: string;
}

export const Body = ({
  as,
  children,
  fontWeight = 'regular',
  noWrap,
  size = 'medium',
}: BodyProps) => {
  const type = as || 'p';

  return (
    <Typography
      variant="body"
      as={type}
      fontWeight={fontWeight}
      noWrap={noWrap}
      size={size}
    >
      {children}
    </Typography>
  );
};
