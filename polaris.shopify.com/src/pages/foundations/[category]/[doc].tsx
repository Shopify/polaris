import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import fs from "fs";
import path from "path";

import { parseMarkdown } from "../../../utils/markdown.mjs";
import { getUrlsFromNavItems } from "../../../utils/various";
import { MarkdownFile } from "../../../types";
import { foundationsNavItems } from "../../../data/navItems";
import FoundationsPage from "../../../components/FoundationsPage";

interface Props {
  category: string;
  markdownFile: MarkdownFile;
}

const Foundations: NextPage<Props> = ({ markdownFile }) => {
  return <FoundationsPage markdownFile={markdownFile} />;
};

const foundationsDirectory = path.join(process.cwd(), "content/foundations");

export const getStaticProps: GetStaticProps<
  Props,
  { category: string; doc: string }
> = async (context) => {
  // TODO: Markdown frontmatter typesafety
  const fullPath = path.join(
    foundationsDirectory,
    context.params?.category || "",
    `${context.params?.doc}.md`
  );

  let content = fs.readFileSync(fullPath, "utf-8");

  const markdownFile = parseMarkdown(content);

  if (content) {
    const props: Props = {
      category: context.params?.category || "",
      markdownFile,
    };

    return { props };
  }
  throw new Error(`Attempted to load this path but it was not found: ${path}`);
};

export const getStaticPaths: GetStaticPaths = async () => {
  let urls: string[] = getUrlsFromNavItems(foundationsNavItems);

  const paths = urls.map((url) => {
    const parts = url.split("/");
    return { params: { category: parts[2], doc: parts[3] } };
  });

  return {
    paths,
    fallback: false,
  };
};

export default Foundations;
