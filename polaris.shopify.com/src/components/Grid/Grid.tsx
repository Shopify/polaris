import Link from 'next/link';
import React, {forwardRef} from 'react';
import {stripMarkdownLinks} from '../../utils/various';
import {useGlobalSearchResult} from '../GlobalSearch/GlobalSearch';
import styles from './Grid.module.scss';
import SearchResultHighlight from '../SearchResultHighlight';
import {Status} from '../../types';
import StatusBadge from '../StatusBadge';
import {Box, type WithAsProp} from '../Box';

export interface Props {
  children: React.ReactNode;
}

export const Grid = forwardRef(({as = 'ul', children}, ref) => (
  <Box as={as} ref={ref} className={styles.Grid}>
    {children}
  </Box>
)) as WithAsProp<Props, typeof Box, 'ul'>;

Grid.displayName = 'Grid';

export interface GridItemProps {
  title: string;
  description: string;
  url: string;
  deepLinks?: {url: string; text: string}[];
  renderPreview?: () => React.ReactNode;
  status?: Status;
}

export const GridItem = forwardRef(
  (
    {as = 'li', title, description, url, deepLinks, renderPreview, status},
    ref,
  ) => {
    const searchAttributes = useGlobalSearchResult();
    return (
      <Box as={as} ref={ref} className={styles.GridItem} {...searchAttributes}>
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
      </Box>
    );
  },
) as WithAsProp<GridItemProps, typeof Box, 'li'>;

GridItem.displayName = 'GridItem';
