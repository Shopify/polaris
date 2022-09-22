import FoundationsIndexPage from '../src/components/FoundationsIndexPage';
import {
  FoundationsProps,
  getStaticPropsForFoundations,
} from '../src/utils/foundations';

const SECTION = 'patterns';

const FoundationsCategory = ({title, items}: FoundationsProps) => (
  <FoundationsIndexPage title={title} items={items} />
);

export const getStaticProps = getStaticPropsForFoundations(SECTION);

export default FoundationsCategory;
