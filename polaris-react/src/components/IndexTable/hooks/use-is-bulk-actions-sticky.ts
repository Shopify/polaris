import {useEffect, useRef, useState} from 'react';

import {debounce} from '../../../utilities/debounce';

const DEBOUNCE_PERIOD = 250;

export function useIsBulkActionsSticky() {
  const [isBulkActionsSticky, setIsSticky] = useState(false);
  const [bulkActionsAbsoluteOffset, setBulkActionsAbsoluteOffset] = useState(0);
  const bulkActionsIntersectionRef = useRef<HTMLDivElement>(null);
  const tableMeasurerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function computeTableHeight() {
      const node = tableMeasurerRef.current;
      if (!node) {
        return 0;
      }
      return node.getBoundingClientRect().height;
    }
    const tableHeight = computeTableHeight();

    const debouncedComputeTableHeight = debounce(
      computeTableHeight,
      DEBOUNCE_PERIOD,
      {
        trailing: true,
      },
    );

    setBulkActionsAbsoluteOffset(tableHeight);

    window.addEventListener('resize', debouncedComputeTableHeight);

    return () =>
      window.removeEventListener('resize', debouncedComputeTableHeight);
  }, [tableMeasurerRef]);

  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        setIsSticky(!entry.isIntersecting);
      });
    };

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    };
    const observer = new IntersectionObserver(handleIntersect, options);

    const node = bulkActionsIntersectionRef.current;

    if (node) {
      observer.observe(node);
    }

    return () => {
      observer.disconnect();
    };
  }, [bulkActionsIntersectionRef]);

  return {
    bulkActionsIntersectionRef,
    tableMeasurerRef,
    isBulkActionsSticky,
    bulkActionsAbsoluteOffset,
  };
}
