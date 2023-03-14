export interface Page {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  parentId: string | null;
  order: number;
  useCustomLayout: boolean;
  keywords: string[];
  childPageMetaType: PageMetaType | null;
  pageMeta: PageMeta | null;
  allowChildren: boolean;
  hideInNav: boolean;
  noIndex: boolean;
  hasSeparatorInNav: boolean;
  thumbnailImageId: string | null;
}

export interface PageWithBlocks extends Page {
  blocks: Block[];
}

export interface ResolvedPage extends Page {
  url: string;
  pageStack: Page[];
  images: Image[];
}

export interface ResolvedPageWithBlocks extends ResolvedPage {
  blocks: Block[];
}

export type BasePageMeta = {
  type: PageMetaType;
};

export const pageMetaTypes = [
  'components',
  'patterns',
  'foundations',
  'tokens',
] as const;
export type PageMetaType = typeof pageMetaTypes[number];

export const polarisComponentLifecyclePhases = [
  'Alpha',
  'Beta',
  'Stable',
  'Legacy',
  'Deprecated',
] as const;
export type PolarisComponentLifecyclePhase =
  typeof polarisComponentLifecyclePhases[number];

interface ComponentsPageMeta extends BasePageMeta {
  type: 'components';
  lifeCyclePhase: PolarisComponentLifecyclePhase;
  lifeCycleNotice: string;
  examples: {
    fileName: string;
    title: string;
    description: string;
  }[];
}

export type NavItem = {
  id: string;
  title: string;
  url: string;
  order: number;
  parentId: string | null;
  pageMeta: PageMeta | null;
  hasSeparatorInNav: boolean;
};

interface PatternsPageMeta extends BasePageMeta {
  type: 'patterns';
}

interface FoundationsPageMeta extends BasePageMeta {
  type: 'foundations';
}

export const tokenGroups = [
  'breakpoints',
  'colors',
  'depth',
  'font',
  'motion',
  'shape',
  'spacing',
  'zIndex',
] as const;
export type TokenGroup = typeof tokenGroups[number];

interface TokensPageMeta extends BasePageMeta {
  type: 'tokens';
  tokenGroup: TokenGroup;
}

export type PageMeta =
  | ComponentsPageMeta
  | PatternsPageMeta
  | FoundationsPageMeta
  | TokensPageMeta;

export const blockTypes = [
  'Markdown',
  'Image',
  'YoutubeVideo',
  'SandboxEmbed',
  'Code',
  'TextImage',
  'ProgressiveDisclosure',
] as const;

export type BlockType = typeof blockTypes[number];

export interface BaseBlock {
  id: string;
  blockType: BlockType;
  order: number;
  parentBlockId: string | null;
}

export interface MarkdownBlock extends BaseBlock {
  blockType: 'Markdown';
  content: string;
}

export interface ImageBlock extends BaseBlock {
  blockType: 'Image';
  imageId: string | null;
}

export interface YoutubeVideoBlock extends BaseBlock {
  blockType: 'YoutubeVideo';
  youtubeUrl: string;
}

export interface SandboxEmbedBlock extends BaseBlock {
  blockType: 'SandboxEmbed';
  embedUrl: string;
}

export interface CodeBlock extends BaseBlock {
  blockType: 'Code';
  code: {
    [language: string]: {
      title: string;
      code: string;
    };
  };
}

export interface TextImageBlock extends BaseBlock {
  blockType: 'TextImage';
  content: string;
  imageId: string | null;
}

export interface ProgressiveDisclosureBlock extends BaseBlock {
  blockType: 'ProgressiveDisclosure';
  title: string;
}

export type Block =
  | MarkdownBlock
  | ImageBlock
  | YoutubeVideoBlock
  | SandboxEmbedBlock
  | CodeBlock
  | TextImageBlock
  | ProgressiveDisclosureBlock;

export enum ColorScheme {
  Light = 'light',
  Dark = 'dark',
}

export type Image = {
  id: string;
  alt: {
    [ColorScheme.Light]: string;
    [ColorScheme.Dark]?: string;
  };
  variants: {
    [ColorScheme.Light]: {
      fileName: string;
      width: number;
      height: number;
    };
    [ColorScheme.Dark]?: {
      fileName: string;
      width: number;
      height: number;
    };
  };
};

export interface Content {
  pages: PageWithBlocks[];
  images: Image[];
}
