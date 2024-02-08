import {useEffect, useRef, useState, useCallback} from 'react';

import {debounce} from '../../../utilities/debounce';

const DEBOUNCE_PERIOD = 250;

const SELECT_ALL_ACTIONS_HEIGHT = 41;
const PAGINATION_WIDTH_OFFSET = 64;
const SCROLL_BAR_CONTAINER_HEIGHT = 13;
const SCROLL_BAR_HEIGHT = 8;
const INDEX_TABLE_INITIAL_OFFSET = 32;
const RESOURCE_LIST_INITIAL_OFFSET = 48;

type TableType = 'index-table' | 'resource-list';

export interface UseIsSelectAllActionsStickyProps {
  selectMode: boolean;
  hasPagination?: boolean;
  tableType: TableType;
}

export interface SelectAllActionsStickyCalculations {
  selectAllActionsIntersectionRef: React.RefObject<HTMLDivElement>;
  tableMeasurerRef: React.RefObject<HTMLDivElement>;
  isSelectAllActionsSticky: boolean;
  selectAllActionsAbsoluteOffset: number;
  selectAllActionsMaxWidth: number;
  selectAllActionsOffsetLeft: number;
  selectAllActionsOffsetBottom: number;
  computeTableDimensions():
    | {
        maxWidth: number;
        offsetHeight: number;
        offsetLeft: number;
        offsetBottom: number;
      }
    | undefined;
  isScrolledPastTop: boolean;
  selectAllActionsPastTopOffset: number;
  scrollbarPastTopOffset: number;
}

export function useIsSelectAllActionsSticky({
  selectMode,
  hasPagination,
  tableType,
}: UseIsSelectAllActionsStickyProps): SelectAllActionsStickyCalculations {
  const hasIOSupport =
    typeof window !== 'undefined' && Boolean(window.IntersectionObserver);
  const [isSelectAllActionsSticky, setIsSticky] = useState(false);
  const [isScrolledPastTop, setIsScrolledPastTop] = useState(false);
  const [selectAllActionsAbsoluteOffset, setSelectAllActionsAbsoluteOffset] =
    useState(0);
  const [selectAllActionsMaxWidth, setSelectAllActionsMaxWidth] = useState(0);
  const [selectAllActionsOffsetLeft, setSelectAllActionsOffsetLeft] =
    useState(0);
  const [selectAllActionsOffsetBottom, setSelectAllActionsOffsetBottom] =
    useState(0);

  const selectAllActionsIntersectionRef = useRef<HTMLDivElement>(null);
  const tableMeasurerRef = useRef<HTMLDivElement>(null);

  const widthOffset = hasPagination ? PAGINATION_WIDTH_OFFSET : 0;

  const initialPostOffset =
    tableType === 'index-table'
      ? INDEX_TABLE_INITIAL_OFFSET + SCROLL_BAR_CONTAINER_HEIGHT
      : RESOURCE_LIST_INITIAL_OFFSET;

  const postScrollOffset = initialPostOffset + SELECT_ALL_ACTIONS_HEIGHT;

  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      setIsSticky(!entry.isIntersecting);
    });
  };

  const handleTableIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      const isScrolledPastTop =
        entry.boundingClientRect.top > 0 && !entry.isIntersecting;
      const rootBoundsHeight = entry.rootBounds?.height || 0;

      const hasTableOffscreen =
        entry.boundingClientRect.top + entry.boundingClientRect.height >
        rootBoundsHeight;
      if (hasTableOffscreen) {
        setIsSticky(entry.isIntersecting);
      }
      setIsScrolledPastTop(isScrolledPastTop);
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
    rootMargin: `0px 0px -${postScrollOffset}px 0px`,
    threshold: 0,
  };
  const tableObserverRef = useRef<IntersectionObserver | null>(
    hasIOSupport
      ? new IntersectionObserver(handleTableIntersect, tableOptions)
      : null,
  );

  const getClosestScrollContainer = (node: HTMLElement) => {
    let container: HTMLElement | null = node;

    while (container && container !== document.body) {
      const style = window.getComputedStyle(container);
      const isScrollContainer =
        style.overflow === 'auto' ||
        style.overflowX === 'auto' ||
        style.overflowY === 'auto' ||
        style.overflow === 'scroll' ||
        style.overflowX === 'scroll' ||
        style.overflowY === 'scroll';

      if (isScrollContainer) return container;
      container = container.parentElement;
    }

    return null;
  };

  const computeTableDimensions = useCallback(() => {
    const node = tableMeasurerRef.current;
    if (!node) {
      return {
        maxWidth: 0,
        offsetHeight: 0,
        offsetLeft: 0,
        offsetBottom: 0,
      };
    }

    const scrollContainer =
      getClosestScrollContainer(node)?.getBoundingClientRect();
    const box = node.getBoundingClientRect();
    const paddingHeight = selectMode ? SELECT_ALL_ACTIONS_HEIGHT : 0;
    const offsetHeight = box.height - paddingHeight;
    const maxWidth = box.width - widthOffset;
    const offsetLeft = box.left;
    const offsetBottomScrollable = scrollContainer
      ? Math.round(scrollContainer.y + SCROLL_BAR_HEIGHT)
      : 0;

    setSelectAllActionsAbsoluteOffset(offsetHeight);
    setSelectAllActionsMaxWidth(maxWidth);
    setSelectAllActionsOffsetLeft(offsetLeft);
    setSelectAllActionsOffsetBottom(offsetBottomScrollable);
  }, [selectMode, widthOffset]);

  const computeDimensionsPastScroll = useCallback(() => {
    setSelectAllActionsAbsoluteOffset(initialPostOffset);
  }, [initialPostOffset]);

  useEffect(() => {
    if (isScrolledPastTop) {
      computeDimensionsPastScroll();
    } else {
      computeTableDimensions();
    }

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
  }, [isScrolledPastTop, computeDimensionsPastScroll, computeTableDimensions]);

  useEffect(() => {
    const observer = observerRef.current;
    const tableObserver = tableObserverRef.current;
    if (!observer || !tableObserver) {
      return;
    }

    const node = selectAllActionsIntersectionRef.current;
    const tableNode = tableMeasurerRef.current;

    if (node) {
      observer.observe(node);
    }

    if (tableNode) {
      tableObserver.observe(tableNode);
    }

    return () => {
      observer?.disconnect();
      tableObserver?.disconnect();
    };
  }, [selectAllActionsIntersectionRef]);

  return {
    selectAllActionsIntersectionRef,
    tableMeasurerRef,
    isSelectAllActionsSticky,
    selectAllActionsAbsoluteOffset,
    selectAllActionsMaxWidth,
    selectAllActionsOffsetLeft,
    selectAllActionsOffsetBottom,
    computeTableDimensions,
    isScrolledPastTop,
    selectAllActionsPastTopOffset: initialPostOffset,
    scrollbarPastTopOffset: initialPostOffset - SCROLL_BAR_CONTAINER_HEIGHT,
  };
}
