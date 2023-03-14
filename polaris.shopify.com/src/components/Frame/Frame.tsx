import {useState, useEffect, useRef} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {DarkMode} from 'use-dark-mode';

import GlobalSearch from '../GlobalSearch';
import {nav} from '../../nav';
import {Breakpoints} from '../../types';

import styles from './Frame.module.scss';
import {className} from '../../utils/various';
import {useRouter} from 'next/router';
import StatusBadge from '../StatusBadge';

const NAV_ID = 'nav';

interface Props {
  darkMode: DarkMode;
  children: React.ReactNode;
}

function Frame({darkMode, children}: Props) {
  const [showSkipToContentLink, setShowSkipToContentLink] = useState(true);
  const [navIsVisible, setNavIsVisible] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const {asPath} = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    const mainContent = document.querySelector('#main');
    setShowSkipToContentLink(mainContent !== null);
  }, [asPath]);

  useEffect(() => {
    function hideSideNavOnResize() {
      if (window.innerWidth > Breakpoints.Desktop && navIsVisible) {
        setNavIsVisible(false);
      }
    }

    window.addEventListener('resize', hideSideNavOnResize);

    return () => window.removeEventListener('resize', hideSideNavOnResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleOnKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setNavIsVisible(false);
      }
    };

    if (navIsVisible) {
      document.addEventListener('keydown', handleOnKeyDown);
      focusFirstItemInNav();
    }

    return () => document.removeEventListener('keydown', handleOnKeyDown);
  }, [navIsVisible]);

  const focusFirstItemInNav = () => {
    const selector = `#${NAV_ID} a`;
    const firstLinkInNav: HTMLLinkElement | null =
      document.querySelector(selector);
    firstLinkInNav && firstLinkInNav.focus();
  };

  const handleCloseMenu = () => {
    setNavIsVisible(false);
    menuButtonRef.current?.focus();
  };

  const handleShiftTabPress = (evt: React.KeyboardEvent) => {
    if (evt.key === 'Tab' && evt.shiftKey) {
      evt.preventDefault();
      const closeButton = closeButtonRef.current;
      closeButton instanceof HTMLElement && closeButton.focus();
    }
  };

  const handleCloseButtonKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      focusFirstItemInNav();
    }
  };

  return (
    <>
      <div className={styles.Header}>
        {showSkipToContentLink && (
          <a className={styles.SkipToContentLink} href="#main">
            Skip to content
          </a>
        )}

        <button
          id="menu-button"
          aria-label="Open menu"
          aria-controls={NAV_ID}
          aria-expanded={navIsVisible}
          onClick={() => setNavIsVisible(true)}
          ref={menuButtonRef}
          className={styles.NavToggle}
        >
          <NavToggleIcon />
        </button>

        <Link href="/" className={styles.Logo}>
          <Image
            alt="Shopify logo"
            src="/images/shopify-logo.svg"
            width={24}
            height={24}
          />
          Polaris
        </Link>

        {isMounted && (
          <button className={styles.DarkModeToggle} onClick={darkMode.toggle}>
            {darkMode.value ? (
              <span className={styles.LightModeIcon}>💡</span>
            ) : (
              <span className={styles.DarkModeIcon}>🌙</span>
            )}
          </button>
        )}

        <GlobalSearch />
      </div>

      <div className={styles.NavAndContent}>
        <nav
          className={className(styles.Nav, navIsVisible && styles.isVisible)}
          id={NAV_ID}
        >
          <ul>
            {nav
              .filter((page) => page.parentId === null)
              .sort((a, b) => a.order - b.order)
              .map((item) => (
                <NavItem
                  key={item.id}
                  id={item.id}
                  level={0}
                  handleLinkClick={() => setNavIsVisible(false)}
                  handleShiftTabOnFirstLink={handleShiftTabPress}
                />
              ))}
          </ul>
          <button
            ref={closeButtonRef}
            aria-label="Close menu"
            className={styles.CloseButton}
            onClick={handleCloseMenu}
            onKeyDown={handleCloseButtonKeyDown}
          >
            <CloseIcon />
          </button>
        </nav>
        <div className={styles.PageContent}>{children}</div>
      </div>
    </>
  );
}

function NavItem({
  id,
  level,
  handleLinkClick,
  handleShiftTabOnFirstLink,
}: {
  id: string;
  level: number;
  handleLinkClick: () => void;
  handleShiftTabOnFirstLink: (e: React.KeyboardEvent) => void;
}) {
  const [isManuallyToggled, setIsManuallyToggled] = useState<boolean | null>(
    null,
  );
  const {asPath} = useRouter();

  const item = nav.find((item) => item.id === id);
  if (!item) return null;
  const {pageMeta} = item;

  const children = nav.filter((child) => child.parentId === id);

  const childrenAriaId = `nav-${id}`;
  const isExpandable = children.length > 0;
  let isExpanded = false;
  if (isExpandable) {
    if (isManuallyToggled === null) {
      isExpanded = nav.some(
        (thisItem) =>
          thisItem.url.startsWith(item.url) && `/${thisItem.url}` === asPath,
      );
    } else {
      isExpanded = isManuallyToggled;
    }
  }

  const isCurrent = false;

  const statusBadgeMarkup =
    pageMeta?.type === 'components' && pageMeta.lifeCyclePhase !== 'Stable' ? (
      <StatusBadge status={pageMeta.lifeCyclePhase} />
    ) : null;

  return (
    <li
      key={item.id}
      className={className(item.hasSeparatorInNav && styles.newSection)}
    >
      <span
        className={className(styles.NavItem, isCurrent && styles.isCurrent)}
      >
        <Link
          href={`/${item.url}`}
          onClick={handleLinkClick}
          aria-current={isCurrent ? 'page' : 'false'}
          // TODO
          // onKeyDown={(evt) => {
          //   if (level === 0 && i === 0) {
          //     handleShiftTabOnFirstLink(evt);
          //   }
          // }}
        >
          {item.title}

          {statusBadgeMarkup}
        </Link>

        {isExpandable && (
          <button
            className={styles.Toggle}
            onClick={() =>
              setIsManuallyToggled(
                isManuallyToggled ? !isManuallyToggled : true,
              )
            }
            aria-label="Toggle section"
            aria-expanded={isExpanded}
            aria-controls={isExpanded ? childrenAriaId : undefined}
          />
        )}
      </span>

      {children && isExpanded && (
        <ul id={childrenAriaId}>
          {children
            .sort((a, b) => a.order - b.order)
            .map((child) => {
              return (
                <NavItem
                  key={child.id}
                  id={child.id}
                  level={level + 1}
                  handleLinkClick={handleLinkClick}
                  handleShiftTabOnFirstLink={handleShiftTabOnFirstLink}
                />
              );
            })}
        </ul>
      )}
    </li>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="m11.414 10 6.293-6.293a1 1 0 1 0-1.414-1.414l-6.293 6.293-6.293-6.293a1 1 0 0 0-1.414 1.414l6.293 6.293-6.293 6.293a1 1 0 1 0 1.414 1.414l6.293-6.293 6.293 6.293a.998.998 0 0 0 1.707-.707.999.999 0 0 0-.293-.707l-6.293-6.293z" />
    </svg>
  );
}

function NavToggleIcon() {
  return (
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 11h-18a1 1 0 0 1 0-2h18a1 1 0 1 1 0 2zm0-7h-18a1 1 0 0 1 0-2h18a1 1 0 1 1 0 2zm0 14h-18a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2z" />
    </svg>
  );
}

export default Frame;
