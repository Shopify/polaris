import React from 'react';

import {Text} from '../../../Text';
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
        <Text as="h2" variant="headingXl">
          {children}
        </Text>
      </div>
      <CloseButton titleHidden={titleHidden} onClick={onClose} />
    </div>
  );
}
