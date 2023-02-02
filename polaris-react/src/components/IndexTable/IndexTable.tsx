import React, {useRef, useState, useEffect, useCallback, useMemo} from 'react';
import {SortAscendingMajor, SortDescendingMajor} from '@shopify/polaris-icons';
import {CSSTransition} from 'react-transition-group';
import {tokens, toPx, motion} from '@shopify/polaris-tokens';

import {debounce} from '../../utilities/debounce';
import {useToggle} from '../../utilities/use-toggle';
import {useI18n} from '../../utilities/i18n';
import {Badge} from '../Badge';
import {Checkbox as PolarisCheckbox} from '../Checkbox';
import {EmptySearchResult} from '../EmptySearchResult';
// eslint-disable-next-line import/no-deprecated
import {EventListener} from '../EventListener';
import {SelectAllActions} from '../SelectAllActions';
import {Stack} from '../Stack';
import {Sticky} from '../Sticky';
import {Spinner} from '../Spinner';
import {Text} from '../Text';
import {Tooltip} from '../Tooltip';
import {UnstyledButton} from '../UnstyledButton';
import {
  BulkActions,
  BulkActionsProps,
  useIsBulkActionsSticky,
} from '../BulkActions';
import {classNames} from '../../utilities/css';
import {
  useIndexValue,
  useIndexSelectionChange,
  SELECT_ALL_ITEMS,
  SelectionType,
  IndexProviderProps,
} from '../../utilities/index-provider';
import {AfterInitialMount} from '../AfterInitialMount';
import {IndexProvider} from '../IndexProvider';
import type {NonEmptyArray} from '../../types';
import type {Width} from '../Tooltip';

import {getTableHeadingsBySelector} from './utilities';
import {ScrollContainer, Cell, Row} from './components';
import styles from './IndexTable.scss';

interface IndexTableHeadingBase {
  flush?: boolean;
  new?: boolean;
  hidden?: boolean;
  sortableMessage?: React.ReactNode;
  sortableMessageWidth?: Width;
}

interface IndexTableHeadingTitleString extends IndexTableHeadingBase {
  title: string;
}

interface IndexTableHeadingTitleNode extends IndexTableHeadingBase {
  title: React.ReactNode;
  id: string;
}

export type IndexTableHeading =
  | IndexTableHeadingTitleString
  | IndexTableHeadingTitleNode;

export type IndexTableSortDirection = 'ascending' | 'descending';

type IndexTableSortToggleLabel = {
  [key in IndexTableSortDirection]: string;
};

interface IndexTableSortToggleLabels {
  [key: number]: IndexTableSortToggleLabel;
}

export interface IndexTableBaseProps {
  headings: NonEmptyArray<IndexTableHeading>;
  promotedBulkActions?: BulkActionsProps['promotedActions'];
  bulkActions?: BulkActionsProps['actions'];
  children?: React.ReactNode;
  emptyState?: React.ReactNode;
  sort?: React.ReactNode;
  paginatedSelectAllActionText?: string;
  lastColumnSticky?: boolean;
  selectable?: boolean;
  /** List of booleans, which maps to whether sorting is enabled or not for each column. Defaults to false for all columns.  */
  sortable?: boolean[];
  /**
   * The direction to sort the table rows on first click or keypress of a sortable column heading. Defaults to ascending.
   * @default 'descending'
   */
  defaultSortDirection?: IndexTableSortDirection;
  /** The current sorting direction. */
  sortDirection?: IndexTableSortDirection;
  /**
   * The index of the heading that the table rows are sorted by.
   */
  sortColumnIndex?: number;
  /** Callback fired on click or keypress of a sortable column heading. */
  onSort?(headingIndex: number, direction: IndexTableSortDirection): void;
  /** Optional dictionary of sort toggle labels for each sortable column, with ascending and descending label,
   * with the key as the index of the column */
  sortToggleLabels?: IndexTableSortToggleLabels;
}

export interface TableHeadingRect {
  offsetWidth: number;
  offsetLeft: number;
}

const SCROLL_BAR_PADDING = 4;
const SCROLL_BAR_DEBOUNCE_PERIOD = 300;

