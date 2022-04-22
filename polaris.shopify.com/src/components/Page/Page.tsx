import React from "react";
import Link from "next/link";
import Image from "next/image";
import shopifyLogo from "../../../public/shopify-logo.svg";
import styles from "./Page.module.scss";
import { useRouter } from "next/router";
import GlobalSearch from "../GlobalSearch";

interface Props {
  renderNav?: () => React.ReactNode;
  noLayout?: boolean;
  children: React.ReactNode;
}

const headerNavItems: {
  url: string;
  label: string;
  icon: string;
}[] = [
  {
    url: "/docs/foundations/experience-values",
    label: "Guidelines",
    icon: "/file-text.svg",
  },
  { url: "/components", label: "Components", icon: "/package.svg" },
  {
    url: "/tokens/getting-started",
    label: "Tokens",
    icon: "/layers.svg",
  },
  { url: "/icons", label: "Icons", icon: "/grid.svg" },
];

function Page({ renderNav, noLayout = false, children }: Props) {
  const router = useRouter();

  return (
    <div className={[styles.Page, noLayout ? styles.noLayout : null].join(" ")}>
      <div className={styles.Header}>
        <div className={styles.HeaderMain}>
          <Link href="/">
            <a className={styles.Logo}>
              <Image
                src={shopifyLogo}
                width={32}
                height={32}
                alt="Shopify logo"
              />
              Polaris
            </a>
          </Link>

          <div className={styles.SearchWrapper}>
            <GlobalSearch />
          </div>

          <ul className={styles.HeaderNav}>
            {headerNavItems.map(({ url, label, icon }) => {
              const section = router.asPath.split("/").slice(0, 2).join("/");
              const isCurrent =
                section !== "/" && url.startsWith(section) ? "page" : false;
              return (
                <li key={url} aria-current={isCurrent}>
                  <Link href={url}>
                    <a>
                      <Image
                        src={icon}
                        width={24}
                        height={24}
                        layout="fixed"
                        alt=""
                      />
                      {label}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={styles.HeaderSub}>{renderNav && renderNav()}</div>
      </div>

      <div className={styles.Content}>
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
