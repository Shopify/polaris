import type {TokenGroup} from './tokens';

const BASE_FONT_SIZE = 16;

export function rem(px: string) {
  return `${parseInt(px, 10) / BASE_FONT_SIZE}rem`;
}

export function tokensToRems(tokenGroup: TokenGroup): TokenGroup {
  return Object.fromEntries(
    Object.entries(tokenGroup).map(([token, value]) => [token, rem(value)]),
  );
}
