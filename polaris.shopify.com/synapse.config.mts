import {
  defineConfig,
  queryResponseParse,
  embeddings,
  // graphQLParse,
  synapseStringify,
} from 'synapse';

import polarisTokenDocs from './scripts/synapse/polarisTokenDocs.mjs';

export default defineConfig({
  outputDir: './scripts/synapse/bits/',
  synapses: [
    {
      name: 'token-docs',
      // can be files or glob patterns
      source: ['./scripts/synapse/polaris-color-tokens.txt'],
      plugins: [
        polarisTokenDocs,
        embeddings,
        // // plugins might need options too, use this format from unified-engine
        [synapseStringify, {format: 'JSON'}],
      ],
    },
  ],
});
