import Head from "next/head";
import { MarkdownFile } from "../../types";
import { navItems } from "../../data/navItems";
import Layout from "../Layout";
import { getTitleTagValue } from "../../utils/various";
import Longform from "../Longform";
import Markdown from "../Markdown";

interface Props {
  markdownFile: MarkdownFile;
}

function FoundationsPage({ markdownFile: { readme, frontMatter } }: Props) {
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

      <Layout navItems={navItems} title={title}>
        <Longform>
          <Markdown text={readme} skipH1 />
        </Longform>
      </Layout>
    </>
  );
}

export default FoundationsPage;
