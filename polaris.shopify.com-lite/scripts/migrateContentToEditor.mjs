import fs from 'fs';
import {globbySync} from 'globby';
import {parseMarkdown} from '../legacy/markdown.mjs';
import {nanoid} from 'nanoid';

const pages = [];

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
    thumbnailImage = {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
    blocks,
  },
  markdown,
) {
  const blockId = nanoid();
  const fixImagePaths = (markdown) =>
    markdown
      .replace(
        /!\[([^\]]*)]\(([^)]*)\)/g,
        (_, alt, src) => `![${alt}](/images/${src.split('/').pop()})`,
      )
      .replace(
        /src="([^"]+)"/g,
        (_, src) => `src="/images/${src.split('/').pop()}"`,
      );
  const newBlocks =
    layout !== 'listing' && markdown
      ? [
          {
            id: blockId,
            blockType: 'Markdown',
            content: fixImagePaths(markdown).trim(),
          },
        ]
      : blocks || [];

  const page = {
    id,
    title,
    excerpt,
    slug,
    parentId,
    order,
    layout,
    blocks: newBlocks,
    allowChildren,
    hideInNav,
    hasNewBadge: false,
    noIndex,
    keywords,
    childPageMetaType,
    pageMeta,
    hasSeparatorInNav,
    thumbnailImage,
  };
  pages.push(page);
}

// Migrate Home
createPage({
  id: 'SIC6mp1SHvcUtS98_DTHb',
  title: 'Home',
  excerpt: '',
  slug: '',
  parentId: null,
  order: 0,
  layout: 'blocks',
  allowChildren: false,
  hideInNav: true,
  noIndex: false,
  childPageMetaType: null,
  pageMeta: null,
  keywords: [],
  hasSeparatorInNav: false,
});

// Migrate What's new
const whatsNewId = nanoid();

createPage({
  id: whatsNewId,
  title: "What's new",
  excerpt: '',
  slug: 'whats-new',
  parentId: null,
  order: 0,
  layout: 'listing',
  allowChildren: true,
  hideInNav: false,
  noIndex: false,
  childPageMetaType: null,
  pageMeta: null,
  keywords: ['news', 'update', 'changelog', 'releases'],
  hasSeparatorInNav: false,
});

const whatsNewFilePaths = globbySync(`legacy/content/whats-new/*.md`);
whatsNewFilePaths
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
        parentId: whatsNewId,
        order: frontMatter.order || 0,
        layout: 'blocks',
        allowChildren: false,
        hideInNav: true,
        noIndex: false,
        childPageMetaType: null,
        pageMeta: null,
        keywords: frontMatter.keywords?.map((kw) => kw.toString()) || [],
        hasSeparatorInNav: false,
      },
      readme,
    );
  });

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
    order: 6,
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
          thumbnailImage: {
            lightModeFilename: `${slug}.png`,
            darkModeFilename: '',
            alt: `Thumbnail for the ${frontMatter.title} component`,
            width: 1575,
            height: 900,
          },
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
    order: 5,
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
    order: 4,
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
    order: 9,
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

const contributingToTheWebsiteBlocks = [
  {
    id: 'Zn8jtk2Lzz7vxmLcNcpzR',
    blockType: 'Markdown',
    content: `## The content structure

### The Page object

Each page is represented by a Typescript object that contains all the information about the page.`,
  },
  {
    id: '3f67h7MDYwvoRHoYTAZfU',
    blockType: 'Markdown',
    content: `### Blocks

Every page can contain blocks. There are many types of blocks to choose from:

- Markdown block
- Image block
- Youtube embed block
- Sandbox embed block

And more. A block is defined in Typescript using a simple object. Every object has an \`id\` and a \`blockType\`:`,
  },
  {
    id: '8IZchJG6-k7F27BvaT2ay',
    blockType: 'Markdown',
    content: `You can add more fields to each block. The available fields depend on which \`blockType\` you use. For instance, the Youtube block accepts a URL field:`,
  },
  {
    id: 'bBmDBbwLADywIhJwDDpcE',
    blockType: 'Markdown',
    content: `Blocks are added to the \`Page\` on the \`blocks\` property. The property is an array that takes \`Block\` objects:`,
  },
  {
    id: 'AnGTB6rJHT-R5MtLGtDYC',
    blockType: 'DoDont',
    doMarkdown:
      '- Use the existing blocks to create new pages. We have enough primitives to communicate any type of content. Use the existing primitives instead of creating new ones.\n- ',
    dontMarkdown: '',
  },
];

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
  blocks: contributingToTheWebsiteBlocks,
});

// Migrate foundations: Design
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
    order: 3,
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
    order: 2,
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
    order: 1,
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

// Migrate Icons
const iconsPageId = nanoid();
createPage({
  id: iconsPageId,
  title: 'Icons',
  excerpt: '',
  slug: 'icons',
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
  title: 'Icons in Figma',
  excerpt: '',
  slug: 'icons-in-figma',
  parentId: iconsPageId,
  order: 0,
  layout: 'blocks',
  allowChildren: false,
  hideInNav: false,
  noIndex: false,
  childPageMetaType: null,
  pageMeta: null,
  keywords: ['icon', 'icons', 'figma', 'ui kit'],
  hasSeparatorInNav: false,
});

createPage({
  id: nanoid(),
  title: 'Icons in React',
  excerpt: '',
  slug: 'icons-in-react',
  parentId: iconsPageId,
  order: 1,
  layout: 'blocks',
  allowChildren: false,
  hideInNav: false,
  noIndex: false,
  childPageMetaType: null,
  pageMeta: null,
  keywords: ['icon', 'icons', 'figma', 'ui kit'],
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
  order: 7,
  layout: 'listing',
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
  pageMeta: null,
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
  pageMeta: null,
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
  pageMeta: null,
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
  pageMeta: null,
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
  pageMeta: null,
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
  pageMeta: null,
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
  pageMeta: null,
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
  pageMeta: null,
  keywords: [],
  hasSeparatorInNav: false,
});

// Create file
const file = `import { State } from '@/types';

/*
  Automatically generated file (created by /api/editor.tsx).
  Do not edit by hand.
*/

const pages : State['pages'] = ${JSON.stringify(pages, null, 2)};

export const content : State = { pages };
`;

fs.writeFileSync('content.ts', file, 'utf8');

// Migrate images
fs.rmSync('./public/images', {recursive: true, force: true});
fs.mkdirSync('./public/images');

globbySync('./legacy/images', {onlyFiles: true}).forEach((file) => {
  const fileName = file.split('/').pop();
  fs.copyFileSync(file, `./public/images/${fileName}`);
});
