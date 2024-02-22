/* eslint-disable */
/* prettier-disable */
import type {Simplify, Includes, OmitIndexSignature} from 'type-fest';
import type { StandardLonghandProperties as Properties } from 'csstype';

import type { SimplifyUnion } from './generated-data';


// type Properties = {
//   display?: 'flex' | 'block';
//   color?: 'red' | 'rebeccapurple' | (string & {});
// };


type AliasName = string;
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

type AliasConfig = DeepReadonly<{
  [Key in keyof OmitIndexSignature<Properties>]: AliasName[];
}>;

type BreakpointsShape = DeepReadonly<{
  [Prop: string]: '&' | `@media ${Selector}`;
}>;
type ModifiersShape = DeepReadonly<{[Prop: string]: Selector}>;
type PseudoElementsShape = DeepReadonly<Record<string, PseudoElementSelector>>;

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
      ? T & Record<never,never>
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
*
 * {
 *   readonly backgroundPositionX: (x: (string & {}) | `${string}%` | "left" | "right" | "center") => void;
 *   readonly backgroundPositionY: (x: (string & {}) | `${string}%` | "top" | "bottom" | "center") => void;
 * }
*
*
*
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

/**
 * Given an object like:
 * {
 *   backgroundPositionX: `${string}%` | "left" | "right" | "center" | (string & {});
 *   backgroundPositionY: `${string}%` | "center" | "top" | "bottom" | (string & {});
 * }
 *
 * return the union:
 *
 * `${string}%` | "center" | (string & Record<never, never>)
 *
 * Without accidentally widening the type to a primitive like `string`
 * 
 */
type UnionOfIntersectingValuesWithNoWidening<
  T extends object,
> =
  // If index signatures are left in the union, TS will widen literals to the index
  // signature type when `keyof` is used within UnionOfIntersectingValues.
  // To combat that, we filter for only literals first, then union the result with only
  // index signatures that are forced to be non widening.
  | UnionOfIntersectingValues<T, 'literals'>
  | ForceNonWideningUnionMembers<UnionOfIntersectingValues<T, 'index-signature'>>;

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
  PropertyToAliases extends AliasConfig,
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
      // Grab the property's type, simplified so we can distribute over the
      // union correctly
      ? Properties[PropertyKey]
      : never
    // Assign this new object to the variable '0' so we can do things with it
    // below
  } extends infer O extends object
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

type ExactOptional<T> = Exclude<T, undefined>;

type SimplifiedAliasesToObjectTypes<
  PropertyToAliases extends AliasConfig,
  Properties extends object,
  Result = AliasesToObjectTypes<PropertyToAliases, Properties>
> = {
  // Simplifying the union forces better IDE auto complete.
  [Key in keyof Result]: SimplifyUnion<Result[Key]>
}

type MakeValueMapper<AllProperties, PropPaths> =
  | ((
      // Map over the object, turning each value into a tuple (the function args),
      // then generate a union of all the possible tuples. Eg:
      // [Properties['display'], 'display'] | [Properties['color'], 'color']
      ...args: SimplifyUnion<{
        // Remove the optional flag, otherwise the final union of tuples would include
        // a `undefined` (for the case where no keys are provided) which is invalide
        // for variadic args.
        [Key in keyof AllProperties]-?: [AllProperties[Key], Key, PropPaths];
      }[keyof AllProperties]>
    ) => unknown)
  | ((
      // Map over the object, turning each value into a tuple (the function args),
      // then generate a union of all the possible tuples. Eg:
      // [Properties['display'], 'display'] | [Properties['color'], 'color']
      ...args: SimplifyUnion<{
        // Remove the optional flag, otherwise the final union of tuples would include
        // a `undefined` (for the case where no keys are provided) which is invalide
        // for variadic args.
        [Key in keyof AllProperties]-?: [AllProperties[Key], Key];
      }[keyof AllProperties]>
    ) => unknown)
  | ((
      // Map over the object, turning each value into a tuple (the function args),
      // then generate a union of all the possible tuples. Eg:
      // [Properties['display'], 'display'] | [Properties['color'], 'color']
      ...args: SimplifyUnion<{
        // Remove the optional flag, otherwise the final union of tuples would include
        // a `undefined` (for the case where no keys are provided) which is invalide
        // for variadic args.
        [Key in keyof AllProperties]-?: [AllProperties[Key]];
      }[keyof AllProperties]>
    ) => unknown)
  | ((...args: []) => unknown);

