import {Status} from '../../types';
import styles from './StatusBadge.module.scss';

interface Props {
  status: Status;
}
function StatusBadge({status}: Props) {
  return (
    <div className={styles.StatusBadge} data-value={status.toLowerCase()}>
      {status}
    </div>
  );
}

export default StatusBadge;
