import type {ReactNode} from 'react';

// eslint-disable-next-line import/no-deprecated
import {CustomProperties} from '../../../CustomProperties';
import {classNames} from '../../../../utilities/css';
import {SearchDismissOverlay} from '../SearchDismissOverlay';

import styles from './Search.scss';

export interface SearchProps {
  /** Toggles whether or not the search is visible */
  visible?: boolean;
  /** The content to display inside the search */
  children?: ReactNode;
  /** Whether or not the search results overlay has a visible backdrop */
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

  const overlayMarkup = visible ? (
    <SearchDismissOverlay onDismiss={onDismiss} visible={overlayVisible} />
  ) : null;

  return (
    <>
      {overlayMarkup}
      <div className={classNames(styles.Search, visible && styles.visible)}>
        <CustomProperties colorScheme="dark">
          <div className={styles.SearchContent}>
            <div className={styles.Results}>{children}</div>
          </div>
        </CustomProperties>
      </div>
    </>
  );
}
