import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { className } from "../../utils/various";
import NavItems from "../NavItems";

import shopifyLogo from "../../../public/shopify-logo.svg";
import styles from "./SideNav.module.scss";

interface Props {
  currentSection?: string;
  showMenu?: boolean;
  handleCloseMenu: () => void;
}

function SideNav({
  currentSection = "",
  showMenu = false,
  handleCloseMenu,
}: Props) {
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleOnKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseMenu();
      }
    };

    if (showMenu) {
      document.addEventListener("keydown", handleOnKeyDown);
    }

    const firstLink = menuRef.current?.querySelector("a");

    if (showMenu && firstLink instanceof HTMLElement) {
      firstLink.focus();
    }

    return () => document.removeEventListener("keydown", handleOnKeyDown);
  }, [showMenu, handleCloseMenu]);

  return (
    <ul
      id="side-menu"
      className={className(styles.SideNav, showMenu && styles.show)}
      ref={menuRef}
    >
      <li>
        <Link href="/" passHref>
          <a
            className={styles.Logo}
            onClick={handleCloseMenu}
            onKeyDown={(e) => {
              if (e.key === "Tab" && e.shiftKey) {
                e.preventDefault();
                const lastLink = menuRef.current?.lastElementChild?.children[0];
                lastLink instanceof HTMLElement && lastLink.focus();
              }
            }}
          >
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
      </li>

      <NavItems
        currentSection={currentSection}
        handleCloseMenu={handleCloseMenu}
      />

      <li>
        <button
          aria-label="Close menu"
          className={styles.CloseButton}
          onClick={handleCloseMenu}
          onKeyDown={(e) => {
            if (e.key === "Tab" && !e.shiftKey) {
              e.preventDefault();
              const firstLink = menuRef.current?.firstElementChild?.children[0];
              firstLink instanceof HTMLElement && firstLink.focus();
            }
          }}
        >
          <CloseIcon />
        </button>
      </li>
    </ul>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="m11.414 10 6.293-6.293a1 1 0 1 0-1.414-1.414l-6.293 6.293-6.293-6.293a1 1 0 0 0-1.414 1.414l6.293 6.293-6.293 6.293a1 1 0 1 0 1.414 1.414l6.293-6.293 6.293 6.293a.998.998 0 0 0 1.707-.707.999.999 0 0 0-.293-.707l-6.293-6.293z" />
    </svg>
  );
}

export default SideNav;
