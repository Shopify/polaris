/**
 * Usage:
 * node src/understand.mjs --target ./page-content.scss
 */
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

import sass from 'node-sass';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

if (!process.argv[2]) {
  throw new Error(`Missing target path argument`);
}

const targetFile = path.join(process.cwd(), process.argv[2]);

if (!fs.existsSync(targetFile)) {
  throw new Error(`The target file does not exist: ${targetFile}`);
}

const result = await sass.renderSync({
  file: targetFile,
  outputStyle: 'expanded',
  // Note: `outFile` is a required option to include source maps in the
  // `result` object. However, no file is actually written to disk.
  outFile: path.join(__dirname, 'tmp.css'),
  sourceMap: true,
});

// console.log('CSS:\n---\n', result.css.toString());

await fs.promises.writeFile(
  path.join(__dirname, `${path.basename(targetFile, '.scss')}.css`),
  result.css,
);
