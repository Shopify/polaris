import type {PropsWithChildren} from 'react';
import {Status, StatusToneMapping} from '../../types';
import {
  uppercaseFirst,
  className as classNames,
  variationName,
} from '../../utils/various';
import styles from './StatusBanner.module.scss';

interface Props extends PropsWithChildren {
  status: Status;
}

function StatusBanner({status, children}: Props) {
  const className = classNames(
    styles.StatusBanner,
    styles[variationName('tone', StatusToneMapping[status])],
  );

  return (
    status && (
      <div className={className}>
        <h2>{uppercaseFirst(status)}</h2>
        {children}
      </div>
    )
  );
}

export default StatusBanner;
