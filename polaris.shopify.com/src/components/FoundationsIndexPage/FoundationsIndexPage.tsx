import Layout from '../Layout';
import PageMeta from '../PageMeta';
import FoundationsGrid from '../FoundationsGrid';
import {FoundationsGridItemProps} from '../FoundationsGrid/FoundationsGrid';
import styles from './FoundationsIndexPage.module.scss';

interface Props {
  title: string;
  items: FoundationsGridItemProps[];
}

function FoundationsIndexPage({title, items}: Props) {
  return (
    <div className={styles.FoundationsIndexPage}>
      <PageMeta description="Our design foundations offer fundamental design elements and guidance for creating good merchant experiences." />

      <Layout title={title} showTOC={false}>
        <FoundationsGrid key={title}>
          {items.map((item) => {
            if (!item.url) return null;
            return (
              <FoundationsGrid.Item
                key={item.title}
                title={item.title}
                description={item.description}
                icon={item.icon}
                url={item.url}
                category={item.category.toLowerCase()}
              />
            );
          })}
        </FoundationsGrid>
      </Layout>
    </div>
  );
}

export default FoundationsIndexPage;
