import {Box} from '../../../Box';
import styles from '../../Popover.scss';

export interface SectionProps {
  children?: React.ReactNode;
}

export function Section({children}: SectionProps) {
  return (
    <div className={styles.Section}>
      <Box padding="4">{children}</Box>
    </div>
  );
}
