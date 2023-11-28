import React, {forwardRef} from 'react';
import type * as Polymorphic from '@radix-ui/react-polymorphic';
import type {OmitIndexSignature, Simplify} from 'type-fest';

import {classNames, createPolarisCSSVar} from '../../utilities/css';

import style from './style.module.css';
import classes from './Box.scss';
import type {ResponsiveStylePropsWithModifiers} from './generated-data';
import {stylePropTokenGroupMap, stylePropDefaults} from './generated-data';
import {convertStylePropsToCSSProperties} from './get-style-props';

// Ensure no index signatures are accidentally introduced into the props list by
// omitting `[x: string]: unknown` keys (but keep literal keys `foo: string`,
// etc).
// Polymorphic.ForwardRefComponent suffers from this occasionally.
type StrictProps<F> = F extends (props: infer Props) => infer Return
  ? (props: OmitIndexSignature<Props>) => Return
  : unknown;

// Flatten the props object for better IDE integration
type SimplifyProps<F> = F extends (props: infer Props) => infer Return
  ? (props: Simplify<Props>) => Return
  : unknown;

export interface BoxProps
  extends ResponsiveStylePropsWithModifiers,
    React.AriaAttributes {
  /** HTML id attribute */
  id?: HTMLElement['id'];
  /** HTML role attribute */
  role?: HTMLElement['role'];
  /** HTML tabIndex */
  tabIndex?: number;
  /** Visually hide the contents during print */
  printHidden?: boolean;
  /** Visually hide the contents (still announced by screenreader) */
  visuallyHidden?: boolean;
}

type PolymorphicBox = SimplifyProps<
  StrictProps<
    Polymorphic.ForwardRefComponent<any, React.PropsWithChildren<BoxProps>>
  >
>;

/**
The lowest level Polaris primitive from which everything in the system is built.

@example
```
// Standard CSS properties
<Box display="flex" />

// Will pass through directly to the underlaying element
<div style={`display: flex`} />
```

@example
```
// Tokenized CSS properties
<Box paddingInlineStart="400" />

// Converted to Polaris tokens then passed to the underlaying element
<div style={`padding-inline-start: var(--p-space-400)`} />
```

@example
```
// Alias properties
<Box paddingInlineStart="600" padding="400"  />

// Expanded to constituent properties and converted to Polaris tokens then pased
// to the underlaying element
<div style={`
  padding-inline-start: var(--p-space-400);
  padding-inline-end:   var(--p-space-400);
  padding-block-start:  var(--p-space-400);
  padding-block-end:    var(--p-space-400);
`} />
```

@example
```
// All standard CSS properties, tokenized properties, and aliases can accept a
// reponsive set of values
<Box
  display={{
    sm: 'grid',
    xl: 'flex',
  }}
  paddingInline={{
    xs: '200',
    lg: '400',
  }}
/>

// Aliases are expanded, tokenized values are converted to Polaris tokens, then
// converted to responsive CSS variables and passed to the underlaying element
<div style={`
  --pc-box-display-sm: var(--_sm) grid;
  --pc-box-display-xl: var(--_xl) flex;
  --pc-box-color-hover-sm: var(--_hovered-sm) red;
  color: var(--pc-box-color-hover-xl, var(--pc-box-display-xl, var(--pc-box-display-sm, unset)));

  --pc-box-padding-inline-start-xs: var(--_xs) var(--p-space-200);
  --pc-box-padding-inline-start-lg: var(--_lg) var(--p-space-400);
  padding-inline-start: var(--pc-box-padding-inline-start-lg, var(--pc-box-padding-inline-start-xs, unset));

  --pc-box-padding-inline-end-xs: var(--_xs) var(--p-space-200);
  --pc-box-padding-inline-end-lg: var(--_lg) var(--p-space-400);
  padding-inline-end: var(--pc-box-padding-inline-end-lg, var(--pc-box-padding-inline-end-xs, unset));
`} />
```

@example
```
// Order doesn't matter
<Box paddingInlineStart="200" padding="400" paddingBlock="600" />

// Most specific always wins (`paddingInlineStart` then `paddingBlock` then
// `padding`)
<div style={`
  padding-inline-start: var(--p-space-200);
  padding-inline-end:   var(--p-space-400);
  padding-block-start:  var(--p-space-600);
  padding-block-end:    var(--p-space-600);
`} />
```
*/
export const Box = forwardRef(function Box(
  {
    as: Tag = 'div',
    id,
    role,
    printHidden,
    visuallyHidden,
    tabIndex,
    children,
    ...props
  },
  forwardedRef,
) {
  const propArray = Object.entries(props);
  const styleProps = Object.fromEntries(
    propArray.filter(([key]) => !key.startsWith('aria-')),
  );
  const ariaProps = Object.fromEntries(
    propArray.filter(([key]) => key.startsWith('aria-')),
  );
  const styles = convertStylePropsToCSSProperties(
    styleProps,
    stylePropDefaults,
    (value, prop) =>
      // If this is a tokenized styleprop, we must convert it to a CSS var().
      Object.prototype.hasOwnProperty.call(stylePropTokenGroupMap, prop)
        ? createPolarisCSSVar(
            stylePropTokenGroupMap[prop as keyof typeof stylePropTokenGroupMap],
            value as string | number,
          )
        : value,
  );

  const className = classNames(
    style.Box,
    visuallyHidden && classes.visuallyHidden,
    printHidden && classes.printHidden,
    Tag === 'ul' && classes.listReset,
  );

  return (
    <Tag
      ref={forwardedRef}
      id={id}
      role={role}
      tabIndex={tabIndex}
      style={styles}
      className={className}
      {...ariaProps}
    >
      {children}
    </Tag>
  );
}) as PolymorphicBox;
