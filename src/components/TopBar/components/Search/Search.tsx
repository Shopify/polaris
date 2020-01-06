import React from 'react';
import {classNames} from '../../../../utilities/css';
import {SearchDismissOverlay} from '../SearchDismissOverlay';
import styles from './Search.scss';

export interface SearchProps {
  /** Toggles whether or not the search is visible */
  visible?: boolean;
  /** The content to display inside the search */
  children?: React.ReactNode;
  /** Determines whether the dismiss overlay should be visible */
  overlayVisible?: boolean;
  /** Callback when the search is dismissed */
  onDismiss?(): void;
}

export function Search({
  visible,
  children,
  onDismiss,
  overlayVisible = false,
}: SearchProps) {
  if (children == null) {
    return null;
  }

  return (
    <div className={classNames(styles.Search, visible && styles.visible)}>
      <SearchDismissOverlay onDismiss={onDismiss} visible={overlayVisible} />
      <div className={styles.Results}>{children}</div>
    </div>
  );
}
