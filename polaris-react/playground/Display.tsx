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
  fontWeight,
  noWrap,
  size = 'small',
}: DisplayProps) => {
  const fontWeightLarge = size === 'large' ? 'bold' : 'semibold';
  return (
    <Typography
      variant="display"
      as="span"
      fontWeight={fontWeight ? fontWeight : fontWeightLarge}
      noWrap={noWrap}
      size={size}
    >
      {children}
    </Typography>
  );
};
