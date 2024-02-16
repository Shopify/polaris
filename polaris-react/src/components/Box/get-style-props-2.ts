'use strict';
/* eslint-disable @typescript-eslint/consistent-type-definitions, @typescript-eslint/consistent-indexed-object-style, @typescript-eslint/ban-types -- types are stricter and better. Shhhh */

/*
 * PERFORMANCE
 *
 *
 * Use `Object.keys()` over `Object.entries()`
 * -------------------------------------------
 *
 * Object.keys() appears to be slightly faster
 * (possibly because Object.entries returns an iterable that the JS engine has
 * to construct on every call wheras Object.keys returns a pre-calculated array
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
import type {Globals, StandardLonghandProperties, Properties as CSSProperties} from 'csstype';

import type {
  ResponsiveStyleProps,
  ResponsiveStylePropsWithModifiers,
  ValueMapper,
  Properties,
  PropPath,
} from './generated-data';

type PropertyValue<TValue> = TValue extends infer TUnpacked & {}
  ? TUnpacked
  : TValue;

type RecursiveValues<T> = Exclude<
  // csstype uses the (string & {}) trick to stop TS from simplifying a type
  // like `'red' | string` down to just `string`.
  // However, `(string & {}) extends Record<any, any>` now returns 'true'
  // whereas `string extends Record<any, any>` returns false. So we "unpack"
  // those values here to ensure we're dealing with the actual type.
  PropertyValue<T> extends Record<any, any>
    ?
        | T
        | {
            [Prop in keyof T]: Extract<
              // `extends any` distributes the types over every item in a possible union
              T[Prop] extends any ? RecursiveValues<T[Prop]> : never,
              // Only interested in Records in the union
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



const OPT_IN_MODIFIER_SET = {
  _active: ':active',
  _focus: ':focus',
  _hover: ':hover',
  _visited: ':visited',
  _link: ':link',
} as ModifiersShape;

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
} as PseudoElementsShape;

const DEFAULT_BASE_BREAKPOINT = {
  base: '&',
} as BreakpointsShape;

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

function warnOnInvalidProperty(path: unknown[] = [], message?: string) {
  // eslint-disable-next-line no-console
  console.warn(
    `${
      path?.length ? `[${path.join('.')}] ` : ''
    }Ignoring invalid property declaration.${message ? ` ${message}` : ''}`,
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

function processOptions<Options extends object>({
  valueMapper,
  pseudoElements,
  modifiers,
  breakpoints,
  bannedGlobalValues,
  namespace,
  aliases: aliasesOpt,
  ...rest
}: Options): Required<Options> {
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

  const aliases = aliasesOpt ?? {};

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
        [breakpointKeys[baseKeyIndex]]: breakpoints[breakpointKeys[baseKeyIndex]],
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



// https://www.typescriptlang.org/play?noErrorTruncation=false&ts=5.3.3#code/JYWwDg9gTgLgBDAnmApnA3gZVGANsAM0QBo4BJAOwGNcBXAExQGcBfOAqCEOAciVQC0BZjB4BuAFA5o8fmnRxMMAIYV6yqPQAyECgHMAFqvoAFTqljBmcZUzhmIFmFbtsOXXlSZM54iRLlFHHwiAFUKYF0AHgAVAD44AF44cIB3KGUwKIB1DLBKAHkAIwArFCoYWLi4yUDczMLS8sr4pLgYuBQADxgUNTtaCgBrCghUijgAfgw4IZREAC52uDYlihQANxQoWuQ0NLyqto7u3v6ZucW4QZGxibZpmIBtACJLl4BdODXN7ckAvZwACC+FsADllCA0MkfFBgPp-oEQcBbABhXQEYB6NroCRwOBPADS8zg8Nm8wgBHs5m2zmYHyWyPBkJQTw+khYu1QcAAIigUGAAEooZT0XS4RBHZLYcAhSW4-H4gDUUBFYooEoJhNJE0ulPaDLxivxqkQbM6PT69Dsz0JHyNxvx0z5AuFovFkttHziDsVSy9FrO1rgECaFV9Tt5-KFao9sSJ3ojfvaCY5PoB3IKGsQWmAvQyuCYUqNJ0t51h8OxAB84BRaCAits4DWmIgGxBcL7pug2KcrXZhVRoPRYqQbqNxj7HVNa78oHAk-6F8al-5AmCILn88pC8X8aWg3YK-pm7X6435y220UO12ML2y8HB8PR9dhhOKFPHY9l46flt519f8m38AB6UC4AAA2PateAMYAeEgmw1CggAKGC4AAMnvABKU8eHgxC4FSYBcFwOAbxgAxiOARgJhgCAoJgpDUgMPpriYFB6BsJgJHA5CbCgPR6z6WRGMgvUCEgjM0AAMWgKgUA3ChslovpK3CSIKAAWRQBttiLVpEhLQN+zgDCazrfTL3M69b2NbsH0POBn00V9xzuL8HP3LCXPKF91gA4hAu2BJF2WID2jXQFUVVZRegKMBnF0JgACYoiBUzzhdGN3WzDLQSYdEKExPRqhxI0dxRTimEmRkOX+UCAComrxJq4FkzhuAMGAYDAJgFnAnxlCoIYIAAghcDGAA6IcQFA5RQIANiWgAWVaAFYNoABgAdjauAXmK+g8y0ncEEBeFhFVag0BIqidWuglpumr4SLImxaAYkB4uAKgd01PQ+m2eK0FUHV804iotJDKlwY0Io8wyKBEDPazYYu1A7FQ+6DAgL64FVJgZErBBGNVKhaCgJgtJw6aXjag6AAFukhPAUAOyCuYOwJNN0No+YoAoCEoSHmkrAA1HdaGYKIFXa-E4vVTUihGoY9E4QZTAgGnkooAANJZ0JgOET2wns8JrSCABJ0BglgAFIkJrF5cBQAgYBeU8XjhQxPe9xSKHzF5JDgBXCdjbMKLVjX8bUEwddO3QAE0jYw82WEtqDbftp3vYYsAvZdyjvqLw7A+D0P2pYKd2v4gA9aZkmN03sWw1yRxCqBgrnOIs5tu2TcrR3nfL0TtgZsOoO5sPQJklIIl0YXRYM8X9CluhZZMvtzlDMoKlII0N5l2TSPzLLgx4fBt0LHh8PhRgugEGm9AoeKqZQO-LLnNou4kBJkgKkVPxAQjxyZ6XGmgKiaBII1i1u7eEXEkLuG4NAt8MNiakngGKZgFA+AQ22NdO6eYDC+n4ldbYfRFKzh6NNX0RISRkkkgaUBRskxdCWFfPMINb4XzsMfFAp9cD5iTJGLMEotw8MMgwxAiZpz4k4Q-boz8sRvxgB-O+O9gwCKESI+RippgbkkQWaRxJZFeXkf6GR9ppx4USAkDYEBaJGhYE8ZhMQvhaOxhwx6TYyB2IcU47i0wyDfFnABaK3JBbLyDqvaG69pbMFUlRDcqk6KViiNvR8dg97NGIP-JIRp+JkCpEoro5lVHvyJoJNAbsPY6gQGxdBuhSAxEwDRD6JE6JwGvlIsmjS0BlKKRBF+aiP6YzumxCYEkKRSVJAMTi3FcZkmiSLWJ1M156AEUwOh+J+IxEYnNVWsgjAwFIKkNAmJhFNgINAEMUdekmPYMAamZyBkTEGDDNBRNaDCJog9D0wydSPwqa-Kp1gqLxRqewBSXF+mNlrPzLp6l9C7NPKsleGz4lbMSYZUgXCb5MB4F+Gs8koCKWUmklFehBa6WskWX0GL1lQ2cAkzeeLeBlJUWC9RqpiW+hqGBFqB1hQqHhHYNBjzzpyDsL8CYhB2h7CYFQOESU4BDl+UstS9E2KoMYsoOAYA4QgFOlsCZuz2oAFEegZAqECKAGREDbLlrciAdVzJD30OaSy54mw1lQgRBC+Epo8BwmyUgqsoBGwAIynlSmGr4NYHBOBcOGuAiAICcIYnfGuB17GHXgmXV2EAy6xprKlU8ybaQuFPC3Um7d-JuS7qQLufc2pz0CNak2I0YD2sdc6rJzlckHyNH25QTrEm6KbMkDy4x8l7IggAcQyEUe5mo0EaEdRMuw8IGI2GaRMCWo6HXjrsMkLttqWhuNmQaUgSsPTAhPROzeU6oBsh9AA38-EeTAArEUL6UCmlDjUEnN+5FIHzjnKjTd46sF6QaWgz5-MJakAoQ60m0CgWBH1BsXFCGmkwcQMex1srskRzypqVCaHH39txQmu8ZKKW6CpREfQtK9IXiLGO59MsmAWP4pgPGmq8HwB+nMLBcA2KqgouUZQtBOI0dPcRWwgZL1wtxgMqCs6KBsmQWfbYkU-58WFVPFmXQ2Zu05jPdqgQq2WGsIAg6+IhxTSgO6ngqpGxUH+mAKm7Mv68FVPQALdaza4SroqVWo1Y5awTrrLShteB1NEPhX2PUAs8ArtsALA9c6j1C23cLTno7Rc1vHROetU68ALhlkuXAMtZagDlnOnq9Aj1renIrU9OSMynsBnwNhCoOYwMVlz0AlhPB4AQPQPB8W9B6OiVzPAPjzvDlF9WZXtbxd0Ilyb62Yvle23glbxX9ubbi6Bqre2Y7nYq1pZbB02Aqf6zACLPNARMiYMUfeMAz3AiG0wA533mgxCVVEOQ+oqq2GYKQOzdI+MHQbk3EbU98TTc4Z58oPm-Nuwy0FkLnWLanngZidY9AIv4nmzARb43AsoC89jqA-nUtcQJ613yRO4FqAQWTinJWNtxy26BzhjXmuD1bu1-1hPM4RZYFZ6Ss956feYEDsMMBQdY0yfiOHiADnK9I85HKbplaSk+8VUqcR53UkcNW6wXiQxq6t-xS1I1qJQ7sO9ciXmuBgwmMO+AlxSCYOgajEA8n4BaOBd0UFYyiajsKnw-71UIRQjaBent3HnU671wD0gn2U8oA-W0GUeBCDyiBbFEUvQBL+-JIgOFRRUYboT2-KEA0gVcwV3AfiQD+L4jO4Li7eslgKBetNFYTuIJy4XdPLvTxPtmIaZ9hkKPgEQUr6DGvaudQ0AYKTB9aC4c1shfAVURDbqafdwsMhEFO839XzP-vN3B93d0CP+-xoB+xdfwbJYuXWuS6HTJZFppb+wuyNYhwf6RbP7f5HZVb-4S55zgHjxQBFoFxFp1YgCQHGh94rD37T5r6z70JJj8Q6AQBDC0BgBrpN5NJGo26wCoyXASqnKSbKBmrwwJ6cQwBJg66L5MI3rZ4QD66iLd4QTZCfzSYPqMBVQngaaEZMARoExtKsF2BTQDYn6PTQA-R6wUQ0G-oiH8SQC7pB6MQXKsFmp7pxTeC0hYJorTgqaCH65PC8HzCeJkb3pRzaZsgGEQSYAoBuwVDUGGo0j2Ye7wRUDURGAWFAZUw3TwDu5wCMCk5wpkhoLCH6IhLUB0CMBFiOEA7OEhFIBmIrZJ62BmIJD24mwywiGRguFEb6Iz4FDQLzhMHmFgy4BKyoyNjsRGBqBuz0CkB3Ke4yasF9FwoqZmHcIZDV4QY1GiGaaqg-Twikx1HIT0CgR3IL7zAmHmRDDABUF5gwrzgTh2GWLhIGb6ICZCa4D0AiZwBiaDLwBSYcz6LARQC+iGjTj7LwR2DAYnR6znS-qziKTeAaBdGybyZoCZQPoAD6XiMJpRRUGIWIOxhxGqNxJBEE0C0AKAzg-0ZEqMURaArRrEf0buN0+CZIR+duWwOq+MhgnQGg+ATYcgmJ6qbEo0Hu+MNxbRhMvycKVEOsaA+MMApx2uhRiAi+9uzC1JvEXxS6K6mmdBTgiAPAEqewQewQhAVg3EmCZh-0EwJ0f6AGIYAEAybJSGEwQ4DqzQEoSY0wspBR9BRRrh4Uf8+ITkZk1GBQie-u9+G4qQcAQMJygyzKOh+oaCuG7KGMIoERGMh+hRx+LBZ+lCF+VE+hOBEEV+9+d+mZD+8xT+pWL+R2f+LWiBo8LwEBochBBBM+uZBiC8WkMSYs2K2yySBgqS2qGSBQFibxEgua88JeIQOp+uquP2GuW84pzpuuQhAOieRukcEoBU1U5uWIluRospvpjuRowoTAvy8AyQo5EAwOFQE5uREpOe1UMO1uKazARejmM+Q5ZeGGTSlpRxIJMmvUfiPIlqn0e6c07MvQaKMiDSzCu5+5K+T5YQi8FAUQ4Fwi1iPocuEgBAgw0M-MKqVeKAq0MJAAnDCRtFEHkVeQbmZAuRRqboVKuWVHEKhEaI4HrANHABvglElFpGlERRebOSRZ+j2BIHhEAqqLyhMHRcaMqUxVBZKDwRoM4DuFEFBSOQDmOSDmDsRdDgoTebbnxhYviNhLKQKlbgEm+EkYguTv2f4C9oNiRRVM5h2LTpNtNrNtVqcDTk1idoWQLrAaBrtjwF-odqBstlbn5ULpVhNr5TAf5XrA9k9r8SlK9mBBBDEAUDyAUEsKxKjECZBMFUPlpEhHNPvgTCppBKaJBAAISTB8S+HXFLLQBDANLKEbCrTTS7TTSrRKgSCWUEAUAVrJCYWgw4X4UbSoQKDu7MBLCjWuA4T-BdWpTDX84HYhVaQi4oFOXo507BYrA4QSBAA

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
  // Grab only the array types into a union `Arrays`
  Arrays = Extract<T[keyof T], readonly ArrayValueFilter[]>
> =
  // Distribute the conditional over every array item in the union, inferring the
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
 * type AliasObjects = AliasesToObjectTypes<Properties, typeof aliases>
 * // ^? = {
 *   fg: 'rebeccapurple' | 'red' | (string & {}) | undefined;
 *   textColor: 'rebeccapurple' | 'red' | (string & {}) | undefined;
 *   backgroundPosition: 'center' | `${string}%` | (string & {});
 * }
 * ```
 */
