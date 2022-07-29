import type {ReactNode, TransitionEvent} from 'react';
import {useState, useRef, useEffect, useCallback} from 'react';

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
  /** Assign transition properties to the collapsible */
  transition?: Transition;
  /** Prevents component from re-measuring when child is updated **/
  preventMeasuringOnChildrenUpdate?: boolean;
  /** The content to display inside the collapsible. */
  children?: ReactNode;
}

type AnimationState = 'idle' | 'measuring' | 'animating';

export function Collapsible({
  id,
  expandOnPrint,
  open,
  transition,
  preventMeasuringOnChildrenUpdate,
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

  const collapsibleStyles = {
    ...(transition && {
      transitionDuration: `${transition.duration}`,
      transitionTimingFunction: `${transition.timingFunction}`,
    }),
    ...{
      maxHeight: isFullyOpen ? 'none' : `${height}px`,
      overflow: isFullyOpen ? 'visible' : 'hidden',
    },
  };

  const handleCompleteAnimation = useCallback(
    ({target}: TransitionEvent<HTMLDivElement>) => {
      if (target === collapsibleContainer.current) {
        setAnimationState('idle');
        setIsOpen(open);
      }
    },
    [open],
  );

  useEffect(() => {
    if (isFullyClosed || preventMeasuringOnChildrenUpdate) return;
    setAnimationState('measuring');
  }, [children, isFullyClosed, preventMeasuringOnChildrenUpdate]);

  useEffect(() => {
    if (open !== isOpen) {
      setAnimationState('measuring');
    }
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
