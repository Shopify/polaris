'use strict';

/*
 * PERFORMANCE
 *
 *
 * Use `Object.keys()` over `Object.entries()`
 * -------------------------------------------
 *
 * Object.keys() appears to be slightly faster
 * (possibly because Object.keys returns an iterable that the JS engine has to
 * construct on every call wheras Object.keys returns a pre-calculated array
 * of the keys due to the way the data is represented within the JS engine.
 *
 * Test: https://www.measurethat.net/Benchmarks/Show/3685/0/objectentries-vs-objectkeys-vs-objectkeys-with-extra-ar#latest_results_block
 *
 * Mutate over copy
 * ----------------
 *
 * Mutating existing objects/arrays is much faster (2x) than creating new ones
 * wherever possible.
 *
 * Test: https://jsbench.me/i1ls861rj9/1
 *
 * Iterate with `for` loops not `for..of` or `.forEach()`
 * ------------------------------------------------------
 *
 * `for..of` uses iterators which internally perform a function call, do
 * internal "done" checks, return the value + done, then do another "done" check
 * before continuing.
 *
 * `.forEach()` Requires creating a function + closure + everything that goes
 * with that, then function execution overhead.
 *
 * `for` requires no iterators, does simple property access, and has no function
 * creation/execution requirements.
 *
 * One exception: Iterating sparse arrays is faster with `.forEach()`:
 *https://jsbench.me/culs8itbov/1
 */

import invariant from 'tiny-invariant';
import decamelize from 'decamelize';
import type {OmitIndexSignature, Simplify, Includes} from 'type-fest';
import type {Globals} from 'csstype';

import type {
  ResponsiveStyleProps,
  ResponsiveStylePropsWithModifiers,
  ValueMapper,
  Properties,
  PropPath,
  SimplifyUnion
} from './generated-data';

// eslint-disable-next-line @typescript-eslint/ban-types
type PropertyValue<TValue> = TValue extends infer TUnpacked & {}
  ? TUnpacked
  : TValue;

type RecursiveValues<T> = Exclude<
  // csstype uses the (string & {}) trick to stop TS from simplifying a type
  // like `'red' | string` down to just `string`.
  // However, `(string & {}) extends Record<any, any>` now returns 'true'
  // whereas `string extends Record<any, any>` returns false. So we "unpack"
  // those values here to ensure we're dealing with the actual type.
  // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
  PropertyValue<T> extends Record<any, any>
    ?
        | T
        | {
            [Prop in keyof T]: Extract<
              // `extends any` distributes the types over every item in a possible union
              T[Prop] extends any ? RecursiveValues<T[Prop]> : never,
              // Only interested in Records in the union
              // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
              Record<any, any>
            >;
          }[keyof T]
    : never,
  undefined
>;

type Selector = string;

type PseudoElementSelector =
  | '::after'
  | '::backdrop'
  | '::before'
  | '::cue'
  | '::cue-region'
  | '::first-letter'
  | '::first-line'
  | '::file-selector-button'
  | '::marker'
  | '::placeholder'
  | '::selection';

// type RecursiveKeys<T> = T extends object
//   ?
//       | keyof T
//       | {
//           // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
//           [Prop in keyof T]: T[Prop] extends Record<any, any>
//             ? RecursiveKeys<T[Prop]>
//             : never;
//         }[keyof T]
//   : never;

type PseudoElementProp = keyof typeof pseudoElements;
type ModifierProp = keyof typeof modifiers;
type BreakpointProp = keyof typeof breakpoints;

type PropPathValues = PropPath extends (infer T)[] ? T : never;

export type ConversionResult = {
  style: Properties;
} & {
  [K in PseudoElementProp]?: {
    style: Properties;
  };
};

type AccumulatorCondition = Exclude<
  ModifierProp | BreakpointProp,
  typeof baseBreakpoint
>;

interface DeclarationCondition {
  condition?: AccumulatorCondition;
  value: unknown;
}

type ConditionalDeclarations = {
  [K in keyof Properties]?: DeclarationCondition[];
};

type DeclarationAccumulator = {
  [Key in
    | PseudoElementProp
    | typeof Constant['RootElement']]?: ConditionalDeclarations;
};

type Elements = keyof DeclarationAccumulator;

type ConvertResult = {
  [Key in keyof DeclarationAccumulator]: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    [K in keyof Properties]?: Properties[K] | (string & {});
  };
};

type ConvertStylePropsToCSSProperties = (
  /**
   * A value of `null` will remove any default for that property without having to
   * apply your own value. Roughly equivalent to CSS `unset`.
   */
  styleProps: ResponsiveStylePropsWithModifiers,
  options?: {
    defaults?: ResponsiveStylePropsWithModifiers;
    valueMapper?: ValueMapper;
  },
) => ConversionResult;

// Defining these at the top level scope should allow them to be inlined by
// esbuild (https://github.com/evanw/esbuild/releases/tag/v0.14.9) and tsc
// (https://www.typescriptlang.org/docs/handbook/enums.html#const-enums).
const enum Constant {
  // NOTE: Constant.RootElement is used as an object key
  RootElement,
  ModifierParent,
  DeclarationParent,
  PseudoElementParent,
}

type CascadeOrderKeys = keyof typeof breakpoints | keyof typeof modifiers;

type ModifierConfig = {[Prop: string]: Selector};
type BreakpointConfig = {[Prop: string]: '&' | `@media ${Selector}`};
type PseudoElementConfig = {[Prop: string]: PseudoElementSelector};

const OPT_IN_MODIFIER_SET = {
  _active: ':active',
  _focus: ':focus',
  _hover: ':hover',
  _visited: ':visited',
  _link: ':link',
} as ModifierConfig;

const OPT_IN_PSEUDO_ELEMENT_SET = {
  _after: '::after',
  _backdrop: '::backdrop',
  _before: '::before',
  _cue: '::cue',
  _firstLetter: '::first-letter',
  _firstLine: '::first-line',
  _fileSelectorButton: '::file-selector-button',
  _marker: '::marker',
  _placeholder: '::placeholder',
  _selection: '::selection',
} as PseudoElementConfig;

const DEFAULT_BASE_BREAKPOINT = {
  base: '&',
} as BreakpointConfig;

const joinEnglish =
  process.env.NODE_ENV === 'development'
    ? (arr: string[], joiner = 'and') => {
        if (arr.length === 1) {
          return arr[0];
        }
        const joined = arr.slice(0, -1).join(', ');
        if (arr.length < 2) {
          return joined;
        }

        return `${joined} ${joiner} ${arr[arr.length - 1]}`;
      }
    : null;

function identity<T>(arg: T): T {
  return arg;
}

function hasOwn(obj: object, key: any): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function mutateObjectValues<T extends object, R = T[keyof T]>(
  obj: T,
  map: (val: T[keyof T], key: keyof T) => R,
): {[K in keyof T]: R} {
  // Doing this as a mutating for loop is the most performant:
  // https://jsbench.me/i1ls861rj9/1
  for (
    let keys = Object.keys(obj) as (keyof T)[], i = 0;
    i < keys.length;
    i++
  ) {
    const key = keys[i];
    (obj as {[K in keyof T]: R})[key] = map(obj[key], key);
  }
  return obj as {[K in keyof T]: R};
}

function warnOnInvalidProperty(path: PropPath = [], message?: string) {
  // eslint-disable-next-line no-console
  console.warn(
    `${
      path?.length ? `[${path.join('.')}] ` : ''
    }Ignoring invalid property declaration.${message ? ` ${message}` : ''}`,
  );
}

type NestedCSSProperties = {
  [Selector: string]: Properties & NestedCSSProperties;
};

