import * as fs from 'node:fs';
import * as path from 'node:path';

import * as colors from '../../polaris-tokens/src/colors';

const cacheDir = path.join(process.cwd(), '.cache');
const colorJsonFile = path.join(cacheDir, 'colors.ts');

fs.mkdirSync(cacheDir, {recursive: true});
fs.writeFileSync(
  colorJsonFile,
  `import type {ColorsJSON} from '../src/types';
export default ${JSON.stringify(colors)} satisfies ColorsJSON;`,
);
