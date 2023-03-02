import {MetadataProperties} from '@shopify/polaris-tokens';
import {Icon} from '@shopify/polaris-icons/metadata';

export type PatternExample = {
  code: string;
  previewContext?: string;
  sandboxContext?: string;
};

export type MarkdownString = string;

export type PatternVariant = {
  description?: string;
  title: string;
  slug: string;
  howItHelps: MarkdownString;
  usefulToKnow: MarkdownString;
  example?: PatternExample;
};

export type Pattern = SingleVariantPattern | MultiVariantPattern;

export type SingleVariantPattern = {
  title: string;
  description?: string;
  relatedResources: MarkdownString;
  howItHelps: MarkdownString;
  usefulToKnow: MarkdownString;
  example: PatternExample;
};

export type MultiVariantPattern = {
  variants: PatternVariant[];
  description?: string;
  relatedResources: MarkdownString;
};

export interface SiteJSON {
  [key: string]: {
    frontMatter: FrontMatter;
  };
}

export interface Example extends FrontMatter {
  fileName: string;
}

export interface FrontMatter {
  title: string;
  category?: string;
  url?: string;
  description?: string;
  examples?: Example[];
  icon?: string;
  order?: number;
  keywords?: (string | number)[];
  status?: {
    value: string;
    message: string;
  };
  hideFromNav?: boolean;
}

export interface PatternFrontMatter extends Omit<FrontMatter, 'description'> {
  /* Description is shown on Patterns index page, and as the meta description on detail page */
  description: string;
  /* Lede is the first paragraph on the detail page, above variants */
  lede: string;
  previewImg?: string;
  order?: number;
  draft: boolean;
  githubDiscussionsLink?: string;
  variants?: string[];
}

export interface PatternVariantFontMatter {
  title?: string;
  slug?: string;
}

export type MarkdownFile = {
  frontMatter: any;
  readme: string;
};

export interface TokenPropertiesWithName extends MetadataProperties {
  name: string;
}

export const searchResultCategories = [
  'foundations',
  'components',
  'patterns',
  'tokens',
  'icons',
] as const;

export type SearchResultCategory = typeof searchResultCategories[number];

export interface SearchResult {
  id: string;
  category: SearchResultCategory;
  url: string;
  score: number;
  meta: Partial<{
    components: {
      title: string;
      description: string;
      status?: Status;
      group?: string;
    };
    patterns: {
      title: string;
      description: string;
      previewImg?: string;
    };
    foundations: {
      title: string;
      description: string;
      icon: string;
      category: string;
    };
    tokens: {
      category: string;
      token: TokenPropertiesWithName;
    };
    icons: {icon: Icon};
  }>;
}

export type SearchResults = SearchResult[];

export type GroupedSearchResults = {
  category: SearchResultCategory;
  results: SearchResult[];
}[];

export interface SearchResultItem {
  searchResultData?: {
    isHighlighted: boolean;
    tabIndex: -1;
    itemAttributes: {
      id: string;
      'data-is-active-descendant': boolean;
    };
    url: string;
  };
}

export enum Breakpoints {
  Mobile = 500,
  Tablet = 768,
  Desktop = 1400,
  DesktopLarge = 1600,
}

export enum StatusName {
  New = 'New',
  Deprecated = 'Deprecated',
  Alpha = 'Alpha',
  Beta = 'Beta',
  Information = 'Information',
  Legacy = 'Legacy',
  Warning = 'Warning',
}

export type Status = {
  value: StatusName;
  message: string;
};

export interface QuickGuideRow {
  question: string;
  answer: string;
}

export interface QuickGuide {
  title: string;
  queryParam: string;
  rows: QuickGuideRow[];
}

export type AllTypes = {
  [typeName: string]: {
    [filePath: string]: Type;
  };
};

export type FilteredTypes = {
  [typeName: string]: Type;
};

export type Type = {
  filePath: string;
  name: string;
  value: string | number | object;
  syntaxKind?: string;
  description?: string;
  isOptional?: true;
  deprecationMessage?: string;
  defaultValue?: string;
  members?: Type[];
};

export interface NavJSON {
  children?: {
    [key: string]: NavItem;
  };
}

export interface NavItem {
  title?: string;
  description?: string;
  slug?: string;
  order?: number;
  icon?: string;
  color?: string;
  hideChildren?: false;
  newSection?: true;
  status?: Status;
  children?: NavJSON;
  expanded?: boolean;
  hideFromNav?: boolean;
}
