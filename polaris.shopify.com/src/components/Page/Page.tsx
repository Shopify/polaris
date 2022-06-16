import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import Header from "../Header";

import shopifyLogo from "../../../public/shopify-logo.svg";
import styles from "./Page.module.scss";

interface Props {
  children: React.ReactNode;
}

function Page({ children }: Props) {
  const router = useRouter();

  const isPolaris = router.asPath.startsWith("/examples");

  return (
    <div style={{ background: isPolaris ? "#fafafa" : "unset" }}>
      {!isPolaris && <Header currentPath={router.asPath} />}

      {children}

      {!isPolaris && (
        <div className={styles.Footer}>
          <Image src={shopifyLogo} width={36} height={36} alt="Shopify logo" />
        </div>
      )}
    </div>
  );
}

export default Page;
