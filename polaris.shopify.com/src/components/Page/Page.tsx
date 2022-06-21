import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import useDarkMode from "use-dark-mode";

import Header from "../Header";

import shopifyLogo from "../../../public/shopify-logo.svg";
import styles from "./Page.module.scss";
import SiteLaunchBanner from "../SiteLaunchBanner";
import ThemeProvider from "../ThemeProvider";

interface Props {
  children: React.ReactNode;
}

function Page({ children }: Props) {
  const router = useRouter();
  const darkMode = useDarkMode(false);

  const isPolaris = router.asPath.startsWith("/examples");
  const match = router.asPath.match(/^\/\w+/);
  const currentSection = match ? match[0] : "";

  const childElements = (
    <div style={{ background: isPolaris ? "#fafafa" : "unset" }}>
      {!isPolaris && (
        <Header currentSection={currentSection} darkMode={darkMode} />
      )}

      {children}

      {!isPolaris && (
        <div className={styles.Footer}>
          <Image src={shopifyLogo} width={36} height={36} alt="Shopify logo" />
          <SiteLaunchBanner />
        </div>
      )}
    </div>
  );

  return isPolaris ? (
    <>{childElements}</>
  ) : (
    <ThemeProvider theme={darkMode.value ? "dark" : "light"} useBody>
      {childElements}
    </ThemeProvider>
  );
}

export default Page;
