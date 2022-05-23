import Head from "next/head";
import { MarkdownFile } from "../../types";
import { useTOC } from "../../utils/hooks";
import { className, getTitleTagValue, slugify } from "../../utils/various";
import Longform from "../Longform";
import { navItems } from "../../data/navItems";
import Markdown from "../Markdown";
import MaxPageWidthDiv from "../MaxPageWidthDiv";
import Nav from "../Nav";
import styles from "./GuidelinesPage.module.scss";

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

      <MaxPageWidthDiv className={styles.GuidelinesPage}>
        <div className={styles.Nav}>
          <Nav navItems={navItems} />
        </div>

        <article className={styles.Post}>
          <Longform>
            <h1>{title}</h1>
          </Longform>
          <TOC readme={readme} />
          <Longform>
            <Markdown text={readme} skipH1 />
          </Longform>
        </article>
      </MaxPageWidthDiv>
    </>
  );
}

function TOC({ readme }: { readme: string }) {
  const [toc] = useTOC(readme);

  const isNested = !!toc.find((item) => item.children.length > 0);

  return (
    <div className={className(styles.TOC, isNested && styles.isNested)}>
      <ul>
        {toc.map((node) => (
          <li key={node.name}>
            <a href={`#${slugify(node.name)}`}>{node.name}</a>
            {node.children.length > 0 && (
              <ul>
                {node.children.map((child) => (
                  <li key={child.name}>
                    <a href={`#${slugify(child.name)}`}>{child.name}</a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GuidelinesPage;
