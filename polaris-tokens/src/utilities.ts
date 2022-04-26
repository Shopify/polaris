import type {Tokens, TokenGroup} from './tokens';

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
    Object.entries(tokenGroup).map(([token, values]) => [
      token,
      {...values, value: rem(values.value)},
    ]),
  );
}

export function createVar(token: string) {
  return `--p-${token}`;
}

/**
 * Allowed Polaris keyframes.
 *
 * Result: ['p-keyframes-fade-in', 'p-keyframes-spin', etc...]
 */
export function getKeyframeNames(motionTokens: TokenGroup) {
  return Object.keys(motionTokens)
    .map((name) => (name.startsWith('keyframes') ? `p-${name}` : null))
    .filter(Boolean);
}

/**
 * Allowed Polaris token custom properties.
 *
 * Result: ['--p-background', '--p-text', etc...]
 */
export function getCustomPropertyNames(tokens: Tokens) {
  const {colorSchemes, ...restOfGroups} = tokens;
  const propertiesNames = [
    ...Object.keys(colorSchemes.light).map((token) => createVar(token)),
    ...Object.entries(restOfGroups)
      .map((entry: [string, TokenGroup]) => {
        const tokenGroup = entry[1];

        return Object.keys(tokenGroup).map((token) => createVar(token));
      })
      .flat(),
  ];

  return propertiesNames;
}
