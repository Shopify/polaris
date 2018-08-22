import * as React from 'react';
import * as styles from './Backdrop.scss';

import ScrollLock from '../ScrollLock';

export interface Props {
  onClick?(): void;
  onTouchStart?(): void;
}

export default function Backdrop(props: Props) {
  const {onClick, onTouchStart} = props;

  return (
    <React.Fragment>
      <ScrollLock />
      <div
        className={styles.Backdrop}
        onClick={onClick}
        testID="Backdrop"
        onTouchStart={onTouchStart}
      />
    </React.Fragment>
  );
}
