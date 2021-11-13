import {tokens} from './tokens';

/**
 * Adapted from: https://github.com/argyleink/gui-challenges/blob/main/color-schemes/style.css
 */
export const customProperties = /* css */ `
/* Defaults */
:root {\n${getCustomProperties(tokens.light, ' '.repeat(2))}\n}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {\n${getCustomProperties(tokens.dark, ' '.repeat(4))}\n}
}

/*
  Custom properties for each scheme.
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

function getCustomProperties(tokens: {[key: string]: string}, pad = '') {
  return Object.entries(tokens)
    .map(([name, value]) => {
      if (name === 'scheme') {
        return `${pad}color-scheme: ${value};`;
      } else {
        return `${pad}--p-${name}: ${value};`;
      }
    })
    .join('\n');
}
