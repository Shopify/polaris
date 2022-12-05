import Page from '../Page';
import PageMeta from '../PageMeta';
import Longform from '../Longform';
import Grid from '../Grid';
import StatusBadge from '../StatusBadge';
import FoundationsThumbnail from '../FoundationsThumbnail';
import {StatusName} from '../../types';
import {FlagMajor} from '@shopify/polaris-icons';
import Icon from '../Icon';
import styles from './PatternsPage.module.scss';

const description =
  'Preferred solutions to common merchant goals in the admin.';

export const PatternsPage = () => (
  <>
    <PageMeta title="Patterns" description={description} />

    <Page showTOC={false}>
      <div className={styles.stack} data-gap="8">
        <div>
          <Longform>
            <h1 className={styles.header}>
              Patterns{' '}
              <StatusBadge status={{value: StatusName.Beta, message: ''}} />
            </h1>
            <p>{description}</p>
          </Longform>
          <div className={styles.banner}>
            <Icon source={FlagMajor} width={20} height={20} />
            <p>
              We are making changes to the patterns section. Expect changes to
              happen here and join the discussion to make it better.
            </p>
          </div>
        </div>
        <Grid>
          <Grid.Item
            title="App settings layout"
            description="Makes it easy for merchants to scan and find setting groups."
            url="/TODO"
            renderPreview={() => (
              <FoundationsThumbnail category="patterns" icon="" />
            )}
          />
        </Grid>
      </div>
    </Page>
  </>
);
