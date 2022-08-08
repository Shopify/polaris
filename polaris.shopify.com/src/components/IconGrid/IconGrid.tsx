import Image from '../Image';
import {useGlobalSearchResult} from '../GlobalSearch/GlobalSearch';
import {className} from '../../utils/various';
import styles from './IconGrid.module.scss';
import type {Icon} from '@shopify/polaris-icons/metadata';
import Link from 'next/link';

interface IconGridProps {
  title?: string;
  children: React.ReactNode;
}

function IconGrid({title, children}: IconGridProps) {
  return (
    <>
      {title ? <h2 className={styles.SectionHeading}>{title}</h2> : null}
      <div className={styles.IconGrid}>
        <ul className={styles.IconGridInner}>{children}</ul>
      </div>
    </>
  );
}

interface IconGridItemProps {
  icon: Icon;
  query?: string;
  activeIcon?: string;
}

function IconGridItem({icon, activeIcon, query}: IconGridItemProps) {
  const {id, name, description} = icon;
  const searchAttributes = useGlobalSearchResult();

  return (
    <li key={id}>
      <Link
        href={{
          pathname: '/icons',
          query: {
            icon: id,
            ...(query === '' ? {} : {q: query}),
          },
        }}
        scroll={false}
      >
        <a
          className={className(
            styles.Icon,
            activeIcon === id && styles.isSelected,
          )}
          id={icon.id}
          {...searchAttributes}
        >
          <Image
            src={`/icons/${id}.svg`}
            alt={description}
            width={20}
            height={20}
            icon
          />
          <p>{name}</p>
        </a>
      </Link>
    </li>
  );
}

IconGrid.Item = IconGridItem;

export default IconGrid;
