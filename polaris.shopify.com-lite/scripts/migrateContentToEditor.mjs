import fs from 'fs';
import {globbySync} from 'globby';
import {parseMarkdown} from '../legacy/markdown.mjs';
import {nanoid} from 'nanoid';

const pages = [];
const blocks = [];

function createPage(
  {
    id,
    title,
    excerpt,
    slug,
    parentId,
    order,
    layout,
    allowChildren,
    hideInNav,
    noIndex,
    keywords,
    childPageMetaType,
    pageMeta,
    hasSeparatorInNav,
    thumbnailImageId = null,
  },
  markdown,
) {
  const blockId = nanoid();
  const block =
    layout !== 'listing' && markdown
      ? {
          id: blockId,
          order: 0,
          blockType: 'Markdown',
          parentBlockId: null,
          content: markdown.trim(),
        }
      : undefined;

  const page = {
    id,
    title,
    excerpt,
    slug,
    parentId,
    order,
    layout,
    blockIds: block ? [blockId] : [],
    allowChildren,
    hideInNav,
    noIndex,
    keywords,
    childPageMetaType,
    pageMeta,
    hasSeparatorInNav,
    thumbnailImageId,
  };

  pages.push(page);
  if (block) {
    blocks.push(block);
  }
}

// Migrate components
const componentsIndexFile = fs.readFileSync(
  'legacy/content/components/index.md',
  'utf8',
);
const {readme: componentsReadme, frontMatter: componentsFrontMatter} =
  parseMarkdown(componentsIndexFile);
const componentsId = nanoid();

createPage(
  {
    id: componentsId,
    title: componentsFrontMatter.title,
    excerpt: componentsFrontMatter.description || '',
    slug: 'components',
    parentId: null,
    order: componentsFrontMatter.order || 0,
    layout: 'listing',
    allowChildren: true,
    hideInNav: false,
    noIndex: false,
    childPageMetaType: null,
    pageMeta: null,
    keywords: componentsFrontMatter.keywords?.map((kw) => kw.toString()) || [],
    hasSeparatorInNav: false,
  },
  componentsReadme,
);

const componentCategories = fs.readdirSync('legacy/content/components');
componentCategories
  .filter((category) => category !== 'index.md')
  .forEach((category) => {
    const componentIndexFile = fs.readFileSync(
      `legacy/content/components/${category}/index.md`,
      'utf8',
    );
    const {
      readme: componentCategoryReadme,
      frontMatter: componentCategoryFrontMatter,
    } = parseMarkdown(componentIndexFile);
    const componentCategoryId = nanoid();

    createPage(
      {
        id: componentCategoryId,
        title: componentCategoryFrontMatter.title,
        excerpt: componentCategoryFrontMatter.description || '',
        slug: category,
        parentId: componentsId,
        order: componentCategoryFrontMatter.order || 0,
        layout: 'listing',
        allowChildren: true,
        hideInNav: false,
        noIndex: false,
        childPageMetaType: null,
        pageMeta: null,
        keywords:
          componentCategoryFrontMatter.keywords?.map((kw) => kw.toString()) ||
          [],
        hasSeparatorInNav: false,
      },
      componentCategoryReadme,
    );

    const filePaths = globbySync(`legacy/content/components/${category}/*.md`);
    filePaths.forEach((filePath) => {
      if (filePath.endsWith('index.md')) return;
      const file = fs.readFileSync(filePath, 'utf8');
      const {readme, frontMatter} = parseMarkdown(file);
      const slug = filePath.split('/').pop().replace('.md', '');

      const id = nanoid();

      let examples = [];

      if (frontMatter.examples) {
        frontMatter.examples.forEach((example) => {
          examples.push({
            ...example,
            description: example.description || '',
          });
        });
      }

      createPage(
        {
          id,
          title: frontMatter.title,
          excerpt: frontMatter.description || '',
          slug,
          parentId: componentCategoryId,
          order: frontMatter.order || 0,
          layout: 'blocks',
          allowChildren: false,
          hideInNav: false,
          noIndex: false,
          childPageMetaType: null,
          pageMeta: {
            type: 'components',
            examples: examples,
            lifeCyclePhase: 'alfa',
            lifeCyclePhase: frontMatter.status?.value || 'Stable',
            lifeCycleNotice: frontMatter.status?.message || '',
          },
          keywords: frontMatter.keywords?.map((kw) => kw.toString()) || [],
          hasSeparatorInNav: false,
        },
        readme,
      );
    });
  });

