import React, {useRef, useState, useEffect, useCallback} from 'react';
import debounce from 'lodash/debounce';
import {CSSTransition} from '@material-ui/react-transition-group';
import {durationFast} from '@shopify/polaris-tokens';

import {useI18n} from '../../../utilities/i18n';
import {classNames} from '../../../utilities/css';
import {useToggle} from '../../../utilities/use-toggle';
import {Badge} from '../../Badge';
import {Checkbox} from '../../Checkbox';
import {EmptySearchResult} from '../../EmptySearchResult';
import {EventListener} from '../../EventListener';
import {Stack} from '../../Stack';
import {Sticky} from '../../Sticky';
import {Spinner} from '../../Spinner';
import {VisuallyHidden} from '../../VisuallyHidden';
import {AfterInitialMount} from '../../AfterInitialMount';
import {
  useIndexValue,
  useIndexSelectionChange,
  SELECT_ALL_ITEMS,
  SelectionType,
} from '../IndexProvider';
// eslint-disable-next-line shopify/strict-component-boundaries
import {BulkActions, BulkActionsProps} from '../../ResourceList/components';

import {ScrollContainer, Cell, Row} from './components';
import styles from './IndexTable.scss';

export interface IndexTableHeading {
  title: string;
  new?: boolean;
  hidden?: boolean;
}

export interface IndexTableProps {
  headings: IndexTableHeading[];
  promotedBulkActions?: BulkActionsProps['promotedActions'];
  bulkActions?: BulkActionsProps['actions'];
  children?: React.ReactNode;
  emptyState?: React.ReactNode;
}

export interface TableHeadingRect {
  offsetWidth: number;
  offsetLeft: number;
}

const SMALL_SCREEN_WIDTH = 458;
const SCROLL_BAR_PADDING = 4;