type AliasesToObjectTypes<
  Properties extends object,
  PropertyToAliases extends DeepReadonly<PropertyToAliasesShape<Properties>>,
  // Each alias will become an object key, so they must extend index signatures
  Alias extends AliasName<Properties> = ExtractArrayValues<PropertyToAliases, AliasName<Properties>>
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
      // This conditional is necessary because A only _extends_
      // PropertyToAliasesShape, so it could theoretically have keys which
      // aren't in Properties even though earlier type checks would have ruled
      // those out.
      PropertyKey extends keyof Properties
      // Grab the property's type, simplified so we can distribute over the
      // union correctly
      ? Properties[PropertyKey]
      : never
  } extends infer O
    // Now get the interstion of the values of each of the Properties that reference this
    // alias:
    // ```
    // {
    //   backgroundPosition: `${string}%` | "center";
    // }
    // ```
    ? UnionOfIntersectingValuesWithNoWidening<O>
    : never
}>

type SimplifiedAliasesToObjectTypes<
  Properties extends object,
  PropertyToAliases extends DeepReadonly<PropertyToAliasesShape<Properties>>,
  Result = AliasesToObjectTypes<Properties, PropertyToAliases>
> = {
  // Simplifying the union forces better IDE auto complete.
  [Key in keyof Result]: SimplifyUnion<Result[Key]>
}