// Migrate patterns
const patternsIndexFile = fs.readFileSync(
  'legacy/content/patterns/index.md',
  'utf8',
);
const {readme: patternsReadme, frontMatter: patternsFrontMatter} =
  parseMarkdown(patternsIndexFile);
const patternsId = nanoid();
createPage(
  {
    id: patternsId,
    title: patternsFrontMatter.title,
    excerpt: patternsFrontMatter.description,
    slug: 'patterns',
    parentId: null,
    order: patternsFrontMatter.order || 0,
    layout: 'listing',
    allowChildren: true,
    hideInNav: false,
    noIndex: false,
    childPageMetaType: null,
    pageMeta: null,
    keywords: patternsFrontMatter.keywords?.map((kw) => kw.toString()) || [],
    hasSeparatorInNav: true,
  },
  patternsReadme,
);

const patternCategories = fs.readdirSync('legacy/content/patterns');
patternCategories
  .filter((patternCategory) => patternCategory !== 'index.md')
  .filter((patternCategory) => patternCategory !== 'variant.md.template')
  .forEach((patternCategory) => {
    const filePaths = globbySync(
      `legacy/content/patterns/${patternCategory}/*.md`,
    );
    filePaths.forEach((filePath) => {
      const file = fs.readFileSync(filePath, 'utf8');
      const {readme, frontMatter} = parseMarkdown(file);

      const patternsCategoryId = nanoid();
      createPage(
        {
          id: patternsCategoryId,
          title: frontMatter.title,
          excerpt: frontMatter.description,
          slug: patternCategory,
          parentId: patternsId,
          order: frontMatter.order || 0,
          layout: 'blocks',
          allowChildren: false,
          hideInNav: false,
          noIndex: false,
          childPageMetaType: null,
          pageMeta: null,
          keywords: frontMatter.keywords?.map((kw) => kw.toString()) || [],
          hasSeparatorInNav: false,
        },
        readme,
      );
    });
  });

// Migrate foundations: Content
const contentIndexFile = fs.readFileSync(
  'legacy/content/content/index.md',
  'utf8',
);
const {readme: contentReadme, frontMatter: contentFrontMatter} =
  parseMarkdown(contentIndexFile);
const contentId = nanoid();
createPage(
  {
    id: contentId,
    title: contentFrontMatter.title,
    excerpt: contentFrontMatter.description || '',
    slug: 'content',
    parentId: null,
    order: contentFrontMatter.order || 0,
    layout: 'listing',
    allowChildren: true,
    hideInNav: false,
    noIndex: false,
    childPageMetaType: null,
    pageMeta: null,
    keywords: contentFrontMatter.keywords?.map((kw) => kw.toString()) || [],
    hasSeparatorInNav: false,
  },
  contentReadme,
);
const contentFilePaths = globbySync(`legacy/content/content/*.md`);
contentFilePaths
  .filter((filePath) => !filePath.endsWith('index.md'))
  .forEach((filePath) => {
    const file = fs.readFileSync(filePath, 'utf8');
    const {readme, frontMatter} = parseMarkdown(file);
    const slug = filePath.slice(filePath.lastIndexOf('/') + 1, -3);
    createPage(
      {
        id: nanoid(),
        title: frontMatter.title,
        excerpt: frontMatter.description || '',
        slug,
        parentId: contentId,
        order: frontMatter.order || 0,
        layout: 'blocks',
        allowChildren: false,
        hideInNav: false,
        noIndex: false,
        childPageMetaType: null,
        pageMeta: null,
        keywords: frontMatter.keywords?.map((kw) => kw.toString()) || [],
        hasSeparatorInNav: false,
      },
      readme,
    );
  });

// Contributing
const contributingIndexFile = fs.readFileSync(
  'legacy/content/contributing/index.md',
  'utf8',
);
const {readme: contributingReadme, frontMatter: contributingFrontMatter} =
  parseMarkdown(contributingIndexFile);
