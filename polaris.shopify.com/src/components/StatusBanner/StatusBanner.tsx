import {Status} from '../../types';
import {uppercaseFirst} from '../../utils/various';
import styles from './StatusBanner.module.scss';

interface Props {
  status: Status;
}

function StatusBanner({status: {value, message}}: Props) {
  return (
    <div className={styles.StatusBanner} data-value={value.toLowerCase()}>
      <h2>{uppercaseFirst(value)}</h2>
      <p>{message}</p>
    </div>
  );
}

export default StatusBanner;
