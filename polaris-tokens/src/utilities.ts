import type {
  Entry,
  Exact,
  MetadataGroup,
  Tokens,
  TokenGroup,
  Responsive,
  ResponsiveObject,
} from './types';
import type {
  breakpoints as metaBreakpointsTokenGroup,
  BreakpointsTokenGroup,
  BreakpointsTokenName,
} from './token-groups/breakpoints';
import {breakpointsAlias} from './types';

const BASE_FONT_SIZE = 16;

const UNIT_PX = 'px';
const UNIT_EM = 'em';
const UNIT_REM = 'rem';

// https://regex101.com/r/zvY2bu/1
const DIGIT_REGEX = new RegExp(String.raw`-?\d+(?:\.\d+|\d*)`);
const UNIT_REGEX = new RegExp(`${UNIT_PX}|${UNIT_EM}|${UNIT_REM}`);

export function getUnit(value = '') {
  const unit = value.match(
    new RegExp(`${DIGIT_REGEX.source}(${UNIT_REGEX.source})`),
  );

  return unit && unit[1];
}

export function toPx(value = '') {
  const unit = getUnit(value);

  if (!unit) return value;

  if (unit === UNIT_PX) {
    return value;
  }

  if (unit === UNIT_EM || unit === UNIT_REM) {
    return `${parseFloat(value) * BASE_FONT_SIZE}${UNIT_PX}`;
  }
}

export function toEm(value = '', fontSize = BASE_FONT_SIZE) {
  const unit = getUnit(value);

  if (!unit) return value;

  if (unit === UNIT_EM) {
    return value;
  }

  if (unit === UNIT_PX) {
    return `${parseFloat(value) / fontSize}${UNIT_EM}`;
  }

  if (unit === UNIT_REM) {
    return `${(parseFloat(value) * BASE_FONT_SIZE) / fontSize}${UNIT_EM}`;
  }
}

export function toRem(value = '') {
  const unit = getUnit(value);

  if (!unit) return value;

  if (unit === UNIT_REM) {
    return value;
  }

  if (unit === UNIT_EM) {
    return `${parseFloat(value)}${UNIT_REM}`;
  }

  if (unit === UNIT_PX) {
    return `${parseFloat(value) / BASE_FONT_SIZE}${UNIT_REM}`;
  }
}

export function rem(value: string) {
  return value.replace(
    new RegExp(`${DIGIT_REGEX.source}(${UNIT_PX})`, 'g'),
    (px: string) => toRem(px) ?? px,
  );
}

export function tokensToRems<T extends Exact<MetadataGroup, T>>(tokenGroup: T) {
  return Object.fromEntries(
    Object.entries(tokenGroup).map(([token, properties]) => [
      token,
      {...properties, value: rem(properties.value)},
    ]),
    // We loose the `tokenGroup` inference after transforming the object with
    // `Object.fromEntries()` and `Object.entries()`. Thus, we cast the result
    // back to `T` since we are simply converting the `value` from px to rem.
  ) as T;
}

export function createVar(token: string) {
  return `--p-${token}`;
}

/**
 * Allowed Polaris keyframes.
 *
 * Result: ['p-keyframes-fade-in', 'p-keyframes-spin', etc...]
 */
export function getKeyframeNames(motionTokenGroup: TokenGroup) {
  return Object.keys(motionTokenGroup)
    .map((token) => (token.startsWith('keyframes') ? `p-${token}` : null))
    .filter(Boolean);
}

/**
 * Allowed Polaris token custom properties.
 *
 * Result: ['--p-color-bg-app', '--p-color-text', etc...]
 */
export function getCustomPropertyNames(tokens: Tokens) {
  return Object.entries(tokens)
    .map(([_, tokenGroup]: [string, TokenGroup]) =>
      Object.keys(tokenGroup).map((token) => createVar(token)),
    )
    .flat();
}

export function removeMetadata<T extends Exact<MetadataGroup, T>>(
  tokenGroup: T,
) {
  return Object.fromEntries(
    Object.entries(tokenGroup).map((entry): Entry<TokenGroup> => {
      const [tokenName, {value}] = entry as Entry<MetadataGroup>;

      return [tokenName, value];
    }),
  ) as TokenGroup<T>;
}

export type MetaBreakpointsTokenGroup = typeof metaBreakpointsTokenGroup;

/**
 * Alias direction used for composing Polaris `breakpoints` utilities.
 */
export type BreakpointsAliasDirection = 'up' | 'down' | 'only';

/**
 * A collection of directional media conditions for a given Polaris `breakpoints` alias.
 */
