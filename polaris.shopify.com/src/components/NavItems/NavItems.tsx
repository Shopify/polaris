import Link from "next/link";

import { foundationsNavItems, contributingNavItems } from "../../data/navItems";
import type { NavItem } from "../Nav";

const navItems: NavItem[] = [
  {
    title: "Getting started",
    url: "/resources",
  },
  {
    title: "Foundations",
    url: "/foundations",
    children: foundationsNavItems,
  },
  {
    title: "Components",
    url: "/components",
  },
  {
    title: "Tokens",
    url: "/tokens/colors",
  },
  {
    title: "Icons",
    url: "/icons",
  },
  {
    title: "Contributing",
    url: "/contributing",
  },
];

interface Props {
  currentSection?: string;
  handleCloseMenu?: () => void;
}

function NavItems({ currentSection, handleCloseMenu }: Props) {
  return (
    <>
      {navItems.map(({ url, title }) => {
        const isCurrent =
          currentSection && url?.startsWith(currentSection) ? "page" : false;

        return url ? (
          <li key={url}>
            <Link href={url} passHref>
              <a aria-current={isCurrent} onClick={handleCloseMenu}>
                <span>{title}</span>
              </a>
            </Link>
          </li>
        ) : null;
      })}
    </>
  );
}

export default NavItems;
