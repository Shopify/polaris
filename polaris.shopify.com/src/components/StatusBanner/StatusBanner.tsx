import type {PropsWithChildren} from 'react';
import {StatusName} from '../../types';
import {uppercaseFirst} from '../../utils/various';
import styles from './StatusBanner.module.scss';

interface Props extends PropsWithChildren {
  status: StatusName;
}

function StatusBanner({status, children}: Props) {
  return (
    status && (
      <div className={styles.StatusBanner} data-value={status.toLowerCase()}>
        <h2>
          {uppercaseFirst(status)}
          {status === 'Internal' ? ' only' : null}
        </h2>
        {children}
      </div>
    )
  );
}

export default StatusBanner;
