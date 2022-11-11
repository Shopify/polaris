import React from 'react';

import {Text} from '../../../Text';
import {CloseButton} from '../CloseButton';

import styles from './Header.scss';

export interface HeaderProps {
  id: string;
  titleHidden: boolean;
  closing: boolean;
  children?: React.ReactNode;
  onClose(): void;
}

export function Header({
  id,
  titleHidden,
  closing,
  children,
  onClose,
}: HeaderProps) {
  return (
    <div
      className={titleHidden || !children ? styles.titleHidden : styles.Header}
    >
      <div id={id} className={styles.Title}>
        <Text as="h2" variant="headingLg">
          {children}
        </Text>
      </div>
      <CloseButton
        pressed={closing}
        titleHidden={titleHidden}
        onClick={onClose}
      />
    </div>
  );
}
