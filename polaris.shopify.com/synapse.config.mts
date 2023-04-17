import {defineConfig, embeddings, synapseStringify} from 'synapse';
// import remarkParse from 'remark-parse';
// import remarkFrontmatter from 'remark-frontmatter';

import polarisTokenDocs from './scripts/synapse/polarisTokenDocs.mjs';
import polarisComponentDocs from './scripts/synapse/polarisComponentDocs.mjs';
import polarisGeneralDocs from './scripts/synapse/polarisGeneralDocs.mjs';
import polarisMigratorDocs from './scripts/synapse/polarisMigratorDocs.mjs';

export default defineConfig({
  outputDir: './.cache/embeddings',
  synapses: [
    {
      name: 'token-docs',
      source: ['./scripts/synapse/polaris-color-tokens.txt'],
      plugins: [polarisTokenDocs, embeddings, synapseStringify],
    },
    {
      name: 'component-docs',
      source: ['./content/components/**/*.md'],
      plugins: [polarisComponentDocs, embeddings, synapseStringify],
    },
    {
      name: 'general-docs',
      source: [
        './content/content/**/*.md',
        './content/contributing/**/*.md',
        './content/foundations/**/*.md',
        './content/design/**/*.md',
        './content/getting-started/**/*.md',
        './content/tools/**/*.md',
        './content/whats-new/**/*.md',
      ],
      plugins: [polarisGeneralDocs, embeddings, synapseStringify],
    },
    {
      name: 'patterns-docs',
      source: ['./content/patterns/**/*.md'],
      plugins: [polarisGeneralDocs, embeddings, synapseStringify],
    },
    {
      name: 'polaris-migrations',
      source: ['../polaris-migrator/src/migrations/**/*.tsx'],
      plugins: [polarisMigratorDocs, embeddings, synapseStringify],
    },
  ],
});
