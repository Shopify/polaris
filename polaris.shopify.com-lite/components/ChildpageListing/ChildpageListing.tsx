import {ResolvedPage, ResolvedPageWithoutBlocks} from '@/types';
import Link from 'next/link';
import ImageRenderer from '../ImageRenderer';
import Markdown from '../Markdown';
import Pill from '../Pill';
import styles from './ChildpageListing.module.scss';

interface Props {
  pages: ResolvedPageWithoutBlocks[];
}

function ChildpageListing({pages}: Props) {
  return (
    <div className={styles.ChildpageListing}>
      {pages.map((page) => {
        const thumbnail = page.images.find(
          (image) => image.id === page.thumbnailImageId,
        );
        return (
          <Link href={page.url} key={page.id} className={styles.Page}>
            {thumbnail ? (
              <div className={styles.Thumbnail}>
                <ImageRenderer image={thumbnail} width={368} />
              </div>
            ) : (
              <div
                className={styles.Thumbnail}
                style={{
                  aspectRatio: '16/9',
                  background: `var(--color-surface-subdued)`,
                  borderRadius: 8,
                }}
              />
            )}
            <h3>
              {page.title}{' '}
              {page.pageMeta?.type === 'components' &&
                page.pageMeta.lifeCyclePhase !== 'Stable' && (
                  <Pill label={page.pageMeta.lifeCyclePhase} />
                )}
            </h3>
            <Markdown strip>{page.excerpt}</Markdown>
          </Link>
        );
      })}
    </div>
  );
}

export default ChildpageListing;
