import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import useDarkMode from "use-dark-mode";

import Header from "../Header";

import styles from "./Page.module.scss";
import SiteLaunchBanner from "../SiteLaunchBanner";

interface Props {
  children: React.ReactNode;
}

function Page({ children }: Props) {
  const router = useRouter();
  const darkMode = useDarkMode(false);

  const isPolaris = router.asPath.startsWith("/examples");

  return (
    <div style={{ background: isPolaris ? "#fafafa" : "unset" }}>
      {!isPolaris && <Header currentPath={router.asPath} darkMode={darkMode} />}

      {children}

      {!isPolaris && (
        <div className={styles.Footer}>
          <Image
            src="/shopify-logo.svg"
            width={36}
            height={36}
            alt="Shopify logo"
          />
          <SiteLaunchBanner />
        </div>
      )}
    </div>
  );
}

export default Page;
