import React, {ReactNode} from 'react';

import {variationName} from '../../utilities/css';
import {Text} from '../Text';
import type {Align, Color, Element, FontWeight, Variant} from '../Text';

export type TypeStyle = 'display' | 'heading' | 'body';

export type Size = 'sm' | 'md' | 'lg' | 'xl';

export interface TextBaseProps {
  align?: Align;
  as: Element;
  children: ReactNode;
  color?: Color;
  fontWeight?: FontWeight;
  size: Size;
  truncate?: boolean;
  typeStyle: TypeStyle;
}

export const TextBase = ({
  align,
  as,
  children,
  color,
  fontWeight,
  size,
  truncate,
  typeStyle,
}: TextBaseProps) => {
  const variant = variationName(typeStyle, size) as Variant;

  return (
    <Text
      as={as}
      align={align}
      color={color}
      fontWeight={fontWeight}
      truncate={truncate}
      variant={variant}
    >
      {children}
    </Text>
  );
};
