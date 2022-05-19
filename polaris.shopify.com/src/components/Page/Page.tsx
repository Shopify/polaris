import React from "react";
import Link from "next/link";
import Image from "next/image";
import shopifyLogo from "../../../public/shopify-logo.svg";
import styles from "./Page.module.scss";
import { useRouter } from "next/router";
import GlobalSearch from "../GlobalSearch";
import { className } from "../../utils/various";

interface Props {
  renderNav?: () => React.ReactNode;
  noLayout?: boolean;
  children: React.ReactNode;
}

const headerNavItems: {
  url: string;
  label: string;
}[] = [
  {
    url: "#resources",
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

function Page({ renderNav, noLayout = false, children }: Props) {
  const router = useRouter();

  return (
    <div className={className(styles.Page, noLayout && styles.noLayout)}>
      <div className={styles.Header}>
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
      </div>

      <div className={styles.Content}>
        <div className={styles.Sidebar}>{renderNav && renderNav()}</div>

        {noLayout ? (
          <>{children}</>
        ) : (
          <div className={styles.MainContent}>{children}</div>
        )}
      </div>
    </div>
  );
}

export default Page;
