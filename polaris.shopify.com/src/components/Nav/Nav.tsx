import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./Nav.module.scss";

export type NavItem = {
  title: string;
  url?: string;
  children?: NavItem[];
};

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
                  <NavListItem
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

function NavListItem({
  navItem,
  currentPath,
}: {
  navItem: NavItem;
  currentPath: string;
}) {
  return (
    <li>
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
            <NavListItem
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
