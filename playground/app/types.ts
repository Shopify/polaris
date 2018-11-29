export interface ComponentReadme {
  slug: string;
  name: string;
  examples: ExtractedExample[];
}

export interface ExtractedExample {
  name: string;
  slug: string;
  code: string;
}