export function convertCSSPropertiesToStyleSheet(
  /**
   * An object where keys are selectors, and values are individual CSS
   * properties (including CSS Custom Properties).
   */
  styles: NestedCSSProperties,
  /**
   * Any value will pretty print the output, otherwise it will be compressed.
   *
   * @default process.env.NODE_ENV === 'production' ? undefined : 2
   */
  prettyIndent: number | undefined = process.env.NODE_ENV === 'production'
    ? undefined
    : 2,
  indentLevel = 1,
) {
  return Object.keys(styles)
    .map((selector) => {
      return `${selector}{${(Object.keys(styles) as (keyof Properties)[])
        .reduce((acc, cssProperty) => {
          if (typeof cssProperty === 'object') {
            acc.push(
              convertCSSPropertiesToStyleSheet(
                cssProperty,
                prettyIndent,
                indentLevel + 1,
              ),
            );
          } else {
            acc.push(
              `${
                // Leave Custom Properties alone but all other CSS Properties need
                // to be converted to valid CSS
                cssProperty.startsWith('--')
                  ? cssProperty
                  : decamelize(cssProperty, {separator: '-'})
              }: ${styles[cssProperty]};`,
            );
          }
          return acc;
        }, [] as string[])
        .join(
          // Double indent since it's inside the selector
          typeof prettyIndent !== 'undefined'
            ? `\n${' '.repeat((indentLevel + 1) * prettyIndent)}`
            : '',
        )}}`;
    })
    .join(
      typeof prettyIndent !== 'undefined'
        ? `\n${' '.repeat(indentLevel * prettyIndent)}`
        : '',
    );
}

// TODO: Can I represent this as nested tuples?
// [
//   border,
//   [
//     hover,
//     [
//       xs,
//       green
//     ]
//   ]

function processOptions({
  valueMapper,
  pseudoElements,
  modifiers,
  breakpoints,
  bannedGlobalValues,
  namespace,
  aliases,
  ...rest
}: CreateOptions) {
  if (!valueMapper) {
    // eslint-disable-next-line no-param-reassign
    valueMapper = identity;
  }

  if (!bannedGlobalValues) {
    // eslint-disable-next-line no-param-reassign
    bannedGlobalValues = [];
  }

  if (!namespace) {
    // eslint-disable-next-line no-param-reassign
    namespace = '';
  }

  if (!aliases) {
    // eslint-disable-next-line no-param-reassign
    aliases = {};
  }

  if (pseudoElements === true) {
    // eslint-disable-next-line no-param-reassign
    pseudoElements = OPT_IN_PSEUDO_ELEMENT_SET;
  } else if (!pseudoElements) {
    // eslint-disable-next-line no-param-reassign
    pseudoElements = {};
  }

  if (modifiers === true) {
    // eslint-disable-next-line no-param-reassign
    modifiers = OPT_IN_MODIFIER_SET;
  } else if (!modifiers) {
    // eslint-disable-next-line no-param-reassign
    modifiers = {};
  }

  if (breakpoints) {
    const breakpointKeys = Object.keys(
      breakpoints,
    ) as (keyof typeof breakpoints)[];
    const baseKeyIndex = breakpointKeys.findIndex(
      (key) => breakpoints[key].trim() === '&',
    );
    // Ensure there is a "base" selector for breakpoints
    if (baseKeyIndex === -1) {
      // eslint-disable-next-line no-param-reassign
      breakpoints = {
        // Object key order is important, and this one must come first
        // TODO: This assumes mobile-first. Support desktop-first?
        ...DEFAULT_BASE_BREAKPOINT,
        ...breakpoints,
      };
    } else if (baseKeyIndex !== 0) {
      // Reorder the keys so the "base" is first
      // eslint-disable-next-line no-param-reassign
      breakpoints = {
        // TODO: Why do I need this type assertion?
        [breakpointKeys[baseKeyIndex]]:
          '&' as BreakpointConfig[keyof BreakpointConfig],
        ...breakpoints,
      };

      if (process.env.NODE_ENV !== 'production') {
        console.warn(
          `Breakpoints must be ordered mobile-first. The "base" breakpoint (${breakpointKeys[baseKeyIndex]}) has been moved to the first position. You should fix this.`,
        );
      }
    }
  } else {
    // eslint-disable-next-line no-param-reassign
    breakpoints = DEFAULT_BASE_BREAKPOINT;
  }

  return {
    pseudoElements,
    modifiers,
    breakpoints,
    valueMapper,
    bannedGlobalValues,
    namespace,
    aliases,
    ...rest,
  };
}

type AliasName = string;

type AliasConfig = {
  [Key in keyof OmitIndexSignature<Properties>]: AliasName[];
};

type CreateOptions = {
  /**
   * Global defaults injected into the returned stylesheet.
   *
   * Will only appear in converted style output when a matching property is
   * passed in, otherwise the defaults will cascade in from the stylesheet.
   *
   * @example
   * const {stylesheet, convert} = create({
   *   defaults: {
   *     color: 'red',
   *   }
   * });
   *
   * convert({
   *   display: 'flex',
   * });
   * // =>
   * // `color` isn't returned since it's already in `stylesheet`
   * // {
   * //   display: 'flex',
   * // }
   *
   * @example
   * const {stylesheet, convert} = create({
   *   defaults: {
   *     color: 'red',
   *   }
   * });
   *
   * convert({
   *   _hover: {
   *     color: 'blue'
   *   }
   * });
   * // =>
   * // Includes 'red' because the `color` property in the style attribute will
   * // overwrite the same property in the stylesheet.
   * // {
   * //   color: 'var(--_hover-on,blue) var(--_hover-off,red)'
   * // }
   *
   * @example
   * const {stylesheet, convert} = create({
   *   modifiers: {
   *     _focus: ':focus',
   *   },
   *   defaults: {
   *    // Hotpink outline when focused
   *     _focus: {
   *       outlineColor: 'hotpink',
   *       outlineStyle: 'solid',
   *       outlineWidth: '2px'
   *     }
   *   }
   * });
   *
   * convert({
   *   _focus: {
   *     // tone down the outline color in this one case
   *     outlineColor: 'rebeccapurple'
   *   }
   * });
   * // =>
   * // `outline-color` is explicitly set to `rebeccapurple`, and will not
   * // fallback to the default of `hotpink`.
   * // `outline-style` and `outline-width` will still apply
   * // {
   * //   outlineColor: 'var(--_focus-on,rebeccapurple)'
   * // }
   */
  defaults?: ResponsiveStylePropsWithModifiers;
  /**
   * A mobile-first list of breakpoint aliases mapped to their media queries.
   *
   * The order breakpoints are defined in is the order of their specificity
   * (most specific first), regardless of the CSS specificity of the media
   * query.
   *
   * The special selector `&` means "no media query" and must come first in the
   * object. If not set, it will be injected for you with the alias `base`.
   */
  breakpoints?: BreakpointConfig;
  /**
   * Modifiers are combined with a generated class name to form a selector used
   * for applying style rules.
   *
   * The order modifiers are defined in is the order of their specificity (most
   * specific first), regardless of the CSS specificity of the selector.
   *
   * Any `&` will be replaced with the generated class name.
   *
   * Modifiers without a `&` will be automatically prefixed with `&`.
   *
   * `true` to opt into a default set of modifiers.
   *
   * TODO: This comment belongs on the React component.
   * Note: When used with pseudo elements, some selectors may not behave as
   * expected such as `::first-child`. This is because pseudo element use will
   * inject a <style> tag as the element's first child
   *
   * @example
   * {
   *   _hover: '::hover',
   *   _groupHover: '[role="group"]::hover &',
   *   _sibling: '& + &',
   * }
   */
  modifiers?: true | ModifierConfig;
  /**
   * `true` to opt into a default set of pseudo elements.
   */
  pseudoElements?: true | PseudoElementConfig;
  valueMapper?: ValueMapper;

  /**
   * Aliases for properties as an ordered array where earlier items in the array
   * take priority over later.
   *
   * Aliases may themselves fallback to other aliases.
   *
   * Can be thought of as optional chaining:
   *
   * const paddingInlineStart = props.paddingInlineStart ?? props.paddingInline ?? props.padding;
   * const paddingInlineEnd = props.paddingInlineEnd ?? props.paddingInline ?? props.padding;
   * const paddingBlockStart = props.paddingBlockStart ?? props.paddingBlock ?? props.padding;
   * const paddingBlockEnd = props.paddingBlockEnd ?? props.paddingBlock ?? props.padding;
   * ...etc
   *
   * @example
   * `justify` is an alias for `justifyItems`:
   *
   * ```
   * const {stylesheet, convert} = create({
   *   aliases: {
   *     justifyItems: ['justify'],
   *   }
   * });
   *
   * convert({
   *   justify: 'center',
   * });
   * // =>
   * // {
   * //   justifyItems: 'center',
   * // }
   *
   * convert({
   *   justifyItems: 'stretch',
   *   justify: 'center',
   * });
   * // =>
   * // {
   * //   justifyItems: 'stretch',
   * // }
   * ```
   *
   * @example
   * `paddingInline` is an alias for `paddingInlineStart` and
   * `paddingInlineEnd`:
   *
   * ```
   * const {stylesheet, convert} = create({
   *   aliases: {
   *     paddingInlineStart: ['paddingInline'],
   *     paddingInlineEnd: ['paddingInline'],
   *   }
   * });
   *
   * convert({
   *   paddingInline: '20px',
   * });
   * // =>
   * // {
   * //   paddingInlineStart: '20px',
   * //   paddingInlineEnd: '20px',
   * // }
   * ```
   *
   * @example
   * `padding` is an alias to `paddingInline` and `paddingBlock` which themselves
   * are aliases to `paddingInlineStart`, `paddingInlineEnd` and
   * `paddingBlockStart`, `paddingBlockEnd` respectively.
   *
   * ```
   * const {stylesheet, convert} = create({
   *   aliases: {
   *     paddingInlineStart: ['paddingInline', 'padding'],
   *     paddingInlineEnd: ['paddingInline', 'padding'],
   *     paddingBlockStart: ['paddingBlock', 'padding'],
   *     paddingBlockEnd: ['paddingBlock', 'padding'],
   *   }
   * });
   *
   * convert({
   *   padding: '20px',
   * });
   * // =>
   * // {
   * //   paddingInlineStart: '20px',
   * //   paddingInlineEnd: '20px',
   * //   paddingBlockStart: '20px',
   * //   paddingBlockEnd: '20px',
   * // }
   *
   * convert({
   *   padding: '20px',
   *   paddingInline: '10px',
   *   paddingBlockStart: '0px',
   * });
   * // =>
   * // {
   * //   paddingInlineStart: '10px',
   * //   paddingInlineEnd: '10px',
   * //   paddingBlockStart: '0px',
   * //   paddingBlockEnd: '20px',
   * // }
   * ```
   */
  aliases?: {
    [Key in keyof OmitIndexSignature<Properties>]: string[];
  };
  /**
   * A list of values that if passed to any styleProp on our Box component should
   * warn the user, and bail early from the css property injection procedure. We
   * do this as there is no good way for us to explicitly disallow this string
   * literal in our types holistically for every style property.
   */
  bannedGlobalValues?: Globals[];

  /**
   * Prefix generated classnames & custom properties with this namespace to avoid
   * collisions with existing styles.
   */
  namespace?: string;
};



