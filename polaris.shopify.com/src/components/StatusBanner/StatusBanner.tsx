import {Status} from '../../types';
import styles from './StatusBanner.module.scss';

interface Props {
  status: Status;
}

function StatusBanner({status: {value, message}}: Props) {
  const statusValue = value.charAt(0).toUpperCase() + value.slice(1);
  return (
    <div className={styles.StatusBanner} data-value={value.toLowerCase()}>
      <h2>{statusValue}</h2>
      <p>{message}</p>
    </div>
  );
}

export default StatusBanner;
