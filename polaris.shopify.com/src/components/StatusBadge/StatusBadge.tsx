import {Status} from '../../types';
import styles from './StatusBadge.module.scss';

interface Props {
  status: Status;
}
function StatusBadge({status: {value}}: Props) {
  return (
    <div className={styles.StatusBadge} data-value={value.toLowerCase()}>
      {value}
    </div>
  );
}

export default StatusBadge;
