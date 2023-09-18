import path from 'path';
import chokidar from 'chokidar';

import genCacheJson from './gen-cache-json.mjs';

const mdPath = path.join(process.cwd(), 'content');

// Run initially
await genCacheJson();

// Run whenever there is a change to a .md file
chokidar.watch(mdPath).on('change', async () => await genCacheJson());
