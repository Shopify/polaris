import React, {useRef, forwardRef} from 'react';
import hash from '@emotion/hash';
import type * as Polymorphic from '@radix-ui/react-polymorphic';
import {metaThemeDefault, flattenMetaTheme} from '@shopify/polaris-tokens';
import type {MetaTokenGroupShape} from '@shopify/polaris-tokens';
import decamelize from 'decamelize';

import {classNames, createPolarisCSSVar} from '../../utilities/css';

import generatedStyle from './generated-style.module.scss';
import classes from './Box.module.scss';
import type {ResponsiveStylePropsWithModifiers} from './generated-data';
import {stylePropTokenGroupMap, stylePropDefaults} from './generated-data';
import {convertStylePropsToCSSProperties} from './get-style-props';

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
  // TODO: Refactor this. This is likely not a very robust way to ensure these classNames are unique
  // If a class already exists for this component instance, don't regenerate.
  classNameRef.current =
    classNameRef.current ??
    `x-${hash(`Box-${incrementRefCounter().toString(36)}`)}`;

  // TODO: Make this programmatic, but for now its two elements.
  // This beats having to write another reduce.
  function splitOutPseudoElements(styleProps: any) {
    const stylePropsClone = {...styleProps};
    const pseudoElementStyleProps: any = {};
    pseudoElementStyleProps._before = styleProps._before;
    pseudoElementStyleProps._after = styleProps._after;
    delete stylePropsClone._before;
    delete stylePropsClone._after;

    return {
      styleProps: stylePropsClone,
      pseudoElementStyleProps,
    };
  }
  const {styleProps, pseudoElementStyleProps} = splitOutPseudoElements(sx);
  // Convert the style object without psuedo elements into styleProps
  const styles = convertStylePropsToCSSProperties(
    styleProps,
    stylePropDefaults,
    (value, prop) => {
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
    },
  );

  function generatePsuedoElementStyles(className: any, styleProps: any) {
    if (!className) return;
    const css = Object.entries(styleProps)
      .reduce((acc, curr) => {
        const pseudoElementStyles = Object.fromEntries([curr]);

        // TODO this function is likely computationally expensive
        // We only really need the following things to be run on the pseudo element styles
        // 1. Flatten out breakpoint values
        // 2. Apply defaults
        // 3. Convert tokenized values to CSS vars

        // If we can pull these three utilities out, we may get away with not having to run convertStylePropstoCSSProperties
        const styleProps = convertStylePropsToCSSProperties(
          pseudoElementStyles,
          stylePropDefaults,
          (value, prop) => {
            return isTokenVariable(
              stylePropTokenGroupMap[
                prop as keyof typeof stylePropTokenGroupMap
              ],
              value as string | number,
            )
              ? createPolarisCSSVar(
                  stylePropTokenGroupMap[
                    prop as keyof typeof stylePropTokenGroupMap
                  ],
                  value as string | number,
                )
              : value;
          },
        );
        return [...acc, [curr[0].replace('_', ''), styleProps]];
      }, [])
      .map(([pseudoElement, styles]) => {
        return `.${className}::${pseudoElement} {${Object.entries(
          styles,
        ).reduce((acc, [key, val]) => {
          acc += `\n\t${
            key.startsWith('--_') ? key : decamelize(key, {separator: '-'})
          }: ${val};`;
          return acc;
        }, '')}
}`;
      })
      .join('\n');
    return css;
  }
  const pseudoElementCSS = generatePsuedoElementStyles(
    classNameRef.current,
    pseudoElementStyleProps,
  );
  const constructedClassname = classNames(
    generatedStyle.Box,
    classNameRef.current,
    visuallyHidden && classes.visuallyHidden,
    printHidden && classes.printHidden,
    Tag === 'ul' && classes.listReset,
    className,
  );
  // TODO: When on the client, Move the style element to the head.
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: pseudoElementCSS || '',
        }}
      />
      {React.createElement(
        Tag,
        {
          ref: forwardedRef,
          style: styles,
          className: constructedClassname,
          ...props,
        },
        children,
      )}
    </>
  );
}) as Polymorphic.ForwardRefComponent<Element, BoxProps>;
