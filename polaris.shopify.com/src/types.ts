import { TokenProperties } from "@shopify/polaris-tokens";

export type MarkdownFile = {
  frontMatter: any;
  intro: string;
  readme: string;
};

export interface TokenPropertiesWithName extends TokenProperties {
  name: string;
}

export type SearchResultCategory =
  | "Components"
  | "Tokens"
  | "Icons"
  | "Guidelines";

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

export interface TokensSearchSearchResult extends BaseSearchResult {
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
  | TokensSearchSearchResult
  | IconsSearchResult;

export type SearchResults = SearchResult[];

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
