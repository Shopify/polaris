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
import {FoundationsProps} from '../FoundationsPage/FoundationsPage';

export const PatternsPage = ({title, description}: FoundationsProps) => (
  <>
    <PageMeta title={title} description={description} />

    <Page>
      <Stack gap={'8'}>
        <div>
          <Longform>
            <h1 className={styles.Header}>Patterns </h1>
            <p>{description}</p>
          </Longform>
          <UpdateBanner
            message={`Our pattern documentation is evolving. [Join our discussions](https://github.com/Shopify/polaris/discussions/categories/pattern-documentation) to make it better. The [legacy patterns documentation](/patterns-legacy) can still be used.`}
            className={styles.UpdateBanner}
          />
        </div>
        <Grid>
          {Object.values(patterns)
            .filter(({frontMatter: {draft}}) => !draft)
            .map(({frontMatter: pattern}, index) => (
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
