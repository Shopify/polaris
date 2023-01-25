/* eslint-disable no-console */
import * as path from 'node:path';
import * as fs from 'node:fs/promises';

import endent from 'endent';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as grayMatter from 'gray-matter';

main()
  .then(() => {
    console.log('Done');
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

async function main() {
  if (process.argv.length !== 3) {
    console.error(
      `Usage: ${path.relative(
        process.cwd(),
        process.argv[1],
      )} <pattern-to-convert.md>`,
    );
    process.exit(1);
  }

  const inputMdFile = path.resolve(process.cwd(), process.argv[2]);
  const inputMd = await fs.readFile(inputMdFile);
  const {data: frontMatter} = grayMatter(inputMd);

  const inputDataFile = path.resolve(
    path.dirname(inputMdFile),
    frontMatter.contentFile,
  );

  const inputPattern = (await import(inputDataFile)).default;

  const outputMd = convertPatternToMd(inputPattern, frontMatter);

  const outputDir = path.join(
    path.dirname(inputMdFile),
    path.basename(inputMdFile, '.md'),
  );

  // Ensure the output directory exists for the pattern and the variants
  await fs.mkdir(path.join(outputDir, 'variants'), {
    recursive: true,
  });

  await fs.writeFile(path.join(outputDir, 'index.md'), outputMd.md);

  await Promise.all(
    outputMd.variants.map(({slug, md}) =>
      fs.writeFile(path.join(outputDir, 'variants', `${slug}.md`), md),
    ),
  );
}

/*
---
title: Date picking
description: Makes it easy for merchants to select and input dates and date ranges.
lede: Lets merchants select a date or date range to help them filter information or objects and schedule events or actions.
url: /patterns/date-picking
previewImg: /images/patterns/pattern-thumbnail-date-picking.png
status: {value: 'Beta', message: ''}
order: 10
githubDiscussionsLink: https://github.com/Shopify/polaris/discussions/7852
variants:
  - 'variants/single-date.md'
  - 'variants/date-range.md'
  - 'variants/date-list.md'
---

<div as="Variants"></div>

## Related resources

- Programming timezones can be finicky. Get great tips in the article [UTC is for everyone right](https://zachholman.com/talk/utc-is-enough-for-everyone-right)?
- Learn about date formatting in the [Grammar and mechanics](/content/grammar-and-mechanics#date) guidelines.
- See how to craft effective button labels in the [Actionable language](/content/actionable-language) guidelines.
*/
function convertPatternToMd(inputPattern, data) {
  if (!inputPattern.variants) {
    inputPattern.variants = [{...inputPattern, slug: 'default'}];
  }

  const patternMdOut = endent`
    ---
    title: ${data.title}
    description: ${data.description}
    lede: ${inputPattern.description}
    url: ${data.url}
    previewImg: ${data.previewImg}
    githubDiscussionsLink: ${data.githubDiscussionsLink}
    variants:
      ${endent(
        inputPattern.variants
          .map(({slug}) => `  - 'variants/${slug}.md'`)
          .join('\n'),
      )}
    ---

    <div as="Variants"></div>

    <div as="Stack" gap="4">

    ## Related resources

    ${endent(inputPattern.relatedResources)}

    </div>
  `;

  return {
    md: patternMdOut,
    variants: inputPattern.variants.map((variant) => ({
      slug: variant.slug,
      md: convertVariantToMd(variant, inputPattern.variants.length === 1),
    })),
  };
}

function convertVariantToMd(variant, isOnlyVariant) {
  const example = variant.example;

  const componentsMd = example.relatedComponents.map(
    ({label, url}) => `[\`${label}\`](${url})`,
  );
  const componentsStr = [
    componentsMd.slice(0, -1).join(', '),
    componentsMd[componentsMd.length - 1],
  ].join(' and ');

  let codeFences = [];

  if (example.snippetCode) {
    if (example.code) {
      codeFences.push(endent`
         \`\`\`javascript {"type":"sandboxContext","for":"example"}
         ${endent(example.code).replace(
           endent(example.snippetCode),
           '____CODE____',
         )}
         \`\`\`
      `);
    }

    if (example.snippetCode) {
      codeFences.push(endent`
        \`\`\`javascript {"type":"livePreview","id":"example"}
        ${endent(example.snippetCode)}
        \`\`\`
      `);
    }
  } else if (example.code) {
    codeFences.push(endent`
      \`\`\`javascript {"type":"livePreview","id":"example"}
      ${endent(example.code)}
      \`\`\`
    `);
  }

  return endent`
    ---
    ${isOnlyVariant ? '' : `title: ${variant.title}`}
    ${isOnlyVariant ? '' : `slug: ${variant.slug}`}
    hideFromNav: true
    ---
  
    ${isOnlyVariant ? '' : endent(variant.description)}

    <div as="HowItHelps">
    
    ## How it helps merchants
    
    ${endent(variant.howItHelps)
      .replace(':::customtable', '<div as="DefinitionTable">')
      .replace(':::', '</div>')
      .replace(/### \*\*(.*)\*\*/gm, '### $1:')
      .replace('::', ':')}
    </div>
    <div as="Usage">
    
    ## Using this pattern

    This pattern uses the ${componentsStr} components.

    ${
      example.context
        ? endent`
          \`\`\`javascript {"type":"previewContext","for":"example"}
          ${endent(example.context)}
          \`\`\``
        : ''
    }

    ${codeFences.join('\n\n')}

    </div>
    <div as="UsefulToKnow">

    ### Useful to know

    ${endent(variant.usefulToKnow)}

    </div>
  `.replace(/\n\n\n/gm, '\n\n');
}
