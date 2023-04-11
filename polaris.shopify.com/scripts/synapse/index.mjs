import {readFileSync} from 'fs';
import {unified} from 'unified';
import polarisTokenDocs from './polarisTokenDocs.mjs';
import {embeddings} from 'synapse';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const file = readFileSync(
  path.resolve('scripts/synapse/', './polaris-color-tokens.txt'),
);

unified()
  .use(polarisTokenDocs)
  .use(embeddings)
  .process(file)
  .then((file) => console.log(file));
// console.log(processed.data());
