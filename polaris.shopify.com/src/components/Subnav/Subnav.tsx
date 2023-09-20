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

  return (
    <nav>
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
              <Icon source={polarisIcons[navItem.icon as PolarisIcon]} />
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

export default Subnav;
