import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import GlobalSearch from "../GlobalSearch";
import MaxPageWidthDiv from "../MaxPageWidthDiv";
import Button from "../Button";
import SideMenu from "../SideMenu";
import NavItems from "../NavItems";

import shopifyLogo from "../../../public/shopify-logo.svg";
import hamburguerIcon from "../../../public/images/icon-hamburguer.svg";
import styles from "./Header.module.scss";

interface Props {
  currentSection?: string;
}

function Header({ currentSection }: Props) {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    // it ensures that the menu is closed after the screen is resized
    function handleResize() {
      if (window.innerWidth > 768 && showMenu) {
        setShowMenu(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseMenu = () => {
    setShowMenu(false);
    // it focus back to the menu button after the user closes the menu
    document.getElementById("menu-button")?.focus();
  };

  return (
    <div className={styles.Header}>
      <MaxPageWidthDiv className={styles.HeaderInner}>
        <nav className={styles.HamburgerButton}>
          <Button
            id="menu-button"
            aria-label="Open menu"
            aria-controls="side-menu"
            aria-expanded={showMenu}
            onClick={() => setShowMenu(true)}
          >
            <Image
              src={hamburguerIcon}
              layout="fixed"
              width={24}
              height={24}
              alt="Hamburger icon"
            />
          </Button>

          <SideMenu
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

        <nav className={styles.Nav}>
          <ul>
            <NavItems currentSection={currentSection} />
          </ul>
        </nav>

        <div className={styles.SearchWrapper}>
          <GlobalSearch />
        </div>

        {showMenu && (
          <div className={styles.Backdrop} onClick={handleCloseMenu} />
        )}
      </MaxPageWidthDiv>
    </div>
  );
}

export default Header;
