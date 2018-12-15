import * as React from 'react';

import {autobind, debounce} from '@shopify/javascript-utilities/decorators';
import {classNames} from '@shopify/react-utilities/styles';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import Button from '../Button';
import EventListener from '../EventListener';
import Sticky from '../Sticky';
import Spinner from '../Spinner';
import {withAppProvider, WithAppProviderProps} from '../AppProvider';
import Select, {Option} from '../Select';
import EmptySearchResult from '../EmptySearchResult';
import selectIcon from './icons/enable-selection.svg';

import {
  BulkActions,
  BulkActionsProps,
  CheckableButton,
  FilterControl,
  Item,
  Provider,
} from './components';

import {ResourceListContext, SelectedItems, SELECT_ALL_ITEMS} from './types';

import * as styles from './ResourceList.scss';

const SMALL_SCREEN_WIDTH = 458;
const SMALL_SPINNER_HEIGHT = 28;
const LARGE_SPINNER_HEIGHT = 45;

export interface State {
  selectMode: boolean;
  loadingPosition: number;
  listNode: HTMLUListElement | null;
}

export interface Props {
  /** Item data; each item is passed to renderItem */
  items: any[];
  filterControl?: React.ReactNode;
  /** Name of the resource, such as customers or products */
  resourceName?: {
    singular: string;
    plural: string;
  };
  /** Up to 2 bulk actions that will be given more prominence */
  promotedBulkActions?: BulkActionsProps['promotedActions'];
  /** Actions available on the currently selected items */
  bulkActions?: BulkActionsProps['actions'];
  /** Collection of IDs for the currently selected items */
  selectedItems?: SelectedItems;
  /** If there are more items than currently in the list */
  hasMoreItems?: boolean;
  /** Overlays item list with a spinner while a background action is being performed */
  loading?: boolean;
  /** Boolean to show or hide the header */
  showHeader?: boolean;
  /** Current value of the sort control */
  sortValue?: string;
  /** Collection of sort options to choose from */
  sortOptions?: Option[];
  /** Callback when sort option is changed */
  onSortChange?(selected: string, id: string): void;
  /** Callback when selection is changed */
  onSelectionChange?(selectedItems: SelectedItems): void;
  /** Function to render each list item	 */
  renderItem(item: any, id: string): React.ReactNode;
  /** Function to customize the unique ID for each item */
  idForItem?(item: any, index: number): string;
}

export type CombinedProps = Props & WithAppProviderProps;

const getUniqueID = createUniqueIDFactory('Select');

export class ResourceList extends React.Component<CombinedProps, State> {
  static Item: typeof Item = Item;
  static FilterControl: typeof FilterControl = FilterControl;

  state: State = {
    selectMode: false,
    loadingPosition: 0,
    listNode: null,
  };

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
  private get headerTitle() {
    const {
      resourceName = this.defaultResourceName,
      items,
      polaris: {intl},
      loading,
    } = this.props;

    const itemsCount = items.length;
    const resource =
      itemsCount === 1 && !loading
        ? resourceName.singular
        : resourceName.plural;

    const headerTitleMarkup = loading
      ? intl.translate('Polaris.ResourceList.loading', {resource})
      : intl.translate('Polaris.ResourceList.showing', {
          itemsCount,
          resource,
        });

    return headerTitleMarkup;
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
    } = this.props;

