import * as fs from 'node:fs';
import * as path from 'node:path';

import * as colors from '../../polaris-tokens/src/colors';

const cacheDir = path.join(process.cwd(), '.cache');
const colorJsonFile = path.join(cacheDir, 'colors.json');

fs.writeFileSync(colorJsonFile, JSON.stringify(colors, null, 2));
