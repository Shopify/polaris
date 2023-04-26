import {defineConfig, embeddings, synapseStringify} from '@shopify/synapse';
import path from 'path';
// import remarkParse from 'remark-parse';
// import remarkFrontmatter from 'remark-frontmatter';

import polarisTokenDocs from './scripts/synapse/polarisTokenDocs.mjs';
import polarisComponentDocs from './scripts/synapse/polarisComponentDocs.mjs';
import polarisGeneralDocs from './scripts/synapse/polarisGeneralDocs.mjs';
import polarisMigratorDocs from './scripts/synapse/polarisMigratorDocs.mjs';

// custom file save function to handle multiple index.md files
function onFileSave(vFileName: string) {
  const basename = path.basename(vFileName);

  if (basename === 'index.md') {
    let fileName = vFileName.replace(/^\/|^\.\/|(?<!^)\//g, (_, offset) => {
      if (offset === 0) {
        // if beginning of path is './' or '/' remove
        return '';
      } else {
        // remove all other '/'s with '-'
        return '-';
      }
    });

    return fileName.replace('/', '-');
  } else {
    return path.basename(vFileName);
  }
}

export default defineConfig({
  outputDir: './.cache/embeddings',
  synapses: [
    {
      name: 'token-docs',
      source: ['./scripts/synapse/polaris-color-tokens.txt'],
      plugins: [polarisTokenDocs, embeddings, synapseStringify],
      // outputDir: './.cache/embeddings/tokens',
      onFileSave,
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
      onFileSave,
      plugins: [polarisGeneralDocs, embeddings, synapseStringify],
    },
    {
      name: 'patterns-legacy',
      source: ['./content/patterns-legacy/**/*.md'],
      plugins: [polarisGeneralDocs, embeddings, synapseStringify],
    },
    {
      name: 'polaris-migrations',
      source: ['../polaris-migrator/src/migrations/**/*.tsx'],
      plugins: [polarisMigratorDocs, embeddings, synapseStringify],
    },
  ],
});
