import {useCallback, useEffect, useRef, useState} from 'react';
import type {ReactNode} from 'react';
import {classNames} from '@shopify/css-utilities';

import styles from './ScrollFeedback.scss';

interface ScrollFeedbackProps {
  children?: ReactNode;
}

export function ScrollFeedback({children}: ScrollFeedbackProps) {
  const [topShadow, setTopShadow] = useState(false);
  const [bottomShadow, setBottomShadow] = useState(false);

  const scrollfeedbackRef = useRef<HTMLDivElement>(null);

  const finalClassName = classNames(
    styles.ScrollFeedback,
    topShadow && styles.hasTopShadow,
    bottomShadow && styles.hasBottomShadow,
  );

  const handleShadows = useCallback((element: Element) => {
    const {scrollTop, scrollHeight, clientHeight} = element;

    const top = Math.ceil(scrollTop);

    if (top === 0) {
      setTopShadow(false);
    }
    if (top > 0) {
      setTopShadow(true);
    }

    if (scrollHeight <= top + clientHeight) {
      setBottomShadow(false);
    }

    if (scrollHeight > top + clientHeight) {
      setBottomShadow(true);
    }
  }, []);

  useEffect(() => {
    if (scrollfeedbackRef == null || scrollfeedbackRef.current == null) {
      return;
    }

    const scrollContainer = scrollfeedbackRef.current;

    if (scrollContainer.children.length !== 1) {
      return;
    }
    const [scrollContainerChild] = scrollContainer.children;

    if (scrollContainerChild == null) {
      return;
    }
    handleShadows(scrollContainerChild);

    const handleScroll = (event: Event) => {
      if (event.target == null) {
        return;
      }
      const target = event.target as Element;
      handleShadows(target);
    };
    scrollContainerChild.addEventListener('scroll', handleScroll);

    return () => {
      if (scrollfeedbackRef == null || scrollContainer == null) {
        return;
      }
      scrollContainerChild.removeEventListener('scroll', handleScroll);
    };
  }, [handleShadows]);

  return (
    <div className={finalClassName} ref={scrollfeedbackRef}>
      {children}
    </div>
  );
}
