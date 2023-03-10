export interface Page {
  id: string;
  title: string;
  slug: string;
  parentId: string | null;
  order: number;
  rendering: 'blocks' | 'custom';
}

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
  pageId: string;
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
  blocks: Block[];
  images: Image[];
}
