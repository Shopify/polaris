'use client';

import GlobalSearch from '@/components/GlobalSearch';
import Pill from '@/components/Pill';
import {HOME_PAGE_ID} from '@/config';
import {NavItems, pagesWithIcons} from '@/types';
import {className} from '@/utils';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import React, {useEffect, useRef, useState} from 'react';
import styles from './Navigation.module.scss';

function Navigation({navItems}: {navItems: NavItems}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const mobileNavToggleRef = useRef<HTMLButtonElement>(null);

  const pathName = usePathname();
  useEffect(() => setMobileNavOpen(false), [pathName]);

  function handleFirstFocusableItemKeyDown(evt: React.KeyboardEvent) {
    if (mobileNavOpen && evt.key === 'Tab' && evt.shiftKey) {
      const selector = '#top-level-nav > li:last-child a';
      (document.querySelector(selector) as HTMLLinkElement)?.focus();
      evt.preventDefault();
    }
  }

  function handleLastFocusableItemKeyDown(evt: React.KeyboardEvent) {
    if (mobileNavOpen && evt.key === 'Tab' && !evt.shiftKey) {
      mobileNavToggleRef.current?.focus();
      evt.preventDefault();
    }
  }

  function handleContentKeyDown(evt: React.KeyboardEvent) {
    if (evt.key === 'Escape') {
      const originatedFromGlobalSearch =
        (evt.target as HTMLElement)?.getAttribute('role') === 'combobox';
      if (!originatedFromGlobalSearch) {
        closeMobileNav();
      }
    }
  }

  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? 'hidden' : 'auto';
  }, [mobileNavOpen]);

  function closeMobileNav() {
    setMobileNavOpen(false);
  }

  const topLevelItems = [...navItems]
    .filter((page) => !page.parentId && page.id !== HOME_PAGE_ID)
    .sort((a, b) => a.order - b.order);

  return (
    <>
      <div className={styles.MobileHeader}>
        <Link href="/" className={styles.Logo}>
          <h1>Polaris</h1>
        </Link>
        <GlobalSearch
          renderToggle={(attributes) => (
            <button {...attributes} className={styles.GlobalSearchMobileToggle}>
              Search
            </button>
          )}
        />
      </div>

      <nav className={styles.Navigation}>
        <button
          className={className(
            styles.MobileNavToggle,
            mobileNavOpen && styles.isCloseButton,
          )}
          aria-expanded={mobileNavOpen}
          aria-controls="navContent"
          ref={mobileNavToggleRef}
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          onKeyDown={handleFirstFocusableItemKeyDown}
        >
          Toggle navigation
        </button>

        {mobileNavOpen && (
          <div className={styles.MobileBackdrop} onClick={closeMobileNav}></div>
        )}

        <div
          className={className(
            styles.Content,
            mobileNavOpen && styles.mobileNavOpen,
          )}
          id="navContent"
          onKeyDown={handleContentKeyDown}
        >
          <Link href="/" className={styles.Logo}>
            <h1>Polaris</h1>
          </Link>

          <GlobalSearch
            renderToggle={(attributes) => (
              <button
                className={styles.GlobalSearchDesktopToggle}
                {...attributes}
              >
                Search
              </button>
            )}
          />

          <ul id="top-level-nav">
            {topLevelItems.map((page, index) => (
              <NavItem
                key={page.id}
                navItems={navItems}
                item={page}
                onKeyDown={
                  index === topLevelItems.length - 1
                    ? handleLastFocusableItemKeyDown
                    : undefined
                }
              />
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}

function NavItem({
  navItems,
  item,
  onKeyDown,
}: {
  navItems: NavItems;
  item: NavItems[number];
  onKeyDown?: (e: React.KeyboardEvent) => void;
}) {
  const [isManuallyToggled, setIsManuallyToggled] = useState<boolean | null>(
    null,
  );
  const pathName = usePathname();
  const {pageMeta} = item;
  const children = navItems.filter((child) => child.parentId === item.id);

  const childrenAriaId = `nav-${item.id}`;
  const isExpandable = children.length > 0;
  let isExpanded = false;
  if (isExpandable) {
    if (isManuallyToggled === null) {
      isExpanded = navItems.some(
        (thisItem) =>
          thisItem.url.startsWith(item.url) && `/${thisItem.url}` === pathName,
      );
    } else {
      isExpanded = isManuallyToggled;
    }
  }

  const isCurrent = `/${item.url}` === pathName;
  const hasIcon =
    pagesWithIcons.includes(item.slug) && item.url.split('/').length === 1;

  const statusBadgeMarkup =
    pageMeta?.type === 'components' && pageMeta.lifeCyclePhase !== 'Stable' ? (
      <Pill label={pageMeta.lifeCyclePhase} />
    ) : null;

  return (
    <li
      key={item.id}
      className={className(
        item.hasSeparatorInNav && styles.hasSeparatorInNav,
        hasIcon && styles.hasIcon,
      )}
    >
      <span
        className={className(styles.NavItem, isCurrent && styles.isCurrent)}
      >
        <Link
          href={`/${item.url}`}
          onClick={() => {
            if (isManuallyToggled === false) {
              setIsManuallyToggled(null);
            }
          }}
          aria-current={isCurrent ? 'page' : 'false'}
          onKeyDown={(evt) => onKeyDown && onKeyDown(evt)}
        >
          {hasIcon && (
            <div className={styles.IconContainer}>
              <Pill asIcon label={item.slug} />
            </div>
          )}

          {item.title}
          {statusBadgeMarkup}
          {item.hasNewBadge && <Pill label="New" />}
        </Link>

        {isExpandable && (
          <button
            className={styles.ExpandCollapseButton}
            onClick={() =>
              setIsManuallyToggled(
                isManuallyToggled === null ? !isExpanded : !isManuallyToggled,
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
            .map((child) => (
              <NavItem key={child.id} navItems={navItems} item={child} />
            ))}
        </ul>
      )}
    </li>
  );
}

export default Navigation;
