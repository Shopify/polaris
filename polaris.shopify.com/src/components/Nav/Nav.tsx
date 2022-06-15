import Link from "next/link";
import { useRouter } from "next/router";

import type { NavItem } from "../NavItems";

import styles from "./Nav.module.scss";

interface Props {
  navItems: NavItem[];
}

function Nav({ navItems }: Props) {
  const router = useRouter();
  const currentPath = router.asPath;
  return (
    <div className={styles.Nav}>
      <ul>
        {navItems.map((navItem) => (
          <li key={navItem.title}>
            <span>{navItem.title}</span>
            {navItem.children && (
              <ul>
                {navItem.children.map((child) => (
                  <NavItem
                    key={`${child.url}-${child.title}`}
                    navItem={child}
                    currentPath={currentPath}
                  />
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function NavItem({
  navItem,
  currentPath,
}: {
  navItem: NavItem;
  currentPath: string;
}) {
  return (
    <li className={styles.NavItem}>
      {navItem.url ? (
        <Link href={navItem.url} passHref>
          <a aria-current={navItem.url === currentPath ? "page" : "false"}>
            {navItem.title}
          </a>
        </Link>
      ) : (
        <span>{navItem.title}</span>
      )}

      {navItem.children && (
        <ul>
          {navItem.children.map((child) => (
            <NavItem
              key={`${child.url}-${child.title}`}
              navItem={child}
              currentPath={currentPath}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default Nav;
