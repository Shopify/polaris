import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import useDarkMode from "use-dark-mode";

import GlobalSearch from "../GlobalSearch";
import Container from "../Container";
import MobileNav from "../MobileNav";
import NavItems from "../NavItems";

import styles from "./Header.module.scss";
import shopifyLogo from "../../../public/shopify-logo.svg";

interface Props {
  currentPath?: string;
}

function Header({ currentPath = "" }: Props) {
  const darkMode = useDarkMode(false);
  const [showSkipToContentLink, setShowSkipToContentLink] = useState(true);

  useEffect(() => {
    const mainContent = document.querySelector("#main");
    setShowSkipToContentLink(mainContent !== null);
  }, [currentPath]);

  const match = currentPath.match(/^\/\w+/);
  const currentSection = match ? match[0] : "";

  return (
    <div className={styles.Header}>
      <Container className={styles.HeaderInner}>
        <div className={styles.MobileNavContainer}>
          <MobileNav currentPath={currentPath} />
        </div>

        <Link href="/">
          <a className={styles.Logo}>
            <Image
              src={shopifyLogo}
              layout="fixed"
              width={24}
              height={24}
              alt="Shopify logo"
            />
            Polaris
          </a>
        </Link>

        {showSkipToContentLink && (
          <a className={styles.SkipToContentLink} href="#main">
            Skip to content
          </a>
        )}

        <nav className={styles.Nav}>
          <ul>
            <NavItems currentSection={currentSection} />
          </ul>
        </nav>

        <button className={styles.DarkModeToggle} onClick={darkMode.toggle}>
          {darkMode.value ? (
            <div className={styles.LightModeIcon}>💡</div>
          ) : (
            <div className={styles.DarkModeIcon}>🌙</div>
          )}
        </button>

        <div className={styles.SearchWrapper}>
          <GlobalSearch />
        </div>
      </Container>
    </div>
  );
}

export default Header;
