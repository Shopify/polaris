import Page from '../Page';
import styles from './FoundationsPage.module.scss';
import Longform from '../Longform';
import {Grid, GridItem, GridItemProps} from '../Grid';
import {PageWithUrl} from '../Editor/types';

export interface FoundationsProps {
  page: PageWithUrl;
  items: GridItemProps[];
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
            .sort((a, b) => a.order - b.order)
            .map((itemProps) => {
              return <GridItem key={itemProps.title} {...itemProps} />;
            })}
        </Grid>
      </Page>
    </div>
  );
}

export default FoundationsPage;
