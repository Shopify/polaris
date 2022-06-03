import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import { Breakpoints } from "../../types";
import GlobalSearch from "../GlobalSearch";
import MaxPageWidthDiv from "../MaxPageWidthDiv";
import Button from "../Button";
import SideNav from "../SideNav";
import NavItems from "../NavItems";

import styles from "./Header.module.scss";
import shopifyLogo from "../../../public/shopify-logo.svg";
import hamburguerIcon from "../../../public/images/icon-hamburguer.svg";

interface Props {
  currentSection?: string;
}

function Header({ currentSection }: Props) {
  const [showMenu, setShowMenu] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

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

  const handleCloseMenu = () => {
    setShowMenu(false);
    menuButtonRef.current?.focus();
  };

  return (
    <div className={styles.Header}>
      <MaxPageWidthDiv className={styles.HeaderInner}>
        <nav className={styles.SideNavContainer}>
          <Button
            id="menu-button"
            aria-label="Open menu"
            aria-controls="side-menu"
            aria-expanded={showMenu}
            onClick={() => setShowMenu(true)}
            ref={menuButtonRef}
          >
            <Image
              src={hamburguerIcon}
              layout="fixed"
              width={24}
              height={24}
              alt=""
            />
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