export function IndexTable({
  headings,
  bulkActions = [],
  promotedBulkActions = [],
  children,
  emptyState,
}: IndexTableProps) {
  const {
    loading,
    bulkSelectState,
    resourceName,
    bulkActionsAccessibilityLabel,
    selectMode,
    paginatedSelectAllText,
    itemCount,
    hasMoreItems,
    selectedItemsCount,
  } = useIndexValue();
  const handleSelectionChange = useIndexSelectionChange();

  const i18n = useI18n();

  const {
    value: hasMoreLeftColumns,
    toggle: toggleHasMoreLeftColumns,
  } = useToggle(false);
  const {
    value: hasMoreRightColumns,
    toggle: toggleHasMoreRightColumns,
  } = useToggle(false);

  const onboardingScrollButtons = useRef(false);
  const tablePosition = useRef({top: 0, left: 0});
  const tableHeadingRects = useRef<TableHeadingRect[]>([]);

  const scrollableContainerElement = useRef<HTMLDivElement>(null);
  const tableElement = useRef<HTMLTableElement>(null);
  const loadingPanelRef = useRef<HTMLDivElement>(null);

  const [tableInitialized, setTableInitialized] = useState(false);
  const [smallScreen, setSmallScreen] = useState(isSmallScreen());

  const stickyHeaderElement = useRef<HTMLDivElement>(null);
  const scrollBarElement = useRef<HTMLDivElement>(null);
  const scrollingWithBar = useRef(false);
  const scrollingContainer = useRef(false);

  const tableBodyRef = useCallback(
    (node) => {
      if (node !== null && !tableInitialized) {
        setTableInitialized(true);
      }
    },
    [tableInitialized],
  );

  const findDOMNode = useCallback(() => loadingPanelRef.current, []);

  const handleSelectAllItemsInStore = useCallback(() => {
    handleSelectionChange(
      selectedItemsCount === SELECT_ALL_ITEMS
        ? SelectionType.Page
        : SelectionType.All,
      true,
    );
  }, [handleSelectionChange, selectedItemsCount]);

  const resizeTableHeadings = useCallback(() => {
    if (!tableElement.current || !scrollableContainerElement.current) {
      return;
    }

    const measuredTableHeadingRects = Array.from(
      tableElement.current.querySelectorAll('[data-index-table-heading]'),
    ).map((heading) => ({
      offsetWidth: heading instanceof HTMLElement ? heading.offsetWidth : 0,
      offsetLeft: heading instanceof HTMLElement ? heading.offsetLeft : 0,
    }));
    const boundingRect = scrollableContainerElement.current.getBoundingClientRect();
    tablePosition.current = {top: boundingRect.top, left: boundingRect.left};
    tableHeadingRects.current = measuredTableHeadingRects;
  }, []);

  const resizeSmallScreen = useCallback(() => {
    const newSmallScreen = isSmallScreen();

    if (smallScreen !== newSmallScreen) {
      setSmallScreen(newSmallScreen);
    }
  }, [smallScreen]);

  const handleResize = useCallback(
    debounce(() => {
      resizeTableHeadings();
      resizeSmallScreen();
    }, 50),
    [resizeTableHeadings, resizeSmallScreen],
  );

  const handleScrollContainerScroll = useCallback(
    (canScrollLeft, canScrollRight) => {
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

      if (
        (canScrollRight && !hasMoreRightColumns) ||
        (!canScrollRight && hasMoreRightColumns)
      ) {
        toggleHasMoreRightColumns();
      }

      if (!canScrollRight) {
        onboardingScrollButtons.current = false;
      }
    },
    [
      hasMoreLeftColumns,
      hasMoreRightColumns,
      toggleHasMoreLeftColumns,
      toggleHasMoreRightColumns,
    ],
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

  useEffect(() => resizeTableHeadings(), [headings, resizeTableHeadings]);

  useEffect(() => {
    resizeSmallScreen();
  }, [resizeSmallScreen]);

  const selectable = Boolean(
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
          minWidth: smallScreen
            ? tableHeadingRects.current[0].offsetWidth
            : tableHeadingRects.current[0].offsetWidth +
              tableHeadingRects.current[1].offsetWidth,
        }
      : undefined;

  const stickyColumnHeader = (
    <div
      className={styles.TableHeading}
      key={headings[0].title}
      style={stickyColumnHeaderStyle}
    >
      <Stack spacing="none" wrap={false} alignment="center">
        {renderCheckboxContent()}
        <div className={styles['StickyTableHeading--second--scrolling']}>
          {renderHeadingContent(headings[0])}
        </div>
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

  const stickyHeaderMarkup = (
    <div className={styles.StickyTable} role="presentation">
      <Sticky>
        {(isSticky: boolean) => {
          const stickyHeaderClassNames = classNames(
            styles.StickyTableHeader,
            isSticky && styles['StickyTableHeader--isSticky'],
          );

          const bulkActionClassNames = classNames(
            styles.BulkActionsWrapper,
            isSticky && styles['StickyTableHeader--isSticky'],
          );

          const bulkActionsMarkup =
            bulkActionsSelectable && selectedItemsCount ? (
              <div className={bulkActionClassNames}>
                <BulkActions
                  label={i18n.translate('Polaris.IndexTable.selected', {
                    selectedItemsCount: selectedItemsCountLabel,
                  })}
                  accessibilityLabel={bulkActionsAccessibilityLabel}
                  selected={bulkSelectState}
                  selectMode={selectMode}
                  onToggleAll={handleTogglePage}
                  promotedActions={promotedBulkActions}
                  actions={bulkActions}
                  paginatedSelectAllText={paginatedSelectAllText}
                  paginatedSelectAllAction={paginatedSelectAllAction}
                />
              </div>
            ) : null;

          const stickyColumnHeaderClassNames = classNames(
            styles.StickyTableColumnHeader,
            hasMoreLeftColumns &&
              styles['StickyTableColumnHeader--isScrolling'],
          );

          const stickyContent = bulkActionsMarkup ? (
            bulkActionsMarkup
          ) : (
            <div className={stickyHeaderClassNames}>
              <div className={stickyColumnHeaderClassNames}>
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

          return stickyContent;
        }}
      </Sticky>
    </div>
  );

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
      timeout={durationFast}
      appear
      unmountOnExit
      findDOMNode={findDOMNode}
    >
      <div ref={loadingPanelRef} className={styles.LoadingPanel}>
        <Stack>
          <Spinner size="small" />
          <span>
            {i18n.translate(
              'Polaris.IndexTable.resourceLoadingAccessibilityLabel',
              {
                resourceNamePlural: resourceName.plural.toLocaleLowerCase(),
              },
            )}
          </span>
        </Stack>
      </div>
    </CSSTransition>
  );

  const scrollBarContentStyles =
    tableElement.current && tableInitialized
      ? {
          height: '1px',
          width: tableElement.current.offsetWidth - SCROLL_BAR_PADDING,
        }
      : undefined;

  const scrollBarMarkup =
    itemCount > 0 ? (
      <AfterInitialMount>
        <div className={styles.ScrollBarContainer}>
          <div
            onScroll={handleScrollBarScroll}
            className={styles.ScrollBar}
            ref={scrollBarElement}
          >
            <div style={scrollBarContentStyles} />
          </div>
        </div>
      </AfterInitialMount>
    ) : null;

  const tableClassNames = classNames(
    styles.Table,
    hasMoreLeftColumns && styles['Table--scrolling'],
    selectMode && styles.disableTextSelection,
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

  const tableContentMarkup =
    itemCount > 0 ? (
      <React.Fragment>
        <EventListener event="resize" handler={handleResize} />
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
        <AfterInitialMount>{stickyHeaderMarkup}</AfterInitialMount>
      </React.Fragment>
    ) : (
      <div className={styles.EmptySearchResultWrapper}>{emptyStateMarkup}</div>
    );

  return (
    <React.Fragment>
      <div className={styles.IndexTable}>
        {loadingMarkup}
        {tableContentMarkup}
      </div>
      {scrollBarMarkup}
    </React.Fragment>
  );

  function renderHeading(heading: IndexTableHeading, index: number) {
    const isSecond = index === 0;
    const headingContentClassName = classNames(
      styles.TableHeading,
      isSecond && styles['TableHeading--second'],
    );

    const stickyPositioningStyle =
      isSecond &&
      tableHeadingRects.current &&
      tableHeadingRects.current.length > 0
        ? {left: tableHeadingRects.current[0].offsetWidth}
        : undefined;

    const headingContent = (
      <th
        className={headingContentClassName}
        key={heading.title}
        data-index-table-heading
        style={stickyPositioningStyle}
      >
        {renderHeadingContent(heading)}
      </th>
    );

    if (index !== 0) return headingContent;

    const checkboxClassName = classNames(
      styles.TableHeading,
      index === 0 && styles['TableHeading--first'],
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
      <Checkbox
        label={i18n.translate('Polaris.IndexTable.selectAllLabel', {
          resourceNamePlural: resourceName.plural,
        })}
        labelHidden
        onChange={handleSelectPage}
        checked={bulkSelectState}
      />
    );
  }

  function renderHeadingContent(heading: IndexTableHeading) {
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
      headingContent = <VisuallyHidden>{heading.title}</VisuallyHidden>;
    } else {
      headingContent = heading.title;
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

    const headingContent = renderHeadingContent(heading);
    const stickyHeadingClassName = classNames(
      styles.TableHeading,
      index === 0 && styles['StickyTableHeading--second'],
    );

    return (
      <div
        className={stickyHeadingClassName}
        key={heading.title}
        style={headingStyle}
      >
        {headingContent}
      </div>
    );
  }

  function getPaginatedSelectAllAction() {
    if (!selectable || !hasMoreItems) {
      return;
    }

    const actionText =
      selectedItemsCount === SELECT_ALL_ITEMS
        ? i18n.translate('Polaris.IndexTable.undo')
        : i18n.translate('Polaris.IndexTable.selectAllItems', {
            itemsLength: itemCount,
            resourceNamePlural: resourceName.plural,
          });

    return {
      content: actionText,
      onAction: handleSelectAllItemsInStore,
    };
  }
}

function isSmallScreen() {
  return typeof window === 'undefined'
    ? false
    : window.innerWidth < SMALL_SCREEN_WIDTH;
}

IndexTable.Cell = Cell;
IndexTable.Row = Row;
