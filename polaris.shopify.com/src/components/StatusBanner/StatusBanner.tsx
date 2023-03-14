import styles from './StatusBanner.module.scss';
import Markdown from '../Markdown';

interface Props {
  status: {
    status: string;
    message: string;
  };
}

function StatusBanner({status: {status, message}}: Props) {
  return (
    <div className={styles.StatusBanner} data-value={status}>
      <h2>{status}</h2>
      <Markdown>{message}</Markdown>
    </div>
  );
}

export default StatusBanner;
