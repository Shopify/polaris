import type {TokenGroup} from './tokens';

const BASE_FONT_SIZE = 16;

function rem(value: string) {
  return value.replace(
    // https://regex101.com/r/RBL7EE/1
    /\d+(?:\.\d+|\d*)px/g,
    (px: string) => `${parseInt(px, 10) / BASE_FONT_SIZE}rem`,
  );
}

export function tokensToRems(tokenGroup: TokenGroup): TokenGroup {
  return Object.fromEntries(
    Object.entries(tokenGroup).map(([token, value]) => {
      return [token, rem(value)];
    }),
  );
}
