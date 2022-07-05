import { TokenProperties } from "@shopify/polaris-tokens";

export type MarkdownFile = {
  frontMatter: any;
  intro: string;
  readme: string;
};

export interface TokenPropertiesWithName extends TokenProperties {
  name: string;
}

export const searchResultCategories = [
  "foundations",
  "components",
  "tokens",
  "icons",
] as const;

export type SearchResultCategory = typeof searchResultCategories[number];

export interface SearchResult {
  id: string;
  category: SearchResultCategory;
  url: string;
  score: number;
  meta: Partial<{
    components: {
      name: string;
      description: string;
      status?: Status;
    };
    foundations: {
      title: string;
      excerpt: string;
    };
    tokens: {
      category: string;
      token: TokenPropertiesWithName;
    };
    icons: { icon: Icon };
  }>;
}

export type SearchResults = SearchResult[];

export type GroupedSearchResults = {
  category: SearchResultCategory;
  results: SearchResult[];
}[];

export type Icon = {
  fileName: string;
  keywords: string[];
  name: string;
  description: string;
  set: string;
};

export enum Breakpoints {
  Mobile = 500,
  Tablet = 768,
  Desktop = 1400,
  DesktopLarge = 1600,
}

export type Status = {
  value: string;
  message: string;
};
