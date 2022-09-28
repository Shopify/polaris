import Page from '../Page';
import PageMeta from '../PageMeta';
import styles from './FoundationsIndexPage.module.scss';
import Longform from '../Longform';
import Grid from '../Grid';
import {GridItemProps} from '../Grid/Grid';
import FoundationsThumbnail from '../FoundationsThumbnail';

export interface FoundationsProps {
  title: string;
  description: string;
  items: Item[];
}

interface Item extends GridItemProps {
  order: number;
  icon: string;
}

function FoundationsIndexPage({title, description, items}: FoundationsProps) {
  return (
    <div className={styles.FoundationsIndexPage}>
      <PageMeta description={description} />

      <Page showTOC={false}>
        <Longform>
          <h1>{title}</h1>
          <p>{description}</p>
        </Longform>
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

export default FoundationsIndexPage;
