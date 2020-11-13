import React, {useRef, useState, useEffect, useCallback} from 'react';
import {EnableSelectionMinor} from '@shopify/polaris-icons';
import debounce from 'lodash/debounce';
import {CSSTransition} from 'react-transition-group';
import {useI18n} from '@shopify/react-i18n';
import {durationFast} from '@shopify/polaris-tokens';
import {
  Badge,
  Checkbox as PolarisCheckbox,
  EmptySearchResult,
  EventListener,
  Stack,
  Sticky,
  Spinner,
  VisuallyHidden,
  Button,
  UnstableBulkActions as BulkActions,
  UnstableBulkActionsProps as BulkActionsProps,
} from '@shopify/polaris';
import {classNames} from '@shopify/css-utilities';
import {useToggle} from '@shopify/react-hooks';
import {useNewDesignLanguage} from '@web-utilities/new-design-language';

import {
  useIndexValue,
  useIndexSelectionChange,
  SELECT_ALL_ITEMS,
  SelectionType,
} from '../IndexProvider';
import {AfterInitialMount} from '../AfterInitialMount';

import {ScrollContainer, Cell, Row, Checkbox} from './components';
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
  sort?: React.ReactNode;
  onMoreActionPopoverToggle?(isOpen: boolean): void;
}

export interface TableHeadingRect {
  offsetWidth: number;
  offsetLeft: number;
}

const SCROLL_BAR_PADDING = 4;

