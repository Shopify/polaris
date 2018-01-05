import * as React from 'react';

import {autobind} from '@shopify/javascript-utilities/decorators';

import Select, {Option} from '../Select';

import Item from './Item';
import {contextTypes} from './types';
import {FilterControl, BulkActions} from './components';

import * as styles from './ResourceList.scss';

const SMALL_SCREEN_WIDTH = 458;

export interface State {
  selectMode: boolean,
}

export interface Props {
  items: any[],
  renderFilterControl?: React.ReactNode,
  resourceName?: {
    singular: string,
    plural: string,
  },
  bulkActions?: any,
  selectedItems?: string[],
  persistActions?: boolean,
  sortValue?: string,
  sortOptions?: Option[],
  onSortChange?(selected: string, id: string): void,
  onSelectionChange?(selectedItems: string[]): void,
  renderItem(item: any, id: string): React.ReactNode,
  idForItem?(item: any, index: number): string,
}

export interface Context {
  selectMode: boolean,
  selectable?: boolean,
  selectedItems?: string[],
  persistActions?: boolean,
  onSelectionChange?(selected: boolean, id: string): void,
  subscribe(callback: () => void): void,
  unsubscribe(callback: () => void): void,
}

export default class ResourceList extends React.PureComponent<Props, State> {
  static Item = Item;
  static FilterControl = FilterControl;
  static childContextTypes = contextTypes;

  state: State = {selectMode: false};

  private subscriptions: {(): void}[] = [];
  private sortingLabel = 'Select how to sort';

  private get selectable() {
    const {bulkActions} = this.props;
    return Boolean(
      bulkActions && bulkActions.length > 0,
    );
  }

  @autobind
  private get bulkSelectState(): boolean | 'indeterminate' {
    const {selectedItems, items} = this.props;
    let selectState: boolean | 'indeterminate' = 'indeterminate';
    if (!selectedItems || selectedItems.length === 0) {
      selectState = false;
    } else if (
      Array.isArray(selectedItems) &&
      selectedItems.length === items.length
    ) {
      selectState = true;
    }
    return selectState;
  }


  @autobind
  private get bulkActionsLabel() {
    const {
      selectedItems = [],
      resourceName = {singular: 'item', plural: 'items'},
      items,
    } = this.props;

    const itemsCount = items.length;
    const selectedItemsCount = selectedItems.length;

    if (isSmallScreen()) {
      return `${selectedItemsCount}`;
    }

    let bulkActionsLabel;
    if (!selectedItemsCount || selectedItemsCount === 0) {
      bulkActionsLabel =
        itemsCount > 1
          ? `Showing ${itemsCount} ${resourceName.plural}`
          : `Showing ${itemsCount} ${resourceName.singular}`;
    } else {
      bulkActionsLabel = `${selectedItemsCount} selected`;
    }
    return bulkActionsLabel;
  }

  getChildContext(): Context {
    const {selectedItems, persistActions} = this.props;
    const {selectMode} = this.state;

    return {
      selectable: this.selectable,
      selectedItems,
      selectMode,
      persistActions,
      onSelectionChange: this.handleSelectionChange,
      subscribe: this.subscribe,
      unsubscribe: this.unsubscribe,
    };
  }

  componentWillReceiveProps() {
    this.subscriptions.forEach((subscriberCallback) => subscriberCallback());
  }

  render() {
    const {
      items,
      bulkActions,
      renderFilterControl,
      sortOptions,
      sortValue,
      onSortChange,
    } = this.props;
    const {selectMode} = this.state;

    const filterControlMarkup = renderFilterControl
      ? (
        <div className={styles.FiltersWrapper}>
          {renderFilterControl}
        </div>
      )
      : null;

    const bulkActionsMarkup =
      bulkActions && bulkActions.length ? (
        <div className={styles.BulkActionsWrapper}>
          <BulkActions
            label={this.bulkActionsLabel}
            selected={this.bulkSelectState}
            onToggleAll={this.handleToggleAll}
            selectMode={selectMode}
            onSelectModeToggle={this.handleSelectMode}
            actions={bulkActions}
          />
        </div>
      ) : null;

    const sortingSelectMarkup = sortOptions && sortOptions.length > 0
      ? (
        <div className={styles.SortWrapper}>
          <Select
            label={this.sortingLabel}
            labelHidden
            options={sortOptions}
            onChange={onSortChange}
            value={sortValue}
          />
        </div>
      )
      : null;

    const headerMarkup = this.selectable
      ? (
        <div className={styles.HeaderWrapper}>
          {bulkActionsMarkup}
          {sortingSelectMarkup}
        </div>
      )
      : null;

    const listMarkup =
      items.length > 0 ? (
        <ul className={styles.ResourceList}>{items.map(this.renderItem)}</ul>
      ) : null;

    return (
      <div>
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
    this.subscriptions = this.subscriptions.filter((subscription) => subscription !== callback);
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
  private handleSelectionChange(selected: boolean, id: string) {
    const {onSelectionChange, selectedItems} = this.props;

    if (selectedItems == null || onSelectionChange == null) {
      return;
    }

    const newlySelectedItems = selectedItems ? [...selectedItems] : [];

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

    if (Array.isArray(selectedItems) && selectedItems.length === items.length) {
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

function defaultIdForItem(item: any, index: number) {
  return item.hasOwnProperty('id') ? item.id : index.toString();
}

function isSmallScreen() {
  return window.matchMedia(`(max-width: ${SMALL_SCREEN_WIDTH}px)`).matches;
}
