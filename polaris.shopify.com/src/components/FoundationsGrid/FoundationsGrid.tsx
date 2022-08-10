import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {stripMarkdownLinks} from '../../utils/various';
import {useGlobalSearchResult} from '../GlobalSearch/GlobalSearch';
import styles from './FoundationsGrid.module.scss';

interface Props {
  title?: string;
  children: React.ReactNode;
}

function FoundationsGrid({title, children}: Props) {
  return (
    <div className={styles.FoundationsGrid}>
      <div key={title} className={styles.Category}>
        <div className={styles.Text}>
          {title && <h2>{title}</h2>}
          <ul>{children}</ul>
        </div>
      </div>
    </div>
  );
}

interface FoundationsGridItemProps {
  title: string;
  description: string;
  url: string;
  icon: string;
  category: string;
}

function FoundationsGridItem({
  title,
  description,
  url,
  icon,
  category,
}: FoundationsGridItemProps) {
  const searchAttributes = useGlobalSearchResult();

  return (
    <li className={styles.FoundationsGridItem} data-category={category}>
      <Link href={url} passHref>
        <a {...searchAttributes}>
          <div className={styles.Icon}>
            <Image src={`/api/icons/v0/${icon}.svg`} alt="" width={20} height={20} />
          </div>
          <h4>{title}</h4>
          <p>{stripMarkdownLinks(description)}</p>
        </a>
      </Link>
    </li>
  );
}

FoundationsGrid.Item = FoundationsGridItem;

export default FoundationsGrid;
