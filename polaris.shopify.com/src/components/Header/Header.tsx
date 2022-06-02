import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import GlobalSearch from "../GlobalSearch";
import MaxPageWidthDiv from "../MaxPageWidthDiv";
import Button from "../Button";
import SideMenu from "../SideMenu";

import shopifyLogo from "../../../public/shopify-logo.svg";
import hamburguerIcon from "../../../public/images/icon-hamburguer.svg";
import styles from "./Header.module.scss";

const headerNavItems: {
  label: string;
  url: string;
}[] = [
  {
    label: "Getting started",
    url: "/resources",
  },
  {
    label: "Guidelines",
    url: "/guidelines/foundations/experience-values",
  },
  {
    label: "Components",
    url: "/components",
  },
  {
    label: "Tokens",
    url: "/tokens/colors",
  },
  {
    label: "Icons",
    url: "/icons",
  },
];

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
        <div
          className={styles.HamburgerButton}
          onClick={() => setShowMenu(true)}
        >
          <Button
            id="menu-button"
            aria-label="Main menu button"
            aria-controls="side-menu"
            aria-haspopup="true"
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

        <NavItems currentSection={currentSection} />

        <div className={styles.SearchWrapper}>
          <GlobalSearch />
        </div>

        <SideMenu showMenu={showMenu} handleCloseMenu={handleCloseMenu}>
          <NavItems
            currentSection={currentSection}
            handleCloseMenu={handleCloseMenu}
          />
        </SideMenu>
      </MaxPageWidthDiv>
    </div>
  );
}

interface NavItemsProps {
  currentSection: Props["currentSection"];
  handleCloseMenu?: () => void;
}

function NavItems({ currentSection, handleCloseMenu }: NavItemsProps) {
  return (
    <nav aria-label="Main menu">
      <ul>
        {headerNavItems.map(({ url, label }) => {
          const isCurrent =
            currentSection && url.startsWith(currentSection) ? "page" : false;

          return (
            <li key={url}>
              <Link href={url} passHref>
                <a aria-current={isCurrent} onClick={handleCloseMenu}>
                  {label}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Header;
