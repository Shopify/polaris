import React, {useState, useRef, useEffect} from 'react';

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
  /** The content to display inside the collapsible. */
  children?: React.ReactNode;
}

export function Collapsible({
  id,
  expandOnPrint,
  open,
  transition,
  children,
}: CollapsibleProps) {
  const [height, setHeight] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(open);
  const collapisbleContainer = useRef<HTMLDivElement>(null);

  const wrapperClassName = classNames(
    styles.Collapsible,
    expandOnPrint && styles.expandOnPrint,
    isOpen && styles.open,
    height && styles.animating,
  );

  const collapsibleStyles = {
    ...(transition && {
      transitionDuration: `${transition.duration}`,
      transitionTimingFunction: `${transition.timingFunction}`,
    }),
    ...(typeof height === 'number' && {
      height: `${height}px`,
      overflow: 'hidden',
    }),
  };

  // Measure the child height for open and close
  useEffect(() => {
    if (open === isOpen || !collapisbleContainer.current) {
      return;
    }

    setHeight(collapisbleContainer.current.scrollHeight);
  }, [open, isOpen]);

  // If closing, set the height zero on the next render
  useEffect(() => {
    if (open || height === null || !collapisbleContainer.current) {
      return;
    }

    getComputedStyle(collapisbleContainer.current).height;
    setHeight(0);
  }, [height, open]);

  // When animation is complete clean up
  const handleCompleteAnimation = () => {
    setHeight(null);
    setIsOpen(open);
  };

  return (
    <div
      id={id}
      style={collapsibleStyles}
      className={wrapperClassName}
      onTransitionEnd={() => handleCompleteAnimation()}
      ref={collapisbleContainer}
      aria-hidden={!open && !isOpen}
    >
      {children}
    </div>
  );
}
