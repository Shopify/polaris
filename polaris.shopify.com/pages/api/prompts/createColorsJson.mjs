import {metadata as allTokens, metadata} from '@shopify/polaris-tokens';
import fs from 'fs';
import path from 'path';

const PROMPT_SEPARATOR = '\n\n###\n\n';
const COMPLETION_END = '\n###';

/**
 * This script generates prompts and completions for our color tokens
 * according to the expected data structure of the openai fine tuning
 * api
 */
function main() {
  const colors = metadata.colors;
  let prompts = [];
  const colorsObj = {colors: {}};

  // iterate over each color token
  Object.keys(colors).forEach((colorName) => {
    // generate the token name from the color
    const colorToken = `--p-${colorName}`;

    // get the token color value and descriptions
    const value = colors[colorName].value;
    let description = colors[colorName].description;

    colorsObj.colors[colorToken] = {value, description};
  });

  // write prompts to a file in the jsonl file format
  try {
    const file = path.resolve(
      'pages/api/prompts/',
      'polaris-color-tokens.json',
    );

    fs.writeFileSync(file, JSON.stringify(colorsObj));
  } catch (error) {
    throw new Error(error);
  }
}

main();
