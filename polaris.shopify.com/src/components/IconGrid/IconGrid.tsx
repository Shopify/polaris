import {useGlobalSearchResult} from '../GlobalSearch/GlobalSearch';
import {className} from '../../utils/various';
import styles from './IconGrid.module.scss';
import type {Icon as IconType} from '@shopify/polaris-icons/metadata';
import Link from 'next/link';
import Icon from '../Icon';
import * as polarisIcons from '@shopify/polaris-icons';
import SearchResultHighlight from '../SearchResultHighlight';

interface IconGridProps {
  children: React.ReactNode;
}

function IconGrid({children}: IconGridProps) {
  return (
    <>
      <div className={styles.IconGrid}>
        <ul className={styles.IconGridInner}>{children}</ul>
      </div>
    </>
  );
}

interface IconGridItemProps {
  icon: IconType;
  query?: string;
  activeIcon?: string;
  customOnClick?: Function;
  rank?: number;
  searchTerm?: string;
  uuid?: string;
}

function IconGridItem({
  icon,
  activeIcon,
  query,
  customOnClick,
  rank,
  searchTerm,
  uuid,
}: IconGridItemProps) {
  const {id} = icon;
  const searchAttributes = useGlobalSearchResult();

  return (
    <li key={id}>
      <Link
        legacyBehavior
        passHref
        href={{
          pathname: '/icons',
          query: {
            icon: id,
            ...(query === '' ? {} : {q: query}),
          },
        }}
        scroll={false}
        id={icon.id}
        {...searchAttributes}
      >
        <a
          className={className(
            styles.Icon,
            activeIcon === id && styles.isSelected,
          )}
          onClick={() =>
            uuid &&
            customOnClick &&
            customOnClick(uuid, searchTerm, rank, id, `/icons?icon=${id}`)
          }
        >
          <SearchResultHighlight />
          <Icon source={(polarisIcons as any)[id]} />
          <p>{id}</p>
        </a>
      </Link>
    </li>
  );
}

IconGrid.Item = IconGridItem;

export default IconGrid;
