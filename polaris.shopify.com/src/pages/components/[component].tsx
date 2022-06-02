import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import fs from "fs";
import path from "path";
import glob from "glob";
import { marked } from "marked";
import { parseMarkdown } from "../../utils/markdown.mjs";

import { getComponentNav, getTitleTagValue } from "../../utils/various";
import { NavItem } from "../../components/Nav/Nav";
import NavContentTOCLayout from "../../components/NavContentTOCLayout";

interface MarkdownData {
  frontMatter: any;
  readme: string;
}

interface Props {
  name: string;
  readme: string;
}

const Components: NextPage<Props> = (props) => {
  const { name, readme } = props;
  const navItems: NavItem[] = getComponentNav();

  return (
    <>
      <Head>
        <title>{getTitleTagValue(name)}</title>
      </Head>

      <NavContentTOCLayout
        navItems={navItems}
        title={name}
        showTOC={true}
        content={readme}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps<
  Props,
  { component: string }
> = async (context) => {
  const componentSlug = context.params?.component;
  const mdFilePath = path.join(
    process.cwd(),
    `content/components/${componentSlug}/index.md`
  );

  if (fs.existsSync(mdFilePath)) {
    const componentMarkdown = fs.readFileSync(mdFilePath, "utf-8");
    const data: MarkdownData = parseMarkdown(componentMarkdown);
    const readme = marked(data.readme);
    const props: Props = { ...data.frontMatter, readme };

    return { props };
  } else {
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const componentBasePath = path.resolve(process.cwd(), "content/components");
  const paths = glob
    .sync(path.join(componentBasePath, "**/index.md"))
    .map((fileName) => {
      return fileName
        .replace(`${process.cwd()}/content`, "")
        .replace("/index.md", "");
    });

  return {
    paths,
    fallback: false,
  };
};

export default Components;
