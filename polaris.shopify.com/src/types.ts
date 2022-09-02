import {MetadataProperties} from '@shopify/polaris-tokens';
import {Icon} from '@shopify/polaris-icons/metadata';

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
  description?: string;
  examples?: Example[];
  icon?: string;
  keywords?: (string | number)[];
  status?: {
    value: string;
    message: string;
  };
}

export type NavItem = {
  title: string;
  slug?: string;
  icon?: string;
  description?: string;
  status?: Status;
  children?: NavItem[];
};

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
  Deprecated = 'Deprecated',
  Alpha = 'Alpha',
  Information = 'Information',
  Warning = 'Warning',
}

export type Status = {
  value: StatusName;
  message: string;
};

export interface PropsForComponent {
  interfaceName: string;
  props: {
    name: string;
    type: string;
    comment?: string;
    optional: boolean;
    deprecated: boolean;
  }[];
}

export interface QuickGuideRow {
  question: string;
  answer: string;
}

export interface QuickGuide {
  title: string;
  queryParam: string;
  rows: QuickGuideRow[];
}
