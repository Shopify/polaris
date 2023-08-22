import type {PropsWithChildren} from 'react';
import {Status} from '../../types';
import {uppercaseFirst} from '../../utils/various';
import styles from './StatusBanner.module.scss';

interface Props extends PropsWithChildren {
  status: Status;
}

function StatusBanner({status: {value, message}}: Props) {
  return (
    value && (
      <div className={styles.StatusBanner} data-value={value.toLowerCase()}>
        <h2>{uppercaseFirst(value)}</h2>
        {message}
      </div>
    )
  );
}

export default StatusBanner;
