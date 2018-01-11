import * as React from 'react';

import {autobind} from '@shopify/javascript-utilities/decorators';
import {classNames} from '@shopify/react-utilities/styles';
import {DisableableAction} from '../../types';
import {Button} from '../../';
import Select, {Option} from '../Select';
import CheckableButton from './CheckableButton';
import selectIcon from './icons/enable-selection.svg';
import Item from './Item';
import {contextTypes} from './types';
import FilterControl from './FilterControl';
import BulkActions from './BulkActions';

import * as styles from './ResourceList.scss';

const SMALL_SCREEN_WIDTH = 458;

export interface State {
  selectMode: boolean,
}

export interface Props {
  items: any[],
  filterControl?: React.ReactNode,
  resourceName?: {
    singular: string,
    plural: string,
  },
  primaryAction?: DisableableAction,
  secondaryAction?: DisableableAction,
  tertiaryActions?: DisableableAction[],
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
    const {primaryAction, secondaryAction, tertiaryActions} = this.props;
    return Boolean(
      (primaryAction || secondaryAction || (tertiaryActions && tertiaryActions.length > 0)),
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
  private get itemCountText() {
    const {
      resourceName = {singular: 'item', plural: 'items'},
      items,
    } = this.props;

    const itemsCount = items.length;
    const resource = (itemsCount === 1) ? resourceName.singular : resourceName.plural;

    return `Showing ${itemsCount} ${resource}`;
  }

  @autobind
  private get bulkActionsLabel() {
    const {
      selectedItems = [],
    } = this.props;
    const selectedItemsCount = selectedItems.length;

    return (isSmallScreen()) ? `${selectedItemsCount}` : `${selectedItemsCount} selected`;
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
      primaryAction,
      secondaryAction,
      tertiaryActions,
      filterControl,
      sortOptions,
      sortValue,
      onSortChange,
    } = this.props;
    const {selectMode} = this.state;

    const filterControlMarkup = filterControl
      ? (
        <div className={styles.FiltersWrapper}>
          {filterControl}
        </div>
      )
      : null;

    const bulkActionsMarkup = this.selectable
      ? (
        <div className={styles.BulkActionsWrapper}>
          <BulkActions
            label={this.bulkActionsLabel}
            selected={this.bulkSelectState}
            onToggleAll={this.handleToggleAll}
            selectMode={selectMode}
            onSelectModeToggle={this.handleSelectMode}
            primaryAction={primaryAction}
            secondaryAction={secondaryAction}
            tertiaryActions={tertiaryActions}
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
            disabled={selectMode}
          />
        </div>
      )
      : null;

    const itemCountTextMarkup = <div className={styles.ItemCountTextWrapper}>{this.itemCountText}</div>;

    const selectButtonMarkup = this.selectable
      ? (
        <div className={styles.SelectButtonWrapper}>
          <Button disabled={selectMode} icon={selectIcon} onClick={this.handleSelectMode.bind(this, true)}>Select</Button>
        </div>
      ) : null;

    const checkableButtonMarkup = this.selectable
      ? (
        <div className={styles.CheckableButtonWrapper}>
          <CheckableButton
            accessibilityLabel={this.itemCountText}
            label={this.itemCountText}
            onToggleAll={this.handleToggleAll}
            plain
          />
        </div>
      ) : null;


    const headerClassName = classNames(
      styles.HeaderWrapper,
      sortOptions && sortOptions.length > 0 && styles['HeaderWrapper-hasSort'],
      this.selectable && styles['HeaderWrapper-hasSelect'],
      this.selectable && selectMode && styles['HeaderWrapper-inSelectMode'],
    );

    const headerMarkup = (
      <div className={headerClassName}>
        {itemCountTextMarkup}
        {checkableButtonMarkup}
        {sortingSelectMarkup}
        {selectButtonMarkup}
        {bulkActionsMarkup}
      </div>
    );

    const listMarkup =
      items.length > 0 ? (
        <ul className={styles.ResourceList}>{items.map(this.renderItem)}</ul>
      ) : null;

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
