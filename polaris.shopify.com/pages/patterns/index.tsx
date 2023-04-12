import {FoundationsProps} from '../../src/components/FoundationsPage/FoundationsPage';
import {PatternsPage} from '../../src/components/PatternsPage';
import {getStaticPropsForFoundations} from '../../src/utils/foundations';

const PatternsIndex = (props: FoundationsProps) => <PatternsPage {...props} />;

export const getStaticProps = getStaticPropsForFoundations('patterns');
export default PatternsIndex;
