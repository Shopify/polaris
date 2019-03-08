import * as React from 'react';
import {autobind, debounce} from '@shopify/javascript-utilities/decorators';
import {classNames} from '@shopify/react-utilities/styles';

import {
  Button,
  EventListener,
  SelectOption,
  Sticky,
  EmptySearchResult,
  withAppProvider,
  WithAppProviderProps,
  Spinner,
} from '@shopify/polaris';

import {capitalizeFirstLetter} from 'utilities/string';
import selectIcon from './icons/enable-selection.svg';

import {
  BulkActions,
  BulkActionsProps,
  CheckableButton,
  FilterControl,
  Item,
  Sorter,
} from './components';

import {contextTypes, SelectedItems, SELECT_ALL_ITEMS} from './types';

import * as styles from './ResourceList.scss';

const SMALL_SCREEN_WIDTH = 458;
const SMALL_SPINNER_HEIGHT = 28;
const LARGE_SPINNER_HEIGHT = 45;

export type Items = any[];

export interface State {
  selectMode: boolean;
  loadingPosition: number;
  lastSelected: number | null;
}

export interface Props {
  // Item data; each item is passed to renderItem
  items: Items;
  // Overlays item list with a spinner while a background action is being performed
  loading?: boolean;
  filterControl?: React.ReactNode;
  // Name of the resource, such as customers or products
  resourceName?: {
    singular: string;
    plural: string;
  };
  selectedLocation?: string;
  columnHeaders?: React.ReactNode;
  // Up to 2 bulk actions that will be given more prominence
  promotedBulkActions?: BulkActionsProps['promotedActions'];
  // Actions available on the currently selected items
  bulkActions?: BulkActionsProps['actions'];
  // Collection of IDs for the currently selected items
  selectedItems?: SelectedItems;
  // If there are more items than currently in the list
  hasMoreItems?: boolean;
  // Boolean to show or hide the header
  showHeader?: boolean;
  // Current value of the sort control
  sortValue?: string;
  // Collection of sort options to choose from
  sortOptions?: SelectOption[];
  // Callback when sort option is changed
  onSortChange?(selected: string, id: string): void;
  // Callback when selection is changed
  onSelectionChange?(selectedItems: SelectedItems): void;
  handleMultiSelectionChange?(
    lastSelected: number,
    currentlySelected: number,
  ): string[];
  // Function to render each list item
  renderItem(item: any, id: string): React.ReactNode;
  // Function to customize the unique ID for each item
  idForItem?(item: any, index: number): string;
}

export interface Context {
  selectMode: boolean;
  selectable?: boolean;
  selectedItems?: SelectedItems;
  resourceName?: {
    singular: string;
    plural: string;
  };
  sortValue?: string;
  loading?: boolean;
  sortOptions?: SelectOption[];
  onSortChange?(selected: string, id: string): void;
  onSelectionChange?(
    selected: boolean,
    id: string,
    index: number,
    shiftKey: boolean,
  ): void;
  subscribe(callback: () => void): void;
  unsubscribe(callback: () => void): void;
}

export type CombinedProps = Props & WithAppProviderProps;

export class ResourceList extends React.Component<CombinedProps, State> {
  static Item: typeof Item = Item;
  static Sorter: typeof Sorter = Sorter;
  static FilterControl: typeof FilterControl = FilterControl;
  static childContextTypes = contextTypes;

  state: State = {
    loadingPosition: 0,
    selectMode: Boolean(
      this.props.selectedItems && this.props.selectedItems.length > 0,
    ),
    lastSelected: null,
  };

  private subscriptions: {(): void}[] = [];
  private defaultResourceName: {singular: string; plural: string};
  private listRef: React.RefObject<HTMLUListElement> = React.createRef();

  constructor(props: CombinedProps) {
    super(props);

    const {
      polaris: {intl},
    } = props;

    this.defaultResourceName = {
      singular: intl.translate('Polaris.ResourceList.defaultItemSingular'),
      plural: intl.translate('Polaris.ResourceList.defaultItemPlural'),
    };
  }

  private get selectable() {
    const {promotedBulkActions, bulkActions} = this.props;
    return Boolean(
      (promotedBulkActions && promotedBulkActions.length > 0) ||
        (bulkActions && bulkActions.length > 0),
    );
  }

