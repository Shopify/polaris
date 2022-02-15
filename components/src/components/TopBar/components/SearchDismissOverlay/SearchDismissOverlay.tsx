import React, {useCallback, useRef} from 'react';

import {ScrollLock} from '../../../ScrollLock';
import {classNames} from '../../../../utilities/css';

import styles from './SearchDismissOverlay.scss';

interface Props {
  /** Callback when the search is dismissed */
  onDismiss?(): void;
  /** Determines whether the overlay should be visible */
  visible: boolean;
}

export function SearchDismissOverlay({onDismiss, visible}: Props) {
  const node = useRef<HTMLDivElement>(null);

  const handleDismiss = useCallback(
    ({target}: React.MouseEvent<HTMLDivElement>) => {
      if (target === node.current && onDismiss != null) {
        onDismiss();
      }
    },
    [onDismiss],
  );

  return (
    <>
      {visible ? <ScrollLock /> : null}
      <div
        ref={node}
        className={classNames(
          styles.SearchDismissOverlay,
          visible && styles.visible,
        )}
        onClick={handleDismiss}
      />
    </>
  );
}
