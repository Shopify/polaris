import Page from '../Page';
import PageMeta from '../PageMeta';
import StatusBanner from '../StatusBanner';
import styles from './FoundationsPage.module.scss';
import {Status} from '../../types';
import Longform from '../Longform';
import {Stack} from '../Stack';
import {Grid, GridItem, type GridItemProps} from '../Grid';
import FoundationsThumbnail from '../FoundationsThumbnail';

export interface FoundationsProps {
  title: string;
  status?: Status;
  description: string;
  items: Item[];
  noIndex?: boolean;
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
  noIndex,
}: FoundationsProps) {
  const typedStatus: Status | undefined = status
    ? {
        value: status.value.toLowerCase() as Status['value'],
        message: status.message,
      }
    : undefined;
  return (
    <div className={styles.FoundationsPage}>
      <PageMeta description={description} noIndex={noIndex} />

      <Page>
        <Longform>
          <h1>{title}</h1>

          <p>{description}</p>
        </Longform>
        <Stack gap="8">
          {typedStatus && <StatusBanner status={typedStatus} />}

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
        </Stack>
      </Page>
    </div>
  );
}

export default FoundationsPage;
