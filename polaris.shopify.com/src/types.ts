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
  "Foundations",
  "Components",
  "Tokens",
  "Icons",
] as const;

export type SearchResultCategory = typeof searchResultCategories[number];

export interface SearchResult {
  id: string;
  category: SearchResultCategory;
  url: string;
  score: number;
  meta: Partial<{
    Components: {
      name: string;
      description: string;
      status?: Status;
    };
    Foundations: {
      title: string;
      excerpt: string;
    };
    Tokens: {
      category: string;
      token: TokenPropertiesWithName;
    };
    Icons: { icon: Icon };
  }>;
}

export type SearchResults = SearchResult[];

export type GroupedSearchResults = {
  [key in SearchResultCategory]: {
    results: SearchResult[];
    topScore: number;
  };
};

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
