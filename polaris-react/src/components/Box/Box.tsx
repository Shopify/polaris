import React, {forwardRef} from 'react';
import type {Simplify} from 'type-fest';
import type * as Polymorphic from '@radix-ui/react-polymorphic';

import {classNames, createPolarisCSSVar, isCSSVar} from '../../utilities/css';

import generatedStyle from './generated-style.module.scss';
import classes from './Box.module.scss';
import type {ResponsiveStylePropsWithModifiers} from './generated-data';
import {stylePropTokenGroupMap, stylePropDefaults} from './generated-data';
import {convertStylePropsToCSSProperties} from './get-style-props';

export type Element =
  | 'div'
  | 'p'
  | 'button'
  | 'span'
  | 'section'
  | 'legend'
  | 'ul'
  | 'li'
  | 'a';

export type {ResponsiveStylePropsWithModifiers};
export interface BoxProps {
  sx?: Simplify<ResponsiveStylePropsWithModifiers>;
  /** Visually hide the contents during print */
  printHidden?: boolean;
  /** Visually hide the contents (still announced by screenreader) */
  visuallyHidden?: boolean;
}
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
    sx = {},
    className,
    // id,
    // role,
    printHidden,
    visuallyHidden,
    // tabIndex,
    children,
    ...props
  },
  forwardedRef,
) {
  const styles = convertStylePropsToCSSProperties(
    sx,
    stylePropDefaults,
    (value, prop) =>
      // If this is a tokenized styleprop, we must convert it to a CSS var().
      Object.prototype.hasOwnProperty.call(stylePropTokenGroupMap, prop) &&
      !isCSSVar(value as string | number)
        ? createPolarisCSSVar(
            stylePropTokenGroupMap[prop as keyof typeof stylePropTokenGroupMap],
            value as string | number,
          )
        : value,
  );

  const constructedClassname = classNames(
    generatedStyle.Box,
    visuallyHidden && classes.visuallyHidden,
    printHidden && classes.printHidden,
    Tag === 'ul' && classes.listReset,
    className,
  );

  return React.createElement(
    Tag,
    {
      ref: forwardedRef,
      style: styles,
      className: constructedClassname,
      ...props,
    },
    children,
  );
}) as Polymorphic.ForwardRefComponent<Element, BoxProps>;
