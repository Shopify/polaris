import React from "react";
import Link from "next/link";
import Image from "next/image";
import shopifyLogo from "../../../public/shopify-logo.svg";
import styles from "./Page.module.scss";
import GlobalSearch from "../GlobalSearch";
import { className } from "../../utils/various";
import { useRouter } from "next/router";
import MaxPageWidthDiv from "../MaxPageWidthDiv";

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
    url: "/guidelines/foundations/experience-values",
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