function IndexTableBase({
  headings,
  bulkActions = [],
  promotedBulkActions = [],
  children,
  emptyState,
  sort,
  paginatedSelectAllActionText,
  lastColumnSticky = false,
  sortable,
  sortDirection,
  defaultSortDirection = 'descending',
  sortColumnIndex,
  onSort,
  sortToggleLabels,
  ...restProps
}: IndexTableBaseProps) {
  const {
    loading,
    bulkSelectState,
    resourceName,
    bulkActionsAccessibilityLabel,
    selectMode,
    selectable = restProps.selectable,
    paginatedSelectAllText,
    itemCount,
    hasMoreItems,
    selectedItemsCount,
    condensed,
  } = useIndexValue();
  const handleSelectionChange = useIndexSelectionChange();
  const i18n = useI18n();

  const {value: hasMoreLeftColumns, toggle: toggleHasMoreLeftColumns} =
    useToggle(false);

  const tablePosition = useRef({top: 0, left: 0});
  const tableHeadingRects = useRef<TableHeadingRect[]>([]);

  const scrollableContainerElement = useRef<HTMLDivElement>(null);
  const tableElement = useRef<HTMLTableElement>(null);
  const condensedListElement = useRef<HTMLUListElement>(null);
  const loadingElement = useRef<HTMLDivElement>(null);

  const [tableInitialized, setTableInitialized] = useState(false);
  const [stickyWrapper, setStickyWrapper] = useState<HTMLElement | null>(null);
  const [hideScrollContainer, setHideScrollContainer] =
    useState<boolean>(false);

  const tableHeadings = useRef<HTMLElement[]>([]);
  const stickyTableHeadings = useRef<HTMLElement[]>([]);
  const stickyHeaderWrapperElement = useRef<HTMLDivElement>(null);
  const firstStickyHeaderElement = useRef<HTMLDivElement>(null);
  const stickyHeaderElement = useRef<HTMLDivElement>(null);
  const scrollBarElement = useRef<HTMLDivElement>(null);
  const scrollContainerElement = useRef<HTMLDivElement>(null);
  const scrollingWithBar = useRef(false);
  const scrollingContainer = useRef(false);
  const {
    bulkActionsIntersectionRef,
    tableMeasurerRef,
    isBulkActionsSticky,
    bulkActionsAbsoluteOffset,
    bulkActionsMaxWidth,
    bulkActionsOffsetLeft,
    computeTableDimensions,
  } = useIsBulkActionsSticky(selectMode);

  useEffect(() => {
    computeTableDimensions();
  }, [computeTableDimensions, itemCount]);

  const tableBodyRef = useCallback(
    (node: Element | null) => {
      if (node !== null && !tableInitialized) {
        setTableInitialized(true);
      }
    },
    [tableInitialized],
  );

  const handleSelectAllItemsInStore = useCallback(() => {
    handleSelectionChange(
      selectedItemsCount === SELECT_ALL_ITEMS
        ? SelectionType.Page
        : SelectionType.All,
      true,
    );
  }, [handleSelectionChange, selectedItemsCount]);

  const calculateFirstHeaderOffset = useCallback(() => {
    if (!selectable) {
      return tableHeadingRects.current[0].offsetWidth;
    }

    return condensed
      ? tableHeadingRects.current[0].offsetWidth
      : tableHeadingRects.current[0].offsetWidth +
          tableHeadingRects.current[1].offsetWidth;
  }, [condensed, selectable]);

  const resizeTableHeadings = useMemo(
    () =>
      debounce(() => {
        if (!tableElement.current || !scrollableContainerElement.current) {
          return;
        }

        const boundingRect =
          scrollableContainerElement.current.getBoundingClientRect();
        tablePosition.current = {
          top: boundingRect.top,
          left: boundingRect.left,
        };

        tableHeadingRects.current = tableHeadings.current.map((heading) => ({
          offsetWidth: heading.offsetWidth || 0,
          offsetLeft: heading.offsetLeft || 0,
        }));

        if (tableHeadings.current.length === 0) {
          return;
        }

        // update left offset for first column
        if (selectable && tableHeadings.current.length > 1)
          tableHeadings.current[1].style.left = `${tableHeadingRects.current[0].offsetWidth}px`;

        // update the min width of the checkbox to be the be the un-padded width of the first heading
        if (selectable && firstStickyHeaderElement?.current) {
          const elementStyle = getComputedStyle(tableHeadings.current[0]);
          const boxWidth = tableHeadings.current[0].offsetWidth;
          firstStickyHeaderElement.current.style.minWidth = `calc(${boxWidth}px - ${elementStyle.paddingLeft} - ${elementStyle.paddingRight} + 2px)`;
        }

        // update sticky header min-widths
        stickyTableHeadings.current.forEach((heading, index) => {
          let minWidth = 0;
          if (index === 0 && (!isBreakpointsXS() || !selectable)) {
            minWidth = calculateFirstHeaderOffset();
          } else if (selectable && tableHeadingRects.current.length > index) {
            minWidth = tableHeadingRects.current[index]?.offsetWidth || 0;
          } else if (!selectable && tableHeadingRects.current.length >= index) {
            minWidth = tableHeadingRects.current[index - 1]?.offsetWidth || 0;
          }

          heading.style.minWidth = `${minWidth}px`;
        });
      }),
    [calculateFirstHeaderOffset, selectable],
  );

  const resizeTableScrollBar = useCallback(() => {
    if (scrollBarElement.current && tableElement.current && tableInitialized) {
      scrollBarElement.current.style.setProperty(
        '--pc-index-table-scroll-bar-content-width',
        `${tableElement.current.offsetWidth - SCROLL_BAR_PADDING}px`,
      );

      setHideScrollContainer(
        scrollContainerElement.current?.offsetWidth ===
          tableElement.current?.offsetWidth,
      );
    }
  }, [tableInitialized]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceResizeTableScrollbar = useCallback(
    debounce(resizeTableScrollBar, SCROLL_BAR_DEBOUNCE_PERIOD, {
      trailing: true,
    }),
    [resizeTableScrollBar],
  );

  const [canScrollRight, setCanScrollRight] = useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleCanScrollRight = useCallback(
    debounce(() => {
      if (
        !lastColumnSticky ||
        !tableElement.current ||
        !scrollableContainerElement.current
      ) {
        return;
      }

      const tableRect = tableElement.current.getBoundingClientRect();
      const scrollableRect =
        scrollableContainerElement.current.getBoundingClientRect();

      setCanScrollRight(tableRect.width > scrollableRect.width);
    }),
    [lastColumnSticky],
  );

  useEffect(() => {
    handleCanScrollRight();
  }, [handleCanScrollRight]);

  const [canFitStickyColumn, setCanFitStickyColumn] = useState(true);

  const handleCanFitStickyColumn = useCallback(() => {
    if (!scrollableContainerElement.current || !tableHeadings.current.length) {
      return;
    }
    const scrollableRect =
      scrollableContainerElement.current.getBoundingClientRect();
    const checkboxColumnWidth = selectable
      ? tableHeadings.current[0].getBoundingClientRect().width
      : 0;
    const firstStickyColumnWidth =
      tableHeadings.current[selectable ? 1 : 0].getBoundingClientRect().width;
    const lastColumnIsNotTheFirst = selectable
      ? tableHeadings.current.length > 2
      : 1;
    // Don't consider the last column in the calculations if it's not sticky
    const lastStickyColumnWidth =
      lastColumnSticky && lastColumnIsNotTheFirst
        ? tableHeadings.current[
            tableHeadings.current.length - 1
          ].getBoundingClientRect().width
        : 0;
    // Secure some space for the remaining columns to be visible
    const restOfContentMinWidth = 100;
    setCanFitStickyColumn(
      scrollableRect.width >
        firstStickyColumnWidth +
          checkboxColumnWidth +
          lastStickyColumnWidth +
          restOfContentMinWidth,
    );
  }, [lastColumnSticky, selectable]);

  useEffect(() => {
    if (tableInitialized) {
      handleCanFitStickyColumn();
    }
  }, [handleCanFitStickyColumn, tableInitialized]);

  const handleResize = useCallback(() => {
    // hide the scrollbar when resizing
    scrollBarElement.current?.style.setProperty(
      '--pc-index-table-scroll-bar-content-width',
      `0px`,
    );

    resizeTableHeadings();
    debounceResizeTableScrollbar();
    handleCanScrollRight();
    handleCanFitStickyColumn();
  }, [
    resizeTableHeadings,
    debounceResizeTableScrollbar,
    handleCanScrollRight,
    handleCanFitStickyColumn,
  ]);

  const handleScrollContainerScroll = useCallback(
    (canScrollLeft: boolean, canScrollRight: boolean) => {
      if (!scrollableContainerElement.current || !scrollBarElement.current) {
        return;
      }

      if (!scrollingWithBar.current) {
        scrollingContainer.current = true;
        scrollBarElement.current.scrollLeft =
          scrollableContainerElement.current.scrollLeft;
      }
      scrollingWithBar.current = false;

      if (stickyHeaderElement.current) {
        stickyHeaderElement.current.scrollLeft =
          scrollableContainerElement.current.scrollLeft;
      }

      if (
        (canScrollLeft && !hasMoreLeftColumns) ||
        (!canScrollLeft && hasMoreLeftColumns)
      ) {
        toggleHasMoreLeftColumns();
      }

      setCanScrollRight(canScrollRight);
    },
    [hasMoreLeftColumns, toggleHasMoreLeftColumns],
  );

  const handleScrollBarScroll = useCallback(() => {
    if (!scrollableContainerElement.current || !scrollBarElement.current) {
      return;
    }

    if (!scrollingContainer.current) {
      scrollingWithBar.current = true;
      scrollableContainerElement.current.scrollLeft =
        scrollBarElement.current.scrollLeft;
    }
    scrollingContainer.current = false;
  }, []);

  useEffect(() => {
    tableHeadings.current = getTableHeadingsBySelector(
      tableElement.current,
      '[data-index-table-heading]',
    );
    stickyTableHeadings.current = getTableHeadingsBySelector(
      stickyHeaderWrapperElement.current,
      '[data-index-table-sticky-heading]',
    );
    resizeTableHeadings();
  }, [
    headings,
    resizeTableHeadings,
    firstStickyHeaderElement,
    tableInitialized,
  ]);

  useEffect(() => {
    resizeTableScrollBar();
    setStickyWrapper(
      condensed ? condensedListElement.current : tableElement.current,
    );
  }, [tableInitialized, resizeTableScrollBar, condensed]);

  const hasBulkActions = Boolean(
    (promotedBulkActions && promotedBulkActions.length > 0) ||
      (bulkActions && bulkActions.length > 0),
  );

  const headingsMarkup = headings
    .map(renderHeading)
    .reduce<JSX.Element[]>((acc, heading) => acc.concat(heading), []);

  const bulkActionsSelectable = Boolean(
    promotedBulkActions.length > 0 || bulkActions.length > 0,
  );

  const stickyColumnHeaderStyle =
    tableHeadingRects.current && tableHeadingRects.current.length > 0
      ? {
          minWidth: calculateFirstHeaderOffset(),
        }
      : undefined;

  const stickyColumnHeader = (
    <div
      className={styles.TableHeading}
      key={getHeadingKey(headings[0])}
      style={stickyColumnHeaderStyle}
      data-index-table-sticky-heading
    >
      <Stack spacing="none" wrap={false} alignment="center">
        {selectable && (
          <div
            className={styles.FirstStickyHeaderElement}
            ref={firstStickyHeaderElement}
          >
            {renderCheckboxContent()}
          </div>
        )}

        {selectable && (
          <div className={styles['StickyTableHeading-second-scrolling']}>
            {renderHeadingContent(headings[0], 0)}
          </div>
        )}

        {!selectable && (
          <div
            className={styles.FirstStickyHeaderElement}
            ref={firstStickyHeaderElement}
          >
            {renderHeadingContent(headings[0], 0)}
          </div>
        )}
      </Stack>
    </div>
  );
  const stickyHeadingsMarkup = headings.map(renderStickyHeading);

  const selectedItemsCountLabel =
    selectedItemsCount === SELECT_ALL_ITEMS
      ? `${itemCount}+`
      : selectedItemsCount;

  const handleTogglePage = useCallback(() => {
    handleSelectionChange(
      SelectionType.Page,
      Boolean(!bulkSelectState || bulkSelectState === 'indeterminate'),
    );
  }, [bulkSelectState, handleSelectionChange]);

  const paginatedSelectAllAction = getPaginatedSelectAllAction();

  const loadingTransitionClassNames = {
    enter: styles['LoadingContainer-enter'],
    enterActive: styles['LoadingContainer-enter-active'],
    exit: styles['LoadingContainer-exit'],
    exitActive: styles['LoadingContainer-exit-active'],
  };

  const loadingMarkup = (
    <CSSTransition
      in={loading}
      classNames={loadingTransitionClassNames}
      timeout={parseInt(motion['duration-100'], 10)}
      nodeRef={loadingElement}
      appear
      unmountOnExit
    >
      <div className={styles.LoadingPanel} ref={loadingElement}>
        <div className={styles.LoadingPanelRow}>
          <Spinner size="small" />
          <span className={styles.LoadingPanelText}>
            {i18n.translate(
              'Polaris.IndexTable.resourceLoadingAccessibilityLabel',
              {
                resourceNamePlural: resourceName.plural.toLocaleLowerCase(),
              },
            )}
          </span>
        </div>
      </div>
    </CSSTransition>
  );

  const stickyTableClassNames = classNames(
    styles.StickyTable,
    condensed && styles['StickyTable-condensed'],
  );

  const shouldShowBulkActions = bulkActionsSelectable && selectedItemsCount;

  const bulkActionClassNames = classNames(
    styles.BulkActionsWrapper,
    isBulkActionsSticky && styles.BulkActionsWrapperSticky,
  );

  const shouldShowActions = !condensed || selectedItemsCount;
  const promotedActions = shouldShowActions ? promotedBulkActions : [];
  const actions = shouldShowActions ? bulkActions : [];

  const bulkActionsMarkup =
    shouldShowBulkActions && !condensed ? (
      <div
        className={bulkActionClassNames}
        style={{
          insetBlockStart: isBulkActionsSticky
            ? undefined
            : bulkActionsAbsoluteOffset,
          width: bulkActionsMaxWidth,
          insetInlineStart: isBulkActionsSticky
            ? bulkActionsOffsetLeft
            : undefined,
        }}
      >
        <BulkActions
          selectMode={selectMode}
          promotedActions={promotedActions}
          actions={actions}
          onSelectModeToggle={condensed ? handleSelectModeToggle : undefined}
          isSticky={isBulkActionsSticky}
          width={bulkActionsMaxWidth}
        />
      </div>
    ) : null;

  const stickyHeaderMarkup = (
    <div className={stickyTableClassNames} role="presentation">
      <Sticky boundingElement={stickyWrapper}>
        {(isSticky: boolean) => {
          const stickyHeaderClassNames = classNames(
            styles.StickyTableHeader,
            isSticky && styles['StickyTableHeader-isSticky'],
          );

          const selectAllActionsClassName = classNames(
            styles.SelectAllActionsWrapper,
            condensed && styles['StickyTableHeader-condensed'],
            isSticky && styles['StickyTableHeader-isSticky'],
          );

          const selectAllActionsMarkup =
            shouldShowBulkActions && !condensed ? (
              <div className={selectAllActionsClassName}>
                <SelectAllActions
                  label={i18n.translate('Polaris.IndexTable.selected', {
                    selectedItemsCount: selectedItemsCountLabel,
                  })}
                  accessibilityLabel={bulkActionsAccessibilityLabel}
                  selected={bulkSelectState}
                  selectMode={selectMode}
                  onToggleAll={handleTogglePage}
                  paginatedSelectAllText={paginatedSelectAllText}
                  paginatedSelectAllAction={paginatedSelectAllAction}
                />
                {loadingMarkup}
              </div>
            ) : null;

          const headerMarkup = condensed ? (
            <div
              className={classNames(
                styles.HeaderWrapper,
                (!selectable || condensed) && styles.unselectable,
              )}
            >
              {loadingMarkup}
              {sort}
            </div>
          ) : (
            <div
              className={stickyHeaderClassNames}
              ref={stickyHeaderWrapperElement}
            >
              {loadingMarkup}
              <div className={styles.StickyTableColumnHeader}>
                {stickyColumnHeader}
              </div>
              <div
                className={styles.StickyTableHeadings}
                ref={stickyHeaderElement}
              >
                {stickyHeadingsMarkup}
              </div>
            </div>
          );

          const stickyContent = selectAllActionsMarkup ?? headerMarkup;

          return stickyContent;
        }}
      </Sticky>
      {bulkActionsMarkup}
    </div>
  );

  const scrollBarWrapperClassNames = classNames(
    styles.ScrollBarContainer,
    condensed && styles.scrollBarContainerCondensed,
    hideScrollContainer && styles.scrollBarContainerHidden,
  );

  const scrollBarClassNames = classNames(
    tableElement.current && tableInitialized && styles.ScrollBarContent,
  );

  const scrollBarMarkup =
    itemCount > 0 ? (
      <AfterInitialMount onMount={resizeTableScrollBar}>
        <div
          className={scrollBarWrapperClassNames}
          ref={scrollContainerElement}
        >
          <div
            onScroll={handleScrollBarScroll}
            className={styles.ScrollBar}
            ref={scrollBarElement}
          >
            <div className={scrollBarClassNames} />
          </div>
        </div>
      </AfterInitialMount>
    ) : null;

  const isSortable = sortable?.some((value) => value);

  const tableClassNames = classNames(
    styles.Table,
    hasMoreLeftColumns && styles['Table-scrolling'],
    selectMode && styles.disableTextSelection,
    selectMode && shouldShowBulkActions && styles.selectMode,
    !selectable && styles['Table-unselectable'],
    canFitStickyColumn && styles['Table-sticky'],
    isSortable && styles['Table-sortable'],
    canFitStickyColumn && lastColumnSticky && styles['Table-sticky-last'],
    canFitStickyColumn &&
      lastColumnSticky &&
      canScrollRight &&
      styles['Table-sticky-scrolling'],
  );

  const emptyStateMarkup = emptyState ? (
    emptyState
  ) : (
    <EmptySearchResult
      title={i18n.translate('Polaris.IndexTable.emptySearchTitle', {
        resourceNamePlural: resourceName.plural,
      })}
      description={i18n.translate('Polaris.IndexTable.emptySearchDescription')}
      withIllustration
    />
  );

  const sharedMarkup = (
    <>
      <EventListener event="resize" handler={handleResize} />
      <AfterInitialMount>{stickyHeaderMarkup}</AfterInitialMount>
    </>
  );

  const bodyMarkup = condensed ? (
    <>
      {sharedMarkup}
      <ul
        data-selectmode={Boolean(selectMode)}
        className={styles.CondensedList}
        ref={condensedListElement}
      >
        {children}
      </ul>
    </>
  ) : (
    <>
      {sharedMarkup}
      <ScrollContainer
        scrollableContainerRef={scrollableContainerElement}
        onScroll={handleScrollContainerScroll}
      >
        <table ref={tableElement} className={tableClassNames}>
          <thead>
            <tr className={styles.HeadingRow}>{headingsMarkup}</tr>
          </thead>
          <tbody ref={tableBodyRef}>{children}</tbody>
        </table>
      </ScrollContainer>
    </>
  );
  const tableContentMarkup =
    itemCount > 0 ? (
      bodyMarkup
    ) : (
      <div className={styles.EmptySearchResultWrapper}>{emptyStateMarkup}</div>
    );

  const tableWrapperClassNames = classNames(
    styles.IndexTableWrapper,
    Boolean(bulkActionsMarkup) &&
      selectMode &&
      styles.IndexTableWrapperWithBulkActions,
  );

  return (
    <>
      <div className={styles.IndexTable}>
        <div className={tableWrapperClassNames} ref={tableMeasurerRef}>
          {!shouldShowBulkActions && !condensed && loadingMarkup}
          {tableContentMarkup}
        </div>
        <div ref={bulkActionsIntersectionRef} />
      </div>
      {scrollBarMarkup}
    </>
  );

  function renderHeading(heading: IndexTableHeading, index: number) {
    const isSecond = index === 0;
    const isLast = index === headings.length - 1;
    const hasSortable = sortable?.some((value) => value === true);
    const headingContentClassName = classNames(
      styles.TableHeading,
      hasSortable && styles['TableHeading-sortable'],
      isSecond && styles['TableHeading-second'],
      isLast && !heading.hidden && styles['TableHeading-last'],
      !selectable && styles['TableHeading-unselectable'],
      heading.flush && styles['TableHeading-flush'],
    );

    const stickyPositioningStyle =
      selectable !== false &&
      isSecond &&
      tableHeadingRects.current &&
      tableHeadingRects.current.length > 0
        ? {left: tableHeadingRects.current[0].offsetWidth}
        : undefined;

    const headingContent = (
      <th
        className={headingContentClassName}
        key={getHeadingKey(heading)}
        data-index-table-heading
        style={stickyPositioningStyle}
      >
        {renderHeadingContent(heading, index)}
      </th>
    );

    if (index !== 0 || !selectable) {
      return headingContent;
    }

    const checkboxClassName = classNames(
      styles.TableHeading,
      hasSortable && styles['TableHeading-sortable'],
      index === 0 && styles['TableHeading-first'],
    );

    const checkboxContent = (
      <th
        className={checkboxClassName}
        key={`${heading}-${index}`}
        data-index-table-heading
      >
        {renderCheckboxContent()}
      </th>
    );

    return [checkboxContent, headingContent];
  }

  function renderCheckboxContent() {
    return (
      <div className={styles.ColumnHeaderCheckboxWrapper}>
        <PolarisCheckbox
          label={i18n.translate('Polaris.IndexTable.selectAllLabel', {
            resourceNamePlural: resourceName.plural,
          })}
          labelHidden
          onChange={handleSelectPage}
          checked={bulkSelectState}
        />
      </div>
    );
  }

  function handleSortHeadingClick(
    index: number,
    direction: IndexTableSortDirection,
  ) {
    onSort?.(index, direction);
  }

  function renderHeadingContent(heading: IndexTableHeading, index: number) {
    let headingContent;

    if (heading.new) {
      headingContent = (
        <Stack wrap={false} alignment="center">
          <span>{heading.title}</span>
          <Badge status="new">
            {i18n.translate('Polaris.IndexTable.onboardingBadgeText')}
          </Badge>
        </Stack>
      );
    } else if (heading.hidden) {
      headingContent = (
        <Text variant="bodySm" as="span" visuallyHidden>
          {heading.title}
        </Text>
      );
    } else {
      headingContent = heading.title;
    }
    if (sortable?.[index]) {
      const isCurrentlySorted = index === sortColumnIndex;
      const isAscending = sortDirection === 'ascending';
      let newDirection: IndexTableSortDirection = defaultSortDirection;
      let SourceComponent =
        defaultSortDirection === 'ascending'
          ? SortAscendingMajor
          : SortDescendingMajor;
      if (isCurrentlySorted) {
        newDirection = isAscending ? 'descending' : 'ascending';
        SourceComponent =
          sortDirection === 'ascending'
            ? SortAscendingMajor
            : SortDescendingMajor;
      }

      const iconMarkup = (
        <span
          className={classNames(
            styles.TableHeadingSortIcon,
            isCurrentlySorted && styles['TableHeadingSortIcon-visible'],
          )}
        >
          <SourceComponent
            focusable="false"
            aria-hidden="true"
            className={styles.TableHeadingSortSvg}
          />
        </span>
      );

      const sortMarkup = (
        <UnstyledButton
          onClick={() => handleSortHeadingClick(index, newDirection)}
          className={styles.TableHeadingSortButton}
          tabIndex={selectMode ? -1 : 0}
        >
          {iconMarkup}

          {headingContent}
        </UnstyledButton>
      );

      if (!sortToggleLabels || selectMode) {
        return sortMarkup;
      }

      const tooltipDirection = isCurrentlySorted
        ? sortDirection!
        : defaultSortDirection;

      const tooltipContent = sortToggleLabels[index][tooltipDirection];

      if (!heading.sortableMessage) {
        return (
          <Tooltip
            content={tooltipContent}
            activatorWrapper="div"
            dismissOnMouseOut
            preferredPosition="above"
          >
            {sortMarkup}
          </Tooltip>
        );
      }

      return (
        <div>
          <UnstyledButton
            onClick={() => handleSortHeadingClick(index, newDirection)}
            className={styles.TableHeadingSortButton}
            tabIndex={selectMode ? -1 : 0}
          >
            <Tooltip
              content={heading.sortableMessage}
              dismissOnMouseOut
              hasUnderline
              // preferredAlignment="center"
              preferredPosition="above"
              width={heading.sortableMessageWidth ?? 'wide'}
              padding="4"
              borderRadius="2"
            >
              <div>{headingContent}</div>
            </Tooltip>

            <Tooltip
              content={tooltipContent}
              activatorWrapper="div"
              dismissOnMouseOut
              // preferredAlignment="center"
              preferredPosition="above"
            >
              {iconMarkup}
            </Tooltip>
          </UnstyledButton>
        </div>
      );
    }
    if (heading.sortableMessage) {
      return (
        <Tooltip
          content={heading.sortableMessage}
          dismissOnMouseOut
          preferredPosition="above"
          width={heading.sortableMessageWidth ?? 'wide'}
          padding="4"
          borderRadius="2"
          hasUnderline
        >
          <span style={{cursor: 'pointer'}}>{headingContent}</span>
        </Tooltip>
      );
    }
    return headingContent;
  }

  function handleSelectPage(checked: boolean) {
    handleSelectionChange(SelectionType.Page, checked);
  }

  function renderStickyHeading(heading: IndexTableHeading, index: number) {
    const position = index + 1;
    const headingStyle =
      tableHeadingRects.current && tableHeadingRects.current.length > position
        ? {minWidth: tableHeadingRects.current[position].offsetWidth}
        : undefined;

    const headingContent = renderHeadingContent(heading, index);
    const stickyHeadingClassName = classNames(
      styles.TableHeading,
      index === 0 && styles['StickyTableHeading-second'],
      index === 0 && !selectable && styles.unselectable,
    );

    return (
      <div
        className={stickyHeadingClassName}
        key={getHeadingKey(heading)}
        style={headingStyle}
        data-index-table-sticky-heading
      >
        {headingContent}
      </div>
    );
  }

  function getPaginatedSelectAllAction() {
    if (!selectable || !hasBulkActions || !hasMoreItems) {
      return;
    }

    const customActionText =
      paginatedSelectAllActionText ??
      i18n.translate('Polaris.IndexTable.selectAllItems', {
        itemsLength: itemCount,
        resourceNamePlural: resourceName.plural.toLocaleLowerCase(),
      });

    const actionText =
      selectedItemsCount === SELECT_ALL_ITEMS
        ? i18n.translate('Polaris.IndexTable.undo')
        : customActionText;

    return {
      content: actionText,
      onAction: handleSelectAllItemsInStore,
    };
  }

  function handleSelectModeToggle() {
    handleSelectionChange(SelectionType.All, false);
  }
}

const isBreakpointsXS = () => {
  return typeof window === 'undefined'
    ? false
    : window.innerWidth <
        parseFloat(toPx(tokens.breakpoints['breakpoints-sm']) ?? '');
};

function getHeadingKey(heading: IndexTableHeading): string {
  if ('id' in heading && heading.id) {
    return heading.id;
  }

  if (typeof heading.title === 'string') {
    return heading.title;
  }

  return '';
}

export interface IndexTableProps
  extends IndexTableBaseProps,
    IndexProviderProps {}

export function IndexTable({
  children,
  selectable = true,
  itemCount,
  selectedItemsCount = 0,
  resourceName: passedResourceName,
  loading,
  hasMoreItems,
  condensed,
  onSelectionChange,
  ...indexTableBaseProps
}: IndexTableProps) {
  return (
    <IndexProvider
      selectable={selectable}
      itemCount={itemCount}
      selectedItemsCount={selectedItemsCount}
      resourceName={passedResourceName}
      loading={loading}
      hasMoreItems={hasMoreItems}
      condensed={condensed}
      onSelectionChange={onSelectionChange}
    >
      <IndexTableBase {...indexTableBaseProps}>{children}</IndexTableBase>
    </IndexProvider>
  );
}

IndexTable.Cell = Cell;
IndexTable.Row = Row;
