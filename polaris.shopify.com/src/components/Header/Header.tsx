import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import useDarkMode from "use-dark-mode";

import { Breakpoints } from "../../types";
import GlobalSearch from "../GlobalSearch";
import Container from "../Container";
import Button from "../Button";
import SideNav from "../SideNav";
import NavItems from "../NavItems";

import styles from "./Header.module.scss";
import shopifyLogo from "../../../public/shopify-logo.svg";
import { useRouter } from "next/router";

interface Props {
  currentSection?: string;
}

function Header({ currentSection }: Props) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const darkMode = useDarkMode(false);
  const [showSkipToContentLink, setShowSkipToContentLink] = useState(true);

  useEffect(() => {
    function hideSideNavOnResize() {
      if (window.innerWidth > Breakpoints.SMALL && showMenu) {
        setShowMenu(false);
      }
    }

    window.addEventListener("resize", hideSideNavOnResize);

    return () => window.removeEventListener("resize", hideSideNavOnResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const mainContent = document.querySelector("#main");
    setShowSkipToContentLink(mainContent !== null);
  }, [router.asPath]);

  const handleCloseMenu = () => {
    setShowMenu(false);
    menuButtonRef.current?.focus();
  };

  return (
    <div className={styles.Header}>
      <Container className={styles.HeaderInner}>
        <nav className={styles.SideNavContainer}>
          <Button
            id="menu-button"
            aria-label="Open menu"
            aria-controls="side-menu"
            aria-expanded={showMenu}
            onClick={() => setShowMenu(true)}
            ref={menuButtonRef}
          >
            <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 11h-18a1 1 0 0 1 0-2h18a1 1 0 1 1 0 2zm0-7h-18a1 1 0 0 1 0-2h18a1 1 0 1 1 0 2zm0 14h-18a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2z" />
            </svg>
          </Button>

          <SideNav
            currentSection={currentSection}
            showMenu={showMenu}
            handleCloseMenu={handleCloseMenu}
          />
        </nav>

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

        {showMenu && (
          <div className={styles.Backdrop} onClick={handleCloseMenu} />
        )}
      </Container>
    </div>
  );
}

export default Header;
