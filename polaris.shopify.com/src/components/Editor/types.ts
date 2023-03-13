export interface PageInfo {
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
}

export interface PageInfoWithUrl extends PageInfo {
  url: string;
  pageStack: PageInfo[];
}

export interface PageWithUrl extends Page {
  url: string;
  pageStack: PageInfo[];
}

export interface Page extends PageInfo {
  blocks: Block[];
}

export type BasePageMeta = {
  type: PageMetaType;
};

export const pageMetaTypes = ['components', 'patterns', 'foundations'] as const;
export type PageMetaType = typeof pageMetaTypes[number];

interface ComponentsPageMeta extends BasePageMeta {
  type: 'components';
  examples: {
    fileName: string;
    title: string;
    description: string;
  }[];
}

interface PatternsPageMeta extends BasePageMeta {
  type: 'patterns';
  tags: [];
}

interface FoundationsPageMeta extends BasePageMeta {
  type: 'foundations';
  icon: string;
}

export type PageMeta =
  | ComponentsPageMeta
  | PatternsPageMeta
  | FoundationsPageMeta;

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
    [scheme in ColorScheme]: string;
  };
  variants: {
    [scheme in ColorScheme]?: {
      fileName: string;
      width: number;
      height: number;
    };
  };
};

export interface Content {
  pages: Page[];
  images: Image[];
}
