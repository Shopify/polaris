import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import Header from "../Header";
import { className } from "../../utils/various";

import shopifyLogo from "../../../public/shopify-logo.svg";
import styles from "./Page.module.scss";

interface Props {
  skipHeaderAndFooter?: boolean;
  children: React.ReactNode;
}

function Page({ skipHeaderAndFooter = false, children }: Props) {
  const router = useRouter();

  const match = router.asPath.match(/^\/\w+/);
  const currentSection = match ? match[0] : "";

  return (
    <div className={className(styles.Page)}>
      {!skipHeaderAndFooter && <Header currentSection={currentSection} />}

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
