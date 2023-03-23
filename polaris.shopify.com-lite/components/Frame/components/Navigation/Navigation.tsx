'use client';

import GlobalSearch from '@/components/GlobalSearch';
import Pill from '@/components/Pill';
import {HOME_PAGE_ID} from '@/config';
import {NavItems, pagesWithIcons} from '@/types';
import {className} from '@/utils';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useState} from 'react';
import styles from './Navigation.module.scss';

function Navigation({navItems}: {navItems: NavItems}) {
  return (
    <nav className={styles.Navigation}>
      <Link href="/">
        <h1 className={styles.Logo}>Polaris</h1>
      </Link>

      <GlobalSearch />

      <ul>
        {navItems
          .filter((page) => !page.parentId && page.id !== HOME_PAGE_ID)
          .sort((a, b) => a.order - b.order)
          .map((page) => (
            <NavItem
              key={page.id}
              navItems={navItems}
              item={page}
              level={0}
              handleLinkClick={() => undefined}
              handleShiftTabOnFirstLink={() => undefined}
            />
          ))}
      </ul>
    </nav>
  );
}

function NavItem({
  navItems,
  item,
  level,
  handleLinkClick,
  handleShiftTabOnFirstLink,
}: {
  navItems: NavItems;
  item: NavItems[number];
  level: number;
  handleLinkClick: () => void;
  handleShiftTabOnFirstLink: (e: React.KeyboardEvent) => void;
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
            handleLinkClick();
            if (isManuallyToggled === false) {
              setIsManuallyToggled(null);
            }
          }}
          aria-current={isCurrent ? 'page' : 'false'}
          // TODO
          // onKeyDown={(evt) => {
          //   if (level === 0 && i === 0) {
          //     handleShiftTabOnFirstLink(evt);
          //   }
          // }}
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
            .map((child) => {
              return (
                <NavItem
                  key={child.id}
                  navItems={navItems}
                  item={child}
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

export default Navigation;
