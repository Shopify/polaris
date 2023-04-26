import fs from 'node:fs';
import path from 'node:path';
import * as colors from '../../polaris-tokens/dist/esm/src/colors.mjs';

const dirname = path.dirname(new URL(import.meta.url).pathname);
const cssOutputDir = path.resolve(dirname, '../src/styles');
const cssOutputPath = path.join(cssOutputDir, 'colors.css');

const genColors = async () => {
  const variables = Object.entries(colors).reduce((acc, [name, shades]) => {
    return Object.entries(shades).reduce((acc, [shade, value]) => {
      return `${acc}--p-${name}-${shade}: ${value};\n`;
    }, acc);
  }, '');

  const css = `:root {\n${variables}}\n`;

  await fs.promises.writeFile(cssOutputPath, css);
};

export default genColors;
