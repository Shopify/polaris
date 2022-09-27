import {useState, useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {DarkMode} from 'use-dark-mode';
import {motion, AnimatePresence} from 'framer-motion';

import GlobalSearch from '../GlobalSearch';
import MobileNav from '../MobileNav';
import navJSON from '../../../.cache/nav.json';
import {NavJSON, NavItem} from '../../types';

import styles from './Header.module.scss';
import {className} from '../../utils/various';
import * as polarisIcons from '@shopify/polaris-icons';
import {useRouter} from 'next/router';

interface Props {
  darkMode: DarkMode;
  currentPath?: string;
  children: React.ReactNode;
}

const nav = navJSON as NavJSON;

function Header({darkMode, currentPath = '', children}: Props) {
  const [showSkipToContentLink, setShowSkipToContentLink] = useState(true);

  useEffect(() => {
    const mainContent = document.querySelector('#main');
    setShowSkipToContentLink(mainContent !== null);
  }, [currentPath]);

  return (
    <div>
      <div className={className(styles.ActualHeader, 'dark-modes')}>
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
      </div>

      <div className={styles.NavAndContent}>
        <div className={className(styles.Header, '')}>
          <div className={styles.MobileNavContainer}>
            {/* <MobileNav currentPath={currentPath} /> */}
          </div>

          {showSkipToContentLink && (
            <a className={styles.SkipToContentLink} href="#main">
              Skip to content
            </a>
          )}

          <nav className={styles.Nav}>
            <ul>
              <NavItem nav={nav} level={0} />
            </ul>
          </nav>
        </div>
        <div className={styles.PageContent}>{children}</div>
      </div>
    </div>
  );
}

function NavItem({nav, level}: {nav: NavItem; level: number}) {
  const [expandedSections, setExpandedSections] = useState<{
    [slug: string]: boolean;
  }>({});

  const {asPath} = useRouter();

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

            if (!child.slug) return null;

            const isExpandable = child.children && !child.hideChildren;
            const isExpanded = !!expandedSections[key];
            const id = (child.slug || key).replace(/\//g, '');
            const navAriaId = `nav-${id}`;

            const removeParams = (path: string) => path.replace(/\?.+$/gi, '');
            const isCurrent = removeParams(asPath) === child.slug;

            return (
              <li
                key={child.slug}
                className={className(child.newSection && styles.newSection)}
              >
                <span
                  className={className(
                    styles.NavItem,
                    isCurrent && styles.isCurrent,
                  )}
                >
                  <Link href={child.slug} passHref>
                    <a
                      onClick={() => openChild(key, true)}
                      aria-current={isCurrent ? 'page' : 'false'}
                    >
                      {child.title}
                    </a>
                  </Link>

                  {isExpandable && (
                    <button
                      onClick={() => toggleChild(key)}
                      aria-label="Toggle section"
                      aria-expanded={isExpanded}
                      aria-controls={isExpanded ? navAriaId : undefined}
                    ></button>
                  )}
                </span>

                <AnimatePresence initial={false}>
                  {isExpandable && isExpanded && (
                    <motion.ul
                      initial={{opacity: 0, height: 0}}
                      animate={{opacity: 1, scale: 1, height: 'auto'}}
                      exit={{opacity: 0, height: 0}}
                      transition={{
                        ease: 'easeInOut',
                        duration: 0.15,
                      }}
                      id={navAriaId}
                    >
                      <NavItem nav={child} level={level + 1} />
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
