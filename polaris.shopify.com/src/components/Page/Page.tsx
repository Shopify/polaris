import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

import GlobalSearch from "../GlobalSearch";
import MaxPageWidthDiv from "../MaxPageWidthDiv";

import Header from "../Header";
import { className } from "../../utils/various";

import shopifyLogo from "../../../public/shopify-logo.svg";
import styles from "./Page.module.scss";

interface Props {
  skipHeaderAndFooter?: boolean;
  children: React.ReactNode;
}

const headerNavItems: {
  label: string;
  url: string;
}[] = [
  {
    label: "Getting started",
    url: "/resources",
  },
  {
    label: "Guidelines",
    url: "/guidelines",
  },
  {
    label: "Components",
    url: "/components",
  },
  {
    label: "Tokens",
    url: "/tokens/colors",
  },
  {
    label: "Icons",
    url: "/icons",
  },
];

function Page({ skipHeaderAndFooter = false, children }: Props) {
  const router = useRouter();

  const match = router.asPath.match(/^\/\w+/);
  const currentSection = match ? match[0] : "";

  return (
    <div className={className(styles.Page)}>
      {!skipHeaderAndFooter && (
        <>
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
                  const section = router.asPath
                    .split("/")
                    .slice(0, 2)
                    .join("/");
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
        </>
      )}

      {/* {!skipHeaderAndFooter && <Header currentSection={currentSection} />} */}

      <div className={styles.Content}>{children}</div>

      {!skipHeaderAndFooter && (
        <>
          <div className={styles.Footer}>
            <Image
              src={shopifyLogo}
              width={36}
              height={36}
              alt="Shopify logo"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Page;
