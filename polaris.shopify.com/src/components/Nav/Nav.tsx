import Link from "next/link";
import { Status } from "../../types";
import { useRouter } from "next/router";

import styles from "./Nav.module.scss";
import StatusBadge from "../StatusBadge";

export type NavItem = {
  title: string;
  url?: string;
  status?: Status;
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
            {navItem.status && (
              <>
                {" "}
                <StatusBadge status={navItem.status} />
              </>
            )}
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
