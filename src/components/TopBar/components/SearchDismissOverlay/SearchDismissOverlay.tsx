import React, {useCallback, useRef} from 'react';
import {ScrollLock} from '../../../ScrollLock';
import {classNames} from '../../../../utilities/css';
import * as styles from './SearchDismissOverlay.scss';

interface Props {
  /** Callback when the search is dismissed */
  onDismiss?(): void;
  /** Determines whether the overlay should be visible */
  visible?: boolean;
}

export function SearchDismissOverlay({
  onDismiss = noop,
  visible = false,
}: Props) {
  const node = useRef(null);

  const handleDismiss = useCallback(
    ({target}: React.MouseEvent<HTMLElement>) => {
      if (target === node.current) {
        onDismiss();
      }
    },
    [onDismiss],
  );

  return (
    <React.Fragment>
      {visible ? <ScrollLock /> : null}
      <div
        ref={node}
        className={classNames(
          styles.SearchDismissOverlay,
          visible && styles.visible,
        )}
        onClick={handleDismiss}
      />
    </React.Fragment>
  );
}

function noop() {}
