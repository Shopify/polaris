import Page from '../Page';
import PageMeta from '../PageMeta';
import styles from './FoundationsPage.module.scss';
import Longform from '../Longform';
import Grid from '../Grid';
import Image from '../Image';
import {GridItemProps} from '../Grid/Grid';
import FoundationsThumbnail from '../FoundationsThumbnail';

export interface FoundationsProps {
  title: string;
  description: string;
  items: Item[];
  headerImage?: {
    src: string;
    altText: string;
  };
}

interface Item extends GridItemProps {
  order: number;
  icon: string;
}

function FoundationsPage({
  title,
  description,
  items,
  headerImage,
}: FoundationsProps) {
  const headerImageMarkup = headerImage ? (
    <Image src={headerImage.src} alt={headerImage.altText} />
  ) : null;

  return (
    <div className={styles.FoundationsPage}>
      <PageMeta description={description} />

      <Page showTOC={false}>
        <Longform>
          <h1>{title}</h1>
          <p>{description}</p>
        </Longform>
        {headerImageMarkup}
        <Grid>
          {items
            .sort((a, b) => a.title.localeCompare(b.title))
            .sort((a, b) => a.order - b.order)
            .map((item) => {
              if (!item.url) return null;
              return (
                <Grid.Item
                  key={item.title}
                  {...item}
                  renderPreview={() => (
                    <FoundationsThumbnail
                      icon={item.icon}
                      category={title.toLowerCase()}
                    />
                  )}
                />
              );
            })}
        </Grid>
      </Page>
    </div>
  );
}

export default FoundationsPage;
