import {ResolvedPage} from '@/types';
import Link from 'next/link';
import ImageRenderer from '../ImageRenderer';
import Markdown from '../Markdown';
import styles from './ChildpageListing.module.scss';

interface Props {
  pages: ResolvedPage[];
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
              <ImageRenderer image={thumbnail} width={368} />
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
            <h3>{page.title}</h3>
            <Markdown strip>{page.excerpt}</Markdown>
          </Link>
        );
      })}
    </div>
  );
}

export default ChildpageListing;
