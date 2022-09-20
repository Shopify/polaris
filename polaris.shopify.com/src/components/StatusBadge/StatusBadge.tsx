import {Status} from '../../types';
import styles from './StatusBadge.module.scss';

interface Props {
  status: Status;
}
function StatusBadge({status: {value, message}}: Props) {
  return (
    <div className={styles.StatusBadge} data-value={value.toLowerCase()}>
      {message}
    </div>
  );
}

export default StatusBadge;
