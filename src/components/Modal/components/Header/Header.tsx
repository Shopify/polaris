import * as React from 'react';

import DisplayText from '../../../DisplayText';
import CloseButton from '../CloseButton';

import styles from './Header.scss';

export interface Props {
  id: string;
  children?: React.ReactNode;
  onClose(): void;
}

export default function Header({id, children, onClose}: Props) {
  return (
    <div className={styles.Header}>
      <div id={id} className={styles.Title}>
        <DisplayText element="h2" size="small">
          {children}
        </DisplayText>
      </div>

      <CloseButton onClick={onClose} />
    </div>
  );
}
