export type MarkdownFile = {
  frontMatter: any;
  intro: string;
  readme: string;
};

export type SearchResult = {
  category: "Components" | "Tokens" | "Icons" | "Guidelines";
  title: string;
  excerpt: string;
  url: string;
  keywords: string[];
  meta: {
    colorToken?: { value: string };
    componentPreview?: { src: string };
    icon?: { fileName: string };
  };
}[];

export type LineConfig = {
  iframeSelector?: string;
  elementSelector: string;
  offset?: number;
  fromOrigin?: "center" | "edge" | "left" | "right";
  toOrigin?: "center" | "edge" | "left" | "right";
};
