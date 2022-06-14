import type {Exact} from './types';
import type {Tokens, TokenGroup} from './tokens';

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

function rem(value: string) {
  return value.replace(
    new RegExp(`${DIGIT_REGEX.source}(${UNIT_PX})`, 'g'),
    (px: string) => toRem(px) ?? px,
  );
}

export function tokensToRems<T extends Exact<TokenGroup, T>>(tokenGroup: T) {
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
 * Result: ['--p-background', '--p-text', etc...]
 */
export function getCustomPropertyNames(tokens: Tokens) {
  const {colorSchemes, ...restTokenGroups} = tokens;
  const customPropertyNames = [
    ...Object.keys(colorSchemes.light).map((token) => createVar(token)),
    ...Object.entries(restTokenGroups)
      .map(([_, tokenGroup]: [string, TokenGroup]) =>
        Object.keys(tokenGroup).map((token) => createVar(token)),
      )
      .flat(),
  ];

  return customPropertyNames;
}