const contributingId = nanoid();
createPage(
  {
    id: contributingId,
    title: contributingFrontMatter.title,
    excerpt: contributingFrontMatter.description,
    slug: 'contributing',
    parentId: null,
    order: contributingFrontMatter.order || 0,
    layout: 'blocks',
    allowChildren: true,
    hideInNav: false,
    noIndex: false,
    childPageMetaType: null,
    pageMeta: null,
    keywords:
      contributingFrontMatter.keywords?.map((kw) => kw.toString()) || [],
    hasSeparatorInNav: true,
  },
  contributingReadme,
);

const contributingFilePaths = globbySync(`legacy/content/contributing/*.md`);
contributingFilePaths
  .filter((filePath) => !filePath.endsWith('index.md'))
  .forEach((filePath) => {
    const file = fs.readFileSync(filePath, 'utf8');
    const {readme, frontMatter} = parseMarkdown(file);
    const slug = filePath.slice(filePath.lastIndexOf('/') + 1, -3);
    createPage(
      {
        id: nanoid(),
        title: frontMatter.title,
        excerpt: frontMatter.description || '',
        slug,
        parentId: contributingId,
        order: frontMatter.order || 0,
        layout: 'blocks',
        allowChildren: false,
        hideInNav: false,
        noIndex: false,
        childPageMetaType: null,
        pageMeta: null,
        keywords: frontMatter.keywords?.map((kw) => kw.toString()) || [],
        hasSeparatorInNav: false,
      },
      readme,
    );
  });

// Contributing: New page
createPage({
  id: nanoid(),
  title: 'Contributing to the website',
  excerpt: `Info about how the website works`,
  slug: 'website',
  parentId: contributingId,
  order: 99,
  layout: 'blocks',
  allowChildren: false,
  hideInNav: false,
  noIndex: false,
  childPageMetaType: null,
  pageMeta: null,
  keywords: ['website', 'site'],
  hasSeparatorInNav: false,
});

// Migrate foundtions: Design
const designIndexFile = fs.readFileSync(
  'legacy/content/design/index.md',
  'utf8',
);
const {readme: designReadme, frontMatter: designFrontMatter} =
  parseMarkdown(designIndexFile);
const designId = nanoid();
createPage(
  {
    id: designId,
    title: designFrontMatter.title,
    excerpt: designFrontMatter.description,
    slug: 'design',
    parentId: null,
    order: designFrontMatter.order || 0,
    layout: 'listing',
    allowChildren: true,
    hideInNav: false,
    noIndex: false,
    childPageMetaType: null,
    pageMeta: null,
    keywords: designFrontMatter.keywords?.map((kw) => kw.toString()) || [],
    hasSeparatorInNav: false,
  },
  designReadme,
);
const designFilePaths = globbySync(`legacy/content/design/*.md`);
designFilePaths
  .filter((filePath) => !filePath.endsWith('index.md'))
  .forEach((filePath) => {
    const file = fs.readFileSync(filePath, 'utf8');
    const {readme, frontMatter} = parseMarkdown(file);
    const slug = filePath.slice(filePath.lastIndexOf('/') + 1, -3);
    createPage(
      {
        id: nanoid(),
        title: frontMatter.title,
        excerpt: frontMatter.description,
        slug,
        parentId: designId,
        order: frontMatter.order || 0,
        layout: 'blocks',
        allowChildren: false,
        hideInNav: false,
        noIndex: false,
        childPageMetaType: null,
        pageMeta: null,
        keywords: frontMatter.keywords?.map((kw) => kw.toString()) || [],
        hasSeparatorInNav: false,
      },
      readme,
    );
  });

// Migrate foundations: Foundations
const foundationsIndexFile = fs.readFileSync(
  'legacy/content/foundations/index.md',
  'utf8',
);
const {readme: foundationsReadme, frontMatter: foundationsFrontMatter} =
  parseMarkdown(foundationsIndexFile);