export function IndexTable({
  headings,
  bulkActions = [],
  promotedBulkActions = [],
  children,
  emptyState,
  onMoreActionPopoverToggle,
  sort,
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
    condensed,
  } = useIndexValue();
  const handleSelectionChange = useIndexSelectionChange();
  const [newDesignLanguage] = useNewDesignLanguage();
  const [i18n, ShareTranslations] = useI18n();

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
  const [tableInitialized, setTableInitialized] = useState(false);

  const [isSmallScreenSelectable, setIsSmallScreenSelectable] = useState(false);

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

  const toggleIsSmallScreenSelectable = useCallback(() => {
    setIsSmallScreenSelectable((value) => !value);
  }, []);

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleResize = useCallback(
    debounce(() => {
      resizeTableHeadings();
    }, 50),
    [resizeTableHeadings],
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
    if (!condensed && isSmallScreenSelectable) {
      setIsSmallScreenSelectable(false);
    }
  }, [condensed, isSmallScreenSelectable]);

  const selectable = Boolean(
    (promotedBulkActions && promotedBulkActions.length > 0) ||
      (bulkActions && bulkActions.length > 0),
  );

  const headingsMarkup = headings.flatMap(renderHeading);

  const bulkActionsSelectable = Boolean(
    promotedBulkActions.length > 0 || bulkActions.length > 0,
  );

  const stickyColumnHeaderStyle =
    tableHeadingRects.current && tableHeadingRects.current.length > 0
      ? {
          minWidth: condensed
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
        <div
          className={newDesignLanguage ? styles.StickyColumnHeaderCheckbox : ''}
        >
          {renderCheckboxContent()}
        </div>
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
    >
      <div className={styles.LoadingPanel}>
        <div className={styles.LoadingPanelRow}>
          <Spinner size="small" />
          <span className={styles.LoadingPanelText}>
            {i18n.translate('resourceLoadingAccessibilityLabel', {
              resourceNamePlural: resourceName.plural.toLocaleLowerCase(),
            })}
          </span>
        </div>
      </div>
    </CSSTransition>
  );

  const stickyTableClassNames = classNames(
    styles.StickyTable,
    condensed && styles['StickyTable--condensed'],
  );

  const shouldShowBulkActions =
    (bulkActionsSelectable && selectedItemsCount) || isSmallScreenSelectable;

  const stickyHeaderMarkup = (
    <div className={stickyTableClassNames} role="presentation">
      <Sticky>
        {(isSticky: boolean) => {
          const stickyHeaderClassNames = classNames(
            styles.StickyTableHeader,
            isSticky && styles['StickyTableHeader--isSticky'],
          );

          const bulkActionClassNames = classNames(
            styles.BulkActionsWrapper,
            condensed && styles['StickyTableHeader--condensed'],
            isSticky && styles['StickyTableHeader--isSticky'],
          );

          const bulkActionsMarkup = shouldShowBulkActions ? (
            <div className={bulkActionClassNames} data-condensed={condensed}>
              {loadingMarkup}
              <BulkActions
                smallScreen={condensed}
                label={i18n.translate('selected', {
                  selectedItemsCount: selectedItemsCountLabel,
                })}
                accessibilityLabel={bulkActionsAccessibilityLabel}
                selected={bulkSelectState}
                selectMode={selectMode || isSmallScreenSelectable}
                onToggleAll={handleTogglePage}
                onMoreActionPopoverToggle={onMoreActionPopoverToggle}
                promotedActions={promotedBulkActions}
                actions={bulkActions}
                paginatedSelectAllText={paginatedSelectAllText}
                paginatedSelectAllAction={paginatedSelectAllAction}
                onSelectModeToggle={
                  condensed ? handleSelectModeToggle : undefined
                }
              />
            </div>
          ) : null;

          const stickyColumnHeaderClassNames = classNames(
            styles.StickyTableColumnHeader,
            hasMoreLeftColumns &&
              styles['StickyTableColumnHeader--isScrolling'],
          );

          const headerMarkup = condensed ? (
            <div className={styles.HeaderWrapper}>
              {loadingMarkup}
              {sort}
              <Button
                icon={EnableSelectionMinor}
                onClick={toggleIsSmallScreenSelectable}
              >
                {i18n.translate('selectButtonText')}
              </Button>
            </div>
          ) : (
            <div className={stickyHeaderClassNames}>
              {loadingMarkup}
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

          const stickyContent = bulkActionsMarkup
            ? bulkActionsMarkup
            : headerMarkup;

          return stickyContent;
        }}
      </Sticky>
    </div>
  );

  const scrollBarContentStyles =
    tableElement.current && tableInitialized
      ? {
          height: '1px',
          width: tableElement.current.offsetWidth - SCROLL_BAR_PADDING,
        }
      : undefined;

  const scrollBarclassNames = classNames(
    styles.ScrollBarContainer,
    condensed && styles.scrollBarContainerCondensed,
  );
  const scrollBarMarkup =
    itemCount > 0 ? (
      <AfterInitialMount>
        <div className={scrollBarclassNames}>
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
    selectMode && styles.selectMode,
  );

  const emptyStateMarkup = emptyState ? (
    emptyState
  ) : (
    <EmptySearchResult
      title={i18n.translate('emptySearchTitle', {
        resourceNamePlural: resourceName.plural,
      })}
      description={i18n.translate('emptySearchDescription')}
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
        data-selectmode={Boolean(selectMode || isSmallScreenSelectable)}
        className={styles.CondensedList}
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

  return (
    <ShareTranslations>
      <div className={styles.IndexTable}>
        {!shouldShowBulkActions && !condensed && loadingMarkup}
        {tableContentMarkup}
      </div>
      {scrollBarMarkup}
    </ShareTranslations>
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
      index === 0 && newDesignLanguage && styles.newDesignLanguage,
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
      <PolarisCheckbox
        label={i18n.translate('selectAllLabel', {
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
          <Badge status="new">{i18n.translate('onboardingBadgeText')}</Badge>
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
        ? i18n.translate('undo')
        : i18n.translate('selectAllItems', {
            itemsLength: itemCount,
            resourceNamePlural: resourceName.plural.toLocaleLowerCase(),
          });

    return {
      content: actionText,
      onAction: handleSelectAllItemsInStore,
    };
  }

  function handleSelectModeToggle(val: boolean) {
    handleSelectionChange(SelectionType.All, false);
    setIsSmallScreenSelectable(val);
  }
}

IndexTable.Cell = Cell;
IndexTable.Row = Row;
IndexTable.Checkbox = Checkbox;
