import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import {stripMarkdownLinks} from '../../utils/various';
import {useGlobalSearchResult} from '../GlobalSearch/GlobalSearch';
import styles from './Grid.module.scss';
import SearchResultHighlight from '../SearchResultHighlight';
import {Status} from '../../types';
import StatusBadge from '../StatusBadge';
import {ColorScheme, ResolvedPage} from '../Editor/types';

export interface GridProps {
  children: React.ReactNode;
}

export const Grid = ({children}: GridProps) => (
  <ul className={styles.Grid}>{children}</ul>
);

export type GridItemProps = ResolvedPage;

export const GridItem = ({
  title,
  url,
  excerpt,
  thumbnailImageId,
  images,
}: GridItemProps) => {
  const searchAttributes = useGlobalSearchResult();
  const coverImage = images.find((image) => image.id === thumbnailImageId);
  return (
    <li className={styles.GridItem} {...searchAttributes}>
      <Link href={url} className={styles.Text}>
        <SearchResultHighlight />
        {coverImage && (
          <Image
            src={`/uploads/${coverImage.variants[ColorScheme.Light].fileName}`}
            alt={coverImage.alt.light}
            width={coverImage.variants[ColorScheme.Light].width}
            height={coverImage.variants[ColorScheme.Light].height}
          />
        )}
        <h4>
          {title}
          {/* {status && <StatusBadge status={status} />} */}
        </h4>
        <p>{stripMarkdownLinks(excerpt)}</p>
      </Link>
    </li>
  );
};
