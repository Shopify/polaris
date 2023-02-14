import Page from '../Page';
import PageMeta from '../PageMeta';
import Longform from '../Longform';
import {Grid, GridItem} from '../Grid';
import {Status} from '../../types';
import {FlagMajor} from '@shopify/polaris-icons';
import Icon from '../Icon';
import styles from './PatternsPage.module.scss';
import Preview from '../PatternThumbnailPreview';
import {patterns} from '../../utils/various';

const description =
  'Preferred solutions to common merchant goals in the admin.';

export const PatternsPage = () => (
  <>
    <PageMeta title="Patterns" description={description} />

    <Page showTOC={false}>
      <div className={styles.Stack} data-gap="8">
        <div>
          <Longform>
            <h1 className={styles.Header}>Patterns </h1>
            <p>{description}</p>
          </Longform>
          <div className={styles.Banner}>
            <Icon source={FlagMajor} width={20} height={20} />
            <p>
              We are making changes to the patterns section. Expect changes to
              happen here and{' '}
              <a href="https://github.com/Shopify/polaris/discussions/categories/pattern-documentation">
                join the discussion
              </a>{' '}
              to make it better.
            </p>
          </div>
        </div>
        <Grid>
          {Object.values(patterns).map(({frontMatter: pattern}, index) => (
            <GridItem
              key={index}
              title={pattern.title}
              description={pattern.description ?? ''}
              url={pattern.url ?? ''}
              renderPreview={() => (
                <Preview renderInner={false} src={pattern.previewImg} />
              )}
              status={pattern.status as Status}
            />
          ))}
        </Grid>
      </div>
    </Page>
  </>
);