export type BreakpointsAliasDirectionMediaConditions = {
  [AliasDirection in BreakpointsAliasDirection]: string;
};

/**
 * Media conditions for all Polaris `breakpoints` aliases.
 */
export type BreakpointsMediaConditions = {
  [TokenName in BreakpointsTokenName]: BreakpointsAliasDirectionMediaConditions;
};

export function getMediaConditions(breakpoints: BreakpointsTokenGroup) {
  const breakpointEntries = Object.entries(breakpoints);
  const lastBreakpointIndex = breakpointEntries.length - 1;

  return Object.fromEntries(
    breakpointEntries.map(
      (
        entry,
        index,
      ): [BreakpointsTokenName, BreakpointsAliasDirectionMediaConditions] => {
        const [breakpointsTokenName, breakpoint] =
          entry as Entry<BreakpointsTokenGroup>;

        const upMediaCondition = getUpMediaCondition(breakpoint);
        const downMediaCondition = getDownMediaCondition(breakpoint);
        const onlyMediaCondition =
          index === lastBreakpointIndex
            ? upMediaCondition
            : `${upMediaCondition} and ${getDownMediaCondition(
                breakpointEntries[index + 1][1],
              )}`;

        return [
          breakpointsTokenName,
          {
            // Media condition for the current breakpoint and up
            up: upMediaCondition,
            // Media condition for current breakpoint and down
            down: downMediaCondition,
            // Media condition for only the current breakpoint
            only: onlyMediaCondition,
          },
        ];
      },
    ),
  ) as BreakpointsMediaConditions;
}

function getUpMediaCondition(breakpoint: string) {
  return `(min-width: ${toEm(breakpoint)})`;
}

/**
 * Down media condition breakpoints are being subtracted by 0.04px to prevent
 * them from overwriting up media queries. We experimented with multiple offsets
 * and felt that 0.04px would be the safest across different pixel densities,
 * while being representable in ems with 4 decimal places of precision.
 */
function getDownMediaCondition(breakpoint: string) {
  const offsetBreakpoint = parseFloat(toPx(breakpoint) ?? '') - 0.04;
  return `(max-width: ${toEm(`${offsetBreakpoint}px`)})`;
}

export function isKeyOf<T extends {[key: string]: any}>(
  obj: T,
  key: PropertyKey | undefined,
): key is keyof T {
  return Object.keys(obj).includes(key as string);
}

export function toResponsiveObject<T>(val: Responsive<T>): ResponsiveObject<T> {
  if (Array.isArray(val)) {
    let prev: T | undefined;
    return breakpointsAlias.reduce((memo, breakpoint, index) => {
      if (typeof val[index] !== 'undefined') {
        memo[breakpoint] = val[index] ?? prev;
        prev = memo[breakpoint];
      }
      return memo;
    }, {} as ResponsiveObject<T>) as ResponsiveObject<T>;
  }

  if (typeof val !== 'object') {
    return breakpointsAlias.reduce((memo, breakpoint) => {
      memo[breakpoint] = val;
      return memo;
    }, {} as ResponsiveObject<T>) as ResponsiveObject<T>;
  }

  // Fill in any blanks in the object
  // eg; { xs: '3px', lg: '10px' }
  // => { xs: '3px', sm: '3px', md: '3px', lg: '10px', xl: '10px' }
  let prev: T | undefined;
  return breakpointsAlias.reduce(
    (memo, breakpoint) => {
      if (typeof memo[breakpoint] !== 'undefined') {
        // Value is already set, so don't modify memo
        // Instead, capture the value as the "prev" for later setting
        prev = memo[breakpoint];
      } else {
        memo[breakpoint] = prev;
      }
      return memo;
    },
    {...val} as ResponsiveObject<T>,
  ) as ResponsiveObject<T>;
}

// eg; { xs: '3px', sm: '3px', md: '3px', lg: '10px', xl: '10px' }
// => { xs: '3px', lg: '10px' }
export function makeResponsiveObjectSparse<T>(
  val: ResponsiveObject<T>,
): ResponsiveObject<T> {
  let prev: T | undefined;
  return breakpointsAlias.reduce(
    (memo, breakpoint) => {
      if (typeof memo[breakpoint] !== 'undefined') {
        //
        if (memo[breakpoint] === prev) {
          // This matches the previous value we saw, so to make the object
          // sparse we simply delete this now redundant key.
          delete memo[breakpoint];
        } else {
          // Differs from the previous value, so leave it alone and capture that
          // value for comparisons on the next go around.
          prev = memo[breakpoint];
        }
      }
      return memo;
    },
    {...val} as ResponsiveObject<T>,
  ) as ResponsiveObject<T>;
}
