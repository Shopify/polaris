import ComponentGrid from '../ComponentGrid';
import Layout from '../Layout';

import siteJson from '../../../.cache/site.json';
import {
  getComponentCategories,
  stripMarkdownLinks,
  slugify,
  getComponentNav,
} from '../../utils/various';
import {Status, SiteJSON} from '../../types';
import styles from './ComponentsPage.module.scss';
import PageMeta from '../PageMeta';

const pages: SiteJSON = siteJson;

const components = Object.keys(pages).filter((slug) =>
  slug.startsWith('components/'),
);

const componentCategories = getComponentCategories();
const componentNav = getComponentNav();

export default function ComponentsPage() {
  return (
    <div className={styles.ComponentsPage}>
      <PageMeta
        title="Components"
        description="Components are reusable building blocks made of interface elements and styles, packaged through code. Piece them together, improve them, and create new ones to solve merchant problems."
      />

      <Layout navItems={componentNav} showTOC={false}>
        <h1>Components</h1>

        {componentCategories.map((category) => {
          return (
            <div key={category} className={styles.Category}>
              <h2 className={styles.CategoryName}>{category}</h2>
              <ComponentGrid>
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
                      <ComponentGrid.Item
                        key={title}
                        title={title}
                        description={stripMarkdownLinks(description)}
                        url={url}
                        status={status as Status}
                      />
                    );
                  })}
              </ComponentGrid>
            </div>
          );
        })}
      </Layout>
    </div>
  );
}