const foundationsId = nanoid();
createPage(
  {
    id: foundationsId,
    title: foundationsFrontMatter.title,
    excerpt: foundationsFrontMatter.description,
    slug: 'foundations',
    parentId: null,
    order: foundationsFrontMatter.order || 0,
    layout: 'listing',
    allowChildren: true,
    hideInNav: false,
    noIndex: false,
    childPageMetaType: null,
    pageMeta: null,
    keywords: foundationsFrontMatter.keywords?.map((kw) => kw.toString()) || [],
    hasSeparatorInNav: true,
  },
  foundationsReadme,
);
const foundationsFilePaths = globbySync(`legacy/content/foundations/*.md`);
foundationsFilePaths
  .filter((filePath) => !filePath.endsWith('index.md'))
  .forEach((filePath) => {
    const file = fs.readFileSync(filePath, 'utf8');
    const {readme, frontMatter} = parseMarkdown(file);
    const slug = filePath.slice(filePath.lastIndexOf('/') + 1, -3);
    createPage(
      {
        id: nanoid(),
        title: frontMatter.title,
        excerpt: frontMatter.description,
        slug,
        parentId: foundationsId,
        order: frontMatter.order || 0,
        layout: 'blocks',
        allowChildren: false,
        hideInNav: false,
        noIndex: false,
        childPageMetaType: null,
        pageMeta: null,
        keywords: frontMatter.keywords?.map((kw) => kw.toString()) || [],
        hasSeparatorInNav: false,
      },
      readme,
    );
  });

// Migrate foundations: Getting started
const gettingStartedIndexFile = fs.readFileSync(
  'legacy/content/getting-started/index.md',
  'utf8',
);
const {readme: gettingStartedReadme, frontMatter: gettingStartedFrontMatter} =
  parseMarkdown(gettingStartedIndexFile);
const gettingStartedId = nanoid();
createPage(
  {
    id: gettingStartedId,
    title: gettingStartedFrontMatter.title,
    excerpt: gettingStartedFrontMatter.description,
    slug: 'getting-started',
    parentId: null,
    order: gettingStartedFrontMatter.order,
    layout: 'listing',
    allowChildren: true,
    hideInNav: false,
    noIndex: false,
    childPageMetaType: null,
    pageMeta: null,
    keywords: gettingStartedFrontMatter.keywords?.map((kw) => kw.toString()),
    hasSeparatorInNav: false,
  },
  gettingStartedReadme,
);
const gettingStartedFilePaths = globbySync(
  `legacy/content/getting-started/*.md`,
);
gettingStartedFilePaths
  .filter((filePath) => !filePath.endsWith('index.md'))
  .forEach((filePath) => {
    const file = fs.readFileSync(filePath, 'utf8');
    const {readme, frontMatter} = parseMarkdown(file);
    const slug = filePath.slice(filePath.lastIndexOf('/') + 1, -3);

    createPage(
      {
        id: nanoid(),
        title: frontMatter.title,
        excerpt: frontMatter.description,
        slug,
        parentId: gettingStartedId,
        order: frontMatter.order,
        layout: 'blocks',
        allowChildren: false,
        hideInNav: false,
        noIndex: false,
        childPageMetaType: null,
        pageMeta: null,
        keywords: frontMatter.keywords?.map((kw) => kw.toString()),
        hasSeparatorInNav: false,
      },
      readme,
    );
  });

// Migrate tools
const toolsId = nanoid();
createPage({
  id: toolsId,
  title: 'Tools',
  excerpt: 'Extensions, plugins, and other tools to help build with Polaris.',
  slug: 'tools',
  parentId: null,
  order: 10,
  layout: 'listing',
  allowChildren: true,
  hideInNav: false,
  noIndex: false,
  childPageMetaType: null,
  pageMeta: null,
  keywords: [],
  hasSeparatorInNav: false,
});

// Migrate What's new

// Migrate Icons
createPage({
  id: nanoid(),
  title: 'Icons',
  excerpt: '',
  slug: 'icons',
  parentId: null,
  order: 9,
  layout: 'blocks',
  allowChildren: false,
  hideInNav: false,
  noIndex: false,
  childPageMetaType: null,
  pageMeta: null,
  keywords: [],
  hasSeparatorInNav: false,
});

// Migrate tokens
const tokensPageId = nanoid();
createPage({
  id: tokensPageId,
  title: 'Tokens',
  excerpt: '',
  slug: 'tokens',
  parentId: null,
  order: 8,
  layout: 'blocks',
  allowChildren: false,
  hideInNav: false,
  noIndex: false,
  childPageMetaType: null,
  pageMeta: null,
  keywords: [],
  hasSeparatorInNav: false,
});

