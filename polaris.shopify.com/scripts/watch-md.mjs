import path from 'path';
import chokidar from 'chokidar';

import genSiteJson from './gen-site-json.mjs';

const mdPath = path.join(process.cwd(), 'content');

chokidar.watch(mdPath).on('change', async () => await genSiteJson());
