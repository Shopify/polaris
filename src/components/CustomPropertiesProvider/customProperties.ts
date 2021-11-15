import {tokens, ColorSchemeTokens} from './tokens';

/**
 * Adapted from: https://github.com/argyleink/gui-challenges/blob/main/color-schemes/style.css
 */
export const customProperties = /* css */ `
/* Default light custom properties */
:root {\n${getCustomProperties(tokens.light, ' '.repeat(2))}\n}

/* Default dark custom properties  */
@media (prefers-color-scheme: dark) {
  :root {\n${getCustomProperties(tokens.dark, ' '.repeat(4))}\n\t}
}

/*
  Custom properties for each color-scheme.
  @example:
  [color-scheme="light"] {...}
  [color-scheme="dark"] {...}
  [color-scheme="dim"] {...}
*/
${Object.entries(tokens)
  .map((entry) => {
    const [scheme, tokens] = entry;
    const selector = `[color-scheme="${scheme}"]`;
    const properties = getCustomProperties(tokens, ' '.repeat(2));

    return `${selector} {\n${properties}\n}`;
  })
  .join('\n')}
`;

function getCustomProperties(tokens: ColorSchemeTokens, pad = '') {
  return Object.entries(tokens)
    .map(([name, value]) => {
      if (name === 'colorScheme') {
        return `${pad}color-scheme: ${value || 'normal'};`;
      } else {
        return `${pad}--p-${name}: ${value};`;
      }
    })
    .join('\n');
}
