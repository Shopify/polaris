import Link from 'next/link';
import React from 'react';
import {className, stripMarkdownLinks} from '../../utils/various';
import {useGlobalSearchResult} from '../GlobalSearch/GlobalSearch';
import styles from './Grid.module.scss';
import SearchResultHighlight from '../SearchResultHighlight';
import {Status} from '../../types';
import StatusBadge from '../StatusBadge';

export interface Props {
  condensed?: boolean;
  children: React.ReactNode;
}

function Grid({children, condensed}: Props) {
  return (
    <ul className={className(styles.Grid, condensed && styles.condensed)}>
      {children}
    </ul>
  );
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
  status,
}: GridItemProps) {
  const searchAttributes = useGlobalSearchResult();
  return (
    <li className={styles.GridItem} {...searchAttributes}>
      <Link href={url} className={styles.Text}>
        <SearchResultHighlight />
        {renderPreview && (
          <div className={styles.Preview}>{renderPreview()}</div>
        )}
        <h4>
          {title} {status && <StatusBadge status={status} />}
        </h4>
        <p>{stripMarkdownLinks(description)}</p>
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
