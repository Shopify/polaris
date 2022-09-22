import {useState, useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {DarkMode} from 'use-dark-mode';
import {motion, AnimatePresence} from 'framer-motion';

import GlobalSearch from '../GlobalSearch';
import MobileNav from '../MobileNav';
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
  hideChildren?: false;
  newSection?: true;
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

  return (
    <div className={styles.Header}>
      <div className={styles.MobileNavContainer}>
        {/* <MobileNav currentPath={currentPath} /> */}
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

      <button className={styles.DarkModeToggle} onClick={darkMode.toggle}>
        {darkMode.value ? (
          <div className={styles.LightModeIcon}>💡</div>
        ) : (
          <div className={styles.DarkModeIcon}>🌙</div>
        )}
      </button>

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

  const openChild = (slug: string, closeOthers?: boolean) => {
    if (closeOthers) {
      setExpandedSections({[slug]: true});
    } else {
      setExpandedSections({...expandedSections, [slug]: true});
    }
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

            const isExpandable = child.children && !child.hideChildren;

            return (
              <li
                key={child.slug}
                className={className(child.newSection && styles.newSection)}
              >
                <div className={styles.NavItem}>
                  {child.slug ? (
                    <Link href={child.slug} passHref>
                      <a
                        aria-current={isCurrent}
                        onClick={() => openChild(key, true)}
                      >
                        <span>{child.title}</span>
                      </a>
                    </Link>
                  ) : (
                    <button
                      onClick={() => openChild(key)}
                      aria-label="Toggle section"
                    >
                      {child.title || key}
                    </button>
                  )}

                  {isExpandable && (
                    <button onClick={() => toggleChild(key)}>
                      {!!expandedSections[key] ? '—' : '+'}
                    </button>
                  )}
                </div>

                <AnimatePresence initial={false}>
                  {isExpandable && !!expandedSections[key] && (
                    <motion.ul
                      initial={{opacity: 0, height: 0}}
                      animate={{opacity: 1, scale: 1, height: 'auto'}}
                      exit={{opacity: 0, height: 0}}
                      transition={{
                        ease: 'easeInOut',
                        duration: 0.2,
                      }}
                    >
                      <NavItem nav={child} />
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
    </>
  );
}

export default Header;
