import * as fs from 'node:fs';
import * as path from 'node:path';
import * as url from 'node:url';

import deprecatedIcons from '../deprecated-icons.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const outputDir = path.join(__dirname, '../dist');
const svgDir = path.join(outputDir, 'svg');

Object.entries(deprecatedIcons).forEach(([deprecatedIconName, newIconName]) => {
  const target = path.join(svgDir, `${newIconName}.svg`);
  const link = path.join(svgDir, `${deprecatedIconName}.svg`);
  fs.symlinkSync(target, link);
});