/**
* Create custom type error. Not 100% secure as it could be abused with:
* type Abuse<T> = T extends `TypeErr: ${infer U}` ? U : T;
* ErrorBrad<Abuse<'TypeErr: Hacked!'>> = 'TypeErr: Hacked!'
* ... so we should be just fine!
*/
/*
type ErrorBrand<T extends string> = `TypeErr: ${T}`;
// Now we can use it pretty safely, e.g.:
type AssertIsAnimal<T> = T extends 'dog' | 'pony' ? T : ErrorBrand<'Not a pony'>;
const barn = <T>(animal: AssertIsAnimal<T>) => { }
 // Works! -> Type '"Not a pony"' is not assignable to type '"TypeErr: Not a pony"'.
barn('Not a pony')
*/






















/**
 * Force Typescript to flatten out a union type to its concrete values
 */
export type SimplifyUnion<T> = Unwrap<WrapInObject<T>>;
type WrapInObject<T> = T extends unknown ? {key: T} : never;
type Unwrap<T> = T extends {key: unknown} ? T['key'] : never;

// Adapted from https://stackoverflow.com/a/64034671
// & https://stackoverflow.com/a/58986589
// Wrapping the argument in [] prevents distributing unions since we're only
// interested in the actual value of the tuple (and a union is fine).
// Note: Will remove non-object values from the Tuple.
type MapTupleToKeys<T extends unknown[]> = [T] extends [[infer H, ...infer R]]
  ? [IsObject<H>] extends [true]
    ? [keyof H, ...MapTupleToKeys<R>]
    : MapTupleToKeys<R>
  : [];

