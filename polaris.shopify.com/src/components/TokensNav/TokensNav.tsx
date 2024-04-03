import type {Theme} from '@shopify/polaris-tokens';

import styles from './TokensNav.module.scss';
import Link from 'next/link';
import {slugify} from '../../utils/various';

interface Props {
  selected?: keyof Theme;
}

export type NavItem = {
  title: string;
  url?: string;
};

const navItems: NavItem[] = [
  {
    title: 'Border',
    url: `/tokens/border`,
  },
  {
    title: 'Breakpoints',
    url: `/tokens/breakpoints`,
  },
  {
    title: 'Color',
    url: `/tokens/color`,
  },
  {
    title: 'Font',
    url: `/tokens/font`,
  },
  {
    title: 'Height',
    url: `/tokens/height`,
  },
  {
    title: 'Motion',
    url: `/tokens/motion`,
  },
  {
    title: 'Shadow',
    url: `/tokens/shadow`,
  },
  {
    title: 'Space',
    url: `/tokens/space`,
  },
  {
    title: 'Width',
    url: `/tokens/width`,
  },
  {
    title: 'Z-Index',
    url: `/tokens/z-index`,
  },
];

function TokensNav({selected}: Props) {
  return (
    <nav className={styles.TokensNav}>
      <ul>
        {navItems.map((item) => {
          if (!item.url) return null;
          const isCurrent = selected === slugify(item.title);
          return (
            <li key={item.title}>
              <Link
                href={item.url}
                aria-current={isCurrent ? 'page' : undefined}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default TokensNav;
