import {useEffect, useRef, useState} from 'react';

import {debounce} from '../../../utilities/debounce';

const DEBOUNCE_PERIOD = 250;

const PADDING_IN_SELECT_MODE = 100;

export function useIsBulkActionsSticky(selectMode: boolean) {
  const [isBulkActionsSticky, setIsSticky] = useState(false);
  const [bulkActionsAbsoluteOffset, setBulkActionsAbsoluteOffset] = useState(0);
  const [bulkActionsMaxWidth, setBulkActionsMaxWidth] = useState(0);
  const [bulkActionsOffsetLeft, setBulkActionsOffsetLeft] = useState(0);
  const bulkActionsIntersectionRef = useRef<HTMLDivElement>(null);
  const tableMeasurerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function computeTableDimensions() {
      const node = tableMeasurerRef.current;
      if (!node) {
        return {
          maxWidth: 0,
          offsetHeight: 0,
          offsetLeft: 0,
        };
      }
      const box = node.getBoundingClientRect();
      const paddingHeight = selectMode ? PADDING_IN_SELECT_MODE : 0;
      const offsetHeight = box.height - paddingHeight;
      const maxWidth = box.width;
      const offsetLeft = box.left;

      return {
        offsetHeight,
        offsetLeft,
        maxWidth,
      };
    }
    const {offsetHeight, offsetLeft, maxWidth} = computeTableDimensions();

    const debouncedComputeTableHeight = debounce(
      computeTableDimensions,
      DEBOUNCE_PERIOD,
      {
        trailing: true,
      },
    );

    setBulkActionsAbsoluteOffset(offsetHeight);
    setBulkActionsMaxWidth(maxWidth);
    setBulkActionsOffsetLeft(offsetLeft);

    window.addEventListener('resize', debouncedComputeTableHeight);

    return () =>
      window.removeEventListener('resize', debouncedComputeTableHeight);
  }, [tableMeasurerRef, selectMode]);

  useEffect(() => {
    const hasIOSupport = Boolean(window.IntersectionObserver);
    if (!hasIOSupport) {
      return;
    }
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
    bulkActionsMaxWidth,
    bulkActionsOffsetLeft,
  };
}
