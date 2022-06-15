import React, {ReactNode} from 'react';

export type Type = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'a' | 'p' | 'span';

interface TypographyProps {
  as: Type;
  className?: string;
  children: ReactNode;
  // fontSize?: string;
  // fontWeight?: string;
}

export const Typography = ({as, children, className = ''}: TypographyProps) => {
  const Component = as || 'span';
  return <Component className={className}>{children}</Component>;
};
