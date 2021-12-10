import {tokens, TokenGroup, ColorSchemes} from './tokens';

function getPolarisCustomProperties(tokens: TokenGroup) {
  return Object.keys(tokens).map((token) => `--p-${token}`);
}

/**
 * Allowed Polaris token custom properties.
 *
 * Result: ['--p-background', '--p-text', etc...]
 */
export const tokenList = Array.from(
  new Set(
    Object.entries(tokens)
      .map((entry) => {
        const [tokenGroupName, tokenGroupOrColorSchemes] = entry as [
          keyof typeof tokens,
          typeof tokens[keyof typeof tokens],
        ];

        if (tokenGroupName === 'colorSchemes') {
          const colorSchemes = tokenGroupOrColorSchemes as ColorSchemes;

          return Object.values(colorSchemes).map((tokenGroup) =>
            getPolarisCustomProperties(tokenGroup),
          );
        } else {
          const tokenGroup = tokenGroupOrColorSchemes as TokenGroup;

          return getPolarisCustomProperties(tokenGroup);
        }
      })
      .flat(Infinity),
  ),
);