// Wrapping the argument in [] prevents distributing unions since we're only
// interested in the actual value of the generic (and a union is not an object).
// 'never' extends 'object', but we don't want 'never', so have to explicitly
// filter it out here.
// prettier-ignore
type IsObject<T> = [T] extends [object]
  ? [T] extends [never]
    ? false
    : [unknown] extends [T]
      ? false
      : [T] extends [(...arg: any[]) => any]
        ? false
        : true
  : false;

type AliasName<Properties extends object> = keyof OmitIndexSignature<Properties> | ForceNonWideningUnionMembers<string>;


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

type PropertyToAliasesShape<Properties extends object> = {
  [Key in keyof OmitIndexSignature<Properties>]: AliasName<Properties>[];
};

type BreakpointsShape = {[Prop: string]: '&' | `@media ${Selector}`};
type ModifiersShape = {[Prop: string]: Selector};
type PseudoElementsShape = {[Prop: string]: PseudoElementSelector};

// TODO: inject tokenized style prop types
// Non-responsive style props
type PropsWithAliases<
  Properties extends object,
  PropertyToAliases extends PropertyToAliasesShape<Properties>,
> = IsObject<PropertyToAliases> extends true
  ? Simplify<
      Partial<Properties>
      & Partial<SimplifiedAliasesToObjectTypes<Properties, PropertyToAliases>>
    >
  : Partial<Properties>;