// https://www.typescriptlang.org/play?noErrorTruncation=true&ts=4.9.5#code/JYWwDg9gTgLgBAbwMqjAG2AMwJ4Bo4CSAdgMZoCuAJgKYDOAvnJlBCHAOQzZjUC0mdGOwDcAKFTR4CAAosesYHXyyI8ro2asOJWrS48Ro0fupwU4DDgCqRYBCIAeACoA+OAF44NgO5QAhmAOAOr+YMQA8gBGAFbUJDDOLi5iJnAhARExcQmuHnBOcNQAHjDURJS0cOREANZEEN5EcAD8iHA11NgAXPlwjD1E1ABu1FAp3KY+oYl5BcWl5ZUI7Z091XUNTYytTgDaAEQd2PsAunADw6NixhNwAIIYfrQAcn4gpp56UMBEAObXqQewCeAGF7JhgL88ghRHA4LsANKdOA-FbYCCYOAqNSKWgnHpAp6vd67E5iegA24AEWo1DAACVqH5KPY0NgZp5zOgsOyYXC4QBqKBMllENnwhEoppHDH5fGw-lwvxEbCkwolMoVfKIk4KxVw1o0umM5ms9l7BEnFx6-k9C1neaayoQLLxG0GuBGhkis3OHXW-W27WW8nWm48ODhMXYAAywFK-jQtA5CrmGsWcC+PyhAB84ERyCBIqM4HnaNgixA0DbWghGI6M4ySNBKM58Ot6o0A-rWoMRlA4O7zr0bXbB+HTM8IHGE34kym4WmFlqs39S-nC8WB2WK5EqzXEPX01qmy221Vap2iN3FTtB4GLv370G+yWjAB6d9wAAGq9zHAAC2AdhvzgZVKB-AAKP84AAMkPABKdd2CAkC4G8YA0DQOA9xgAD0OAGgmhgCAfz-UDvAAsoqloagIKeURPzApo-CgX5CzKeASJ-GVMG-Cc4AAMWgEhqCnIggkIspsxsOwiAAWWoItRmTXJ3FTdVl0qGC8wLZTt0zXd91vQ9NKdOBTygVsnHbS9NhvflWl6eDLNbV8oFwdy3CHMdR3yIxUhBYU-FKcIwBgOTaAAJgcO4zIzL0TVFNlYseWgwSICFfiSaEFTnYFaNoZoCXJa53wAKnK2FyqElg2AAmAYDAWguk-PQ-BIGoIH7TA0AaAA6ZsQHfPx3wANjGgAWSaAFYZoABgAdmquB9gyyh4zkuc4FSH4BGFUhTAwvCpX2+F+v6s4MKwsDyBIkAQuAEg53FX4ylGELTGVKUE1o+I5LgWVvtYyJ438KBsA3fTAcxExKkg46AIgO64GFWhJGzHbSOFEhyCgWg5IQ-r9mqlaAAFijedBqBW786ZW1JZPsPImaIcJMGIX7smzAA1OdyDoBw+RquFguSyHIg6mpfhYapKGkCACYi+wAA0emgmBvjXeC6yQvNvwAEgQP96AAUlAvN9jQahMBgfZ132b5fga+3LdEogE32MQ4BF1GfWjHCpZl5HygVpW5IATXVmCdfoPWfyNk3zYdkiwFd1bcPu9P9ndz3vZq+gAxqpiAD1Wk8DWtahFy4jPdzPMuKAXHjw3jc17MzYt1bc9GEmfZ-emfffATWfZzmVO5v4+YoQWNIbLUXVieJ8AVaeBcEzCE3irV2AwWck3YZCfhoIpeAJ34iBCvHqEP3TG7ydzRDcTw+X5JjeB2bGlO60w8NMb88xyxtj8OioFNBsD-heAG6MUTwBZHQIgnAfqjH2kdeMAEbRMT2qMMool8zzH6jaREyJUS8TlB-dWQ4ig9F3vGD6B9t6VDXtQDeaAExDg9FGNkM56GqWIdgK0HDhzsGPsUM+kJL4wGvofeeTD+YsM3qMIRHopw8MTHwpEAiHIPmDJ0XUgYkLuDcEMCAhEFT0F2GQpwDpjzw2oadEsBBDHGNMRBVoBBhyPxHrYewY8PYT3+lPeRtBJJ4SnJJIi2YHBz1sYDV0MBcBPw8AqJiBBMSiKKJmCRV80ZgWFHAa2tspQ7SolA+w+AnBIAIjdDCRECl0PUVjEppgMkpK-OfSR18dq3EotRb8vFQLAEqOQWiEFEaolHhzfx+NJ6-GYbQQhcImJOFIkNSWXEAIhXwN4UwEI2ElkwNAQGAc968KYMAfGCTmlNGqADSBaNyBsIIidM0bSpQnyyRfHJdASkhTybskSdEmnFnzMzWp0k-iLPXJM8eMzAlzOCeeWh+9aDsG7HmYSUBRLiQiRC34rNFL6WTDaGF0y-oRSCTPVS+ARHlDER075aKFTJA-JVFajIYB+B+JUSBpzEzdJ4JUS4TQsD5AmLQEg3xwpwGbI8sZUliJUQgaRPwcAwDfBAJtEYArqCLJqgAURKP4eIdwoD+GwPMoWhyIDFUzO3P4apdKbhLHmSCKFgLIT6uwBCpJ8CSygOrAAjOuKKPqzh5mxKMCKdBfVwHRDQkih9C4rSMatIC2c+rp2DXmKK65I0KB+a6mOFla5WQcPXfB-Zm7VWHqkQ1msOowFNeay1MStJxKXgkhUza-AWvkawrengOybESUsr8ABxfwkRjnikgaxc1OrKg-G4qq25zMebdrNb2yonh63GpyJYzosprH4DFmae4W6+0zwHaMUk1pn7PiYlSIZ7dIh3V-qU5s5RNr2G2j-AcjdIbzt7bApSxTIFrqaDzfA2CzWYz-m81IsohjBPA6U4D2BN3mqFbEs9AdIKwYvS24JYaDyYuxfYXFtg-gEqUluZMPar0C1oA5JiSAkZysQfAB6HRYFwCovk4sz0RmmEY5UbwTxNL7qBYjZpP5h2NFJGAxRUA-JeIqlVfuFMihU2trTQeNVUj5ujTuxAK04TNj6lAW17BhRCeemAPG1Nb4cGFJQFzldMaxwQvnfkktOrBzlmHH9RA1YcEKUIZCTsGoufYD3KALnW5Jy7p57WiFfNwn89LWWodFYhajhwVOsXM6sFi-FxLid7W-E7uuVL1d0srQpKTfuX69BgTSj8l+5mZVVmgD0XY7BMC-HYDS0oJQwRWfYCcUdvssuBdy+HVW-X2BzZy-LPLytEHTe66tkO63FtEAKwN3bQWNtySm41sClRWswF8wzW4hJaBRE7aZx7dAVnPeyE4cVDgTBAw67QZQcgo24iLnAUu5czP9zhENmhdm4gOac9bWLbmPPFt1uuIBEJBiUAyzteYE2+uueoPZgISOb5RbomjqrcFEKY7pdjuieOTsLZCzQ8r64ktVZq0Wmn3nfP0H0-xIeAk3u0A+-E77grolwmM9gFZYvGGelpN6U00ZUoFQyllFwo6sTA4LTh9ti9si66Yvqjq+F8qSeuthITrAvpNGN-ENE+AYF-0hiAEZ8B57vOKJ8zpaNu1pSV494kHw4B7sbYxy1cuFcA-wKHt41B715C5JYXkbygpMlKMxDt2Q0RAsiJDOdwfL7vBam8umwvwdflfkxTLQc1vBc2z0ZYF1+p9FN1+QXY6B7V92I9zRxTHv4ih2-L8WfPq56d-AH4ZAqCY3PZA4zuJfnwGFKgw6cmrcV8VExKvmDa+H7843vbze5Kt+P4qFn+2Qtha51XHnq0IvZ2i3bB28WvZX5PwFpvZ37AFYP4dzJxuycS9wpyqDZwlYgBf575fhwg97j59DH4H6Ki7BDhMQxgQAQA1DkBgAzrF6lLqqqBRqQxHA8qbLwCbLarAzB60QwBDhy5D6kJHqYix4QBi5CJMRBA3z5Lno0D5RriyYYaA44QoyVL8aSZ9RtZ4R-J7TQAPSbY4SEFDJcFfiQDLqu6kQ7KSHarcTBS6BRqwJQqBiSbsFi67BMF6JK54bigKZECkhqFmDUDWzO7nrEE4g-KURPT4TUEfqmC4xmqcTtYFRwA0CM4QSoiQKcGBgejEDz40DJjmEA6WH65cCaLTb3BpSaJuCyI7RQACzKItB64kGwDYCaJFFMThB-wDjkG6FfRoBiwSy0hNCbLlDWyUD4BHI244SmBtGUAdFXboQtKzg57-qVFfj3JKRcrUZQhWFAblDvhHKD6dBaGZg1DAD4HxhMBHKdgmGxGPhKKxE15mAcZoCUBcZwA8YjH8Y4JCKHGqaKjyiBjLJATXb2AbSbbbRDL4KiS6CsTNHCa0T3AEFwAAD6siYJWRmu4IkIax2xsq5xGBkxVE0A1AEUz0WEkMfhaI4mQEJAluB0SCqIK+PywqJSyMzshQrEGAJYJgyJMqVEnU4myM5x9RqMjyQKeEispgyMMA+xsuaR5RyIeRZCpJtADJk6fg06kCHhpB7APKEwQ4rQ4pqRpR6ReiPklaRxfQSuhG4QSuM+x+U43gcAb0GyLSZKShsokCKGVKMM1JBJDpy+aRq+sh6+NsOCW+eEqhcBIRTwXQKBg8SBr8veDev+Z+-+RAPQQBfwT+OcYBUAsBSBiBveqBjkZgqA6erMDgpKXM8K8yoSAE4SCqUS4QSQamjcogyaogmA1Q-0zMkq2e1Ak0YJAAnGCTNA4MkQVGSbEolP7ClI9lrpCEkJBAqKoJti1HAJPqFOFJFDFD2U8HQA+nWKIEhK-MKFIlAE0OOYqB4dOWnjyDLvqGLhLp2lLoLEuYVEDuqaDkOPBOKTaDrgqM4heOESArjtWUYDdv6YVLlBZr1gGvCINsNqNgTkBVNrrjfufktiBTBVGVBQqAhQdkditqfqdgdhdowJJjdtcL+ZgEQLmp4E2Z9K2R2TNJBMsDvnQD0DRZUHHGIPXnCGXEAA

