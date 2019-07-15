import React, {useRef, useState, useEffect, useCallback} from 'react';
import {
  addEventListener,
  removeEventListener,
} from '@shopify/javascript-utilities/events';
import {durationSlow} from '@shopify/polaris-tokens';
import {classNames} from '../../utilities/css';

import styles from './Collapsible.scss';

export interface Props {
  /** Assign a unique ID to the collapsible. For accessibility, pass this ID as the value of the triggering component’s aria-controls prop. */
  id: string;
  /** Toggle whether the collapsible is expanded or not. */
  open: boolean;
  /** The content to display inside the collapsible. */
  children?: React.ReactNode;
}

enum TransitionStatus {
  Entering = 'entering',
  Entered = 'entered',
  Exiting = 'exiting',
  Exited = 'exited',
}

const CSS_VAR_COLLAPSIBLE_HEIGHT = '--polaris-collapsible-height';
const CSS_VAR_COLLAPSIBLE_TRANSITION_DURATION =
  '--polaris-collapsible-transition-duration';

export default function Collapsible({id, open, children}: Props) {
  const [height, setHeight] = useState<number | null>(null);
  const [transitionStatus, setTransitionStatus] = useState(
    open ? TransitionStatus.Entering : TransitionStatus.Exited,
  );
  const isMounted = useRef(false);
  const node = useRef<HTMLDivElement>(null);

  const handleResize = useCallback(() => {
    if (node.current == null) return;

    setHeight(node.current.scrollHeight);
  }, []);

  useEffect(
    () => {
      if (!isMounted.current) return;
      transitionStatus === TransitionStatus.Entering &&
        changeTransitionStatus(TransitionStatus.Entered);

      transitionStatus === TransitionStatus.Exiting &&
        setTimeout(() => {
          changeTransitionStatus(TransitionStatus.Exited);
        }, durationSlow);
    },
    [transitionStatus],
  );

  useEffect(
    () => {
      if (!isMounted.current) return;
      open && changeTransitionStatus(TransitionStatus.Entered);
      !open && changeTransitionStatus(TransitionStatus.Exiting);
    },
    [open],
  );

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

  // Hooks always execute in the same sequence. It's
  // important this hooks runs after the animation effects
  useEffect(() => {
    isMounted.current = true;
  }, []);

  const wrapperClassName = classNames(styles.Collapsible, open && styles.open);

  const content =
    transitionStatus === TransitionStatus.Exited && !open ? null : children;

  return (
    <div id={id} aria-hidden={!open} className={wrapperClassName} ref={node}>
      <div>{content}</div>
    </div>
  );

  function changeTransitionStatus(transitionStatus: TransitionStatus) {
    setTransitionStatus(transitionStatus);
    // Forcing a reflow to enable the animation
    if (transitionStatus === TransitionStatus.Entering)
      node.current && node.current.getBoundingClientRect();
  }
}