type MakeResponsiveProps<
  Properties extends object,
  PropertyToAliases extends PropertyToAliasesShape<Properties>,
  Breakpoints extends BreakpointsShape | unknown,
  Props = PropsWithAliases<Properties, PropertyToAliases>,
> = IsObject<Breakpoints> extends true
  ? {
      [Key in keyof Props]+?:
        | Props[Key]
        | {
            [Breakpoint in keyof Breakpoints]+?: Props[Key];
          };
    }
  : Props;

type MakeResponsivePropsWithPseudoElements<
  Properties extends object,
  PropertyToAliases extends PropertyToAliasesShape<Properties>,
  Breakpoints extends BreakpointsShape | unknown,
  PseudoElements extends PseudoElementsShape | unknown,
  ResponsiveProps = MakeResponsiveProps<
    Properties,
    PropertyToAliases,
    Breakpoints
  >,
> = IsObject<PseudoElements> extends true
  ? Simplify<
      ResponsiveProps & {
        [PseudoElement in keyof PseudoElements]+?: ResponsiveProps;
      }
    >
  : ResponsiveProps;

type MakeResponsiveModifiablePropsWithPseudoElements<
  Properties extends object,
  PropertyToAliases extends PropertyToAliasesShape<Properties>,
  Breakpoints extends BreakpointsShape | unknown,
  Modifiers extends ModifiersShape | unknown,
  PseudoElements extends PseudoElementsShape | unknown,
  ResponsivePropsWithPseudoElements = MakeResponsivePropsWithPseudoElements<
    Properties,
    PropertyToAliases,
    Breakpoints,
    PseudoElements
  >,
