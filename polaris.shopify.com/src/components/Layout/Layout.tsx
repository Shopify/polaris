import React, { useEffect, useState } from "react";
import { TOCItem, useTOC } from "../../utils/hooks";
import { className, slugify } from "../../utils/various";
import Longform from "../Longform";
import Container from "../Container";
import Nav, { NavItem } from "../Nav";

import styles from "./Layout.module.scss";

const HEADING_THRESHOLD = 120;

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
  const [idOfCurrentHeading, setIdOfCurrentHeading] = useState<string>();

  useEffect(() => {
    const handler = () => {
      const headings = document.querySelectorAll("#main h2, #main h3");
      let currentHeading: Element | null = null;

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        const rect = heading.getBoundingClientRect();
        currentHeading = heading;
        if (rect.top < HEADING_THRESHOLD) {
          break;
        }
      }

      if (!currentHeading && headings.length > 0) {
        currentHeading = headings[0];
      }

      if (currentHeading) {
        const id = currentHeading.getAttribute("id");
        if (id) {
          setIdOfCurrentHeading(id);
        }
      }
    };

    handler();
    window.addEventListener("scroll", handler);

    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

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

      <article className={styles.Post}>
        <div className={styles.PostInner} id="main">
          {title && (
            <Longform>
              <h1>{title}</h1>
            </Longform>
          )}
          {children}
        </div>
      </article>

      {showTOC && (
        <TOC items={tocItems} idOfCurrentHeading={idOfCurrentHeading} />
      )}
    </Container>
  );
}

function TOC({
  items,
  idOfCurrentHeading,
}: {
  items: TOCItem[];
  idOfCurrentHeading: string | undefined;
}) {
  const isNested = !!items.find((item) => item.children.length > 0);

  function scrollIntoView(id: string) {
    const targetEl = document.getElementById(id);
    if (targetEl) {
      const top =
        window.scrollY +
        targetEl.getBoundingClientRect().top -
        HEADING_THRESHOLD +
        1;
      window.scrollTo({ top, behavior: "smooth" });
      return false;
    }
  }

  return (
    <div className={className(styles.TOC, isNested && styles.isNested)}>
      <ul>
        {items.map(({ name, children }) => {
          const id = slugify(name);
          return (
            <li key={name}>
              <a
                href={`#${id}`}
                data-is-current={id === idOfCurrentHeading}
                onClick={(evt) => {
                  scrollIntoView(id);
                  evt.preventDefault();
                }}
              >
                {name}
              </a>
              {children.length > 0 && (
                <ul>
                  {children.map((child) => {
                    const id = slugify(child.name);
                    return (
                      <li key={child.name}>
                        <a
                          href={`#${id}`}
                          data-is-current={id === idOfCurrentHeading}
                          onClick={(evt) => {
                            scrollIntoView(id);
                            evt.preventDefault();
                          }}
                        >
                          {child.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Layout;
