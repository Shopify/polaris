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

interface BaseSearchResult {
  url: string;
  score: number;
}

export interface FoundationsSearchResult extends BaseSearchResult {
  category: "Foundations";
  meta: {
    title: string;
    excerpt: string;
  };
}

export interface ComponentsSearchResult extends BaseSearchResult {
  category: "Components";
  meta: {
    name: string;
    description: string;
  };
}

export interface TokensSearchResult extends BaseSearchResult {
  category: "Tokens";
  meta: {
    token: TokenPropertiesWithName;
  };
}

export interface IconsSearchResult extends BaseSearchResult {
  category: "Icons";
  meta: { icon: Icon };
}

export type SearchResult =
  | FoundationsSearchResult
  | ComponentsSearchResult
  | TokensSearchResult
  | IconsSearchResult;

export type SearchResults = SearchResult[];

export type GroupedSearchResults = {
  Foundations: { results: FoundationsSearchResult[]; maxScore: number };
  Components: { results: ComponentsSearchResult[]; maxScore: number };
  Tokens: { results: TokensSearchResult[]; maxScore: number };
  Icons: { results: IconsSearchResult[]; maxScore: number };
};

export type Icon = {
  fileName: string;
  keywords: string[];
  name: string;
  description: string;
  set: string;
};

export interface SearchResultItem {
  searchResultData?: {
    isHighlighted: boolean;
    tabIndex: -1;
    itemAttributes: {
      id: string;
      "data-is-active-descendant": boolean;
    };
    url: string;
  };
}

export enum Breakpoints {
  SMALL = 768,
}
