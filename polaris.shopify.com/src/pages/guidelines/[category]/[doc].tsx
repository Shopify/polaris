import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Longform from "../../../components/Longform";
import fs from "fs";
import path from "path";
import { parseMarkdown } from "../../../utils/markdown.mjs";
import Markdown from "../../../components/Markdown";
import { getTitleTagValue, getUrlsFromNavItems } from "../../../utils/various";
import { MarkdownFile } from "../../../types";
import MaxPageWidthDiv from "../../../components/MaxPageWidthDiv";
import { navItems } from "../../../components/GuidelinesNav";

interface Props {
  category: string;
  markdown: MarkdownFile;
}

const Components: NextPage<Props> = ({ markdown: { readme, frontMatter } }) => {
  let title = frontMatter?.name || "";

  if (title.includes("/")) {
    const parts = title.split("/");
    title = parts[parts.length - 1];
  }

  return (
    <>
      <Head>
        <title>{getTitleTagValue(title)}</title>
      </Head>

      <MaxPageWidthDiv>
        <div style={{ maxWidth: 800, margin: "3rem auto" }}>
          <Longform>
            <Markdown text={readme} />
          </Longform>
        </div>
      </MaxPageWidthDiv>
    </>
  );
};

const postsDirectory = path.join(process.cwd(), "src/pages-from-old-website");

export const getStaticProps: GetStaticProps<
  Props,
  { category: string; doc: string }
> = async (context) => {
  // TODO: Sanitize params?
  const fullPath = path.join(
    postsDirectory,
    context.params?.category || "",
    `${context.params?.doc}.md`
  );

  let content = fs.readFileSync(fullPath, "utf-8");

  const markdown = parseMarkdown(content);

  if (content) {
    const props: Props = {
      category: context.params?.category || "",
      markdown,
    };

    return { props };
  }
  throw new Error(`Attempted to load this path but it was not found: ${path}`);
};

export const getStaticPaths: GetStaticPaths = async () => {
  let urls: string[] = getUrlsFromNavItems(navItems);

  const paths = urls.map((url) => {
    const parts = url.split("/");
    return { params: { category: parts[2], doc: parts[3] } };
  });

  return {
    paths,
    fallback: false,
  };
};

export default Components;