type DeepReadonly<T> = Simplify<{
    +readonly [K in keyof T]:
      any[] extends T[K]
        ? DeepReadonly<T[K]>
      : T[K] extends object
      ? DeepReadonly<T[K]>
        : T[K];
}>

type OnlyLiterals<T> =
  T extends string | number | symbol
    ? {} extends Record<T, unknown>
      ? never 
      : T 
    : T 

type NoLiterals<T> =
  T extends string | number | symbol
    ? {} extends Record<T, unknown>
      ? T 
      : never 
    : never 

// `string | 'hi'` and `(string & {}) | 'hi'` will both widen to `string` when used as
// an argument to `keyof`
type ForceNonWideningUnionMembers<T> =
  T extends string | number | symbol
    ? {} extends Record<T, unknown>
      ?  T & Record<never,never> 
      : T 
    : T

type CreateOptions2<A extends DeepReadonly<AliasConfig>> = {
  aliases?: A;
};

/**
 * From https://stackoverflow.com/a/66445507
 * "Conditional type inference with infer [..] will automatically generate an intersection of an arbitrary number of types (without resorting to recursion)."
 *
 * @example
 * ```
 * type Union = UnionOfIntersectingValues<{
 *   readonly backgroundPositionX: (string & {}) | `${string}%` | "left" | "right" | "center";
 *   readonly backgroundPositionY: (string & {}) | `${string}%` | "top" | "bottom" | "center";
 * }>
 * // ^? = (string & Record<never,never>) | `${string}%` | "center"
 * ```
 */
type UnionOfIntersectingValues<
  T extends object, 
  ValueFilter extends 'literals' | 'index-signature' | never = never
> = {
    // -? To remove the `| undefined` from the union so it doesn't interfere with
    // inference next.
    [Key in keyof T]-?: (
      x: 'literals' extends ValueFilter
        ? OnlyLiterals<T[Key]>
        : 'index-signature' extends ValueFilter
          ? NoLiterals<T[Key]>
          : T[Key]
      ) => void
  }[keyof T] extends (x: infer I) => void ? I : never

type UnionOfIntersectingValuesWithNoWidening<
  T extends object,
> =
  // If index signatures are left in the union, TS will widen literals to the index
  // signature type when `keyof` is used within UnionOfIntersectingValues.
  // To combat that, we filter for only literals first, then union the result with only
  // index signatures that are forced to be non widening.
  | UnionOfIntersectingValues<T, 'literals'>
  | ForceNonWideningUnionMembers<
    UnionOfIntersectingValues<T, 'index-signature'>
  >;