declare function create4_9_5<
  PropertyToAliases extends AliasConfig = Record<never, never>,
  Breakpoints extends BreakpointsShape = Record<never, never>,
  Modifiers extends ModifiersShape = Record<never, never>,
  PseudoElements extends PseudoElementsShape = Record<never, never>,
  AllProperties = Simplify<
    Partial<SimplifiedAliasesToObjectTypes<PropertyToAliases, Properties>>
    & Properties
  >,
  AllPropertyNames = keyof AllProperties,
  // We're opinionated on the possible structure of incoming prop objects, so
  // we're able to list out all the possible combinations of paths.
  // Some objects may be `never` (ie; not configured), but they'll get filtered
  // out during the MapTupleToKeys<> call.
  // TODO: Why is this coming out as `undefined`?
  PropPaths = SimplifyUnion<
    | [AllPropertyNames]
    | [AllPropertyNames, keyof Breakpoints]
    | [keyof Modifiers, AllPropertyNames]
    | [keyof Modifiers, AllPropertyNames, keyof Breakpoints]
    | [keyof PseudoElements, AllPropertyNames]
    | [keyof PseudoElements, AllPropertyNames, keyof Breakpoints]
    | [keyof Modifiers, keyof PseudoElements, AllPropertyNames]
    | [
        keyof Modifiers,
        keyof PseudoElements,
        AllPropertyNames,
        keyof Breakpoints,
      ]
  >,
  ResponsiveProperties = {
    [Key in keyof AllProperties]+?:
      | AllProperties[Key]
      | {
          [Breakpoint in keyof Breakpoints]+?: AllProperties[Key];
        };
  },
  ResponsivePropertiesWithPseudoElements = Simplify<
    ResponsiveProperties & {
      [PseudoElement in keyof PseudoElements]+?: ResponsiveProperties;
    }
  >,
  ResponsiveModifiablePropsWithPseudoElements = Simplify<
    ResponsivePropertiesWithPseudoElements & {
      [Modifier in keyof Modifiers]+?: ResponsivePropertiesWithPseudoElements;
    }
  >,
>(
  options: {
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
    aliases?: ExactOptional<PropertyToAliases>;
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
    breakpoints?: ExactOptional<Breakpoints>;
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
    modifiers?: ExactOptional<Modifiers>;
    /**
     * `true` to opt into a default set of pseudo elements.
     */
    pseudoElements?: ExactOptional<PseudoElements>;
    valueMapper?: ExactOptional<MakeValueMapper<AllProperties, PropPaths>>;
    /**
     * A list of values that if passed to any styleProp on our Box component should
     * warn the user, and bail early from the css property injection procedure. We
     * do this as there is no good way for us to explicitly disallow this string
     * literal in our types holistically for every style property.
     */
    // bannedGlobalValues?: ExactOptional<Globals[]>;

    /**
     * Prefix generated classnames & custom properties with this namespace to avoid
     * collisions with existing styles.
     */
    namespace?: ExactOptional<string>;
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
    defaults?: ResponsiveModifiablePropsWithPseudoElements
  }
): (props: ResponsiveModifiablePropsWithPseudoElements) => undefined;

const aliases = {
  color: ['fg', 'textColor'],
  backgroundPositionX: ['backgroundPosition'],
  backgroundPositionY: ['backgroundPosition'],
} as const;

const modifiers = {
  _active: ':active',
  _focus: ':focus',
  _hover: ':hover',
  _visited: ':visited',
  _link: ':link',
} as const;

const breakpoints = {
  xs: '&',
  sm: '@media ()'
} as const;

// Should work in TS v4.7.4+
const fn2 = create4_9_5({
  aliases,
  modifiers,
  breakpoints,
  valueMapper: (value, key, path) => {
    console.log(path);
    console.log(key);
    if (key === 'display') {
      const v = value;
      //    ^?
    } else if (key === 'color' || key === 'fg' || key === 'textColor') {
      const v = value;
      //    ^?
    } else if (key === 'backgroundPosition') {
      const v = value;
      //    ^?
    } else {
      const v = value;
      //    ^?
    }
  },
});

fn2({
  backgroundPosition: 'center',
  fg: 'red',
  backgroundPositionX: 'left',
  _hover: {
    color: 'blue'
  }
})
