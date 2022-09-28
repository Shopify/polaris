import FoundationsPage from '../src/components/FoundationsPage';
import {
  FoundationsProps,
  getStaticPropsForFoundations,
} from '../src/utils/foundations';

const SECTION = 'foundations';

const FoundationsCategory = (props: FoundationsProps) => (
  <FoundationsPage {...props} />
);

export const getStaticProps = getStaticPropsForFoundations(SECTION);

export default FoundationsCategory;
