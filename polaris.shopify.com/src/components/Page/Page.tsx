import React from "react";
import Link from "next/link";
import Image from "next/image";
import polarisLogo from "../../../public/polaris-logo.svg";
import styles from "./Page.module.scss";
import { useRouter } from "next/router";
import GlobalSearch from "../GlobalSearch";

interface Props {
  nav?: () => React.ReactNode;
  sidebarLeft?: () => React.ReactNode;
  sidebarRight?: () => React.ReactNode;
  children: React.ReactNode;
}

const navItems: { url: string; label: string }[] = [
  { url: "/docs/foundations/experience-values", label: "Guidelines" },
  { url: "/components/actions/account-connection", label: "Components" },
  { url: "/tokens/colors", label: "Tokens" },
  { url: "/icons", label: "Icons" },
];

function Page({ nav, sidebarLeft, sidebarRight, children }: Props) {
  const router = useRouter();

  return (
    <div className={styles.Page}>
      <div className={styles.Header}>
        <Link href="/">
          <a className={styles.Logo}>
            <Image src={polarisLogo} width={32} height={32} alt="" />
            Polaris
          </a>
        </Link>

        <ul className={styles.Nav}>
          {navItems.map(({ url, label }) => {
            const section = router.asPath.split("/").slice(0, 2).join("/");
            const isCurrent = url.startsWith(section) ? "page" : false;
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

      <div className={styles.Content}>
        {sidebarLeft && (
          <div className={[styles.Sidebar, styles.left].join(" ")}>
            {sidebarLeft()}
          </div>
        )}

        {nav && <div className={[styles.Nav].join(" ")}>{nav()}</div>}

        <div className={styles.MainContent}>
          <div className={styles.MainContentInner}>{children}</div>
        </div>

        {sidebarRight && (
          <div className={[styles.Sidebar, styles.right].join(" ")}>
            {sidebarRight()}
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
