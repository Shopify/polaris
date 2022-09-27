import Icon from '../Icon';
import Link from 'next/link';
import React from 'react';
import {slugify, stripMarkdownLinks} from '../../utils/various';
import {useGlobalSearchResult} from '../GlobalSearch/GlobalSearch';
import styles from './FoundationsGrid.module.scss';
import * as polarisIcons from '@shopify/polaris-icons';
import SearchResultHighlight from '../SearchResultHighlight';

export interface Props {
  children: React.ReactNode;
}

function FoundationsGrid({children}: Props) {
  return <ul className={styles.FoundationsGrid}>{children}</ul>;
}

export interface FoundationsGridItemProps {
  order: number;
  title: string;
  description: string;
  url: string;
  icon: string;
  headings: string[];
  category: string;
}

function FoundationsGridItem({
  title,
  description,
  url,
  icon,
  headings,
  category,
}: FoundationsGridItemProps) {
  const searchAttributes = useGlobalSearchResult();
  let iconSource = (polarisIcons as any)[icon];

  return (
    <li
      className={styles.FoundationsGridItem}
      {...searchAttributes}
      data-category={category}
    >
      <Link href={url} passHref>
        <a className={styles.Text}>
          <SearchResultHighlight />
          <div className={styles.Icon}>
            {iconSource && <Icon source={iconSource} />}
          </div>{' '}
          <h4>{title}</h4>
          <p>{stripMarkdownLinks(description)}</p>
        </a>
      </Link>
      <div>
        <ul className={styles.DeepLinks}>
          {headings.map((heading) => (
            <li key={heading}>
              <a href={`${url}#${slugify(heading)}`}>{heading}</a>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

FoundationsGrid.Item = FoundationsGridItem;

export default FoundationsGrid;