createPage({
  id: nanoid(),
  title: 'Colors',
  excerpt: '',
  slug: 'colors',
  parentId: tokensPageId,
  order: 0,
  layout: 'blocks',
  allowChildren: false,
  hideInNav: false,
  noIndex: false,
  childPageMetaType: null,
  pageMeta: {
    type: 'tokens',
    tokenGroup: 'colors',
  },
  keywords: [],
  hasSeparatorInNav: false,
});

createPage({
  id: nanoid(),
  title: 'Fonts',
  excerpt: '',
  slug: 'font',
  parentId: tokensPageId,
  order: 1,
  layout: 'blocks',
  allowChildren: false,
  hideInNav: false,
  noIndex: false,
  childPageMetaType: null,
  pageMeta: {
    type: 'tokens',
    tokenGroup: 'font',
  },
  keywords: [],
  hasSeparatorInNav: false,
});

createPage({
  id: nanoid(),
  title: 'Shape',
  excerpt: '',
  slug: 'shape',
  parentId: tokensPageId,
  order: 2,
  layout: 'blocks',
  allowChildren: false,
  hideInNav: false,
  noIndex: false,
  childPageMetaType: null,
  pageMeta: {
    type: 'tokens',
    tokenGroup: 'shape',
  },
  keywords: [],
  hasSeparatorInNav: false,
});

createPage({
  id: nanoid(),
  title: 'Spacing',
  excerpt: '',
  slug: 'spacing',
  parentId: tokensPageId,
  order: 3,
  layout: 'blocks',
  allowChildren: false,
  hideInNav: false,
  noIndex: false,
  childPageMetaType: null,
  pageMeta: {
    type: 'tokens',
    tokenGroup: 'spacing',
  },
  keywords: [],
  hasSeparatorInNav: false,
});

createPage({
  id: nanoid(),
  title: 'Depth',
  excerpt: '',
  slug: 'depth',
  parentId: tokensPageId,
  order: 5,
  layout: 'blocks',
  allowChildren: false,
  hideInNav: false,
  noIndex: false,
  childPageMetaType: null,
  pageMeta: {
    type: 'tokens',
    tokenGroup: 'depth',
  },
  keywords: [],
  hasSeparatorInNav: false,
});

createPage({
  id: nanoid(),
  title: 'Motion',
  excerpt: '',
  slug: 'motion',
  parentId: tokensPageId,
  order: 6,
  layout: 'blocks',
  allowChildren: false,
  hideInNav: false,
  noIndex: false,
  childPageMetaType: null,
  pageMeta: {
    type: 'tokens',
    tokenGroup: 'motion',
  },
  keywords: [],
  hasSeparatorInNav: false,
});

createPage({
  id: nanoid(),
  title: 'Breakpoints',
  excerpt: '',
  slug: 'breakpoints',
  parentId: tokensPageId,
  order: 7,
  layout: 'blocks',
  allowChildren: false,
  hideInNav: false,
  noIndex: false,
  childPageMetaType: null,
  pageMeta: {
    type: 'tokens',
    tokenGroup: 'breakpoints',
  },
  keywords: [],
  hasSeparatorInNav: false,
});

createPage({
  id: nanoid(),
  title: 'Z-index',
  excerpt: '',
  slug: 'zIndex',
  parentId: tokensPageId,
  order: 8,
  layout: 'blocks',
  allowChildren: false,
  hideInNav: false,
  noIndex: false,
  childPageMetaType: null,
  pageMeta: {
    type: 'tokens',
    tokenGroup: 'zIndex',
  },
  keywords: [],
  hasSeparatorInNav: false,
});

// Create file
const file = `import { Content } from '@/types';

/*
  Automatically generated file (created by /api/editor.tsx).
  Do not edit by hand.
*/

const pages : Content['pages'] = ${JSON.stringify(pages, null, 2)};

const blocks : Content['blocks'] = ${JSON.stringify(blocks, null, 2)};

const images : Content['images'] = [];

export const content : Content = { pages, blocks, images };
`;

fs.writeFileSync('content.ts', file, 'utf8');
