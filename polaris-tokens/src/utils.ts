import type {Entry, Exact} from './types';
import type {
  breakpoints as metaBreakpointsTokenGroup,
  BreakpointsTokenGroup,
  BreakpointsTokenName,
} from './themes/base/breakpoints';
import type {
  MetaTheme,
  MetaThemeShape,
  MetaTokenGroupShape,
  Theme,
  TokenName,
} from './themes/types';

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

export function toPxs(value: string) {
  return value.replace(
    new RegExp(`${DIGIT_REGEX.source}(${UNIT_EM}|${UNIT_REM})`, 'g'),
    (emOrRem: string) => toPx(emOrRem) ?? emOrRem,
  );
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

export function tokenGroupToRems<T extends MetaTokenGroupShape>(
  metaTokenGroup: T,
) {
  return Object.fromEntries(
    Object.entries(metaTokenGroup).map(([tokenName, tokenProperties]) => [
      tokenName,
      {...tokenProperties, value: rem(tokenProperties.value)},
    ]),
    // We loose the `metaTokenGroup` inference after transforming the object with
    // `Object.fromEntries()` and `Object.entries()`. Thus, we cast the result
    // back to `T` since we are simply converting the `value` from px to rem.
  ) as T;
}

export function createVarName(tokenName: TokenName) {
  return `--p-${tokenName}`;
}

export function createVar(tokenName: TokenName) {
  return `var(${createVarName(tokenName)})`;
}

/**
 * Allowed Polaris keyframes.
 *
 * Result: ['p-keyframes-fade-in', 'p-keyframes-spin', etc...]
 */
export function getKeyframeNames(motionTokenGroup: MetaTokenGroupShape) {
  return Object.keys(motionTokenGroup)
    .map((token) => (token.startsWith('keyframes') ? `p-${token}` : null))
    .filter(Boolean);
}

export function getTokenNames(theme: Theme | MetaTheme): TokenName[] {
  return Object.values(theme).flatMap((tokenGroup) =>
    Object.keys(tokenGroup),
  ) as TokenName[];
}

/**
 * Allowed Polaris token custom properties.
 *
 * Result: ['--p-color-bg', '--p-color-text', etc...]
 */
export function getThemeVarNames(theme: Theme) {
  return getTokenNames(theme).map(createVarName);
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

export const tokenGroupNamesToRems = [
  'border',
  'breakpoints',
  'font',
  'height',
  'shadow',
  'space',
  'text',
  'width',
];

/**
 * Mimics the behavior of an identity function:
 * - Validates the input matches the `MetaThemeShape` type exactly
 * - Converts all `px` values to `rem`
 * - Infers all members
 *
 * @example
 * ```
 * const example = createMetaThemeBase({
 *   color: {
 *     bg: {value: '#fff'},
 *   },
 * })
 * ```
 *
 * Where `typeof example` is inferred as `{ color: { bg: { value: string } } }`
 */
export function createMetaThemeBase<T extends Exact<MetaThemeShape, T>>(
  metaTheme: T,
): T {
  return Object.fromEntries(
    Object.entries(metaTheme).map(([tokenGroupName, tokenGroup]) => [
      tokenGroupName,
      tokenGroupNamesToRems.includes(tokenGroupName)
        ? tokenGroupToRems(tokenGroup)
        : tokenGroup,
    ]),
  ) as T;
}
