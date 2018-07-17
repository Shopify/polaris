import * as React from 'react';
import * as styles from './Backdrop.scss';

import ScrollLock from '../ScrollLock';

export interface Props {
  onClick?(): void;
}

export default function Backdrop(props: Props) {
  const {onClick} = props;

  return (
    <React.Fragment>
      <ScrollLock />
      <div className={styles.Backdrop} onClick={onClick} />
    </React.Fragment>
  );
}
