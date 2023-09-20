import Link from 'next/link';

import navJSON from '../../../.cache/nav.json';
import {NavJSON, NavItem} from '../../types';
import {className} from '../../utils/various';

import styles from './Subnav.module.scss';
import {useRouter} from 'next/router';
import {Icon} from '@shopify/polaris';
import * as polarisIcons from '@shopify/polaris-icons';

type PolarisIcon = keyof typeof polarisIcons;
const nav = navJSON.children as NavJSON;

function Subnav() {
  const {asPath} = useRouter();
  const navItems = getNavItems(asPath);

  if (!navItems) {
    console.warn('No subnav items found for path:', asPath);
    return null;
  }

  const sortedNavItems = Object.entries(navItems).sort(([_a, a], [_b, b]) => {
    if (a.order && b.order) return a.order > b.order ? 1 : -1;
    return 0;
  });

  const injectedPolarisIcons = {...polarisIcons, PolarisIcon, HexagonIcon};

  return (
    <nav className={styles.Subnav}>
      <ul className={styles.Items}>
        {sortedNavItems.map(([key, navItem]) => (
          <Link
            className={className(
              styles.Item,
              asPath === navItem.slug && styles['Item--active'],
            )}
            key={key}
            href={{pathname: navItem.slug || './'}}
          >
            {navItem.icon ? (
              <div>
                <Icon
                  source={injectedPolarisIcons[navItem.icon as PolarisIcon]}
                />
              </div>
            ) : null}
            {navItem.title}
          </Link>
        ))}
      </ul>
    </nav>
  );
}

function getNavItems(path: string): {[key: string]: NavItem} | undefined {
  const paths = path.split('/').filter((segment) => segment);

  const navItemPath = paths.join('.children.');
  const currentNavItem = getObjectValue<NavItem>(nav, navItemPath);

  const isOverviewPage = currentNavItem?.children !== undefined;

  // Get the parent nav item if we're on a subpage
  const parentItemPath = paths.slice(0, -1).join('.children.');
  const parentNavItem = isOverviewPage
    ? currentNavItem
    : getObjectValue<NavItem>(nav, parentItemPath);

  // Return if we're on a page that doesn't have a subnav
  if (!parentNavItem) return;

  return {
    overview: {
      title: 'Overview',
      slug: parentNavItem?.slug,
      order: 0,
      icon: 'PolarisIcon',
    },
    ...parentNavItem.children,
  };
}

function getObjectValue<T>(obj: any, path: string): T | undefined {
  const keys = path.split('.');
  let value = obj;

  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return undefined;
    }
  }

  return value;
}

const PolarisIcon = () => (
  <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10 17a7 7 0 100-14 7 7 0 000 14zm0 0a7 7 0 017-7 7 7 0 01-7-7 7 7 0 01-7 7 7 7 0 017 7z"
      fill="currentColor"
    />
  </svg>
);

const HexagonIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3 8.09173V11.9079C3 12.5884 3.34604 13.2223 3.91848 13.5903L8.91848 16.8046C9.5773 17.2281 10.4227 17.2281 11.0815 16.8046L16.0815 13.5903C16.654 13.2223 17 12.5884 17 11.9079V8.09173C17 7.4112 16.654 6.77737 16.0815 6.40937L11.0815 3.19508C10.4227 2.77156 9.5773 2.77156 8.91848 3.19508L3.91849 6.40937C3.34604 6.77737 3 7.4112 3 8.09173ZM12 9.99982C12 11.1044 11.1046 11.9998 10 11.9998C8.89543 11.9998 8 11.1044 8 9.99982C8 8.89525 8.89543 7.99982 10 7.99982C11.1046 7.99982 12 8.89525 12 9.99982ZM13.5 9.99982C13.5 11.9328 11.933 13.4998 10 13.4998C8.067 13.4998 6.5 11.9328 6.5 9.99982C6.5 8.06682 8.067 6.49982 10 6.49982C11.933 6.49982 13.5 8.06682 13.5 9.99982Z"
      fill="currentColor"
    />
  </svg>
);

export default Subnav;
