import React, {useState, useRef, useEffect, useCallback} from 'react';
import type {ReactNode, TransitionEvent} from 'react';
import type {MotionDurationScale} from '@shopify/polaris-tokens';

import {classNames} from '../../utilities/css';

import styles from './Collapsible.module.css';

interface Transition {
  /** Expand the collpsible on render. */
  animateIn?: boolean;
  /** Assign a transition delay to the collapsible animation */
  delay?: MotionDurationScale;
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
  /** The direction the collapsible collapses in.
   * @default 'block'
   */
  variant?: 'block' | 'inline';
  /** Override transition properties. When set to false, disables transition completely.
   * @default transition={{duration: 'var(--p-motion-duration-150)', timingFunction: 'var(--p-motion-ease-in-out)'}}
   */
  transition?: boolean | Transition;
  /** Callback when the animation completes. */
  onAnimationEnd?(): void;
  /** The content to display inside the collapsible. */
  children?: ReactNode;
}

type AnimationState = 'idle' | 'measuring' | 'animating';

export function Collapsible({
  id,
  expandOnPrint,
  open,
  variant = 'block',
  transition = true,
  children,
  onAnimationEnd,
}: CollapsibleProps) {
  const [size, setSize] = useState(0);
  const [isOpen, setIsOpen] = useState(open);
  const collapsibleContainer = useRef<HTMLDivElement>(null);
  const animateIn = typeof transition === 'object' && transition.animateIn;
  const [animationState, setAnimationState] = useState<AnimationState>(
    animateIn ? 'measuring' : 'idle',
  );
  const isFullyOpen = animationState === 'idle' && open && isOpen;
  const isFullyClosed = animationState === 'idle' && !open && !isOpen;
  const content = expandOnPrint || !isFullyClosed ? children : null;
  const vertical = variant === 'block';

  const wrapperClassName = classNames(
    styles.Collapsible,
    isFullyClosed && styles.isFullyClosed,
    expandOnPrint && styles.expandOnPrint,
    variant === 'inline' && styles.inline,
    animateIn && styles.animateIn,
  );

  const transitionDisabled = isTransitionDisabled(transition);

  const transitionStyles = typeof transition === 'object' && {
    transitionDelay: `var(--p-motion-duration-${transition.delay})`,
    transitionDuration: transition.duration,
    transitionTimingFunction: transition.timingFunction,
  };

  const collapsibleStyles = {
    ...transitionStyles,
    ...(vertical
      ? {
          maxHeight: isFullyOpen ? 'none' : `${size}px`,
          overflow: isFullyOpen ? 'visible' : 'hidden',
        }
      : {
          maxWidth: isFullyOpen ? 'none' : `${size}px`,
          overflow: isFullyOpen ? 'visible' : 'hidden',
        }),
  };

  const handleCompleteAnimation = useCallback(
    ({target}: TransitionEvent<HTMLDivElement>) => {
      if (target === collapsibleContainer.current) {
        setAnimationState('idle');
        setIsOpen(open);
        onAnimationEnd && onAnimationEnd();
      }
    },
    [onAnimationEnd, open],
  );

  const startAnimation = useCallback(() => {
    if (transitionDisabled) {
      setIsOpen(open);
      setAnimationState('idle');

      if (open && collapsibleContainer.current) {
        setSize(
          vertical
            ? collapsibleContainer.current.scrollHeight
            : collapsibleContainer.current.scrollWidth,
        );
      } else {
        setSize(0);
      }
    } else {
      setAnimationState('measuring');
    }
  }, [open, vertical, transitionDisabled]);

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
    setSize(
      vertical
        ? collapsibleContainer.current.scrollHeight
        : collapsibleContainer.current.scrollWidth,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!collapsibleContainer.current) return;

    switch (animationState) {
      case 'idle':
        break;
      case 'measuring':
        setSize(
          vertical
            ? collapsibleContainer.current.scrollHeight
            : collapsibleContainer.current.scrollWidth,
        );
        setAnimationState('animating');
        break;
      case 'animating':
        setSize(
          // eslint-disable-next-line no-nested-ternary
          open
            ? vertical
              ? collapsibleContainer.current.scrollHeight
              : collapsibleContainer.current.scrollWidth
            : 0,
        );
    }
  }, [animationState, vertical, open, isOpen]);

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

const zeroDurationRegex = /^0(ms|s)$/;

function isTransitionDisabled(transitionProp: Transition | boolean) {
  if (typeof transitionProp === 'boolean') {
    return !transitionProp;
  }

  const {duration} = transitionProp;
  if (duration && zeroDurationRegex.test(duration.trim())) {
    return true;
  }
  return false;
}
