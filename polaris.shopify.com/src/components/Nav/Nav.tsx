import Link from 'next/link';

import {useRouter} from 'next/router';
import type {NavItem} from '../../types';

import styles from './Nav.module.scss';
import StatusBadge from '../StatusBadge';

interface Props {
  navItems: NavItem[];
}

function Nav({navItems}: Props) {
  const router = useRouter();
  const currentPath = router.asPath;

  return (
    <div className={styles.Nav}>
      <ul>
        {navItems.map((navItem) => (
          <NavListItem
            key={`${navItem.slug}-${navItem.title}`}
            navItem={navItem}
            currentPath={currentPath}
          />
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
      {navItem.slug ? (
        <Link href={navItem.slug} passHref>
          <a aria-current={navItem.slug === currentPath ? 'page' : 'false'}>
            {navItem.title}
            {navItem.status && (
              <>
                {' '}
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
              key={`${child.slug}-${child.title}`}
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
