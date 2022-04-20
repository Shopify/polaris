import React from "react";
import Link from "next/link";
import Image from "next/image";
import polarisLogo from "../../../public/polaris-logo.svg";
import styles from "./Page.module.scss";
import { useRouter } from "next/router";
import GlobalSearch from "../GlobalSearch";

interface Props {
  renderNav?: () => React.ReactNode;
  noLayout?: boolean;
  children: React.ReactNode;
}

const headerNavItems: { url: string; label: string }[] = [
  { url: "/docs/foundations/experience-values", label: "Guidelines" },
  { url: "/components", label: "Components" },
  { url: "/tokens/getting-started", label: "Tokens" },
  { url: "/icons", label: "Icons" },
];

function Page({ renderNav, noLayout = false, children }: Props) {
  const router = useRouter();

  return (
    <div className={[styles.Page, noLayout ? styles.noLayout : null].join(" ")}>
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

      {noLayout ? (
        <>{children}</>
      ) : (
        <div className={styles.Content}>
          {renderNav && renderNav()}

          <div className={styles.MainContent}>
            <div className={styles.MainContentInner}>{children}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
