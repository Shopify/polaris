import React from "react";
import { TOCItem, useTOC } from "../../utils/hooks";
import { className, slugify } from "../../utils/various";
import Longform from "../Longform";
import Container from "../Container";
import Nav, { NavItem } from "../Nav/Nav";
import styles from "./Layout.module.scss";

interface Props {
  width?: "full" | "narrow";
  navItems?: NavItem[];
  title?: string;
  showTOC?: boolean;
  children: React.ReactNode;
}

function Layout({
  width = "full",
  navItems,
  title,
  showTOC = true,
  children,
}: Props) {
  const [tocItems] = useTOC(children);

  return (
    <Container
      className={className(
        styles.Layout,
        showTOC && styles.showTOC,
        width === "narrow" && styles.narrow
      )}
    >
      <div className={styles.Nav}>
        {navItems && <Nav navItems={navItems} />}
      </div>

      <article className={styles.Main}>
        <div className={styles.CenteredMainContent}>
          {title && (
            <Longform>
              <h1>{title}</h1>
            </Longform>
          )}
          <div className={styles.Post}>
            {showTOC && <TOC items={tocItems} />}
            <div id="main" className={styles.PostContent}>
              {children}
            </div>
          </div>
        </div>
      </article>
    </Container>
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
