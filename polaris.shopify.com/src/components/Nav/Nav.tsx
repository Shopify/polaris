import Link from "next/link";
import styles from "./Nav.module.scss";

export type NavItem = {
  title?: string;
  url?: string;
  children?: NavItem[];
};

interface Props {
  navItems: NavItem[];
}

function Nav({ navItems }: Props) {
  return (
    <div className={styles.Nav}>
      <ul>
        {navItems.map((navItem) => (
          <NavItem key={`${navItem.url}-${navItem.title}`} navItem={navItem} />
        ))}
      </ul>
    </div>
  );
}

function NavItem({ navItem }: { navItem: NavItem }) {
  return (
    <li className={styles.NavItem}>
      {navItem.url ? (
        <Link href={navItem.url}>{navItem.title}</Link>
      ) : (
        <span>{navItem.title}</span>
      )}
      {navItem.children && (
        <ul>
          {navItem.children.map((child) => (
            <NavItem key={`${child.url}-${child.title}`} navItem={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default Nav;
