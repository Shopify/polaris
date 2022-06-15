import fs from "fs";
import glob from "glob";
import path from "path";
import { marked } from "marked";
import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

import Examples from "../../components/Examples";
import type { Example } from "../../components/Examples";
import Longform from "../../components/Longform";
import Markdown from "../../components/Markdown";
import { NavItem } from "../../components/Nav/Nav";
import Layout from "../../components/Layout";
import { parseMarkdown } from "../../utils/markdown.mjs";
import { getComponentNav, getTitleTagValue } from "../../utils/various";

interface MarkdownData {
  frontMatter: any;
  readme: string;
}

interface Props {
  examples: [Example];
  name: string;
  readme: string;
}

const Components = ({ examples, name, readme }: Props) => {
  const navItems: NavItem[] = getComponentNav();

  return (
    <Layout width="narrow" navItems={navItems}>
      <Head>
        <title>{getTitleTagValue(name)}</title>
      </Head>
      <Longform>
        <h1>{name}</h1>
        <Examples examples={examples} />
        <Markdown text={readme} skipH1 />
      </Longform>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<
  Props,
  { component: string }
> = async (context) => {
  const componentSlug = context.params?.component;
  const mdFilePath = path.resolve(
    process.cwd(),
    `content/components/${componentSlug}.md`
  );

  if (fs.existsSync(mdFilePath)) {
    const componentMarkdown = fs.readFileSync(mdFilePath, "utf-8");
    const data: MarkdownData = parseMarkdown(componentMarkdown);
    const readme = marked(data.readme);
    const examples = data?.frontMatter?.examples.map((example: Example) => {
      const examplePath = path.resolve(
        process.cwd(),
        `src/pages/examples/${example.fileName}`
      );
      let code = "";

      if (fs.existsSync(examplePath)) {
        code = fs.readFileSync(examplePath, "utf-8");
        code = code
          .split("\n")
          .filter((line) => !line.includes("withPolarisExample"))
          .join("\n");
      }

      return { ...example, code };
    });
    const props: Props = {
      ...data.frontMatter,
      examples,
      readme,
    };

    return { props };
  } else {
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const componentBasePath = path.resolve(process.cwd(), "content/components");
  const paths = glob
    .sync(path.join(componentBasePath, "*.md"))
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

export default Components;
