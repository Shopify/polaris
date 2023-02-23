import siteJson from '../../../.cache/site.json';
import {
  getComponentCategories,
  slugify,
  stripMarkdownLinks,
} from '../../utils/various';
import {Status, SiteJSON} from '../../types';
import styles from './ComponentsPage.module.scss';
import PageMeta from '../PageMeta';
import {Grid, GridItem} from '../Grid';
import Page from '../Page';
import ComponentThumbnail from '../ComponentThumbnail';

const pages: SiteJSON = siteJson;

const components = Object.keys(pages).filter((slug) =>
  slug.startsWith('components/'),
);

const componentCategories = getComponentCategories();

export default function ComponentsPage() {
  return (
    <div className={styles.ComponentsPage}>
      <PageMeta
        title="Components"
        description="Components are reusable building blocks made of interface elements and styles, packaged through code. Piece them together, improve them, and create new ones to solve merchant problems."
      />

      <Page title="Components">
        {componentCategories
          .sort((currentCategory, previousCategory) => {
            const currentOrder =
              pages[`components/${slugify(currentCategory)}`]?.frontMatter
                .order || 0;
            const previousOrder =
              pages[`components/${slugify(previousCategory)}`]?.frontMatter
                .order || 0;

            return currentOrder - previousOrder;
          })
          .map((category) => {
            return (
              <div key={category} className={styles.Category}>
                <h2 className={styles.CategoryName}>{category}</h2>
                <Grid>
                  {components
                    .filter(
                      (slug) => pages[slug].frontMatter.category === category,
                    )
                    .map((slug) => {
                      const {
                        title,
                        status,
                        description = '',
                      } = pages[slug].frontMatter;
                      return (
                        <GridItem
                          key={title}
                          title={title}
                          description={stripMarkdownLinks(description)}
                          url={`/${slug}`}
                          status={status as Status}
                          renderPreview={() => (
                            <ComponentThumbnail
                              title={title}
                              group={slugify(category)}
                            />
                          )}
                        />
                      );
                    })}
                </Grid>
              </div>
            );
          })}
      </Page>
    </div>
  );
}
