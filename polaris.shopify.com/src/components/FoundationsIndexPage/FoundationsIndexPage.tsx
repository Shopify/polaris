import Layout from '../Layout';
import PageMeta from '../PageMeta';
import FoundationsGrid from '../FoundationsGrid';
import styles from './FoundationsIndexPage.module.scss';
import {FoundationsProps} from '../../utils/foundations';
import Longform from '../Longform';

function FoundationsIndexPage({title, description, items}: FoundationsProps) {
  return (
    <div className={styles.FoundationsIndexPage}>
      <PageMeta description="Our design foundations offer fundamental design elements and guidance for creating good merchant experiences." />

      <Layout showTOC={false}>
        <Longform>
          <h1>{title}</h1>
          <p>{description}</p>
        </Longform>
        <FoundationsGrid category={title.toLowerCase()}>
          {items
            .sort((a, b) => a.title.localeCompare(b.title))
            .sort((a, b) => a.order - b.order)
            .map((item) => {
              if (!item.url) return null;
              return <FoundationsGrid.Item key={item.title} {...item} />;
            })}
        </FoundationsGrid>
      </Layout>
    </div>
  );
}

export default FoundationsIndexPage;
