import styles from './StatusBadge.module.scss';

interface Props {
  status: string;
}
function StatusBadge({status}: Props) {
  return (
    <div className={styles.StatusBadge} data-value={status}>
      {status}
    </div>
  );
}

export default StatusBadge;
