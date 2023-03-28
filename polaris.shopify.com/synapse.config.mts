import {
  defineConfig,
  queryResponseParse,
  embeddings,
  // graphQLParse,
  synapseStringify,
} from 'synapse';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';

import polarisTokenDocs from './scripts/synapse/polarisTokenDocs.mjs';
import polarisComponentDocs from './scripts/synapse/polarisComponentDocs.mjs';
import fakeCompiler from './scripts/synapse/fakeCompiler.mjs';

export default defineConfig({
  outputDir: './scripts/synapse/bits/',
  synapses: [
    // {
    //   name: 'token-docs',
    //   // can be files or glob patterns
    //   source: ['./scripts/synapse/polaris-color-tokens.txt'],
    //   plugins: [
    //     polarisTokenDocs,
    //     embeddings,
    //     // // plugins might need options too, use this format from unified-engine
    //     [synapseStringify, {format: 'JSON'}],
    //   ],
    // },
    {
      name: 'component-docs',
      // can be files or glob patterns
      source: ['./content/components/layout-and-structure/alpha-stack.md'],
      plugins: [
        polarisComponentDocs,
        embeddings,
        // // plugins might need options too, use this format from unified-engine
        [synapseStringify, {format: 'JSON'}],
      ],
    },
  ],
});
