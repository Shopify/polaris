import type {PropsWithChildren} from 'react';
import {Status} from '../../types';
import {uppercaseFirst} from '../../utils/various';
import styles from './StatusBanner.module.scss';
import Markdown from '../Markdown';

interface Props extends PropsWithChildren {
  status: Status;
}

function StatusBanner({status: {value, message, mdx}}: Props) {
  return (
    value && (
      <div className={styles.StatusBanner} data-value={value.toLowerCase()}>
        <h2>{uppercaseFirst(value)}</h2>
        {mdx ? <Markdown {...mdx} /> : message}
      </div>
    )
  );
}

export default StatusBanner;
