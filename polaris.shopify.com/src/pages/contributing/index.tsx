import type { GetStaticProps, NextPage } from "next";
import fs from "fs";
import path from "path";
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
}

const Contributing: NextPage<Props> = ({ readme }) => {
  return (
    <Layout
      title="Contributing to Polaris"
      navItems={contributingNavItems}
      showTOC={false}
    >
      <Head>
        <title>{getTitleTagValue("Contributing to Polaris")}</title>
      </Head>

      <Longform>
        <Markdown text={readme} skipH1 />
      </Longform>
    </Layout>
  );
};

const contributingDirectory = path.join(process.cwd(), "content/contributing");

export const getStaticProps: GetStaticProps<
  Props,
  { category: string; doc: string }
> = async () => {
  const fullPath = path.join(contributingDirectory, "index.md");
  const content = fs.readFileSync(fullPath, "utf-8");
  const { readme } = parseMarkdown(content);

  if (content) {
    const props: Props = {
      readme,
    };

    return { props };
  }

  throw new Error(`Attempted to load this path but it was not found: ${path}`);
};

export default Contributing;
