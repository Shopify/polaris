import Link from 'next/link';
import React, {forwardRef} from 'react';
import {type SpacingSpaceScale} from '@shopify/polaris-tokens';
import {stripMarkdownLinks} from '../../utils/various';
import {useGlobalSearchResult} from '../GlobalSearch/GlobalSearch';
import styles from './Grid.module.scss';
import SearchResultHighlight from '../SearchResultHighlight';
import {Status} from '../../types';
import StatusBadge from '../StatusBadge';
import {Box, type WithAsProp} from '../Box';

export interface GridProps {
  /* Set default values for both x & y gap values. */
  gap?: SpacingSpaceScale;
  /* Set value for x gaps. Will overwrite any `gap` value set. */
  gapX?: SpacingSpaceScale;
  /* Set value for y gaps. Will overwrite any `gap` value set. */
  gapY?: SpacingSpaceScale;
  /* Set the minimum width of grid items. <Grid> will attempt to pack as many
   * <GridItems> in as possible without going below this size. Note: A <GridItem>
   * will never expand to be wider than the <Grid> container, meaning small
   * screens might cause a <GridItem> to shrink below this value. */
  itemMinWidth?: string;
}

export const Grid = forwardRef(
  (
    {as = 'ul', gap, gapX = gap, gapY = gap, itemMinWidth, className, ...props},
    ref,
  ) => (
    <Box
      as={as}
      ref={ref}
      style={{
        // @ts-expect-error The types for `style` don't support css vars
        '--props-grid-gap':
          typeof gap !== 'undefined' ? `var(--p-space-${gap})` : undefined,
        '--props-grid-gap-x':
          typeof gapX !== 'undefined' ? `var(--p-space-${gapX})` : undefined,
        '--props-grid-gap-y':
          typeof gapY !== 'undefined' ? `var(--p-space-${gapY})` : undefined,
        '--props-grid-item-min-width': itemMinWidth,
      }}
      className={[styles.Grid, className]}
      {...props}
    />
  ),
) as WithAsProp<GridProps, typeof Box, 'ul'>;

Grid.displayName = 'Grid';

export interface GridItemProps {
  title: string;
  url: string;
  description?: string;
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
          <p>{stripMarkdownLinks(description || '')}</p>
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
