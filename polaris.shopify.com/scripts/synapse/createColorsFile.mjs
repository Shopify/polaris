import {metadata as allTokens, metadata} from '@shopify/polaris-tokens';
import fs from 'fs';
import path from 'path';

const NL = '\n\n';
const DELIM = '\n----------\n';

function stub() {}

/**
 * This script generates formatted information for our color tokens
 * according to the expected data structure of the Synapse plugin
 */
function main() {
  const colors = metadata.colors;
  let prompts = [];
  const colorsObj = {colors: {}};
  const colorsEntry = [];

  // iterate over each color token
  Object.keys(colors).forEach((colorName) => {
    // generate the token name from the color
    const colorToken = `--p-${colorName}`;

    // get the token color value and descriptions
    const value = colors[colorName].value;
    let description = colors[colorName].description || '';

    colorsObj.colors[colorToken] = {value, description};
    colorsEntry.push(
      `${colorName}${NL}${colorToken}${description ? NL : ''}${description}`,
    );
  });

  // write prompts to a file in the jsonl file format
  try {
    const file = path.resolve('scripts/synapse/', 'polaris-color-tokens.txt');

    fs.writeFileSync(file, colorsEntry.join(DELIM));
  } catch (error) {
    throw new Error(error);
  }
}

main();
