import siteJson from '../../../.cache/site.json';
import {
  getComponentCategories,
  stripMarkdownLinks,
  slugify,
} from '../../utils/various';
import {Status, SiteJSON} from '../../types';
import styles from './ComponentsPage.module.scss';
import PageMeta from '../PageMeta';
import Grid from '../Grid';
import Layout from '../Layout';
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

      <Layout showTOC={false}>
        <h1>Components</h1>

        {componentCategories.map((category) => {
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
                    const url = `/components/${slugify(title)}`;
                    return (
                      <Grid.Item
                        key={title}
                        title={title}
                        description={stripMarkdownLinks(description)}
                        url={url}
                        status={status as Status}
                        renderPreview={() => (
                          <ComponentThumbnail title={title} />
                        )}
                      />
                    );
                  })}
              </Grid>
            </div>
          );
        })}
      </Layout>
    </div>
  );
}
