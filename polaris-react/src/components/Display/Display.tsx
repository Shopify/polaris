import React, {ReactNode} from 'react';

import type {Align, Color} from '../Text';
import {Size, TextBase} from '../TextBase';

type DisplaySize = Extract<Size, 'sm' | 'md' | 'lg'>;

export interface DisplayProps {
  align?: Align;
  children: ReactNode;
  color?: Color;
  size?: DisplaySize;
  strong?: boolean;
  truncate?: boolean;
}

export const Display = ({
  align,
  children,
  color,
  size = 'sm',
  strong = false,
  truncate,
}: DisplayProps) => (
  <TextBase
    as="span"
    typeStyle="display"
    align={align}
    color={color}
    fontWeight={strong ? 'bold' : 'semibold'}
    size={size}
    truncate={truncate}
  >
    {children}
  </TextBase>
);
