import type {ReactNode} from 'react';
import {useRef, useState, useEffect} from 'react';

import {classNames, variationName} from '../../../../utilities/css';

import styles from './CSSAnimation.scss';

type AnimationType = 'fade';

export interface CSSAnimationProps {
  in: boolean;
  className: string;
  type: AnimationType;
  children?: ReactNode;
}

enum TransitionStatus {
  Entering = 'entering',
  Entered = 'entered',
  Exiting = 'exiting',
  Exited = 'exited',
}

export function CSSAnimation({
  in: inProp,
  className,
  type,
  children,
}: CSSAnimationProps) {
  const [transitionStatus, setTransitionStatus] = useState(
    inProp ? TransitionStatus.Entering : TransitionStatus.Exited,
  );
  const isMounted = useRef(false);
  const node = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMounted.current) return;
    transitionStatus === TransitionStatus.Entering &&
      changeTransitionStatus(TransitionStatus.Entered);
  }, [transitionStatus]);

  useEffect(() => {
    if (!isMounted.current) return;
    inProp && changeTransitionStatus(TransitionStatus.Entering);
    !inProp && changeTransitionStatus(TransitionStatus.Exiting);
  }, [inProp]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  const wrapperClassName = classNames(
    className,
    styles[variationName('start', type)],
    inProp && styles[variationName('end', type)],
  );

  const content =
    transitionStatus === TransitionStatus.Exited && !inProp ? null : children;

  return (
    <div
      className={wrapperClassName}
      ref={node}
      onTransitionEnd={handleTransitionEnd}
    >
      {content}
    </div>
  );

  function handleTransitionEnd() {
    transitionStatus === TransitionStatus.Exiting &&
      changeTransitionStatus(TransitionStatus.Exited);
  }

  function changeTransitionStatus(transitionStatus: TransitionStatus) {
    setTransitionStatus(transitionStatus);
    // Forcing a reflow to enable the animation
    if (transitionStatus === TransitionStatus.Entering)
      node.current && node.current.getBoundingClientRect();
  }
}
