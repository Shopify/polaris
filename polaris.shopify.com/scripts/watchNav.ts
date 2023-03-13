import * as path from 'path';
import * as chokidar from 'chokidar';
import {exec} from 'child_process';

const contentPath = path.join(process.cwd(), 'src/content.ts');
chokidar.watch(contentPath).on('change', () => exec('yarn gen-assets'));
