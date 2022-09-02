import styles from './FoundationsIndexPage.module.scss';
import Layout from '../Layout';
import PageMeta from '../PageMeta';
import FoundationsGrid from '../FoundationsGrid';
import {NavItem} from '../../types';

import navJson from '../../../.cache/nav.json';
const nav: NavItem[] = navJson;
const foundationsNavItems = nav.find(
  (item) => item.slug === '/foundations',
)?.children;

function FoundationsIndexPage({}) {
  return (
    <div className={styles.FoundationsIndexPage}>
      <PageMeta
        title="Foundations"
        description="Our design foundations offer fundamental design elements and guidance for creating good merchant experiences."
      />

      <Layout
        title="Foundations"
        navItems={foundationsNavItems}
        showTOC={false}
      >
        <div className={styles.Categories}>
          {foundationsNavItems?.map((navItem) => {
            if (!navItem.children) return null;
            return (
              <FoundationsGrid key={navItem.title} title={navItem.title}>
                {navItem.children.map((child) => {
                  if (!child.slug) return null;
                  return (
                    <FoundationsGrid.Item
                      key={navItem.title}
                      title={child.title}
                      description={child.description}
                      icon={child.icon}
                      url={child.slug}
                      category={navItem.title.toLowerCase()}
                    />
                  );
                })}
              </FoundationsGrid>
            );
          })}
        </div>
      </Layout>
    </div>
  );
}

export default FoundationsIndexPage;
