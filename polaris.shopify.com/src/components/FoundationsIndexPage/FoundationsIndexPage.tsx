import {foundationsNavItems} from '../../data/navItems';
import styles from './FoundationsIndexPage.module.scss';
import Layout from '../Layout';
import PageMeta from '../PageMeta';
import FoundationsGrid from '../FoundationsGrid';

interface Props {}

function FoundationsIndexPage({}: Props) {
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
          {foundationsNavItems.map((category) => {
            if (!category.children) return null;
            return (
              <FoundationsGrid key={category.title} title={category.title}>
                {category.children.map((child) => {
                  if (!child.url) return null;
                  return (
                    <FoundationsGrid.Item
                      key={category.title}
                      title={child.title}
                      description={child.description}
                      icon={child.icon}
                      url={child.url}
                      category={category.title.toLowerCase()}
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
