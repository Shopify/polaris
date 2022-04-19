export type Result = {
  type: "component" | "token" | "icon" | "guidelines";
  title: string;
  excerpt: string;
  url: string;
  keywords: string[];
  meta: {
    colorToken?: { value: string };
    componentPreview?: { src: string };
    icon?: { fileName: string };
  };
};

export type LineConfig = {
  iframeSelector?: string;
  elementSelector: string;
  offset?: number;
  fromOrigin?: "center" | "edge" | "left" | "right";
  toOrigin?: "center" | "edge" | "left" | "right";
};
