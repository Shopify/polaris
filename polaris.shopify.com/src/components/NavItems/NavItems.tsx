import Link from "next/link";

import { foundationsNavItems, contributingNavItems } from "../../data/navItems";

export type NavItem = {
  title: string;
  url?: string;
  children?: NavItem[];
};

const navItems: NavItem[] = [
  {
    title: "Getting started",
    url: "/resources",
  },
  ...foundationsNavItems,
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
  ...contributingNavItems,
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
