import Link from 'next/link';
import React from 'react';
import {stripMarkdownLinks} from '../../utils/various';
import {useGlobalSearchResult} from '../GlobalSearch/GlobalSearch';
import styles from './Grid.module.scss';
import SearchResultHighlight from '../SearchResultHighlight';
import {Status} from '../../types';

export interface Props {
  children: React.ReactNode;
}

function Grid({children}: Props) {
  return <ul className={styles.FoundationsGrid}>{children}</ul>;
}

export interface GridItemProps {
  title: string;
  description: string;
  url: string;
  deepLinks?: {url: string; text: string}[];
  renderPreview?: () => React.ReactNode;
  status?: Status;
}

function GridItem({
  title,
  description,
  url,
  deepLinks,
  renderPreview,
}: GridItemProps) {
  const searchAttributes = useGlobalSearchResult();
  return (
    <li className={styles.FoundationsGridItem} {...searchAttributes}>
      <Link href={url} passHref>
        <a className={styles.Text}>
          <SearchResultHighlight />
          {renderPreview && (
            <div className={styles.Preview}>{renderPreview()}</div>
          )}
          <h4>{title}</h4>
          <p>{stripMarkdownLinks(description)}</p>
        </a>
      </Link>
      {deepLinks && (
        <ul className={styles.DeepLinks}>
          {deepLinks.map(({url, text}) => (
            <li key={text}>
              <a href={url}>{text}</a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

Grid.Item = GridItem;

export default Grid;
