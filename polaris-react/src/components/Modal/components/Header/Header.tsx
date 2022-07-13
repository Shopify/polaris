import React from 'react';

// eslint-disable-next-line import/no-deprecated
import {DisplayText} from '../../../DisplayText';
import {CloseButton} from '../CloseButton';

import styles from './Header.scss';

export interface HeaderProps {
  id: string;
  titleHidden: boolean;
  children?: React.ReactNode;
  onClose(): void;
}

export function Header({id, titleHidden, children, onClose}: HeaderProps) {
  return (
    <div
      className={titleHidden || !children ? styles.titleHidden : styles.Header}
    >
      <div id={id} className={styles.Title}>
        <DisplayText element="h2" size="small">
          {children}
        </DisplayText>
      </div>
      <CloseButton titleHidden={titleHidden} onClick={onClose} />
    </div>
  );
}