  @autobind
  private get bulkSelectState(): boolean | 'indeterminate' {
    const {selectedItems, items} = this.props;
    let selectState: boolean | 'indeterminate' = 'indeterminate';
    if (
      !selectedItems ||
      (Array.isArray(selectedItems) && selectedItems.length === 0)
    ) {
      selectState = false;
    } else if (
      selectedItems === SELECT_ALL_ITEMS ||
      (Array.isArray(selectedItems) && selectedItems.length === items.length)
    ) {
      selectState = true;
    }
    return selectState;
  }

  @autobind
  private get itemCountText() {
    const {
      resourceName = this.defaultResourceName,
      items,
      polaris: {intl},
    } = this.props;

    const itemsCount = items.length;
    const resource =
      itemsCount === 1 ? resourceName.singular : resourceName.plural;

    return intl.translate('Polaris.ResourceList.showing', {
      itemsCount,
      resource,
    });
  }

  @autobind
  private get bulkActionsLabel() {
    const {
      selectedItems = [],
      items,
      polaris: {intl},
    } = this.props;

    const selectedItemsCount =
      selectedItems === SELECT_ALL_ITEMS
        ? `${items.length}+`
        : selectedItems.length;

    return intl.translate('Polaris.ResourceList.selected', {
      selectedItemsCount,
    });
  }

  @autobind
  private get bulkActionsAccessibilityLabel() {
    const {
      resourceName = this.defaultResourceName,
      selectedItems = [],
      items,
      polaris: {intl},
    } = this.props;

    const selectedItemsCount = selectedItems.length;
    const totalItemsCount = items.length;
    const allSelected = selectedItemsCount === totalItemsCount;

    if (totalItemsCount === 1 && allSelected) {
      return intl.translate(
        'Polaris.ResourceList.a11yCheckboxDeselectAllSingle',
        {resourceNameSingular: resourceName.singular},
      );
    } else if (totalItemsCount === 1) {
      return intl.translate(
        'Polaris.ResourceList.a11yCheckboxSelectAllSingle',
        {
          resourceNameSingular: resourceName.singular,
        },
      );
    } else if (allSelected) {
      return intl.translate(
        'Polaris.ResourceList.a11yCheckboxDeselectAllMultiple',
        {
          itemsLength: items.length,
          resourceNamePlural: resourceName.plural,
        },
      );
    } else {
      return intl.translate(
        'Polaris.ResourceList.a11yCheckboxSelectAllMultiple',
        {
          itemsLength: items.length,
          resourceNamePlural: resourceName.plural,
        },
      );
    }
  }

  @autobind
  private get paginatedSelectAllText() {
    const {
      hasMoreItems,
      selectedItems,
      items,
      resourceName = this.defaultResourceName,
      polaris: {intl},
    } = this.props;

    if (!this.selectable || !hasMoreItems) {
      return;
    }

    if (selectedItems === SELECT_ALL_ITEMS) {
      return intl.translate('Polaris.ResourceList.allItemsSelected', {
        itemsLength: items.length,
        resourceNamePlural: resourceName.plural,
      });
    }
  }

  @autobind
  private get paginatedSelectAllAction() {
    const {
      hasMoreItems,
      selectedItems,
      items,
      resourceName = this.defaultResourceName,
      polaris: {intl},
    } = this.props;

    if (!this.selectable || !hasMoreItems) {
      return;
    }

    const actionText =
      selectedItems === SELECT_ALL_ITEMS
        ? intl.translate('Polaris.Common.undo')
        : intl.translate('Polaris.ResourceList.selectAllItems', {
            itemsLength: items.length,
            resourceNamePlural: resourceName.plural,
          });

    return {
      content: actionText,
      onAction: this.handleSelectAllItemsInStore,
    };
  }

  private get emptySearchResultText() {
    const {
      polaris: {intl},
      resourceName = this.defaultResourceName,
      selectedLocation,
    } = this.props;

    const emptySearchResultTitle = selectedLocation
      ? intl.translate(
          'Polaris.ResourceList.emptySearchResultTitleAtLocation',
          {
            resourceNamePlural: resourceName.plural,
            locationName: selectedLocation,
          },
        )
      : intl.translate('Polaris.ResourceList.emptySearchResultTitle', {
          resourceNamePlural: resourceName.plural,
        });

    return {
      title: capitalizeFirstLetter(emptySearchResultTitle),
      description: capitalizeFirstLetter(
        intl.translate('Polaris.ResourceList.emptySearchResultDescription'),
      ),
    };
  }

