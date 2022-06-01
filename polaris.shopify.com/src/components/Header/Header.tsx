import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { className } from "../../utils/various";
import GlobalSearch from "../GlobalSearch";
import MaxPageWidthDiv from "../MaxPageWidthDiv";
import Button from "../Button";

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
    function handleResize() {
      if (window.innerWidth > 1024 && showMenu) {
        console.log("close menu");
        setShowMenu(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.Header}>
      <MaxPageWidthDiv className={styles.HeaderInner}>
        <div
          className={styles.HamburgerButton}
          onClick={() => setShowMenu(true)}
        >
          <Button onClick={() => setShowMenu(true)}>
            <Image
              src={hamburguerIcon}
              layout="fixed"
              width={24}
              height={24}
              alt="Hamburguer icon"
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

        <nav className={className(styles.Nav, showMenu && styles.show)}>
          <ul>
            {headerNavItems.map(({ url, label }) => {
              const isCurrent =
                currentSection && url.startsWith(currentSection)
                  ? "page"
                  : false;

              return (
                <li key={url}>
                  <Link href={url} passHref>
                    <a aria-current={isCurrent}>{label}</a>
                  </Link>
                </li>
              );
            })}
          </ul>

          {showMenu && (
            <button
              className={styles.CloseButton}
              onClick={() => setShowMenu(false)}
            >
              <CloseIcon />
            </button>
          )}
        </nav>

        <div className={styles.SearchWrapper}>
          <GlobalSearch />
        </div>

        {showMenu && (
          <div className={styles.Backdrop} onClick={() => setShowMenu(false)} />
        )}
      </MaxPageWidthDiv>
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