> = IsObject<Modifiers> extends true
  ? Simplify<
      ResponsivePropsWithPseudoElements & {
        [Modifier in keyof Modifiers]+?: ResponsivePropsWithPseudoElements;
      }
    >
  : ResponsivePropsWithPseudoElements;

// We're opinionated on the possible structure of incoming prop objects, so
// we're able to list out all the possible combinations of paths.
// Some objects may be `never` (ie; not configured), but they'll get filtered
// out during the MapTupleToKeys<> call.
type MakePropPaths<
  Properties extends object,
  PropertyToAliases extends PropertyToAliasesShape<Properties>,
  Breakpoints extends BreakpointsShape | unknown,
  Modifiers extends ModifiersShape | unknown,
  PseudoElements extends PseudoElementsShape | unknown,
  Props = PropsWithAliases<Properties, PropertyToAliases>,
> =
  | MapTupleToKeys<[Props]>
  | MapTupleToKeys<[Props, Breakpoints]>
  | MapTupleToKeys<[Modifiers, Props]>
  | MapTupleToKeys<[Modifiers, Props, Breakpoints]>
  | MapTupleToKeys<[PseudoElements, Props]>
  | MapTupleToKeys<[PseudoElements, Props, Breakpoints]>
  | MapTupleToKeys<[Modifiers, PseudoElements, Props]>
  | MapTupleToKeys<[Modifiers, PseudoElements, Props, Breakpoints]>;

type CreateOptions<
  Properties extends object,
  PropertyToAliases extends PropertyToAliasesShape<Properties>,
  Breakpoints extends BreakpointsShape | unknown,
  Modifiers extends ModifiersShape | unknown,
  PseudoElements extends PseudoElementsShape | unknown,
  Props = PropsWithAliases<Properties, PropertyToAliases>,
  ResponsiveModifiablePropsWithPseudoElements = MakeResponsiveModifiablePropsWithPseudoElements<
    Properties,
    PropertyToAliases,
    Breakpoints,
    Modifiers,
    PseudoElements
  >,
  PropPaths = SimplifyUnion<
    MakePropPaths<
      Properties,
      PropertyToAliases,
      Breakpoints,
      Modifiers,
      PseudoElements
    >
  >,
