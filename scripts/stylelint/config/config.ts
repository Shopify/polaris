import {tokens, TokenGroup, ColorSchemes} from '../../../src/tokens/tokens';

function getPolarisCustomProperties(tokens: TokenGroup) {
  return Object.keys(tokens).map((token) => `--p-${token}`);
}

/**
 * Allowed custom property names in Polaris component styles.
 */
const polarisComponentCustomProperties = /--pc-.+/;

/**
 * Allowed Polaris token custom properties.
 *
 * Result: ['--p-background', '--p-text', etc...]
 */
const polarisTokenCustomProperties = Array.from(
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

const rules = {
  '@shopify/custom-properties-allowed-list': {
    allowedProperties: [
      '--polaris-version-number',
      polarisComponentCustomProperties,
    ],
    allowedValues: {
      '/.+/': [
        polarisComponentCustomProperties,
        ...polarisTokenCustomProperties,
      ],
    },
  },
};

export const stylelintConfig = {
  rules,
};
