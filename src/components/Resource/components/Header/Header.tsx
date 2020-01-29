import React, {
  ReactNode,
  useMemo,
  useCallback,
  Fragment,
  useEffect,
  useRef,
} from 'react';
import {EnableSelectionMinor, SortMinor} from '@shopify/polaris-icons';
import {useSticky} from 'use-sticky/dist/src';
import {BulkActions, BulkActionsProps} from '../../../BulkActions';
import {CheckableButton} from '../../../CheckableButton';
import {Select, SelectOption} from '../../../Select';
import {Button} from '../../../Button';
import {Stack} from '../../../Stack';
import {Popover} from '../../../Popover';
import {TextContainer} from '../../../TextContainer';
import {TextStyle} from '../../../TextStyle';
import {ChoiceList, ChoiceListProps} from '../../../ChoiceList';
import {Spinner} from '../../../Spinner';
import {useI18n} from '../../../../utilities/i18n';
import {classNames} from '../../../../utilities/css';
import {useMediaQuery} from '../../../../utilities/media-query';
import {useToggle} from '../../../../utilities/use-toggle';
import {capitalize} from '../../../../utilities/capitalize';
import {
  useResourceManagerForHeader,
  SelectionType,
} from '../../../../utilities/resources';

import styles from './Header.scss';

export interface HeaderProps {
  promotedBulkActions?: BulkActionsProps['promotedActions'];
  bulkActions?: BulkActionsProps['actions'];
  showHeader?: boolean;
  sortOptions?: SelectOption[];
  sortValue?: string;
  alternateTool?: React.ReactNode;
  itemsOnPage: number;
  totalItemsCount: number;
  selectedItemsCount: number | 'ALL';
  filterControl?: ReactNode;
  columnHeaders?: ReactNode;
  onSortChange?(selected: string, id: string): void;
}

const SELECT_ALL_ITEMS = 'ALL';

