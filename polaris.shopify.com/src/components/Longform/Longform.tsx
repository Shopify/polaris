import {className} from '../../utils/various';
import styles from './Longform.module.scss';

interface Props {
  firstParagraphIsLede?: boolean;
  children: React.ReactNode;
}

function Longform({firstParagraphIsLede = true, children}: Props) {
  return (
    <div className={styles.Longform}>
      <div
        className={className(
          styles.Content,
          firstParagraphIsLede && styles.firstParagraphIsLede,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default Longform;
