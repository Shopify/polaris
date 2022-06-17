import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import useDarkMode from "use-dark-mode";

import { className } from "../../utils/various";
import { Breakpoints } from "../../types";
import GlobalSearch from "../GlobalSearch";
import Container from "../Container";
import Button from "../Button";
import SideNav from "../SideNav";
import NavItems from "../NavItems";

import styles from "./Header.module.scss";
import shopifyLogo from "../../../public/shopify-logo.svg";

interface Props {
  currentPath?: string;
}

function Header({ currentPath = "" }: Props) {
  const darkMode = useDarkMode(false);
  const [showSkipToContentLink, setShowSkipToContentLink] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function hideSideNavOnResize() {
      if (window.innerWidth > Breakpoints.Desktop && showMenu) {
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
  }, [currentPath]);

  const handleCloseMenu = () => {
    setShowMenu(false);
    menuButtonRef.current?.focus();
  };

  const match = currentPath.match(/^\/\w+/);
  const currentSection = match ? match[0] : "";

  return (
    <div className={styles.Header}>
      <Container className={styles.HeaderInner}>
        <div className={styles.SideNavContainer}>
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

          <nav
            id="side-menu"
            className={className(styles.MobileNav, showMenu && styles.show)}
          >
            <SideNav
              currentPath={currentPath}
              showMenu={showMenu}
              handleCloseMenu={handleCloseMenu}
            />

            <button
              aria-label="Close menu"
              className={styles.CloseButton}
              onClick={handleCloseMenu}
              onKeyDown={(e) => {
                if (e.key === "Tab" && !e.shiftKey) {
                  e.preventDefault();
                  // const firstLink = menuRef.current?.firstElementChild?.children[0];
                  // firstLink instanceof HTMLElement && firstLink.focus();
                  console.log("go back to first link");
                }
              }}
            >
              <CloseIcon />
            </button>
          </nav>

          {showMenu && (
            <div className={styles.Backdrop} onClick={handleCloseMenu} />
          )}
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

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="m11.414 10 6.293-6.293a1 1 0 1 0-1.414-1.414l-6.293 6.293-6.293-6.293a1 1 0 0 0-1.414 1.414l6.293 6.293-6.293 6.293a1 1 0 1 0 1.414 1.414l6.293-6.293 6.293 6.293a.998.998 0 0 0 1.707-.707.999.999 0 0 0-.293-.707l-6.293-6.293z" />
    </svg>
  );
}

export default Header;
