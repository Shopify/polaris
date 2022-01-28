import React from 'react';

import {classNames} from '../../utilities/css';

import styles from './Typography.scss';
import type {
  PolymorphicRef,
  PolymorphicComponentPropsWithRef,
} from './polymorphic';

type Variant =
  | 'inherit'
  | 'body'
  | 'caption'
  | 'heading'
  | 'subheading'
  | 'input'
  | 'button'
  | 'buttonLarge'
  | 'displayExtraLarge'
  | 'displayMedium'
  | 'displaySmall';

const defaultVariantMapping: {[V in Variant]: string} = {
  inherit: 'span',
  body: 'p',
  caption: 'span',
  heading: 'h2',
  subheading: 'h3',
  input: 'span',
  button: 'span',
  buttonLarge: 'span',
  displayExtraLarge: 'h2',
  displayMedium: 'h3',
  displaySmall: 'h4',
};

interface Props {
  children: React.ReactNode;
  color?: string;
  noWrap?: boolean;
  breakword?: boolean;
  printHidden?: boolean;
  variant?: Variant;
  emphasis?: 'normal' | 'subdued' | 'strong';
}

export type TypographyProps<TElement extends React.ElementType> =
  PolymorphicComponentPropsWithRef<TElement, Props>;

type TypographyComponent = {displayName?: string} & (<
  TElement extends React.ElementType = 'p',
>(
  props: TypographyProps<TElement>,
) => React.ReactElement | null);

export const Typography: TypographyComponent = React.forwardRef(
  <TElement extends React.ElementType = 'p'>(
    {
      as,
      color,
      style,
      className,
      emphasis,
      variant = 'body',
      noWrap = false,
      breakword = false,
      printHidden = false,
      ...restProps
    }: TypographyProps<TElement>,
    ref?: PolymorphicRef<TElement>,
  ) => {
    const Component = as || defaultVariantMapping[variant] || 'p';

    return (
      <Component
        {...restProps}
        ref={ref}
        className={classNames(
          styles.root,
          styles[variant],
          emphasis && styles[`emphasis-${emphasis}`],
          noWrap && styles.noWrap,
          breakword && styles.breakword,
          printHidden && styles.printHidden,
          className,
        )}
        style={{
          ...style,
          ...(color && {color: `var(--p-${color})`}),
        }}
      />
    );
  },
);

Typography.displayName = 'Typography';
