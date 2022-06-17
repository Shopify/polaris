import { useState, useEffect, useRef } from "react";

import { className } from "../../utils/various";
import { Breakpoints } from "../../types";
import Button from "../Button";
import SideNav from "../SideNav";

import styles from "./MobileNav.module.scss";

interface Props {
  currentPath: string;
}

function MobileNav({ currentPath }: Props) {
  const [showMenu, setShowMenu] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuNavRef = useRef<HTMLElement>(null);

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

  const handleCloseMenu = () => {
    setShowMenu(false);
    menuButtonRef.current?.focus();
  };

  return (
    <>
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
        ref={menuNavRef}
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
              // TODO: create a direct ref to the Logo
              const polarisLogoLink =
                menuNavRef.current?.firstElementChild?.children[0]
                  .firstElementChild;

              polarisLogoLink instanceof HTMLElement && polarisLogoLink.focus();
            }
          }}
        >
          <CloseIcon />
        </button>
      </nav>

      {showMenu && (
        <div className={styles.Backdrop} onClick={handleCloseMenu} />
      )}
    </>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="m11.414 10 6.293-6.293a1 1 0 1 0-1.414-1.414l-6.293 6.293-6.293-6.293a1 1 0 0 0-1.414 1.414l6.293 6.293-6.293 6.293a1 1 0 1 0 1.414 1.414l6.293-6.293 6.293 6.293a.998.998 0 0 0 1.707-.707.999.999 0 0 0-.293-.707l-6.293-6.293z" />
    </svg>
  );
}

export default MobileNav;
