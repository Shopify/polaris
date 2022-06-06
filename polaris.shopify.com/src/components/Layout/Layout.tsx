import React from "react";
import { TOCItem, useTOC } from "../../utils/hooks";
import { className, slugify } from "../../utils/various";
import Longform from "../Longform";
import MaxPageWidthDiv from "../MaxPageWidthDiv";
import Nav, { NavItem } from "../Nav/Nav";
import styles from "./Layout.module.scss";

interface Props {
  navItems?: NavItem[];
  title?: string;
  showTOC?: boolean;
  children: React.ReactNode;
}

function Layout({ navItems, title, showTOC = true, children }: Props) {
  const [tocItems] = useTOC(children);

  return (
    <MaxPageWidthDiv
      className={className(styles.Layout, showTOC && styles.showTOC)}
    >
      <div className={styles.Nav}>
        {navItems && <Nav navItems={navItems} />}
      </div>

      <article className={styles.Post}>
        {title && (
          <Longform>
            <h1>{title}</h1>
          </Longform>
        )}
        {children}
        {showTOC && <TOC items={tocItems} />}
      </article>
    </MaxPageWidthDiv>
  );
}

function TOC({ items }: { items: TOCItem[] }) {
  const isNested = !!items.find((item) => item.children.length > 0);

  return (
    <div className={className(styles.TOC, isNested && styles.isNested)}>
      <ul>
        {items.map(({ name, children }) => (
          <li key={name}>
            <a href={`#${slugify(name)}`}>{name}</a>
            {children.length > 0 && (
              <ul>
                {children.map((child) => (
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

export default Layout;