/**
 * Retains the literal types even if Typescript could widen them to a primitive type.
 * ExtractArrayValues<{foo?: string[] | number | ('hi' | 'lo')[], bar: (1 | 2)[] | Properties[], yo: 'to' }>
 * => "hi" | "lo" | 1 | 2 | Properties | (string & Record<never, never>)
 */
type ExtractArrayValues<
  T extends object,
  ArrayValueFilter = unknown,
  // Grab only the array types into a union V
  Arrays = Extract<T[keyof T], readonly ArrayValueFilter[]>
> = 
  // Distribute the conditional over every array item in the union V, inferring the
  // type of values in the array
  Arrays extends readonly (infer ArrayValues)[]
    ? ForceNonWideningUnionMembers<ArrayValues>
    // Shouldn't make it here because Arrays was extracted with the `unknown[]` filter
    : never

/**
 * @example
 * ```
 * type Properties = {
 *   color?: 'rebeccapurple' | 'red' | (string & {});
 *   backgroundPositionX: 'left' | 'right' | 'center' | `${string}%` | (string & {});
 *   backgroundPositionY: 'top' | 'bottom' | 'center' | `${string}%` | (string & {});
 * };
 *
 * const aliases = {
 *   color: ['fg', 'textColor'],
 *   backgroundPositionX: ['backgroundPosition'],
 *   backgroundPositionY: ['backgroundPosition']
 * } as const;
 * 
 * type AliasObjects = AliasesToObjectTypes<typeof aliases, Properties>
 * // ^? = {
 *   fg: 'rebeccapurple' | 'red' | (string & {}) | undefined;
 *   textColor: 'rebeccapurple' | 'red' | (string & {}) | undefined;
 *   backgroundPosition: 'center' | `${string}%` | (string & {});
 * }
 * ```
 */
type AliasesToObjectTypes<
  PropertyToAliases extends DeepReadonly<AliasConfig>,
  Properties extends object,
  // Each alias will become an object key, so they must extend index signatures
  Alias extends AliasName = ExtractArrayValues<PropertyToAliases, AliasName>
> = Simplify<{
  // Create an object keyed by the alias names:
  // ```
  // {
  //   backgroundPosition: { ... },
  // }
  // ```
  [AliasKey in Alias]: {
    // Create an object including only the Properties that reference the alias:
    // ```
    // {
    //   backgroundPosition: {
    //     backgroundPositionX: `${string}%` | "left" | "right" | "center";
    //     backgroundPositionY: `${string}%` | "center" | "top" | "bottom";
    //   }
    // }
    // ```
    [
      // Lookup only the property keys that have an alias set
      PropertyKey in keyof PropertyToAliases
        // We're only dealing with arrays, but TS has lost that information by this
        // point, so we have to reassert it.
        as PropertyToAliases[PropertyKey] extends readonly unknown[]
        // Select only properties which have the current alias defined in the Aliases
        ? Includes<PropertyToAliases[PropertyKey], AliasKey> extends true
          ? PropertyKey
          // Other keys have already been handled, or will be handled as we iterate over
          // the remaining PropertyKey and/or AliasKey, so skip it for now.
          : never
        // Shouldn't make it here
        : never
    ]:
      // This conditional is necessary because A only _extends_ AliasConfig, so it could
      // theoretically have keys which aren't in Properties even though earlier type
      // checks would have ruled those out.
      PropertyKey extends keyof Properties
      // Grab the property's type
      ? Properties[PropertyKey]
      : never
  } extends infer O extends object
    // Now get the interstion of the values of each of the Properties that reference this
    // alias:
    // ```
    // {
    //   backgroundPosition: `${string}%` | "center";
    // }
    // ```
    ? SimplifyUnion<UnionOfIntersectingValuesWithNoWidening<O>>
    : never
}>

function create4_9_5<PropertyToAliases extends DeepReadonly<AliasConfig>>(
  options: CreateOptions2<PropertyToAliases> = {}
) {
  return (
    props: Simplify<
      AliasesToObjectTypes<PropertyToAliases, Properties>
      & Properties
    >,
  ) => undefined;
}

const aliases = {
  color: ['fg', 'textColor'],
  backgroundPositionX: ['backgroundPosition'],
  backgroundPositionY: ['backgroundPosition']
} as const;

// TODO: why is `backgroundPosition` coming out as `any`!?
// Should work in TS v4.7.4+
const fn2 = create4_9_5({ aliases: aliases });






