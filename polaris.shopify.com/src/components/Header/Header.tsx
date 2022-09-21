import {useState, useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {DarkMode} from 'use-dark-mode';

import GlobalSearch from '../GlobalSearch';
import MobileNav from '../MobileNav';
// import type {NavItem} from '../Nav';
import navJSON from '../../../.cache/nav.json';

import styles from './Header.module.scss';
import {className} from '../../utils/various';

interface Nav {
  children?: {
    [key: string]: NavItem;
  };
}

interface NavItem {
  title?: string;
  description?: string;
  slug?: string;
  order?: number;
  expandable?: false;
  sectionBreakAfter?: true;
  skipInNav?: true;
  children?: Nav;
}

const nav = navJSON as Nav;

interface Props {
  darkMode: DarkMode;
  currentPath?: string;
}

function Header({darkMode, currentPath = ''}: Props) {
  const [showSkipToContentLink, setShowSkipToContentLink] = useState(true);

  useEffect(() => {
    const mainContent = document.querySelector('#main');
    setShowSkipToContentLink(mainContent !== null);
  }, [currentPath]);

  const match = currentPath.match(/^\/\w+/);

  return (
    <div className={styles.Header}>
      <div className={styles.MobileNavContainer}>
        <MobileNav currentPath={currentPath} />
      </div>

      <div className={styles.HeaderInner}>
        <Link href="/">
          <a className={styles.Logo}>
            <Image
              src="/images/shopify-logo.svg"
              layout="fixed"
              width={24}
              height={24}
              alt="Shopify logo"
            />
            Polaris
          </a>
        </Link>

        <GlobalSearch />

        {showSkipToContentLink && (
          <a className={styles.SkipToContentLink} href="#main">
            Skip to content
          </a>
        )}

        <nav className={styles.Nav}>
          <ul>
            <NavItem nav={nav} />
          </ul>
        </nav>

        <button className={styles.DarkModeToggle} onClick={darkMode.toggle}>
          {darkMode.value ? (
            <div className={styles.LightModeIcon}>💡</div>
          ) : (
            <div className={styles.DarkModeIcon}>🌙</div>
          )}
        </button>
      </div>
    </div>
  );
}

function NavItem({nav}: {nav: NavItem}) {
  const [expandedSections, setExpandedSections] = useState<{
    [slug: string]: boolean;
  }>({});

  const toggleChild = (slug: string) => {
    setExpandedSections({
      ...expandedSections,
      [slug]: expandedSections[slug] ? false : true,
    });
  };

  const openChild = (slug: string) => {
    setExpandedSections({...expandedSections, [slug]: true});
  };

  const isCurrent = false;

  return (
    <>
      {nav.children &&
        Object.entries(nav.children)
          .sort((_a, _b) => {
            const [, a] = _a as [string, NavItem];
            const [, b] = _b as [string, NavItem];
            return (a.order || 0) - (b.order || 0);
          })
          .map((entry) => {
            const [key, child] = entry as [string, NavItem];

            const isExpandable = child.children && child.expandable !== false;

            if (child.skipInNav) {
              return <NavItem nav={child} />;
            }

            return (
              <li
                key={child.slug}
                className={className(
                  child.sectionBreakAfter && styles.sectionBreakAfter,
                )}
              >
                <div className={styles.NavItem}>
                  {child.slug ? (
                    <Link href={child.slug} passHref>
                      <a
                        aria-current={isCurrent}
                        onClick={() => openChild(key)}
                      >
                        <span>{child.title}</span>
                      </a>
                    </Link>
                  ) : (
                    <span>{child.title || key}</span>
                  )}

                  {isExpandable && (
                    <button onClick={() => toggleChild(key)}>
                      {!!expandedSections[key] ? '—' : '+'}
                    </button>
                  )}
                </div>

                {isExpandable && (
                  <ul
                    style={{
                      display: !!expandedSections[key] ? 'block' : 'none',
                    }}
                  >
                    <NavItem nav={child} />
                  </ul>
                )}
              </li>
            );
          })}
    </>
  );
}

export default Header;
