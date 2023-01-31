import Link from 'next/link';
import {Status} from '../../types';
import {uppercaseFirst} from '../../utils/various';
import styles from './StatusBanner.module.scss';

interface Props {
  status: Status;
}

function StatusBanner({status: {value, message, linkText, url}}: Props) {
  return (
    <div className={styles.StatusBanner} data-value={value.toLowerCase()}>
      <h2>{uppercaseFirst(value)}</h2>
      <p>
        {message} {linkText && url && <Link href={url}>{linkText}</Link>}
      </p>
    </div>
  );
}

export default StatusBanner;
