import React, {ReactNode} from 'react';

import type {Align, Color, Element} from '../Text';
import {Size, TextBase} from '../TextBase';

type BodyElement = Extract<Element, 'p' | 'span'>;

type BodySize = Extract<Size, 'sm' | 'md' | 'lg'>;

export interface BodyProps {
  align?: Align;
  as?: BodyElement;
  children: ReactNode;
  color?: Color;
  size?: BodySize;
  strong?: boolean;
  truncate?: boolean;
}

export const Body = ({
  align,
  as,
  children,
  color,
  size = 'md',
  strong = false,
  truncate,
}: BodyProps) => {
  const type = as || 'p';

  return (
    <TextBase
      typeStyle="body"
      align={align}
      as={type}
      color={color}
      fontWeight={strong ? 'medium' : 'regular'}
      size={size}
      truncate={truncate}
    >
      {children}
    </TextBase>
  );
};
