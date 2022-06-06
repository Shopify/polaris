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
  "Guidelines",
  "Components",
  "Tokens",
  "Icons",
] as const;

export type SearchResultCategory = typeof searchResultCategories[number];

interface BaseSearchResult {
  url: string;
  score: number;
}

export interface GuidelinesSearchResult extends BaseSearchResult {
  category: "Guidelines";
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
  | GuidelinesSearchResult
  | ComponentsSearchResult
  | TokensSearchResult
  | IconsSearchResult;

export type SearchResults = SearchResult[];

export type GroupedSearchResults = {
  Guidelines: { results: GuidelinesSearchResult[]; maxScore: number };
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

export interface HighlightableSearchResult {
  getItemProps?: any;
  isHighlighted?: boolean;
}

export enum Breakpoints {
  SMALL = 768,
}
