import {useState, useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {DarkMode} from 'use-dark-mode';

import GlobalSearch from '../GlobalSearch';
import Container from '../Container';
import MobileNav from '../MobileNav';
import type {NavItem} from '../Nav';

import navJson from '../../../.cache/nav.json';

const headerNavItems: NavItem[] = navJson;

import styles from './Header.module.scss';

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
  const currentSection = match ? match[0] : '';

  return (
    <div className={styles.Header}>
      <Container className={styles.HeaderInner}>
        <div className={styles.MobileNavContainer}>
          <MobileNav currentPath={currentPath} />
        </div>

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

        {showSkipToContentLink && (
          <a className={styles.SkipToContentLink} href="#main">
            Skip to content
          </a>
        )}

        <nav className={styles.Nav}>
          <ul>
            {headerNavItems.map(({slug, title}) => {
              const isCurrent =
                currentSection && slug?.startsWith(currentSection)
                  ? 'page'
                  : false;

              return slug ? (
                <li key={slug}>
                  <Link href={slug} passHref>
                    <a aria-current={isCurrent}>
                      <span>{title}</span>
                    </a>
                  </Link>
                </li>
              ) : null;
            })}
          </ul>
        </nav>

        <button className={styles.DarkModeToggle} onClick={darkMode.toggle}>
          {darkMode.value ? (
            <div className={styles.LightModeIcon}>💡</div>
          ) : (
            <div className={styles.DarkModeIcon}>🌙</div>
          )}
        </button>

        <GlobalSearch />
      </Container>
    </div>
  );
}

export default Header;
