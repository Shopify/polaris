import Head from "next/head";
import { MarkdownFile } from "../../types";
import { navItems } from "../../data/navItems";
import NavContentTOCLayout from "../NavContentTOCLayout";
import { getTitleTagValue } from "../../utils/various";

interface Props {
  markdownFile: MarkdownFile;
}

function GuidelinesPage({ markdownFile: { readme, frontMatter } }: Props) {
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

      <NavContentTOCLayout navItems={navItems} title={title} content={readme} />
    </>
  );
}

export default GuidelinesPage;
