import type {TokenGroup} from './tokens';

const BASE_FONT_SIZE = 16;

export function rem(unit: string) {
  return unit.endsWith('px')
    ? `${parseInt(unit, 10) / BASE_FONT_SIZE}rem`
    : unit;
}

export function tokensToRems(tokenGroup: TokenGroup): TokenGroup {
  return Object.fromEntries(
    Object.entries(tokenGroup).map(([token, value]) => [token, rem(value)]),
  );
}
