import React from 'react';

import DisplayText from '../../../DisplayText';
import {CloseButton} from '../CloseButton';

import styles from './Header.scss';

export interface HeaderProps {
  id: string;
  children?: React.ReactNode;
  onClose(): void;
}

export function Header({id, children, onClose}: HeaderProps) {
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
