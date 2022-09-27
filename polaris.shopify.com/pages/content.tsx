import FoundationsIndexPage from '../src/components/FoundationsIndexPage';
import {
  FoundationsProps,
  getStaticPropsForFoundations,
} from '../src/utils/foundations';

const SECTION = 'content';

const FoundationsCategory = (props: FoundationsProps) => (
  <FoundationsIndexPage {...props} />
);

export const getStaticProps = getStaticPropsForFoundations(SECTION);

export default FoundationsCategory;
