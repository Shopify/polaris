import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import fs from "fs";
import path from "path";
import glob from "glob";
import Head from "next/head";

import Layout from "../../components/Layout";
import Longform from "../../components/Longform";
import Markdown from "../../components/Markdown";
import { contributingNavItems } from "../../data/navItems";
import { parseMarkdown } from "../../utils/markdown.mjs";
import { getTitleTagValue } from "../../utils/various";
import { MarkdownFile } from "../../types";

interface Props {
  readme: MarkdownFile["readme"];
  title: string;
}

const contributingDirectory = path.join(process.cwd(), "content/contributing");

const Contributing: NextPage<Props> = ({ readme, title }: Props) => {
  return (
    <Layout navItems={contributingNavItems}>
      <Head>
        <title>{getTitleTagValue(title)}</title>
      </Head>

      <Longform>
        <Markdown text={readme} />
      </Longform>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<Props, { doc: string }> = async ({
  params,
}) => {
  const mdFilePath = path.resolve(
    process.cwd(),
    `content/contributing/${params?.doc || ""}.md`
  );

  if (fs.existsSync(mdFilePath)) {
    const markdown = fs.readFileSync(mdFilePath, "utf-8");
    const { readme, frontMatter }: MarkdownFile = parseMarkdown(markdown);
    let title = frontMatter?.name || "";

    if (title.includes("/")) {
      const parts = title.split("/");
      title = parts[parts.length - 1];
    }

    const props: Props = {
      title,
      readme,
    };

    return { props };
  } else {
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const basePath = path.resolve(process.cwd(), "content/contributing");
  const paths = glob
    .sync(path.join(basePath, "*.md"))
    .map((fileName: string) => {
      return fileName
        .replace(`${process.cwd()}/content`, "")
        .replace(".md", "");
    });

  return {
    paths,
    fallback: false,
  };
};

export default Contributing;