export function Header({
  promotedBulkActions,
  bulkActions,
  showHeader = false,
  selectedItemsCount,
  sortOptions,
  sortValue,
  alternateTool,
  onSortChange,
  itemsOnPage,
  totalItemsCount,
  columnHeaders,
  filterControl,
}: HeaderProps) {
  const {
    loading,
    selectable,
    selectMode,
    resourceName,
    onSelection,
    onSelectMode,
    onSelectable,
  } = useResourceManagerForHeader();
  const stickyHeaderNode = useRef<HTMLDivElement>(null);
  // tada type this
  const bulkActionToggleNode = useRef<{focus: () => void}>(null);
  const bulkActionCheckableNode = useRef<{focusInput: () => void}>(null);
  useSticky(stickyHeaderNode, {stickyClasses: [styles.stickyHeader]});
  const i18n = useI18n();
  const {value: sortPopoverActive, toggle: toggleSortPopoverActive} = useToggle(
    false,
  );
  const {resourceListSmallScreen} = useMediaQuery();

  useEffect(() => {
    const shouldShowSelectable = Boolean(
      (promotedBulkActions && promotedBulkActions.length > 0) ||
        (bulkActions && bulkActions.length > 0),
    );

    if (shouldShowSelectable !== selectable) onSelectable(shouldShowSelectable);
  }, [bulkActions, onSelectable, promotedBulkActions, selectable]);

  const choiceListMarkup = !resourceListSmallScreen &&
    columnHeaders &&
    sortOptions &&
    sortValue && (
      <ChoiceList
        title=""
        titleHidden
        choices={optionsAsChoices(sortOptions)}
        selected={valueAsArray(sortValue)}
        onChange={(selected, id) => {
          return (
            onSortChange &&
            onSortChange(
              valueAsString(selected, i18n.translate('listSeparator')),
              id,
            )
          );
        }}
      />
    );

  const sortMarkup = choiceListMarkup && (
    <div className={styles.FilterSort}>
      <Popover
        active={sortPopoverActive}
        activator={
          <Button onClick={toggleSortPopoverActive} icon={SortMinor}>
            {i18n.translate('Polaris.ResourceList.sort')}
          </Button>
        }
        onClose={toggleSortPopoverActive}
        sectioned
        preferredAlignment="right"
      >
        <TextContainer>
          <TextStyle variation="subdued">
            {i18n.translate('Polaris.ResourceList.sortingLabel')}
          </TextStyle>
          {choiceListMarkup}
        </TextContainer>
      </Popover>
    </div>
  );

  const filterControlMarkup = filterControl && (
    <div className={styles.FiltersWrapper}>
      <div className={styles.FilterControl}>
        {filterControl}
        {sortMarkup}
      </div>
    </div>
  );

  let headerTitle = '';
  const resource =
    !loading &&
    ((!totalItemsCount && itemsOnPage === 1) || totalItemsCount === 1)
      ? resourceName.singular
      : resourceName.plural;

  if (loading) {
    headerTitle = i18n.translate('Polaris.ResourceList.loading', {resource});
  } else if (totalItemsCount) {
    headerTitle = i18n.translate('Polaris.ResourceList.showingTotalCount', {
      itemsCount: itemsOnPage,
      totalItemsCount,
      resource,
    });
  } else {
    headerTitle = i18n.translate('Polaris.ResourceList.showing', {
      itemsCount: itemsOnPage,
      resource,
    });
  }

  const handleSelectAllItemsInStore = useCallback(() => {
    onSelection(
      selectedItemsCount === SELECT_ALL_ITEMS
        ? SelectionType.Page
        : SelectionType.All,
      true,
    );
  }, [onSelection, selectedItemsCount]);

  const headerWrapperOverlay = loading && (
    <div className={styles.LoadingPanel}>
      <Stack>
        <Spinner size="small" />
        <span>
          {i18n.translate(
            'Polaris.ResourceList.resourceLoadingAccessibilityLabel',
            {
              resourceNamePlural: resourceName.plural,
            },
          )}
        </span>
      </Stack>
    </div>
  );

  const paginatedSelectAllAction = useMemo(() => {
    if (!selectable || itemsOnPage === totalItemsCount) return;

    const content =
      selectedItemsCount === SELECT_ALL_ITEMS
        ? i18n.translate('Polaris.Common.undo')
        : i18n.translate('Polaris.ResourceList.selectAllItems', {
            itemsLength: itemsOnPage,
            resourceNamePlural: resourceName.plural,
          });

    return {content, onAction: handleSelectAllItemsInStore};
  }, [
    handleSelectAllItemsInStore,
    i18n,
    itemsOnPage,
    resourceName.plural,
    selectable,
    selectedItemsCount,
    totalItemsCount,
  ]);

  const bulkActionsAccessibilityLabel = useMemo(() => {
    const allSelected = selectedItemsCount === totalItemsCount;
    if (totalItemsCount === 1 && allSelected) {
      return i18n.translate(
        'Polaris.ResourceList.a11yCheckboxDeselectAllSingle',
        {resourceNameSingular: resourceName.singular},
      );
    } else if (totalItemsCount === 1) {
      return i18n.translate(
        'Polaris.ResourceList.a11yCheckboxSelectAllSingle',
        {
          resourceNameSingular: resourceName.singular,
        },
      );
    } else if (allSelected) {
      return i18n.translate(
        'Polaris.ResourceList.a11yCheckboxDeselectAllMultiple',
        {
          itemsLength: itemsOnPage,
          resourceNamePlural: resourceName.plural,
        },
      );
    } else {
      return i18n.translate(
        'Polaris.ResourceList.a11yCheckboxSelectAllMultiple',
        {
          itemsLength: itemsOnPage,
          resourceNamePlural: resourceName.plural,
        },
      );
    }
  }, [
    i18n,
    itemsOnPage,
    resourceName.plural,
    resourceName.singular,
    selectedItemsCount,
    totalItemsCount,
  ]);

  const bulkSelectState = useMemo(() => {
    let selectState: boolean | 'indeterminate' = 'indeterminate';
    if (selectedItemsCount === 0) {
      selectState = false;
    } else if (
      selectedItemsCount === SELECT_ALL_ITEMS ||
      selectedItemsCount === itemsOnPage
    ) {
      selectState = true;
    }
    return selectState;
  }, [itemsOnPage, selectedItemsCount]);

  const handleTogglePage = useCallback(() => {
    const focusNode = selectMode
      ? bulkActionToggleNode.current && bulkActionToggleNode.current.focus
      : bulkActionCheckableNode.current &&
        bulkActionCheckableNode.current.focusInput;
    setTimeout(() => focusNode && focusNode(), 0);

    const selection = Boolean(
      !bulkSelectState || bulkSelectState === 'indeterminate',
    );
    onSelection(SelectionType.Page, selection);

    onSelectMode(selection);
  }, [bulkSelectState, onSelectMode, onSelection, selectMode]);

  const bulkActionsMarkup = selectable && (
    <div className={styles.BulkActionsWrapper}>
      <BulkActions
        ref={bulkActionCheckableNode}
        label={i18n.translate('Polaris.ResourceList.selected', {
          selectedItemsCount:
            selectedItemsCount === SELECT_ALL_ITEMS
              ? `${itemsOnPage}+`
              : selectedItemsCount,
        })}
        accessibilityLabel={bulkActionsAccessibilityLabel}
        selected={bulkSelectState}
        onToggleAll={handleTogglePage}
        selectMode={selectMode}
        onSelectModeToggle={onSelectMode}
        promotedActions={promotedBulkActions}
        paginatedSelectAllAction={paginatedSelectAllAction}
        paginatedSelectAllText={
          selectable &&
          itemsOnPage !== totalItemsCount &&
          selectedItemsCount === SELECT_ALL_ITEMS
            ? i18n.translate('Polaris.ResourceList.allItemsSelected', {
                itemsLength: itemsOnPage,
                resourceNamePlural: resourceName.plural,
              })
            : undefined
        }
        actions={bulkActions}
        disabled={loading}
        smallScreen={resourceListSmallScreen}
      />
    </div>
  );

  const sortingSelectMarkup = sortOptions &&
    sortOptions.length > 0 &&
    !alternateTool && (
      <div className={styles.SortWrapper}>
        <Select
          label={i18n.translate('Polaris.ResourceList.sortingLabel')}
          labelInline={!resourceListSmallScreen}
          labelHidden={resourceListSmallScreen}
          options={sortOptions}
          onChange={onSortChange}
          value={sortValue}
          disabled={selectMode}
        />
      </div>
    );

  const headingsMarkup = columnHeaders && (
    <div className={styles.ColumnHeaders}>{columnHeaders}</div>
  );

  const needsHeader =
    selectable ||
    (sortOptions && sortOptions.length > 0) ||
    alternateTool ||
    Boolean(columnHeaders);

  const alternateToolMarkup = alternateTool && !sortingSelectMarkup && (
    <div className={styles.AlternateToolWrapper}>{alternateTool}</div>
  );

  const headerTitleMarkup = (
    <div className={styles.HeaderTitleWrapper} testID="headerTitleWrapper">
      {headerTitle}
    </div>
  );

  const checkableButtonMarkup = selectable && (
    <div className={styles.CheckableButtonWrapper}>
      <CheckableButton
        ref={bulkActionToggleNode}
        accessibilityLabel={bulkActionsAccessibilityLabel}
        label={headerTitle}
        onToggleAll={handleTogglePage}
        plain
        disabled={loading || selectMode}
        labelHidden={Boolean(columnHeaders)}
      />
    </div>
  );

  const selectButtonMarkup = selectable && (
    <div className={styles.SelectButtonWrapper}>
      <Button
        disabled={selectMode}
        icon={EnableSelectionMinor}
        onClick={() => onSelectMode(true)}
      >
        {i18n.translate('Polaris.ResourceList.selectButtonText')}
      </Button>
    </div>
  );

  const headerClassName = classNames(
    styles.HeaderWrapper,
    sortOptions &&
      sortOptions.length > 0 &&
      !alternateTool &&
      styles['HeaderWrapper-hasSort'],
    alternateTool && styles['HeaderWrapper-hasAlternateTool'],
    selectable && styles['HeaderWrapper-hasSelect'],
    columnHeaders && styles['HeaderWrapper-hasHeadings'],
    filterControl && styles['HeaderWrapper-hasFilters'],
    loading && styles['HeaderWrapper-disabled'],
    selectable && selectMode && styles['HeaderWrapper-inSelectMode'],
  );
  const headerMarkup = (showHeader || needsHeader) && (
    <div className={styles.HeaderOuterWrapper} ref={stickyHeaderNode}>
      <div className={headerClassName} testID="ResourceList-Header">
        {headerWrapperOverlay}
        <div className={styles.HeaderContentWrapper}>
          {headerTitleMarkup}
          {checkableButtonMarkup}
          {headingsMarkup}
          {alternateToolMarkup}
          {sortingSelectMarkup}
          {selectButtonMarkup}
        </div>
        {bulkActionsMarkup}
      </div>
    </div>
  );

  return (
    <Fragment>
      {filterControlMarkup}
      {headerMarkup}
    </Fragment>
  );
}

function optionsAsChoices(options: SelectOption[]): ChoiceListProps['choices'] {
  return options.map((option) => ({
    value: typeof option === 'object' ? option.value : option,
    label:
      typeof option === 'object'
        ? capitalize(option.label)
        : capitalize(option),
  }));
}

function valueAsArray(value: string | string[]) {
  return typeof value === 'string' ? [value] : value;
}

function valueAsString(value: string | string[], separator: string) {
  return typeof value === 'string' ? value : value.join(separator);
}