    return {
      title: intl.translate('Polaris.ResourceList.emptySearchResultTitle', {
        resourceNamePlural: resourceName.plural,
      }),
      description: intl.translate(
        'Polaris.ResourceList.emptySearchResultDescription',
      ),
    };
  }

  get getContext(): ResourceListContext {
    const {
      selectedItems,
      resourceName = this.defaultResourceName,
      loading,
    } = this.props;
    const {selectMode} = this.state;
    return {
      selectable: this.selectable,
      selectedItems,
      selectMode,
      resourceName,
      loading,
      onSelectionChange: this.handleSelectionChange,
    };
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps: Props) {
    const {selectedItems} = this.props;

    if (
      selectedItems &&
      selectedItems.length > 0 &&
      (!nextProps.selectedItems || nextProps.selectedItems.length === 0) &&
      !isSmallScreen()
    ) {
      this.setState({selectMode: false});
    }
  }

  componentDidMount() {
    this.setState(
      {
        listNode: this.listRef.current,
      },
      () => {
        if (this.props.loading) {
          this.setLoadingPosition();
        }
      },
    );
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.loading && !prevProps.loading) {
      this.setLoadingPosition();
    }
  }

  render() {
    const {
      items,
      promotedBulkActions,
      bulkActions,
      filterControl,
      loading,
      showHeader = false,
      sortOptions,
      sortValue,
      onSortChange,
      polaris: {intl},
    } = this.props;
    const {selectMode, loadingPosition, listNode} = this.state;
    const itemsExist = items.length > 0;

    const filterControlMarkup = filterControl ? (
      <div className={styles.FiltersWrapper}>{filterControl}</div>
    ) : null;

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
          disabled={loading}
        />
        <EventListener event="resize" handler={this.handleResize} />
      </div>
    ) : null;

    const selectId = getUniqueID();

    const sortingLabelMarkup = (
      <label className={styles.SortLabel} htmlFor={selectId}>
        {intl.translate('Polaris.ResourceList.sortingLabel')}
      </label>
    );

    const sortingSelectMarkup =
      sortOptions && sortOptions.length > 0 ? (
        <div className={styles.SortWrapper}>
          {sortingLabelMarkup}
          <Select
            label={intl.translate('Polaris.ResourceList.sortingLabel')}
            labelHidden
            options={sortOptions}
            onChange={onSortChange}
            value={sortValue}
            disabled={selectMode}
          />
        </div>
      ) : null;

    const headerTitleMarkup = (
      <div className={styles.HeaderTitleWrapper} testID="headerTitleWrapper">
        {this.headerTitle}
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
          label={this.headerTitle}
          onToggleAll={this.handleToggleAll}
          plain
          disabled={loading}
        />
      </div>
    ) : null;

    const needsHeader =
      this.selectable || (sortOptions && sortOptions.length > 0);

    const headerWrapperOverlay = loading ? (
      <div className={styles['HeaderWrapper-overlay']} />
    ) : null;

    const headerMarkup = (showHeader || needsHeader) &&
      listNode && (
        <div className={styles.HeaderOuterWrapper}>
          <Sticky boundingElement={listNode}>
            {(isSticky: boolean) => {
              const headerClassName = classNames(
                styles.HeaderWrapper,
                sortOptions &&
                  sortOptions.length > 0 &&
                  styles['HeaderWrapper-hasSort'],
                this.selectable && styles['HeaderWrapper-hasSelect'],
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
                    {headerTitleMarkup}
                    {checkableButtonMarkup}
                    {sortingSelectMarkup}
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
      filterControl && !itemsExist && !loading ? (
        <div className={styles.EmptySearchResultWrapper}>
          <EmptySearchResult {...this.emptySearchResultText} withIllustration />
        </div>
      ) : null;

    const defaultTopPadding = 8;
    const topPadding =
      loadingPosition > 0 ? loadingPosition : defaultTopPadding;
    const spinnerStyle = {paddingTop: `${topPadding}px`};

    const spinnerSize = items.length < 2 ? 'small' : 'large';

    const loadingOverlay = loading ? (
      <React.Fragment>
        <div className={styles.SpinnerContainer} style={spinnerStyle}>
          <Spinner size={spinnerSize} accessibilityLabel="Items are loading" />
        </div>
        <div className={styles.LoadingOverlay} />
      </React.Fragment>
    ) : null;

    const className = classNames(
      styles.ItemWrapper,
      loading && styles['ItemWrapper-isLoading'],
    );
    const loadingWithoutItemsMarkup =
      loading && !itemsExist ? (
        <div className={className} tabIndex={-1}>
          {loadingOverlay}
        </div>
      ) : null;

    const resourceListClassName = classNames(
      styles.ResourceList,
      loading && styles.disabledPointerEvents,
    );

    const listMarkup = itemsExist ? (
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
      <Provider value={this.getContext}>
        <div className={styles.ResourceListWrapper}>
          {filterControlMarkup}
          {headerMarkup}
          {listMarkup}
          {loadingWithoutItemsMarkup}
        </div>
      </Provider>
    );
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
    const {listNode} = this.state;

    if (listNode != null) {
      if (typeof window === 'undefined') {
        return;
      }

      const overlay = listNode.getBoundingClientRect();
      const viewportHeight = Math.max(
        document.documentElement ? document.documentElement.clientHeight : 0,
        window.innerHeight || 0,
      );

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
    const {renderItem, idForItem = defaultIdForItem, loading} = this.props;
    const id = idForItem(item, index);
    const tabIndex = loading ? -1 : 0;

    return (
      <li key={id} className={styles.ItemWrapper} tabIndex={tabIndex}>
        {renderItem(item, id)}
      </li>
    );
  }

  @autobind
  private handleSelectionChange(selected: boolean, id: string) {
    const {
      onSelectionChange,
      selectedItems,
      items,
      idForItem = defaultIdForItem,
    } = this.props;

    if (selectedItems == null || onSelectionChange == null) {
      return;
    }

    const newlySelectedItems =
      selectedItems === SELECT_ALL_ITEMS
        ? getAllItemsOnPage(items, idForItem)
        : [...selectedItems];

    if (selected) {
      newlySelectedItems.push(id);
    } else {
      newlySelectedItems.splice(newlySelectedItems.indexOf(id), 1);
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
