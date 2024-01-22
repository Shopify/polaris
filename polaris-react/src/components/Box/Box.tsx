import React, {useRef, forwardRef} from 'react';
import hash from '@emotion/hash';
import type * as Polymorphic from '@radix-ui/react-polymorphic';
import {metaThemeDefault, flattenMetaTheme} from '@shopify/polaris-tokens';
import type {MetaTokenGroupShape} from '@shopify/polaris-tokens';
import type {Entries} from 'type-fest';

import {classNames, createPolarisCSSVar} from '../../utilities/css';
import {isObject} from '../../utilities/is-object';

import generatedStyle from './generated-style.module.scss';
import classes from './Box.module.scss';
import type {
  ResponsiveStylePropsWithModifiers,
  ValueMapper,
} from './generated-data';
import {stylePropTokenGroupMap, pseudoElements} from './generated-data';
import {
  convertStylePropsToCSSProperties,
  convertCSSPropertiesToStyleSheet,
} from './get-style-props-2';

const pseudoElementsEnabled =
  isObject(pseudoElements) && Object.keys(pseudoElements).length > 0;

let refCounter = 0;
function incrementRefCounter() {
  return refCounter++;
}
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
  sx?: ResponsiveStylePropsWithModifiers;
  /** Visually hide the contents during print */
  printHidden?: boolean;
  /** Visually hide the contents (still announced by screenreader) */
  visuallyHidden?: boolean;
}

const tokenValueMap: MetaTokenGroupShape = flattenMetaTheme(metaThemeDefault);
function isTokenVariable(
  tokenSubGroup: string | null,
  token: string | number,
): boolean {
  const possibleToken = `${tokenSubGroup}-${token}`;
  return typeof tokenValueMap[possibleToken] !== 'undefined';
}

// TODO: NOTE: Temporarily exporting this function so it can be used by the
// build script. Eventually this function will move to the <AppProvider> where
// this whole system is initialized
export const valueMapper: ValueMapper = (value, prop) => {
  // If this is a tokenized styleprop, we must convert it to a CSS var().
  return isTokenVariable(
    stylePropTokenGroupMap[prop as keyof typeof stylePropTokenGroupMap],
    value as string | number,
  )
    ? createPolarisCSSVar(
        stylePropTokenGroupMap[prop as keyof typeof stylePropTokenGroupMap],
        value as string | number,
      )
    : value;
};
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
  const classNameRef = useRef<string>();

  const fallbacks = {
    borderInlineStartStyle:
      sx.borderInlineStartColor || sx.borderInlineStartWidth
        ? 'solid'
        : undefined,
    borderInlineEndStyle:
      sx.borderInlineEndColor || sx.borderInlineEndWidth ? 'solid' : undefined,
    borderBlockStartStyle:
      sx.borderBlockStartColor || sx.borderBlockStartWidth
        ? 'solid'
        : undefined,
    borderBlockEndStyle:
      sx.borderBlockEndColor || sx.borderBlockEndWidth ? 'solid' : undefined,
    outlineStyle: sx.outlineWidth || sx.outlineColor ? 'solid' : undefined,
  };

  const {style, ...pseudoElementStyles} = convertStylePropsToCSSProperties(
    sx,
    fallbacks,
    valueMapper,
  );

  let pseudoElementCSS = '';

  if (pseudoElementsEnabled && Object.keys(pseudoElementStyles).length > 0) {
    classNameRef.current =
      classNameRef.current ??
      `x-${hash(`Box-${incrementRefCounter().toString(36)}`)}`;

    pseudoElementCSS = (
      Object.entries(pseudoElementStyles) as Entries<
        Required<typeof pseudoElementStyles>
      >
    )
      .map(([pseudoElementSelector, {style}]) =>
        convertCSSPropertiesToStyleSheet(
          style,
          `.${classNameRef.current!}${pseudoElements[pseudoElementSelector]}`,
        ),
      )
      .join('\n');
  }

  const constructedClassname = classNames(
    generatedStyle.Box,
    classNameRef.current,
    visuallyHidden && classes.visuallyHidden,
    printHidden && classes.printHidden,
    Tag === 'ul' && classes.listReset,
    className,
  );

  return React.createElement(
    Tag,
    {
      ref: forwardedRef,
      style,
      className: constructedClassname,
      ...props,
    },
    [
      // TODO: When on the client, Move the style element to the head.
      pseudoElementCSS
        ? React.createElement('style', {
            dangerouslySetInnerHTML: {
              __html: pseudoElementCSS || '',
            },
          })
        : null,
      children,
    ],
  );
}) as Polymorphic.ForwardRefComponent<Element, BoxProps>;
