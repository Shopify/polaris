import Page from '../Page';
import PageMeta from '../PageMeta';
import Longform from '../Longform';
import {Grid, GridItem} from '../Grid';
import {Stack} from '../Stack';
import {Status} from '../../types';
import styles from './PatternsPage.module.scss';
import Preview from '../ThumbnailPreview';
import {patterns} from '../../utils/various';
import UpdateBanner from '../UpdateBanner';

const description =
  'Preferred solutions to common merchant goals in the admin.';

export const PatternsPage = () => (
  <>
    <PageMeta title="Patterns" description={description} />

    <Page>
      <Stack gap={'8'}>
        <div>
          <Longform>
            <h1 className={styles.Header}>Patterns </h1>
            <p>{description}</p>
          </Longform>
          <UpdateBanner
            message={`We are making changes to the patterns section. Expect changes to
              happen here and [join the discussion](https://github.com/Shopify/polaris/discussions/categories/pattern-documentation)
              to make it better. [See old patterns here](/patterns-legacy).`}
            className={styles.UpdateBanner}
          />
        </div>
        <Grid>
          {Object.values(patterns).map(({frontMatter: pattern}, index) => (
            <GridItem
              key={index}
              title={pattern.title}
              description={pattern.description ?? ''}
              url={pattern.url ?? ''}
              renderPreview={() => (
                <Preview alt={pattern.title} src={pattern.previewImg} />
              )}
              status={pattern.status as Status}
            />
          ))}
        </Grid>
      </Stack>
    </Page>
  </>
);
