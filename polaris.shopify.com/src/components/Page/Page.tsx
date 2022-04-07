import React from "react";
import Link from "next/link";
import Image from "next/image";
import polarisLogo from "../../../public/polaris-logo-white.svg";
import styles from "./Page.module.scss";

import { LineConfig } from "../../types";
import { useRouter } from "next/router";
import GlobalSearch from "../GlobalSearch";

interface Props {
  children: React.ReactNode;
}

const navItems: { url: string; label: string }[] = [
  { url: "/", label: "Home" },
  { url: "/docs", label: "Guidelines" },
  { url: "/components/layout", label: "Components" },
  { url: "/tokens/colors", label: "Tokens" },
  { url: "/icons", label: "Icons" },
];

function Page({ children }: Props) {
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

        <GlobalSearch />

        <ul className={styles.Nav}>
          {navItems.map(({ url, label }) => (
            <li key={url} aria-current={url === router.asPath ? "page" : false}>
              <Link href={url}>{label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.Content}>{children}</div>
    </div>
  );
}

export default Page;
