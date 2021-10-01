import React, {useCallback, useEffect} from 'react';
import debounce from 'lodash/debounce';

import styles from './ScrollContainer.scss';

export interface ScrollContainerProps {
  children: React.ReactNode;
  scrollableContainerRef: React.RefObject<HTMLDivElement>;
  onScroll(canScrollLeft: boolean, canScrollRight: boolean): void;
}

export function ScrollContainer({
  children,
  scrollableContainerRef,
  onScroll,
}: ScrollContainerProps) {
  useEffect(() => {
    if (!scrollableContainerRef.current) return;
    scrollableContainerRef.current.dispatchEvent(new Event('scroll'));
  }, [scrollableContainerRef]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = useCallback(
    debounce(
      () => {
        if (!scrollableContainerRef.current) {
          return;
        }

        const availableScrollAmount =
          scrollableContainerRef.current.scrollWidth -
          scrollableContainerRef.current.offsetWidth;

        const canScrollLeft = scrollableContainerRef.current.scrollLeft > 0;
        const canScrollRight =
          scrollableContainerRef.current.scrollLeft < availableScrollAmount;
        onScroll(canScrollLeft, canScrollRight);
      },
      40,
      {trailing: true, leading: true, maxWait: 40},
    ),
    [onScroll, scrollableContainerRef],
  );

  return (
    <div
      className={styles.ScrollContainer}
      ref={scrollableContainerRef}
      onScroll={handleScroll}
    >
      {children}
    </div>
  );
}
