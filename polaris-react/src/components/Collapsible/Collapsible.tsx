import React, {useState, useRef, useEffect, useCallback} from 'react';

import {classNames} from '../../utilities/css';

import styles from './Collapsible.scss';

interface Transition {
  /** Assign a transition duration to the collapsible animation. */
  duration?: string;
  /** Assign a transition timing function to the collapsible animation */
  timingFunction?: string;
}

export interface CollapsibleProps {
  /** Assign a unique ID to the collapsible. For accessibility, pass this ID as the value of the triggering component’s aria-controls prop. */
  id: string;
  /** Option to show collapsible content when printing */
  expandOnPrint?: boolean;
  /** Toggle whether the collapsible is expanded or not. */
  open: boolean;
  /** Assign transition properties to the collapsible. Defaults to true. */
  transition?: boolean | Transition;
  /** Set to true to disable the animation. Defaults to false. */
  /** @deprecated Re-measuring is no longer necessary on children update **/
  preventMeasuringOnChildrenUpdate?: boolean;
  /** The content to display inside the collapsible. */
  children?: React.ReactNode;
}

type AnimationState = 'idle' | 'measuring' | 'animating';

export function Collapsible({
  id,
  expandOnPrint,
  open,
  transition = true,
  preventMeasuringOnChildrenUpdate: _preventMeasuringOnChildrenUpdate,
  children,
}: CollapsibleProps) {
  const [height, setHeight] = useState(0);
  const [isOpen, setIsOpen] = useState(open);
  const [animationState, setAnimationState] = useState<AnimationState>('idle');
  const collapsibleContainer = useRef<HTMLDivElement>(null);

  const isFullyOpen = animationState === 'idle' && open && isOpen;
  const isFullyClosed = animationState === 'idle' && !open && !isOpen;
  const content = expandOnPrint || !isFullyClosed ? children : null;

  const wrapperClassName = classNames(
    styles.Collapsible,
    isFullyClosed && styles.isFullyClosed,
    expandOnPrint && styles.expandOnPrint,
  );

  const transitionDisabled = transition === false;

  const transitionStyles = typeof transition === 'object' && {
    transitionDuration: transition.duration,
    transitionTimingFunction: transition.timingFunction,
  };
  const collapsibleStyles = {
    ...transitionStyles,
    ...{
      maxHeight: isFullyOpen ? 'none' : `${height}px`,
      overflow: isFullyOpen ? 'visible' : 'hidden',
    },
  };

  const handleCompleteAnimation = useCallback(
    ({target}: React.TransitionEvent<HTMLDivElement>) => {
      if (target === collapsibleContainer.current) {
        setAnimationState('idle');
        setIsOpen(open);
      }
    },
    [open],
  );

  const startAnimation = useCallback(() => {
    if (transitionDisabled) {
      setIsOpen(open);
      setAnimationState('idle');

      if (open && collapsibleContainer.current) {
        setHeight(collapsibleContainer.current.scrollHeight);
      } else {
        setHeight(0);
      }
    } else {
      setAnimationState('measuring');
    }
  }, [open, transitionDisabled]);

  useEffect(() => {
    if (open !== isOpen) {
      startAnimation();
    }
    // startAnimation should only be fired if the open state changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, isOpen]);

  useEffect(() => {
    if (!open || !collapsibleContainer.current) return;
    // If collapsible defaults to open, set an initial height
    setHeight(collapsibleContainer.current.scrollHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!collapsibleContainer.current) return;

    switch (animationState) {
      case 'idle':
        break;
      case 'measuring':
        setHeight(collapsibleContainer.current.scrollHeight);
        setAnimationState('animating');
        break;
      case 'animating':
        setHeight(open ? collapsibleContainer.current.scrollHeight : 0);
    }
  }, [animationState, open, isOpen]);

  return (
    <div
      id={id}
      style={collapsibleStyles}
      ref={collapsibleContainer}
      className={wrapperClassName}
      onTransitionEnd={handleCompleteAnimation}
      aria-hidden={!open}
    >
      {content}
    </div>
  );
}
