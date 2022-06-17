import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { foundationsNavItems, contributingNavItems } from "../../data/navItems";
import { className, getComponentNav } from "../../utils/various";
import { NavItem } from "../NavItems";

import shopifyLogo from "../../../public/shopify-logo.svg";
import styles from "./SideNav.module.scss";

const componentsNavItems = getComponentNav();

const navItems: NavItem[] = [
  {
    title: "Getting started",
    url: "/resources",
  },
  ...foundationsNavItems,
  {
    title: "Components",
    url: "/components",
    children: componentsNavItems[0].children,
  },
  {
    title: "Tokens",
    url: "/tokens/colors",
  },
  {
    title: "Icons",
    url: "/icons",
  },
  ...contributingNavItems,
];

interface Props {
  currentPath?: string;
  showMenu?: boolean;
  handleCloseMenu: () => void;
}

function SideNav({
  currentPath = "",
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
    <ul className={className(styles.SideNav, styles.show)} ref={menuRef}>
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

      {navItems.map((item, idx) => (
        <SideNavItem
          key={idx}
          item={item}
          currentPath={currentPath}
          handleCloseMenu={handleCloseMenu}
        />
      ))}
    </ul>
  );
}

interface SideNavProps {
  item: NavItem;
  currentPath: string;
  handleCloseMenu?: () => void;
}

function SideNavItem({ item, currentPath, handleCloseMenu }: SideNavProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <li className={styles.SideNavItem}>
      {item.children && (
        <>
          <button
            className={className(
              styles.AccordionHeader,
              isExpanded && styles.expanded
            )}
            onClick={() => setIsExpanded((prevState) => !prevState)}
          >
            {item.title} <ChevronRightIcon />
          </button>

          <ul
            className={className(
              styles.AccordionContent,
              isExpanded && styles.expanded
            )}
          >
            {item.children.map((child) => (
              <SideNavItem
                key={child.url}
                item={child}
                currentPath={currentPath}
                handleCloseMenu={handleCloseMenu}
              />
            ))}
          </ul>
        </>
      )}

      {!item.children && item.url && (
        <Link href={item.url} passHref>
          <a
            aria-current={item.url === currentPath ? "page" : "false"}
            onClick={handleCloseMenu}
          >
            {item.title}
          </a>
        </Link>
      )}
    </li>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 16a.999.999 0 0 1-.707-1.707l4.293-4.293-4.293-4.293a.999.999 0 1 1 1.414-1.414l5 5a.999.999 0 0 1 0 1.414l-5 5a.997.997 0 0 1-.707.293z" />
    </svg>
  );
}

export default SideNav;
