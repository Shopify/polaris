import Page from '../Page';
import styles from './FoundationsPage.module.scss';
import Longform from '../Longform';
import {Grid, GridItem} from '../Grid';
import FoundationsThumbnail from '../FoundationsThumbnail';
import {PageWithUrl} from '../Editor/types';

export interface FoundationsProps {
  page: PageWithUrl;
  items: {
    slug: string;
    title: string;
    excerpt: string;
    url: string;
    order: number;
    icon: string;
  }[];
}

function FoundationsPage({page, items}: FoundationsProps) {
  return (
    <div className={styles.FoundationsPage}>
      <Page page={page} showTOC={false}>
        <Longform>
          <p>{page.excerpt}</p>
        </Longform>

        <Grid>
          {items
            .sort((a, b) => a.title.localeCompare(b.title))
            .sort((a, b) => a.order - b.order)
            .map(({slug, title, excerpt, url, icon}) => {
              return (
                <GridItem
                  key={slug}
                  title={title}
                  description={excerpt}
                  url={url}
                  renderPreview={() => (
                    <FoundationsThumbnail icon={icon} category={page.slug} />
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
