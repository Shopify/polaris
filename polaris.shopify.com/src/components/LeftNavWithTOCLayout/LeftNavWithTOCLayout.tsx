import { useTOC } from "../../utils/hooks";
import { className, slugify } from "../../utils/various";
import MaxPageWidthDiv from "../MaxPageWidthDiv";
import Nav, { NavItem } from "../Nav/Nav";
import styles from "./LeftNavWithTOCLayout.module.scss";

interface Props {
  content: string | React.ReactNode;
  navItems?: NavItem[];
  title?: string;
  customNav?: React.ReactNode;
  showTOC?: boolean;
  children: React.ReactNode
}

function LeftNavWithTOCLayout({
  navItems,
  content,
  children
}: Props) {
  return (
    <MaxPageWidthDiv
      className={className(
        styles.LeftNavWithTOCLayout,
        styles.showTOC
      )}
    >
      <div className={styles.Nav}>
        {navItems && <Nav navItems={navItems} />}
      </div>

      <article className={styles.Post}>
        {children}
        <TOC rerenderOnChange={content} />
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

export default LeftNavWithTOCLayout;
