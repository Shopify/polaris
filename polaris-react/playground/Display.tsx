import React, {ReactNode} from 'react';

import {Typography} from './Typography';

type FontWeight = 'semibold' | 'bold';

interface DisplayProps {
  children: ReactNode;
  fontWeight?: FontWeight;
  noWrap?: boolean;
  size?: string;
}

export const Display = ({
  children,
  fontWeight = 'semibold',
  noWrap,
  size = 'small',
}: DisplayProps) => (
  <Typography
    variant="display"
    as="span"
    fontWeight={fontWeight}
    noWrap={noWrap}
    size={size}
  >
    {children}
  </Typography>
);
