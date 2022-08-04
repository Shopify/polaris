import glob from "glob";
import path from "path";
import matter from "gray-matter";
import { readFile } from "fs/promises";
import type { GetStaticProps, GetStaticPaths } from "next";

import { parseMarkdown } from "../utils/markdown.mjs";
import Page from "../components/Page";
import Longform from "../components/Longform";

interface Props {
  slug: string;
  title?: string;
  description?: string;
  keywords?: string[];
  body: string;
}

const SlugPage = ({ slug, title, description, keywords, body }: Props) => {
  return (
    <Page title={title} description={description} keywords={keywords}>
      <Longform>
        <p>Current URL: {slug}</p>
        <p>Keywords: {keywords ? keywords.join(" ") : null}</p>
        <h1>{title}</h1>
        {description}
        {body}
      </Longform>
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.slug) return { notFound: true };

  const slug = Array.isArray(params.slug) ? params.slug.join("/") : params.slug;

  const mdFilePath = path.join(process.cwd(), `content/${slug}/index.md`);
  const mdFileContent = await readFile(mdFilePath, "utf-8");
  const { content, data } = matter(mdFileContent);

  const frontmatter = data;
  const body = await parseMarkdown(content);
  const description = await parseMarkdown(frontmatter.description);

  console.log(body);

  return {
    props: {
      title: frontmatter.title,
      description: "abc",
      keywords: frontmatter.keywords,
      slug,
      body: "yo",
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = glob
    .sync("**/*/index.md", { cwd: "content" })
    .map((filePath) => `/${filePath.replace("/index.md", "")}`);

  return {
    paths,
    fallback: false,
  };
};

export default SlugPage;
