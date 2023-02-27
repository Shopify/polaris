import {useEffect, useRef, useState} from 'react';
import type {RefObject} from 'react';

import {debounce} from '../../../../utilities/debounce';
import type {IndexFiltersMode} from '../useSetIndexFiltersMode';

const DEBOUNCE_PERIOD = 250;

export function useIsSticky(
  mode: IndexFiltersMode,
  disabled: boolean,
  isFlushWhenSticky: boolean,
) {
  const hasIOSupport =
    typeof window !== 'undefined' && Boolean(window.IntersectionObserver);

  const options = {
    root: null,
    rootMargin: `${isFlushWhenSticky ? '0px' : '-56px'} 0px 0px 0px`,
    threshold: 0,
  };

  const [indexFilteringHeight, setIndexFiltersHeight] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const measurerRef = useRef<HTMLDivElement>(null);
  const intersectionRef = useRef<HTMLDivElement>(null);

  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      setIsSticky(!entry.isIntersecting);
    });
  };

  const observerRef = useRef<IntersectionObserver | null>(
    hasIOSupport ? new IntersectionObserver(handleIntersect, options) : null,
  );

  useEffect(() => {
    function computeDimensions() {
      const node = measurerRef.current;
      if (!node) {
        return {
          height: 0,
        };
      }
      const box = node.getBoundingClientRect();

      const height = box.height;

      setIndexFiltersHeight(height);
    }

    computeDimensions();

    const debouncedComputeDimensions = debounce(
      computeDimensions,
      DEBOUNCE_PERIOD,
      {
        trailing: true,
      },
    );

    window.addEventListener('resize', debouncedComputeDimensions);

    return () =>
      window.removeEventListener('resize', debouncedComputeDimensions);
  }, [measurerRef, mode]);

  useEffect(() => {
    const observer = observerRef.current;
    if (!observer) {
      return;
    }

    const node = intersectionRef.current;

    if (node) {
      observer.observe(node);
    }

    return () => {
      observer?.disconnect();
    };
  }, [intersectionRef]);

  return {
    intersectionRef: intersectionRef as RefObject<HTMLDivElement>,
    measurerRef,
    isSticky: isSticky && !disabled,
    indexFilteringHeight,
  };
}
