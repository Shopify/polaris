import {className} from '../../utils/various';
import styles from './SearchResultHighlight.module.scss';

interface Props {
  marginY?: 'outside' | 'edge';
}

function SearchResultHighlight({marginY = 'outside'}: Props) {
  return (
    <div
      className={className(
        styles.SearchResultHighlight,
        marginY === 'edge' && styles.onEdge,
      )}
    ></div>
  );
}

export default SearchResultHighlight;
