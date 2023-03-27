import {ResolvedPageWithoutBlocks} from '@/types';
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
        return (
          <Link href={page.url} key={page.id} className={styles.Page}>
            {page.thumbnailImage.alt &&
            page.thumbnailImage.lightModeFilename &&
            page.thumbnailImage.width &&
            page.thumbnailImage.height ? (
              <div className={styles.Thumbnail}>
                <ImageRenderer image={page.thumbnailImage} width={368} />
              </div>
            ) : (
              <div
                className={styles.Thumbnail}
                style={{
                  aspectRatio: '16/9',
                  background: `var(--color-surface-subdued)`,
                  borderRadius: 16,
                }}
              />
            )}
            <h3>
              {page.title}{' '}
              {page.pageMeta?.type === 'components' &&
                page.pageMeta.lifeCyclePhase !== 'Stable' && (
                  <Pill
                    label={page.pageMeta.lifeCyclePhase}
                    style={page.pageMeta.lifeCyclePhase.toLowerCase()}
                  />
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
