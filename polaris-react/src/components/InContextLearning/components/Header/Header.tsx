import React from 'react';

import {Heading} from '../../../Heading';
import {CloseButton} from '../CloseButton';

import styles from './Header.scss';

export interface HeaderProps {
  titleHidden?: boolean;
  title?: string;
  onDismiss(): void;
}

export function Header({titleHidden, title, onDismiss}: HeaderProps) {
  return (
    <div className={!titleHidden || title ? styles.Header : ''}>
      {!titleHidden && (
        <div className={styles.Title}>
          <Heading>{title}</Heading>
        </div>
      )}
      <CloseButton onDismiss={onDismiss} title={title} />
    </div>
  );
}
