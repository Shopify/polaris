import React from "react";
import Link from "next/link";
import Image from "next/image";
import shopifyLogo from "../../../public/shopify-logo.svg";
import styles from "./Page.module.scss";
import { useRouter } from "next/router";
import GlobalSearch from "../GlobalSearch";
import { className } from "../../utils/various";
import MaxPageWidthDiv from "../MaxPageWidthDiv";
import { useEffect } from "react";
import { useState } from "react";

interface Props {
  renderNav?: () => React.ReactNode;
  noLayout?: boolean;
  showTOC?: boolean;
  renderAbove?: () => React.ReactNode;
  children: React.ReactNode;
}

const headerNavItems: {
  url: string;
  label: string;
}[] = [
  {
    url: "/resources",
    label: "Resources",
  },
  {
    url: "/guidelines/foundations/experience-values",
    label: "Guidelines",
  },
  { url: "/components", label: "Components" },
  { url: "/icons", label: "Icons" },
  {
    url: "/tokens/getting-started",
    label: "Tokens",
  },
];

type TOCNode = {
  name: string;
  element: "H2" | "H3";
  children: TOCNode[];
};

function Page({
  renderNav,
  noLayout = false,
  renderAbove,
  showTOC = true,
  children,
}: Props) {
  const router = useRouter();
  const [toc, setToc] = useState<TOCNode[]>([]);

  useEffect(() => {
    let tocNodes: TOCNode[] = [];
    let currentNode: TOCNode | null = null;

    const headings = document.querySelectorAll<HTMLHeadingElement>("h2,h3");
    headings.forEach((el, i) => {
      if (currentNode === null) {
        if (el.tagName === "H2") {
          if (typeof el.textContent === "string") {
            currentNode = {
              name: el.textContent,
              element: "H2",
              children: [],
            };
          }
        }
      } else {
        if (el.tagName === "H2") {
          if (typeof el.textContent === "string") {
            tocNodes.push(currentNode);
            currentNode = {
              name: el.textContent,
              element: "H2",
              children: [],
            };
          }
        } else if (el.tagName === "H3") {
          if (typeof el.textContent === "string") {
            if (currentNode.element === "H2") {
              if (el.closest(".usage-list") === null) {
                currentNode.children.push({
                  name: el.textContent,
                  element: "H3",
                  children: [],
                });
              }
            }
          }
        }
        if (i === headings.length - 1) {
          tocNodes.push(currentNode);
        }
      }
    });
    setToc(tocNodes);
  }, [children]);

  return (
    <div className={className(styles.Page, noLayout && styles.noLayout)}>
      <div className={styles.Header}>
        <MaxPageWidthDiv className={styles.HeaderInner}>
          <Link href="/">
            <a className={styles.Logo}>
              <Image
                src={shopifyLogo}
                width={24}
                height={24}
                alt="Shopify logo"
              />
              Polaris
            </a>
          </Link>

          <ul className={styles.Nav}>
            {headerNavItems.map(({ url, label }) => {
              const section = router.asPath.split("/").slice(0, 2).join("/");
              const isCurrent =
                section !== "/" && url.startsWith(section) ? "page" : false;
              return (
                <li key={url}>
                  <Link href={url} passHref>
                    <a aria-current={isCurrent}>{label}</a>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className={styles.SearchWrapper}>
            <GlobalSearch />
          </div>
        </MaxPageWidthDiv>
      </div>

      {renderAbove && (
        <MaxPageWidthDiv className={styles.Title}>
          {renderAbove()}
        </MaxPageWidthDiv>
      )}

      {noLayout ? (
        <div className={styles.NoLayoutContent}>{children}</div>
      ) : (
        <MaxPageWidthDiv className={styles.Content}>
          {renderNav && <div className={styles.Sidebar}>{renderNav()}</div>}
          <div className={styles.MainContent}>{children}</div>
          {showTOC && toc && (
            <div className={styles.TOC}>
              <ul>
                {toc.map((node) => (
                  <li key={node.name}>
                    <a href="#">{node.name}</a>
                    {node.children && (
                      <ul>
                        {node.children.map((child) => (
                          <li key={child.name}>
                            <a href="#">{child.name}</a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </MaxPageWidthDiv>
      )}

      <div className={styles.Footer}>
        <Image src={shopifyLogo} width={24} height={24} alt="Shopify logo" />
      </div>
    </div>
  );
}

export default Page;
