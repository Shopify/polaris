import React, {ReactNode} from 'react';

import type {Align, Color, Element} from '../Text';
import {Size, TextBase} from '../TextBase';

type TextHeadingElement = Extract<Element, 'h1' | 'h2' | 'h3' | 'h4' | 'span'>;

export interface TextHeadingProps {
  align?: Align;
  as?: TextHeadingElement;
  children: ReactNode;
  color?: Color;
  size?: Size;
  strong?: boolean;
  truncate?: boolean;
}

const textHeadingVariantMapping: {[S in Size]: TextHeadingElement} = {
  sm: 'h4',
  md: 'h3',
  lg: 'h2',
  xl: 'h1',
};

export const TextHeading = ({
  align,
  as,
  children,
  color,
  size = 'md',
  strong = false,
  truncate,
}: TextHeadingProps) => {
  let type = as || 'span';
  if (!as && size) {
    type = textHeadingVariantMapping[size];
  }

  return (
    <TextBase
      typeStyle="heading"
      align={align}
      as={type}
      color={color}
      fontWeight={strong ? 'bold' : 'semibold'}
      size={size}
      truncate={truncate}
    >
      {children}
    </TextBase>
  );
};
