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

  // iterate over each color token
  Object.keys(colors).forEach((colorName) => {
    // generate the token name from the color
    const colorToken = `--p-${colorName}`;

    // get the token color value and descriptions
    const value = colors[colorName].value;
    let description = colors[colorName].description;

    /**
     * Creates a prompt/completion pairing in the format expected by the
     * training api
     * @param {string} prompt the chat prompt to pass to the model
     * @param {string} completion corresponding completion/answer for the provided prompt
     * @returns constructed object with prompt/completion pairing
     */
    function createPromptObject(prompt, completion) {
      return {
        prompt: `${prompt} ${PROMPT_SEPARATOR}`,
        completion: ` ${completion} ${COMPLETION_END}`,
      };
    }

    /**
     * Pushes a prompt/completion pair object to the global prompts array
     * @param {Array} promptsArray array with prompt strings
     * @param {string} completion the completion string that corresponds to the prompts
     */
    function pushPrompts(promptsArray, completion) {
      promptsArray.forEach((p) => {
        prompts.push(createPromptObject(p, completion));
      });
    }

    // clean up the descriptions to take out the phrases "Used for" and "For use as"
    if (description && description.includes('Used for ')) {
      description = description.substring(4, description.length - 1).trim();
    } else if (description && description.includes('For use as ')) {
      description = description.substring(8, description.length - 1).trim();
    }

    // not all tokens have a description, only create prompts for the ones that do
    if (description) {
      const descPrompts = [
        `What Polaris design system color token should I use ${description}?`,
        `What Polaris color token should I use ${description}?`,
        `What Polaris color should I use ${description}?`,
        `What color should I use ${description}?`,
      ];
      const tokenPrompts = [
        `When should I use the Polaris design system color token ${colorToken}?`,
        `When should I use the Polaris color token ${colorToken}?`,
        `When should I use the color token ${colorToken}?`,
        `When should I use the Polaris color ${colorToken}?`,
        `When to use the color token ${colorToken}?`,
        `When to use the Polaris color ${colorToken}?`,
        `When to use the color ${colorToken}?`,
        `When to use ${colorToken}?`,
      ];

      pushPrompts(descPrompts, colorToken);
      pushPrompts(tokenPrompts, description);
    }

    const colorPrompts = [
      `What is the token name for the color value ${value}?`,
      `What is the name for the color ${value}`,
      `What's the name for ${value}`,
    ];

    pushPrompts(colorPrompts, colorToken);
  });

  // write prompts to a file in the jsonl file format
  try {
    const file = path.resolve(
      'polaris.shopify.com/pages/api/chat/',
      'finetuning-data.jsonl',
    );
    const promptsStrings = prompts.map((p) => JSON.stringify(p));
    fs.writeFileSync(file, promptsStrings.join(`\n`));
  } catch (error) {
    throw new Error(error);
  }
}

main();
