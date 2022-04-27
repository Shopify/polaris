import React from "react";
import Link from "next/link";
import Image from "next/image";
import shopifyLogo from "../../../public/shopify-logo.svg";
import styles from "./Page.module.scss";
import { useRouter } from "next/router";
import GlobalSearch from "../GlobalSearch";
import {
  FileTextIcon,
  GridIcon,
  LayersIcon,
  PackageIcon,
} from "./PageNavIcons";

interface Props {
  renderNav?: () => React.ReactNode;
  noLayout?: boolean;
  children: React.ReactNode;
}

const headerNavItems: {
  url: string;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    url: "/guidelines/foundations/experience-values",
    label: "Guidelines",
    icon: <FileTextIcon />,
  },
  { url: "/components", label: "Components", icon: <PackageIcon /> },
  {
    url: "/tokens/getting-started",
    label: "Tokens",
    icon: <LayersIcon />,
  },
  { url: "/icons", label: "Icons", icon: <GridIcon /> },
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
                <li key={url}>
                  <Link href={url}>
                    <a aria-current={isCurrent}>
                      {icon}
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