> = {
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
  defaults?: ResponsiveModifiablePropsWithPseudoElements;
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
  aliases?: PropertyToAliases;
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
  breakpoints?: Breakpoints;
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
  modifiers?: true | Modifiers;
  /**
   * `true` to opt into a default set of pseudo elements.
   */
  pseudoElements?: true | PseudoElements;
  valueMapper?: <Path extends PropPaths>(
    value: Props[keyof Props],
    /**
     * The style prop this value relates to.
     */
    prop: keyof Props,
    /**
     * Path to get to this value. NOTE: `prop` may not be the last element in
     * the path. For example: `['_hover', 'color', 'sm']` has the breakpoint as
     * the last element
     */
    path: Path,
  ) => unknown;
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

function create<Properties extends object = CSSProperties>() {
  // Ugh, Typescript doesn't support partial/private type parameter inference.
  // We need to set `Properties` to a default value above, but in doing so are
  // forced to give a default value to all following generics. As soon as we do
  // that, those generics are no longer inferred, so the types all break.
  // The only fix is to have an interim function call where the outer one
  // sets the default value of the generic, then the inner infers all the
  // generics.
  // See https://stackoverflow.com/a/60378737
  // See https://github.com/microsoft/TypeScript/issues/26242
  return <
    PropertyToAliases extends PropertyToAliasesShape<Properties>,
    Breakpoints extends BreakpointsShape | unknown,
    Modifiers extends ModifiersShape | unknown,
    PseudoElements extends PseudoElementsShape | unknown,
  >(
    options: CreateOptions<
      Properties,
      PropertyToAliases,
      Breakpoints,
      Modifiers,
      PseudoElements
    >,
  ) => {
    type PropPaths = SimplifyUnion<
      MakePropPaths<
        Properties,
        PropertyToAliases,
        Breakpoints,
        Modifiers,
        PseudoElements
      >
    >;

    type ResponsiveModifiablePropsWithPseudoElements =
      MakeResponsiveModifiablePropsWithPseudoElements<
        Properties,
        PropertyToAliases,
        Breakpoints,
        Modifiers,
        PseudoElements
      >;

    type NestedCSSProperties = {
      [Selector: string]: Properties & NestedCSSProperties;
    };

    type PseudoElementProp = keyof PseudoElements;
    type ModifierProp = keyof Modifiers;
    type BreakpointProp = keyof Breakpoints;

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
        [K in keyof Properties]?: Properties[K] | (string & {});
      };
    };

    type CascadeOrderKeys = keyof Breakpoints | keyof Modifiers;

    const className = '.Box';
    // No global defautls to start
    let globalDefaults: ResponsiveModifiablePropsWithPseudoElements | undefined;

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

    type Aliases = ExtractArrayValues<typeof aliases>;

    type InvertedAliases = {
      [key in Aliases]: (keyof typeof aliases | Aliases)[];
    };

    const inverseAliases = invertAliases(aliases);

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

    const stylesheet = toStyleSheet(stylesWithSelectors);

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
      /**
       * A value of `null` will remove any default for that property without having to
       * apply your own value. Roughly equivalent to CSS `unset`.
       */
      styleProps: _Props,
      {
        defaults: runtimeDefaults,
        valueMapper = globalValueMapper,
      }: {
        defaults?: _Props;
        valueMapper?: _ValueMapper;
      } = {},
    ): ConversionResult {
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
      stylePropsObjs: RecursiveValues<ResponsiveModifiablePropsWithPseudoElements>[],

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
      parentPropPath: PropPaths,
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
          const propPath: PropPaths = [...parentPropPath, prop];

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

    function toStyleSheet(
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
                  toStyleSheet(
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
    function invertAliases<
      AliasesIn,
      Aliases = ExtractArrayValues<AliasesIn>,
      InvertedAliases = {
        [key in Aliases]: (keyof typeof aliases | Aliases)[];
      }
    >(aliases: AliasesIn): InvertedAliases {
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
}
  /*
const modifiers = {
  _active: ':active',
  _focus: ':focus',
  _hover: ':hover',
  _visited: ':visited',
  _link: ':link',
};

const aliases = {
  color: ['fg', 'textColor'],
  backgroundPositionX: ['backgroundPosition'],
  backgroundPositionY: ['backgroundPosition']
} as const;

const { stylesheet, convert } = create()({ aliases, modifiers });
type GetPropType<
  PropName extends keyof Parameters<typeof convert>[0]
> = Parameters<typeof convert>[0][PropName];

type F = GetPropType<'backgroundPosition'>

// convert({ backgroundPosition, backgroundPositionX, fg })
*/

/* eslint-enable @typescript-eslint/consistent-type-definitions, @typescript-eslint/consistent-indexed-object-style, @typescript-eslint/ban-types */
