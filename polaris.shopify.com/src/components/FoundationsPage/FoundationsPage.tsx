import Page from '../Page';
import PageMeta from '../PageMeta';
import StatusBanner from '../StatusBanner';
import styles from './FoundationsPage.module.scss';
import {Status} from '../../types';
import Longform from '../Longform';
import {Grid, GridItem, type GridItemProps} from '../Grid';
import FoundationsThumbnail from '../FoundationsThumbnail';

export interface FoundationsProps {
  title: string;
  status?: Status;
  description: string;
  items: Item[];
}

interface Item extends GridItemProps {
  order: number;
  icon: string;
}

function FoundationsPage({
  title,
  description,
  items,
  status,
}: FoundationsProps) {
  const typedStatus: Status | undefined = status
    ? {
        value: status.value.toLowerCase() as Status['value'],
        message: status.message,
      }
    : undefined;
  return (
    <div className={styles.FoundationsPage}>
      <PageMeta description={description} />

      <Page showTOC={false}>
        <Longform>
          <h1>{title}</h1>

          <p>{description}</p>
          {typedStatus ? (
            <p>
              <StatusBanner status={typedStatus} />
            </p>
          ) : null}
        </Longform>

        <Grid>
          {items
            .sort((a, b) => a.title.localeCompare(b.title))
            .sort((a, b) => a.order - b.order)
            .map((item) => {
              if (!item.url) return null;
              return (
                <GridItem
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
