import Page from '../Page';
import PageMeta from '../PageMeta';
import Longform from '../Longform';
import {Grid, GridItem} from '../Grid';
import StatusBadge from '../StatusBadge';
import {StatusName} from '../../types';
import {FlagMajor} from '@shopify/polaris-icons';
import Icon from '../Icon';
import styles from './PatternsPage.module.scss';
import Preview from '../PatternThumbnailPreview';

const description =
  'Preferred solutions to common merchant goals in the admin.';

export const PatternsPage = () => (
  <>
    <PageMeta title="Patterns" description={description} />

    <Page showTOC={false}>
      <div className={styles.Stack} data-gap="8">
        <div>
          <Longform>
            <h1 className={styles.Header}>
              Patterns{' '}
              <StatusBadge status={{value: StatusName.Beta, message: ''}} />
            </h1>
            <p>{description}</p>
          </Longform>
          <div className={styles.Banner}>
            <Icon source={FlagMajor} width={20} height={20} />
            <p>
              We are making changes to the patterns section. Expect changes to
              happen here and join the discussion to make it better.
            </p>
          </div>
        </div>
        <Grid>
          <GridItem
            title="App settings layout"
            description="Makes it easy for merchants to scan and find setting groups."
            url="/patterns/app-settings-layout"
            renderPreview={() => (
              <Preview
                renderInner={false}
                src="/images/patterns/pattern-thumbnail-app-settings.png"
              />
            )}
          />
          <GridItem
            title="Resource index layout"
            description="Makes it easy for merchants to view and manage resources."
            url="/patterns/resource-index-layout"
            renderPreview={() => (
              <Preview
                renderInner={false}
                src="/images/patterns/pattern-thumbnail-resource-index.png"
              />
            )}
          />
          <GridItem
            title="Resource detail layout"
            description="Makes it easy for merchants to create, view and edit resources."
            url="/patterns/resource-details-layout"
            renderPreview={() => (
              <Preview
                renderInner={false}
                src="/images/patterns/pattern-thumbnail-resource-details.png"
              />
            )}
          />
          <GridItem
            title="Date picking"
            description="Makes it easy for merchants to select and input dates and date ranges."
            url="/patterns/date-picking"
            renderPreview={() => (
              <Preview
                renderInner={false}
                src="/images/patterns/pattern-thumbnail-date-picking.png"
              />
            )}
            status={{value: StatusName.Beta, message: ''}}
          />
        </Grid>
      </div>
    </Page>
  </>
);
