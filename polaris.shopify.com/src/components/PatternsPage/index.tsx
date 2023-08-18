import Page from '../Page';
import PageMeta from '../PageMeta';
import Longform from '../Longform';
import {Grid, GridItem} from '../Grid';
import {Stack} from '../Stack';
import {Heading} from '../Heading';
import styles from './PatternsPage.module.scss';
import Preview from '../ThumbnailPreview';
import {patterns, legacyPatterns} from '../../utils/various';
import {FoundationsProps} from '../FoundationsPage/FoundationsPage';
import FoundationsThumbnail from '../FoundationsThumbnail';

export const PatternsPage = ({title, description}: FoundationsProps) => (
  <>
    <PageMeta title={title} description={description} />

    <Page>
      <Stack gap={'8'}>
        <div>
          <Longform>
            <Heading as="h1" className={styles.Header}>
              Patterns
            </Heading>
            <p>{description}</p>
          </Longform>
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
                status={pattern.status}
              />
            ))}
        </Grid>
        <Longform>
          <Heading as="h2" id="legacy" className={styles.Header}>
            Archived documentation
          </Heading>
          <p>
            These guidelines are safe to use and will be updated to the new
            documentation format in the near future.
          </p>
        </Longform>
        <Grid>
          {Object.values(legacyPatterns)
            .filter(({frontMatter: {draft}}) => !draft)
            .map(({frontMatter: pattern}, index) => (
              <GridItem
                key={index}
                title={pattern.title}
                description={pattern.description ?? ''}
                url={pattern.url ?? ''}
                renderPreview={() => (
                  <FoundationsThumbnail
                    icon={pattern.icon!}
                    category={pattern.title.toLowerCase()}
                  />
                )}
                status={pattern.status}
              />
            ))}
        </Grid>
      </Stack>
    </Page>
  </>
);
