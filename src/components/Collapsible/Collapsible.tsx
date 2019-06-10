import React, {useRef, useState, useEffect, useCallback} from 'react';
import {
  addEventListener,
  removeEventListener,
} from '@shopify/javascript-utilities/events';
import {durationSlow} from '@shopify/polaris-tokens';
import {classNames} from '../../utilities/css';
import {withAppProvider} from '../../utilities/with-app-provider';

import styles from './Collapsible.scss';

export interface Props {
  /** Assign a unique ID to the collapsible. For accessibility, pass this ID as the value of the triggering component’s aria-controls prop. */
  id: string;
  /** Toggle whether the collapsible is expanded or not. */
  open: boolean;
  /** The content to display inside the collapsible. */
  children?: React.ReactNode;
}

const CSS_VAR_COLLAPSIBLE_HEIGHT = '--polaris-collapsible-height';
const CSS_VAR_COLLAPSIBLE_TRANSITION_DURATION =
  '--polaris-collapsible-transition-duration';

function Collapsible({id, open, children}: Props) {
  const [height, setHeight] = useState<number | null>(null);
  const node = useRef<HTMLDivElement>(null);

  const handleResize = useCallback(() => {
    if (node.current == null) return;

    setHeight(node.current.scrollHeight);
  }, []);

  useEffect(
    () => {
      const ref = node.current;
      if (ref == null) return;

      setHeight(ref.scrollHeight);
      addEventListener(ref, 'resize', handleResize);

      return () => {
        if (ref == null) return;

        removeEventListener(ref, 'resize', handleResize);
      };
    },
    [handleResize, open],
  );

  useEffect(
    () => {
      if (!node.current) return;

      node.current.style.setProperty(
        CSS_VAR_COLLAPSIBLE_HEIGHT,
        `${height || 0}px`,
      );
      node.current.style.setProperty(
        CSS_VAR_COLLAPSIBLE_TRANSITION_DURATION,
        `${durationSlow}ms`,
      );
    },
    [height],
  );

  const wrapperClassName = classNames(styles.Collapsible, open && styles.open);

  return (
    <div id={id} aria-hidden={!open} className={wrapperClassName} ref={node}>
      <div>{children}</div>
    </div>
  );
}

export default withAppProvider<Props>()(Collapsible);
