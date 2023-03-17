'use client';

import GlobalSearch from '@/components/GlobalSearch';
import {NavItems} from '@/types';
import {className} from '@/utils';
import Link from 'next/link';
import {usePathname, useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import styles from './Navigation.module.scss';

function Navigation({navItems}: {navItems: NavItems}) {
  return (
    <nav className={styles.Navigation}>
      <GlobalSearch />

      <ul>
        {navItems
          .filter((page) => !page.parentId)
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

  const statusBadgeMarkup =
    pageMeta?.type === 'components' && pageMeta.lifeCyclePhase !== 'Stable' ? (
      <p>{pageMeta.lifeCyclePhase}</p>
    ) : null;

  return (
    <li
      key={item.id}
      className={className(item.hasSeparatorInNav && styles.hasSeparatorInNav)}
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
          >
            +
          </button>
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
