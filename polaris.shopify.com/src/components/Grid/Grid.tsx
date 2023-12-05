import Link from 'next/link';
import React, {forwardRef} from 'react';
import {type SpaceScale} from '@shopify/polaris-tokens';
import {stripMarkdownLinks} from '../../utils/various';
import {useGlobalSearchResult} from '../GlobalSearch/GlobalSearch';
import styles from './Grid.module.scss';
import SearchResultHighlight from '../SearchResultHighlight';
import {Status} from '../../types';
import StatusBadge from '../StatusBadge';
import {Box, type WithAsProp} from '../Box';

export interface GridProps {
  condensed?: boolean;
  /* Set default values for both x & y gap values. */
  gap?: SpaceScale;
  /* Set value for x gaps. Will overwrite any `gap` value set. */
  gapX?: SpaceScale;
  /* Set value for y gaps. Will overwrite any `gap` value set. */
  gapY?: SpaceScale;
  /* Set the minimum width of grid items. <Grid> will attempt to pack as many
   * <GridItems> in as possible without going below this size. Note: A <GridItem>
   * will never expand to be wider than the <Grid> container, meaning small
   * screens might cause a <GridItem> to shrink below this value. */
  itemMinWidth?: string;
}

export const Grid = forwardRef(
  (
    {
      as = 'ul',
      gap,
      gapX = gap,
      gapY = gap,
      itemMinWidth,
      condensed,
      className,
      ...props
    },
    ref,
  ) => (
    <Box
      as={as}
      ref={ref}
      style={{
        '--props-grid-gap':
          typeof gap !== 'undefined' ? `var(--p-space-${gap})` : undefined,
        '--props-grid-gap-x':
          typeof gapX !== 'undefined' ? `var(--p-space-${gapX})` : undefined,
        '--props-grid-gap-y':
          typeof gapY !== 'undefined' ? `var(--p-space-${gapY})` : undefined,
        '--props-grid-item-min-width': itemMinWidth,
      }}
      className={[styles.Grid, condensed && styles.condensed, className]}
      {...props}
    />
  ),
) as WithAsProp<GridProps, typeof Box, 'ul'>;

Grid.displayName = 'Grid';

export interface GridItemProps {
  title: string;
  url: string;
  description?: string;
  renderPreview?: () => React.ReactNode;
  status?: Status;
  customOnClick?: React.MouseEventHandler<HTMLAnchorElement>;
  searchQuery?: string;
  rank?: number;
}

export const GridItem = forwardRef(
  (
    {as = 'li', title, description, url, renderPreview, status, customOnClick},
    ref,
  ) => {
    const searchAttributes = useGlobalSearchResult();
    return (
      <Box as={as} ref={ref} className={styles.GridItem} {...searchAttributes}>
        <Link legacyBehavior href={url} className={styles.Text}>
          <a onClick={customOnClick}>
            <SearchResultHighlight />
            {renderPreview && (
              <div className={styles.Preview}>{renderPreview()}</div>
            )}
            <h4>
              {title} {status && <StatusBadge status={status} />}
            </h4>
            <p>{stripMarkdownLinks(description || '')}</p>
          </a>
        </Link>
      </Box>
    );
  },
) as WithAsProp<GridItemProps, typeof Box, 'li'>;

GridItem.displayName = 'GridItem';