export function create(options: CreateOptions = {}): {
  stylesheet: string;
  convert: ConvertStylePropsToCSSProperties;
} {
  const className = '.Box';
  // No global defautls to start
  let globalDefaults: ResponsiveStylePropsWithModifiers | undefined;

  const stylesWithSelectors: NestedCSSProperties = {};

  const {
    defaults,
    breakpoints,
    modifiers,
    pseudoElements,
    valueMapper: globalValueMapper,
    aliases,
    bannedGlobalValues,
    namespace,
  } = processOptions(options);

  type ExtractArrayValues<T extends object> = Extract<
    T[keyof T],
    any[]
  > extends (infer A)[]
    ? A
    : unknown;

  type Aliases = ExtractArrayValues<typeof aliases>;

  type InvertedAliases = {
    [key in Aliases]: (keyof typeof aliases | Aliases)[];
  };

  const inverseAliases = invertAliases();

  const baseBreakpoint = Object.keys(breakpoints)[0];

  const elements = Object.keys(pseudoElements) as Elements[];
  elements.push(Constant.RootElement);

  let cascadeOrderNumber = 0;

  const cascadeOrder = {} as {
    [Key in CascadeOrderKeys]: number;
  };

  // Least specific first
  for (
    let cascadeKeys = Object.keys(breakpoints).concat(
        Object.keys(modifiers),
      ) as CascadeOrderKeys[],
      i = 0;
    i < cascadeKeys.length;
    i++
  ) {
    cascadeOrder[cascadeKeys[i]] = cascadeOrderNumber++;
  }

  // Process the defaults once to inject into the global styles string
  if (defaults) {
    const {style, ...pseudoStyles}: Partial<ConversionResult> =
      convert(defaults);

    if (style) {
      stylesWithSelectors[className] = style;
    }
    //
    const pseudoDefaultKeys = Object.keys(
      pseudoStyles,
    ) as (keyof typeof pseudoStyles)[];

    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < pseudoDefaultKeys.length; i++) {
      const pseudoKey = pseudoDefaultKeys[i];
      const pseudoValue = pseudoStyles[pseudoKey]?.style;
      if (pseudoValue) {
        // TODO: Fix this. It's not undefined by design, but TS doesn't know
        // that yet.
        const pseudoSelector = pseudoElements[pseudoKey].replace(
          '&',
          className,
        );
        stylesWithSelectors[pseudoSelector] = pseudoValue;
      }
    }
  }

  stylesWithSelectors[className] ??= {};

  // See: https://github.com/propjockey/css-media-vars/blob/master/css-media-vars.css
  // Setting up the default state of the CSS space hack:
  // 'initial' = enabled
  // ' ' (space) = disabled
  // A space is a valid value in CSS (so wont trigger the `var()` fallback), but
  // is ignored when the browser is consuming tokens to figure out the final
  // value of the declaration.
  //
  // For example:
  // ```
  // {
  //   color: { xs: 'green', sm: 'red', lg: 'blue' }
  // }
  // ```
  // becomes:
  // ```
  // {
  //   // NOTE: order is important here. We're using mobile-first breakpoints,
  //   // so we check the largest (ie; most specific) ones first.
  //   color: 'var(--_lg-on, blue) var(--_lg-off, var(--_sm-on, red) var(--_sm-off, green))'
  // }
  // ```
  //
  // A more complex example:
  // ```
  // {
  //   color: { xs: 'green', sm: 'red' },
  //   _hover: {
  //     color: { sm: 'blue', lg: 'orange' }
  //   },
  //   _active: {
  //     color: 'rebeccapurple'
  //   }
  // }
  // ```
  // becomes:
  // ```
  // {
  //   color: 'var(--_active-on, rebeccapurple) var(--_active_off, var(--_hover-on, var(--_sm-on, blue) var(--_sm-off, var(--_lg-on, orange))) var(--_hover-off, var(--_sm-on, red) var(--_sm-off, green)))'
  // }
  // ```
  // NOTE: We don't need to set any pseudo elements here as they'll be given their
  // own unique classname & selector within an inline <style> tag at runtime.
  Object.entries({...modifiers, ...breakpoints})
    .filter(
      // A bare '&' has a special meaning; it's an alias for the 'base' styles
      // when no media query applies.
      ([, selector]) => selector.trim() !== '&',
    )
    .forEach(([name, selector]) => {
      const nonMatchingState = {
        [`--${namespace}${name}-on`]: ' ',
        [`--${namespace}${name}-off`]: 'initial',
      };

      const matchingState = {
        [`--${namespace}${name}-on`]: 'initial',
        [`--${namespace}${name}-off`]: ' ',
      };

      let expandedSelector = selector.trim();

      // All toggles start in the "non matching" state
      stylesWithSelectors[className] = {
        ...stylesWithSelectors[className],
        ...nonMatchingState,
      };

      // When a selector matches, they go into the "matching" state
      if (expandedSelector.startsWith('@')) {
        stylesWithSelectors[expandedSelector] = {
          ...stylesWithSelectors[expandedSelector],
          [className]: {
            ...stylesWithSelectors[expandedSelector]?.[className],
            ...matchingState,
          },
        };
      } else {
        expandedSelector = selector.includes('&')
          ? selector.replace('&', '.Box')
          : `${className}${selector}`;
        stylesWithSelectors[expandedSelector] = {
          ...stylesWithSelectors[expandedSelector],
          ...matchingState,
        };
      }
    });

  const stylesheet = convertCSSPropertiesToStyleSheet(stylesWithSelectors);

  // Assign the passed-in defaults ready for subsequent calls to convert().
  // No, we can't set this as const otherwise the call to convert() above
  // would be trying to access `globalDefaults` before initialization.
  // eslint-disable-next-line prefer-const
  globalDefaults = defaults;

  return {
    stylesheet,
    convert,
  };

  function convert(
    styleProps: Parameters<ConvertStylePropsToCSSProperties>[0],
    {
      defaults: runtimeDefaults,
      valueMapper = globalValueMapper,
    }: Parameters<ConvertStylePropsToCSSProperties>[1] = {},
  ): ReturnType<ConvertStylePropsToCSSProperties> {
    const styles = [styleProps];
    let lastIsWeakMerged = false;
    if (runtimeDefaults) {
      styles.push(runtimeDefaults);
    }
    if (globalDefaults) {
      styles.push(globalDefaults);
      lastIsWeakMerged = true;
    }
    // NOTE: purposely ignore any un-merged global defaults as they've already
    // been added to the generated .css file during setup.
    const [converted] = convertRecursive(
      styles,
      lastIsWeakMerged,
      valueMapper,
      undefined,
      [],
      Constant.RootElement,
    );

    // TODO: De-dupe keys
    //
    // 1. store the value in a cache as long as no values are
    //    `unset`/`initial`/`inherit`/etc
    // 2. For every cache value with more than one hit
    //    a) create a new CSS Custom Property for it
    //    b) replace each property's final value with a var() of the cached custom
    //    property

    // TODO: Make defaults static only:
    // 1. Some passed in to the .css file creation which get set as global
    //    fallbacks for unset properties. Also used as fallbacks when a property
    //    (or an alias) _is_ passed in.
    // 2. Allow partial overriding of defaults passed into the `convert()` method
    //    which gets merged with the global defaults before being applied. This
    //    allows dynamically setting some defaults before calling `convert()`
    //    based on other prop values, and avoids the callsite having to know to
    //    check all aliases.
    //
    //    Wait, no that doesn't work because what if the
    //    callsite only wants to set a default / fallback if another specific
    //    property is set to a specific value?
    //
    // Maybe we stick with the current approach of dynamic + static?

    // Our generated styles can be random strings (`var(...)` etc), but the
    // `Properties` from `csstype` doesn't always union strings. We want to play
    // nicely with the `csstype` ecosystem (React et al), so we down-cast the
    // type to pretend it's compatible with Properties (which in practicality it
    // _is_, it's just TS which doesn't know that).
    const rootStyles = (converted[Constant.RootElement] ?? {}) as Properties;
    delete converted[Constant.RootElement];

    // Avoid creating another new object by re-using the result of the function
    // call above
    const result = mutateObjectValues(converted, (pseudoElementStyleProps) =>
      pseudoElementStyleProps
        ? {
            style: pseudoElementStyleProps as Properties,
          }
        : undefined,
    ) as ConversionResult;

    result.style = rootStyles;

    return result;
  }

  function convertRecursive(
    /**
     * Valid:
     * ```
     * {
     *   color: 'blue',
     *   padding: {xs: '100', md: '400'},
     *   _before: {
     *     content: '">"',
     *     display: 'block',
     *   }
     *   _hover: {
     *     color: {xs: 'red', lg: 'green'},
     *     _before: {
     *       content: '"<"',
     *     }
     *   },
     * }
     * ```
     *
     * Invalid:
     * ```
     * {
     *   color: {
     *     _hover: any, // INVALID, only breakpoint aliases allowed
     *     _after: any, // INVALID, only breakpoint aliases allowed
     *     sm: !object, // INVALID, breakpoint values must be concrete
     *   },
     *   _after: {
     *     _hover: any, // INVALID, modifiers cannot be nested in pseudo elements
     *     sm: any,     // INVALID, breakpoints can only be children of properties
     *   },
     *   _hover: {
     *     sm: any,     // INVALID, breakpoints can only be children of properties
     *   },
     *   _hover: '400', // INVALID, modifiers must be objects
     *   _after: '400', // INVALID, pseudo elements must be objects
     *   sm: any,       // INVALID, breakpoints can only be children of properties
     * }
     */
    // TODO: Does this recursive type cause TS to be slow?
    stylePropsObjs: RecursiveValues<ResponsiveStylePropsWithModifiers>[],

    /**
     * Only merge the last style prop object if and preceding objects contain a
     * matching key. In this way, the last prop object is "weak merged".
     *
     * Used because global defaults have been set in the .css file, but the
     * specificity of the style="" attribute is higher, so if a matching prop is
     * passed in we need to ensure the default value is set again on the style=""
     * attribute, otherwise we don't merge it and instead let the .css style catch
     * it.
     */
    lastIsWeakMerged: boolean,
    valueMapper: ValueMapper,
    parent:
      | Constant.ModifierParent
      | Constant.DeclarationParent
      | Constant.PseudoElementParent
      | undefined,
    parentPropPath: PropPath,
    whichElement: Elements,
  ): [ConvertResult, ConvertResult] {
    const parentIsResponsiveDeclaration = parent === Constant.DeclarationParent;
    const parentIsPseudoElement = parent === Constant.PseudoElementParent;

    const mergedProperties: DeclarationAccumulator = {};
    const weakProperties: DeclarationAccumulator = {};
    const lastStyleObjIndex = stylePropsObjs.length - 1;

    // An O(n) recursive algorithm converting the given set of style prop objects
    // into a valid CSS style object.
    // It:
    // 1. Merges the objects.
    //    - Earlier objects overwrite values of later ones.
    //    - Primitive values are expanded to {xs: <value>} to ensure deep merge
    //      works as expected
    // 2. Expands aliases to their concrete properties.
    //    - Earlier aliases overwrite values of later ones (as per config order)
    for (
      let whichStyleObj = 0;
      whichStyleObj < stylePropsObjs.length;
      whichStyleObj++
    ) {
      const styleObj = stylePropsObjs[whichStyleObj];
      const styleProps = Object.keys(styleObj) as (keyof typeof styleObj)[];
      // Can't use a for..of here because we're modifying the array mid-loop, but
      // the iterator returned by for..of will not include items pushed onto the
      // array.
      // eslint-disable-next-line @typescript-eslint/prefer-for-of, no-labels
      stylePropLoop: for (let i = 0; i < styleProps.length; i++) {
        const maybeAliasedProp = styleProps[i];
        const value = styleObj[maybeAliasedProp];

        // Ignore null/undefined values
        if (value == null) {
          continue;
        }

        // This is an alias
        const aliasTargets = inverseAliases[maybeAliasedProp as Aliases];
        if (aliasTargets) {
          // It expands into one or more properties, so iterate over each of them
          // eslint-disable-next-line @typescript-eslint/prefer-for-of
          for (let alias = 0; alias < aliasTargets.length; alias++) {
            const target = aliasTargets[alias];
            // If the target property doesn't have a value set, set it now.
            // Otherwise if it has a value already, skip it since existing values
            // are more specific and take precedence over aliases.
            if (styleObj[target] == null) {
              // TODO: This mutates the input object, should we clone it?
              // @ts-expect-error Fair enough; this is an incredibly complex
              // union!
              styleObj[target] = value;
              // Inject the key into the object keys array ready to be iterated next
              styleProps.push(target);
            }
          }

          // Ignore this property, but continue to process the now-resolved
          // properties
          // NOTE: The alias is now unused, but we don't bother deleting it - the
          // garbage collector will handle it later, and since we're doing a
          // single O(n) iteration of the object, we won't accidentally revisit
          // that value in the future.
          continue;
        }

        // Values from here are guaranteed to be a non-alias

        // Ensure the property doesn't exist in an earlier object (ie; don't try to
        // overwrite).
        for (
          let prevStyleObj = 0;
          prevStyleObj < whichStyleObj;
          prevStyleObj++
        ) {
          if (stylePropsObjs[prevStyleObj][maybeAliasedProp] != null) {
            // Continue the outer loop by jumping to the label
            // eslint-disable-next-line no-labels
            continue stylePropLoop;
          }
        }

        // Now the property is guaranteed to be non-aliased
        const prop = maybeAliasedProp as keyof Properties;

        // Now we can process this value
        const propIsBreakpoint = hasOwn(breakpoints, prop);
        const propIsModifier = !propIsBreakpoint && hasOwn(modifiers, prop);
        const propIsPseudoElement =
          !propIsBreakpoint && !propIsModifier && hasOwn(pseudoElements, prop);
        const propIsDeclaration =
          !propIsBreakpoint && !propIsModifier && !propIsPseudoElement;
        const valueIsObject = typeof value === 'object';
        // TODO: How to narrow 'prop' here?
        const propPath: PropPath = [...parentPropPath, prop as PropPathValues];

        // NOTE; We do the property checks early like this because it minifies
        // really well in production mode:
        // https://esbuild.github.io/try/#dAAwLjE5LjExAHsgbWluaWZ5OiB0cnVlIH0AZnVuY3Rpb24gZnVuYygpIHsKICBjb25zdCB3aG9hID0gZm9vLmJhcjsKCiAgaWYgKGZvbyAmJiB6aXApIHsKICAgIC8vIElnbm9yZQogICAgcmV0dXJuOwogIH0KCiAgaWYgKGJhciAmJiB6aXAgfHwgd2hvYSkgewogICAgLy8gSWdub3JlCiAgICByZXR1cm47CiAgfQoKICBjb25zb2xlLmxvZygnZG9uZScpOwp9CgpleHBvcnQgeyBmdW5jIH07
        // Ignore null & undefined values
        // Optimisation: When an explicit 'unset' is passed in, we might be able
        // to simply not return anything ('unset' is the browser's default). Except
        // when there's a matching weak value set; we don't yet know if the value
        // can merged further up the tree.
        if (
          value === 'unset' &&
          (!lastIsWeakMerged || stylePropsObjs[lastStyleObjIndex][prop] == null)
        ) {
          continue;
        }

        if (!parentIsResponsiveDeclaration && propIsBreakpoint) {
          process.env.NODE_ENV === 'development' &&
            warnOnInvalidProperty(
              propPath,
              `Breakpoint props can only be specified directly on a declaration property. For example: { color: { sm: 'red', lg: 'blue' } }.`,
            );

          // ignore this invalid property
          continue;
        }

        if (parentIsResponsiveDeclaration && !propIsBreakpoint) {
          process.env.NODE_ENV === 'development' &&
            warnOnInvalidProperty(
              propPath,
              `When specified as an object, \`${parentPropPath.at(
                -1,
              )}\` can only contain the keys ${joinEnglish!(
                Object.keys(breakpoints),
                'or',
              )}.`,
            );

          // ignore this invalid property
          continue;
        }

        if (
          parentIsResponsiveDeclaration &&
          propIsBreakpoint &&
          valueIsObject
        ) {
          process.env.NODE_ENV === 'development' &&
            warnOnInvalidProperty(
              propPath,
              `Breakpoint values cannot be an object.`,
            );

          // ignore this invalid property
          continue;
        }

        if (parentIsPseudoElement && propIsModifier) {
          process.env.NODE_ENV === 'development' &&
            warnOnInvalidProperty(
              propPath,
              `Pseudo elements cannot contain modifiers. Try {${parentPropPath.at(
                -1,
              )}: {..}, ${prop}: { ${parentPropPath.at(-1)}: {..}}}`,
            );

          // ignore this invalid property
          continue;
        }

        // Modifiers must be objects
        if (!valueIsObject && propIsModifier) {
          process.env.NODE_ENV === 'development' &&
            warnOnInvalidProperty(
              propPath,
              `Modifier \`${prop}\` must be an object.`,
            );

          // ignore this invalid property
          continue;
        }

        // Pseudo elements must be objects
        if (!valueIsObject && propIsPseudoElement) {
          process.env.NODE_ENV === 'development' &&
            warnOnInvalidProperty(
              propPath,
              `Pseudo element \`${prop}\` must be an object.`,
            );

          // ignore this invalid property
          continue;
        }

        // Weak style props are only merged in if there's an equivalent strong
        // property somewhere in the style props, so we need to keep them seperate
        // while we're recursing and only merge them as the style prop is
        // detected.
        // Since the weak object can only be last, we know the merged properties
        // wont have any more added, and so can choose to merge directly into that
        // object if the property exists.
        const properties =
          lastIsWeakMerged && whichStyleObj === lastStyleObjIndex
            ? weakProperties
            : mergedProperties;

        // Process a non-object concrete value.
        // Eg; {color: 'red'}
        // or
        // {sm: 'blue'}
        if (parentIsResponsiveDeclaration) {
          // The declaration is actually the parent object, so we grab that from the
          // path (eg; { color: { sm: 'red' } }).
          // TODO: What about aliases?
          const declaration = parentPropPath.at(
            -1,
          ) as keyof ResponsiveStyleProps;

          // Global defaults get mapped earlier in the process
          const mappedValue =
            lastIsWeakMerged && whichStyleObj === lastStyleObjIndex
              ? value
              : valueMapper(value, declaration, propPath);

          // Since Typescript doesn't have negation types (`string & not 'inherit'`),
          // we need to do a runtime check for invalid values because some of the
          // csstype types have a `| string` union which then allows some values to
          // sneak through at runtime.
          invariant(
            !bannedGlobalValues.includes(
              mappedValue as typeof bannedGlobalValues[number],
            ),
            `${
              propPath?.length ? `[${propPath.join('.')}] ` : ''
            }${mappedValue} is a disallowed value. Please use a different value.`,
          );

          insertIntoProperties(
            properties,
            whichElement,
            declaration as keyof Properties,
            // TODO Not sure why TS isn't narrowing prop down correctly here. it could
            // only possibly be one of the responsive object keys at this point.
            prop as CascadeOrderKeys,
            mappedValue,
          );
        } else {
          // For this and following style objects, gather up the ones that have
          // values so we can recurse with them.
          // key
          let lastIsWeakMergedForRecursion = lastIsWeakMerged;
          const stylePropObjsForRecursion: typeof stylePropsObjs = [];
          for (
            let otherStyleObj = whichStyleObj;
            otherStyleObj < stylePropsObjs.length;
            otherStyleObj++
          ) {
            const otherObjsValue = stylePropsObjs[otherStyleObj][prop];
            if (otherObjsValue != null) {
              stylePropObjsForRecursion.push(
                // Normalize declarations to responsive object format
                // eg; `{color: 'red'}` becomes `{color: {xs: 'red'}}`
                // TODO: How do I tell TS this is correct?
                propIsDeclaration && typeof otherObjsValue !== 'object'
                  ? {[baseBreakpoint]: otherObjsValue}
                  : otherObjsValue,
              );
            } else if (otherStyleObj === lastStyleObjIndex) {
              lastIsWeakMergedForRecursion = false;
            }
          }

          const [nestedMergedProperties, nestedWeakProperties] =
            convertRecursive(
              stylePropObjsForRecursion,
              lastIsWeakMergedForRecursion,
              valueMapper,
              /* eslint-disable no-nested-ternary -- It's terse & readable */
              propIsModifier
                ? Constant.ModifierParent
                : propIsBreakpoint
                ? Constant.DeclarationParent
                : propIsPseudoElement
                ? Constant.PseudoElementParent
                : Constant.DeclarationParent,
              /* eslint-enable no-nested-ternary */
              propPath,
              // Switch to the relevant pseudo element if encountered
              // TODO: How to narrow the type of `prop` here?
              propIsPseudoElement ? (prop as Elements) : whichElement,
            );

          // styleProps = { color: 'red' }
          // weakProps = { _hover: { color: 'red' } }

          // TODO: How do we narrow `prop`'s type here?
          // Ie; it's _hover, _active, etc
          const condition = propIsModifier
            ? (prop as CascadeOrderKeys)
            : baseBreakpoint;

          // Now that we've got the result of recursing, we need to inject these
          // values into the individual properties we know about so far.
          // For the root element, and the pseudo elements.
          // eslint-disable-next-line @typescript-eslint/prefer-for-of
          for (let i = 0; i < elements.length; i++) {
            const element = elements[i];

            if (lastIsWeakMergedForRecursion) {
              propertyIterator(
                // May be merged properties or weak properties
                properties,
                element,
                condition,
                nestedWeakProperties[element],
              );
            }

            propertyIterator(
              mergedProperties,
              element,
              condition,
              nestedMergedProperties[element],
            );
          }
        }
      }
    }

    if (lastIsWeakMerged) {
      // When a global default is set, and a corresponding style prop is set, they
      // must be merged together before they're stringified to ensure the cascade
      // order is preserved.
      // TODO: Is there a more efficient way of doing this without having to loop
      // over the entire globalDefaultProperties object every time? Maybe move it
      // into the above loop which is already going over the objects?
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const declarations = weakProperties[element];
        if (declarations) {
          const declarationKeys = Object.keys(
            declarations,
          ) as (keyof typeof declarations)[];
          // eslint-disable-next-line @typescript-eslint/prefer-for-of
          for (let x = 0; x < declarationKeys.length; x++) {
            const key = declarationKeys[x];
            const declarationConditions = declarations[key];
            const runtimeDeclaration = mergedProperties[element]?.[key];
            if (runtimeDeclaration) {
              // merge the cascade-ordered declarations of the weak properties back
              // into the strong property's declaration
              if (declarationConditions) {
                // Iterating a sparse array with .forEach is faster than a for() loop
                declarationConditions.forEach((condition, cascadeIndex) => {
                  // Only set the runtime value if it's not already set (ie;
                  // runtime values override global defaults)
                  runtimeDeclaration[cascadeIndex] ??= condition;
                });
              }

              // Now that it's merged, delete it so it doesn't get merged again
              // later
              delete declarations[key];
            }
          }
        }
      }
    }

    return [
      mutateObjectValues(mergedProperties, spaceHackStringifier),
      mutateObjectValues(weakProperties, spaceHackStringifier),
    ];
  }

  // Convert array of { value, condition } to the Space Hack CSS
  function spaceHackStringifier(
    elements: DeclarationAccumulator[keyof DeclarationAccumulator],
  ) {
    return elements
      ? mutateObjectValues(elements, (values) =>
          // Iterating a sparse array with .reduce is faster than a for() loop
          values == null
            ? ''
            : values.reduce(
                (output, {value, condition}) =>
                  condition
                    ? `var(--${namespace}${condition}-on,${value})${
                        output
                          ? ` var(--${namespace}${condition}-off,${output})`
                          : ''
                      }`
                    : `${value}`,
                '',
              ),
        )
      : undefined;
  }

  function propertyIterator(
    whichProperties: DeclarationAccumulator,
    nestedElement: keyof ConvertResult,
    condition: CascadeOrderKeys,
    values?: ConvertResult[keyof ConvertResult],
  ) {
    if (values) {
      const declarations = Object.keys(values) as (keyof typeof values)[];
      // Merge each delcaration into the property object for this iteration.
      // Later, these values will get turned into strings
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < declarations.length; i++) {
        const declaration = declarations[i];
        values[declaration] != null &&
          insertIntoProperties(
            whichProperties,
            nestedElement,
            declaration as keyof Properties,
            condition,
            values[declaration],
          );
      }
    }
  }

  function insertIntoProperties(
    properties: DeclarationAccumulator,
    whichElement: Elements,
    declaration: keyof Properties,
    condition: CascadeOrderKeys,
    valueToInsert: unknown,
  ) {
    // Have to do this chained assignment to workaround TS: "Type narrowing
    // does not occur for indexed access forms e[k] where k is not a
    // literal."
    // See: https://github.com/microsoft/TypeScript/issues/49613#issuecomment-1160324092
    // eslint-disable-next-line no-multi-assign
    const element = (properties[whichElement] ??= {});

    // Initialize as an array (not an object) to retain numerical key
    // ordering, and NOT insertion order
    // eslint-disable-next-line no-multi-assign
    const conditionalDeclarations = (element[declaration] ??= []);

    conditionalDeclarations[cascadeOrder[condition]] = {
      // Given {color: {xs: 'green', sm: 'red', lg: 'blue'}}
      // and baseBreakpoint = 'xs'
      // When `prop` is 'sm' or 'lg', we set it as the 'condition'.
      // When `prop` is 'xs', there's no 'condition'.
      //
      // Given {color: 'red'}
      // Then there is no condition.
      condition: condition === baseBreakpoint ? undefined : condition,
      value: valueToInsert,
    };
  }

  /**
   * Leverage the ordered array of stylePropAliasFallbacks to generate a
   * linked-list style data structure suitable for generating a tree-like data
   * structure.
   *
   * Concretely, we're converting this:
   * {
   *   paddingInlineStart: ["paddingLeft","paddingInline","padding"],
   *   paddingInlineEnd: ["paddingRight","paddingInline","padding"],
   *   paddingBlockStart: ["paddingTop","paddingBlock","padding"],
   *   paddingBlockEnd: ["paddingBottom","paddingBlock","padding"],
   * }
   *
   * into this:
   *
   * {
   *  padding: ["paddingInline", "paddingBlock"],
   *  paddingInline: ["paddingLeft", "paddingRight"],
   *  paddingBlock: ["paddingTop", "paddingBottom"],
   *  paddingLeft: ["paddingInlineStart"],
   *  paddingRight: ["paddingInlineEnd"],
   *  paddingTop: ["paddingBlockStart"],
   *  paddingBottom: ["paddingBlockEnd"],
   * }
   */
  function invertAliases(): InvertedAliases {
    return (Object.keys(aliases) as (keyof typeof aliases)[]).reduce(
      (memo, property) => {
        const aliasProperties = aliases[property];
        aliasProperties &&
          aliasProperties.forEach((alias, index) => {
            // Checking if a value exists for `memo[alias]`, and if not it'll
            // assign it a new value of `[]`. Either way, it'll set the variable
            // `targets` equal to the either existing array, or newly created
            // array.
            // eslint-disable-next-line no-multi-assign
            const targets = (memo[alias] ??= []);

            // The aliases array is ordered, so this alias points to the alias
            // immediately before it. If this is the 0th alias, it points at the
            // property itself.
            const target = index === 0 ? property : aliasProperties[index - 1];
            if (!targets.includes(target)) {
              targets.push(target);
            }
          });

        return memo;
      },
      {} as InvertedAliases,
    );
  }
}
