import FoundationsPage from '../src/components/FoundationsPage';
import {FoundationsProps} from '../src/components/FoundationsPage/FoundationsPage';
import {getStaticPropsForFoundations} from '../src/utils/foundations';

const SECTION = 'tools';

const FoundationsCategory = (props: FoundationsProps) => (
  <FoundationsPage {...props} />
);

export const getStaticProps = getStaticPropsForFoundations(SECTION);

export default FoundationsCategory;
