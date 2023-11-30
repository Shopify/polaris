import {useEffect, useRef, useState, useCallback} from 'react';

import {debounce} from '../../../utilities/debounce';

const DEBOUNCE_PERIOD = 250;

const SELECT_ALL_ACTIONS_HEIGHT = 41;
const PAGINATION_WIDTH_OFFSET = 64;
const SCROLL_BAR_HEIGHT = 13;
const POST_SCROLL_OFFSET = 120;

export function useIsSelectAllActionsSticky(
  selectMode: boolean,
  hasPagination?: boolean,
) {
  const hasIOSupport =
    typeof window !== 'undefined' && Boolean(window.IntersectionObserver);
  const [isSelectAllActionsSticky, setIsSticky] = useState(false);
  const [isScrolledPastTop, setIsScrolledPastTop] = useState(false);
  const [selectAllActionsAbsoluteOffset, setSelectAllActionsAbsoluteOffset] =
    useState(0);
  const [selectAllActionsMaxWidth, setSelectAllActionsMaxWidth] = useState(0);
  const [selectAllActionsOffsetLeft, setSelectAllActionsOffsetLeft] =
    useState(0);
  const selectAllActionsIntersectionRef = useRef<HTMLDivElement>(null);
  const tableMeasurerRef = useRef<HTMLDivElement>(null);

  const widthOffset = hasPagination ? PAGINATION_WIDTH_OFFSET : 0;

  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      setIsSticky(!entry.isIntersecting);
    });
  };

  const handleTableIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      setIsSticky(entry.isIntersecting);
      setIsScrolledPastTop(!entry.isIntersecting);
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

  const tableOptions = {
    root: null,
    rootMargin: '0px 0px -120px 0px',
    threshold: 0,
  };
  const tableObserverRef = useRef<IntersectionObserver | null>(
    hasIOSupport
      ? new IntersectionObserver(handleTableIntersect, tableOptions)
      : null,
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
    const paddingHeight = selectMode ? SELECT_ALL_ACTIONS_HEIGHT : 0;
    const offsetHeight = box.height - paddingHeight;
    const maxWidth = box.width - widthOffset;
    const offsetLeft = box.left;

    setSelectAllActionsAbsoluteOffset(offsetHeight);
    setSelectAllActionsMaxWidth(maxWidth);
    setSelectAllActionsOffsetLeft(offsetLeft);
  }, [selectMode, widthOffset]);

  const computeDimensionsPastScroll = useCallback(() => {
    setSelectAllActionsAbsoluteOffset(79);
  }, []);

  useEffect(() => {
    if (isScrolledPastTop) {
      computeDimensionsPastScroll();
    } else {
      computeTableDimensions();
    }
  }, [isScrolledPastTop, computeDimensionsPastScroll, computeTableDimensions]);

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

  useEffect(() => {
    const observer = tableObserverRef.current;
    if (!observer) {
      return;
    }

    const node = tableMeasurerRef.current;

    if (node) {
      observer.observe(node);
    }

    return () => {
      observer?.disconnect();
    };
  }, [tableMeasurerRef]);

  return {
    selectAllActionsIntersectionRef,
    tableMeasurerRef,
    isSelectAllActionsSticky,
    selectAllActionsAbsoluteOffset,
    selectAllActionsMaxWidth,
    selectAllActionsOffsetLeft,
    computeTableDimensions,
    isScrolledPastTop,
    selectAllActionsPastTopOffset:
      POST_SCROLL_OFFSET - SELECT_ALL_ACTIONS_HEIGHT,
    scrollbarPastTopOffset:
      POST_SCROLL_OFFSET - SELECT_ALL_ACTIONS_HEIGHT - SCROLL_BAR_HEIGHT,
  };
}
