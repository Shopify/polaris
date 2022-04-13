import React from "react";
import Link from "next/link";
import Image from "next/image";
import polarisLogo from "../../../public/polaris-logo.svg";
import styles from "./Page.module.scss";
import { useRouter } from "next/router";
import GlobalSearch from "../GlobalSearch";
import Nav from "../Nav";
import { NavItem } from "../Nav/Nav";

interface Props {
  navItems?: NavItem[];
  sidebarLeft?: () => React.ReactNode;
  sidebarRight?: () => React.ReactNode;
  noLayout?: boolean;
  children: React.ReactNode;
}

const headerNavItems: { url: string; label: string }[] = [
  { url: "/docs/foundations/experience-values", label: "Guidelines" },
  { url: "/components/actions/account-connection", label: "Components" },
  { url: "/tokens/colors", label: "Tokens" },
  { url: "/icons", label: "Icons" },
];

function Page({
  navItems,
  sidebarLeft,
  sidebarRight,
  noLayout = false,
  children,
}: Props) {
  const router = useRouter();

  if (noLayout === true && navItems) {
    throw new Error(
      `Page component: noLayout must be 'false' when navItems are passed`
    );
  }

  return (
    <div
      className={[styles.Page, noLayout ? styles.noLayout : null].join(" ")}
      data-has-sidebar-left={!!sidebarLeft}
      data-has-sidebar-right={!!sidebarRight}
    >
      <div className={styles.Header}>
        <Link href="/">
          <a className={styles.Logo}>
            <Image src={polarisLogo} width={32} height={32} alt="" />
            Polaris
          </a>
        </Link>

        <ul className={styles.HeaderNav}>
          {headerNavItems.map(({ url, label }) => {
            const section = router.asPath.split("/").slice(0, 2).join("/");
            const isCurrent =
              section !== "/" && url.startsWith(section) ? "page" : false;
            return (
              <li key={url} aria-current={isCurrent}>
                <Link href={url}>{label}</Link>
              </li>
            );
          })}
        </ul>

        <div className={styles.SearchWrapper}>
          <GlobalSearch />
        </div>
      </div>

      {sidebarLeft && (
        <div className={[styles.Sidebar, styles.left].join(" ")}>
          {sidebarLeft()}
        </div>
      )}

      <div className={styles.Content}>
        {noLayout ? (
          <>{children}</>
        ) : (
          <>
            {navItems && <Nav navItems={navItems} />}
            <div className={styles.MainContent}>
              <div className={styles.MainContentInner}>{children}</div>
            </div>
          </>
        )}
      </div>

      {sidebarRight && (
        <div className={[styles.Sidebar, styles.right].join(" ")}>
          {sidebarRight()}
        </div>
      )}
    </div>
  );
}

export default Page;