  getChildContext(): Context {
    const {
      selectedItems,
      resourceName = this.defaultResourceName,
      sortOptions,
      sortValue,
      onSortChange,
      loading,
    } = this.props;
    const {selectMode} = this.state;
    return {
      selectable: this.selectable,
      selectedItems,
      selectMode,
      resourceName,
      loading,
      sortOptions,
      sortValue,
      onSortChange,
      onSelectionChange: this.handleSelectionChange,
      subscribe: this.subscribe,
      unsubscribe: this.unsubscribe,
    };
  }

  componentDidMount() {
    // Need to re-render for dom measurements
    this.forceUpdate();
    if (this.props.loading) {
      this.setLoadingPosition();
    }
  }

  componentDidUpdate({loading: prevLoading, items: prevItems}: Props) {
    const onlyCurrentItemsExist =
      this.itemsExist() && !this.itemsExist(prevItems);

    if (this.listRef.current && onlyCurrentItemsExist) {
      // Need to re-render for dom measurements
      this.forceUpdate();
    }

    if (this.props.loading && !prevLoading) {
      this.setLoadingPosition();
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const {selectedItems} = this.props;

    this.subscriptions.forEach((subscriberCallback) => subscriberCallback());
    if (
      selectedItems &&
      selectedItems.length > 0 &&
      (!nextProps.selectedItems || nextProps.selectedItems.length === 0) &&
      !isSmallScreen()
    ) {
      this.setState({selectMode: false});
    }
  }

  render() {
    const {
      items,
      promotedBulkActions,
      bulkActions,
      filterControl,
      showHeader = false,
      sortOptions,
      loading,
      columnHeaders,
      selectedItems,
      polaris: {intl},
    } = this.props;
    const {selectMode, loadingPosition} = this.state;
    const sortOnly = filterControl === undefined && sortOptions !== null;

    const filterControlMarkup = filterControl ? (
      <div className={styles.FiltersWrapper}>{filterControl}</div>
    ) : null;

    const hasDisabledBulkActions =
      loading || (isSmallScreen() && selectedItems && selectedItems.length < 1);

    const bulkActionsMarkup = this.selectable ? (
      <div className={styles.BulkActionsWrapper}>
        <BulkActions
          label={this.bulkActionsLabel}
          accessibilityLabel={this.bulkActionsAccessibilityLabel}
          selected={this.bulkSelectState}
          onToggleAll={this.handleToggleAll}
          selectMode={selectMode}
          onSelectModeToggle={this.handleSelectMode}
          promotedActions={promotedBulkActions}
          paginatedSelectAllAction={this.paginatedSelectAllAction}
          paginatedSelectAllText={this.paginatedSelectAllText}
          actions={bulkActions}
          disabled={hasDisabledBulkActions}
        />
        <EventListener event="resize" handler={this.handleResize} />
      </div>
    ) : null;

    const itemCountTextMarkup = (
      <div
        className={styles.ItemCountTextWrapper}
        testID="ItemCountTextWrapper"
      >
        {this.itemCountText}
      </div>
    );

    const selectButtonMarkup = this.selectable ? (
      <div className={styles.SelectButtonWrapper}>
        <Button
          disabled={selectMode}
          icon={selectIcon}
          // eslint-disable-next-line react/jsx-no-bind
          onClick={this.handleSelectMode.bind(this, true)}
        >
          {intl.translate('Polaris.ResourceList.selectButtonText')}
        </Button>
      </div>
    ) : null;

    const checkableButtonMarkup = this.selectable ? (
      <div className={styles.CheckableButtonWrapper}>
        <CheckableButton
          accessibilityLabel={this.bulkActionsAccessibilityLabel}
          label={this.itemCountText}
          onToggleAll={this.handleToggleAll}
          plain
          hasHeadings={Boolean(columnHeaders)}
          disabled={loading}
        />
      </div>
    ) : null;

    const headingsMarkup = columnHeaders ? (
      <div className={styles.ColumnHeaders}>{columnHeaders}</div>
    ) : null;

    const className = classNames(
      styles.Sorter,
      sortOnly && styles['Sorter-alwaysVisible'],
    );

    const sorterMarkup = sortOptions ? (
      <div className={className}>
        <ResourceList.Sorter />
      </div>
    ) : null;

    const headerWrapperOverlay = loading ? (
      <div className={styles['HeaderWrapper-overlay']} />
    ) : null;

    const needsHeader =
      this.selectable ||
      Boolean(columnHeaders) ||
      (sortOptions && sortOptions.length > 0);

    const headerMarkup = (showHeader || needsHeader) &&
      this.listRef.current &&
      this.itemsExist() && (
        <div className={styles.HeaderOuterWrapper}>
          <Sticky boundingElement={this.listRef.current}>
            {(isSticky: boolean) => {
              const headerClassName = classNames(
                styles.HeaderWrapper,
                sortOptions &&
                  sortOptions.length > 0 &&
                  styles['HeaderWrapper-hasSort'],
                this.selectable && styles['HeaderWrapper-hasSelect'],
                Boolean(columnHeaders) && styles['HeaderWrapper-hasHeadings'],
                Boolean(filterControl) && styles['HeaderWrapper-hasFilters'],
                loading && styles['HeaderWrapper-disabled'],
                this.selectable &&
                  selectMode &&
                  styles['HeaderWrapper-inSelectMode'],
                isSticky && styles['HeaderWrapper-isSticky'],
              );
              return (
                <div className={headerClassName} testID="ResourceList-Header">
                  {headerWrapperOverlay}
                  <div className={styles.HeaderContentWrapper}>
                    {itemCountTextMarkup}
                    {checkableButtonMarkup}
                    {headingsMarkup}
                    {sorterMarkup}
                    {selectButtonMarkup}
                  </div>
                  {bulkActionsMarkup}
                </div>
              );
            }}
          </Sticky>
        </div>
      );

    const emptyStateMarkup =
      filterControl && !this.itemsExist() ? (
        <div className={styles.EmptySearchResultWrapper}>
          <EmptySearchResult {...this.emptySearchResultText} withIllustration />
        </div>
      ) : null;

    const defaultTopPadding = 8;
    const topPadding =
      loadingPosition > 0 ? loadingPosition : defaultTopPadding;
    const spinnerStyle = {paddingTop: `${topPadding}px`};
    const spinnerSize = items.length === 1 ? 'small' : 'large';
    const loadingOverlay = loading ? (
      <>
        <div className={styles.SpinnerContainer} style={spinnerStyle}>
          <Spinner size={spinnerSize} accessibilityLabel="Items are loading" />
        </div>
        <div className={styles.LoadingOverlay} />
      </>
    ) : null;
    const resourceListClassName = classNames(
      styles.ResourceList,
      this.selectable && styles.selectable,
      selectMode && styles.selectMode,
      loading && styles.disabledPointerEvents,
      selectMode && styles.disableTextSelection,
    );

    const listMarkup = this.itemsExist() ? (
      <ul
        className={resourceListClassName}
        ref={this.listRef}
        aria-live="polite"
        aria-busy={loading}
      >
        {loadingOverlay}
        {items.map(this.renderItem)}
      </ul>
    ) : (
      emptyStateMarkup
    );

    return (
      <div className={styles.ResourceListWrapper}>
        {filterControlMarkup}
        {headerMarkup}
        {listMarkup}
      </div>
    );
  }

  @autobind
  subscribe(callback: () => void) {
    this.subscriptions.push(callback);
  }

  @autobind
  unsubscribe(callback: () => void) {
    this.subscriptions = this.subscriptions.filter(
      (subscription) => subscription !== callback,
    );
  }

  private itemsExist(items?: Items) {
    return (items || this.props.items).length > 0;
  }

  @debounce(50)
  @autobind
  private handleResize() {
    const {selectedItems} = this.props;
    const {selectMode} = this.state;

    if (
      selectedItems &&
      selectedItems.length === 0 &&
      selectMode &&
      !isSmallScreen()
    ) {
      this.handleSelectMode(false);
    }
  }

  @autobind
  private setLoadingPosition() {
    if (this.listRef.current != null) {
      if (typeof window === 'undefined') {
        return;
      }
      const overlay = this.listRef.current.getBoundingClientRect();
      const clientHeight = document.documentElement
        ? document.documentElement.clientHeight
        : 0;
      const viewportHeight = Math.max(clientHeight, window.innerHeight || 0);
      const overflow = viewportHeight - overlay.height;
      const spinnerHeight =
        this.props.items.length === 1
          ? SMALL_SPINNER_HEIGHT
          : LARGE_SPINNER_HEIGHT;
      const spinnerPosition =
        overflow > 0
          ? (overlay.height - spinnerHeight) / 2
          : (viewportHeight - overlay.top - spinnerHeight) / 2;
      this.setState({loadingPosition: spinnerPosition});
    }
  }

  @autobind
  private handleSelectAllItemsInStore() {
    const {
      onSelectionChange,
      selectedItems,
      items,
      idForItem = defaultIdForItem,
    } = this.props;

    const newlySelectedItems =
      selectedItems === SELECT_ALL_ITEMS
        ? getAllItemsOnPage(items, idForItem)
        : SELECT_ALL_ITEMS;

    if (onSelectionChange) {
      onSelectionChange(newlySelectedItems);
    }
  }

  @autobind
  private renderItem(item: any, index: number) {
    const {renderItem, idForItem = defaultIdForItem} = this.props;
    const id = idForItem(item, index);

    return (
      <li key={id} className={styles.ItemWrapper}>
        {renderItem(item, id)}
      </li>
    );
  }

  @autobind
  private handleSelectionChange(
    selected: boolean,
    id: string,
    index: number,
    shiftKey: boolean,
  ) {
    const {
      onSelectionChange,
      selectedItems,
      items,
      idForItem = defaultIdForItem,
      handleMultiSelectionChange,
    } = this.props;
    const {lastSelected} = this.state;

    if (selectedItems == null || onSelectionChange == null) {
      return;
    }

    let newlySelectedItems =
      selectedItems === SELECT_ALL_ITEMS
        ? getAllItemsOnPage(items, idForItem)
        : [...selectedItems];

    this.setState({lastSelected: index});

    let selectedIds = [id];

    if (shiftKey && lastSelected != null && handleMultiSelectionChange) {
      selectedIds = handleMultiSelectionChange(lastSelected, index);
    }

    newlySelectedItems = [...new Set([...newlySelectedItems, ...selectedIds])];

    if (!selected) {
      for (let i = 0; i < selectedIds.length; i++) {
        newlySelectedItems.splice(
          newlySelectedItems.indexOf(selectedIds[i]),
          1,
        );
      }
    }

    if (newlySelectedItems.length === 0 && !isSmallScreen()) {
      this.handleSelectMode(false);
    } else if (newlySelectedItems.length > 0) {
      this.handleSelectMode(true);
    }

    if (onSelectionChange) {
      onSelectionChange(newlySelectedItems);
    }
  }

  @autobind
  private handleSelectMode(selectMode: boolean) {
    const {onSelectionChange} = this.props;
    this.setState({selectMode});
    if (!selectMode && onSelectionChange) {
      onSelectionChange([]);
    }
  }

  @autobind
  private handleToggleAll() {
    const {
      onSelectionChange,
      selectedItems,
      items,
      idForItem = defaultIdForItem,
    } = this.props;

    let newlySelectedItems: string[] = [];

    if (
      (Array.isArray(selectedItems) && selectedItems.length === items.length) ||
      selectedItems === SELECT_ALL_ITEMS
    ) {
      newlySelectedItems = [];
    } else {
      newlySelectedItems = items.map((item, index) => {
        const id = idForItem(item, index);
        return id;
      });
    }

    if (newlySelectedItems.length === 0 && !isSmallScreen()) {
      this.handleSelectMode(false);
    } else if (newlySelectedItems.length > 0) {
      this.handleSelectMode(true);
    }

    if (onSelectionChange) {
      onSelectionChange(newlySelectedItems);
    }
  }
}

function getAllItemsOnPage(
  items: any,
  idForItem: (item: any, index: number) => string,
) {
  return items.map((item: any, index: number) => {
    return idForItem(item, index);
  });
}

function defaultIdForItem(item: any, index: number) {
  return item.hasOwnProperty('id') ? item.id : index.toString();
}

function isSmallScreen() {
  return typeof window === 'undefined'
    ? false
    : window.innerWidth <= SMALL_SCREEN_WIDTH;
}

export default withAppProvider<Props>()(ResourceList);
