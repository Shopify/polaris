import {useEffect, useRef, useState, useCallback} from 'react';

import {debounce} from '../../../utilities/debounce';

const DEBOUNCE_PERIOD = 250;

const PADDING_IN_SELECT_MODE = 37;

export function useIsSelectAllActionsSticky(selectMode: boolean) {
  const hasIOSupport =
    typeof window !== 'undefined' && Boolean(window.IntersectionObserver);
  const [isSelectAllActionsSticky, setIsSticky] = useState(false);
  const [selectAllActionsAbsoluteOffset, setSelectAllActionsAbsoluteOffset] =
    useState(0);
  const [selectAllActionsMaxWidth, setSelectAllActionsMaxWidth] = useState(0);
  const [selectAllActionsOffsetLeft, setSelectAllActionsOffsetLeft] =
    useState(0);
  const selectAllActionsIntersectionRef = useRef<HTMLDivElement>(null);
  const tableMeasurerRef = useRef<HTMLDivElement>(null);

  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      setIsSticky(!entry.isIntersecting);
    });
  };

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  };
  const observerRef = useRef<IntersectionObserver | null>(
    hasIOSupport ? new IntersectionObserver(handleIntersect, options) : null,
  );

  const computeTableDimensions = useCallback(() => {
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

    setSelectAllActionsAbsoluteOffset(offsetHeight);
    setSelectAllActionsMaxWidth(maxWidth);
    setSelectAllActionsOffsetLeft(offsetLeft);
  }, [selectMode]);

  useEffect(() => {
    computeTableDimensions();

    const debouncedComputeTableHeight = debounce(
      computeTableDimensions,
      DEBOUNCE_PERIOD,
      {
        trailing: true,
      },
    );

    window.addEventListener('resize', debouncedComputeTableHeight);

    return () =>
      window.removeEventListener('resize', debouncedComputeTableHeight);
  }, [computeTableDimensions]);

  useEffect(() => {
    const observer = observerRef.current;
    if (!observer) {
      return;
    }

    const node = selectAllActionsIntersectionRef.current;

    if (node) {
      observer.observe(node);
    }

    return () => {
      observer?.disconnect();
    };
  }, [selectAllActionsIntersectionRef]);

  return {
    selectAllActionsIntersectionRef,
    tableMeasurerRef,
    isSelectAllActionsSticky,
    selectAllActionsAbsoluteOffset,
    selectAllActionsMaxWidth,
    selectAllActionsOffsetLeft,
    computeTableDimensions,
  };
}
