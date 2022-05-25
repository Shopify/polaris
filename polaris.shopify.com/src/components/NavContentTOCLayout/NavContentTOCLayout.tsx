import { useTOC } from "../../utils/hooks";
import { className, slugify } from "../../utils/various";
import Longform from "../Longform";
import Markdown from "../Markdown";
import MaxPageWidthDiv from "../MaxPageWidthDiv";
import Nav, { NavItem } from "../Nav/Nav";
import styles from "./NavContentTOCLayout.module.scss";

interface Props {
  navItems: NavItem[];
  title: string;
  content: string | React.ReactNode;
  showTOC?: boolean;
}

function NavContentTOCLayout({
  navItems,
  title,
  content,
  showTOC = true,
}: Props) {
  return (
    <MaxPageWidthDiv
      className={className(
        styles.NavContentTOCLayout,
        showTOC && styles.showTOC
      )}
    >
      <div className={styles.Nav}>
        <Nav navItems={navItems} />
      </div>

      <article className={styles.Post}>
        {typeof content === "string" ? (
          <>
            <Longform>
              <h1>{title}</h1>
            </Longform>
            {showTOC && <TOC rerenderOnChange={content} />}
            <Longform>
              <Markdown text={content} skipH1 />
            </Longform>
          </>
        ) : (
          <>
            <h1>{title}</h1>
            {showTOC && <TOC rerenderOnChange={content} />}
            {content}
          </>
        )}
      </article>
    </MaxPageWidthDiv>
  );
}

function TOC({
  rerenderOnChange,
}: {
  rerenderOnChange: string | React.ReactNode;
}) {
  const [toc] = useTOC(rerenderOnChange);

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

export default NavContentTOCLayout;
